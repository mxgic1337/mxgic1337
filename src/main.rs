use axum::{http::StatusCode, response::IntoResponse, routing::get, Router};
use dotenv::dotenv;
use std::env;
mod github;

async fn handle_404() -> impl IntoResponse {
    (StatusCode::NOT_FOUND, "Not found.")
}

#[tokio::main]
async fn main() {
    dotenv().ok();
    let app = Router::new().route("/sponsors", get(github::sponsors));
    let app = app.fallback(handle_404);
    let address = env::var("ADDRESS").unwrap_or("0.0.0.0:8000".to_string());
    let listener = tokio::net::TcpListener::bind(&address).await.unwrap();
    println!("Starting server on address {}...", &address);
    axum::serve(listener, app).await.unwrap();
}
