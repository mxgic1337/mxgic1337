use axum::{http::HeaderMap, Json};
use reqwest::{
	header::{AUTHORIZATION, CONTENT_TYPE, USER_AGENT},
	Client, StatusCode,
};
use serde_json::json;

mod structs;

pub async fn sponsors() -> Json<Vec<structs::Sponsor>> {
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
	let mut headers = HeaderMap::new();
	let authorization_header = format!("Bearer {}", token);
	let user_agent_header = format!(
		"mxgic1337/{}/{} (mxgic1337.xyz)",
		env!("CARGO_PKG_NAME"),
		env!("CARGO_PKG_VERSION")
	);
	headers.insert(AUTHORIZATION, authorization_header.parse().unwrap());
	headers.insert(CONTENT_TYPE, "application/json".parse().unwrap());
	headers.insert(USER_AGENT, user_agent_header.parse().unwrap());
	let client = Client::new();
	let response = client
		.post(endpoint)
		.headers(headers)
		.body(json!({"query": query}).to_string())
		.send()
		.await
		.unwrap();
	if response.status() != StatusCode::OK {
		println!(
			"Failed to fetch sponsors: {}",
			response.text().await.unwrap()
		);
		return Json(vec![]);
	}
	let data: structs::SponsorData = response
		.json::<structs::SponsorResponse>()
		.await
		.expect("Failed to unwrap sponsor data")
		.data;
	let sponsors = data.user.sponsorshipsAsMaintainer.nodes;
	let mut sponsor_list: Vec<structs::Sponsor> = vec![];
	for user in sponsors {
		sponsor_list.push(structs::Sponsor {
			name: user.sponsorEntity.name,
			username: user.sponsorEntity.login,
			avatar: user.sponsorEntity.avatarUrl,
			tier: user.tier,
		});
	}
	Json(sponsor_list)
}
