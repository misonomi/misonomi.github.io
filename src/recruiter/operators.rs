use std::collections::HashSet;
use std::iter::FromIterator;
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
    pub fn all() -> Vec<Operator> {
        vec!(
            Operator{name: Multilingual::new("", "Lancet-2", ""), rarity: 1, tags: tags!(Tag::Ranged, Tag::Medic, Tag::Heal,Tag::Robot)},
            Operator{name: Multilingual::new("", "Castle-3", ""), rarity: 1, tags: tags!(Tag::Melee, Tag::Vanguard, Tag::Support, Tag::Robot)},
        )
    }

    pub fn view(&self, lng: &Language) -> Html {
        html! {
            <div class="operator_card">
                { self.name.select(lng) }
            </div>
        }
    }

    pub fn find(population: &Vec<Operator>, tags: &HashSet<Tag>) -> Vec<Operator> {
        population.iter()
            .map(|p| {
                let mut new_candidate = p.clone();
                new_candidate.tags = new_candidate.tags.intersection(tags).cloned().collect();
                new_candidate
            })
            .filter(|n| !n.tags.is_empty())
            .collect()
    }
}
