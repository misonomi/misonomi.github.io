use seed::{prelude::*, *};
use std::collections::HashSet;

use super::{note::*, Msg};

pub fn view(selected_notes: &HashSet<Note>) -> Node<Msg> {
    div![attrs! {At::Id => "keyboard-area"}, Note::all().map(|n| n.view(selected_notes.contains(&n))),]
}
