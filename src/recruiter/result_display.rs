use seed::{prelude::*, *};

use super::{operators::*, Msg};
use crate::utils::*;

pub fn view(candidates: &Vec<Operator>, lng: &Language) -> Node<Msg> {
    let (good, challenging) = candidates.divide();
    div![
        attrs! {At::Id => "result-area"},
        h2![C!["candidate-title"], Multilingual::new("有针对性的干员", "出そうなオペーレーター", "Good Candidates").select(lng)],
        hr![],
        div![C!["operator-pool"], good.iter().map(|c| c.view(lng, good.iter().all(|e| c == e || c.is_ahead(e))))],
        h2![C!["candidate-title"], Multilingual::new("有挑战性的干员", "運が良くないと出なそうなオペレーター", "Challenging Candidates").select(lng)],
        hr![],
        div![C!["operator-pool"], challenging.iter().map(|c| c.view(lng, false))],
    ]
}
