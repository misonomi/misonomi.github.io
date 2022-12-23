use std::collections::HashSet;
use std::time::Duration;

use seed::virtual_dom::Node;
use seed::{prelude::*, *};

use super::recruiter_tags::tag_view;
use super::{Msg, Q_N};
use crate::recruiter::tags;
use crate::utils::*;

pub struct Result {
    choose: u8,
    correct: u8,
    tags: HashSet<tags::Tag>,
}

impl Result {
    pub fn new(choose: u8, correct: u8, tags: HashSet<tags::Tag>) -> Self {
        Self { choose, correct, tags }
    }

    fn is_correct(&self) -> bool {
        self.choose == self.correct
    }

    pub fn view(&self, lng: &Language) -> Node<Msg> {
        div![
            C!["result-card"],
            p![
                C!["my-ans"],
                format!("{}: {}", Multilingual::new("", "答", "").select(lng), self.choose),
            ],
            if self.is_correct() {
                i![C!["material-icons", "result-headline", "correct"], "check_circle"]
            } else {
                i![C!["material-icons", "result-headline", "wrong"], "close"]
            },
            p![
                C!["correct-ans"],
                format!("{}: {}", Multilingual::new("", "正", "").select(lng), self.correct),
            ],
            div![C!["tag-pool"], self.tags.iter().map(|t| tag_view(t, lng))],
        ]
    }
}

pub fn view(lng: &Language, result: &Vec<Result>, time: Duration) -> Node<Msg> {
    div![
        attrs! {At::Id => "result-area"},
        h2![
            C![""],
            format!(
                "{}{} {}",
                Multilingual::new("", "所要時間: ", "").select(lng),
                time.as_millis() as f64 / 1000.0,
                Multilingual::new("", "秒", "Seconds").select(lng)
            )
        ],
        h2![C![""], format!("{}{} / {}", Multilingual::new("", "正答数: ", "").select(lng), result.iter().filter(|r| r.is_correct()).count(), Q_N)],
        hr![],
        div![C!["results"], result.iter().map(|r| r.view(lng))],
        button! {
            C!["primary-button"],
            ev(Ev::Click, |_| Msg::Reset),
            Multilingual::new("", "もう一度遊ぶ", "Play again").select(lng),
        },
    ]
}
