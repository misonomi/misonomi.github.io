const rollMenuModel = {
    current: 0,
    itemList: [
        "Programs",
        "Accessories",
        "Aboutme",
        "Assemble",
        "Games"
    ],
    title: ""
}

const posModel = {
    id: 0,
    positionList: [
        "front",
        "left-front",
        "left-back",
        "right-back",
        "right-front"
    ]
}

const rollMenuVM = new Vue({
    el: '.rollingMenu',
    data: rollMenuModel,
    created () {
        this.title = this.itemList[0]
    },
    methods: {
        rollLeft () {
            this.current > this.itemList.length - 2 ? this.current = 0 : this.current = this.current + 1
        },
        rollRight () {
            this.current < 1 ? this.current = this.itemList.length - 1 : this.current = this.current - 1
        },
        roll (event) {
            let xpos = event.pageX;
            let pagex = window.innerWidth;
            if(xpos < pagex / 2) {
                this.rollLeft();
            } else {
                this.rollRight();
            }
            this.title = this.itemList[this.current];
            ProgramVM.posfix();
            AccessoryVM.posfix();
            AboutmeVM.posfix();
            AssembleVM.posfix();
            GameVM.posfix();
        } 
    }
})

const IconsVM = {
    data: posModel,
    methods: {
        posfix () {
            this.pos = this.positionList[((this.id - rollMenuVM.current + 5) % rollMenuVM.itemList.length)]
        },
        clicked () {
            return false;
        }
    }
}
const ProgramVM = new Vue({
    el: '.programs',
    data: {
        pos: ""
    },
    mixins: [IconsVM],
    created () {
        this.id = 0;
        this.posfix();
    }
})
const AccessoryVM = new Vue({
    el: '.accessories',
    data: {
        pos: ""
    },
    mixins: [IconsVM],
    created () {
        this.id = 1;
        this.posfix();
    }
})
const AboutmeVM = new Vue({
    el: '.aboutme',
    data: {
        pos: ""
    },
    mixins: [IconsVM],
    created () {
        this.id = 2;
        this.posfix();
    }
})
const AssembleVM = new Vue({
    el: '.assembly',
    data: {
        pos: ""
    },
    mixins: [IconsVM],
    created () {
        this.id = 3;
        this.posfix();
    }
})
const GameVM = new Vue({
    el: '.games',
    data: {
        pos: ""
    },
    mixins: [IconsVM],
    created () {
        this.id = 4;
        this.posfix();
    }
})