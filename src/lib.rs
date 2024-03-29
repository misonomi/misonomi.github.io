use seed::prelude::*;

mod buzzer;
mod key_detector;
mod menu;
mod recruiter;
mod under_construction;
mod utils;

#[wasm_bindgen(start)]
pub fn run_app() {
    if cfg!(feature = "index") {
        App::start("top", menu::init, menu::update, menu::view);
    }
    if cfg!(feature = "an-recruiter") {
        App::start("anr", recruiter::init, recruiter::update, recruiter::view);
    }
    if cfg!(feature = "an-recruite-buzzerquiz") {
        App::start("rbq", buzzer::init, buzzer::update, buzzer::view);
    }
    if cfg!(feature = "assemble") {
        App::start("asb", under_construction::init, under_construction::update, under_construction::view);
    }
    if cfg!(feature = "key-detector") {
        App::start("kdt", key_detector::init, key_detector::update, key_detector::view);
    }
}
