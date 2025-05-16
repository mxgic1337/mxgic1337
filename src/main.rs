use axum::{
    extract::State,
    http::header,
    response::{Html, IntoResponse},
    routing::get,
    Router,
};
use dotenv::dotenv;
use std::{env, sync::Arc};
use tera::{Context, Tera};

use tower_http::services::ServeDir;
mod github;

#[derive(Clone)]
struct AppState {
    tera: Arc<Tera>,
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
    let state = AppState {
        tera: Arc::new(tera),
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
        .route("/api/sponsors", get(github::sponsors))
        .fallback_service(ServeDir::new("public"))
        .with_state(state);
    let address = env::var("ADDRESS").unwrap_or("0.0.0.0:8000".to_string());
    let listener = tokio::net::TcpListener::bind(&address).await.unwrap();
    println!("Starting server on address {}...", &address);
    axum::serve(listener, app).await.unwrap();
}

async fn index(State(state): State<AppState>) -> impl IntoResponse {
    let mut context = Context::new();
    context.insert("title", "mxgic1337.xyz");

    Html(
        state
            .tera
            .render("index.html", &context)
            .expect("failed to render template"),
    )
}
