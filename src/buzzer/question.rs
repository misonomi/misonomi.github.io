use rand::{thread_rng, Rng};
use seed::virtual_dom::Node;
use seed::{prelude::*, *};
use std::collections::HashSet;

use super::{recruiter_tags::tag_view, Msg};
use super::{Q_N, TAG_N};
use crate::recruiter::tags::{self, TagSet};
use crate::utils::*;

pub fn view(lng: &Language, tags: &HashSet<tags::Tag>, count: usize) -> Node<Msg> {
    div![
        attrs! {At::Id => "question-area"},
        h2![Multilingual::new(
            "Which is the highest guaranteeed rarity from these tags?",
            "このタグの確定レアリティは？",
            "Which is the highest guaranteeed rarity from these tags?"
        )
        .select(lng)],
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
        div![vec![6, 5, 4, 3].into_iter().map(|a| button![C!["rarity-button"], ev(Ev::Click, move |_| Msg::Answer(a)), format!("★{}", a),]),],
    ]
}

pub fn tag() -> HashSet<tags::Tag> {
    let mut rng = thread_rng();
    let rarity = match rng.gen_range(0..=9) {
        0..=2 => 3,
        3..=5 => 4,
        6..=8 => 5,
        _ => 6,
    };
    let mut tags: HashSet<tags::Tag>;

    loop {
        tags = HashSet::random_tags(TAG_N);

        let (max, _) = tags.max_guaranteed();

        if rarity == max {
            break;
        }
    }
    tags
}
