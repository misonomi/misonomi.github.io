#![recursion_limit = "1024"]

use wasm_bindgen::prelude::*;
#[allow(unused_imports)]
use yew::prelude::App;

mod accessories;
mod menu;
mod recruiter;
mod under_construction;
mod key_detector;

#[wasm_bindgen(start)]
pub fn run_app() {
    #[cfg(feature = "index")]
    App::<menu::RollingMenu>::new().mount_to_body();
    #[cfg(feature = "an-recruiter")]
    App::<recruiter::Recruiter>::new().mount_to_body();
    #[cfg(feature = "accessories")]
    App::<accessories::Accessories>::new().mount_to_body();
    #[cfg(feature = "assemble")]
    App::<under_construction::UnderConstruction>::new().mount_to_body();
    #[cfg(feature = "key-detector")]
    App::<key_detector::KeyDetector>::new().mount_to_body();
}
