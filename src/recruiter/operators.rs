use std::collections::HashSet;
use yew::prelude::*;

use super::language::*;
use super::tags::*;

#[derive(Clone)]
pub struct Operator {
    name: Multilingual,
    rarity: u8,
    tags: HashSet<Tag>,
}

impl Operator {
    fn new(cn: &str, ja: &str, en: &str, rarity: u8, tags: HashSet<Tag>) -> Operator {
        Operator {
            name: Multilingual::new(cn, ja, en),
            rarity,
            tags: tags,
        }
    }

    pub fn find(population: &Vec<Operator>, tags: &HashSet<Tag>) -> Vec<Operator> {
        let find_top = tags.contains(&Tag::Top);
        population
            .iter()
            .skip_while(|p| !find_top && p.is_top())
            .filter_map(
                |p| match p.tags.intersection(tags).cloned().collect::<HashSet<Tag>>() {
                    i if i.is_empty() => None,
                    i => {
                        let mut new = p.clone();
                        new.tags = i;
                        Some(new)
                    }
                },
            )
            .collect()
    }

    pub fn is_behind(&self, other: &Operator) -> bool {
        self.rarity > other.rarity && self.tags.is_subset(&other.tags)
    }

    pub fn is_high_tier(&self) -> bool {
        self.rarity > 3
    }

    pub fn is_top(&self) -> bool {
        self.rarity > 5
    }

    pub fn view(&self, lng: &Language) -> Html {
        html! {
            <div class="operator-container">
                <div class=("operator-card", format!("{}", self.rarity))>
                    <span class="name">{ self.name.select(lng) }</span>
                    <div class="tags">
                    { for self.tags.iter().map(|t| html! { <div>{ t.name().select(lng) }</div> }) }
                    </div>
                </div>
            </div>
        }
    }

    pub fn all() -> Vec<Operator> {
        vec![
            Operator::new(
                "推进之王",
                "シージ",
                "Siege",
                6,
                tags!(Tag::Top, Tag::Melee, Tag::Vanguard, Tag::DPS, Tag::DPR),
            ),
            Operator::new(
                "银灰",
                "シルバーアッシュ",
                "SilverAsh",
                6,
                tags!(Tag::Top, Tag::Melee, Tag::Guard, Tag::DPS, Tag::Support),
            ),
            /*
            Operator::new(
                "斯卡蒂",
                "スカジ",
                "Skadi",
                6,
                tags!(Tag::Top, Tag::Melee, Tag::Guard, Tag::DPS, Tag::Survival),
            ),
            */
            Operator::new(
                "星熊",
                "ホシグマ",
                "Hoshiguma",
                6,
                tags!(Tag::Top, Tag::Melee, Tag::Defender, Tag::DPS, Tag::Defence),
            ),
            Operator::new(
                "塞雷娅",
                "サリア",
                "Saria",
                6,
                tags!(
                    Tag::Top,
                    Tag::Melee,
                    Tag::Defender,
                    Tag::Defence,
                    Tag::Heal,
                    Tag::Support
                ),
            ),
            Operator::new(
                "闪灵",
                "シャイニング",
                "Shining",
                6,
                tags!(Tag::Top, Tag::Melee, Tag::Medic, Tag::Heal, Tag::Support),
            ),
            Operator::new(
                "夜莺",
                "ナイチンゲール",
                "Nightingale",
                6,
                tags!(Tag::Top, Tag::Melee, Tag::Medic, Tag::Heal, Tag::Support),
            ),
            Operator::new(
                "伊芙利特",
                "イフリータ",
                "Ifrit",
                6,
                tags!(Tag::Top, Tag::Melee, Tag::Caster, Tag::AoE, Tag::Debuff),
            ),
            Operator::new(
                "能天使",
                "エクシア",
                "Exusiai",
                6,
                tags!(Tag::Top, Tag::Melee, Tag::Sniper, Tag::DPS),
            ),
            Operator::new(
                "德克萨斯",
                "テキサス",
                "Texas",
                5,
                tags!(Tag::Senior, Tag::Melee, Tag::Vanguard, Tag::DPR, Tag::CC),
            ),
            Operator::new(
                "凛冬",
                "ズィマー",
                "Zima",
                5,
                tags!(
                    Tag::Senior,
                    Tag::Melee,
                    Tag::Vanguard,
                    Tag::DPR,
                    Tag::Support
                ),
            ),
            Operator::new(
                "红",
                "レッド",
                "Project Red",
                5,
                tags!(
                    Tag::Senior,
                    Tag::Melee,
                    Tag::Specialist,
                    Tag::CC,
                    Tag::FastRedeploy
                ),
            ),
            Operator::new(
                "狮蝎",
                "マンティコア",
                "Manticore",
                5,
                tags!(
                    Tag::Senior,
                    Tag::Melee,
                    Tag::Specialist,
                    Tag::DPS,
                    Tag::Survival
                ),
            ),
            Operator::new(
                "崖心",
                "クリフハート",
                "Cliffheart",
                5,
                tags!(
                    Tag::Senior,
                    Tag::Melee,
                    Tag::Specialist,
                    Tag::DPS,
                    Tag::Shift
                ),
            ),
            Operator::new(
                "食铁兽",
                "エフイーター",
                "FEater",
                5,
                tags!(
                    Tag::Senior,
                    Tag::Melee,
                    Tag::Specialist,
                    Tag::Shift,
                    Tag::Slow
                ),
            ),
            Operator::new(
                "幽灵鲨",
                "スペクター",
                "Specter",
                5,
                tags!(Tag::Senior, Tag::Melee, Tag::Guard, Tag::AoE, Tag::Survival),
            ),
            Operator::new(
                "因陀罗",
                "インドラ",
                "Indra",
                5,
                tags!(Tag::Senior, Tag::Melee, Tag::Guard, Tag::DPS, Tag::Survival),
            ),
            Operator::new(
                "临光",
                "ニアール",
                "Nearl",
                5,
                tags!(
                    Tag::Senior,
                    Tag::Melee,
                    Tag::Defender,
                    Tag::Defence,
                    Tag::Heal
                ),
            ),
            Operator::new(
                "雷蛇",
                "リスカム",
                "Liskarm",
                5,
                tags!(
                    Tag::Senior,
                    Tag::Melee,
                    Tag::Defender,
                    Tag::Defence,
                    Tag::DPS
                ),
            ),
            Operator::new(
                "火神",
                "ヴァルカン",
                "Vulcan",
                5,
                tags!(
                    Tag::Senior,
                    Tag::Melee,
                    Tag::Defender,
                    Tag::Defence,
                    Tag::DPS,
                    Tag::Survival
                ),
            ),
            Operator::new(
                "可颂",
                "クロワッサン",
                "Croissant",
                5,
                tags!(
                    Tag::Senior,
                    Tag::Melee,
                    Tag::Defender,
                    Tag::Defence,
                    Tag::Shift
                ),
            ),
            Operator::new(
                "白面鸮",
                "フィリオプシス",
                "Ptilopsis",
                5,
                tags!(
                    Tag::Senior,
                    Tag::Ranged,
                    Tag::Medic,
                    Tag::Heal,
                    Tag::Support
                ),
            ),
            Operator::new(
                "赫默",
                "サイレンス",
                "Silence",
                5,
                tags!(Tag::Senior, Tag::Ranged, Tag::Medic, Tag::Heal),
            ),
            Operator::new(
                "华法琳",
                "ワルファリン",
                "Warfarin",
                5,
                tags!(
                    Tag::Senior,
                    Tag::Ranged,
                    Tag::Medic,
                    Tag::Heal,
                    Tag::Support
                ),
            ),
            /*
            Operator::new(
                "夜魔",
                "ナイトメア",
                "Nightmare",
                5,
                tags!(
                    Tag::Senior,
                    Tag::Ranged,
                    Tag::Caster,
                    Tag::DPS,
                    Tag::Heal,
                    Tag::Slow
                ),
            ),
            */
            Operator::new(
                "普罗旺斯",
                "プロヴァンス",
                "Provence",
                5,
                tags!(Tag::Senior, Tag::Ranged, Tag::Sniper, Tag::DPS),
            ),
            Operator::new(
                "蓝毒",
                "アズリウス",
                "Blue Poison",
                5,
                tags!(Tag::Senior, Tag::Ranged, Tag::Sniper, Tag::DPS),
            ),
            Operator::new(
                "守林人",
                "ファイヤーウォッチ",
                "Firewatch",
                5,
                tags!(Tag::Senior, Tag::Ranged, Tag::Sniper, Tag::DPS, Tag::Nuker),
            ),
            Operator::new(
                "陨星",
                "メテオリーテ",
                "Meteorite",
                5,
                tags!(Tag::Senior, Tag::Ranged, Tag::Sniper, Tag::AoE, Tag::Debuff),
            ),
            Operator::new(
                "白金",
                "プラチナ",
                "Platinum",
                5,
                tags!(Tag::Senior, Tag::Ranged, Tag::Sniper, Tag::DPS),
            ),
            Operator::new(
                "初雪",
                "プラマニクス",
                "Pramanix",
                5,
                tags!(Tag::Senior, Tag::Ranged, Tag::Supporter, Tag::Debuff),
            ),
            Operator::new(
                "真理",
                "イースチナ",
                "Istina",
                5,
                tags!(
                    Tag::Senior,
                    Tag::Ranged,
                    Tag::Supporter,
                    Tag::DPS,
                    Tag::Slow
                ),
            ),
            Operator::new(
                "梅尔",
                "メイヤー",
                "Mayer",
                5,
                tags!(
                    Tag::Senior,
                    Tag::Ranged,
                    Tag::Supporter,
                    Tag::CC,
                    Tag::Summon
                ),
            ),
            Operator::new(
                "清道夫",
                "スカベンジャー",
                "Scavenger",
                4,
                tags!(Tag::Melee, Tag::Vanguard, Tag::DPS, Tag::DPR),
            ),
            Operator::new(
                "红豆",
                "ヴィグナ",
                "Vigna",
                4,
                tags!(Tag::Melee, Tag::Vanguard, Tag::DPS, Tag::DPR),
            ),
            Operator::new(
                "砾",
                "グラベル",
                "Gravel",
                4,
                tags!(Tag::Melee, Tag::Specialist, Tag::Defence, Tag::FastRedeploy),
            ),
            Operator::new(
                "暗索",
                "ロープ",
                "Rope",
                4,
                tags!(Tag::Melee, Tag::Specialist, Tag::Shift),
            ),
            Operator::new(
                "阿消",
                "ショウ",
                "Shaw",
                4,
                tags!(Tag::Melee, Tag::Specialist, Tag::Shift),
            ),
            Operator::new(
                "杜宾",
                "ドーベルマン",
                "Dobermann",
                4,
                tags!(Tag::Melee, Tag::Guard, Tag::DPS, Tag::Support),
            ),
            Operator::new(
                "艾丝黛尔",
                "エステル",
                "Estelle",
                4,
                tags!(Tag::Melee, Tag::Guard, Tag::AoE, Tag::Survival),
            ),
            /*
            Operator::new(
                "猎蜂",
                "ビーハンター",
                "Beehunter",
                4,
                tags!(Tag::Melee, Tag::Guard, Tag::DPS),
            ),
            */
            Operator::new(
                "慕斯",
                "ムース",
                "Mousse",
                4,
                tags!(Tag::Melee, Tag::Guard, Tag::DPS),
            ),
            Operator::new(
                "霜叶",
                "フロストリーフ",
                "Frostleaf",
                4,
                tags!(Tag::Melee, Tag::Guard, Tag::DPS, Tag::Slow),
            ),
            Operator::new(
                "缠丸",
                "マトイマル",
                "Matoimaru",
                4,
                tags!(Tag::Melee, Tag::Guard, Tag::DPS, Tag::Survival),
            ),
            Operator::new(
                "蛇屠箱",
                "クオーラ",
                "Cuora",
                4,
                tags!(Tag::Melee, Tag::Defender, Tag::Defence),
            ),
            Operator::new(
                "古米",
                "グム",
                "Gum",
                4,
                tags!(Tag::Melee, Tag::Defender, Tag::Defence, Tag::Heal),
            ),
            Operator::new(
                "角峰",
                "マッターホルン",
                "Matterhorn",
                4,
                tags!(Tag::Melee, Tag::Defender, Tag::Defence),
            ),
            Operator::new(
                "末药",
                "ミルラ",
                "Myrrh",
                4,
                tags!(Tag::Ranged, Tag::Medic, Tag::Heal),
            ),
            Operator::new(
                "调香师",
                "パフューマー",
                "Perfumer",
                4,
                tags!(Tag::Ranged, Tag::Medic, Tag::Heal),
            ),
            Operator::new(
                "夜烟",
                "ヘイズ",
                "Haze",
                4,
                tags!(Tag::Ranged, Tag::Caster, Tag::DPS, Tag::Debuff),
            ),
            Operator::new(
                "远山",
                "ギターノ",
                "Gitano",
                4,
                tags!(Tag::Ranged, Tag::Caster, Tag::AoE),
            ),
            Operator::new(
                "白雪",
                "シラユキ",
                "ShiraYuki",
                4,
                tags!(Tag::Ranged, Tag::Sniper, Tag::AoE, Tag::Slow),
            ),
            Operator::new(
                "流星",
                "メテオ",
                "Meteor",
                4,
                tags!(Tag::Ranged, Tag::Sniper, Tag::DPS, Tag::Debuff),
            ),
            Operator::new(
                "杰西卡",
                "ジェシカ",
                "Jessica",
                4,
                tags!(Tag::Ranged, Tag::Sniper, Tag::DPS, Tag::Survival),
            ),
            Operator::new(
                "地灵",
                "アーススピリット",
                "Earthspirit",
                4,
                tags!(Tag::Ranged, Tag::Supporter, Tag::Slow),
            ),
            Operator::new(
                "芬",
                "フェン",
                "Fang",
                3,
                tags!(Tag::Melee, Tag::Vanguard, Tag::DPR),
            ),
            Operator::new(
                "香草",
                "バニラ",
                "Vanilla",
                3,
                tags!(Tag::Melee, Tag::Vanguard, Tag::DPR),
            ),
            Operator::new(
                "翎羽",
                "プリュム",
                "Plume",
                3,
                tags!(Tag::Melee, Tag::Vanguard, Tag::DPS, Tag::DPR),
            ),
            Operator::new(
                "玫兰莎",
                "メランサ",
                "Melantha",
                3,
                tags!(Tag::Melee, Tag::Guard, Tag::DPS, Tag::Survival),
            ),
            /*
            Operator::new(
                "月见夜",
                "ミッドナイト",
                "Midnight",
                3,
                tags!(Tag::Melee, Tag::Guard, Tag::DPS),
            ),
            */
            Operator::new(
                "米格鲁",
                "ビーグル",
                "Beagle",
                3,
                tags!(Tag::Melee, Tag::Defender, Tag::Defence),
            ),
            Operator::new(
                "芙蓉",
                "ハイビスカス",
                "Hibiscus",
                3,
                tags!(Tag::Ranged, Tag::Medic, Tag::Heal),
            ),
            Operator::new(
                "安赛尔",
                "アンセル",
                "Ansel",
                3,
                tags!(Tag::Ranged, Tag::Medic, Tag::Heal),
            ),
            Operator::new(
                "炎熔",
                "ラヴァ",
                "Lava",
                3,
                tags!(Tag::Ranged, Tag::Caster, Tag::AoE),
            ),
            Operator::new(
                "史都华德",
                "スチュワード",
                "Steward",
                3,
                tags!(Tag::Ranged, Tag::Caster, Tag::DPS),
            ),
            Operator::new(
                "克洛丝",
                "クルース",
                "Kroos",
                3,
                tags!(Tag::Ranged, Tag::Sniper, Tag::DPS),
            ),
            Operator::new(
                "安德切尔",
                "アドナキエル",
                "Adnachiel",
                3,
                tags!(Tag::Ranged, Tag::Sniper, Tag::DPS),
            ),
            /*
            Operator::new(
                "空爆",
                "カタパルト",
                "Catapult",
                3,
                tags!(Tag::Ranged, Tag::Sniper, Tag::AoE),
            ),
            */
            Operator::new(
                "梓兰",
                "オーキッド",
                "Orchid",
                3,
                tags!(Tag::Ranged, Tag::Supporter, Tag::Slow),
            ),
            Operator::new(
                "夜刀",
                "ヤトウ",
                "Yato",
                2,
                tags!(Tag::Starter, Tag::Melee, Tag::Vanguard),
            ),
            Operator::new(
                "黑角",
                "ノイルホーン",
                "Noir Corne",
                2,
                tags!(Tag::Starter, Tag::Melee, Tag::Defender),
            ),
            Operator::new(
                "12F",
                "12F",
                "12F",
                2,
                tags!(Tag::Starter, Tag::Ranged, Tag::Caster),
            ),
            Operator::new(
                "巡林者",
                "レンジャー",
                "Rangers",
                2,
                tags!(Tag::Starter, Tag::Ranged, Tag::Sniper),
            ),
            Operator::new(
                "杜林",
                "ドゥリン",
                "Durin",
                2,
                tags!(Tag::Starter, Tag::Ranged, Tag::Caster),
            ),
            Operator::new(
                "Lancet-2",
                "Lancet-2",
                "Lancet-2",
                1,
                tags!(Tag::Ranged, Tag::Medic, Tag::Heal, Tag::Robot),
            ),
            Operator::new(
                "Castle-3",
                "Castle-3",
                "Castle-3",
                1,
                tags!(Tag::Melee, Tag::Vanguard, Tag::Support, Tag::Robot),
            ),
        ]
    }
}
