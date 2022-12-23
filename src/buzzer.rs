use seed::{prelude::*, *};
use std::collections::HashSet;
use std::mem;
use std::time::Duration;
use wasm_timer::Instant;

use crate::recruiter::tags::{self, TagSet};
use crate::utils::*;

mod instruction;
mod question;
mod recruiter_tags;
mod result;
mod state;

use state::State;

const TAG_N: usize = 5;
const Q_N: usize = 10;

pub enum Msg {
    Answer(u8),
    Start,
    Reset,
    ChangeLanguage(Language),
}

pub struct Model {
    state: state::State,
    language: Language,
    tags: HashSet<tags::Tag>,
    results: Vec<result::Result>,
    timer: Instant,
    time: Duration,
}

pub fn init(_: Url, _: &mut impl Orders<Msg>) -> Model {
    Model {
        state: State::Standby,
        language: Language::Japanese,
        tags: HashSet::with_capacity(TAG_N),
        results: vec![],
        timer: Instant::now(),
        time: Default::default(),
    }
}

pub fn update(msg: Msg, model: &mut Model, _: &mut impl Orders<Msg>) {
    match msg {
        Msg::Answer(ans) => {
            if model.results.len() >= Q_N - 1 {
                model.time = Instant::now().duration_since(model.timer);
                model.state = State::Result;
            }
            let correct = model.tags.max_rarity();
            let mut new_tags = HashSet::random_tags(TAG_N);
            mem::swap(&mut model.tags, &mut new_tags);

            model.results.push(result::Result::new(ans, correct, new_tags));
        }
        Msg::Start => {
            model.timer = Instant::now();
            model.state = State::InGame;
            model.results = vec![];
            model.tags = HashSet::random_tags(TAG_N);
        }
        Msg::Reset => {
            model.state = State::Standby;
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
        IF!(model.state == State::InGame => question::view(&model.language, &model.tags, model.results.len())),
        IF!(model.state == State::Result => result::view(&model.language, &model.results, model.time)),
    ]
}
