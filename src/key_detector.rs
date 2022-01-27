use seed::{prelude::*, *};
use std::collections::HashSet;

mod note;
mod keyboard;
mod clearer;
mod instruction;
mod result;
mod key;

use note::*;
use key::*;
use crate::utils::*;

pub struct Model {
    selected_notes: HashSet<Note>,
    all_keys: Vec<Key>,
    candidate_keys: Vec<Key>,
}

pub enum Msg {
    Clear,
    Toggle(Note),
}

pub fn init(_: Url, _: &mut impl Orders<Msg>) -> Model {
    Model {
        selected_notes: HashSet::new(),
        all_keys: Key::all(),
        candidate_keys: Vec::new(),
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

            model.candidate_keys = model.all_keys.clone().into_iter().filter(|k| k.contains(&model.selected_notes)).collect();
        },
    }
}

pub fn view(model: &Model) -> Node<Msg> {
    main![
        clearer::view(&Language::Japanese, "left"),
        keyboard::view(&model.selected_notes),
        hr![],
        IF!(model.selected_notes.is_empty() => instruction::view(&Language::Japanese)),
        IF!(!model.selected_notes.is_empty() => result::view(&model.candidate_keys, &Language::Japanese)),
        clearer::view(&Language::Japanese, "right"),
    ]
}
