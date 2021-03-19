let ramastep = "step3";
let count = 3;
let rama = "x3";

function resizeWin() {

    let fon = document.getElementById("fon");
    let pravo = document.getElementById("pravo");
    let s3 = document.getElementById("s3");
    let s2 = document.getElementById("s2");
    let levo = document.getElementById("levo");
    switch (count.toString()) {
        case "3":
            fon.style.width = "375px";
            fon.src = "lib/img/fff.svg";
            s3.style.display = "block";
            s2.style.display = "block";
            levo.style.display = "block";
            pravo.style.display = "block";
            rama = "x3";
            pushButton(3);
            break;
            // return count++

        case "2":
            fon.style.width = "250px";
            fon.src = "lib/img/ff.svg";
            s2.style.display = "block";
            s3.style.display = "none";
            levo.style.display = "block";
            pravo.style.display = "none";
            rama = "x2";
            pushButton(2);
            break;
            // return count++


        case "1":
            fon.style.width = "125px";
            fon.src = "lib/img/f.svg";
            s2.style.display = "none";
            s3.style.display = "none";
            levo.style.display = "none";
            pravo.style.display = "none";
            rama = "x1";
            pushButton(1);
            break;
            // return count++

        default:
            alert(count)
            break;
            // count++

    }
}

function stepright() {
    count++;
    if (count == 4) count = 3;
    resizeWin()
}

function stepleft() {
    count--;
    if (count == 0) count = 1;
    resizeWin()
}
async function pushButton(step) {
    let button = document.getElementById("butt");
    if (step == 1) {
        button.style.left = "0px";
        ramastep = "step1"
    }
    if (step == 2) {
        button.style.left = "-74px";
        ramastep = "step2"
    }
    if (step == 3) {
        button.style.left = "-150px";
        ramastep = "step3"
    }
}

function opaopa(item) {
    if (item.style.opacity < 1) {
        item.style.opacity = 1;

    } else {
        item.style.opacity = 0

    }
}

function tt() { //@toggletype переключатель типа жалюзи
    let elem = document.getElementById('ztype');
    if (elem.textContent == "Rollite") {
        elem.textContent = "Isolite";
        elem.style.color = "white";
    } else {
        elem.style.color = "black";
        elem.textContent = "Rollite"
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

async function setgr() {
    let zcolor = await document.getElementById('zlist').value;
    let elem = document.getElementById('zgrp');
    for (let item of groupsR) {
        if (item.includes(zcolor)) elem.innerText = item[0]
    }
}