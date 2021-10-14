use std::collections::HashSet;
use yew::prelude::*;

#[macro_use]
mod tags;
mod clearer;
mod instruction;
mod language;
mod operators;
mod result_display;
mod tag_selector;

use clearer::*;
use instruction::*;
use language::*;
use operators::*;
use result_display::*;
use tag_selector::*;
use tags::*;

const TAG_N: u8 = 6;

pub enum Msg {
    Toggle(Tag),
    Clear,
    ChangeLanguage(Language),
}

pub struct Recruiter {
    link: ComponentLink<Self>,
    language: Language,
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
            selected_tags: HashSet::with_capacity(TAG_N as usize),
            candidates: vec![],
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
            }
            Msg::Clear => {
                self.selected_tags = HashSet::with_capacity(TAG_N as usize);
                self.candidates = vec![];
                true
            }
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
                <Clearer class="left" language=self.language.clone()/>
                <div id="lng-button-area">
                    <button class="lng-button" onclick=self.link.callback(|_| Msg::ChangeLanguage(Language::Chinese))>{ "中文" }</button>
                    <button class="lng-button" onclick=self.link.callback(|_| Msg::ChangeLanguage(Language::Japanese))>{ "日本語" }</button>
                    <button class="lng-button" onclick=self.link.callback(|_| Msg::ChangeLanguage(Language::English))>{ "English" }</button>
                </div>
                <TagSelector selected_tags=self.selected_tags.clone().into_iter().collect::<Vec<Tag>>() language=self.language.clone()/>
                {
                    if self.selected_tags.is_empty() {
                        html!{ <Instruction language=self.language.clone()/> }
                    } else {
                        html!{ <ResultDisplay candidates=self.candidates.clone() language=self.language.clone()/> }
                    }
                }
                <Clearer class="right" language=self.language.clone()/>
            </main>
        }
    }
}
