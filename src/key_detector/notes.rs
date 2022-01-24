use seed::{prelude::*, *};

use super::Msg;

#[derive(Clone, PartialEq, Eq, Hash, Copy)]
pub enum Note {
    C = 0,
    Cs = 1,
    D = 2,
    Ds = 3,
    E = 4,
    F = 5,
    Fs = 6,
    G = 7,
    Gs = 8,
    A = 9,
    As = 10,
    B = 11,
}

impl Note {
    pub fn name(&self) -> &str {
        match self {
            Note::C => "C",
            Note::Cs => "C#",
            Note::D => "D",
            Note::Ds => "D#",
            Note::E => "E",
            Note::F => "F",
            Note::Fs => "F#",
            Note::G => "G",
            Note::Gs => "G#",
            Note::A => "A",
            Note::As => "A#",
            Note::B => "B",
        }
    }
    pub fn class_name(&self) -> &str {
        match self {
            Note::C => "c",
            Note::Cs => "cs",
            Note::D => "d",
            Note::Ds => "ds",
            Note::E => "e",
            Note::F => "f",
            Note::Fs => "fs",
            Note::G => "g",
            Note::Gs => "gs",
            Note::A => "a",
            Note::As => "as",
            Note::B => "b",
        }
    }
    pub fn class_side(&self) -> &str {
        match self {
            Note::C | Note::D | Note::E | Note::F | Note::G | Note::A | Note::B => "white",
            Note::Cs | Note::Ds | Note::Fs | Note::Gs | Note::As => "black",
        }
    }
}

pub fn view(n: Note, active: bool) -> Node<Msg> {
    div![
        attrs! {At::Id => n.name()},
        ev(Ev::Click, move |_| Msg::Toggle(n)),
        C!["note", IF!(active => "active"), n.class_name(), n.class_side()],
        span![C!["name"], n.name()], 
    ]
}
