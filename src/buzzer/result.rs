use std::collections::HashSet;
use std::time::Duration;

use seed::virtual_dom::Node;
use seed::{prelude::*, *};

use super::recruiter_tags::tag_view;
use super::{Msg, Q_N};
use crate::recruiter::{operators::Operator, tags};
use crate::utils::*;

pub struct Result {
    choose: u8,
    correct: u8,
    tags: HashSet<tags::Tag>,
    example: Operator,
}

impl Result {
    pub fn new(choose: u8, correct: u8, tags: HashSet<tags::Tag>, example: Operator) -> Self {
        Self { choose, correct, tags, example }
    }

    fn is_correct(&self) -> bool {
        self.choose == self.correct
    }

    pub fn view(&self, lng: &Language) -> Node<Msg> {
        div![
            C!["result-card"],
            p![C!["my-ans"], format!("{}: {}", Multilingual::new("答", "答", "Your ans").select(lng), self.choose),],
            if self.is_correct() {
                i![C!["material-icons", "result-headline", "correct"], "check_circle"]
            } else {
                i![C!["material-icons", "result-headline", "wrong"], "close"]
            },
            p![C!["correct-ans"], format!("{}: {}", Multilingual::new("正", "正", "Correct").select(lng), self.correct),],
            p![
                C!["sample-op"],
                format!("{} ({})", self.example.name().select(lng), self.example.tags().iter().map(|t| t.name().select(lng)).collect::<Vec<String>>().join(", ")),
            ],
            div![C!["tag-pool"], self.tags.iter().map(|t| tag_view(t, lng))],
        ]
    }
}

pub fn view(lng: &Language, result: &Vec<Result>, time: Duration) -> Node<Msg> {
    let t_sec = time.as_millis() as f64 / 1000.0;
    let correct_count = result.iter().filter(|r| r.is_correct()).count();
    let cerificate = result
        .iter()
        .filter(|r| r.is_correct())
        .map(|r| match r.choose {
            4 => 1.0,
            5 => 13.0,
            6 => 25.0,
            _ => 0.0,
        })
        .fold(0.0, |acc, x| acc + x)
        * 60.0 / time.as_secs_f32();

    div![
        attrs! {At::Id => "result-area"},
        h2![format!(
            "{}{} {}",
            Multilingual::new("所需时间: ", "所要時間: ", "Time: ").select(lng),
            t_sec,
            Multilingual::new("秒", "秒", "secs").select(lng)
        )],
        h2![format!("{}{} / {}", Multilingual::new("准确性: ", "正答数: ", "Accuracy: ").select(lng), correct_count, Q_N)],
        tweet_button(lng, t_sec, correct_count, cerificate),
        hr![],
        div![C!["results"], result.iter().map(|r| r.view(lng))],
        button! {
            C!["primary-button"],
            ev(Ev::Click, |_| Msg::Reset),
            Multilingual::new("再玩一次", "もう一度遊ぶ", "Play again").select(lng),
        },
        a! {
            C!["primary-button"],
            attrs!{
                At::Href => "recruitment-helper.html",
                At::Target => "_blank"
            },
            Multilingual::new("Open Recruitment Helper", "公開求人ヘルパーを開く", "Open Recruitment Helper").select(lng),
        },
    ]
}

fn tweet_button(lng: &Language, time: f64, correct_count: usize, certificate: f32) -> Node<Msg> {
    div![
        C!["tweet-container"],
        a![
            attrs! {
                At::Href => "https://twitter.com/share?ref_src=twsrc%5Etfw",
                At::from("data-text") => Multilingual::new(
                    &format!("I can collect {:.2} Distinction Certificates per minute!\nTime: {}secs, Accuracy: {}/{}\n", certificate, time, correct_count, Q_N),
                    &format!("私は一分間に{:.2}個の上級資格証を集めることができます！\n所要時間: {}秒, 正答数: {}/{}\n", certificate, time, correct_count, Q_N),
                    &format!("I can collect {:.2} Distinction Certificates per minute!\nTime: {}secs, Accuracy: {}/{}\n", certificate, time, correct_count, Q_N),
                ).select(lng),
                At::from("data-show-count") => "false",
                At::from("data-hashtags") => "早押し公開求人",
            },
            C!["twitter-share-button"],
            Multilingual::new("发推你的分数", "結果をツイートする", "Tweet your score").select(lng),
        ],
        Script![attrs! {
            At::Async => true,
            At::Src => "https://platform.twitter.com/widgets.js",
            At::Charset => "utf-8",
        }],
    ]
}
