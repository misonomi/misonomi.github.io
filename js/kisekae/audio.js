export default class {
    constructor() {
        /*
        this.audioctx = new AudioContext()
        this.audiolist = {}
        for (const k of audiokey) {
            let reader = new FileReader()

            reader.readAsArrayBuffer(new File('./sounds/kisekae/' + k + '.wav'))
            this.audioctx.decodeAudioData(reader.result, function(buffer) {
                this.audiolist[k] = buffer
            })
        }
        */
    }
    play(key) {
        /*
        let source = this.audioctx.createBufferSource()
        source.buffer = this.audiolist[key]
        source.connect(this.audioctx.destination)
        source.start();
        */
    }
}

const audiokey = ['mi']//, 'crack', 'open', 'close', 'select']
