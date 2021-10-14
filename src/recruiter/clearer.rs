use yew::prelude::*;

use super::language::{Language, Multilingual};
use super::{Msg, Recruiter};

#[derive(Properties, Clone)]
pub struct Props {
    pub class: String,
    pub language: Language,
}

pub struct Clearer {
    parent_link: ComponentLink<Recruiter>,
    language: Language,
    class: String,
    text: Multilingual,
}

impl Component for Clearer {
    type Message = ();
    type Properties = Props;
    fn create(prop: Self::Properties, link: ComponentLink<Self>) -> Self {
        Self {
            parent_link: link.get_parent().unwrap().clone().downcast(),
            language: prop.language,
            class: prop.class,
            text: Multilingual::new("退选", "選択解除", "Clear Selection"),
        }
    }

    fn update(&mut self, _msg: Self::Message) -> ShouldRender {
        false
    }

    fn change(&mut self, props: Self::Properties) -> ShouldRender {
        self.language = props.language;
        self.class = props.class;
        true
    }

    fn view(&self) -> Html {
        html! {
            <div class=classes!("clear-area", &self.class) onclick=self.parent_link.callback(|_| Msg::Clear)>
                <i class="material-icons">{ "delete_outline" }</i>
                <span>{ self.text.select(&self.language) }</span>
            </div>
        }
    }
}
