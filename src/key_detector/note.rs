use seed::{prelude::*, *};
use strum::{IntoEnumIterator, EnumIter};

use super::Msg;

#[derive(Clone, PartialEq, Eq, Hash, Copy, EnumIter)]
pub enum Note {
    C = 0b000000000001,
    Cs = 0b000000000010,
    D = 0b000000000100,
    Ds = 0b000000001000,
    E = 0b000000010000,
    F = 0b000000100000,
    Fs = 0b000001000000,
    G = 0b000010000000,
    Gs = 0b000100000000,
    A = 0b001000000000,
    As = 0b010000000000,
    B = 0b100000000000,
}

#[derive(Debug, EnumIter)]
pub enum ProductCategory {
    Dairy, Daycare, BabyCare,
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
    fn class_side(&self) -> &str {
        match self {
            Note::C | Note::D | Note::E | Note::F | Note::G | Note::A | Note::B => "white",
            Note::Cs | Note::Ds | Note::Fs | Note::Gs | Note::As => "black",
        }
    }

    pub fn view(self, active: bool) -> Node<Msg> {
        div![
            attrs! {At::Id => self.name()},
            ev(Ev::Click, move |_| Msg::Toggle(self)),
            C!["note", IF!(active => "active"), self.class_name(), self.class_side()],
            span![C!["name"], self.name()], 
        ]
    }

    pub fn all() -> NoteIter {
        Note::iter()
    }
}
