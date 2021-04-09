// ! вроде заработало, 
//! сделать вывод и проверить размеры


//!-----------------Основной класс WIN()--------------------------!//
class Win {
    constructor() {
        this.wintype = document.getElementById('fon').getAttribute("wintype");

        //* dr - дельта рама, di - дельта импост, dsi - дельта импост-створка, drs - дельта рама-створка
        [this.dr, this.di, this.dsi, this.drs] = Delta[document.getElementById('prof').value].dsize;
        this.winsizes = [];
    }
    get inpsizes() {
        // console.log("Evaluate sizes");
        // let win = this.delta;
        let sizemap = new Map();
        let dsizes = document.getElementsByClassName("size");
        for (const size of dsizes) {
            if (Rama[this.wintype].includes(size.id)) sizemap.set(`${size.id}`, `${+size.value}`);
        };
        return Object.fromEntries(sizemap)
    }

    //! вычисляем поправки к размерам, задаем используемые размеры, чтоб просто так их не гонять
    get delta() {
        let idSize = this.inpsizes;
        // console.log(`Evaluate select`);
        let s1fix = document.getElementById('s1').dataset.isfix;
        let s2fix = document.getElementById('s2').dataset.isfix;
        let s3fix = document.getElementById('s3').dataset.isfix;
        let sdfix = document.getElementById('sd').dataset.isfix;

        switch (this.wintype) {
            case "f":
                this.winsizes = {
                    wl: (s1fix == "0") ? idSize.w - 2 * this.dr : idSize.w - 2 * this.drs,
                    hl: (s1fix == "0") ? idSize.h - 2 * this.dr : idSize.h - 2 * this.drs,
                };
                this.winsizes.H = [this.winsizes.hl];
                this.winsizes.W = [this.winsizes.wl];
                break;

            case "ff":
                this.winsizes = {
                    wl: (s1fix == "0") ? idSize.levo - Math.floor(this.di + this.dr) : idSize.levo - Math.floor(this.dsi + this.drs),
                    hl: (s1fix == "0") ? idSize.h - 2 * this.dr : idSize.h - 2 * this.drs,
                    wr: (s2fix == "0") ? idSize.w - idSize.levo - Math.floor(this.di + this.dr) : idSize.w - idSize.levo - Math.floor(this.dsi + this.drs),
                    hr: (s2fix == "0") ? idSize.h - 2 * this.dr : idSize.h - 2 * this.drs,
                };
                this.winsizes.H = [this.winsizes.hl, this.winsizes.hr];
                this.winsizes.W = [this.winsizes.wl, this.winsizes.wr];
                break;

            case "fff":

                this.winsizes = {
                    hl: (s1fix == "0") ? idSize.h - 2 * this.dr : idSize.h - 2 * this.drs,
                    hm: (s2fix == "0") ? idSize.h - 2 * this.dr : idSize.h - 2 * this.drs,
                    hr: (s3fix == "0") ? idSize.h - 2 * this.dr : idSize.h - 2 * this.drs,
                    wl: (s1fix == "0") ? idSize.levo - Math.floor(this.di + this.dr) : idSize.levo - Math.floor(this.dsi + this.drs),
                    wm: (s2fix == "0") ? idSize.w - idSize.pravo - idSize.levo - 2 * this.di : idSize.w - idSize.pravo - idSize.levo - 2 * this.dsi,
                    wr: (s3fix == "0") ? idSize.pravo - Math.floor(this.di + this.dr) : idSize.pravo - Math.floor(this.dsi + this.drs),

                };
                this.winsizes.H = [this.winsizes.hl, this.winsizes.hm, this.winsizes.hr];
                this.winsizes.W = [this.winsizes.wl, this.winsizes.wm, this.winsizes.wr];
                break;
            case "d-f":
                this.winsizes = {
                    wd: (sdfix == "0") ? idSize.w - 2 * this.dr : idSize.w - 2 * this.drs,
                    hd: (sdfix == "0") ? idSize.h - 2 * this.dr : idSize.h - idSize.himp - Math.floor(this.dsi + this.drs),
                    wr: (s3fix == "0") ? idSize.pravo - 2 * this.dr : idSize.pravo - 2 * this.drs,
                    hr: (s3fix == "0") ? idSize.hpr - 2 * this.dr : idSize.hpr - 2 * this.drs,
                };
                this.winsizes.H = [this.winsizes.hd, this.winsizes.hr];
                this.winsizes.W = [this.winsizes.wd, this.winsizes.wr];
                break;
            case "d-ff":
                this.winsizes = {
                    wd: (sdfix == "0") ? idSize.w - 2 * this.dr : idSize.w - 2 * this.drs,
                    hd: (sdfix == "0") ? idSize.h - 2 * this.dr : idSize.h - idSize.himp - Math.floor(this.dsi + this.drs),
                    wl: (s1fix == "0") ? idSize.levo - idSize.pravo - Math.floor(this.dr + this.di) : idSize.levo - idSize.pravo - Math.floor(this.drs + this.dsi),
                    hl: (s1fix == "0") ? idSize.hpr - 2 * this.dr : idSize.hpr - 2 * this.drs,
                    wr: (s2fix == "0") ? idSize.pravo - Math.floor(this.di + this.dr) : idSize.pravo - Math.floor(this.dsi + this.drs),
                    hr: (s2fix == "0") ? idSize.hpr - 2 * this.dr : idSize.hpr - 2 * this.drs,

                };
                this.winsizes.H = [this.winsizes.hd, this.winsizes.hl, this.winsizes.hr];
                this.winsizes.W = [this.winsizes.wd, this.winsizes.wl, this.winsizes.wr];
                break;
            case "f-d-f":
                this.winsizes = {
                    wd: (sdfix == "0") ? idSize.w - 2 * this.dr : idSize.w - 2 * this.drs,
                    hd: (sdfix == "0") ? idSize.h - 2 * this.dr : idSize.h - idSize.himp - Math.floor(this.dsi + this.drs),
                    wl: (s1fix == "0") ? idSize.levo - 2 * this.dr : idSize.levo - 2 * this.drs,
                    hl: (s1fix == "0") ? idSize.hlv - 2 * this.dr : idSize.hlv - 2 * this.drs,
                    wr: (s3fix == "0") ? idSize.pravo - 2 * this.dr : idSize.pravo - 2 * this.drs,
                    hr: (s3fix == "0") ? idSize.hpr - 2 * this.dr : idSize.hpr - 2 * this.drs,
                };
                this.winsizes.H = [this.winsizes.hl, this.winsizes.hd, this.winsizes.hr];
                this.winsizes.W = [this.winsizes.wl, this.winsizes.wd, this.winsizes.wr];
                break;

            default:
                console.log("wintype failed ===> " + this.wintype);
                break;
        };

        return [this.winsizes.H, this.winsizes.W]

    }
};

//!----------<<<-----------Расширяющий GetGlass ------------->>>-------------//
//! @GG = GetGlass
class GG extends Win {
    constructor() {
            super();
            // this.winsizes;
            this.glassize
        }
        //! вычисляем размеры стекол
    get ccsize() {
        let idSize = this.inpsizes;
        let sdelta = this.delta;
        let sys = document.getElementById('prof').value;
        let ztype = document.getElementById('ztype').innerText;
        let dep = document.getElementById('gdepth').value;
        let dzh, dzw;
        let ud = Delta[sys].dpt;
        // let glmap = {};
        let dz = (ztype == "Rollite") ? Delta[sys]["rd" + dep] : Delta[sys].idpt;
        [dzw, dzh] = dz;
        // this.spool.set(Object.Entries(this.sizes));
        if (!ud.includes(dep)) return alert(`В ${sys} не лезет ст/п ${dep} мм`);
        if (ztype == "Rollite" && sys == "WHS60") return alert("Жалюзи Rollite на профиль WHS60 не ставятся!");


        if (this.wintype == "f") {
            this.glassize = {
                wl: idSize.w - sdelta.dw,
                hl: idSize.h - sdelta.dh,

            };
            this.glassize.H = [this.glassize.hl];
            this.glassize.W = [this.glassize.wl];
        }
        if (this.wintype == "ff") {
            this.glassize = {
                wl: idSize.levo - sdelta.dwl,
                hl: idSize.h - sdelta.dhl,
                wr: idSize.w - idSize.levo - sdelta.dwr,
                hr: idSize.h - sdelta.dhr,

            };
            this.glassize.H = [this.glassize.hl, this.glassize.hr];
            this.glassize.W = [this.glassize.wl, this.glassize.wr];
        }
        if (this.wintype == "fff") {
            this.glassize = {
                hl: idSize.h - sdelta.dhl,
                hm: idSize.h - sdelta.dhm,
                hr: idSize.h - sdelta.dhr,
                wl: idSize.levo - sdelta.dwl,
                wm: idSize.w - idSize.pravo - idSize.levo - sdelta.dwm,
                wr: idSize.pravo - sdelta.dwr,
            };
            this.glassize.H = [this.glassize.hl, this.glassize.hm, this.glassize.hr];
            this.glassize.W = [this.glassize.wl, this.glassize.wm, this.glassize.wr];
        };
        if (this.wintype == "d-f") {
            this.glassize = {
                wd: idSize.w - sdelta.dwd,
                hd: (document.getElementById('sd').dataset.isfix == "1") ? idSize.h - sdelta.dhd - idSize.himp : idSize.h - sdelta.dhd,
                wr: idSize.pravo - sdelta.dwr,
                hr: idSize.hpr - sdelta.dhr,

            };
            this.glassize.H = [this.glassize.hd, this.glassize.hr];
            this.glassize.W = [this.glassize.wd, this.glassize.wr];
        };
        if (this.wintype == "d-ff") {
            this.glassize = {
                hd: (document.getElementById('sd').dataset.isfix == "1") ? idSize.h - idSize.himp - sdelta.dhd : idSize.h - sdelta.dhd,
                hl: idSize.hpr - sdelta.dhl,
                hr: idSize.hpr - sdelta.dhr,
                wd: idSize.w - sdelta.dwd,
                wl: idSize.levo - idSize.pravo - sdelta.dwl,
                wr: idSize.pravo - sdelta.dwr,

            };
            this.glassize.H = [this.glassize.hd, this.glassize.hl, this.glassize.hr];
            this.glassize.W = [this.glassize.wd, this.glassize.wl, this.glassize.wr];
        }
        if (this.wintype == "f-d-f") {
            this.glassize = {
                wd: idSize.w - sdelta.dwd,
                hd: (document.getElementById('sd').dataset.isfix == "1") ? idSize.h - idSize.himp - sdelta.dhd : idSize.h - sdelta.dhd,
                wr: idSize.pravo - sdelta.dwr,
                hr: idSize.hpr - sdelta.dhr,
                wl: idSize.levo - sdelta.dwl,
                hl: idSize.hlv - sdelta.dhl,

            };
            this.glassize.H = [this.glassize.hl, this.glassize.hd, this.glassize.hr];
            this.glassize.W = [this.glassize.wl, this.glassize.wd, this.glassize.wr];
        };

        console.log(`Harray[${this.glassize.H}]`);
        console.log(`Warray[${this.glassize.W}]`);
        return this.glassize
    }
}
//!----------<<<-----------ZZZ делает финальный рассчет ------------->>>-------------//

class ZZZ extends Win {
    constructor() {
        super();
        // this.ccsize;
        this.winsizes;
    }

    //! вычисляем размеры жалюзев
    get zs() {
        let sys = document.getElementById('prof').value;
        let ztype = document.getElementById('ztype').innerText;
        let dep = document.getElementById('gdepth').value;
        let dh, dw;
        let ud = Delta[sys].dpt;

        let dz = (ztype == "Rollite") ? Delta[sys]["rd" + dep] : Delta[sys].idpt;
        [dw, dh] = dz;

        if (!ud.includes(dep)) return alert(`В ${sys} не лезет ст/п ${dep} мм`);
        if (ztype == "Rollite" && sys == "WHS60") return alert("Жалюзи Rollite на профиль WHS60 не ставятся!");
        let zh = this.delta[0].map(value => value - dh);
        let zw = this.delta[1].map(value => value - dw);
        let resultArr = [];
        // console.log(`Жалюзи h[${zh}]`);
        // console.log(`Жалюзи w[${zw}]`);
        for (let i = 0; i < zh.length; i++) {
            resultArr.push([zh[i], zw[i]])
        };
        return resultArr
    }

}

let set = new Set();

function isSame(system) {
    set.add(system);
    let text = `<div>${system}</div>`;
    if (set.has(system)) return "";
    return text;
    `<div>${system}</div>`
};



class Outputer {
    constructor() {
        this.ztype = document.getElementById('ztype').innerText;
        this.zcolor = document.getElementById('zlist').value;
        this.zgrp = document.getElementById('zgrp').innerText;
    }


    toDiv(array) {
        let sys = document.getElementById('prof').value;
        let div = document.createElement('div');
        let stuff = "";
        div.classList.add('cls-out');
        // div.setAttribute("data-prev-system", sys);
        div.id = "cls-out"

        stuff += isSame(sys);
        stuff += `<div>${this.zcolor} (<b>${this.zgrp}</b>)</div>`;
        // stuff += `<div>`
        for (let line of array) {
            stuff += `<div> ${line[1]} || ${line[0]}</div>`
        };
        // stuff += `</div>`
        div.innerHTML = stuff;
        document.getElementById('outside').append(div);
        return
    }

}

function run() {

    let zz = new ZZZ().zs;
    let out = new Outputer();

    // let inputs = zz.sizes;
    return out.toDiv(zz)
}