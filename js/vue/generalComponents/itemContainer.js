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
            <div class="container-inner" @click="navigate()">
                <div class="container-title">
                    <p class="container-text">{{title}}</p>
                </div>
                <div class="container-disc">
                    <p class="container-text">{{description}}</p>
                </div>
            </div>
        </div>
    `
}
