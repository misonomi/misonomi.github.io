import MyHeader from './generalComponents/myHeader.js'
import PartsSelector from './assembleComponents/partsSelector.js'

export default {
    name: 'assemble',
    components: {
        MyHeader,
        PartsSelector,
    },
    template: `
        <div class="assemble">
            <my-header
                title="Accessories"
            >
            <div class="parts-selector-outer">
                <parts-selector
                    :data="head"
                >
            </div>
            <div class="assemble-view">
            </div>
            <div class="assemble-status">
            </div>
        </div>
    `
}
