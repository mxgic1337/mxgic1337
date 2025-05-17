use axum::{
    extract::State,
    http::header,
    response::{Html, IntoResponse},
    routing::get,
    Router,
};
use dotenv::dotenv;
use serde::{Deserialize, Serialize};
use std::{env, error::Error, sync::Arc};
use tera::{Context, Tera};

use tower_http::services::ServeDir;
mod github;

#[derive(Clone)]
pub struct AppState {
    tera: Arc<Tera>,
    projects: Arc<Vec<Project>>,
}

#[derive(Serialize, Deserialize)]
pub struct ProjectUrl {
    text: String,
    url: String,
}

#[derive(Serialize, Deserialize)]
pub struct Project {
    name: String,
    author: String,
    description: String,
    languages: Vec<String>,
    #[serde(rename = "type")]
    project_type: String,
    urls: Vec<ProjectUrl>,
    badge: Option<String>,
}

fn read_projects() -> Result<Vec<Project>, Box<dyn Error>> {
    let projects_file = std::fs::read_to_string("public/projects.json")?;
    let projects: Vec<Project> = serde_json::from_str(&projects_file)?;
    Ok(projects)
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

    let projects = read_projects().expect("failed to read projects from json");

    let state = AppState {
        tera: Arc::new(tera),
        projects: Arc::new(projects),
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

async fn index(State(state): State<AppState>) -> impl IntoResponse {
    let mut context = Context::new();
    context.insert("title", "mxgic1337.xyz");
    context.insert("projects", &*state.projects);

    Html(
        state
            .tera
            .render("index.html", &context)
            .expect("failed to render template"),
    )
}
