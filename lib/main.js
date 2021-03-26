function resizeWin(rs) {

    let fon = document.getElementById("fon");
    let pravo = document.getElementById("pravo");
    let s3 = document.getElementById("s3");
    let s2 = document.getElementById("s2");
    let levo = document.getElementById("levo");
    // let rs = fon.getAttribute("data-rama-step");
    // // fon.setAttribute
    switch (rs) {
        case 3:
            fon.style.width = "375px";
            fon.dataset.ramaStep = 3;
            fon.src = "img/fff.svg";
            s3.style.display = "block";
            s2.style.display = "block";
            levo.style.display = "block";
            pravo.style.display = "block";
            rama = "x3";
            break;

        case 2:
            fon.dataset.ramaStep = 2;
            fon.style.width = "250px";
            fon.src = "img/ff.svg";
            s2.style.display = "block";
            s3.style.display = "none";
            levo.style.display = "block";
            pravo.style.display = "none";
            rama = "x2";
            break;


        case 1:
            fon.dataset.ramaStep = 1;
            fon.style.width = "125px";
            fon.src = "img/f.svg";
            s2.style.display = "none";
            s3.style.display = "none";
            levo.style.display = "none";
            pravo.style.display = "none";
            rama = "x1";
            break;

        default:
            alert(fon.dataset.ramaStep)
            break;

    }
}

async function stepright() {
    let rs = +document.getElementById("fon").getAttribute("data-rama-step");
    rs++;
    if (rs > 3) rs = 3;
    resizeWin(rs)
}

async function stepleft() {
    let rs = +document.getElementById("fon").getAttribute("data-rama-step");
    rs--;
    if (rs <= 0) rs = 1;
    resizeWin(rs)
}


function opaopa(item) {
    if (item.style.opacity < 1) {
        item.style.opacity = 1;
    } else {
        item.style.opacity = 0
    }
}

async function tt() { //@toggletype переключатель типа жалюзи
    let elem = document.getElementById('ztype');
    let showelems = document.getElementsByClassName("show");
    if (elem.textContent == "Rollite") {
        elem.textContent = "Isolite";
        elem.style.color = "white";
        type = "Isolite";
        tl()
    } else {
        elem.style.color = "black";
        elem.textContent = "Rollite";
        type = "Rollite";
        tl();
    }
    for (let el of showelems) {
        el.style.display = (type == "Isolite") ? "block" : "none";
    }

}

async function td() { // @toggledepth фильтрует список ст/п в зависимости от профиля
    let sys = await document.getElementById('prof').value;
    let system = Delta[sys];
    let elems = document.getElementsByClassName('odepth');

    for (let elem of elems) {

        if (Delta[sys].dpt.includes(elem.value)) {
            elem.style.display = "block";
        } else {
            elem.style.display = "none"
        }
    }
    document.getElementById('gdepth').style.opacity = 1;
    document.getElementById('gdepth').value = system.dpt[0];
}



async function setgr() { // @Set Group - определяет группу жалюзей #zgrp
    let zcolor = await document.getElementById('zlist').value;
    let elem = document.getElementById('zgrp');
    let groups = (type == "Isolite") ? groupsI : groupsR
    let korobs = document.getElementById('korob').children;
    let kr = "";
    for (let korob of korobs) {
        if (!korob.checked) continue
        else {
            kr = korob.value
        }
    }
    for (let item of groups) {
        if (item.name.includes(zcolor)) elem.innerText = item.setKat(kr)
    }
}
// @name {togglelist}
// @param(none)
// @return {new list}
// 
// 
async function tl() { //@togglelist переключает списки выбора цвета жалюзи роллайт/изолайт
    let list = document.getElementById('zhlist');
    let groups = (type == "Isolite") ? groupsI : groupsR;

    document.getElementById('zlist').value = "";
    document.getElementById('zgrp').innerText = "";
    list.innerHTML = "";


    for (let gr of groups) {
        for (let name of gr.name) {
            let option = document.createElement("option");
            option.value = name;
            list.appendChild(option)
        }
    }


}

function resetvals() {
    document.getElementById('zlist').value = "";
    document.getElementById('zgrp').innerText = "";
}

function fullreset() {
    document.getElementById('outside').innerHTML = ""; //сброс вывода жалюзи
    document.getElementById('zlist').value = ""; //цвет жалюзи
    document.getElementById('zgrp').innerText = ""; //группа жалюзи
    document.getElementById('gsout').innerHTML = "";
    document.getElementById('zsout').innerHTML = "";
    document.getElementById('sysout').innerHTML = "";
    document.getElementById('zhout').innerHTML = "";
    // document.getElementById("reset").style.display = "none";

    let sizebox = document.getElementsByClassName("size");
    for (const currentsize of sizebox) {
        currentsize.value = ""
    };
    // ramastep = "step3";
    count = 3;
    rama = "x3";
    type = "Isolite";
    cc = 1;
}