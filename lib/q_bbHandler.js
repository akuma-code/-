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
//! доделать!!
class Zzcalc extends Calcbb {
    constructor() {
        super();
        this.sizepool = this.getmap
    }


    calczz(sizepool = {}) {
        let sys = document.getElementById('prof').value;
        let ztype = document.getElementById('ztype').innerText;
        let dep = document.getElementById('gdepth').value;
        let dh, dw;
        let ud = Delta[sys].dpt;
        let zpool = new Map(Object.entries(sizepool));

        let dz = (ztype == "Rollite") ? Delta[sys]["rd" + dep] : Delta[sys].idpt;

        if (!ud.includes(dep)) return alert(`В ${sys} не лезет ст/п ${dep} мм`);
        if (ztype == "Rollite" && sys == "WHS60") return alert("Жалюзи Rollite на профиль WHS60 не ставятся!");
        [dw, dh] = dz;

        // zpool.forEach(
        //     (value, key) =>
        //     console.log(`${key} : ${value}`));

        return zpool.forEach((value, key) => {
            value -= (key == "h" || "hpr" || "hlv" || "himp") ? dh : dw;
            console.log(`${key} -> ${value}`);
        });

    }
}


function wait() {
    let sizes = document.getElementsByClassName("size");
    let sizemap = new Map();
    for (const size of sizes) {
        // console.log(size.id);
        sizemap.set(`${size.id}`, `${size.value}`);
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
    if (rs == 1) {
        left = (s1 == 0) ? sp.w - 2 * dr : sp.w - 2 * drs;
        hl = (s2 == 0) ? sp.h - 2 * dr : sp.h - 2 * drs;

        right = 0;
        mid = 0;
        winsize = {
            HL: hl,
            WL: left
        };

    };
    if (rs == 2) {
        left = (s1 == 0) ? Math.round(sp.levo - dr - di) : Math.round(sp.levo - drs - dsi);
        hl = (s1 == 0) ? sp.h - 2 * dr : sp.h - 2 * drs;

        right = (s2 == 0) ? Math.round(sp.w - sp.levo - dr - di) : Math.round(sp.w - sp.levo - dsi - drs);
        hr = (s2 == 0) ? sp.h - 2 * dr : sp.h - 2 * drs;
        mid = 0;
        winsize = {
            HL: hl,
            WL: left,
            HM: hr,
            WM: right
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
            HL: hl,
            WL: left,
            HR: hr,
            WR: right,
            HM: hm,
            WM: mid,
        };

    };

    if (rs == 4) {
        wd = sp.w - 2 * drs;
        hd = (s4 == 0) ? sp.h - 2 * drs : sp.h - sp.himp - drs - dsi;

        right = (s2 == 0) ? Math.round(sp.pravo - dr - di) : Math.round(sp.pravo - drs - dsi);
        hr = (s3 == 0) ? Math.floor(sp.hpr - 2 * dr) : Math.floor(sp.hpr - 2 * drs);
        winsize = {
            HD: hd,
            WD: wd,
            HR: hr,
            WR: right,
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
            HD: hd,
            WD: wd,
            HL: hl,
            WL: left,
            HR: hr,
            WR: right,

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
            HD: hd,
            WD: wd,
            HL: hl,
            WL: left,
            HR: hr,
            WR: right,

        };

    };
    showsize();
    console.log(rs);
    return winsize
}