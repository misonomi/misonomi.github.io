use seed::{prelude::*, *};
use std::collections::HashSet;

mod notes;
mod keyboard;
mod clearer;

use notes::*;
use crate::utils::*;

pub struct Model {
    selected_notes: HashSet<Note>,
}

pub enum Msg {
    Clear,
    Toggle(Note),
}

pub fn init(_: Url, _: &mut impl Orders<Msg>) -> Model {
    Model {
        selected_notes: HashSet::new(),
    }
}

pub fn update(msg: Msg, model: &mut Model, _: &mut impl Orders<Msg>) {
    match msg {
        Msg::Clear => {
            model.selected_notes.clear();
        }
        Msg::Toggle(n) => {
            if model.selected_notes.contains(&n) {
                model.selected_notes.remove(&n);
            } else {
                model.selected_notes.insert(n);
            }
        },
    }
}

pub fn view(model: &Model) -> Node<Msg> {
    main![
        clearer::view(&Language::Japanese, "left"),
        keyboard::view(&model.selected_notes),
        clearer::view(&Language::Japanese, "right"),
    ]
}
