use seed::{prelude::*, *};

use super::{language::*, operators::*, Msg};

struct Text {
    good_candidates: Multilingual,
    challenging_candidates: Multilingual,
}

impl Text {
    fn new() -> Text {
        Text {
            good_candidates: Multilingual::new("有针对性的干员", "出そうなオペーレーター", "Good Candidates"),
            challenging_candidates: Multilingual::new("有挑战性的干员", "運が良くないと出なそうなオペレーター", "Challenging Candidates"),
        }
    }
}

fn sort(candidates: &[Operator]) -> (Vec<Operator>, Vec<Operator>) {
    let mut good: Vec<Operator> = Vec::new();
    let mut challenging: Vec<Operator> = Vec::new();
    for candidate in candidates {
        if candidate.is_rare() && candidates.iter().any(|c| candidate.is_behind(c)) {
            challenging.push(candidate.clone())
        } else {
            good.push(candidate.clone())
        }
    }

    (good, challenging)
}

pub fn view(candidates: &Vec<Operator>, lng: &Language) -> Node<Msg> {
    let (good, challenging) = sort(candidates);
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
