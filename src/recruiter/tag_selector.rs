use std::collections::HashSet;
use yew::prelude::*;

use super::{ Recruiter, tags::*, language::* };

#[derive(Properties, Clone)]
pub struct Props {
    pub selected_tags: Vec<Tag>,
    pub language: Language,
    pub ontoggle: Callback<Tag>,
}

pub enum Msg {
    Toggle(Tag),
}

pub struct TagSelector {
    link: ComponentLink<Self>,
    selected_tags: Vec<Tag>,
    language: Language,
    ontoggle: Callback<Tag>,
}

impl Component for TagSelector {
    type Message = Msg;
    type Properties = Props;
    fn create(props: Self::Properties, link: ComponentLink<Self>) -> Self {
        Self {
            link,
            selected_tags: props.selected_tags,
            language: props.language,
            ontoggle: props.ontoggle,
        }
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg { Msg::Toggle(tag) => self.ontoggle.emit(tag) };
        true
    }

    fn change(&mut self, props: Self::Properties) -> ShouldRender {
        self.selected_tags = props.selected_tags;
        self.language =  props.language;
        self.ontoggle = props.ontoggle;
        true
    }

    fn view(&self) -> Html {
        html! {
            <div id="tag-area">
                <div class="tag-container">
                { for qualifications().into_iter().map(|t| t.button_view(&self.language, self.selected_tags.contains(&t), &self.link)) }
                </div>
                <hr />
                <div class="tag-container">
                { for positions().into_iter().map(|t| t.button_view(&self.language, self.selected_tags.contains(&t), &self.link)) }
                </div>
                <hr />
                <div class="tag-container">
                { for classes().into_iter().map(|t| t.button_view(&self.language, self.selected_tags.contains(&t), &self.link)) }
                </div>
                <hr />
                <div class="tag-container">
                { for affix().into_iter().map(|t| t.button_view(&self.language, self.selected_tags.contains(&t), &self.link)) }
                </div>
            </div>
        }
    }
}

impl TagSelector {
    pub fn view(selected_tags: &HashSet<Tag>, lng: &Language, link: &ComponentLink<Recruiter>) -> Html {
        html! {
            <div id="tag-area">
                <div class="tag-container">
                { for qualifications().iter().map(|t| t.view(lng, selected_tags.contains(&t), link)) }
                </div>
                <hr />
                <div class="tag-container">
                { for positions().iter().map(|t| t.view(lng, selected_tags.contains(&t), link)) }
                </div>
                <hr />
                <div class="tag-container">
                { for classes().iter().map(|t| t.view(lng, selected_tags.contains(&t), link)) }
                </div>
                <hr />
                <div class="tag-container">
                { for affix().iter().map(|t| t.view(lng, selected_tags.contains(&t), link)) }
                </div>
            </div>
        }
    }
}
