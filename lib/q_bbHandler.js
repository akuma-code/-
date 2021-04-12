// ! вроде заработало, 
//! сделать вывод и проверить размеры


//!-----------------Основной класс WIN()--------------------------!//
class Win {
    constructor() {
        this.wintype = document.getElementById('fon').getAttribute("wintype");

        //! dr - дельта рама, di - дельта импост, dsi - дельта импост-створка, drs - дельта рама-створка
        [this.dr, this.di, this.dsi, this.drs] = Delta[document.getElementById('prof').value].dsize;
    }
    get sizes() {
        let sizemap = new Map();
        let dsizes = document.getElementsByClassName("size");
        for (const size of dsizes) {
            if (Rama.use[this.wintype].includes(size.id)) sizemap.set(`${size.id}`, `${+size.value}`);
        };
        return Object.fromEntries(sizemap)
    }

    //! вычисляем поправки к размерам, задаем используемые размеры, чтоб просто так их не гонять
    get delta() {
        let result = {};
        let isfixs1 = document.getElementById('s1').dataset.isfix;
        let isfixs2 = document.getElementById('s2').dataset.isfix;
        let isfixs3 = document.getElementById('s3').dataset.isfix;
        let isfixsd = document.getElementById('sd').dataset.isfix;

        switch (this.wintype) {
            case "f":
                result = {
                    wintype: this.wintype,
                    use: ["h", "w"],
                    dw: (isfixs1 == "0") ? 2 * this.dr : 2 * this.drs,
                    dh: (isfixs1 == "0") ? 2 * this.dr : 2 * this.drs,

                };
                break;

            case "ff":
                result = {
                    wintype: this.wintype,
                    use: ["h", "w", "levo"],
                    dwl: (isfixs1 == "0") ? Math.floor(this.di + this.dr) : Math.floor(this.dsi + this.drs),
                    dhl: (isfixs1 == "0") ? 2 * this.dr : 2 * this.drs,
                    dwr: (isfixs2 == "0") ? Math.floor(this.di + this.dr) : Math.floor(this.dsi + this.drs),
                    dhr: (isfixs2 == "0") ? 2 * this.dr : 2 * this.drs,
                };
                break;

            case "fff":
                result = {
                    wintype: this.wintype,
                    use: ["h", "w", "levo", "pravo"],
                    dwl: (isfixs1 == "0") ? Math.floor(this.di + this.dr) : Math.floor(this.dsi + this.drs),
                    dhl: (isfixs1 == "0") ? 2 * this.dr : 2 * this.drs,
                    dwm: (isfixs2 == "0") ? 2 * this.di : 2 * this.dsi,
                    dhm: (isfixs2 == "0") ? 2 * this.dr : 2 * this.drs,
                    dwr: (isfixs3 == "0") ? Math.floor(this.di + this.dr) : Math.floor(this.dsi + this.drs),
                    dhr: (isfixs3 == "0") ? 2 * this.dr : 2 * this.drs,
                };
                break;
            case "df":
                result = {
                    wintype: this.wintype,
                    use: ["h", "w", "hpr", "pravo", "himp"],
                    dwd: (isfixsd == "0") ? 2 * this.dr : 2 * this.drs,
                    dhd: (isfixsd == "0") ? 2 * this.dr : Math.floor(this.dsi + this.drs),
                    dwr: (isfixs3 == "0") ? 2 * this.dr : 2 * this.drs,
                    dhr: (isfixs3 == "0") ? 2 * this.dr : 2 * this.drs,
                };
                break;
            case "dff":
                result = {
                    wintype: this.wintype,
                    use: ["h", "w", "levo", "pravo", "hpr", "himp"],
                    dwd: (isfixsd == "0") ? 2 * this.dr : 2 * this.drs,
                    dhd: (isfixsd == "0") ? 2 * this.dr : Math.floor(this.dsi + this.drs),
                    dwl: (isfixs1 == "0") ? 2 * this.di : 2 * this.dsi,
                    dhl: (isfixs1 == "0") ? 2 * this.dr : 2 * this.drs,
                    dwr: (isfixs2 == "0") ? Math.floor(this.di + this.dr) : Math.floor(this.dsi + this.drs),
                    dhr: (isfixs2 == "0") ? 2 * this.dr : 2 * this.drs,
                };
                break;
            case "fdf":
                result = {
                    wintype: this.wintype,
                    use: ["h", "w", "levo", "pravo", "himp", "hlv", "hpr"],
                    dwd: (isfixsd == "0") ? 2 * this.dr : 2 * this.drs,
                    dhd: (isfixsd == "0") ? 2 * this.dr : Math.floor(this.dsi + this.drs),
                    dwl: (isfixs1 == "0") ? 2 * this.dr : 2 * this.drs,
                    dhl: (isfixs1 == "0") ? 2 * this.dr : 2 * this.drs,
                    dwr: (isfixs3 == "0") ? 2 * this.dr : 2 * this.drs,
                    dhr: (isfixs3 == "0") ? 2 * this.dr : 2 * this.drs,
                };
                break;

            default:
                console.log("wintype failed ===> " + this.wintype);
                break;
        };

        return result

    }
};

//!----------<<<-----------Расширяющий GetGlass ------------->>>-------------//
//! @GG = GetGlass
class GG extends Win {
    constructor() {
            super();
            this.pool;
        }
        //! вычисляем размеры стекол
    get ccsize() {
        let idSize = this.sizes;
        let sdelta = this.delta;
        let sys = document.getElementById('prof').value;
        let ztype = document.getElementById('ztype').innerText;
        let dep = document.getElementById('gdepth').value;
        let dzh, dzw;
        let ud = Delta[sys].dpt;
        // let glmap = {};
        let dz = (ztype == "Rollite") ? Delta[sys]["rd" + dep] : Delta[sys].idpt;
        [dzw, dzh] = dz;
        let isfixsd = document.getElementById('sd').dataset.isfix;
        // this.spool.set(Object.Entries(this.sizes));
        if (!ud.includes(dep)) return alert(`В ${sys} не лезет ст/п ${dep} мм`);
        if (ztype == "Rollite" && sys == "WHS60") return alert("Жалюзи Rollite на профиль WHS60 не ставятся!");


        if (this.wintype == "f") {
            this.pool = {
                wl: idSize.w - sdelta.dw,
                hl: idSize.h - sdelta.dh,
            };
            this.pool.HW = [
                [this.pool.hl],
                [this.pool.wl],
            ]
        }
        if (this.wintype == "ff") {
            this.pool = {
                wl: idSize.levo - sdelta.dwl,
                hl: idSize.h - sdelta.dhl,
                wr: idSize.w - idSize.levo - sdelta.dwr,
                hr: idSize.h - sdelta.dhr,

            };
            this.pool.HW = [
                [this.pool.hl, this.pool.hr],
                [this.pool.wl, this.pool.wr],
            ]
        };
        if (this.wintype == "fff") {
            this.pool = {
                hl: idSize.h - sdelta.dhl,
                hm: idSize.h - sdelta.dhm,
                hr: idSize.h - sdelta.dhr,
                wl: idSize.levo - sdelta.dwl,
                wm: idSize.w - idSize.pravo - idSize.levo - sdelta.dwm,
                wr: idSize.pravo - sdelta.dwr,
            };
            this.pool.HW = [
                [this.pool.hl, this.pool.hm, this.pool.hr],
                [this.pool.wl, this.pool.wm, this.pool.wr],
            ]
        };
        if (this.wintype == "df") {
            this.pool = {
                wd: idSize.w - sdelta.dwd,
                hd: (isfixsd == "1") ? idSize.h - sdelta.dhd - idSize.himp : idSize.h - sdelta.dhd,
                wr: idSize.pravo - sdelta.dwr,
                hr: idSize.hpr - sdelta.dhr,

            };
            this.pool.HW = [
                [this.pool.hd, this.pool.hr],
                [this.pool.wd, this.pool.wr],
            ]
        };
        if (this.wintype == "dff") {
            this.pool = {
                hd: (isfixsd == "1") ? idSize.h - idSize.himp - sdelta.dhd : idSize.h - sdelta.dhd,
                hl: idSize.hpr - sdelta.dhl,
                hr: idSize.hpr - sdelta.dhr,
                wd: idSize.w - sdelta.dwd,
                wl: idSize.levo - idSize.pravo - sdelta.dwl,
                wr: idSize.pravo - sdelta.dwr,

            };
            this.pool.HW = [
                [this.pool.hd, this.pool.hl, this.pool.hr],
                [this.pool.wd, this.pool.wl, this.pool.wr],
            ]
        }
        if (this.wintype == "fdf") {
            this.pool = {
                wd: idSize.w - sdelta.dwd,
                hd: (isfixsd == "1") ? idSize.h - idSize.himp - sdelta.dhd : idSize.h - sdelta.dhd,
                wr: idSize.pravo - sdelta.dwr,
                hr: idSize.hpr - sdelta.dhr,
                wl: idSize.levo - sdelta.dwl,
                hl: idSize.hlv - sdelta.dhl,

            };
            this.pool.HW = [
                [this.pool.hl, this.pool.hd, this.pool.hr],
                [this.pool.wl, this.pool.wd, this.pool.wr],
            ]
        };

        console.log(`HWarrays[${this.pool.HW}]`);

        console.log(this.pool);

        return this.pool.HW
    }
}
//!----------<<<-----------ZZZ делает финальный рассчет ------------->>>-------------//

class ZZZ extends GG {
    constructor() {
        super();
        this.ccsize;
    }

    //! вычисляем размеры жалюзев
    get zs() {
        let sys = document.getElementById('prof').value;
        let ztype = document.getElementById('ztype').innerText;
        let dep = document.getElementById('gdepth').value;
        let dh, dw;
        let ud = Delta[sys].dpt;
        let pool = this.pool.HW;

        let dz = (ztype == "Rollite") ? Delta[sys]["rd" + dep] : Delta[sys].idpt;
        [dw, dh] = dz;
        if (!ud.includes(dep)) return alert(`В ${sys} не лезет ст/п ${dep} мм`);
        if (ztype == "Rollite" && sys == "WHS60") return alert("Жалюзи Rollite на профиль WHS60 не ставятся!");
        let zh = pool[0].map(value => value - dh); //! дельта h
        let zw = pool[1].map(value => value - dw); //! дельта w
        let result = [];
        // console.log(`Жалюзи h[${zh}]`);
        // console.log(`Жалюзи w[${zw}]`);
        for (let i = 0; i < zh.length; i++) {
            result.push([zw[i], zh[i]])
        };
        console.log({ result });
        return result
    }

}

class Outputer {
    constructor() {
        this.sys = document.getElementById('prof').value;
        this.ztype = document.getElementById('ztype').innerText;
        this.zcolor = document.getElementById('zlist').value;
        this.zgrp = document.getElementById('zgrp').innerText;
    }


    toDiv(array) {
        let div = document.createElement('div');
        let stuff = "";
        div.classList.add('cls-out');
        // div.setAttribute('data-zzcount', )
        stuff += `<div class='sys-line'>${this.sys}</div>`;
        stuff += `<div class='color-line'>${this.zcolor} (<b>гр. ${this.zgrp}</b>)</div>`;
        // stuff += `<div>`
        for (let line of array) {
            stuff += `<div class='size-line'> ${line[0]} x ${line[1]}</div>`
        };
        // stuff += `</div>`
        div.innerHTML = stuff;
        document.getElementById('outside').append(div);
        return
    }

}

function run() {

    let zz = new ZZZ();
    let out = new Outputer();

    // let inputs = zz.sizes;
    let zzresult = zz.zs;
    return out.toDiv(zzresult)
}

function createRama(type, system) {
    let isfix_s1 = (document.getElementById('s1').dataset.isfix == '1') ? true : false;
    let isfix_s2 = (document.getElementById('s2').dataset.isfix == '1') ? true : false;
    let isfix_s3 = (document.getElementById('s3').dataset.isfix == '1') ? true : false;
    let isfix_sd = (document.getElementById('sd').dataset.isfix == '1') ? true : false;
    let [dr, di, dsi, drs, ] = Delta[system].dsize;
    // console.log(Delta[system].dsize);

    const gl_type0 = {
        top: (!isfix_s1) ? dr : drs,
        bottom: (!isfix_s1) ? dr : drs,
        left: (!isfix_s1) ? dr : drs,
        right: (!isfix_s1) ? dr : drs,
    };
    const gl_typeS1 = {
        top: (!isfix_s1) ? dr : drs,
        bottom: (!isfix_s1) ? dr : drs,
        left: (!isfix_s1) ? dr : drs,
        right: (!isfix_s1) ? di : dsi,
    };
    const gl_typeS2 = {

        top: (!isfix_s2) ? dr : drs,
        bottom: (!isfix_s2) ? dr : drs,
        left: (!isfix_s2) ? di : dsi,
        right: (!isfix_s2) ? di : dsi,
    };
    const gl_typeS3 = {
        top: (!isfix_s3) ? dr : drs,
        bottom: (!isfix_s3) ? dr : drs,
        right: (!isfix_s3) ? dr : drs,
        left: (!isfix_s3) ? di : dsi,
    };
    const gl_typeDS1 = {
        top: (!isfix_s1) ? dr : drs,
        bottom: (!isfix_s1) ? dr : drs,
        left: (!isfix_s1) ? dr : drs,
        right: (!isfix_s1) ? dr : drs,
    };
    const gl_typeDS2 = {
        top: (!isfix_s2) ? dr : drs,
        bottom: (!isfix_s2) ? dr : drs,
        left: (!isfix_s2) ? dr : drs,
        right: (!isfix_s2) ? dr : drs,
    };
    const gl_typeDS3 = {
        top: (!isfix_s3) ? dr : drs,
        bottom: (!isfix_s3) ? dr : drs,
        left: (!isfix_s3) ? dr : drs,
        right: (!isfix_s3) ? dr : drs,
    };
    const gl_typeSD = {
        top: drs,
        bottom: (!isfix_sd) ? drs : dsi,
        right: drs,
        left: drs,
    };

    function size() {
        let uisizes = document.getElementsByClassName('size');
        let win = document.getElementById('fon').getAttribute('wintype');
        let sizemap = new Map();
        for (const size of uisizes) {
            if (Rama.use[win].includes(size.id)) {
                sizemap.set(`${size.id}`, `${+size.value}`);
            };

        };
        return Object.fromEntries(sizemap)
    };

    let calced_sizes = {
        f: (WL = gl_type0) => {
            let result_sizes = [
                size().h - WL.top - WL.bottom,
                size().w - WL.left - WL.right
            ];

            return result_sizes
        },
        ff: (left = gl_typeS1, right = gl_typeS2) => {
            let larr = [];
            let rarr = [];
            for (let key in left) {
                larr.push(left[key])
            };
            for (let key in right) {
                rarr.push(right[key])
            };
            let result_sizes = [
                [
                    size().h - left.top - left.bottom,
                    size().levo - left.left - left.right,
                ],
                [
                    size().h - rarr[0] - rarr[1],
                    size().w - size().levo - rarr[2] - rarr[3],
                ],
            ];
            return result_sizes

        },
        fff: (left = gl_typeS1, mid = gl_typeS2, right = gl_typeS3) => {
            let larr = [];
            let rarr = [];
            let marr = [];
            for (let key in left) {
                larr.push(left[key])
            };
            for (let key in right) {
                rarr.push(right[key])
            };
            for (let key in mid) {
                marr.push(mid[key])
            };
            let result_sizes = [
                [
                    size().h - larr[0] - larr[1],
                    size().levo - left.left - left.right,
                ],
                [
                    size().h - marr[0] - marr[1],
                    size().w - size().levo - size().pravo - marr[2] - marr[3],
                ],
                [
                    size().h - rarr[0] - rarr[1],
                    size().pravo - rarr[2] - rarr[3],
                ],
            ];
            return result_sizes
        },
        df: (left = gl_typeSD, right = gl_typeDS2) => {
            let larr = [];
            let rarr = [];
            for (let key in left) {
                larr.push(left[key])
            };
            for (let key in right) {
                rarr.push(right[key])
            };
            let result_sizes = [
                [
                    larr[0] + larr[1],
                    larr[2] + larr[3],
                ],
                [
                    rarr[0] + rarr[1],
                    rarr[2] + rarr[3],
                ],
            ];
            return result_sizes
        },
        dff: (left = gl_typeSD, mid = gl_typeS1, right = gl_typeS2) => {
            let larr = [];
            let rarr = [];
            let marr = [];
            for (let key in left) {
                larr.push(left[key])
            };
            for (let key in right) {
                rarr.push(right[key])
            };
            for (let key in mid) {
                marr.push(mid[key])
            };
            let result_sizes = [
                [
                    larr[0] + larr[1],
                    larr[2] + larr[3],
                ],
                [
                    marr[0] + marr[1],
                    marr[2] + marr[3],
                ],
                [
                    rarr[0] + rarr[1],
                    rarr[2] + rarr[3],
                ],
            ];
            return result_sizes
        },
        fdf: (left = gl_typeDS1, mid = gl_typeSD, right = gl_typeDS3) => {
            let larr = [];
            let rarr = [];
            let marr = [];
            for (let key in left) {
                larr.push(left[key])
            };
            for (let key in right) {
                rarr.push(right[key])
            };
            for (let key in mid) {
                marr.push(mid[key])
            };
            let result_sizes = [
                [
                    larr[0] + larr[1],
                    larr[2] + larr[3],
                ],
                [
                    marr[0] + marr[1],
                    marr[2] + marr[3],
                ],
                [
                    rarr[0] + rarr[1],
                    rarr[2] + rarr[3],
                ],
            ];
            return result_sizes
        },
    }

    return calced_sizes[type]();
};

function runfunc() {
    let type = document.getElementById('fon').getAttribute("wintype");
    let sys = document.getElementById('prof').value;

    let cb = createRama(type, sys);
    let uisizes = document.getElementsByClassName('size');
    let currentarray = [];
    let currentsizes = () => {
        let sizemap = new Map();
        for (const size of uisizes) {
            if (Rama.use[type].includes(size.id)) {
                sizemap.set(`${size.id}`, `${+size.value}`);
                currentarray.push(size.value)
            };

        };
        return Object.fromEntries(sizemap)
    };
    currentsizes();

    return cb
};

function globalsize() {
    let uisizes = document.getElementsByClassName('size');
    let win = document.getElementById('fon').getAttribute('wintype');
    let sizemap = new Map();
    for (const size of uisizes) {
        if (Rama.use[win].includes(size.id)) {
            sizemap.set(`${size.id}`, `${+size.value}`);

        };

    };
    return Object.fromEntries(sizemap)
};