use super::language::*;
use yew::prelude::{html, Html};

struct Text {
    title: Multilingual,
    sequence: Vec<Multilingual>,
}

impl Text {
    fn new() -> Text {
        Text {
            title: Multilingual::new("使用方法", "つかいかた", "How to use"),
            sequence: vec![
                Multilingual::new(
                    "选择上面的全部标签，在你的明日方舟招聘中看到的地方",
                    "アークナイツの求人画面に見えているタグを上からすべて選択します",
                    "Select *ALL* tags above, where you see in your arknights recruitment",
                ),
                Multilingual::new(
                    "从结果中选择一个你想雇用的干员",
                    "出てきた中から雇用したいオペレーターを決めます",
                    "Choose a operator you want to hire from the result",
                ),
                Multilingual::new(
                    "在干员的身旁贴上标签进行招聘",
                    "その人の横にあるタグを全て選択して求人を出します",
                    "Recruit with tags by the side of the operator",
                ),
                Multilingual::new("等待9个小时", "9時間待ちます", "Wait 9 hours"),
                Multilingual::new(
                    "热烈地欢迎大家的到来",
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
