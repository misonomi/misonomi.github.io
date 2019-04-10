export default {
    name: 'menu-icon',
    props: [
        'name',
        'link',
        'id',
        'current',
    ],
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
        link (event) {
            console.log('link function start. name:' + name + ', link:' + link + ', id:' + id + ', current:' + current);
            event.stopPropagation()
            window.location.href = link
        },
        compute_pos() {
            console.log('compute function start. id:' + id + ', current:' + current);
            return this.positionList[((id - current + 5) % 5)]
        }
    },
    template: `
        <div class="menuIcon" :id="compute_pos()" @click="link($event)">
            <img :src="'../../images/' + name + 'icon.png'">
        </div>
    `
}