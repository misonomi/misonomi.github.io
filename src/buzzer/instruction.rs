use seed::{prelude::*, *};

use super::Msg;
use crate::utils::*;

pub fn view(lng: &Language) -> Node<Msg> {
    div![
        attrs! {At::Id => "inst-area"},
        h2![C!["inst-title"], Multilingual::new("", "公開求人早押しクイズ", "Recruitement Buzzer Quiz").select(lng)],
        hr![],
        p![Multilingual::new("", "確定タグを瞬時に見極めて上級資格証をたくさん集めよう！全10問", "",).select(lng)],
        button! {
            C!["primary-button"],
            ev(Ev::Click, |_| Msg::Start),
            Multilingual::new("", "開始", "Start").select(lng),
        },
    ]
}
