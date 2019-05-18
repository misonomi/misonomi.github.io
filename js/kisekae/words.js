import { STAT } from './stat.js'

const words = {
    ready: {
        lines: [
            {
                word: 'ささご主人様\n聖杯戦争で勝つためのコスチューム，\n一緒に考えてみます？',
                emote: 'normal',
            }, 
        ],
        next: STAT.select,
    },
    intro: {
        lines: [
            {
                word: 'よし来た！\nじゃあ，いろいろ試してみましょ？',
                emote: 'normal',
            }, 
        ],
        next: STAT.select,
    },
    select: {
        lines: [
            {
                word: 'ご主人様が最強と思うコスチュームはどれですか？',
                emote: 'normal',
            }, 
        ],
        next: STAT.cg,
    },
    choose_miko: {
        lines: [
            {
                word: 'おや...これは，',
                emote: 'normal',
            }, 
            {
                word: '特にひねりがないというか...',
                emote: 'normal',
            }, 
            {
                word: '霊験あらたかな狐耳としてはピッタリの衣装ですけどね',
                emote: 'normal',
            }, 
            {
                word: 'まいいや\n覗かないでくださいね♡',
                emote: 'normal',
            }, 
        ],
        next: STAT.game,
    },
    choose_maid: {
        lines: [
            {
                word: 'aaaa',
                emote: 'normal',
            }, 
            {
                word: 'aaaa',
                emote: 'normal',
            }, 
        ],
        next: STAT.game,
    },
    choose_mizugi: {
        lines: [
            {
                word: 'aaaa',
                emote: 'normal',
            }, 
            {
                word: 'aaaa',
                emote: 'normal',
            }, 
        ],
        next: STAT.game,
    },
    choose_gymsuit: {
        lines: [
            {
                word: 'aaaa',
                emote: 'normal',
            }, 
            {
                word: 'aaaa',
                emote: 'normal',
            }, 
        ],
        next: STAT.game,
    },
    choose_sarashi: {
        lines: [
            {
                word: 'aaaa',
                emote: 'normal',
            }, 
            {
                word: 'aaaa',
                emote: 'normal',
            }, 
        ],
        next: STAT.game,
    },
    miko: {
        lines: [
            {
                word: 'aaaa',
                emote: 'normal',
            }, 
            {
                word: 'aaaa',
                emote: 'normal',
            }, 
        ],
        next: STAT.select,
    },
    maid: {
        lines: [
            {
                word: 'aaaa',
                emote: 'normal',
            }, 
            {
                word: 'aaaa',
                emote: 'normal',
            }, 
        ],
        next: STAT.select,
    },
    mizugi: {
        lines: [
            {
                word: 'aaaa',
                emote: 'normal',
            }, 
            {
                word: 'aaaa',
                emote: 'normal',
            }, 
        ],
        next: STAT.select,
    },
    gymsuit: {
        lines: [
            {
                word: 'aaaa',
                emote: 'normal',
            }, 
            {
                word: 'aaaa',
                emote: 'normal',
            }, 
        ],
        next: STAT.select,
    },
    sarashi: {
        lines: [
            {
                word: 'aaaa',
                emote: 'normal',
            }, 
            {
                word: 'aaaa',
                emote: 'normal',
            }, 
        ],
        next: STAT.select,
    },
    ed_miko: {
        lines: [
            {
                word: 'aaaa',
                emote: 'normal',
            }, 
            {
                word: 'aaaa',
                emote: 'normal',
            }, 
        ],
        next: STAT.talk,
    },
    ed_maid: {
        lines: [
            {
                word: 'aaaa',
                emote: 'normal',
            }, 
            {
                word: 'aaaa',
                emote: 'normal',
            }, 
        ],
        next: STAT.talk,
    },
    ed_mizugi: {
        lines: [
            {
                word: 'aaaa',
                emote: 'normal',
            }, 
            {
                word: 'aaaa',
                emote: 'normal',
            }, 
        ],
        next: STAT.talk,
    },
    ed_gymsuit: {
        lines: [
            {
                word: 'aaaa',
                emote: 'normal',
            }, 
            {
                word: 'aaaa',
                emote: 'normal',
            }, 
        ],
        next: STAT.talk,
    },
    ed_sarashi: {
        lines: [
            {
                word: 'aaaa',
                emote: 'normal',
            }, 
            {
                word: 'aaaa',
                emote: 'normal',
            }, 
        ],
        next: STAT.talk,
    },
    outro: {
        lines: [
            {
                word: 'aaaa',
                emote: 'normal',
            }, 
            {
                word: 'aaaa',
                emote: 'normal',
            }, 
        ],
        next: STAT.init,
    },
}

export default class {
    constructor() {
        this.sequence = []
        this.seqptr = 0
    }
    init(seq) {
        this.sequence = words[seq]
        this.seqptr = 0
    }
    text() {
        if (this.seqptr < this.sequence.lines.length) {
            return this.sequence.lines[this.seqptr].word
        } else {
            console.log('talk index out of bounds')
        }
    }
    emote() {
        if (this.seqptr < this.sequence.lines.length) {
            return this.sequence.lines[this.seqptr].emote
        } else {
            console.log('talk index out of bounds')
        }
    }
    next() {
        this.seqptr++
        if (this.seqptr >= this.sequence.lines.length) {
            return this.sequence.next
        } else {
            return null
        }
    }

}
