use seed::{prelude::*, *};
use std::collections::HashSet;

use super::{tags::Tag, Msg};
use crate::utils::*;

#[derive(Clone)]
pub struct Operator {
    name: Multilingual,
    rarity: u8,
    tags: HashSet<Tag>,
}

impl PartialEq for Operator {
    fn eq(&self, other: &Self) -> bool {
        self.name == other.name
    }
}

impl Operator {
    fn new(cn: &str, ja: &str, en: &str, rarity: u8, tags: HashSet<Tag>) -> Operator {
        Operator {
            name: Multilingual::new(cn, ja, en),
            rarity,
            tags,
        }
    }

    pub fn name(&self) -> &Multilingual {
        &self.name
    }

    pub fn is_behind(&self, other: &Operator) -> bool {
        ((self.rarity > other.rarity && other.rarity > 2) || (self.rarity == 1 && other.rarity < 5 && other.rarity > 1)) && self.tags.is_subset(&other.tags)
    }

    pub fn is_ahead(&self, other: &Operator) -> bool {
        !self.tags.is_subset(&other.tags)
    }

    pub fn is_rare(&self) -> bool {
        self.rarity > 3 || self.rarity == 1
    }

    pub fn is_top(&self) -> bool {
        self.rarity > 5
    }

    pub fn view(&self, lng: &Language, shine: bool) -> Node<Msg> {
        let googleurl = format!("https://google.com/search?q={}+アークナイツ+かわいい", self.name.select(&Language::Japanese));

        div![
            C!["operator-container"],
            div![
                C!["operator-card", format!("rarity-{}", self.rarity), IF!(shine => "shine")],
                ev(Ev::Click, move |_| {
                    web_sys::window().unwrap().open_with_url(&googleurl).unwrap();
                }),
                span![C!["name"], self.name.select(lng)],
                div![C!["tags"], self.tags.iter().map(|t| div![t.name().select(lng)])],
            ],
        ]
    }

    pub fn tags(&self) -> &HashSet<Tag> {
        &self.tags
    }

    pub fn rarity(&self) -> u8 {
        self.rarity
    }

    pub fn set_tags(&mut self, new_tags: HashSet<Tag>) {
        self.tags = new_tags
    }

    pub fn all() -> Vec<Operator> {
        vec![
            Operator::new("能天使", "エクシア", "Exusiai", 6, tags!(Tag::Top, Tag::Melee, Tag::Sniper, Tag::DPS)),
            Operator::new("推进之王", "シージ", "Siege", 6, tags!(Tag::Top, Tag::Melee, Tag::Vanguard, Tag::DPS, Tag::DPR)),
            Operator::new("伊芙利特", "イフリータ", "Ifrit", 6, tags!(Tag::Top, Tag::Melee, Tag::Caster, Tag::AoE, Tag::Debuff)),
            Operator::new("闪灵", "シャイニング", "Shining", 6, tags!(Tag::Top, Tag::Melee, Tag::Medic, Tag::Heal, Tag::Support)),
            Operator::new("夜莺", "ナイチンゲール", "Nightingale", 6, tags!(Tag::Top, Tag::Melee, Tag::Medic, Tag::Heal, Tag::Support)),
            Operator::new("星熊", "ホシグマ", "Hoshiguma", 6, tags!(Tag::Top, Tag::Melee, Tag::Defender, Tag::DPS, Tag::Defense)),
            Operator::new("塞雷娅", "サリア", "Saria", 6, tags!(Tag::Top, Tag::Melee, Tag::Defender, Tag::Defense, Tag::Heal, Tag::Support)),
            Operator::new("银灰", "シルバーアッシュ", "SilverAsh", 6, tags!(Tag::Top, Tag::Melee, Tag::Guard, Tag::DPS, Tag::Support)),
            Operator::new("斯卡蒂", "スカジ", "Skadi", 6, tags!(Tag::Top, Tag::Melee, Tag::Guard, Tag::DPS, Tag::Survival)),
            Operator::new("陈", "チェン", "Ch'en", 6, tags!(Tag::Top, Tag::Melee, Tag::Guard, Tag::DPS, Tag::Nuker)),
            Operator::new("黑", "シュヴァルツ", "Schwarz", 6, tags!(Tag::Top, Tag::Ranged, Tag::Sniper, Tag::DPS)),
            Operator::new("赫拉格", "ヘラグ", "Hellagur", 6, tags!(Tag::Top, Tag::Melee, Tag::Guard, Tag::DPS, Tag::Survival)),
            Operator::new("麦哲伦", "マゼラン", "Magallan", 6, tags!(Tag::Top, Tag::Ranged, Tag::Supporter, Tag::Slow, Tag::DPS, Tag::Support)),
            Operator::new("莫斯提马", "モスティマ", "Mostima", 6, tags!(Tag::Top, Tag::Ranged, Tag::Caster, Tag::AoE, Tag::Support, Tag::CC)),
            Operator::new("煌", "ブレイズ", "Blaze", 6, tags!(Tag::Top, Tag::Melee, Tag::Guard, Tag::DPS, Tag::Survival)),
            Operator::new("阿", "ア", "Aak", 6, tags!(Tag::Top, Tag::Ranged, Tag::Specialist, Tag::DPS, Tag::Support)),
            Operator::new("刻俄柏", "ケオベ", "Ceobe", 6, tags!(Tag::Top, Tag::Ranged, Tag::Caster, Tag::DPS, Tag::CC)),
            Operator::new("风笛", "バグパイプ", "Bagpipe", 6, tags!(Tag::Top, Tag::Melee, Tag::Vanguard, Tag::DPR, Tag::DPS)),
            Operator::new("傀影", "ファントム", "Phantom", 6, tags!(Tag::Top, Tag::Melee, Tag::Specialist, Tag::FastRedeploy, Tag::CC, Tag::DPS)),
            /////////////////// add new 6-stars here
            Operator::new("因陀罗", "インドラ", "Indra", 5, tags!(Tag::Senior, Tag::Melee, Tag::Guard, Tag::DPS, Tag::Survival)),
            Operator::new("火神", "ヴァルカン", "Vulcan", 5, tags!(Tag::Senior, Tag::Melee, Tag::Defender, Tag::Defense, Tag::DPS, Tag::Survival)),
            Operator::new("白面鸮", "フィリオプシス", "Ptilopsis", 5, tags!(Tag::Senior, Tag::Ranged, Tag::Medic, Tag::Heal, Tag::Support)),
            Operator::new("凛冬", "ズィマー", "Zima", 5, tags!(Tag::Senior, Tag::Melee, Tag::Vanguard, Tag::DPR, Tag::Support)),
            Operator::new("德克萨斯", "テキサス", "Texas", 5, tags!(Tag::Senior, Tag::Melee, Tag::Vanguard, Tag::DPR, Tag::CC)),
            Operator::new("幽灵鲨", "スペクター", "Specter", 5, tags!(Tag::Senior, Tag::Melee, Tag::Guard, Tag::AoE, Tag::Survival)),
            Operator::new("蓝毒", "アズリウス", "Blue Poison", 5, tags!(Tag::Senior, Tag::Ranged, Tag::Sniper, Tag::DPS)),
            Operator::new("白金", "プラチナ", "Platinum", 5, tags!(Tag::Senior, Tag::Ranged, Tag::Sniper, Tag::DPS)),
            Operator::new("陨星", "メテオリーテ", "Meteorite", 5, tags!(Tag::Senior, Tag::Ranged, Tag::Sniper, Tag::AoE, Tag::Debuff)),
            Operator::new("梅尔", "メイヤー", "Mayer", 5, tags!(Tag::Senior, Tag::Ranged, Tag::Supporter, Tag::CC, Tag::Summon)),
            Operator::new("赫默", "サイレンス", "Silence", 5, tags!(Tag::Senior, Tag::Ranged, Tag::Medic, Tag::Heal)),
            Operator::new("华法琳", "ワルファリン", "Warfarin", 5, tags!(Tag::Senior, Tag::Ranged, Tag::Medic, Tag::Heal, Tag::Support)),
            Operator::new("临光", "ニアール", "Nearl", 5, tags!(Tag::Senior, Tag::Melee, Tag::Defender, Tag::Defense, Tag::Heal)),
            Operator::new("红", "レッド", "Project Red", 5, tags!(Tag::Senior, Tag::Melee, Tag::Specialist, Tag::CC, Tag::FastRedeploy)),
            Operator::new("雷蛇", "リスカム", "Liskarm", 5, tags!(Tag::Senior, Tag::Melee, Tag::Defender, Tag::Defense, Tag::DPS)),
            Operator::new("可颂", "クロワッサン", "Croissant", 5, tags!(Tag::Senior, Tag::Melee, Tag::Defender, Tag::Defense, Tag::Shift)),
            Operator::new("普罗旺斯", "プロヴァンス", "Provence", 5, tags!(Tag::Senior, Tag::Ranged, Tag::Sniper, Tag::DPS)),
            Operator::new("守林人", "ファイヤーウォッチ", "Firewatch", 5, tags!(Tag::Senior, Tag::Ranged, Tag::Sniper, Tag::DPS, Tag::Nuker)),
            Operator::new("崖心", "クリフハート", "Cliffheart", 5, tags!(Tag::Senior, Tag::Melee, Tag::Specialist, Tag::DPS, Tag::Shift)),
            Operator::new("初雪", "プラマニクス", "Pramanix", 5, tags!(Tag::Senior, Tag::Ranged, Tag::Supporter, Tag::Debuff)),
            Operator::new("真理", "イースチナ", "Istina", 5, tags!(Tag::Senior, Tag::Ranged, Tag::Supporter, Tag::DPS, Tag::Slow)),
            Operator::new("狮蝎", "マンティコア", "Manticore", 5, tags!(Tag::Senior, Tag::Melee, Tag::Specialist, Tag::DPS, Tag::Survival)),
            Operator::new("食铁兽", "エフイーター", "FEater", 5, tags!(Tag::Senior, Tag::Melee, Tag::Specialist, Tag::Shift, Tag::Slow)),
            Operator::new("夜魔", "ナイトメア", "Nightmare", 5, tags!(Tag::Senior, Tag::Ranged, Tag::Caster, Tag::DPS, Tag::Heal, Tag::Slow)),
            Operator::new("诗怀雅", "スワイヤー", "Swire", 5, tags!(Tag::Senior, Tag::Melee, Tag::Guard, Tag::DPS, Tag::Support)),
            Operator::new("格劳克斯", "グラウコス", "Glaucus", 5, tags!(Tag::Senior, Tag::Ranged, Tag::Supporter, Tag::CC, Tag::Slow)),
            Operator::new("星极", "アステシア", "Astesia", 5, tags!(Tag::Senior, Tag::Melee, Tag::Guard, Tag::Defense, Tag::DPS)),
            Operator::new("送葬人", "イグゼキュター", "Executor", 5, tags!(Tag::Senior, Tag::Ranged, Tag::Sniper, Tag::AoE)),
            Operator::new("槐琥", "ワイフー", "Waai Fu", 5, tags!(Tag::Senior, Tag::Melee, Tag::Specialist, Tag::FastRedeploy, Tag::Debuff)),
            Operator::new("灰喉", "グレースロート", "GreyThroat", 5, tags!(Tag::Senior, Tag::Ranged, Tag::Sniper, Tag::DPS)),
            Operator::new("苇草", "リード", "Reed", 5, tags!(Tag::Senior, Tag::Melee, Tag::Vanguard, Tag::DPS, Tag::DPR)),
            Operator::new("布洛卡", "ブローカ", "Broca", 5, tags!(Tag::Senior, Tag::Melee, Tag::Guard, Tag::AoE, Tag::Survival)),
            Operator::new("吽", "ウン", "Hung", 5, tags!(Tag::Senior, Tag::Melee, Tag::Defender, Tag::Defense, Tag::Heal)),
            Operator::new("惊蛰", "レイズ", "Leizi", 5, tags!(Tag::Senior, Tag::Ranged, Tag::Caster, Tag::DPS)),
            Operator::new("慑砂", "シェーシャ", "Sesa", 5, tags!(Tag::Senior, Tag::Ranged, Tag::Sniper, Tag::AoE, Tag::Debuff)),
            Operator::new("巫恋", "シャマレ", "Shamare", 5, tags!(Tag::Senior, Tag::Ranged, Tag::Supporter, Tag::Debuff)),
            /////////////////// add new 5-stars here
            Operator::new("艾丝黛尔", "エステル", "Estelle", 4, tags!(Tag::Melee, Tag::Guard, Tag::AoE, Tag::Survival)),
            Operator::new("清流", "セイリュウ", "Purestream", 4, tags!(Tag::Ranged, Tag::Medic, Tag::Heal, Tag::Support)),
            Operator::new("夜烟", "ヘイズ", "Haze", 4, tags!(Tag::Ranged, Tag::Caster, Tag::DPS, Tag::Debuff)),
            Operator::new("远山", "ギターノ", "Gitano", 4, tags!(Tag::Ranged, Tag::Caster, Tag::AoE)),
            Operator::new("杰西卡", "ジェシカ", "Jessica", 4, tags!(Tag::Ranged, Tag::Sniper, Tag::DPS, Tag::Survival)),
            Operator::new("流星", "メテオ", "Meteor", 4, tags!(Tag::Ranged, Tag::Sniper, Tag::DPS, Tag::Debuff)),
            Operator::new("白雪", "シラユキ", "ShiraYuki", 4, tags!(Tag::Ranged, Tag::Sniper, Tag::AoE, Tag::Slow)),
            Operator::new("清道夫", "スカベンジャー", "Scavenger", 4, tags!(Tag::Melee, Tag::Vanguard, Tag::DPS, Tag::DPR)),
            Operator::new("红豆", "ヴィグナ", "Vigna", 4, tags!(Tag::Melee, Tag::Vanguard, Tag::DPS, Tag::DPR)),
            Operator::new("杜宾", "ドーベルマン", "Dobermann", 4, tags!(Tag::Melee, Tag::Guard, Tag::DPS, Tag::Support)),
            Operator::new("缠丸", "マトイマル", "Matoimaru", 4, tags!(Tag::Melee, Tag::Guard, Tag::DPS, Tag::Survival)),
            Operator::new("霜叶", "フロストリーフ", "Frostleaf", 4, tags!(Tag::Melee, Tag::Guard, Tag::DPS, Tag::Slow)),
            Operator::new("慕斯", "ムース", "Mousse", 4, tags!(Tag::Melee, Tag::Guard, Tag::DPS)),
            Operator::new("砾", "グラベル", "Gravel", 4, tags!(Tag::Melee, Tag::Specialist, Tag::Defense, Tag::FastRedeploy)),
            Operator::new("暗索", "ロープ", "Rope", 4, tags!(Tag::Melee, Tag::Specialist, Tag::Shift)),
            Operator::new("末药", "ミルラ", "Myrrh", 4, tags!(Tag::Ranged, Tag::Medic, Tag::Heal)),
            Operator::new("调香师", "パフューマー", "Perfumer", 4, tags!(Tag::Ranged, Tag::Medic, Tag::Heal)),
            Operator::new("角峰", "マッターホルン", "Matterhorn", 4, tags!(Tag::Melee, Tag::Defender, Tag::Defense)),
            Operator::new("蛇屠箱", "クオーラ", "Cuora", 4, tags!(Tag::Melee, Tag::Defender, Tag::Defense)),
            Operator::new("古米", "グム", "Gum", 4, tags!(Tag::Melee, Tag::Defender, Tag::Defense, Tag::Heal)),
            Operator::new("地灵", "アーススピリット", "Earthspirit", 4, tags!(Tag::Ranged, Tag::Supporter, Tag::Slow)),
            Operator::new("阿消", "ショウ", "Shaw", 4, tags!(Tag::Melee, Tag::Specialist, Tag::Shift)),
            Operator::new("猎蜂", "ビーハンター", "Beehunter", 4, tags!(Tag::Melee, Tag::Guard, Tag::DPS)),
            Operator::new("格雷伊", "グレイ", "Greyy", 4, tags!(Tag::Ranged, Tag::Caster, Tag::AoE, Tag::Slow)),
            Operator::new("苏苏洛", "ススーロ", "Sussurro", 4, tags!(Tag::Ranged, Tag::Medic, Tag::Heal)),
            Operator::new("桃金娘", "テンニンカ", "Myrtle", 4, tags!(Tag::Melee, Tag::Vanguard, Tag::DPR, Tag::Heal)),
            Operator::new("红云", "ヴァーミル", "Vermeil", 4, tags!(Tag::Ranged, Tag::Sniper, Tag::DPS)),
            Operator::new("梅", "メイ", "May", 4, tags!(Tag::Ranged, Tag::Sniper, Tag::DPS, Tag::Slow)),
            Operator::new("安比尔", "アンブリエル", "Ambriel", 4, tags!(Tag::Ranged, Tag::Sniper, Tag::DPS, Tag::Slow)),
            Operator::new("宴", "ウタゲ", "Utage", 4, tags!(Tag::Melee, Tag::Guard, Tag::DPS, Tag::Survival)),
            Operator::new("刻刀", "カッター", "Cutter", 4, tags!(Tag::Melee, Tag::Guard, Tag::DPS, Tag::Nuker)),
            /////////////////// add new 4-stars here
            Operator::new("安德切尔", "アドナキエル", "Adnachiel", 3, tags!(Tag::Ranged, Tag::Sniper, Tag::DPS)),
            Operator::new("芬", "フェン", "Fang", 3, tags!(Tag::Melee, Tag::Vanguard, Tag::DPR)),
            Operator::new("香草", "バニラ", "Vanilla", 3, tags!(Tag::Melee, Tag::Vanguard, Tag::DPR)),
            Operator::new("翎羽", "プリュム", "Plume", 3, tags!(Tag::Melee, Tag::Vanguard, Tag::DPS, Tag::DPR)),
            Operator::new("玫兰莎", "メランサ", "Melantha", 3, tags!(Tag::Melee, Tag::Guard, Tag::DPS, Tag::Survival)),
            Operator::new("米格鲁", "ビーグル", "Beagle", 3, tags!(Tag::Melee, Tag::Defender, Tag::Defense)),
            Operator::new("克洛丝", "クルース", "Kroos", 3, tags!(Tag::Ranged, Tag::Sniper, Tag::DPS)),
            Operator::new("炎熔", "ラヴァ", "Lava", 3, tags!(Tag::Ranged, Tag::Caster, Tag::AoE)),
            Operator::new("芙蓉", "ハイビスカス", "Hibiscus", 3, tags!(Tag::Ranged, Tag::Medic, Tag::Heal)),
            Operator::new("安赛尔", "アンセル", "Ansel", 3, tags!(Tag::Ranged, Tag::Medic, Tag::Heal)),
            Operator::new("史都华德", "スチュワード", "Steward", 3, tags!(Tag::Ranged, Tag::Caster, Tag::DPS)),
            Operator::new("梓兰", "オーキッド", "Orchid", 3, tags!(Tag::Ranged, Tag::Supporter, Tag::Slow)),
            Operator::new("空爆", "カタパルト", "Catapult", 3, tags!(Tag::Ranged, Tag::Sniper, Tag::AoE)),
            Operator::new("月见夜", "ミッドナイト", "Midnight", 3, tags!(Tag::Melee, Tag::Guard, Tag::DPS)),
            Operator::new("泡普卡", "ポプカル", "Popukar", 3, tags!(Tag::Melee, Tag::Guard, Tag::AoE, Tag::Survival)),
            Operator::new("斑点", "スポット", "Spot", 3, tags!(Tag::Melee, Tag::Defender, Tag::Defense, Tag::Heal)),
            /////////////////// add new 3-stars here
            Operator::new("夜刀", "ヤトウ", "Yato", 2, tags!(Tag::Starter, Tag::Melee, Tag::Vanguard)),
            Operator::new("黑角", "ノイルホーン", "Noir Corne", 2, tags!(Tag::Starter, Tag::Melee, Tag::Defender)),
            Operator::new("巡林者", "レンジャー", "Rangers", 2, tags!(Tag::Starter, Tag::Ranged, Tag::Sniper)),
            Operator::new("杜林", "ドゥリン", "Durin", 2, tags!(Tag::Starter, Tag::Ranged, Tag::Caster)),
            Operator::new("12F", "12F", "12F", 2, tags!(Tag::Starter, Tag::Ranged, Tag::Caster)),
            /////////////////// add new 2-stars here
            Operator::new("Lancet-2", "Lancet-2", "Lancet-2", 1, tags!(Tag::Ranged, Tag::Medic, Tag::Heal, Tag::Robot)),
            Operator::new("Castle-3", "Castle-3", "Castle-3", 1, tags!(Tag::Melee, Tag::Guard, Tag::Support, Tag::Robot)),
            Operator::new("THRM-EX", "THRM-EX", "THRM-EX", 1, tags!(Tag::Melee, Tag::Specialist, Tag::Nuker, Tag::Robot)),
            Operator::new("正义骑士号", "ジャスティスナイト", "'Justice Knight'", 1, tags!(Tag::Ranged, Tag::Sniper, Tag::Support, Tag::Robot)),
            /////////////////// add new 1-stars here
        ]
    }
}

pub trait OperatorVec {
    fn divide(&self) -> (Vec<Operator>, Vec<Operator>);
}

impl OperatorVec for Vec<Operator> {
    fn divide(&self) -> (Vec<Operator>, Vec<Operator>) {
        let mut good: Vec<Operator> = Vec::new();
        let mut challenging: Vec<Operator> = Vec::new();
        for candidate in self {
            if candidate.is_rare() && self.iter().any(|c| candidate.is_behind(c)) {
                challenging.push(candidate.clone())
            } else {
                good.push(candidate.clone())
            }
        }

        (good, challenging)
    }
}
