import ItemContainer from './generalComponents/itemContainer.js'
import MyHeader from './generalComponents/myHeader.js'

export default {
    name: 'accessories',
    components: {
        MyHeader,
        ItemContainer,
    },
    template: `
        <div>
            <my-header
                title="Accessories"
            >
            <item-container
                title="キャス狐カーソル"
                link="https://1drv.ms/u/s!Ah596hbE_QbKgwMPLJ6z6X3-X7O5"
                description="FATE/EXTRAのキャラクター，キャス狐をフィーチャーしたマウスカーソルです"
            >
        </div>
    `
}
