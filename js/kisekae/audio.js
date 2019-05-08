export default class {
    constructor() {
        this.audioctx = new AudioContext()
        this.audiolist = {}
        for (const k of audiokey) {
            this.audiolist[k] = new Audio('./sounds/kisekae/' + k + '.wav')
        }
    }
    play(key) {
        let source = this.audioctx.createBufferSource()
        source.buffer = this.audiolist[key]
        source.connect(this.audioctx.destination)
        source.start();
    }
}

const audiokey = ['mi']//, 'crack', 'open', 'close', 'select']
