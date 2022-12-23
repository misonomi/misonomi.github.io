use seed::{prelude::*, *};

use super::Msg;
use crate::utils::*;

pub fn view(lng: &Language) -> Node<Msg> {
    div![
        attrs! {At::Id => "inst-area"},
        h2![C!["inst-title"], Multilingual::new("公招计算 Buzzer Quiz", "公開求人早押しクイズ", "Recruitement Buzzer Quiz").select(lng)],
        hr![],
        p![Multilingual::new(
            "Instantly discern tags and collect Distinction Certificate as much as you can! 10 questions. 帮助我翻译 (contact: https://twitter.com/miso_nomi)",
            "確定タグを瞬時に見極めて上級資格証をたくさん集めよう！全10問",
            "Instantly discern tags and collect Distinction Certificate as much as you can! 10 questions. Help me translate (contact: https://twitter.com/miso_nomi)",
        )
        .select(lng)],
        button! {
            C!["primary-button"],
            ev(Ev::Click, |_| Msg::Start),
            Multilingual::new("开始", "開始", "Start").select(lng),
        },
    ]
}
