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
        let mut candidates: Vec<Operator> = Vec::new();
        for p in population {
            let intersection: HashSet<Tag> = p.tags.intersection(tags).cloned().collect();
            if intersection.is_empty() {
                continue;
            }
            let mut new_candidate = p.clone();
            new_candidate.tags = intersection;
            candidates.push(new_candidate);
        }
        candidates
    }

    pub fn is_behind(&self, other: &Operator) -> bool {
        self.rarity > other.rarity && self.tags.is_subset(&other.tags)
    }

    pub fn view(&self, lng: &Language) -> Html {
        html! {
            <div class=("operator_card", format!("{}", self.rarity))>
                <span class="name">{ self.name.select(lng) }</span>
                { for self.tags.iter().map(|t| html! { <div class="tags">{ t.name().select(lng) }</div> }) }
            </div>
        }
    }

    pub fn all() -> Vec<Operator> {
        vec![
            Operator::new(
                "",
                "シージ",
                "",
                6,
                tags!(Tag::Top, Tag::Melee, Tag::Vanguard, Tag::DPS, Tag::DPR),
            ),
            Operator::new(
                "",
                "シルバーアッシュ",
                "",
                6,
                tags!(Tag::Top, Tag::Melee, Tag::Guard, Tag::DPS, Tag::Support),
            ),
            Operator::new(
                "",
                "スカジ",
                "",
                6,
                tags!(Tag::Top, Tag::Melee, Tag::Guard, Tag::DPS, Tag::Survival),
            ),
            Operator::new(
                "",
                "ホシグマ",
                "",
                6,
                tags!(Tag::Top, Tag::Melee, Tag::Defender, Tag::DPS, Tag::Defence),
            ),
            Operator::new(
                "",
                "サリア",
                "",
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
                "",
                "シャイニング",
                "",
                6,
                tags!(Tag::Top, Tag::Melee, Tag::Medic, Tag::Heal, Tag::Support),
            ),
            Operator::new(
                "",
                "ナイチンゲール",
                "",
                6,
                tags!(Tag::Top, Tag::Melee, Tag::Medic, Tag::Heal, Tag::Support),
            ),
            Operator::new(
                "",
                "イフリータ",
                "",
                6,
                tags!(Tag::Top, Tag::Melee, Tag::Caster, Tag::AoE, Tag::Debuff),
            ),
            Operator::new(
                "",
                "エクシア",
                "",
                6,
                tags!(Tag::Top, Tag::Melee, Tag::Sniper, Tag::DPS),
            ),
            Operator::new(
                "",
                "テキサス",
                "",
                5,
                tags!(Tag::Senior, Tag::Melee, Tag::Vanguard, Tag::DPR, Tag::CC),
            ),
            Operator::new(
                "",
                "ズィマー",
                "",
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
                "",
                "レッド",
                "",
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
                "",
                "マンティコア",
                "",
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
                "",
                "クリフハート",
                "",
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
                "",
                "エフイーター",
                "",
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
                "",
                "スペクター",
                "",
                5,
                tags!(Tag::Senior, Tag::Melee, Tag::Guard, Tag::AoE, Tag::Survival),
            ),
            Operator::new(
                "",
                "インドラ",
                "",
                5,
                tags!(Tag::Senior, Tag::Melee, Tag::Guard, Tag::DPS, Tag::Survival),
            ),
            Operator::new(
                "",
                "ニアール",
                "",
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
                "",
                "リスカム",
                "",
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
                "",
                "ヴァルカン",
                "",
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
                "",
                "クロワッサン",
                "",
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
                "",
                "フィリオプシス",
                "",
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
                "",
                "サイレンス",
                "",
                5,
                tags!(Tag::Senior, Tag::Ranged, Tag::Medic, Tag::Heal),
            ),
            Operator::new(
                "",
                "ワルファリン",
                "",
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
                "",
                "ナイトメア",
                "",
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
            Operator::new(
                "",
                "プロヴァンス",
                "",
                5,
                tags!(Tag::Senior, Tag::Ranged, Tag::Sniper, Tag::DPS),
            ),
            Operator::new(
                "",
                "アズリウス",
                "",
                5,
                tags!(Tag::Senior, Tag::Ranged, Tag::Sniper, Tag::DPS),
            ),
            Operator::new(
                "",
                "ファイヤーウォッチ",
                "",
                5,
                tags!(Tag::Senior, Tag::Ranged, Tag::Sniper, Tag::DPS, Tag::Nuker),
            ),
            Operator::new(
                "",
                "メテオリーテ",
                "",
                5,
                tags!(Tag::Senior, Tag::Ranged, Tag::Sniper, Tag::AoE, Tag::Debuff),
            ),
            Operator::new(
                "",
                "プラチナ",
                "",
                5,
                tags!(Tag::Senior, Tag::Ranged, Tag::Sniper, Tag::DPS),
            ),
            Operator::new(
                "",
                "プラマニクス",
                "",
                5,
                tags!(Tag::Senior, Tag::Ranged, Tag::Supporter, Tag::Debuff),
            ),
            Operator::new(
                "",
                "イースチナ",
                "",
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
                "",
                "メイヤー",
                "",
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
                "",
                "スカベンジャー",
                "",
                4,
                tags!(Tag::Melee, Tag::Vanguard, Tag::DPS, Tag::DPR),
            ),
            Operator::new(
                "",
                "ヴィグナ",
                "",
                4,
                tags!(Tag::Melee, Tag::Vanguard, Tag::DPS, Tag::DPR),
            ),
            Operator::new(
                "",
                "グラベル",
                "",
                4,
                tags!(Tag::Melee, Tag::Specialist, Tag::Defence, Tag::FastRedeploy),
            ),
            Operator::new(
                "",
                "ロープ",
                "",
                4,
                tags!(Tag::Melee, Tag::Specialist, Tag::Shift),
            ),
            Operator::new(
                "",
                "ショウ",
                "",
                4,
                tags!(Tag::Melee, Tag::Specialist, Tag::Shift),
            ),
            Operator::new(
                "",
                "ドーベルマン",
                "",
                4,
                tags!(Tag::Melee, Tag::Guard, Tag::DPS, Tag::Support),
            ),
            Operator::new(
                "",
                "エステル",
                "",
                4,
                tags!(Tag::Melee, Tag::Guard, Tag::AoE, Tag::Survival),
            ),
            Operator::new(
                "",
                "ビーハンター",
                "",
                4,
                tags!(Tag::Melee, Tag::Guard, Tag::DPS),
            ),
            Operator::new("", "ムース", "", 4, tags!(Tag::Melee, Tag::Guard, Tag::DPS)),
            Operator::new(
                "",
                "フロストリーフ",
                "",
                4,
                tags!(Tag::Melee, Tag::Guard, Tag::DPS, Tag::Slow),
            ),
            Operator::new(
                "",
                "マトイマル",
                "",
                4,
                tags!(Tag::Melee, Tag::Guard, Tag::DPS, Tag::Survival),
            ),
            Operator::new(
                "",
                "クオーラ",
                "",
                4,
                tags!(Tag::Melee, Tag::Defender, Tag::Defence),
            ),
            Operator::new(
                "",
                "グム",
                "",
                4,
                tags!(Tag::Melee, Tag::Defender, Tag::Defence, Tag::Heal),
            ),
            Operator::new(
                "",
                "マッターホルン",
                "",
                4,
                tags!(Tag::Melee, Tag::Defender, Tag::Defence),
            ),
            Operator::new(
                "",
                "ミルラ",
                "",
                4,
                tags!(Tag::Ranged, Tag::Medic, Tag::Heal),
            ),
            Operator::new(
                "",
                "パフューマー",
                "",
                4,
                tags!(Tag::Ranged, Tag::Medic, Tag::Heal),
            ),
            Operator::new(
                "",
                "ヘイズ",
                "",
                4,
                tags!(Tag::Ranged, Tag::Caster, Tag::DPS, Tag::Debuff),
            ),
            Operator::new(
                "",
                "ギターノ",
                "",
                4,
                tags!(Tag::Ranged, Tag::Caster, Tag::AoE),
            ),
            Operator::new(
                "",
                "シラユキ",
                "",
                4,
                tags!(Tag::Ranged, Tag::Sniper, Tag::AoE, Tag::Slow),
            ),
            Operator::new(
                "",
                "メテオ",
                "",
                4,
                tags!(Tag::Ranged, Tag::Sniper, Tag::DPS, Tag::Debuff),
            ),
            Operator::new(
                "",
                "ジェシカ",
                "",
                4,
                tags!(Tag::Ranged, Tag::Sniper, Tag::DPS, Tag::Survival),
            ),
            Operator::new(
                "",
                "アーススピリット",
                "",
                4,
                tags!(Tag::Ranged, Tag::Supporter, Tag::Slow),
            ),
            Operator::new(
                "",
                "フェン",
                "",
                3,
                tags!(Tag::Melee, Tag::Vanguard, Tag::DPR),
            ),
            Operator::new(
                "",
                "バニラ",
                "",
                3,
                tags!(Tag::Melee, Tag::Vanguard, Tag::DPR),
            ),
            Operator::new(
                "",
                "プリュム",
                "",
                3,
                tags!(Tag::Melee, Tag::Vanguard, Tag::DPS, Tag::DPR),
            ),
            Operator::new(
                "",
                "メランサ",
                "",
                3,
                tags!(Tag::Melee, Tag::Guard, Tag::DPS, Tag::Survival),
            ),
            Operator::new(
                "",
                "ミッドナイト",
                "",
                3,
                tags!(Tag::Melee, Tag::Guard, Tag::DPS),
            ),
            Operator::new(
                "",
                "ビーグル",
                "",
                3,
                tags!(Tag::Melee, Tag::Defender, Tag::Defence),
            ),
            Operator::new(
                "",
                "ハイビスカス",
                "",
                3,
                tags!(Tag::Ranged, Tag::Medic, Tag::Heal),
            ),
            Operator::new(
                "",
                "アンセル",
                "",
                3,
                tags!(Tag::Ranged, Tag::Medic, Tag::Heal),
            ),
            Operator::new(
                "",
                "ラヴァ",
                "",
                3,
                tags!(Tag::Ranged, Tag::Caster, Tag::AoE),
            ),
            Operator::new(
                "",
                "スチュワード",
                "",
                3,
                tags!(Tag::Ranged, Tag::Caster, Tag::DPS),
            ),
            Operator::new(
                "",
                "クルース",
                "",
                3,
                tags!(Tag::Ranged, Tag::Sniper, Tag::DPS),
            ),
            Operator::new(
                "",
                "アドナキエル",
                "",
                3,
                tags!(Tag::Ranged, Tag::Sniper, Tag::DPS),
            ),
            Operator::new(
                "",
                "カタパルト",
                "",
                3,
                tags!(Tag::Ranged, Tag::Sniper, Tag::AoE),
            ),
            Operator::new(
                "",
                "オーキッド",
                "",
                3,
                tags!(Tag::Ranged, Tag::Supporter, Tag::Slow),
            ),
            Operator::new(
                "",
                "ヤトウ",
                "",
                2,
                tags!(Tag::Starter, Tag::Melee, Tag::Vanguard),
            ),
            Operator::new(
                "",
                "ノイルホーン",
                "",
                2,
                tags!(Tag::Starter, Tag::Melee, Tag::Defender),
            ),
            Operator::new(
                "",
                "12F",
                "",
                2,
                tags!(Tag::Starter, Tag::Ranged, Tag::Caster),
            ),
            Operator::new(
                "",
                "レンジャー",
                "",
                2,
                tags!(Tag::Starter, Tag::Ranged, Tag::Sniper),
            ),
            Operator::new(
                "",
                "ドゥリン",
                "",
                2,
                tags!(Tag::Starter, Tag::Ranged, Tag::Caster),
            ),
            Operator::new(
                "",
                "Lancet-2",
                "",
                1,
                tags!(Tag::Ranged, Tag::Medic, Tag::Heal, Tag::Robot),
            ),
            Operator::new(
                "",
                "Castle-3",
                "",
                1,
                tags!(Tag::Melee, Tag::Vanguard, Tag::Support, Tag::Robot),
            ),
        ]
    }
}
