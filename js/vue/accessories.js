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
            />
            <item-container
                title="キャス狐カーソル"
                link="https://1drv.ms/u/s!Ah596hbE_QbKgwMPLJ6z6X3-X7O5"
                description="『FATE/EXTRA』のキャラクター，キャス狐をフィーチャーしたマウスカーソルです"
            />
            <item-container
                title="Bomber Cradleカーソル"
                link="https://1drv.ms/u/s!Ah596hbE_QbKgznFGjc2WdbTTjtV?e=l9lgL8"
                description="『怒首領蜂最大往生』の戦闘機，Bomber Cradleをフィーチャーしたマウスカーソルです"
            />
        </div>
    `
}
