class Calcmin { //расчитывает округленные размеры для поиска в таблице
    constructor(h, w) {
        this.h = +h;
        this.w = +w;
    }
    get h() {
        return this._h
    }

    set h(value) {
        this._h = (Math.ceil(value / 100)) / 10;

    }
    get w() {
        return this._w
    }

    set w(value) {
        this._w = (Math.ceil(value / 100)) / 10;
    }

    out() {
        return `${this.w} x ${this.h}`
    }

}

class Makediv extends Calcmin {
    constructor(text) {
        super(h, w);
        this.text = text;
    }

    create() {
        let div = document.createElement("div");
        div.style.display = "grid";
        div.classList.add("grid-cont");
        div.style.gridAutoColumns = "2, 1fr";
        div.style.gridAutoRows = "3, 1fr";
        div.style.position = "absolute";
        div.style.left = "1000px";
        div.style.top = "300px";
        div.style.backgroundColor = "red";
        div.innerHTML += this.text;
        document.body.after(div)
        return this
    }



}

class SizeCalculator {
    constructor() {
        this.rs;
        this.h;
        this.w;
        this.l;
        this.r;
    }
    get rs() {
        return this._rs
    }

    set rs(value) {
        value = +document.getElementById('fon').dataset.ramaStep;
        this._rs = value;
    }

    get w() {
        return this._w
    }

    set w(value) {
        value = document.getElementById('w').value;
        this._w = value
    }
    get l() {
        return this._l
    }

    set l(value) {
        value = document.getElementById('levo').value;
        this._l = value
    }
    get r() {
        return this._r
    }

    set r(value) {
        value = document.getElementById('pravo').value;
        this._r = value
    }
    get h() {
        return this._h
    }

    set h(value) {
        value = document.getElementById('h').value;
        this._h = value
    }

    log() {
        return console.log(`
        h: ${this.h}
        w: ${this.w}
        left: ${this.l}
        right: ${this.r}
        ramastep: ${this.rs}
        `)
    }
}