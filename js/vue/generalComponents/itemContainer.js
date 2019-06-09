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
            <div class="container-inner" @click="this.navigate()">
                <div class="container-title">
                    <p class="container-text">{{this.title}}</p>
                </div>
                <div class="container-disc">
                    <p class="container-text">{{this.description}}</p>
                </div>
            </div>
        </div>
    `
}
