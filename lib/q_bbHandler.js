// ! вроде заработало, 
//! сделать вывод и проверить размеры


//!-----------------Основной класс WIN()--------------------------!//
class Win {
    constructor() {
        this.wintype = document.getElementById('fon').getAttribute("wintype");
        [this.dr, this.di, this.dsi, this.drs] = Delta[document.getElementById('prof').value].dsize;
    }
    get sizes() {
        console.log("Evaluate sizes");
        let sizemap = new Map();
        let win = this.select;
        let dsizes = document.getElementsByClassName("size");
        for (const size of dsizes) {
            if (win.use.includes(size.id)) sizemap.set(`${size.id}`, `${+size.value}`);
        };
        return Object.fromEntries(sizemap)
    }
    get select() {
        let result = {};
        console.log(`Evaluate select`);

        switch (this.wintype) {
            case "f":
                result = {
                    wintype: this.wintype,
                    use: ["h", "w"],
                    dw: (document.getElementById('s1').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                    dh: (document.getElementById('s1').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,

                };
                break;

            case "ff":
                result = {
                    wintype: this.wintype,
                    use: ["h", "w", "levo"],
                    dwl: (document.getElementById('s1').dataset.isfix == "0") ? Math.floor(this.di + this.dr) : Math.floor(this.dsi + this.drs),
                    dhl: (document.getElementById('s1').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                    dwr: (document.getElementById('s2').dataset.isfix == "0") ? Math.floor(this.di + this.dr) : Math.floor(this.dsi + this.drs),
                    dhr: (document.getElementById('s2').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                };
                break;

            case "fff":
                result = {
                    wintype: this.wintype,
                    use: ["h", "w", "levo", "pravo"],
                    dwl: (document.getElementById('s1').dataset.isfix == "0") ? Math.floor(this.di + this.dr) : Math.floor(this.dsi + this.drs),
                    dhl: (document.getElementById('s1').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                    dwm: (document.getElementById('s2').dataset.isfix == "0") ? 2 * this.di : 2 * this.dsi,
                    dhm: (document.getElementById('s2').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                    dwr: (document.getElementById('s3').dataset.isfix == "0") ? Math.floor(this.di + this.dr) : Math.floor(this.dsi + this.drs),
                    dhr: (document.getElementById('s3').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                };
                break;
            case "d-f":
                result = {
                    wintype: this.wintype,
                    use: ["h", "w", "hpr", "pravo", "himp"],
                    dwd: (document.getElementById('sd').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                    dhd: (document.getElementById('sd').dataset.isfix == "0") ? 2 * this.dr : Math.floor(this.dsi + this.drs),
                    dwr: (document.getElementById('s3').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                    dhr: (document.getElementById('s3').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                };
                break;
            case "d-ff":
                result = {
                    wintype: this.wintype,
                    use: ["h", "w", "levo", "pravo", "hpr", "himp"],
                    dwd: (document.getElementById('sd').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                    dhd: (document.getElementById('sd').dataset.isfix == "0") ? 2 * this.dr : Math.floor(this.dsi + this.drs),
                    dwl: (document.getElementById('s1').dataset.isfix == "0") ? 2 * this.di : 2 * this.dsi,
                    dhl: (document.getElementById('s1').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                    dwr: (document.getElementById('s2').dataset.isfix == "0") ? Math.floor(this.di + this.dr) : Math.floor(this.dsi + this.drs),
                    dhr: (document.getElementById('s2').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                };
                break;
            case "f-d-f":
                result = {
                    wintype: this.wintype,
                    use: ["h", "w", "levo", "pravo", "himp", "hlv", "hpr"],
                    dwd: (document.getElementById('sd').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                    dhd: (document.getElementById('sd').dataset.isfix == "0") ? 2 * this.dr : Math.floor(this.dsi + this.drs),
                    dwl: (document.getElementById('s1').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                    dhl: (document.getElementById('s1').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                    dwr: (document.getElementById('s3').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                    dhr: (document.getElementById('s3').dataset.isfix == "0") ? 2 * this.dr : 2 * this.drs,
                };
                break;
            default:
                return console.log("wintype failed ===> " + this.wintype);
        };
        return result
    }
};

//!----------<<<-----------Расширяющий GetGlass ------------->>>-------------//

class GetGlass extends Win {
    constructor() {
        super();
        this.pool;
    }



    get ccsize() {
        let spool = this.sizes;
        let sdelta = this.select;
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
            this.pool = {
                wl: spool.w - sdelta.dw,
                hl: spool.h - sdelta.dh,

            };
            this.pool.H = [this.pool.hl];
            this.pool.W = [this.pool.wl];
        }
        if (this.wintype == "ff") {
            this.pool = {
                wl: spool.levo - sdelta.dwl,
                hl: spool.h - sdelta.dhl,
                wr: spool.w - spool.levo - sdelta.dwr,
                hr: spool.h - sdelta.dhr,

            };
            this.pool.H = [this.pool.hl, this.pool.hr];
            this.pool.W = [this.pool.wl, this.pool.wr];
        }
        if (this.wintype == "fff") {
            this.pool = {
                hl: spool.h - sdelta.dhl,
                hm: spool.h - sdelta.dhr,
                hr: spool.h - sdelta.dhr,
                wl: spool.levo - sdelta.dwl,
                wm: spool.w - spool.pravo - spool.levo - sdelta.dwm,
                wr: spool.pravo - sdelta.dwr,
            };
            this.pool.H = [this.pool.hl, this.pool.hm, this.pool.hr];
            this.pool.W = [this.pool.wl, this.pool.wm, this.pool.wr];
        };
        if (this.wintype == "d-f") {
            this.pool = {
                wd: spool.w - sdelta.dwd,
                hd: (document.getElementById('sd').dataset.isfix == "1") ? spool.h - sdelta.dhd - spool.himp : spool.h - sdelta.dhd,
                wr: spool.pravo - sdelta.dwr,
                hr: spool.hpr - sdelta.dhr,

            };
            this.pool.H = [this.pool.hd, this.pool.hr];
            this.pool.W = [this.pool.wd, this.pool.wr];
        };
        if (this.wintype == "d-ff") {
            this.pool = {
                hd: (document.getElementById('sd').dataset.isfix == "1") ? spool.h - sdelta.dhd - spool.himp : spool.h - sdelta.dhd,
                hl: spool.hpr - sdelta.dhl,
                hr: spool.hpr - sdelta.dhr,
                wd: spool.w - sdelta.dwd,
                wl: spool.levo - spool.pravo - sdelta.dwl,
                wr: spool.pravo - sdelta.dwr,

            };
            this.pool.H = [this.pool.hd, this.pool.hl, this.pool.hr];
            this.pool.W = [this.pool.wd, this.pool.wl, this.pool.wr];
        }
        if (this.wintype == "f-d-f") {
            this.pool = {
                wd: spool.w - sdelta.dwd,
                hd: (document.getElementById('sd').dataset.isfix == "1") ? spool.h - sdelta.dhd - spool.himp : spool.h - sdelta.dhd,
                wr: spool.pravo - sdelta.dwr,
                hr: spool.hpr - sdelta.dhr,
                wl: spool.levo - sdelta.dwl,
                hl: spool.hlv - sdelta.dhl,

            };
            this.pool.H = [this.pool.hl, this.pool.hd, this.pool.hr];
            this.pool.W = [this.pool.wl, this.pool.wd, this.pool.wr];
        };

        console.log(`Harray[${this.pool.H}]`);
        console.log(`Warray[${this.pool.W}]`);
        return this.pool
    }
}
//!----------<<<-----------ZZZ делает финальный рассчет ------------->>>-------------//

class ZZZ extends GetGlass {
    constructor() {
        super();
        this.ccsize;
        this.pool;
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
        let zh = this.pool.H.map(value => value - dh);
        let zw = this.pool.W.map(value => value - dw);
        console.log(`Жалюзи h[${zh}]`);
        console.log(`Жалюзи w[${zw}]`);


        return [
            zh,
            zw
        ]
    }

}