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