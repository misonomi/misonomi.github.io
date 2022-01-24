use seed::{prelude::*, *};
use std::collections::HashSet;

#[macro_use]
mod tags;
mod clearer;
mod instruction;
mod operators;
mod result_display;
mod tag_selector;

use super::utils::*;
use operators::*;

const TAG_N: u8 = 6;

pub enum Msg {
    Toggle(tags::Tag),
    Clear,
    ChangeLanguage(Language),
}

pub struct Model {
    language: Language,
    selected_tags: HashSet<tags::Tag>,
    candidates: Vec<Operator>,
    all_oeprators: Vec<Operator>,
}

pub fn init(_: Url, _: &mut impl Orders<Msg>) -> Model {
    Model {
        language: Language::Japanese,
        selected_tags: HashSet::with_capacity(TAG_N as usize),
        candidates: vec![],
        all_oeprators: Operator::all(),
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
                model.candidates = Operator::find(&model.all_oeprators, &model.selected_tags);
            }
        }
        Msg::Clear => {
            model.selected_tags = HashSet::with_capacity(TAG_N as usize);
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
