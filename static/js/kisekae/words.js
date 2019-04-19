import { STAT } from './stat.js'

const words = {
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
    choose_bikini: {
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
    choose_wasureta: {
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
    bikini: {
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
    wasureta: {
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
        console.log('sequence: '+ this.sequence)
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
        console.log('seqptr: '+ this.seqptr)
        if (this.seqptr >= this.sequence.lines.length) {
            return this.sequence.next
        }
    }

}
