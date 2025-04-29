use axum::Json;
use gql_client::Client;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Deserialize)]
pub struct SponsorData {
    user: User,
}

#[allow(non_snake_case)]
#[derive(Deserialize)]
pub struct User {
    sponsorshipsAsMaintainer: Sponsorships,
}

#[derive(Deserialize)]
pub struct Sponsorships {
    nodes: Vec<SponsorshipsNode>,
}

#[allow(non_snake_case)]
#[derive(Deserialize)]
pub struct SponsorshipsNode {
    sponsorEntity: SponsorEntity,
    tier: Option<SponsorTier>,
}

#[allow(non_snake_case)]
#[derive(Deserialize)]
pub struct SponsorEntity {
    name: Option<String>,
    login: String,
    avatarUrl: String,
}

#[allow(non_snake_case)]
#[derive(Deserialize, Serialize)]
pub struct SponsorTier {
    name: String,
    monthlyPriceInCents: u32,
    isOneTime: bool,
}

#[derive(Serialize)]
pub struct Sponsor {
    name: Option<String>,
    username: String,
    avatar: String,
    tier: Option<SponsorTier>,
}

pub async fn sponsors() -> Json<Vec<Sponsor>> {
    let token = std::env::var("GITHUB_TOKEN").expect("Missing GITHUB_TOKEN env variable");
    let endpoint = "https://api.github.com/graphql";
    let query = r#"query {
  user(login: "mxgic1337") {
    sponsorshipsAsMaintainer(first: 100) {
      nodes {
        sponsorEntity {
          ... on User {
            name
            login
            avatarUrl
          }
        }
        tier {
          name,
          isOneTime,
          monthlyPriceInCents
        }
      }
    }
  }
}
"#;
    let mut headers = HashMap::new();
    let authorization_header = format!("Bearer {}", token);
    let user_agent_header = format!(
        "mxgic1337/{}/{} (mxgic1337.xyz)",
        env!("CARGO_PKG_NAME"),
        env!("CARGO_PKG_VERSION")
    );
    headers.insert("Authorization", authorization_header.as_str());
    headers.insert("User-Agent", user_agent_header.as_str());
    let client = Client::new_with_headers(endpoint, headers);
    let data = client
        .query::<SponsorData>(query)
        .await
        .expect("Request failed")
        .unwrap();
    let sponsors = data.user.sponsorshipsAsMaintainer.nodes;
    let mut sponsor_list: Vec<Sponsor> = vec![];
    for user in sponsors {
        sponsor_list.push(Sponsor {
            name: user.sponsorEntity.name,
            username: user.sponsorEntity.login,
            avatar: user.sponsorEntity.avatarUrl,
            tier: user.tier,
        });
    }
    Json(sponsor_list)
}
