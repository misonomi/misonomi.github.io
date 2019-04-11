export default {
    name: 'item-container',
    props: [
        'data'
    ],
    data() {
        return {
            ptr: 0,
        }
    },
    methods: {
        left() {
            ptr = (ptr >= data.items.length) ? 0 : ptr + 1
        },
        right() {
            ptr = (ptr <= 0) ? data.items.length : ptr - 1
        },
    },
    template: `
        <div class="container-outer">
        </div>
    `
}
