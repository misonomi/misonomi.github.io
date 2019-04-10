export default {
    name: 'menu-icon',
    props: {
        name: String,
        link: String,
        id: Number,
        current: Number,
    },
    data() {
        return {
            posList: [
                "front",
                "left-front",
                "left-back",
                "right-back",
                "right-front",
            ],
        }
    },
    methods: {
        navigate (event) {
            console.log('link function start. name:' + this.name + ', link:' + this.link + ', id:' + this.id + ', current:' + this.current);
            event.stopPropagation()
            window.location.href = this.link
        },
        compute_pos() {
            console.log('compute function start. id:' + this.id + ', current:' + this.current);
            return this.posList[((this.id - this.current + 5) % 5)]
        }
    },
    template: `
        <div class="menuIcon" :id="compute_pos()" @click="navigate($event)">
            <img :src="'./static/images/' + name + 'icon.png'">
        </div>
    `
}