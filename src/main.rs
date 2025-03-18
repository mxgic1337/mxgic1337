use axum::{routing::get, Router};
use dotenv::dotenv;
use std::env;

use tower_http::services::ServeDir;
mod github;

#[tokio::main]
async fn main() {
    dotenv().ok();
    let app = Router::new()
        .route("/api/sponsors", get(github::sponsors))
        .fallback_service(ServeDir::new("dist"));
    let address = env::var("ADDRESS").unwrap_or("0.0.0.0:8000".to_string());
    let listener = tokio::net::TcpListener::bind(&address).await.unwrap();
    println!("Starting server on address {}...", &address);
    axum::serve(listener, app).await.unwrap();
}
