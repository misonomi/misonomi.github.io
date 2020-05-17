use std::collections::HashSet;
use yew::{ prelude::* };

#[macro_use]
mod tags;
mod operators;
mod language;
mod tag_selector;
mod result_display;

use tags::*;
use operators::*;
use language::*;
use tag_selector::*;
use result_display::*;

const TAG_N: u8 = 6;

pub enum Msg {
    Toggle(Tag),
    Clear,
    Submit,
    ChangeLanguage(Language),
}

struct Text {
    submit: Multilingual,
    clear: Multilingual,
}

impl Text {
    fn new() -> Text {
        Text{
            submit: Multilingual::new("", "決定", "Submit"),
            clear: Multilingual::new("", "選択解除", "Clear Selection"),
        }
    }
}

pub struct Recruiter {
    link: ComponentLink<Self>,
    language: Language,
    text: Text,
    selected_tags: HashSet<Tag>,
    candidates: Vec<Operator>,
    all_oeprators: Vec<Operator>,
}

impl Component for Recruiter {
    type Message = Msg;
    type Properties = ();
    fn create(_: Self::Properties, link: ComponentLink<Self>) -> Self {
        Self {
            link,
            language: Language::Japanese,
            text: Text::new(),
            selected_tags: HashSet::with_capacity(TAG_N as usize),
            candidates: vec!(),
            all_oeprators: Operator::all(),
        }
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg {
            Msg::Toggle(tag) => {
                let render = match self.selected_tags.contains(&tag) {
                    true => self.selected_tags.remove(&tag),
                    false => self.selected_tags.insert(tag),
                };
                if render {
                    self.candidates = Operator::find(&self.all_oeprators, &self.selected_tags);
                }
                render
            },
            Msg::Clear => {
                self.selected_tags = HashSet::with_capacity(TAG_N as usize);
                true
            },
            Msg::Submit => false,
            Msg::ChangeLanguage(lng) => {
                self.language = lng;
                true
            }
        }
    }

    fn change(&mut self, _props: Self::Properties) -> ShouldRender {
        false
    }

    fn view(&self) -> Html {
        html! {
            <main>
                <div id="lng-button-area">
                    <button class="lng-button" onclick=self.link.callback(|_| Msg::ChangeLanguage(Language::Chinese))>{ "中文" }</button>
                    <button class="lng-button" onclick=self.link.callback(|_| Msg::ChangeLanguage(Language::Japanese))>{ "日本語" }</button>
                    <button class="lng-button" onclick=self.link.callback(|_| Msg::ChangeLanguage(Language::English))>{ "English" }</button>
                </div>
                { TagSelector::view(&self.selected_tags, &self.language, &self.link) }
                <div id="ctrl-button-area">
                    <button onclick=self.link.callback(|_| Msg::Submit)>{ self.text.submit.select(&self.language) }</button>
                    <button onclick=self.link.callback(|_| Msg::Clear)>{ self.text.clear.select(&self.language) }</button>
                </div>
                { ResultDisplay::view(&self.candidates, &self.language) }
            </main>
        }
    }
}
