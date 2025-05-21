use std::sync::Arc;

use serde::{Deserialize, Serialize};
use tera::Tera;

#[derive(Clone)]
pub struct AppState {
	pub tera: Arc<Tera>,
	pub projects: Arc<Vec<Project>>,
	pub languages: Arc<Vec<Language>>,
}

#[derive(Serialize, Deserialize)]
pub struct Language {
	name: String,
	icon: Option<String>,
	tools: Option<Vec<String>>,
	learning: Option<bool>,
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
