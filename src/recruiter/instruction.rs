use super::language::*;
use yew::prelude::{html, Html};

struct Text {
    title: Multilingual,
    sequence: Vec<Multilingual>,
}

impl Text {
    fn new() -> Text {
        Text {
            title: Multilingual::new("有针对性的干员", "つかいかた", "How to use"),
            sequence: vec![
                Multilingual::new(
                    "",
                    "アークナイツの求人画面に見えているタグを上からすべて選択します",
                    "Select *ALL* tags above, where you see in your arknights recruitment",
                ),
                Multilingual::new(
                    "",
                    "出てきた中から雇用したいオペレーターを決めます",
                    "Choose a operator you want to hire from the result",
                ),
                Multilingual::new(
                    "",
                    "その人の横にあるタグを全て選択して求人を出します",
                    "Recruit with tags by the side if the operator",
                ),
                Multilingual::new("", "9時間待ちます", "Wait 9 hours"),
                Multilingual::new(
                    "",
                    "誰が来ても暖かく迎えましょう",
                    "Welcome warmly whoever comes",
                ),
            ],
        }
    }
}

pub struct Instruction {}

impl Instruction {
    pub fn view(lng: &Language) -> Html {
        let text = Text::new();

        html! {
            <div id="inst-area">
                <h2 class="inst-title">{ text.title.select(lng) }</h2>
                <hr />
                <ul>
                { for text.sequence.iter().map(|e| html! { <li>{ e.select(lng) }</li> }) }
                </ul>
            </div>
        }
    }
}
