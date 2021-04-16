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
}
//! === Контейнер для типов стекла в раме
const Gl_type = {
    //! === glass type 0 === [r-r] -> рама-рама
    rr: {
        sys() { return document.getElementById('prof').value },
        dH(idfix) {
            if (idfix === "0") return Delta[this.sys()].d_rr()
            return Delta[this.sys()].d_rs()
        },
        dW(idfix) {
            if (idfix === "0") return Delta[this.sys()].d_rr()
            return Delta[this.sys()].d_rs()
        }
    },

    //! === glass type 1 === [r-i] -> рама - импост
    ri: {
        sys() { return document.getElementById('prof').value },
        dH(idfix) {
            if (idfix === "0") return Delta[this.sys()].d_rr()
            return Delta[this.sys()].d_rs()
        },
        dW(idfix) {
            if (idfix === "0") return Delta[this.sys()].d_ri()
            return Delta[this.sys()].sisi()
        }
    },

    //! === glass type 2 === [i-i] -> импост - импост
    ii: {
        sys() { return document.getElementById('prof').value },
        dH(idfix) {
            if (idfix === "0") return Delta[this.sys()].d_rr()
            return Delta[this.sys()].d_rs()
        },
        dW(idfix) {
            if (idfix === "0") return Delta[this.sys()].d_ii()
            return Delta[this.sys()].d_sisi()
        }
    },

}

//! FIXME: придумать, как лучше сделать чтобы массив используемых стекол можно было использовать... для начала надо понять, как из него получать массив значений
class CurrentRama {

    constructor() {
        this.wintype = document.getElementById('fon').getAttribute("wintype")
    }
    f = [Gl_type.rr]
    ff = [Gl_type.ri, Gl_type.ri]

}

const IdSelector = {
    fix: {
        f: ["s1"],
        ff: ["s1", "s2"],
        fff: ["s1", "s2", "s3"],
        df: ["sd", "s1"],
        dff: ["sd", "s1", "s3"],
        fdf: ["s1", "sd", "s3"],
    },
    idw: {
        f: ["w"],
        ff: ["levo", "w"],
        fff: ["levo", "mid", "pravo"],
        df: ["w", "levo"],
        dff: ["w", "levo", "pravo"],
        fdf: ["levo", "w", "pravo"],
    },
    idh: {
        f: ["h"],
        ff: ["h", "h"],
        fff: ["h", "h", "h"],
        df: ["h", "hpr"],
        dff: ["h", "hpr", "hpr"],
        fdf: ["hlv", "h", "hpr"],
    }

}



function mapItAll() {
    let sizepool = document.getElementsByClassName("size");
    let fixpool = document.querySelectorAll("[data-isfix]");
    let zpool = document.querySelectorAll("[data-zpool]");
    let systempool = document.querySelectorAll("[data-taken-system]");
    let datataken = document.querySelectorAll("[data-taken]");
    let wintype = document.getElementById('fon').getAttribute("wintype");
    let sizemap = new Map();
    for (const size of sizepool) {
        if (Rama.use[wintype].includes(size.id)) sizemap.set(`${size.id}`, `${+size.value}`);
    };
    return sizemap



}

function g_tselect(id1, id2, id3) {

    const GlHolder = {

        g_t1: {
            sys: document.getElementById('prof').value,
            vd(idfix) {
                if (idfix === "0") return Delta[this.sys].d_rr()
                return Delta[this.sys].d_rs()
            },
            hd(idfix) {
                if (idfix === "0") return Delta[this.sys].d_ri()
                return Delta[this.sys].sisi()
            }
        },
        g_t2: {
            sys: document.getElementById('prof').value,
            vd(idfix) {
                if (idfix === "0") return Delta[this.sys].d_rr()
                return Delta[this.sys].d_rs()
            },
            hd(idfix) {
                if (idfix === "0") return Delta[this.sys].d_ii()
                return Delta[this.sys].d_sisi()
            }
        },


    }


    //     let sys = document.getElementById('prof').value;
    // 
    //     let g_t1 = {
    //         vert(idfix) {
    //             if (idfix === "0") return Delta[sys].d_rr()
    //             return Delta[sys].d_rs()
    //         },
    //         hor(idfix) {
    //             if (idfix === "0") return Delta[sys].d_ri()
    //             return Delta[sys].sisi()
    //         }
    //     };
    //     let g_t2 = {
    //         vert(idfix) {
    //             if (idfix === "0") return Delta[sys].d_rr()
    //             return Delta[sys].d_rs()
    //         },
    //         hor(idfix) {
    //             if (idfix === "0") return Delta[sys].d_ii()
    //             return Delta[sys].d_sisi()
    //         }
    //     };

    let g_t1 = GlHolder.g_t1;
    let g_t2 = GlHolder.g_t2;



    let f = [
        [g_t1.hd(id1), g_t1.vd(id1)],
    ];
    let ff = [
        [g_t1.hd(id1), g_t1.vd(id1)],
        [g_t2.hd(id2), g_t2.vd(id2)],
    ];
    let fff = [
        [g_t1.hd(id1), g_t1.vd(id1)],
        [g_t2.hd(id2), g_t2.vd(id2)],
        [g_t1.hd(id3), g_t1.vd(id3)],
    ];


};


function go() {

    let wt = document.getElementById('fon').getAttribute("wintype");

    //!----------<<<-----------[Array.H, Array.W, objects]------------->>>-------------//

    let sizes = document.getElementsByClassName("size");
    let hp = new Map();
    let wp = new Map();
    for (const size of sizes) {
        if (IdSelector.idw[wt].includes(size.id)) wp.set(`${size.id}`, `${+size.value || +size.dataset.calcedvalue}`);
        if (IdSelector.idh[wt].includes(size.id)) hp.set(`${size.id}`, `${+size.value || +size.dataset.calcedvalue}`);
    };
    let sizepool = [
        [Array.from(wp.values())],
        [Array.from(hp.values())]
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
    console.log(idfix);
    console.log(hobj);
    console.log(wobj);
    //!----------<<<-----------idfixpool------------->>>-------------//

    let deltapool = new Map();


    let gl_number = wt.length;
    let output;


    // return [sizepool, idfix]
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

function setglass(map) {
    return new GLS(map.get("w"), map.get("h"))

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