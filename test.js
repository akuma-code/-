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
    console.log(Object.fromEntries(sizemap))



}

function g_tselect(id1, id2, id3) {

    let sys = document.getElementById('prof').value;
    let g_t1 = {
        vert(idfix) {
            if (idfix === "0") return Delta[sys].d_rr()
            return Delta[sys].d_rs()
        },
        hor(idfix) {
            if (idfix === "0") return Delta[sys].d_ri()
            return Delta[sys].sisi()
        }
    };
    let g_t2 = {
        vert(idfix) {
            if (idfix === "0") return Delta[sys].d_rr()
            return Delta[sys].d_rs()
        },
        hor(idfix) {
            if (idfix === "0") return Delta[sys].d_ii()
            return Delta[sys].d_sisi()
        }
    };


    let f = [
        [g_t1.hor(id1), g_t1.vert(id1)],
    ];
    let ff = [
        [g_t1.hor(id1), g_t1.vert(id1)],
        [g_t2.hor(id2), g_t2.vert(id2)],
    ];
    let fff = {
        delta: [
            [g_t1.hor(id1), g_t1.vert(id1)],
            [g_t2.hor(id2), g_t2.vert(id2)],
            [g_t1.hor(id3), g_t1.vert(id3)],
        ]
    };
    return fff.delta
};


function glasses() {
    let id1 = document.getElementById('s1').dataset.isfix;
    let id2 = document.getElementById('s2').dataset.isfix;
    let id3 = document.getElementById('s3').dataset.isfix;
    let sys = document.getElementById('prof').value;


    let res = g_tselect(win_cfg[sys]);
    console.log(res);
}




const win_cfg = {

    f: ["s1"],
    ff: ["s1", "s2"],
    fff: ["s1", "s2", "s3"],
    df: ["sd", "s1"],
    dff: ["sd", "s1", "s3"],
    fdf: ["s1", "sd", "s3"],


}