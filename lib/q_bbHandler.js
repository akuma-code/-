// ! вроде заработало, 
//! сделать вывод и проверить размеры

//!! Закончить класс Win. Он должен выдавать объект со всеми поправками. 
//? в каком виде лучше выводить... то ли объектом, то ли массивами..

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

class Collect {
    get wsize() {
        return new Calcbb().getmap
    }
    get zsize() {
        let pool = newcalc();
        return new Zzcalc().zs(pool)
    }
}

class Win {
    constructor() {
        this.wintype = document.getElementById('fon').getAttribute("wintype");
        [this.dr, this.di, this.dsi, this.drs] = Delta[document.getElementById('prof').value].dsize;
    }


    get select() {

        switch (this.wintype) {
            case "f":
                return {
                    wintype: this.wintype,
                    use: ["h", "w"],
                    dw: (document.getElementById('s1').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                    dh: (document.getElementById('s1').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,

                };
                break;

            case "ff":
                return {
                    wintype: this.wintype,
                    use: ["h", "w", "levo"],
                    dwl: (document.getElementById('s1').dataset.isfix == "0") ? this.di + this.dr : this.dsi + this.drs,
                    dhl: (document.getElementById('s1').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                    dwr: (document.getElementById('s2').dataset.isfix == "0") ? this.di + this.dr : this.dsi + this.drs,
                    dhr: (document.getElementById('s2').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                };

            case "fff":
                return {
                    wintype: this.wintype,
                    use: ["h", "w", "levo", "pravo"],
                    dwl: (document.getElementById('s1').dataset.isfix == "0") ? this.di + this.dr : this.dsi + this.drs,
                    dhl: (document.getElementById('s1').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                    dwm: (document.getElementById('s2').dataset.isfix == "0") ? 2 * this.di : 2 * this.dsi,
                    dhm: (document.getElementById('s2').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                    dwr: (document.getElementById('s3').dataset.isfix == "0") ? this.di + this.dr : this.dsi + this.drs,
                    dhr: (document.getElementById('s3').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                };
            case "d-f":
                return {
                    wintype: this.wintype,
                    use: ["h", "w", "hpr", "pravo", "himp"],
                    dwd: (document.getElementById('sd').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                    dhd: (document.getElementById('sd').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                    dwr: (document.getElementById('s3').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                    dhr: (document.getElementById('s3').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                };
            case "d-ff":
                return {
                    wintype: this.wintype,
                    use: ["h", "w", "levo", "pravo", "hpr", "himp"],
                    dwd: (document.getElementById('sd').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                    dhd: (document.getElementById('sd').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                    dwl: (document.getElementById('s1').dataset.isfix == "0") ? 2 * this.di : 2 * this.dsi,
                    dhl: (document.getElementById('s1').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                    dwr: (document.getElementById('s2').dataset.isfix == "0") ? this.di + this.dr : this.dsi + this.drs,
                    dhr: (document.getElementById('s2').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                };
            case "f-d-f":
                return {
                    wintype: this.wintype,
                    use: ["h", "w", "levo", "pravo", "himp", "hlv", "hpr"],
                    dwd: (document.getElementById('sd').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                    dhd: (document.getElementById('sd').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                    dwl: (document.getElementById('s1').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                    dhl: (document.getElementById('s1').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                    dwr: (document.getElementById('s3').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                    dhr: (document.getElementById('s3').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                };
            default:
                return console.log("wintype failed ===> " + this.wintype);
        }
    }
};




class GetGlass extends Win {
    constructor() {
        super();
        this.select
    }

    get sizes() {
        let win = this.select;
        let sizes = document.getElementsByClassName("size");
        let sizemap = new Map();
        for (const size of sizes) {
            if (win.use.includes(size.id)) sizemap.set(`${size.id}`, `${size.value}`);
        }
        return Object.fromEntries(sizemap)
    }

    get ccsize() {
        let sys = document.getElementById('prof').value;
        let ztype = document.getElementById('ztype').innerText;
        let dep = document.getElementById('gdepth').value;
        let dzh, dzw;
        let ud = Delta[sys].dpt;
        let glmap = {};
        let dz = (ztype == "Rollite") ? Delta[sys]["rd" + dep] : Delta[sys].idpt;
        [dzw, dzh] = dz;

        if (!ud.includes(dep)) return alert(`В ${sys} не лезет ст/п ${dep} мм`);
        if (ztype == "Rollite" && sys == "WHS60") return alert("Жалюзи Rollite на профиль WHS60 не ставятся!");


        if (this.wintype == "f") {
            glmap = {
                wl: this.sizes.w - this.select.dw,
                hl: this.sizes.h - this.select.dh,

            };
            glmap.H = [glmap.hl, glmap.hr];
            glmap.W = [glmap.wl, glmap.wr];
        }
        if (this.wintype == "ff") {
            glmap = {
                wl: this.sizes.levo - this.select.dwl,
                hl: this.sizes.h - this.select.dhl,
                wr: this.sizes.w - this.sizes.levo - this.select.dwr,
                hr: this.sizes.h - this.select.dhr,

            };
            glmap.H = [glmap.hl, glmap.hr];
            glmap.W = [glmap.wl, glmap.wr];
        }
        if (this.wintype == "fff") {
            glmap = {
                hl: this.sizes.h - this.select.dhl,
                hm: this.sizes.h - this.select.dhr,
                hr: this.sizes.h - this.select.dhr,
                wl: this.sizes.levo - this.select.dwl,
                wm: this.sizes.w - this.sizes.pravo - this.sizes.levo - this.select.dwr,
                wr: this.sizes.pravo - this.select.dwr,
            };
            glmap.H = [glmap.hl, glmap.hm, glmap.hr];
            glmap.W = [glmap.wl, glmap.wm, glmap.wr];
        };
        if (this.wintype == "d-f") {
            glmap = {
                wd: this.sizes.w - this.select.dwd,
                hd: this.sizes.h - this.select.dhd,
                wr: this.sizes.pravo - this.select.dwr,
                hr: this.sizes.hpr - this.select.dhr,

            };
            glmap.H = [glmap.hd, glmap.hr];
            glmap.W = [glmap.wd, glmap.wr];
        };
        if (this.wintype == "d-ff") {
            glmap = {
                wd: this.sizes.w - this.select.dwd,
                hd: this.sizes.h - this.select.dhd,
                wr: this.sizes.pravo - this.select.dwr,
                hr: this.sizes.hpr - this.select.dhr,
                wl: this.sizes.levo - this.sizes.pravo - this.select.dwl,
                hl: this.sizes.hlv - this.select.dhr,

            };
            glmap.H = [glmap.hl, glmap.hd, glmap.hr];
            glmap.W = [glmap.wl, glmap.wd, glmap.wr];
        }
        if (this.wintype == "f-d-f") {
            glmap = {
                wd: this.sizes.w - this.select.dwd,
                hd: this.sizes.h - this.select.dhd,
                wr: this.sizes.pravo - this.select.dwr,
                hr: this.sizes.hpr - this.select.dhr,
                wl: this.sizes.levo - this.select.dwl,
                hl: this.sizes.hlv - this.select.dhl,

            };
            glmap.H = [glmap.hl, glmap.hd, glmap.hr];
            glmap.W = [glmap.wl, glmap.wd, glmap.wr];
        };

        console.log(`Harray[${glmap.H}]`);
        console.log(`Warray[${glmap.W}]`);
        return glmap
    }
}

class ZZZ extends GetGlass {
    constructor() {
        super();
        this.ccsize
    }


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
        let calced = new Map();


        // let out = {};
        // out = Object.fromEntries(sizepool).forEach((value, key) => {
        //     console.log(`${key} -> ${value}`);
        //     value -= (key == "h" || "hpr" || "hlv" || "himp") ? dh : dw;
        //     console.log(`${key} ---> ${value}`);
        // });
        return //! проблема с выводом вот этой вот хуйни, схуяли она андефайнед???
    }

}

function cs() {
    let gg = new GetGlass();
    for (let key in gg.ccsize) {
        console.log(`glasses: ${key} : ${gg.ccsize[key]}`);
    }
    // for (let key in gg.sizes) {
    //     console.log(`sizes: ${key} : ${gg.sizes[key]}`);
    // }




};



class Zzcalc extends Calcbb {
    constructor() {
        super();
        this.getmap;
        // this.sizepool = this.getmap
    }


    zs(sizepool) {
        let sys = document.getElementById('prof').value;
        let ztype = document.getElementById('ztype').innerText;
        let dep = document.getElementById('gdepth').value;
        let dh, dw;
        let ud = Delta[sys].dpt;
        let npool = Object.entries(sizepool);
        let zpool = new Map(Object.entries(sizepool));

        let dz = (ztype == "Rollite") ? Delta[sys]["rd" + dep] : Delta[sys].idpt;

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
    [dr, di, dsi, drs] = Delta[system].dsize;
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