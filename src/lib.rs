#![recursion_limit="256"]

use wasm_bindgen::prelude::*;
use yew::prelude::{ App };

mod menu;

#[wasm_bindgen(start)]
pub fn run_app() {
    #[cfg(feature = "index")]
    App::<menu::RollingMenu>::new().mount_to_body();
}