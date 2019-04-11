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
            <div class="container-inner" @click="this.navigate()window.open('https://1drv.ms/u/s!Ah596hbE_QbKgwMPLJ6z6X3-X7O5')">
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
