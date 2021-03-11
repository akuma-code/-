async function gv() { //принмает размеры выдает стекла
    let h = await document.getElementById("h").value;
    let w = await document.getElementById("w").value;
    let l = await document.getElementById("levo").value;
    let r = await document.getElementById("pravo").value;
    let system = await document.getElementById("prof").value;
    let lstv = await document.getElementById("s1").style.opacity;
    let mstv = await document.getElementById("s2").style.opacity;
    let rstv = await document.getElementById("s3").style.opacity;


    let delta = [];

    let left, right, mid, hl, hr, hm;
    let dr, di, dsi, drs; //дельта рама, шмпост, импост-створка, импост-рама

    if (system == "Proline") delta = [48, 26.5, 74.5, 96];

    if (system == "Softline") delta = [51, 25.5, 76.5, 102];

    if (system == 'Euroline') delta = [54, 28, 84.5, 110.5];

    if (system == 'Premium82') delta = [58, 32, 78, 104];

    if (system == 'BasePlus') delta = [50, 27, 76, 99];

    if (system == 'Lux') delta = [55, 27, 79, 109];

    if (system == 'Optima') delta = [55, 24.5, 79, 109];

    if (system == 'Termoplus') delta = [55, 27, 76, 104];

    if (system == 'WHS72') delta = [45, 25.5, 74.5, 95];

    if (system == 'WHS60') delta = [44, 23.5, 71.5, 92];

    [dr, di, dsi, drs] = delta;


    if (rama == "x1") {
        //1 stvorka
        document.getElementById("outside").innerHTML += `<p1><strong>single, system: ${system}</strong></p1><br>`;

        console.log("single");
        left = (!lstv) ? w - 2 * dr : w - 2 * drs;
        right = 0;
        mid = 0;
        hl = (!lstv) ? h - 2 * dr : h - 2 * drs;
        return [
            [hl, left]
        ]
    };
    if (rama == "x2") {
        // 2 stvorki
        document.getElementById("outside").innerHTML += `<p1><strong>double, system: ${system}</strong></p1><br>`;

        console.log("double");
        left = (!lstv) ? Math.floor(l - dr - di) : Math.floor(l - drs + dsi);
        hl = (!lstv) ? h - 2 * dr : h - 2 * drs;
        right = (!mstv) ? Math.floor(w - l - dr - di) : Math.floor(w - l - dsi - drs);
        hr = (!mstv) ? h - 2 * dr : h - 2 * drs;
        mid = 0;
        return [
            [hl, left],
            [hr, right]
        ]
    };

    if (rama == "x3") {
        //3 stvorki
        document.getElementById("outside").innerHTML += `<p1><strong>triple, system: ${system}</strong></p1><br>`;


        console.log("triple");
        left = (!lstv) ? Math.floor(l - dr - di) : Math.floor(l - drs - dsi);
        hl = (!lstv) ? Math.floor(h - 2 * dr) : Math.floor(h - 2 * drs);
        right = (!rstv) ? Math.floor(r - dr - di) : Math.floor(r - drs - dsi);
        hr = (!rstv) ? Math.floor(h - 2 * dr) : Math.floor(h - 2 * drs);
        mid = (!mstv) ? w - l - r - di * 2 : w - l - r - dsi * 2;
        hm = (!mstv) ? h - 2 * dr : h - 2 * drs;
        return [
            [hl, left],
            [hr, right],
            [hm, mid],
        ]
    };

}

async function configout(text) {
    let out = document.getElementById("outside");
    let elem = await document.createElement("div");
    let output = "";
    let c = 1;
    elem.className = "config"

    for (let line of text) {
        let s = await document.getElementById('s' + c).style.opacity;
        console.log(line);

        output += `<p1><b>`;
        output += (s == 1) ? `Створка #${c}: ` : `Фикса #${c}: `;
        output += `  </b>H = ${line[0]}mm, W = ${line[1]}mm<br></p1>`;
        c++;
    }
    elem.innerHTML = output;
    out.append(elem)

}

function calc() {
    gv().then(
        result => configout(result)
    )
}