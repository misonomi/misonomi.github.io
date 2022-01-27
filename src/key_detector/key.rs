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

    pub fn all() -> Vec<Key> {
        Note::all().map(|n| Key::Major(n)).collect()
    }
    pub fn contains(&self, notes: &HashSet<Note>) -> bool {
        match self {
            Key::Major(n) => notes.contains(n),
            Key::Minor(n) => false,
        }
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

