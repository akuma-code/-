
class Calcmin { //расчитывает округленные размеры
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
        return `    ${this.w} x ${this.h}   `
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




