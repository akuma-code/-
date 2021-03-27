function showsize() {
    let system = document.getElementById("prof").value;
    let lstv = document.getElementById("s1").style.opacity;
    let mstv = document.getElementById("s2").style.opacity;
    let rstv = document.getElementById("s3").style.opacity;
    let sizebox = document.getElementById('sizebox');
    let delta = Delta[system].dsize;
    let dr, di, dsi, drs;
    // [dr, di, dsi, drs] = delta;


    let size = {};

    for (let div of document.querySelectorAll('[data-livesize]')) {
        let id = div.dataset.livesize; //получаем h, w
        div.innerHTML = winsize[id]; //выводим размеры
    }

    return this

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