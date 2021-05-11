function multiArr(array = [], rate) {
    let newarr = [];
    for (const item of array) {
        newarr.push(Math.round(item * rate))
    }
    return newarr
}

// function rateprice(group = []) {
//     const rate = rdo.rate;
//     let result = [];
//     for (let line of group) {
//         result.push(multiArr(line, rate));
//     }
//     // console.log({ result });
//     return result
// }

function getindex(h, w, type) {
    let sizepool = [];
    if (type === "Rollite") {
        if (h < 500) h = 500;
        if (w < 400) w = 400;
        sizepool = rdo.sizes.Rollite
    }
    if (type === "Isolite") {
        if (h < 300) h = 300;
        if (w < 300) w = 300;
        sizepool = rdo.sizes.Isolite
    }

    let indH = sizepool.h.indexOf((Math.ceil(h / 100)) / 10);
    let indW = sizepool.w.indexOf((Math.ceil(w / 100)) / 10);

    return [indH, indW]
}

function calcprice(h, w, grp, type) {
    let group = (type == "Isolite") ? Isolite.group[grp] : Rollite.group[grp];
    // console.log(group);
    let pool = rdo.setprice(group);
    let [indh, indw] = getindex(h, w, type);
    console.log(pool[indh][indw]);
    return pool[indh][indw]
}

function pickup() {
    let $ztype = document.getElementById('ztype').innerText;
    let $zgrp = document.getElementById('zgrp').innerText;
    return { type: $ztype, grp: $zgrp }
}

class PriceCalculator {
    constructor() {
        this.type = document.getElementById('ztype').innerText;
        this.grp = document.getElementById('zgrp').innerText;
        this.sizepool = rdo.sizes[this.type];
    }
    get price() {
        return rdo.setprice(Pricelist[this.type][this.grp])
    }
    getind(width, height) {
        if (type === "Rollite") {
            if (height < 500) height = 500;
            if (width < 400) width = 400;
        };
        if (type === "Isolite") {
            if (height < 300) height = 300;
            if (width < 300) width = 300;
        }

        let indH = this.sizepool.h.indexOf((Math.ceil(height / 100)) / 10);
        let indW = this.sizepool.w.indexOf((Math.ceil(width / 100)) / 10);
        return [indH, indW]
    }

    calcIt(zw, zh) {
        let index = this.getind(zw, zh);
        return this.price[index[0]][index[1]];
    }

    calc(sizes) {
        let result = [];
        for (let line of sizes) {
            let ind = this.getind(line[0], line[1]);
            result.push(this.price[ind[0]][ind[1]]);
        }
        return result
    }

}