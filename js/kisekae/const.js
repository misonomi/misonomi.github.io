export default {
    originalx: 1920,
    originaly: 1080,
    kirakira: {
        step: .02,
        brightness: 50,
        v0: .1,
        rmin: 2,
        rvariance: 100,
    },
    shoji: {
        step: .03,
        shakeinterval: 30,
        agility: 20,
        ap: 20,
    },
    dresser: {
        step: .2,
        punirate: .1,
        width_b: 340,
        height_b: 160,
        width_t: 280,
        height_t: 140,
        miko: {
            x: 900,
            y: 100,
            color: 'rgb(255, 0, 0)',
            text: '巫女服',
        },
        maid: {
            x: 900,
            y: 500,
            color: 'rgb(0, 192, 64)',
            text: 'メイド服',
        },
        mizugi: {
            x: 1400,
            y: 500,
            color: 'rgb(64, 96, 255)',
            text: 'スクール水着',
        },
        gymsuit: {
            x: 1400,
            y: 100,
            color: 'rgb(255, 128, 0)',
            text: '体操服',
        },
        sarashi: {
            x: 1150,
            y: 300,
            color: 'rgb(255, 255, 0)',
            text: 'トランクス',
        },
    },
    tablet: {
        standardy: 280,
        intervaly: 200,
        width: 30,
        height: 30,
        ap: 2,//8,
        intervalt: 30,
        agility: 30,
    },
    inst: {
        marginx: 130,
        v0: 1.0,
        k: .002,
    },
    sight: {
        x: 200,
        y: 400,
        timelimit: 500,
        extratimelimit: 2000,
        radius: 500,
        linew: 12,
        margin: .07,
        textmargin_tl: 30,
        textmargin_ap: 80,
        readystep: .03,
    },
    conscience: {
        width: 200,
        height: 300,
        blur: 30,
        step0: .05,
        step1: .05,
        basemargin: 10,
        charmargin: 80,
    },
    break: {
        height: 400,
        startstep: .03,
        pause: 100,
        endstep: .02,
    },
    logo: {
        x: 1300,
        y: 100,
    },
    cts: {
        y: 700,
        alpha_min: .3,
        alpha_step: .005,
    },
    tfp: {
        y: 700,
        alpha_min: .3,
        alpha_step: .005,
    },
    fukidashi: {
        width: 1600,
        height: 200,
        y: 800,
        margin: 50,
        intervalt: 12,
        textheight: 60,
        bubble: {
            xmin: 0,
            step: .5,
            generate_rate: .1,
            radius_min: 2,
            radius_variance: 30,
        }
    },
    shock: {
        radius: 300,
        step: .1,
        splash: {
            nmin: 10,
            nvariance: 20,
            rmin: 10,
            rvariance: 50,
        }
    },
    casko: {
        x: 0,
        y: 0, 
        dodged_x: -400,
        dodge_step: 20,
    },
    cg: {
        wait: 1000,
        mistiness: 1000,
        miko: {
            pan: [
                {
                    startx: -1200,
                    starty: -1000,
                    stepx: 1,
                    stepy: 1,
                    duration: 200,
                },
                {
                    startx: -200,
                    starty: -200,
                    stepx: -1,
                    stepy: 1,
                    duration: 200,
                },
            ]
        },
        maid: {
            pan: [
                {
                    startx: -1200,
                    starty: -1000,
                    stepx: 1,
                    stepy: 1,
                    duration: 200,
                },
                {
                    startx: -200,
                    starty: -200,
                    stepx: -1,
                    stepy: 1,
                    duration: 200,
                },
            ]
        },
        mizugi: {
            pan: [
                {
                    startx: -1200,
                    starty: -1000,
                    stepx: 1,
                    stepy: 1,
                    duration: 200,
                },
                {
                    startx: -200,
                    starty: -200,
                    stepx: -1,
                    stepy: 1,
                    duration: 200,
                },
            ]
        },
        gymsuit: {
            pan: [
                {
                    startx: -1200,
                    starty: -1000,
                    stepx: 1,
                    stepy: 1,
                    duration: 200,
                },
                {
                    startx: -200,
                    starty: -200,
                    stepx: -1,
                    stepy: 1,
                    duration: 200,
                },
            ]
        },
        sarashi: {
            pan: [
                {
                    startx: -1200,
                    starty: -1000,
                    stepx: 1,
                    stepy: 1,
                    duration: 200,
                },
                {
                    startx: -200,
                    starty: -200,
                    stepx: -1,
                    stepy: 1,
                    duration: 200,
                },
            ]
        },
    }
}
