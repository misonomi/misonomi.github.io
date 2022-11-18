use std::collections::HashSet;

use seed::virtual_dom::Node;
use seed::{prelude::*, *};

use super::Msg;
use crate::recruiter::tags;
use crate::utils::*;

pub fn view(lng: &Language, tags: &HashSet<tags::Tag>) -> Node<Msg> {
    div![
        attrs! {At::Id => "result-area"},
        h2![
            C!["candidate-title"],
            Multilingual::new("", "このタグから雇用できる最高レアリティは？", "Which is the highest possible rarity from these tags?").select(lng)
        ],
        hr![],
        div![C!["operator-pool"], tags.iter().map(|t| tag_view(t, lng))],
        div![C![""], vec![3, 4, 5, 6].into_iter().map(|a| button![C!["tag-button"], ev(Ev::Click, move |_| Msg::Answer(a)), format!("★{}", a),]),],
    ]
}

fn tag_view(tag: &tags::Tag, lng: &Language) -> Node<Msg> {
    div![C!["tag-button"], i![C!["tagico", tag.iconname()]], tag.name().select(lng),]
}
