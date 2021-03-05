class RamaMain {
    constructor(width, height, levo, pravo) {
        this.w = +width;
        this.h = +height;
        this.l = +levo;
        this.r = +pravo;
        this.mid = 0;
    }
    get square() {
        return this.w * this.h;
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
        let info = "class: RamaMain\n";
        info += `S = ${this.square/1e6} м.кв\n`;
        info += `Width=${this.w}\nHeight = ${this.h}мм\n`;
        if (this.l) info += `LeftImpost = ${this.l}мм\n`;
        if (this.r) info += `RightImpost=${this.r}мм\n`;
        if (this.mid) info += `Middle=${this.mid}мм\n`;
        return info
    }

    check() { alert(this.size) }
}
let test = new RamaMain(1800, 1400, 1000);
// test.check();

async function valGetter() {

    let system = await document.getElementById("prof").value;
    // this.rama = await document.getElementById("butt").value;
    let rama = await count;
    let w = await document.getElementById("w").innerText;
    let h = await document.getElementById("h").innerText;
    let levo = await document.getElementById("levo").innerText;
    let pravo = await document.getElementById("pravo").innerText;

    let size = [w, h, levo, pravo];
    let cfg = [rama, system];
    console.log([size, cfg])
    return [size, cfg]
}