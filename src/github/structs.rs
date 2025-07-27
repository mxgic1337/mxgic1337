use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct SponsorResponse {
	pub data: SponsorData,
}

#[derive(Deserialize)]
pub struct SponsorData {
	pub user: User,
}

#[allow(non_snake_case)]
#[derive(Deserialize)]
pub struct User {
	pub sponsorshipsAsMaintainer: Sponsorships,
}

#[derive(Deserialize)]
pub struct Sponsorships {
	pub nodes: Vec<SponsorshipsNode>,
}

#[allow(non_snake_case)]
#[derive(Deserialize)]
pub struct SponsorshipsNode {
	pub sponsorEntity: SponsorEntity,
	pub tier: Option<SponsorTier>,
}

#[allow(non_snake_case)]
#[derive(Deserialize)]
pub struct SponsorEntity {
	pub name: Option<String>,
	pub login: String,
	pub avatarUrl: String,
}

#[allow(non_snake_case)]
#[derive(Deserialize, Serialize)]
pub struct SponsorTier {
	pub name: String,
	pub monthlyPriceInCents: u32,
	pub isOneTime: bool,
}

#[derive(Serialize)]
pub struct Sponsor {
	pub name: Option<String>,
	pub username: String,
	pub avatar: String,
	pub tier: Option<SponsorTier>,
}
