use yew::prelude::*;

#[derive(Clone)]
pub struct AccessoryItem {
    name: String,
    link: String,
    desc: String,
}

impl AccessoryItem {
    fn generate() -> Vec<Self> {
        vec!(
            AccessoryItem{
                name: "キャス狐カーソル".to_string(),
                link: "https://1drv.ms/u/s!Ah596hbE_QbKgwMPLJ6z6X3-X7O5".to_string(),
                desc: "FATE/EXTRAのキャラクター，キャス狐をフィーチャーしたマウスカーソルです".to_string(),
            },
        )
    }
}

pub enum Msg {
    Go(String),
}

pub struct Accessories {
    link: ComponentLink<Self>,
    items: Vec<AccessoryItem>
}

impl Component for Accessories {
    type Message = Msg;
    type Properties = ();
    fn create(_: Self::Properties, link: ComponentLink<Self>) -> Self {
        Self {
            link,
            items: AccessoryItem::generate(),
        }
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg {
            Msg::Go(link) => {
                web_sys::window()
                .unwrap()
                .open_with_url(&link)
                .unwrap();
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
                { self.items.clone().into_iter().map(|i| self.container_view(i) ).collect::<Html>() }
            </main>
        }
    }
}

impl Accessories {
    fn container_view(&self, item: AccessoryItem) -> Html {
        let link =item.link;
        html! {
            <div class="container-outer">
                <div class="container-inner" onclick=self.link.callback(move |_| Msg::Go(link.clone()))>
                    <div class="container-title">
                        <p class="container-text">{ &item.name }</p>
                    </div>
                    <div class="container-disc">
                        <p class="container-text">{ &item.desc }</p>
                    </div>
                </div>
            </div>
        }
    }
}
