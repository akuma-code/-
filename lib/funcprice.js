//TODO: Доделать скрипт для обновления прайслиста

function multiArr(array = [], rate) {
    let newarr = [];
    for (const item of array) {
        newarr.push(Math.round(item * rate))
    }
    return newarr
}

function rateprice(group = []) {
    const rate = rdo.rate;
    let result = [];
    for (let line of group) {
        result.push(multiArr(line, rate));
    }
    // console.log({ result });
    return result
}

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