use axum::{
	extract::State,
	http::header,
	response::{Html, IntoResponse},
	routing::get,
	Router,
};
use dotenv::dotenv;
use serde::de::DeserializeOwned;
use std::{env, error::Error, sync::Arc};
use tera::{Context, Tera};

use tower_http::services::ServeDir;
mod github;
mod structs;

fn read_json<T: DeserializeOwned>(path: &str) -> Result<T, Box<dyn Error>> {
	let file = std::fs::read_to_string(path)?;
	let contents: T = serde_json::from_str(&file)?;
	Ok(contents)
}

#[tokio::main]
async fn main() {
	dotenv().ok();
	let tera = match Tera::new("templates/**/*.html") {
		Ok(t) => t,
		Err(e) => {
			println!("Failed to initialize Tera: {}", e);
			std::process::exit(1);
		}
	};

	let projects = read_json::<Vec<structs::Project>>("public/projects.json")
		.expect("failed to read projects from json");
	let languages = read_json::<Vec<structs::Language>>("scripts/languages.json")
		.expect("failed to read languages from json");

	let state = structs::AppState {
		tera: Arc::new(tera),
		projects: Arc::new(projects),
		languages: Arc::new(languages),
	};
	let app = Router::new()
		.route("/", get(index))
		.route(
			"/app.css",
			get((
				([(header::CONTENT_TYPE, "text/css")]),
				std::fs::read_to_string("dist/app.css").expect("failed to read css"),
			)),
		)
		.nest_service("/static", ServeDir::new("public"))
		.route("/api/sponsors", get(github::sponsors))
		.with_state(state);
	let address = env::var("ADDRESS").unwrap_or("0.0.0.0:8000".to_string());
	let listener = tokio::net::TcpListener::bind(&address).await.unwrap();
	println!("Starting server on address {}...", &address);
	axum::serve(listener, app).await.unwrap();
}

async fn index(State(state): State<structs::AppState>) -> impl IntoResponse {
	let mut context = Context::new();
	context.insert("title", "mxgic1337.xyz");
	context.insert("projects", &*state.projects);
	context.insert("languages", &*state.languages);

	Html(
		state
			.tera
			.render("index.html", &context)
			.expect("failed to render template"),
	)
}
