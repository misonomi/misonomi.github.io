export default {
    name: 'item-container',
    props: {
        title: String,
        link: String,
        description: String,
    },
    methods: {
        navigate() {
            window.location.href = this.link
        }
    },
    template: `
        <div class="container-outer">
            <div class="generator left"/>
            <div class="container-inner" @click="navigate()">
                <div class="container-title textarea">
                    <p class="container-text">{{title}}</p>
                </div>
                <div class="container-desc textarea">
                    <p class="container-text">{{description}}</p>
                </div>
            </div>
            <div class="generator right"/>
        </div>
    `
}
