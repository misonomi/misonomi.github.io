import { STAT } from './stat.js'

const words = {
    ready: {
        lines: [
            {
                word: 'お久しぶりです，ご主人様！\n聖杯戦争で勝つためのコスチューム，\nもう一度一緒に考えてみましょ？',
                emote: 'normal',
            }, 
        ],
        next: STAT.select,
    },
    intro: {
        lines: [
            {
                word: 'よし来た！\nそれじゃあ，いろいろ試してみましょ？',
                emote: 'normal',
            }, 
        ],
        next: STAT.select,
    },
    select0: {
        lines: [
            {
                word: 'ご主人様が最強だと思うコスチュームはどれですか？',
                emote: 'normal',
            }, 
        ],
        next: STAT.cg,
    },
    select1: {
        lines: [
            {
                word: 'てなわけで，もう一度選んでくださいな',
                emote: 'normal',
            }, 
        ],
        next: STAT.cg,
    },
    select3: {
        lines: [
            {
                word: '最後のチャンスですよ！\nご主人様が最強だと思うコスチュームを\n後悔のないように選んでくださいね！',
                emote: 'normal',
            }, 
        ],
        next: STAT.cg,
    },
    select2: {
        lines: [
            {
                word: 'もう一回です！\n聖杯戦争に着てくんですからちゃんと選んでください！',
                emote: 'normal',
            }, 
        ],
        next: STAT.cg,
    },
    choose_miko: {
        lines: [
            {
                word: 'おや...これは...',
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
                word: 'えへ，これを着て，私に\n「ご主人さまぁ～～❤」\nって言ってもらいたい，とか？',
                emote: 'normal',
            },
            {
                word: 'いーぃですよ～，いいですとも❤',
                emote: 'normal',
            },
            {
                word: 'でーも，覗きはご法度ですからねっ',
                emote: 'normal',
            },
        ],
        next: STAT.game,
    },
    choose_mizugi: {
        lines: [
            {
                word: 'ほっ...ほんとに，これ...なんですか？',
                emote: 'normal',
            },
            {
                word: 'まあ...見たいってのなら仕方ないですねっ\nもう...ご主人さまったらっ',
                emote: 'normal',
            },
            {
                word: 'でも，覗いたらダメですよ！',
                emote: 'normal',
            },
        ],
        next: STAT.game,
    },
    choose_gymsuit: {
        lines: [
            {
                word: 'もしかしてご主人様，スポーティなのが好みですか？',
                emote: 'normal',
            }, 
            {
                word: 'まあ着替えてみますね！\n',
                emote: 'normal',
            }, 
        ],
        next: STAT.game,
    },
    choose_sarashi: {
        lines: [
            {
                word: 'えぇ～～～～～！！？\nまたこれなんですかぁ！？',
                emote: 'normal',
            },
            {
                word: '「聖杯戦争に勝つためのこすちゅーむー！！！」ですよ！',
                emote: 'normal',
            },
            {
                word: '...はぁ，だめだこりゃ...',
                emote: 'normal',
            },
            {
                word: 'のぞかないでくださいね...',
                emote: 'normal',
            },
        ],
        next: STAT.game,
    },
    miko: {
        lines: [
            {
                word: 'どうですか？ご主人様？',
                emote: 'normal',
            }, 
            {
                word: '似合ってるとは思うんですけど...\n正直普通...ってか，',
                emote: 'normal',
            }, 
            {
                word: '別にこれじゃなくてもいい気がします',
                emote: 'normal',
            }, 
        ],
        next: STAT.select,
    },
    maid: {
        lines: [
            {
                word: 'おかえりなさいませっ　ご主人様！\n             \n一応言っておきました～',
                emote: 'normal',
            },
            {
                word: 'なんかー，フリフリしててですねぇー，\n動きづらいってのが本音ですぅー',
                emote: 'normal',
            },
            {
                word: 'もっといい戦闘服があると思います',
                emote: 'normal',
            },
        ],
        next: STAT.select,
    },
    mizugi: {
        lines: [
            {
                word: '...っていうか，誰ですかこれ用意したのは！？',
                emote: 'normal',
            },
            {
                word: '尻尾の穴までご丁寧に開けてあるし！！！',
                emote: 'normal',
            },
            {
                word: '手作り感満載と申しますか...\n病院行ったほうがいいですよ，そいつ',
                emote: 'normal',
            },
            {
                word: 'えっ？...\nご主人様...が，用意した，...んですか',
                emote: 'normal',
            },
            {
                word: 'あらあら...ごめんなさい',
                emote: 'normal',
            },
            {
                word: 'でも...ほかにもっと良いのがあると思うんで\nそれ，探しましょ，ね',
                emote: 'normal',
            },
        ],
        next: STAT.select,
    },
    gymsuit: {
        lines: [
            {
                word: 'どう思います？これ...',
                emote: 'normal',
            },
            {
                word: '何着ても可愛いのが私のいいところですけど...',
                emote: 'normal',
            },
            {
                word: 'ちょーっと，脚のあたりのすーすー加減が気になりますぅ...',
                emote: 'normal',
            },
            {
                word: '他にもっといいのがある気がしまーすっ',
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
                word: '遊んでくれてありがとうございました，ご主人様',
                emote: 'normal',
            },
            {
                word: '願わくばこれからもずっと...',
                emote: 'normal',
            },
            {
                word: 'ずっと，忘れないでくださいね\n私の，たった一人のご主人様',
                emote: 'normal',
            },
        ],
        next: STAT.ready,
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
