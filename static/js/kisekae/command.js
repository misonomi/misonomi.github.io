import { STAT } from './stat.js';

export default class {
    constructor() {
        this.stat = STAT.ready;
        this.sequence = 0;
    }
    getStat() {
        return this.stat;
    }
    click(e) {
        switch(this.stat) {
            case STAT.ready:
                this.stat = STAT.talk;
                break;
            case STAT.game:
                this.stat = STAT.ready;
                break;
            case STAT.talk:
                this.sequence --;
            default:
        }
    }
}