#[derive(Clone)]
pub enum Language {
    Chinese,
    Japanese,
    English,
}

#[derive(Clone)]
pub struct Multilingual {
    chinese: String,
    japanese: String,
    english: String,
}

impl PartialEq for Multilingual {
    fn eq(&self, other: &Self) -> bool {
        self.chinese == other.chinese && self.japanese == other.japanese && self.english == other.english
    }
}

impl Multilingual {
    pub fn new(cn: &str, ja: &str, en: &str) -> Multilingual {
        Multilingual {
            chinese: cn.to_string(),
            japanese: ja.to_string(),
            english: en.to_string(),
        }
    }

    pub fn select(&self, your_language: &Language) -> String {
        match your_language {
            Language::Chinese => self.chinese.clone(),
            Language::Japanese => self.japanese.clone(),
            Language::English => self.english.clone(),
        }
    }
}
