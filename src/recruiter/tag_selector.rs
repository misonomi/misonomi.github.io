use yew::prelude::*;

use super::{language::*, tags::*};

#[derive(Properties, Clone)]
pub struct Props {
    pub selected_tags: Vec<Tag>,
    pub language: Language,
}

pub struct TagSelector {
    selected_tags: Vec<Tag>,
    language: Language,
}

impl Component for TagSelector {
    type Message = Msg;
    type Properties = Props;
    fn create(props: Self::Properties, _link: ComponentLink<Self>) -> Self {
        Self {
            selected_tags: props.selected_tags,
            language: props.language,
        }
    }

    fn update(&mut self, _msg: Self::Message) -> ShouldRender {
        false
    }

    fn change(&mut self, props: Self::Properties) -> ShouldRender {
        self.selected_tags = props.selected_tags;
        self.language = props.language;
        true
    }

    fn view(&self) -> Html {
        html! {
            <div id="tag-area">
                <div class="tag-container">
                    { for classes().into_iter().map(|t| html!{ <TagButton tag=t language=self.language.clone() active=self.selected_tags.contains(&t)/> }) }
                </div>
                <hr />
                <div class="tag-container">
                    { for positions().into_iter().map(|t| html!{ <TagButton tag=t language=self.language.clone() active=self.selected_tags.contains(&t)/> }) }
                </div>
                <hr />
                <div class="tag-container">
                    { for qualifications().into_iter().map(|t| html!{ <TagButton tag=t language=self.language.clone() active=self.selected_tags.contains(&t)/> }) }
                </div>
                <hr />
                <div class="tag-container">
                    { for affix().into_iter().map(|t| html!{ <TagButton tag=t language=self.language.clone() active=self.selected_tags.contains(&t)/> }) }
                </div>
            </div>
        }
    }
}
