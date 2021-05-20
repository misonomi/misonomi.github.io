use super::language::*;
use yew::prelude::{html, Html};

struct Text {
    title: Multilingual,
    sequence: Vec<Multilingual>,
}

impl Text {
    fn new() -> Vec<Text> {
        vec![
            Text {
                title: Multilingual::new("使用方法", "つかいかた", "How to use"),
                sequence: vec![
                    Multilingual::new(
                        "选择上面的全部标签，在你的明日方舟招募中看到的地方",
                        "アークナイツの求人画面に見えているタグを上からすべて選択します",
                        "Select *ALL* tags above, where you see in your arknights recruitment",
                    ),
                    Multilingual::new(
                        "从结果中选择一个你想雇用的干员",
                        "出てきた中から雇用したいオペレーターを決めます",
                        "Choose a operator you want to hire from the result",
                    ),
                    Multilingual::new(
                        "在干员的身旁贴上标签进行招募",
                        "その人の横にあるタグを全て選択して求人を出します",
                        "Recruit with tags by the side of the operator",
                    ),
                    Multilingual::new(
                        "决定招募时长（请看下文）",
                        "求人時間を決定します（下を参考にしてください）",
                        "Decide how long to wait (see section below)",
                    ),
                    Multilingual::new("等待", "待ちます", "Wait"),
                    Multilingual::new(
                        "热烈地欢迎大家的到来",
                        "誰が来ても暖かく迎えます",
                        "Welcome warmly whoever comes",
                    ),
                ],
            },
            Text {
                title: Multilingual::new(
                    "招募时间应该是多长",
                    "求人時間の決め方",
                    "How long recruitement time should be",
                ),
                sequence: vec![
                    Multilingual::new(
                        "想要★3以上：9:00:00",
                        "★3以上狙い：9:00:00",
                        "Want ★3 or above: 9:00:00",
                    ),
                    Multilingual::new("想要★2：7:30:00", "★2狙い：7:30:00", "Want ★2: 7:30:00"),
                    Multilingual::new("想要★1：3:50:00", "★1狙い：3:50:00", "Want ★1: 3:50:00"),
                ],
            },
        ]
    }
}

pub struct Instruction {}

impl Instruction {
    pub fn view(lng: &Language) -> Html {
        let texts = Text::new();

        html! {
            <div id="inst-area">
            {
                for texts.iter().map(|txs| html!{
                    <div class="inst">
                        <h2 class="inst-title">{ txs.title.select(lng) }</h2>
                        <hr />
                        <ul>
                        { for txs.sequence.iter().map(|e| html! { <li>{ e.select(lng) }</li> }) }
                        </ul>
                    </div>
                })
            }
            </div>
        }
    }
}