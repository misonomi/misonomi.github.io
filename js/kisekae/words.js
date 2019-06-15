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
                word: 'よし来た！\nそれじゃあ，いろいろ試してみましょう！',
                emote: 'normal',
            },
            {
                word: 'はじめての方のために一応説明しておきますとー，\n今日は私が聖杯戦争を生き残れるように\n強そうな戦闘服を選んでいただきたいのです',
                emote: 'normal',
            },
            {
                word: 'ってのは建前で...\nようは私を好きに着せ替えてかわいーってするゲームです！\nシンプルですね！',
                emote: 'normal',
            },
            {
                word: 'もしかしたら中には変な服もあるかもしれませんけど...\n私，ご主人様の良心を信じてますから！',
                emote: 'normal',
            },
        ],
        next: STAT.select,
    },
    select0: {
        lines: [
            {
                word: 'そういうわけで\nご主人様が最強だと思うコスチュームはどれですか？',
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
    select2: {
        lines: [
            {
                word: 'ささ，次はなんにします？\nちゃんと強そうなの選んでくださいね！',
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
    choose_miko: {
        lines: [
            {
                word: 'おや...これは...',
                emote: 'normal',
            }, 
            {
                word: '特にひねりがないというか...\nド直球ってやつですね',
                emote: 'normal',
            }, 
            {
                word: 'まあ，ジョブにマッチした装備は重要ですもんね！\nナイスチョイスです',
                emote: 'normal',
            }, 
            {
                word: 'それじゃ早速着替えますね！',
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
                word: 'もっっちろんいーぃですよ❤\nお望みなら毎日でも言って差し上げますとも！',
                emote: 'normal',
            },
            {
                word: 'じゃ着替えますね！\nしばしお待ちを',
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
                word: 'まあ...見たいってのなら仕方ないですねっ\nちょっと待っててくださいな',
                emote: 'normal',
            },
        ],
        next: STAT.game,
    },
    choose_gymsuit: {
        lines: [
            {
                word: 'あら，もしかしてご主人様，スポーティなのが好みですか？',
                emote: 'normal',
            },
            {
                word: 'とにかく着替えてみますね！\n少々お待ちくださいな',
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
                word: 'ご主人様，ご自分が何を言ってるかほんとに分かってます！？',
                emote: 'normal',
            },
            {
                word: 'これ着て戦えってんですか！？このトランクスを！',
                emote: 'normal',
            },
            {
                word: '...はぁ，だめだこりゃ...',
                emote: 'normal',
            },
            {
                word: 'せめてのぞかないでくださいね...',
                emote: 'normal',
            },
        ],
        next: STAT.game,
    },
    changing_miko: {
        lines: [
            {　word: '巫女服は着慣れてますからすぐ終わりますからねー',　},
            {　word: 'ここを...こうして　っと...\nここで結んで...',　},
            {　word: '...っと，これじゃちょっとはだけすぎかー',　},
            {　word: '...よしよし，出来ましたよー',　},
        ],
        next: STAT.game,
    },
    changing_maid: {
        lines: [
            {　word: '一口にメイド服と言ってもいろいろありますけど\nなるほど，こういうやつですね',　}, 
            {　word: 'んしょ...っと',　}, 
            {　word: 'おっとと...カチューシャを忘れるとこでした...\n耳があるとちょっと窮屈ですけど...これがないと画竜点睛を欠くが如くってなもんです',　}, 
            {　word: 'はい，できましたっ',　}, 
        ],
        next: STAT.game,
    },
    changing_mizugi: {
        lines: [
            {　word: '...',　}, 
            {　word: '水着の着替えって恥ずかしいですよね，なんか',　}, 
            {　word: '...!\n......',　}, 
            {　word: 'はい，できました...けど...',　}, 
        ],
        next: STAT.game,
    },
    changing_gymsuit: {
        lines: [
            {　word: 'よいしょっ...むむ...',　},
            {　word: '下着無しでのこのフィット感...\nこれはちょっとまずいんじゃ...',　},
            {　word: '...ま，まあいいか...\nできましたよ...っと',　},
        ],
        next: STAT.game,
    },
    changing_sarashi: {
        lines: [
            {　word: '~~~~~~!!!!',　},
            {　word: 'ちょっとこれを着て人前に出ていいのかどうか...',　},
            {　word: 'というか冷静になって考えたらこれじゃ下着姿じゃないですか！\n着替えとして成立してませんよ！\nテ○リスで言ったらS字のやつしか降ってこないようなもんです！',　},
            {　word: 'ま，まあとにかく...着替え終わりました～',　}, 
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
                word: 'おかえりなさいませっ　ご主人様！\n...\n一応言っておきました～',
                emote: 'normal',
            },
            {
                word: 'かわいいですかー？可愛いですよねー❤\n実はこの服を実際に私に着せられるゲームがあってですねぇー❤',
                emote: 'normal',
            },
            {
                word: 'お楽しみはそっちにとっておくことにして...\n今日のところは他の衣装を試してみましょう',
                emote: 'normal',
            },
        ],
        next: STAT.select,
    },
    mizugi: {
        lines: [
            {
                word: '...誰ですかこれ用意したのは！？',
                emote: 'normal',
            },
            {
                word: '尻尾の穴までご丁寧に開けてあるし！！！\nいいたかねーですけどこれ作られた方は相当ですよ，相当',
                emote: 'normal',
            },
            {
                word: 'お目にかかれたら私が直々に病院にブチ込んで差し上げます\n体の方でも頭の方でもお好みのほうに',
                emote: 'normal',
            },
            {
                word: 'えっ？...\nご主人様...が，用意した ...んですか',
                emote: 'normal',
            },
            {
                word: 'あらあら...えっと，その...\nごめんなさい...',
                emote: 'normal',
            },
            {
                word: 'でも...これはあんまり戦闘には向かないですよね，ほら...\nこれ着て戦ったらいろいろあぶねー感じになっちゃいますよ',
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
                word: 'まあご主人様がおっしゃりたいことはよーくわかります\n動きやすい！健康的！可愛い！',
                emote: 'normal',
            },
            {
                word: 'え？かわいすぎて他人に見せたくないから他の服がいい？\nやん❤ご主人さまったら❤',
                emote: 'normal',
            },
            {
                word: 'そういわれちゃ仕方ないですね❤\n他の服も試してみましょっか',
                emote: 'normal',
            },
        ],
        next: STAT.select,
    },
    sarashi: {
        lines: [
            {
                word: '......着ましたよ\n満足ですか',
                emote: 'normal',
            },
            {
                word: 'いーえ，謝ってもダメですぅー！\nぬぁーにがトランクスですか！',
                emote: 'normal',
            },
            {
                word: 'もはや言葉は不要です！他の衣装を選んでください！！',
                emote: 'normal',
            },
        ],
        next: STAT.select,
    },
    cg_miko: {
        lines: [
            {　word: 'き，\nきゃああああああああ！？',　},
            {　word: 'ご主人様...！？\nご主人様といえどやっていいことと悪いことがありますよ...！',　},
            {　word: 'やや心が痛みますが\nおイタが過ぎるご主人様にはきっついお仕置きが必要ですね...\n食らいやがれーーー！！！！',　},
            {　word: 'まずは金的！\n次も金的！\nそしてこれがとどめの金的だぁーー！！！',　},
        ],
        next: STAT.ed,
    },
    cg_maid: {
        lines: [
            {　word: 'おや',　},
            {　word: 'なにやらガンガン騒がしいと思ったら...\nそんなに私の着替えが見たかったんですか？\nふふっ',　},
            {　word: 'でもざーんねんでしたっ\nもうだいたい終わっちゃいましたよー',　},
            {　word: '次はもうちょっと早く壊してみてください❤がんばってくださいね❤\n（※早く壊してもなにも変化はありません\n自分のペースでゲームを楽しみましょう）',　},
        ],
        next: STAT.ed,
    },
    cg_mizugi: {
        lines: [
            {　word: 'ちょっ，うわぁ！？\n何してるんですかご主人様！？',　},
            {　word: 'あっぶねー...\n巻きタオル持ってきてよかったです',　},
            {　word: 'いや，私はまんざらでもないですけどね\nこの，ぎっと...なんとかってとこはそういうの厳しいので',　},
            {　word: '...',　},
            {　word: 'あのー，ご主人様？まんざらでもないとは言いましたけど...\nさすがにー，見られたまま着替えを続けるのはー\nその，まだ私はそのレベルまで達してないかなーって',　},
            {　word: '思いますのでー\nちょーっとだけ障子の向こうで待ってていただけます？',　},
            {　word: 'はい，ご理解ありがとうございます！\n着替え終わったら私のかわいい水着姿，好っきなだけ見せてあげますね！\n震えて眠っちゃってくださいな',　},
        ],
        next: STAT.ed,
    },
    cg_gymsuit: {
        lines: [
            {　word: 'あれ？もしかしてご主人様？',　},
            {　word: '申し訳ないんですけどこの通りまだ着替え終わってなくてですねぇ\n...っていうか鍵かけてたと思うんですけど！？',　},
            {　word: 'え？壊した？　三個とも？\nはぇ...そうですか，ワイルドですね...',　},
            {　word: 'ところでご主人様，ちょっとゲームをしませんか？\n『覗きの現行犯目撃したらその場で何でも言うこと聞かせちゃうゲーム』\nっていうんですけど――――',　},
        ],
        next: STAT.ed,
    },
    cg_sarashi: {
        lines: [
            {　word: 'DEBUG: このメッセージは見れちゃダメですっ',　},
        ],
        next: STAT.ed,
    },
    extragameintro: {
        lines: [
            {　word: '...',　},
            {　word: 'ご主人様，私がそう何度も同じ手に引っかかるとお思いですか？',　},
            {　word: 'その障子はセメントで接着しちゃいました！\nいや～残念でしたね～\n南京錠を素手で破壊してまで私の着替え見たかったのに～',　},
            {　word: 'え？私はどうやって出るのかって？',　},
            {　word: '......',　},
            {　word: 'あのー，ご主人様？ここ開けてくださいません？\n南京錠を破壊できるご主人様なら多分開けられると思うので...',　},
        ],
        next: STAT.extragame,
    },
    trueed: {
        lines: [
            {　word: 'ふー　結構試しましたね\n今日はこのくらいにしましょう',
                emote: 'normal',
            },
            {
                word: '...私，ご主人様とこうやって遊べるのが幸せだなって...\n最近すごくそう思うんです',
                emote: 'normal',
            },
            {
                word: 'だから...どうかこれからもずっと...',
                emote: 'normal',
            },
            {
                word: 'ずっと，忘れないでくださいね\n私の，たった一人のご主人様',
                emote: 'normal',
            },
        ],
        next: STAT.ed,
    },
    normaled: {
        lines: [
            {
                word: 'ふー　結構試しましたね\n今日はこのくらいにしましょう',
                emote: 'normal',
            },
            {
                word: 'どうですか，ご主人様？\n思い返すとしょうもな...もとい，印象的な衣装ばかりでしたけど\nなにかお気に入りはありました？',
                emote: 'normal',
            },
            {
                word: '今日試した衣装で戦うのは流石に遠慮したいですけど...\nたまにはこういう遊びも楽しいですね！',
                emote: 'normal',
            },
            {
                word: 'また遊んでくださいね！\n私待ってますから',
                emote: 'normal',
            },
        ],
        next: STAT.ed,
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
            console.error('talk index out of bounds')
        }
    }
    emote() {
        if (this.seqptr < this.sequence.lines.length) {
            return this.sequence.lines[this.seqptr].emote
        } else {
            console.error('talk index out of bounds')
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
