import MenuIcon from './menuComponents/menuIcon.js';

export default {
    name: 'rollmenu',
    components: {
        MenuIcon,
    },
    data() {
        return {
            current: 0,
            titles: [
                "Accessories",
                "Aboutme",
                "Assemble",
                "Games",
                "Programs",
            ],
        }
    },
    methods: {
        roll (event) {
            console.log('roll function start. current:' + this.current);
            const xpos = event.pageX;
            const pagex = window.innerWidth;
            if(xpos < pagex / 2) {
                this.rollLeft();
            } else {
                this.rollRight();
            }
            console.log('roll function end. current:' + this.current);
        },
        rollLeft () {
            this.current = ((this.current >= this.titles.length - 1) ? 0 : this.current + 1)
        },
        rollRight () {
            this.current = ((this.current <= 0) ? this.titles.length - 1 : this.current - 1)
        },
    },
    template: `
        <div class="rollingMenu" @click="roll($event)">
            <menu-icon 
                name="accessories" 
                link="/accessories"
                :id="0"
                :current="this.current"
            ></menu-icon>
            <menu-icon 
                name="bio" 
                link="/under_construction"
                :id="1"
                :current="this.current"
            ></menu-icon>
            <menu-icon 
                name="assemble" 
                link="/assemble"
                :id="2"
                :current="this.current"
            ></menu-icon>
            <menu-icon 
                name="games" 
                link="/kisekae"
                :id="3"
                :current="this.current"
            ></menu-icon>
            <menu-icon 
                name="programs" 
                link="/programs"
                :id="4"
                :current="this.current"
            ></menu-icon>
            <p class="roll_menu_title">{{this.titles[this.current]}}</p>
        </div>
    `
}