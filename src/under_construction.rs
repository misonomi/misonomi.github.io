use seed::{prelude::*, *};

pub struct Model {}

pub enum Msg {}

pub fn init(_: Url, _: &mut impl Orders<Msg>) -> Model {
    Model {}
}

pub fn update(_msg: Msg, _model: &mut Model, _: &mut impl Orders<Msg>) {}

pub fn view(_model: &Model) -> Node<Msg> {
    main![div!["koujichu~"],]
}
