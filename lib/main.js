function resizeWin() {

    let fon = document.getElementById("fon");
    let pravo = document.getElementById("pravo");
    let s3 = document.getElementById("s3");
    let s2 = document.getElementById("s2");
    let levo = document.getElementById("levo");
    switch (count.toString()) {
        case "3":
            fon.style.width = "375px";
            fon.src = "img/fff.svg";
            s3.style.display = "block";
            s2.style.display = "block";
            levo.style.display = "block";
            pravo.style.display = "block";
            rama = "x3";
            // pushButton(3);
            break;
            // return count++

        case "2":
            fon.style.width = "250px";
            fon.src = "img/ff.svg";
            s2.style.display = "block";
            s3.style.display = "none";
            levo.style.display = "block";
            pravo.style.display = "none";
            rama = "x2";
            // pushButton(2);
            break;
            // return count++


        case "1":
            fon.style.width = "125px";
            fon.src = "img/f.svg";
            s2.style.display = "none";
            s3.style.display = "none";
            levo.style.display = "none";
            pravo.style.display = "none";
            rama = "x1";
            // pushButton(1);
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

async function tt() { //@toggletype переключатель типа жалюзи
    let elem = document.getElementById('ztype');
    let showelems = document.getElementsByClassName("show");
    if (elem.textContent == "Rollite") {
        elem.textContent = "Isolite";
        elem.style.color = "white";
        type = "Isolite";
        tl()
            // elem.oninput = setgrI();
    } else {
        elem.style.color = "black";
        elem.textContent = "Rollite";
        // elem.oninput = setgrR();
        // korobDisplay = "none";
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
    let sizebox = document.getElementsByClassName("size");
    for (const currentsize of sizebox) {
        currentsize.value = ""
    }
}