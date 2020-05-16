use std::fmt;
use yew::{ prelude::* };

mod tags;
use tags::{Tag};

mod operators;

const TAG_N: usize = 6;

pub enum Msg {
    Toggle(Tag),
    Clear,
    Submit,
}

pub struct Recruiter {
    link: ComponentLink<Self>,
    selected: [Option<Tag>; TAG_N],
}

impl Component for Recruiter {
    type Message = Msg;
    type Properties = ();
    fn create(_: Self::Properties, link: ComponentLink<Self>) -> Self {
        Self {
            link,
            selected: [None; TAG_N],
        }
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg {
            Msg::Toggle(tag) => {},
            Msg::Clear => self.selected = [None; TAG_N],
            Msg::Submit => {},
        };
        if target == self.current {
            web_sys::window().unwrap().open_with_url(self.icons[target as usize].itype.link()).unwrap();
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
            <div id="rolling-menu">
                <div id="menu-left" onclick=self.link.callback(|_| Msg::Left)/>
                <div id="menu-right" onclick=self.link.callback(|_| Msg::Right)/>
                { self.icons.iter().cloned().map(|e| html!{
                    <div class="menu-icon" id=e.compute_pos(self.current)>
                        <img src=format!("./images/icon-{}.png", e.itype.name()) onclick=self.link.callback(move |_| Msg::Jump(e.id))/>
                    </div>
                }).collect::<Html>() }
                <h2 id="menu-title">{ format!("{}", self.icons[self.current as usize]) }</h2>
            </div>
        }
    }
}
