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


function setcls(name) {
    return class {
        classname() {
            alert(name)
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

    new setcls(system);
    let size = [w, h, levo, pravo];
    let cfg = [rama, system];

    console.log([size, cfg]);
    return { size, cfg }
}

class Proline extends RamaMain {
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
    dis = 79 //дельта импост-створка
}

class TermoPlus extends RamaMain {
    dr = 55 //дельта рама
    drs = 104 // дельта рама-створка
    di = 27 //дельта импост
    dis = 76 //дельта импост-створка
}

class WHS72 extends RamaMain {
    dr = 45 //дельта рама
    drs = 95 // дельта рама-створка
    di = 24.5 //дельта импост
    dis = 74.5 //дельта импост-створка
}

class WHS60 extends RamaMain {
    dr = 44 //дельта рама
    drs = 92 // дельта рама-створка
    di = 23.5 //дельта импост
    dis = 71.5 //дельта импост-створка
}
// let p = document.getElementById
// let newtest = new $ {}