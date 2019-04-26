import ItemContainer from './generalComponents/itemContainer.js.js'
import MyHeader from './generalComponents/myHeader.js.js'

export default {
    name: 'programs',
    components: {
        MyHeader,
        ItemContainer,
    },
    template: `
        <div>
            <my-header
                title="Programs"
            >
            <item-container
                title="twitter image filterer"
                link="https://github.com/misonomi?utf8=%E2%9C%93&tab=repositories&type=source"
                description="自分用twitter検索アプリケーションです"
            >
        </div>
    `
}
