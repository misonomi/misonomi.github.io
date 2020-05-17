use std::collections::HashSet;
use yew::{ prelude::* };

use super::{ Recruiter, language::*, tag_selector::{ TagSelector, Msg } };

#[derive(Clone, Copy, PartialEq, Eq, Hash)]
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
    Defence,
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

pub fn qualifications() -> HashSet<Tag> {
    tags!(Tag::Starter, Tag::Senior, Tag::Top)
}
pub fn positions() -> HashSet<Tag> {
    tags!(Tag::Melee, Tag::Ranged)
}
pub fn classes() -> HashSet<Tag> {
    tags!(Tag::Caster, Tag::Defender, Tag::Guard, Tag::Medic, Tag::Sniper, Tag::Specialist, Tag::Supporter, Tag::Vanguard)
}
pub fn affix() -> HashSet<Tag> {
    tags!(Tag::AoE, Tag::CC, Tag::DPS, Tag::DPR, Tag::Debuff, Tag::FastRedeploy, Tag::Defence, Tag::Heal, Tag::Nuker, Tag::Robot, Tag::Shift, Tag::Slow, Tag::Summon, Tag::Support, Tag::Survival)
}

impl Tag {
    pub fn name(&self) -> Multilingual {
        match self {
            Tag::Starter => Multilingual::new("", "初期", ""),
            Tag::Senior => Multilingual::new("", "エリート", ""),
            Tag::Top => Multilingual::new("", "上級エリート", ""),
            Tag::Melee => Multilingual::new("", "近距離", ""),
            Tag::Ranged => Multilingual::new("", "遠距離", ""),
            Tag::Caster => Multilingual::new("", "術師", ""),
            Tag::Defender => Multilingual::new("", "重装", ""),
            Tag::Guard => Multilingual::new("", "前衛", ""),
            Tag::Medic => Multilingual::new("", "医療", ""),
            Tag::Sniper => Multilingual::new("", "狙撃", ""),
            Tag::Specialist => Multilingual::new("", "特殊", ""),
            Tag::Supporter => Multilingual::new("", "補助", ""),
            Tag::Vanguard => Multilingual::new("", "先鋒", ""),
            Tag::AoE => Multilingual::new("", "範囲攻撃", ""),
            Tag::CC => Multilingual::new("", "牽制", ""),
            Tag::DPS => Multilingual::new("", "火力", ""),
            Tag::DPR => Multilingual::new("", "COST回復", ""),
            Tag::Debuff => Multilingual::new("", "弱化", ""),
            Tag::FastRedeploy => Multilingual::new("", "高速再配置", ""),
            Tag::Defence => Multilingual::new("", "防御", ""),
            Tag::Heal => Multilingual::new("", "治療", ""),
            Tag::Nuker => Multilingual::new("", "爆発力", ""),
            Tag::Robot => Multilingual::new("", "ロボット", ""),
            Tag::Shift => Multilingual::new("", "強制移動", ""),
            Tag::Slow => Multilingual::new("", "減速", ""),
            Tag::Summon => Multilingual::new("", "召喚", ""),
            Tag::Support => Multilingual::new("", "支援", ""),
            Tag::Survival => Multilingual::new("", "生存", ""),
        }
    }

    pub fn button_view(self, lng: &Language, checked: bool, link: &ComponentLink<TagSelector>) -> Html {
        html! {
            <button class=("tag-button", match checked {
                true => "checked",
                _ => "",
            }) onclick=link.callback(move |_| Msg::Toggle(self))>
                { self.name().select(lng) }
            </button>
        }
    }

    pub fn view(self, lng: &Language, checked: bool, link: &ComponentLink<Recruiter>) -> Html {
        html! {
            <button class=("tag-button", match checked {
                true => "checked",
                _ => "",
            }) onclick=link.callback(move |_| super::Msg::Toggle(self))>
                { self.name().select(lng) }
            </button>
        }
    }
}