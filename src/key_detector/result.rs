use seed::{prelude::*, *};

use super::{key::*, Msg};
use crate::utils::*;

pub fn view(candidates: &Vec<Key>, lng: &Language) -> Node<Msg> {
    div![
        attrs! {At::Id => "result-area"},
        candidates.iter().map(|c| c.view()),
        IF!(candidates.is_empty() => h2![Multilingual::new("", "なんもないよ", "").select(lng)]),
    ]
}
