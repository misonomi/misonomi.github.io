use std::collections::HashSet;

use seed::virtual_dom::Node;
use seed::{prelude::*, *};

use super::Q_N;
use super::{recruiter_tags::tag_view, Msg};
use crate::recruiter::tags;
use crate::utils::*;

pub fn view(lng: &Language, tags: &HashSet<tags::Tag>, count: usize) -> Node<Msg> {
    div![
        attrs! {At::Id => "question-area"},
        h2![Multilingual::new("", "このタグの確定レアリティは？", "Which is the highest possible rarity from these tags?").select(lng)],
        div![
            attrs! {At::Id => "position-marker-area"},
            (0..Q_N).into_iter().map(|a| div![C![
                "position-marker",
                if a < count {
                    "past"
                } else if a == count {
                    "current"
                } else {
                    "future"
                }
            ]])
        ],
        div![C!["tag-pool"], tags.iter().map(|t| tag_view(t, lng))],
        div![C!["spacer"]],
        div![C![""], vec![6, 5, 4, 3].into_iter().map(|a| button![C!["rarity-button"], ev(Ev::Click, move |_| Msg::Answer(a)), format!("★{}", a),]),],
    ]
}
