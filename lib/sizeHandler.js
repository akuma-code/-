async function gv() { //принмает размеры выдает стекла
    let h = document.getElementById("h").value;
    let w = document.getElementById("w").value;
    let l = document.getElementById("levo").value;
    let r = document.getElementById("pravo").value;
    let system = document.getElementById("prof").value;
    let lstv = document.getElementById("s1").style.opacity;
    let mstv = document.getElementById("s2").style.opacity;
    let rstv = document.getElementById("s3").style.opacity;


    let delta = Delta[system].dsize;
    // let testdelta = await Delta[system].dsize;
    // console.log(testdelta);

    let left, right, mid, hl, hr, hm;
    let dr, di, dsi, drs; //дельта рама, шмпост, импост-створка, импост-рама

    [dr, di, dsi, drs] = delta;
    // console.log(delta);
    console.log("gv()");

    if (rama == "x1") {
        //1 stvorka
        // document.getElementById("outside").innerHTML += `<b><h3>${system} / ${stp} mm</b></h3>`;

        // console.log("single");

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

        // console.log("double");

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

        // console.log("triple");

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
    let elem = document.createElement("div");
    let output = "";
    let c = 1;
    elem.className = "config";

    output += `<h3>${cc} окно &#8660 стеклопакет ${dpt}mm</h3>`;
    for (let line of text) {
        let ss = await document.getElementById('s' + c).style.opacity;
        output += `<p1><b>`;
        output += (ss == 1) ? `Створка #${c}: ` : `Фикса #${c}: `;
        output += `  </b>${line[1]} x ${line[0]}</p1>`;
        c++;
    }


    elem.innerHTML = output + "<br>";

    out.append(elem);

}

function calc() {
    document.getElementById('gdepth').style.opacity = 1;
    gv().then(
        result => {
            // configout(result);
            calcZ(result).then(
                result => filltab(result)
            )
        }
    )
}

async function calcZ(array) {
    let sys = await document.getElementById('prof').value;
    let zhsys = await document.getElementById('ztype').innerText;
    let dep = await document.getElementById('gdepth').value;
    let zh, zw, dh, dw;
    let ud = Delta[sys].dpt;
    let outarray = [];

    let dz = (zhsys == "Rollite") ? Delta[sys]["rd" + dep] : Delta[sys].idpt;
    console.log("calcZ()");

    if (!ud.includes(dep)) return alert(`В ${sys} не лезет ст/п ${dep} мм`);
    if (zhsys == "Rollite" && sys == "WHS60") return alert("Жалюзи Rollite на профиль WHS60 не ставятся!");


    [dw, dh] = dz;
    for (let line of array) {
        if (line.length == 1) continue;
        zh = line[0] - dh;
        zw = line[1] - dw;
        outarray.push([zh, zw])

    };
    // console.log(outarray);
    return outarray;

}
async function filltab(zsize) {
    console.log("filltab()");
    let c = 1;
    let zhsys = await document.getElementById('ztype').innerText;
    let dep = await document.getElementById('gdepth').value;
    let sys = await document.getElementById('prof').value;
    let zcolor = await document.getElementById('zlist').value;
    let zgrp = await document.getElementById('zgrp').innerText;
    let tr = document.createElement('th');

    let head = "";
    let txt = `${cc++})${sys}/${dep}mm&#8660;${zhsys}<br><span>${zcolor} (${zgrp})</span>`;
    tr.innerHTML = txt;
    tr.setAttribute("colspan", "3");
    document.getElementById('outside').append(tr);
    for (let line of zsize) {
        let th = document.createElement('tr');
        let ss = await document.getElementById('s' + c).style.opacity;
        head = (ss == 1) ? `<th >Створка #${c}: </th><td class='zs'>${line[0]}</td><td class='zs'>${line[1]}</tr></td>` :
            `<th >Фикса #${c}: </th><td class='zs'>${line[0]}</td><td class='zs'>${line[1]}</td>`;
        head += "</tr>"
        th.innerHTML = head;
        document.getElementById('outside').append(th);
        c++
    };

}

async function devout() {
    console.log(">>>devout()");
    let gsizes = [];
    let zsizes = [];
    let uivals = {}

    function getUIvals() {
        let props = {
            sys: document.getElementById('prof').value,
            dpt: document.getElementById('gdepth').value,
            ztype: document.getElementById('ztype').innerText,
            zcolor: document.getElementById('zlist').value,
            zgrp: document.getElementById('zgrp').innerText,
            h: document.getElementById('h').value,
            w: document.getElementById('w').value,
            l: document.getElementById('levo').value,
            p: document.getElementById('pravo').value,
        };
        Object.defineProperties(uivals, { props }); // УБРАТЬ НАХЕР, ЭТО ВСЕ ЛОМАЕТ!!
        return uivals
    }
    getUIvals();
    let div = document.createElement('div');
    div.style.width = "fit-content";
    div.innerHTML = `
<div>${uivals.sys}/${uivals.dpt}</div>
<div>Стекло  Жалюзи</div>
`
    gv().then(
        result => {
            calcZ(result).then(
                resultZ => {
                    zsizes.push(...resultZ);
                    resultZ.map((value) => {
                        div.innerHTML += `${value}<br>`
                    });
                    // resultZ.map((value, index) => {
                    //     (index % 2 == 0) ? div.innerHTML += `${value}<br>`: div.innerHTML += `${value}<br>`;
                    // });
                    console.log(`жалюзи: ${[zsizes]}`); //массив размеров жалюзей
                })
            gsizes.push(result);
            result.map((value) => {
                div.innerHTML += `<style="float='right'">${value}<br>`
            });
            console.log(`стекло: ${gsizes}`); //массив размеров стекол
        });
    document.getElementById('outside').append(div)
    console.log(`со страницы: ${Object.values(uivals)}`); //массив ключ:значение данных со страницы
    return uivals
}