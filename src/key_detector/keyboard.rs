use seed::{prelude::*, *};
use std::collections::HashSet;

use super::{notes, notes::*, Msg};

pub fn view(selected_notes: &HashSet<Note>) -> Node<Msg> {
    div![
        attrs! {At::Id => "keyboard-area"},
        notes::view(Note::C, selected_notes.contains(&Note::C)),
        notes::view(Note::Cs, selected_notes.contains(&Note::Cs)),
        notes::view(Note::D, selected_notes.contains(&Note::D)),
        notes::view(Note::Ds, selected_notes.contains(&Note::Ds)),
        notes::view(Note::E, selected_notes.contains(&Note::E)),
        notes::view(Note::F, selected_notes.contains(&Note::F)),
        notes::view(Note::Fs, selected_notes.contains(&Note::Fs)),
        notes::view(Note::G, selected_notes.contains(&Note::G)),
        notes::view(Note::Gs, selected_notes.contains(&Note::Gs)),
        notes::view(Note::A, selected_notes.contains(&Note::A)),
        notes::view(Note::As, selected_notes.contains(&Note::As)),
        notes::view(Note::B, selected_notes.contains(&Note::B)),
    ]
}
