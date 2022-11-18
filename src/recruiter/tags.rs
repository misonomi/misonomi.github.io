use std::{collections::{HashSet, hash_set::Iter}};

use rand::{
    distributions::{Distribution, Standard},
    Rng,
};
use seed::{prelude::*, *};

use super::{Msg, operators::Operator};
use crate::utils::*;

#[derive(Clone, PartialEq, Eq, Hash, Copy, Debug)]
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

    pub fn iconname(&self) -> &str {
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

    pub fn view(&self, active: bool, lng: &Language) -> Node<Msg> {
        let t = self.clone();
        button![
            C![
                "tag-button",
                match active {
                    true => "checked",
                    _ => "",
                }
            ],
            ev(Ev::Click, move |_| Msg::Toggle(t)),
            i![C!["tagico", self.iconname()]],
            self.name().select(lng),
        ]
    }
}

impl Distribution<Tag> for Standard {
    fn sample<R: Rng + ?Sized>(&self, rng: &mut R) -> Tag {
        match rng.gen_range(0..=27) {
            0 => Tag::Starter,
            1 => Tag::Senior,
            2 => Tag::Top,
            3 => Tag::Melee,
            4 => Tag::Ranged,
            5 => Tag::Caster,
            6 => Tag::Defender,
            7 => Tag::Guard,
            8 => Tag::Medic,
            9 => Tag::Sniper,
            10 => Tag::Specialist,
            11 => Tag::Supporter,
            12 => Tag::Vanguard,
            13 => Tag::AoE,
            14 => Tag::CC,
            15 => Tag::DPS,
            16 => Tag::DPR,
            17 => Tag::Debuff,
            18 => Tag::FastRedeploy,
            19 => Tag::Defense,
            20 => Tag::Heal,
            21 => Tag::Nuker,
            22 => Tag::Robot,
            23 => Tag::Shift,
            24 => Tag::Slow,
            25 => Tag::Summon,
            26 => Tag::Support,
            _ => Tag::Survival,
        }
    }
}

pub trait TagSet {
    fn random_tags(len: usize) -> Self;

    fn max(&self) -> u8;

    fn candidates(&self) -> Vec<Operator>;
}

impl TagSet for HashSet<Tag> {
    fn random_tags(len: usize) -> Self {
        let mut result: HashSet<Tag> = Default::default();
        loop {
            result.insert(rand::random());
    
            if result.len() >= len {
                break;
            }
        }
        result
    }

    fn max(&self) -> u8 {
        todo!()
    }

    fn candidates(&self) -> Vec<Operator> {
        let find_top = self.contains(&Tag::Top);
        Operator::all()
            .iter()
            .skip_while(|p| !find_top && p.is_top())
            .filter_map(|p| match p.tags().intersection(&self).cloned().collect::<HashSet<Tag>>() {
                i if i.is_empty() => None,
                i => {
                    let mut new = p.clone();
                    new.set_tags(i);
                    Some(new)
                }
            })
            .collect()
    }
}

pub fn qualifications() -> Vec<Tag> {
    vec![Tag::Starter, Tag::Senior, Tag::Top]
}
pub fn positions() -> Vec<Tag> {
    vec![Tag::Melee, Tag::Ranged]
}
pub fn classes() -> Vec<Tag> {
    vec![Tag::Caster, Tag::Defender, Tag::Guard, Tag::Medic, Tag::Sniper, Tag::Specialist, Tag::Supporter, Tag::Vanguard]
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
