export default {
    name: 'my-header',
    props: {
        title: String,
    },
    template: `
        <header>
            <p class="page_title">{{title}}</p>
        </header>
    `
}
