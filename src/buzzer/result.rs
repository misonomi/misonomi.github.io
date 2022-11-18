use std::collections::HashSet;

use seed::virtual_dom::Node;
use seed::{prelude::*, *};

use super::Msg;
use crate::recruiter::tags;
use crate::utils::*;

pub enum Result {
    Correct,
    Wrong(Detail),
}

impl Result {
    pub fn view(&self, lng: &Language) -> Node<Msg> {
        unimplemented!()
    }
}

pub struct Detail {
    pub choose: u8,
    pub correct: u8,
    pub tags: HashSet<tags::Tag>,
}

pub fn view(lng: &Language, result: &Vec<Result>) -> Node<Msg> {
    div![
        attrs! {At::Id => "result-area"},
        h2![C!["candidate-title"], Multilingual::new("", "結果発表", "Result").select(lng)],
        hr![],
        div![C!["operator-pool"], result.iter().map(|c| c.view(lng))],
    ]
}
