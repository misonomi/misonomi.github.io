use seed::{prelude::*, *};
use std::fmt;

const ITEM_NUM: usize = 5;

#[derive(Clone)]
enum IconType {
    Accessories,
    ANRecruit,
    Assemble,
    Kisekae,
    Programs,
}

impl IconType {
    fn name(&self) -> &str {
        match self {
            IconType::Accessories => "accessories",
            IconType::ANRecruit => "recruiter",
            IconType::Assemble => "assemble",
            IconType::Kisekae => "kisekae",
            IconType::Programs => "programs",
        }
    }

    fn link(&self) -> &str {
        match self {
            IconType::Accessories => "accessories.html",
            IconType::ANRecruit => "recruitment-helper.html",
            IconType::Assemble => "assemble.html",
            IconType::Kisekae => "kisekae.html",
            IconType::Programs => "key-detector.html",
        }
    }
}

#[derive(Clone)]
struct MenuIcon {
    itype: IconType,
    id: usize,
}

impl MenuIcon {
    fn compute_pos(&self, current_focus: usize) -> &str {
        match (self.id - current_focus + ITEM_NUM) % ITEM_NUM {
            0 => "front",
            1 => "left-front",
            2 => "left-back",
            3 => "right-back",
            4 => "right-front",
            _ => "back",
        }
    }
}

impl fmt::Display for MenuIcon {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(
            f,
            "{}",
            match self.itype {
                IconType::Accessories => "Accessories",
                IconType::ANRecruit => "Arknights Recruitment Helper",
                IconType::Assemble => "Assemble",
                IconType::Kisekae => "Generic Kisekae Shichihenge",
                IconType::Programs => "Music Key Detector",
            }
        )
    }
}

pub enum Msg {
    Right,
    Left,
    Jump(usize),
}

pub struct Model {
    icons: [MenuIcon; ITEM_NUM],
    current: usize,
}

pub fn init(_: Url, _: &mut impl Orders<Msg>) -> Model {
    Model {
        icons: [
            MenuIcon { itype: IconType::Accessories, id: 0 },
            MenuIcon { itype: IconType::ANRecruit, id: 1 },
            MenuIcon { itype: IconType::Assemble, id: 2 },
            MenuIcon { itype: IconType::Kisekae, id: 3 },
            MenuIcon { itype: IconType::Programs, id: 4 },
        ],
        current: 0,
    }
}

pub fn update(msg: Msg, model: &mut Model, _: &mut impl Orders<Msg>) {
    let target = match msg {
        Msg::Jump(n) => n,
        Msg::Right => {
            if model.current == 0 {
                ITEM_NUM - 1
            } else {
                model.current - 1
            }
        }
        Msg::Left => {
            if model.current == ITEM_NUM - 1 {
                0
            } else {
                model.current + 1
            }
        }
    };
    if target == model.current {
        web_sys::window().unwrap().open_with_url(model.icons[target].itype.link()).unwrap();
    } else {
        model.current = target;
    }
}

pub fn view(model: &Model) -> Node<Msg> {
    main![
        div![attrs! {At::Id => "menu-left"}, ev(Ev::Click, |_| Msg::Left)],
        div![attrs! {At::Id => "menu-right"}, ev(Ev::Click, |_| Msg::Right)],
        model.icons.iter().cloned().map(|e| div![
            C!["menu-icon"],
            attrs! {At::Id => e.compute_pos(model.current).to_string()},
            img![attrs! {At::Src => format!("./images/icon-{}.png", e.itype.name())}, ev(Ev::Click, move |_| Msg::Jump(e.id))],
        ]),
        h2![attrs! {At::Id => "menu-title"}, format!("{}", model.icons[model.current])],
    ]
}
