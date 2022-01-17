use seed::{prelude::*, *};

use super::{language::*, tags, Msg};

pub fn view(selected_tags: Vec<tags::Tag>, lng: &Language) -> Node<Msg> {
    div![
        attrs! {At::Id => "tag-area"},
        div![C!["tag-container"], tags::classes().into_iter().map(|t| tags::view(t.clone(), selected_tags.contains(&t), lng)),],
        hr![],
        div![C!["tag-container"], tags::positions().into_iter().map(|t| tags::view(t.clone(), selected_tags.contains(&t), lng)),],
        hr![],
        div![C!["tag-container"], tags::qualifications().into_iter().map(|t| tags::view(t.clone(), selected_tags.contains(&t), lng)),],
        hr![],
        div![C!["tag-container"], tags::affix().into_iter().map(|t| tags::view(t.clone(), selected_tags.contains(&t), lng)),],
    ]
}
