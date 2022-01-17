use seed::{prelude::*, *};

use super::{
    language::{Language, Multilingual},
    Msg,
};

pub fn view(lng: &Language, class: &str) -> Node<Msg> {
    div![
        C!["clear-area", class],
        ev(Ev::Click, |_| Msg::Clear),
        i![C!["material-icons"], "delete_outline"],
        span![Multilingual::new("退选", "選択解除", "Clear Selection").select(lng)],
    ]
}
