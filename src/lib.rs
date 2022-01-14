#![recursion_limit = "1024"]

use seed::prelude::*;

mod menu;
// mod recruiter;
mod key_detector;
mod under_construction;

#[wasm_bindgen(start)]
pub fn run_app() {
    #[cfg(feature = "index")]
    App::start("top", menu::init, menu::update, menu::view);
    //#[cfg(feature = "an-recruiter")]
    //App::<recruiter::Recruiter>::new().mount_to_body();
    #[cfg(feature = "assemble")]
    App::start("asb", under_construction::init, under_construction::update, under_construction::view);
    #[cfg(feature = "key-detector")]
    App::start("kdt", key_detector::init, key_detector::update, key_detector::view);
}
