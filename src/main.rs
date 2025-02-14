#[macro_use]
extern crate rocket;
use dotenv::dotenv;
use rocket::fs::FileServer;
use rocket::response::Redirect;
mod github;

#[catch(404)]
fn redirect_index() -> Redirect {
    Redirect::to(uri!("/"))
}

#[rocket::launch]
fn rocket() -> _ {
    dotenv().ok();
    rocket::build()
        .mount("/", FileServer::from("dist"))
        .mount("/api", rocket::routes![github::sponsors])
        .register("/", catchers![redirect_index])
}
