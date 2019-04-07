import { STAT } from './stat.js';

export default class {
    constructor() {
        this.stat = STAT.init;
    }
    getStat() {
        return this.stat;
    }
    click() {
        switch(this.stat) {
            case STAT.init:
                this.stat = STAT.game;
                break;
            case STAT.game:
                this.stat = STAT.init;
                break;
            default:
        }
    }
}