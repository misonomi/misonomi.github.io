import ItemContainer from './generalComponents/itemContainer.js'
import MyHeader from './generalComponents/myHeader.js'

export default {
    name: 'games',
    components: {
        MyHeader,
        ItemContainer,
    },
    template: `
        <div>
            <my-header
                title="Games"
            />
            <item-container
                title="ジェネリックきせかえ七変化"
                link="./kisekae.html"
                description="かつて存在したFATE/EXTRAの販促FLASHゲーム，『着せ替え七変化☆』のパチモンです"
            />
        </div>
    `
}
