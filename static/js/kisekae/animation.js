export default class {
    constructor() {
        this.duration = 0;
    }
    init(i) {
        this.duration = i;
    }
    frame() {
        if (this.duration > 0) {
            this.duration--;
            return true;
        } else {
            return false;
        }
    }
}