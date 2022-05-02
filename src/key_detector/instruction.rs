use seed::{prelude::*, *};

use super::Msg;
use crate::utils::*;

pub fn view(lng: &Language) -> Node<Msg> {
    div![attrs! {At::Id => "inst-area"}, h2![Multilingual::new("", "使用されている音を選択してください", "").select(lng)],]
}
