use seed::{prelude::*, *};
use std::collections::HashSet;
use std::mem;
use wasm_timer::Instant;

use crate::recruiter::tags::{self, TagSet};
use crate::utils::*;

mod instruction;
mod question;
mod result;
mod state;

use state::State;

const TAG_N: u8 = 6;

pub enum Msg {
    Answer(u8),
    Start,
    ChangeLanguage(Language),
}

pub struct Model {
    state: state::State,
    language: Language,
    tags: HashSet<tags::Tag>,
    results: Vec<result::Result>,
    timer: Option<Instant>,
}

pub fn init(_: Url, _: &mut impl Orders<Msg>) -> Model {
    Model {
        state: State::Standby,
        language: Language::Japanese,
        tags: Default::default(),
        results: vec![],
        timer: None,
    }
}

pub fn update(msg: Msg, model: &mut Model, _: &mut impl Orders<Msg>) {
    match msg {
        Msg::Answer(int) => {
            let ans = model.tags.max();
            let mut new_tags = HashSet::random_tags(TAG_N.into());
            mem::swap(&mut model.tags, &mut new_tags);
            model.results.push(if ans == int {
                result::Result::Correct
            } else {
                result::Result::Wrong(result::Detail{
                    choose: int,
                    correct: ans,
                    tags: new_tags,
                })
            })
        }
        Msg::Start => {
            model.timer = Some(Instant::now());
            model.state = State::InGame;
            model.tags = HashSet::random_tags(TAG_N.into());
        }
        Msg::ChangeLanguage(lng) => {
            model.language = lng;
        }
    }
}

pub fn view(model: &Model) -> Node<Msg> {
    main![
        div![
            attrs! {At::Id => "lng-button-area"},
            button![C!["lng-button"], ev(Ev::Click, |_| Msg::ChangeLanguage(Language::Chinese)), "中文"],
            button![C!["lng-button"], ev(Ev::Click, |_| Msg::ChangeLanguage(Language::Japanese)), "日本語"],
            button![C!["lng-button"], ev(Ev::Click, |_| Msg::ChangeLanguage(Language::English)), "English"],
        ],
        IF!(model.state == State::Standby => instruction::view(&model.language)),
        IF!(model.state == State::InGame => question::view(&model.language, &model.tags)),
        IF!(model.state == State::Result => result::view(&model.language, &model.results)),
    ]
}
