function showsize() {

    for (let div of document.querySelectorAll('[data-livesize]')) {
        let id = div.dataset.livesize; //получаем h, w

        div.innerHTML = (Array.from(id.split("")).includes("H")) ? "h: " + winsize[id] : "w: " + winsize[id]; //выводим размеры
        if (div.innerHTML == "undefined") div.innerHTML = "";

    }

    return winsize

}


class Sizer {
    constructor() {
        this.h = 0;
        this.w = 0;
        this.r = 0;
        this.l = 0;
        this.m;
        // this.w - this.l - this.r;
    }

    get m() {
        return this._m
    }

    set m(value) {

    }
}