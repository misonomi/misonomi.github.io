use seed::{prelude::*, *};
use std::collections::HashSet;

#[macro_use]
pub mod tags;
pub mod operators;
mod clearer;
mod instruction;
mod result_display;
mod tag_selector;

use crate::utils::*;
use operators::*;

use self::tags::TagSet;

const TAG_N: usize = 6;

pub enum Msg {
    Toggle(tags::Tag),
    Clear,
    ChangeLanguage(Language),
}

pub struct Model {
    language: Language,
    selected_tags: HashSet<tags::Tag>,
    candidates: Vec<Operator>,
}

pub fn init(_: Url, _: &mut impl Orders<Msg>) -> Model {
    Model {
        language: Language::Japanese,
        selected_tags: HashSet::with_capacity(TAG_N),
        candidates: vec![],
    }
}

pub fn update(msg: Msg, model: &mut Model, _: &mut impl Orders<Msg>) {
    match msg {
        Msg::Toggle(tag) => {
            let render = match model.selected_tags.contains(&tag) {
                true => model.selected_tags.remove(&tag),
                false => model.selected_tags.insert(tag),
            };
            if render {
                model.candidates = model.selected_tags.candidates();
            }
        }
        Msg::Clear => {
            model.selected_tags = HashSet::with_capacity(TAG_N);
            model.candidates = vec![];
        }
        Msg::ChangeLanguage(lng) => {
            model.language = lng;
        }
    }
}

pub fn view(model: &Model) -> Node<Msg> {
    main![
        clearer::view(&model.language, "left"),
        div![
            attrs! {At::Id => "lng-button-area"},
            button![C!["lng-button"], ev(Ev::Click, |_| Msg::ChangeLanguage(Language::Chinese)), "中文"],
            button![C!["lng-button"], ev(Ev::Click, |_| Msg::ChangeLanguage(Language::Japanese)), "日本語"],
            button![C!["lng-button"], ev(Ev::Click, |_| Msg::ChangeLanguage(Language::English)), "English"],
        ],
        tag_selector::view(model.selected_tags.clone().into_iter().collect(), &model.language),
        IF!(model.selected_tags.is_empty() => instruction::view(&model.language)),
        IF!(!model.selected_tags.is_empty() => result_display::view(&model.candidates, &model.language)),
        clearer::view(&model.language, "right"),
    ]
}
