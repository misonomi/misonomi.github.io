use seed::{prelude::*, *};

use super::Msg;
use crate::recruiter::tags;
use crate::utils::*;

pub fn tag_view(tag: &tags::Tag, lng: &Language) -> Node<Msg> {
    div![C!["tag-card"], i![C!["tagico", tag.iconname()]], tag.name().select(lng),]
}
