export default class {
    constructor() {
        this.audioctx = new AudioContext()
        this.audiolist = {}
        for (const k of audiokey) {
            let xhr = new XMLHttpRequest()

            xhr.open('GET', './sounds/kisekae/' + k + '.wav', true)
            xhr.responseType = 'arraybuffer'

            xhr.onload = function() {
                let reader = new FileReader()

                reader.readAsArrayBuffer(xhr.response)
                this.audioctx.decodeAudioData(reader.result, function(buffer) {
                    this.audiolist[k] = buffer
                })
            }
        }
    }
    play(key) {
        if (audiokey.includes(key)) {
            let source = this.audioctx.createBufferSource()
            source.buffer = this.audiolist[key]
            source.connect(this.audioctx.destination)
            source.start()
        } else {
            console.error('unknown audio key')
        }
    }
}

const audiokey = ['mi']//, 'crack', 'open', 'close', 'select']
