use seed::{prelude::*, *};

use super::{tags, Msg};
use crate::utils::*;

pub fn view(selected_tags: Vec<tags::Tag>, lng: &Language) -> Node<Msg> {
    div![
        attrs! {At::Id => "tag-area"},
        div![C!["tag-container"], tags::classes().into_iter().map(|t| t.view(selected_tags.contains(&t), lng)),],
        hr![],
        div![C!["tag-container"], tags::positions().into_iter().map(|t| t.view(selected_tags.contains(&t), lng)),],
        hr![],
        div![C!["tag-container"], tags::qualifications().into_iter().map(|t| t.view(selected_tags.contains(&t), lng)),],
        hr![],
        div![C!["tag-container"], tags::affix().into_iter().map(|t| t.view(selected_tags.contains(&t), lng)),],
    ]
}
