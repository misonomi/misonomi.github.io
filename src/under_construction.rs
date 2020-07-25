use yew::prelude::*;

pub struct UnderConstruction {}

impl Component for UnderConstruction {
    type Message = ();
    type Properties = ();
    fn create(_: Self::Properties, _link: ComponentLink<Self>) -> Self {
        Self {}
    }

    fn update(&mut self, _msg: Self::Message) -> ShouldRender {
        false
    }

    fn change(&mut self, _props: Self::Properties) -> ShouldRender {
        false
    }

    fn view(&self) -> Html {
        html! {
            <main>
                <div id="under-construction">{ "Koujichu~" }</div>
            </main>
        }
    }
}
