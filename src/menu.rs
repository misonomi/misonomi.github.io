use std::fmt;
use yew::prelude::*;

const ITEM_NUM: u8 = 5;

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
            IconType::Programs => "https://github.com/misonomi",
        }
    }
}

#[derive(Clone)]
struct MenuIcon {
    itype: IconType,
    id: u8,
}

impl MenuIcon {
    fn compute_pos(&self, current_focus: u8) -> &str {
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
                IconType::Programs => "Programs",
            }
        )
    }
}

pub enum Msg {
    Right,
    Left,
    Jump(u8),
}

pub struct RollingMenu {
    link: ComponentLink<Self>,
    icons: [MenuIcon; ITEM_NUM as usize],
    current: u8,
}

impl Component for RollingMenu {
    type Message = Msg;
    type Properties = ();
    fn create(_: Self::Properties, link: ComponentLink<Self>) -> Self {
        Self {
            link,
            icons: [
                MenuIcon {
                    itype: IconType::Accessories,
                    id: 0,
                },
                MenuIcon {
                    itype: IconType::ANRecruit,
                    id: 1,
                },
                MenuIcon {
                    itype: IconType::Assemble,
                    id: 2,
                },
                MenuIcon {
                    itype: IconType::Kisekae,
                    id: 3,
                },
                MenuIcon {
                    itype: IconType::Programs,
                    id: 4,
                },
            ],
            current: 0,
        }
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        let target = match msg {
            Msg::Jump(n) => n,
            Msg::Right => {
                if self.current == 0 {
                    ITEM_NUM - 1
                } else {
                    self.current - 1
                }
            }
            Msg::Left => {
                if self.current == ITEM_NUM - 1 {
                    0
                } else {
                    self.current + 1
                }
            }
        };
        if target == self.current {
            web_sys::window()
                .unwrap()
                .open_with_url(self.icons[target as usize].itype.link())
                .unwrap();
            false
        } else {
            self.current = target;
            true
        }
    }

    fn change(&mut self, _props: Self::Properties) -> ShouldRender {
        false
    }

    fn view(&self) -> Html {
        html! {
            <main>
                <div id="menu-left" onclick=self.link.callback(|_| Msg::Left)/>
                <div id="menu-right" onclick=self.link.callback(|_| Msg::Right)/>
                { self.icons.iter().cloned().map(|e| html!{
                    <div class="menu-icon" id=e.compute_pos(self.current).to_string()>
                        <img src=format!("./images/icon-{}.png", e.itype.name()) onclick=self.link.callback(move |_| Msg::Jump(e.id))/>
                    </div>
                }).collect::<Html>() }
                <h2 id="menu-title">{ format!("{}", self.icons[self.current as usize]) }</h2>
            </main>
        }
    }
}
