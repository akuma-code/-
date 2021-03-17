let Delta = {
    "Proline": {
        "dsize": [48, 26.5, 74.5, 96],
        "dpt": ["28", "36", "40"],
        "rd28": [22, 8],
        "rd36": [24, 8],
        "rd40": [32, 8],
        "idpt": [34, 34],
    },
    "Softline": {
        "dsize": [51, 26.5, 77.5, 102],
        "dpt": ["28", "36", "40"],
        "rd28": [22, 8],
        "rd36": [24, 8],
        "rd40": [32, 8],
        "idpt": [34, 34],
    },
    "Premium82": {
        "dsize": [58, 32, 78, 104],
        "dpt": ["52", "40"],
        "rd52": [36, 8],
        "rd40": [32, 8],
        "idpt": [34, 34],
    },
    "Euroline": {
        "dsize": [54, 28, 84.5, 110.5],
        "dpt": ["24", "32"],
        "rd24": [22, 8],
        "rd32": [26, 8],
        "idpt": [28, 28],
    },
    "WHS60": {
        "dsize": [44, 23.5, 71.5, 92],
        "dpt": ["24", "30"],
        "idpt": [30, 30],
    },
    "WHS72": {
        "dsize": [45, 25.5, 74.5, 95],
        "dpt": ["24", "32", "40"],
        "rd24": [20, 8],
        "rd32": [22, 8],
        "rd40": [23, 8],
        "idpt": [34, 34],
    },
    "BasicPlus": {
        "dsize": [50, 27, 76, 99],
        "dpt": ["24", "30", "38"],
        "rd24": [17, 8],
        "rd30": [23, 8],
        "rd38": [23, 8],
        "idpt": [32, 32],
    },
    "Lux": {
        "dsize": [55, 27, 79, 109],
        "dpt": ["24", "30", "38"],
        "rd24": [17, 8],
        "rd30": [23, 8],
        "rd38": [23, 8],
        "idpt": [32, 32],
    },
    "TermoPlus": {
        "dsize": [55, 27, 76, 104],
        "dpt": ["24", "30", "38"],
        "rd24": [23, 8],
        "rd30": [23, 8],
        "rd38": [23, 8],
        "idpt": [32, 32],
    },

}

async function gv() { //принмает размеры выдает стекла
    let h = await document.getElementById("h").value;
    let w = await document.getElementById("w").value;
    let l = await document.getElementById("levo").value;
    let r = await document.getElementById("pravo").value;
    let system = await document.getElementById("prof").value;
    let stp = await document.getElementById('gdepth').value;
    let lstv = await document.getElementById("s1").style.opacity;
    let mstv = await document.getElementById("s2").style.opacity;
    let rstv = await document.getElementById("s3").style.opacity;


    let delta = await Delta[system].dsize;
    // let testdelta = await Delta[system].dsize;
    // console.log(testdelta);

    let left, right, mid, hl, hr, hm;
    let dr, di, dsi, drs; //дельта рама, шмпост, импост-створка, импост-рама

    [dr, di, dsi, drs] = delta;
    // console.log(delta);
    // console.log("gv()");

    if (rama == "x1") {
        //1 stvorka
        // document.getElementById("outside").innerHTML += `<b><h3>${system} / ${stp} mm</b></h3>`;

        console.log("single");

        left = (lstv == 0) ? w - 2 * dr : w - 2 * drs;
        hl = (lstv == 0) ? h - 2 * dr : h - 2 * drs;

        right = 0;
        mid = 0;
        return [
            [hl, left]
        ]
    };
    if (rama == "x2") {
        // 2 stvorki
        // document.getElementById("outside").innerHTML += `<b><h3>${system} / ${stp} mm</b></h3>`;

        console.log("double");

        left = (lstv == 0) ? Math.round(l - dr - di) : Math.round(l - drs - dsi);
        hl = (lstv == 0) ? h - 2 * dr : h - 2 * drs;

        right = (mstv == 0) ? Math.round(w - l - dr - di) : Math.round(w - l - dsi - drs);
        hr = (mstv == 0) ? h - 2 * dr : h - 2 * drs;
        mid = 0;
        return [
            [hl, left],
            [hr, right]
        ]
    };

    if (rama == "x3") {
        //3 stvorki
        // document.getElementById("outside").innerHTML += `<b><h3>${system} / ${stp} mm</b></h3>`;

        console.log("triple");

        left = (lstv == 0) ? Math.round(l - dr - di) : Math.round(l - drs - dsi);
        hl = (lstv == 0) ? Math.round(h - 2 * dr) : Math.round(h - 2 * drs);

        right = (rstv == 0) ? Math.round(r - dr - di) : Math.round(r - drs - dsi);
        hr = (rstv == 0) ? Math.round(h - 2 * dr) : Math.round(h - 2 * drs);

        mid = (mstv == 0) ? w - l - r - di * 2 : w - l - r - dsi * 2;
        hm = (mstv == 0) ? h - 2 * dr : h - 2 * drs;
        return [
            [hl, left],
            [hm, mid],
            [hr, right],
        ]
    };

}

async function configout(text) {
    let sys = await document.getElementById('prof').value;
    let dpt = await document.getElementById('gdepth').value;
    let out = document.getElementById("outside");
    let tr = document.createElement('tr');
    let elem = document.createElement("div");
    let output = "";
    let c = 1;
    elem.className = "config";
    tr.innerHTML = `<td>${sys}/${dpt} mm</td>`;

    output += `<h3>${sys}/${dpt} mm</h3>`;
    for (let line of text) {
        let s = await document.getElementById('s' + c).style.opacity;
        output += `<p1><b>`;
        output += (s == 1) ? `Створка #${c}: ` : `Фикса #${c}: `;
        output += `  </b>${line[1]} x ${line[0]}</p1>`;
        tr.innerHTML += (s == 1) ? `<td>Створка #${c}: ` : `<td>Фикса #${c}: `;
        // tr.innerHTML += `<td>${line[1]}</td><td>${line[0]}</td>`;
        c++;
    }


    elem.innerHTML = output + "<br>";

    out.prepend(elem);

}

function calc() {
    gv().then(
        result => {
            configout(result);
            calcZ(result).then(
                result => filltab(result)
            )
        }
    )
}

async function calcZ(array) {
    let sys = await document.getElementById('prof').value;
    let zhsys = await document.getElementById('ztype').value;
    let dep = await document.getElementById('gdepth').value;
    let zh, zw, dh, dw;
    let ud = Delta[sys].dpt;
    let outarray = [];

    let dz = (zhsys == "Rollite") ? Delta[sys]["rd" + dep] : Delta[sys].idpt;
    console.log("calcZ()");

    if (!ud.includes(dep)) return alert(`В ${sys} не лезет ст/п ${dep} мм`);


    [dw, dh] = dz;
    for (let line of array) {
        if (line.length == 1) continue;
        zh = line[0] - dh;
        zw = line[1] - dw;
        outarray.push([zw, zh])

    };
    console.log(outarray);
    return [outarray];

}
let cc = 1;
async function filltab([zsize]) {
    let c = 1;
    let zhsys = await document.getElementById('ztype').value;
    let dep = await document.getElementById('gdepth').value;
    let sys = await document.getElementById('prof').value;
    let tr = document.createElement('th');

    let head = "";
    let txt = `Окно №: ${cc++} (${zhsys}) <||> ${sys}/${dep}mm  `;
    tr.innerHTML = txt;
    tr.setAttribute("colspan", "3");
    document.getElementById('tb-out').append(tr);
    for (let line of zsize) {
        let th = document.createElement('tr');
        let s = await document.getElementById('s' + c).style.opacity;
        head = (s == 1) ? `<th >Створка #${c}: </th><td class='zs'>${line[0]}</td><td class='zs'>${line[1]}</tr></td>` :
            `<th >Фикса #${c}: </th><td class='zs'>${line[0]}</td><td class='zs'>${line[1]}</td>`;
        head += "</tr>"
        th.innerHTML = head;
        document.getElementById('tb-out').append(th);
        c++
    };

}