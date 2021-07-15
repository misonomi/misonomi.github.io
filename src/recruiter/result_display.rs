use yew::prelude::*;

use super::{language::*, operators::*};

#[derive(Properties, Clone)]
pub struct Props {
    pub candidates: Vec<Operator>,
    pub language: Language,
}

struct Text {
    good_candidates: Multilingual,
    challenging_candidates: Multilingual,
}

impl Text {
    fn new() -> Text {
        Text {
            good_candidates: Multilingual::new(
                "有针对性的干员",
                "出そうなオペーレーター",
                "Good Candidates",
            ),
            challenging_candidates: Multilingual::new(
                "有挑战性的干员",
                "運が良くないと出なそうなオペレーター",
                "Challenging Candidates",
            ),
        }
    }
}

pub struct ResultDisplay {
    candidates: Vec<Operator>,
    language: Language,
    text: Text,
}

impl Component for ResultDisplay {
    type Message = ();
    type Properties = Props;
    fn create(props: Self::Properties, _: ComponentLink<Self>) -> Self {
        Self {
            candidates: props.candidates,
            language: props.language,
            text: Text::new(),
        }
    }

    fn update(&mut self, _msg: Self::Message) -> ShouldRender {
        false
    }

    fn change(&mut self, props: Self::Properties) -> ShouldRender {
        self.candidates = props.candidates;
        self.language = props.language;
        true
    }

    fn view(&self) -> Html {
        let (good, challenging) = sort(&self.candidates);

        html! {
            <div id="result-area">
                <h2 class="candidate-title">{ self.text.good_candidates.select(&self.language) }</h2>
                <hr />
                <div class="operator-pool">
                { for good.iter().map(|c| c.view(&self.language, good.iter().all(|e| c == e || c.is_ahead(e)))) }
                </div>
                <h2 class="candidate-title">{ self.text.challenging_candidates.select(&self.language) }</h2>
                <hr />
                <div class="operator-pool">
                { for challenging.iter().map(|c| c.view(&self.language, false)) }
                </div>
            </div>
        }
    }
}

fn sort(candidates: &[Operator]) -> (Vec<Operator>, Vec<Operator>) {
    let mut good: Vec<Operator> = Vec::new();
    let mut challenging: Vec<Operator> = Vec::new();
    for candidate in candidates {
        if candidate.is_rare() && candidates.iter().any(|c| candidate.is_behind(c)) {
            challenging.push(candidate.clone())
        } else {
            good.push(candidate.clone())
        }
    }

    (good, challenging)
}
