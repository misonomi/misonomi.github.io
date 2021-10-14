use yew::prelude::*;

use super::{
    language::*,
    tag_selector::TagSelector,
};

#[derive(Clone, PartialEq, Eq, Hash)]
pub enum Tag {
    Starter,
    Senior,
    Top,
    Melee,
    Ranged,
    Caster,
    Defender,
    Guard,
    Medic,
    Sniper,
    Specialist,
    Supporter,
    Vanguard,
    AoE,
    CC,
    DPS,
    DPR,
    Debuff,
    FastRedeploy,
    Defense,
    Heal,
    Nuker,
    Robot,
    Shift,
    Slow,
    Summon,
    Support,
    Survival,
}

macro_rules! tags {
    ($($x:expr),+ $(,)?) => {
        {
            let mut hash = HashSet::new();
            $(
                hash.insert($x);
            )*
            hash
        }
    };
}

impl Tag {
    pub fn name(&self) -> Multilingual {
        match self {
            Tag::Starter => Multilingual::new("新手", "初期", "Starter"),
            Tag::Senior => Multilingual::new("资深干员", "エリート", "Senior Operator"),
            Tag::Top => Multilingual::new("高级资深干员", "上級エリート", "Top Operator"),
            Tag::Melee => Multilingual::new("近战位", "近距離", "Melee"),
            Tag::Ranged => Multilingual::new("远程位", "遠距離", "Ranged"),
            Tag::Caster => Multilingual::new("术师干员", "術師タイプ", "Caster"),
            Tag::Defender => Multilingual::new("重装干员", "重装タイプ", "Defender"),
            Tag::Guard => Multilingual::new("近卫干员", "前衛タイプ", "Guard"),
            Tag::Medic => Multilingual::new("医疗干员", "医療タイプ", "Medic"),
            Tag::Sniper => Multilingual::new("狙击干员", "狙撃タイプ", "Sniper"),
            Tag::Specialist => Multilingual::new("特种干员", "特殊タイプ", "Specialist"),
            Tag::Supporter => Multilingual::new("辅助干员", "補助タイプ", "Supporter"),
            Tag::Vanguard => Multilingual::new("先锋干员", "先鋒タイプ", "Vanguard"),
            Tag::AoE => Multilingual::new("群攻", "範囲攻撃", "AoE"),
            Tag::CC => Multilingual::new("控场", "牽制", "Crowd-Control"),
            Tag::DPS => Multilingual::new("输出", "火力", "DPS"),
            Tag::DPR => Multilingual::new("费用回复", "COST回復", "DP-Recovery"),
            Tag::Debuff => Multilingual::new("削弱", "弱化", "Debuff"),
            Tag::FastRedeploy => Multilingual::new("快速复活", "高速再配置", "Fast-Redeploy"),
            Tag::Defense => Multilingual::new("防护", "防御", "Defense"),
            Tag::Heal => Multilingual::new("治疗", "治療", "Healing"),
            Tag::Nuker => Multilingual::new("爆发", "爆発力", "Nuker"),
            Tag::Robot => Multilingual::new("支援机械", "ロボット", "Robot"),
            Tag::Shift => Multilingual::new("位移", "強制移動", "Shift"),
            Tag::Slow => Multilingual::new("減速", "減速", "Slow"),
            Tag::Summon => Multilingual::new("召唤", "召喚", "Summon"),
            Tag::Support => Multilingual::new("支援", "支援", "Support"),
            Tag::Survival => Multilingual::new("生存", "生存", "Survival"),
        }
    }

    fn iconname(&self) -> &str {
        match self {
            Tag::Caster => "caster",
            Tag::Defender => "defender",
            Tag::Guard => "guard",
            Tag::Medic => "medic",
            Tag::Sniper => "sniper",
            Tag::Specialist => "specialist",
            Tag::Supporter => "supporter",
            Tag::Vanguard => "vanguard",
            _ => "none",
        }
    }
}

pub fn qualifications() -> Vec<Tag> {
    vec![Tag::Starter, Tag::Senior, Tag::Top]
}
pub fn positions() -> Vec<Tag> {
    vec![Tag::Melee, Tag::Ranged]
}
pub fn classes() -> Vec<Tag> {
    vec![
        Tag::Caster,
        Tag::Defender,
        Tag::Guard,
        Tag::Medic,
        Tag::Sniper,
        Tag::Specialist,
        Tag::Supporter,
        Tag::Vanguard,
    ]
}
pub fn affix() -> Vec<Tag> {
    vec![
        Tag::AoE,
        Tag::CC,
        Tag::DPS,
        Tag::DPR,
        Tag::Debuff,
        Tag::FastRedeploy,
        Tag::Defense,
        Tag::Heal,
        Tag::Nuker,
        Tag::Robot,
        Tag::Shift,
        Tag::Slow,
        Tag::Summon,
        Tag::Support,
        Tag::Survival,
    ]
}

#[derive(Properties, Clone)]
pub struct Props {
    pub tag: Tag,
    pub language: Language,
    pub active: bool,
}

pub enum Msg {
    Toggle,
}

pub struct TagButton {
    link: ComponentLink<Self>,
    parent_link: ComponentLink<TagSelector>,
    tag: Tag,
    language: Language,
    active: bool,
}

impl Component for TagButton {
    type Message = Msg;
    type Properties = Props;
    fn create(props: Self::Properties, link: ComponentLink<Self>) -> Self {
        Self {
            parent_link: link.clone().get_parent().cloned().unwrap().downcast(),
            link,
            tag: props.tag,
            language: props.language,
            active: props.active,
        }
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg {
            Msg::Toggle => self.parent_link.send_message(super::tag_selector::Msg::Toggle(self.tag.clone())),
        };
        true
    }

    fn change(&mut self, props: Self::Properties) -> ShouldRender {
        self.language = props.language;
        self.active = props.active;
        true
    }

    fn view(&self) -> Html {
        html! {
            <button class=classes!("tag-button", match self.active {
                true => "checked",
                _ => "",
            }) onclick=self.link.callback(|_| Msg::Toggle)>
                <i class=classes!("tagico", self.tag.iconname().to_string()) />
                { self.tag.name().select(&self.language) }
            </button>
        }
    }
}
