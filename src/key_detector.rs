use seed::{prelude::*, *};

pub struct Model {
    counter: i32,
}

pub enum Msg {
    Increment,
}

pub fn init(_: Url, _: &mut impl Orders<Msg>) -> Model {
    Model { counter: 0 }
}

pub fn update(msg: Msg, model: &mut Model, _: &mut impl Orders<Msg>) {
    match msg {
        Msg::Increment => model.counter += 1,
    }
}

pub fn view(model: &Model) -> Node<Msg> {
    div![C!["counter"], "This is a counter: ", button![model.counter, ev(Ev::Click, |_| Msg::Increment),],]
}
