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
        info += `Width=${this.w}\nHeight=${this.h}\n`;
        if (this.l) info += `LeftImpost=${this.l}\n`;
        if (this.r) info += `RightImpost=${this.r}\n`;
        if (this.mid) info += `Middle=${this.mid}\n`;
        return info
    }

    check() { alert(this.size) }
}
let test = new RamaMain(1800, 1400);
test.check();

class Rama2p extends RamaMain {


}