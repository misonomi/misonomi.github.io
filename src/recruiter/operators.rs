use yew::prelude::*;

use super::language::*;
use super::tags::Tag;

#[derive(Clone)]
pub struct Operator {
    name: Multilingual,
    rarity: u8,
    tags: Vec<Tag>,
}

impl Operator {
    pub fn all() -> Vec<Operator> {
        vec!(
            Operator{name: Multilingual::new("", "Lancet-2", ""), rarity: 1, tags: vec!()},
        )
    }

    pub fn view(&self, lng: &Language) -> Html {
        html! {
            <div class="operator_card">
                { self.name.select(lng) }
            </div>
        }
    }

    pub fn find(population: &Vec<Operator>, tags: &Vec<Tag>) -> Vec<Operator> {
        population.to_vec()
    }
}
