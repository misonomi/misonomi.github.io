import MyHeader from './generalComponents/myHeader.js.js'
import PartsSelector from './assembleComponents/partsSelector.js.js'

export default {
    name: 'assemble',
    data() {
        return {
            weight: 0,
            maxweight: 0,
            en: 0,
            maxen: 0,
        }
    },
    components: {
        MyHeader,
        PartsSelector,
    },
    template: `
        <div class="assemble">
            <my-header
                title="Assemble"
            >
            <div class="parts-selector-outer">
                <parts-selector :partslist="head">
                <parts-selector :partslist="core">
                <parts-selector :partslist="arm">
                <parts-selector :partslist="leg">
                <parts-selector :partslist="generator">
                <parts-selector :partslist="booster">
                <parts-selector :partslist="fcs">
                <parts-selector :partslist="r-arm">
                <parts-selector :partslist="l-arm">
                <parts-selector :partslist="r-back">
                <parts-selector :partslist="l-back">
                <parts-selector :partslist="shoulder">
            </div>
            <div class="assemble-view">
            </div>
            <div class="assemble-status">
            </div>
        </div>
    `
}

const head = [
    {
        name: "",
        desc: "",
        weight: 0,
        en: 0,
    }
]