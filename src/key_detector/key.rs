use std::collections::HashSet;
use seed::{prelude::*, *};

use super::{Msg, note::*};

#[derive(Clone, PartialEq, Eq, Hash, Copy)]
pub enum Key {
    Major(Note),
    Minor(Note),
}

impl Key {
    fn class(&self) -> String {
        match self {
            Key::Major(n) => format!("{}-major", n.class_name()),
            Key::Minor(n) => format!("{}-minor", n.class_name()),
        }
    }
    fn name(&self) -> String {
        match self {
            Key::Major(n) => format!("{} Major", n.name()),
            Key::Minor(n) => format!("{} Minor", n.name()),
        }
    }
    fn query(&self) -> String {
        match self {
            Key::Major(n) => format!("{}+Major", n.name()),
            Key::Minor(n) => format!("{}+Minor", n.name()),
        }
    }
    fn bits(&self) -> u32 {
        let shifted = match self {
            Key::Major(n) => 0b101010110101 * (*n as u32),
            Key::Minor(n) => 0b010110101101 * (*n as u32),
        };
        shifted | (shifted >> 12)
    }

    pub fn all() -> Vec<Key> {
        Note::all().flat_map(|n| [Key::Major(n), Key::Minor(n)]).collect()
    }
    pub fn contains(&self, notes: &HashSet<Note>) -> bool {
        self.bits() == self.bits() | notes.iter().map(|n| (*n as u32)).reduce(|sum, n| sum | n).unwrap_or(0b0)
    }

    pub fn view(self) -> Node<Msg> {
        div![
            C!["key-card", self.class()],
            ev(Ev::Click, move |_| {
                web_sys::window().unwrap().open_with_url(&format!("https://www.youtube.com/results?search_query={}+Scale", self.query())).unwrap();
            }),
            span![self.name()],
        ]
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn bits_is_ok() {
        assert_eq!(Key::Major(Note::C).bits(), 0b101011010101);
        assert_eq!(Key::Major(Note::Cs).bits(), 0b1010110101011);
        assert_eq!(Key::Major(Note::D).bits(), 0b10101101010110);
        assert_eq!(Key::Major(Note::Ds).bits(), 0b101011010101101);
        assert_eq!(Key::Major(Note::E).bits(), 0b1010110101011010);
        assert_eq!(Key::Major(Note::F).bits(), 0b10101101010110101);
        assert_eq!(Key::Major(Note::Fs).bits(), 0b101011010101101011);
    }

    #[test]
    fn contains_is_ok() {
        let mut cm = HashSet::new();
        cm.insert(Note::C);
        cm.insert(Note::D);
        cm.insert(Note::E);
        cm.insert(Note::F);
        cm.insert(Note::G);
        cm.insert(Note::A);
        cm.insert(Note::B);

        assert_eq!(Key::Major(Note::C).contains(&cm), true);
        assert_eq!(Key::Minor(Note::A).contains(&cm), true);
    }
}
