export default class {
    constructor() {
        this.audioctx = new AudioContext();
        this.mi_sound = await LoadSample(this.audioctx, './sounds/kisekae/mi.wav');
    }
    mi() {
        const src = new AudioBufferSourceNode(this.audioctx, {buffer:this.mi_sound});
        src.connect(audioctx.destination);
        src.start();
    }
}