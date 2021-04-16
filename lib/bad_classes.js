class RamaMain {
    constructor(width, height, levo = 0, pravo = 0) {
        this.w = +width;
        this.h = +height;
        this.l = +levo;
        this.r = +pravo;
        this.mid = 0;
    }
    get square() {
        return (this.w * this.h) / 1e6;
    }

    get mid() {
        return this._mid
    }
    set mid(value) {
        if (this.l && this.r) value = this.w - this.l - this.r;

        if (!this.r) value = this.w - this.l;

        if (!this.l) value = 0;

        this._mid = value;
    }

    get size() {
        let info = `class: ${this.name}\n`;
        info += `S = ${this.square} м.кв\n`;
        info += `Width=${this.w}\nHeight = ${this.h}мм\n`;
        if (this.l) info += `LeftImpost = ${this.l}мм\n`;
        if (this.r) info += `RightImpost=${this.r}мм\n`;
        if (this.mid) info += `Middle=${this.mid}мм\n`;
        return info
    }

    check() { alert(this.size) }
}
let test = new RamaMain(1800, 1400, 1000);


let stp = new CalcSize()

function setcls(system) {
    return class {
        constructor(system) {


        }
    }
}


async function getvals() {

    let system = await document.getElementById("prof").value;
    // this.rama = await document.getElementById("butt").value;
    let rama = ramastep;
    let w = await document.getElementById("w").value;
    let h = await document.getElementById("h").value;
    let levo = await document.getElementById("levo").value;
    let pravo = await document.getElementById("pravo").value;


    let size = [w, h, levo, pravo];
    let cfg = [rama, system];

    console.log([size, cfg]);
    return { size, cfg }
}

class Proline extends RamaMain {
    constructor(width, height, levo, pravo, mid) {
        super(width, height, levo, pravo, mid);
    }
    glsW() {
        let wl = levo - this.dr - this.di;
        let wm = mid - this.di * 2;
        let wr = pravo - this.dr - this.di;
        return {
            wl,
            wm,
            wr
        }
    }
    dr = 48 //дельта рама
    drs = 96 // дельта рама-створка
    drs232 = 99 //дельта рама-створка.232
    di = 26.5 //дельта импост
    dis = 74.5 //дельта импост-створка
    dis = 77.5 //дельта импост-створка.232


}

class Softline extends RamaMain {
    dr = 51 //дельта рама
    drs = 102 // дельта рама-створка
    di = 26.5 //дельта импост
    dis = 77.5 //дельта импост-створка
}

class Euroline extends RamaMain {
    dr = 54 //дельта рама
    drs = 110.5 // дельта рама-створка
    di = 28 //дельта импост
    dis = 84.5 //дельта импост-створка
}

class Premium82 extends RamaMain {
    dr = 58 //дельта рама
    drs = 104 // дельта рама-створка
    di = 32 //дельта импост
    dis = 78 //дельта импост-створка
}

class BasePlus extends RamaMain {
    dr = 50 //дельта рама
    drs = 99 // дельта рама-створка
    di = 27 //дельта импост
    dis = 76 //дельта импост-створка
}

class Lux extends RamaMain {
    dr = 55 //дельта рама
    drs = 109 // дельта рама-створка
    di = 27 //дельта импост
    dis = 81 //дельта импост-створка
}

class Optima extends RamaMain {
    dr = 55 //дельта рама
    drs = 109 // дельта рама-створка
    di = 24.5 //дельта импост
    dsi = 79 //дельта импост-створка
}

class TermoPlus extends RamaMain {
    dr = 55 //дельта рама
    drs = 104 // дельта рама-створка
    di = 27 //дельта импост
    dsi = 76 //дельта импост-створка
}

class WHS72 extends RamaMain {
    dr = 45 //дельта рама
    drs = 95 // дельта рама-створка
    di = 24.5 //дельта импост
    dsi = 74.5 //дельта импост-створка
}

class WHS60 extends RamaMain {
    dr = 44 //дельта рама
    drs = 92 // дельта рама-створка
    di = 23.5 //дельта импост
    dis = 71.5 //дельта импост-створка
}
// let p = document.getElementById
// let newtest = new $ {}


class Zzcalc extends Calcbb {
    constructor() {
        super();
        this.getmap;
    }


    zs(sizepool) {
        let sys = document.getElementById('prof').value;
        let ztype = document.getElementById('ztype').innerText;
        let dep = document.getElementById('gdepth').value;
        let dh, dw;
        let ud = SizeDB[sys].dpt;
        let npool = Object.entries(sizepool);
        let zpool = new Map(Object.entries(sizepool));

        let dz = (ztype == "Rollite") ? SizeDB[sys]["rd" + dep] : SizeDB[sys].idpt;

        if (!ud.includes(dep)) return alert(`В ${sys} не лезет ст/п ${dep} мм`);
        if (ztype == "Rollite" && sys == "WHS60") return alert("Жалюзи Rollite на профиль WHS60 не ставятся!");
        [dw, dh] = dz;

        // zpool.forEach(
        //     (value, key) =>
        //     console.log(`${key} : ${value}`));
        let out = {};
        out = Object.entries(sizepool).forEach((value, key) => {
            // console.log(`${key} -> ${value}`);
            value -= (key == "Hleft" || key == "Hright" || key == "Hmid" || key == "Hdoor") ? dh : dw;
            // console.log(`${key} ---> ${value}`);
        });
        return out //! проблема с выводом вот этой вот хуйни, схуяли она андефайнед???
    }
}


function wait() {
    let win = new Win();
    let sizes = document.getElementsByClassName("size");
    let sizemap = new Map();
    for (const size of sizes) {
        if (win.select.use.includes(size.id)) sizemap.set(`${size.id}`, `${size.value}`);
    }
    // (Array.from(sizes)).map(item => item.value)
    return Object.fromEntries(sizemap)
}

function newcalc() {
    let sp = new Calcbb().getmap;
    let system = document.getElementById('prof').value;
    let rs = +document.getElementById('fon').dataset.ramaStep;
    let left, right, mid, hl, hr, hm, hd, wd;
    //*дельта рама, шмпост, импост-створка, импост-рама
    let dr, di, dsi, drs;
    let s1 = document.getElementById('s1').dataset.isfix;
    let s2 = document.getElementById('s2').dataset.isfix;
    let s3 = document.getElementById('s3').dataset.isfix;
    let s4 = document.getElementById('sd').dataset.isfix;
    [dr, di, dsi, drs] = SizeDB[system].dsize;
    console.log(`>>>Calculating<<< rs = ${rs}`);
    if (rs == 1) {
        left = (s1 == 0) ? sp.w - 2 * dr : sp.w - 2 * drs;
        hl = (s2 == 0) ? sp.h - 2 * dr : sp.h - 2 * drs;

        right = 0;
        mid = 0;
        winsize = {
            Hleft: hl,
            Wleft: left
        };

    };
    if (rs == 2) {
        left = (s1 == 0) ? Math.round(sp.levo - dr - di) : Math.round(sp.levo - drs - dsi);
        hl = (s1 == 0) ? sp.h - 2 * dr : sp.h - 2 * drs;

        right = (s2 == 0) ? Math.round(sp.w - sp.levo - dr - di) : Math.round(sp.w - sp.levo - dsi - drs);
        hr = (s2 == 0) ? sp.h - 2 * dr : sp.h - 2 * drs;
        mid = 0;
        winsize = {
            Hleft: hl,
            Wleft: left,
            Hright: hr,
            Wright: right
        };
    };

    if (rs == 3) {

        left = (s1 == 0) ? Math.round(sp.levo - dr - di) : Math.round(sp.levo - drs - dsi);
        hl = (s1 == 0) ? Math.floor(sp.h - 2 * dr) : Math.floor(sp.h - 2 * drs);

        right = (s3 == 0) ? Math.round(sp.pravo - dr - di) : Math.round(sp.pravo - drs - dsi);
        hr = (s3 == 0) ? Math.floor(sp.h - 2 * dr) : Math.floor(sp.h - 2 * drs);

        mid = (s2 == 0) ? sp.w - sp.levo - sp.pravo - di * 2 : sp.w - sp.levo - sp.pravo - dsi * 2;
        hm = (s2 == 0) ? sp.h - 2 * dr : sp.h - 2 * drs;
        winsize = {
            Hleft: hl,
            Wleft: left,
            Hright: hr,
            Wright: right,
            Hmid: hm,
            Wmid: mid,
        };

    };

    if (rs == 4) {
        wd = sp.w - 2 * drs;
        hd = (s4 == 0) ? sp.h - 2 * drs : sp.h - sp.himp - drs - dsi;

        right = (s2 == 0) ? Math.round(sp.pravo - dr - di) : Math.round(sp.pravo - drs - dsi);
        hr = (s3 == 0) ? Math.floor(sp.hpr - 2 * dr) : Math.floor(sp.hpr - 2 * drs);
        winsize = {
            Hdoor: hd,
            Wdoor: wd,
            Hright: hr,
            Wright: right,
        }

    };
    if (rs == 5) {
        wd = sp.w - 2 * drs;
        hd = (s4 == 0) ? sp.h - 2 * drs : sp.h - sp.himp - drs - dsi;

        left = (s1 == 0) ? Math.round(sp.levo - sp.pravo - dr - di) : Math.round(sp.levo - sp.pravo - drs - dsi);
        hl = (s1 == 0) ? Math.floor(sp.hpr - 2 * dr) : Math.floor(sp.hpr - 2 * drs);

        right = (s2 == 0) ? Math.round(sp.pravo - dr - di) : Math.round(sp.pravo - drs - dsi);
        hr = (s3 == 0) ? Math.floor(sp.hpr - 2 * dr) : Math.floor(sp.hpr - 2 * drs);

        winsize = {
            Hdoor: hd,
            Wdoor: wd,
            Hleft: hl,
            Wleft: left,
            Hright: hr,
            Wright: right,

        }

    };

    if (rs == 6) {
        wd = sp.w - 2 * drs;
        hd = (s4 == 0) ? sp.h - 2 * drs : Math.round(sp.h - sp.himp - drs - dsi); //

        left = (s1 == 0) ? Math.round(sp.levo - 2 * dr) : Math.round(sp.levo - 2 * dsi);
        hl = (s1 == 0) ? Math.floor(sp.hlv - 2 * dr) : Math.floor(sp.hlv - 2 * drs);

        right = (s3 == 0) ? Math.round(sp.pravo - 2 * dr) : Math.round(sp.pravo - 2 * dsi);
        hr = (s3 == 0) ? Math.floor(sp.hpr - 2 * dr) : Math.floor(sp.hpr - 2 * drs);


        winsize = {
            Hdoor: hd,
            Wdoor: wd,
            Hleft: hl,
            Wleft: left,
            Hright: hr,
            Wright: right,

        };

    };
    // showsize();
    return winsize
}

function awaitz() {

    let b = new Zzcalc();
    // console.log(a, b);

    // console.log(b.zs(newcalc()))
    b.zs(newcalc())
    return console.log(`done`);
}


class Calcbb {
    constructor(getmap) {
        this.getmap = getmap;
    }
    get getmap() {
        return this._getmap
    }
    set getmap(value) {
        let sizes = document.getElementsByClassName("size");
        let sizemap = new Map();
        for (const size of sizes) {
            // console.log(size.id);
            sizemap.set(`${size.id}`, `${size.value}`);
        }
        value = (Object.fromEntries(sizemap));
        // (Array.from(sizes)).map(item => item.value)
        return this._getmap = value
    }


}