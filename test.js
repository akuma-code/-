/*//? FIXME: сделано: класс стекло-пустышка, контейнер типов стекол(для каждого типа задана дельта рама-створка-импост), функции для получения размеров, массива елементов
  //? FIXME: которые надо проверять на наличие створки
  //? TODO: сделать: класс или функцию, которая будет отвечать за создание комплекта стекол под каждую раму
*/
//! ================================================================ Вспомогательный класс, одиночное стекло==========================//
class GLS {
    constructor(w = null, h = null) {
        this.w = w;
        this.h = h;
    }
    get arr() {
        return [this.w, this.h]
    }

    get obj() {
        return { w: this.w, h: this.h }
    }


    applyDelta(delta, gls = this.arr) {
        if (gls.length !== delta.length) console.log(`разная длинна массивов ${gls.length} : ${delta.length}`);
        let out = [];
        out.length = 0;
        for (let i = 0; i < gls.length; i++) {
            out.push([gls[i] - delta[i]])
        };
        return out.join(",").split(",")
    }

}

function applyZs(glasses = []) {
    let dep = document.getElementById('gdepth').value;
    let sys = document.getElementById('prof').value;
    let ztype = document.getElementById('ztype').innerText;
    let zw, zh;
    let dz = (ztype == "Rollite") ? SizeDB[sys]["rd" + dep] : SizeDB[sys].idpt;
    [zw, zh] = dz;
    let out = [];
    for (const glass of glasses) {
        out.push([glass[0] - zw, glass[1] - zh])
    }
    return out;
}


//! === Контейнер для выбора дельты стекла в зависимости от положения в раме
let Delta_selector = {
    sys() { return document.getElementById('prof').value },

    //! === glass type 0 === [r-r] -> рама-рама
    rr(isfix) {
        if (isfix > 1 || isfix < 0) { return console.log(`Неверный isfix_rr, указан: ${isfix}`) };

        dH = (isfix) ? SizeDB.d_rr(this.sys()) : SizeDB.d_rs(this.sys()); //! доделать!
        dW = (isfix) ? SizeDB.d_rr(this.sys()) : SizeDB.d_rs(this.sys());
        return [Math.floor(dW), Math.floor(dH)]

    },

    //! === glass type 1 === [r-i] -> рама - импост
    ri(isfix) {
        if (isfix > 1 || isfix < 0) { return console.log(`Неверный isfix_ri, указан: ${isfix}`) };

        dH = (isfix) ? SizeDB.d_rr(this.sys()) : SizeDB.d_rs(this.sys());
        dW = (isfix) ? SizeDB.d_ri(this.sys()) : SizeDB.d_sisr(this.sys());
        return [Math.floor(dW), Math.floor(dH)]
    },

    //! === glass type 2 === [i-i] -> импост - импост
    ii(isfix) {
        if (isfix > 1 || isfix < 0) { return console.log(`Неверный isfix_ii, указан: ${isfix}`) };

        dH = (isfix) ? SizeDB.d_rr(this.sys()) : SizeDB.d_rs(this.sys());
        dW = (isfix) ? SizeDB.d_ii(this.sys()) : SizeDB.d_sisi(this.sys());
        return [Math.floor(dW), Math.floor(dH)]
    },

    door(isfix) {
        if (isfix > 1 || isfix < 0) { return console.log(`Неверный isfix_door, указан: ${isfix}`) };

        dH = (isfix) ? SizeDB.d_doori(this.sys()) : SizeDB.d_doorf(this.sys());
        dW = SizeDB.d_rs(this.sys());
        return [Math.floor(dW), Math.floor(dH)]
    }

}


//!TODO: заработало, доделать!!


function gonow() {
    let wintype = document.getElementById('fon').getAttribute('wintype');
    let glasses = new MainSelector()[wintype]();
    let zh = applyZs(glasses);
    console.log(`glasses: ${glasses}`);
    console.log(`zhaluzi: ${zh}`);
    return { zh };
}

//!----------<<<-----------  getSizes()    ------------->>>-------------//
function getSizes() {

    // document.getElementById('mid').value = document.getElementById('w').value - document.getElementById('levo').value - document.getElementById('pravo').value;
    let wt = document.getElementById('fon').getAttribute("wintype");
    let sizes = document.getElementsByClassName("size");
    let hp = new Map();
    let wp = new Map();
    for (const size of sizes) {
        if (IdSelector.idw[wt].includes(size.id)) wp.set(`${size.id}`, `${+size.value}`);
        if (IdSelector.idh[wt].includes(size.id)) hp.set(`${size.id}`, `${+size.value}`);
    };
    let sizepool = [
        Array.from(wp.values()),
        Array.from(hp.values())
    ];
    console.log({ sizepool });
    return sizepool
}


class MainSelector {
    check(id) {
        let elem = +document.getElementById(id).dataset.isfix;
        let output = (elem === 1) ? "Фикса" : "Створка";
        setTimeout(() => console.log(`id: ${id}(${output})`), 1);
        return elem
    }
    f(sizepool = getSizes()) {
        let g_left;
        g_left = new GLS(sizepool[0][0], sizepool[1][0]);
        return [
            g_left.applyDelta(Delta_selector.rr(this.check("s1")))
        ]
    }
    ff(sizepool = getSizes()) {
        let g_left, g_right;
        g_left = new GLS(sizepool[0][0], sizepool[1][0]);
        g_right = new GLS(sizepool[0][1] - sizepool[0][0], sizepool[1][0]);
        return [
            g_left.applyDelta(Delta_selector.ri(this.check("s1"))),
            g_right.applyDelta(Delta_selector.ri(this.check("s2")))
        ]
    }
    fff(sizepool = getSizes()) {
        let g_left, g_mid, g_right, g_w;
        g_left = new GLS(sizepool[0][0], sizepool[1][0]);
        g_right = new GLS(sizepool[0][1], sizepool[1][0]);
        g_w = new GLS(sizepool[0][2], sizepool[1][0]);
        g_mid = new GLS(g_w.w - g_left.w - g_right.w, g_w.h)
        return [
            g_left.applyDelta(Delta_selector.ri(this.check("s1"))),
            g_mid.applyDelta(Delta_selector.ii(this.check("s2"))),
            g_right.applyDelta(Delta_selector.ri(this.check("s3")))
        ]
    }
    df(sizepool = getSizes()) {
        let g_door, g_right;
        g_door = new GLS(sizepool[0][0], sizepool[1][0]);
        g_right = new GLS(sizepool[0][1] - sizepool[0][0], sizepool[1][0]);
        return [
            g_door.applyDelta(Delta_selector.ri(this.check("sd"))),
            g_right.applyDelta(Delta_selector.rr(this.check("s2")))
        ]
    }
}

const IdSelector = {
    idw: {
        f: ["w"],
        ff: ["levo", "w"],
        fff: ["levo", "w", "pravo"],
        df: ["w", "levo"],
        dff: ["w", "levo", "pravo"],
        fdf: ["levo", "w", "pravo"],
    },
    idh: {
        f: ["h"],
        ff: ["h", "h"],
        fff: ["h", "h", "h"],
        df: ["h", "hpr", "himp"],
        dff: ["h", "hpr", "hpr", "himp"],
        fdf: ["hlv", "h", "hpr", "himp"],
    }

}





function go() {

    let wt = document.getElementById('fon').getAttribute("wintype");

    //!----------<<<-----------[Array.H, Array.W, objects]------------->>>-------------//

    let sizes = document.getElementsByClassName("size");
    let hp = new Map();
    let wp = new Map();
    for (const size of sizes) {
        if (IdSelector.idw[wt].includes(size.id)) wp.set(`${size.id}`, `${+size.value}`);
        if (IdSelector.idh[wt].includes(size.id)) hp.set(`${size.id}`, `${+size.value}`);
    };
    let sizepool = [
        Array.from(wp.values()),
        Array.from(hp.values())
    ];
    let hobj = Object.fromEntries(hp.entries())
    let wobj = Object.fromEntries(wp.entries())
        //!----------<<<------------------------>>>-------------//

    //!----------<<<-----------[fix id pool]------------->>>-------------//
    let idfixpool = new Map();
    IdSelector.fix[wt].forEach(function(value, index) {
        idfixpool.set(`id${index+1}`, value);
    })
    let idfix = Object.fromEntries(idfixpool.entries());
    // console.log(idfix);
    // console.log(hobj);
    // console.log(wobj);
    return sizepool
}




//!----------<<<-----------РАМА ПОЛУЧАЮЩАЯ ПО ИД РАЗМЕР------------->>>-------------//

class StvId {
    constructor(idw, idh) {
        this.w = document.getElementById(idw).value;
        this.h = document.getElementById(idh).value;
    }

    // || document.getElementById(idw).dataset.calcedvalue


    add(w = this.w, h = this.h) {
        let gls = new GLS(w, h)
        return gls
    }


}


class GL_conteiner {
    constructor() {
        this.storage = new Map();

    }
    store(key, itemGLS) {
        return this.storage.set(key, itemGLS)
    }
    out(key) {
        return this.storage.get(key)
    }
    multi(numb = 1, obj) {

        while (numb === 1) {
            this.out(numb);
            numb--
        }
        let output = (Object.fromEntries(this.storage.entries()));
        return output
    }
}
//TODO: сделать метод для создания n объектов(стекол)