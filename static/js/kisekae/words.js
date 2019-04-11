import { STAT } from './stat.js';

const words = {
    intro: {
        lines: [
            'aaaa',
            'test',
        ],
        next: STAT.select,
    },
    select: {
        lines: [
            'aaaa',
        ],
        next: STAT.cg,
    },
    choose_miko: {
        lines: [
            'aaaa',
            'test',
        ],
        next: STAT.game,
    },
    choose_maid: {
        lines: [
            'aaaa',
            'test',
        ],
        next: STAT.game,
    },
    choose_bikini: {
        lines: [
            'aaaa',
            'test',
        ],
        next: STAT.game,
    },
    choose_wasureta: {
        lines: [
            'aaaa',
            'test',
        ],
        next: STAT.game,
    },
    choose_sarashi: {
        lines: [
            'aaaa',
            'test',
        ],
        next: STAT.game,
    },
    miko: {
        lines: [
            'aaaa',
            'test',
        ],
        next: STAT.select,
    },
    maid: {
        lines: [
            'aaaa',
            'test',
        ],
        next: STAT.select,
    },
    bikini: {
        lines: [
            'aaaa',
            'test',
        ],
        next: STAT.select,
    },
    wasureta: {
        lines: [
            'aaaa',
            'test',
        ],
        next: STAT.select,
    },
    sarashi: {
        lines: [
            'aaaa',
            'test',
        ],
        next: STAT.select,
    },
    outro: {
        lines: [
            'aaaa',
            'test',
        ],
        next: STAT.init,
    },
}

export default words;
