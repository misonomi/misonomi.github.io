use yew::prelude::*;

const ISIZE: usize = 5;

#[derive(Clone)]
pub struct AccessoryItem<'a> {
    name: &'a str,
    link: &'a str,
    desc: &'a str,
}

static ITEMS: [AccessoryItem; ISIZE] = [
    AccessoryItem {
        name: "キャス狐カーソル",
        link: "https://1drv.ms/u/s!Ah596hbE_QbKgwMPLJ6z6X3-X7O5",
        desc: "『Fate/EXTRA』のキャラクター，キャス狐をフィーチャーしたマウスカーソルです",
    },
    AccessoryItem {
        name: "Bomber Cradleカーソル",
        link: "https://1drv.ms/u/s!Ah596hbE_QbKgznFGjc2WdbTTjtV?e=l9lgL8",
        desc: "『怒首領蜂最大往生』の戦闘機，Bomber Cradleをフィーチャーしたマウスカーソルです",
    },
    AccessoryItem {
        name: "Strains of Ascension",
        link: "https://steamcommunity.com/sharedfiles/filedetails/?id=2393284802",
        desc: "『Noita』向けの上昇負荷を追加するmodです",
    },
    AccessoryItem {
        name: "Mod Hairs Only",
        link: "https://steamcommunity.com/sharedfiles/filedetails/?id=2383581550",
        desc: "『RimWorld』向けの髪型modです",
    },
    AccessoryItem {
        name: "Twitter No Text",
        link: "https://addons.mozilla.org/en-US/firefox/addon/twitter-no-text",
        desc: "twitterから文字を全部消すfirefoxアドオンです",
    },
];

pub enum Msg<'a> {
    Go(&'a str),
}

pub struct Accessories {
    link: ComponentLink<Self>,
    items: &'static [AccessoryItem<'static>; ISIZE],
}

impl Component for Accessories {
    type Message = Msg<'static>;
    type Properties = ();
    fn create(_: Self::Properties, link: ComponentLink<Self>) -> Self {
        Self { link, items: &ITEMS }
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg {
            Msg::Go(link) => {
                web_sys::window().unwrap().open_with_url(link).unwrap();
            }
        };
        false
    }

    fn change(&mut self, _props: Self::Properties) -> ShouldRender {
        false
    }

    fn view(&self) -> Html {
        html! {
            <main>
                <div id="item-list">
                    { self.items.iter().map(|i| self.container_view(i) ).collect::<Html>() }
                </div>
            </main>
        }
    }
}

impl Accessories {
    fn container_view(&self, item: &'static AccessoryItem) -> Html {
        let link = item.link;
        html! {
            <div class="item-container" onclick=self.link.callback(move |_| Msg::Go(link))>
                <div class="title">
                    <p>{ item.name }</p>
                </div>
                <div class="disc">
                    <p>{ item.desc }</p>
                </div>
            </div>
        }
    }
}
