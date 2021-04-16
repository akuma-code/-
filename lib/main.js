function resizeWin(wintype) {

    let fon = document.getElementById("fon");
    let w1 = document.getElementById('w1');
    let w2 = document.getElementById('w2');
    let w3 = document.getElementById('w3');
    let img = document.getElementById('imgbox');
    switch (wintype) {
        case "f":
            img.dataset.isbb = 'false';
            img.dataset.ramaStep = "1";
            // fon.dataset.ramaStep = "1";

            fon.src = "img/f.svg";
            fon.setAttribute("wintype", "f");

            fon.style.width = "125px";
            fon.style.height = "290px";

            w1.style.display = "block";
            w2.style.display = "none";
            w3.style.display = "none";
            // rama = "x1";
            break;

        case "ff":
            img.dataset.isbb = 'false';
            img.dataset.ramaStep = "2";
            // fon.dataset.ramaStep = "2";

            fon.src = "img/ff.svg";
            fon.setAttribute("wintype", "ff");

            fon.style.width = "250px";
            fon.style.height = "290px";

            w1.style.display = "block";
            w2.style.display = "block";
            w3.style.display = "none";
            break;

        case "fff":
            img.dataset.isbb = 'false';
            img.dataset.ramaStep = "3";
            // fon.dataset.ramaStep = "3";

            fon.src = "img/fff.svg";
            fon.setAttribute("wintype", "fff");

            fon.style.width = "375px";
            fon.style.top = "0px"

            fon.style.height = "290px";
            w1.style.display = "block";
            w2.style.display = "block";
            w3.style.display = "block";
            break;

        case "df":
            img.dataset.isbb = 'true';
            img.dataset.ramaStep = "4";
            // fon.dataset.ramaStep = "4";

            fon.src = "img/d-f.svg";
            fon.setAttribute("wintype", "df");

            fon.style.width = "290px";
            fon.style.height = "415px";

            w1.style.display = "block";
            w2.style.display = "block";
            w3.style.display = "none";
            break;
        case "dff":
            img.dataset.isbb = 'true';
            img.dataset.ramaStep = "5";
            // fon.dataset.ramaStep = "5";

            fon.src = "img/d-ff.svg";
            fon.setAttribute("wintype", "dff");

            fon.style.width = "400px";
            fon.style.height = "415px";
            w1.style.display = "block";
            w2.style.display = "block";
            w3.style.display = "block";
            break;
        case "fdf":
            img.dataset.isbb = 'true';
            img.dataset.ramaStep = "6";
            // fon.dataset.ramaStep = "6";

            fon.src = "img/f-d-f.svg";
            fon.setAttribute("wintype", "fdf");

            fon.style.width = "415px";
            fon.style.height = "415px";
            w1.style.display = "block";
            w2.style.display = "block";
            w3.style.display = "block";
            break;
        default:
            alert("NOT WORKS YET!! IMG Step is " + img.dataset.ramaStep + fon.wintype)
            return;

    }
}




function opaopa(item) {
    if (item.style.opacity < 1) {
        item.style.opacity = 1;
        item.dataset.isfix = 1;
    } else {
        item.style.removeProperty('opacity');
        item.dataset.isfix = 0;
    }
}

//!@toggletype переключатель типа жалюзи
async function tt() {
    let elem = document.getElementById('ztype');

    let showelems = document.getElementsByClassName("show");
    if (elem.textContent == "Rollite") {
        elem.textContent = "Isolite";
        elem.style.color = "white";
        elem.style.transform = "rotateX(0deg)";
        type = "Isolite";
        tl()
    } else {
        elem.style.color = "black";
        elem.textContent = "Rollite";
        elem.style.transform = "rotateX(360deg)";
        type = "Rollite";
        tl();
    }
    for (let el of showelems) {
        el.style.display = (type == "Isolite") ? "block" : "none";
    }
}

// !@toggledepth фильтрует список ст/п в зависимости от профиля
async function td() {
    let sys = await document.getElementById('prof').value;
    let system = SizeDB[sys];
    let elems = document.getElementsByClassName('odepth');

    for (let elem of elems) {

        if (SizeDB[sys].dpt.includes(elem.value)) {
            elem.style.display = "block";
        } else {
            elem.style.display = "none"
        }
    }
    document.getElementById('gdepth').style.opacity = 1;
    document.getElementById('gdepth').value = system.dpt[0];
}



// !@Set Group - определяет группу жалюзей #zgrp
async function setgr() {
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
//!@togglelist переключает списки выбора цвета жалюзи роллайт/изолайт
async function tl() {
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
    document.getElementById('zgrp').textContent = "";
}



function fullreset() {
    document.getElementById('outside').innerHTML = ""; // ! сброс вывода жалюзи
    document.getElementById('zlist').value = ""; //! цвет жалюзи
    document.getElementById('zgrp').innerText = ""; //! группа жалюзи
    document.getElementById('gsout').innerHTML = "";
    document.getElementById('zsout').innerHTML = "";
    document.getElementById('sysout').innerHTML = "";
    document.getElementById('zhout').innerHTML = "";
    // document.getElementById("reset").style.display = "none";

    // let sizebox = document.getElementsByClassName("size");
    // for (const currentsize of sizebox) {
    //     currentsize.value = ""
    // };
    let livesizes = document.getElementsByClassName("livesize");
    for (const livesize of livesizes) {
        livesize.innerText = ""
    };
    // ramastep = "step3";
    count = 3;
    // rama = "x3";
    type = "Isolite";
    cc = 1;
}

function reload() {
    document.getElementById('zlist').value = "Лилли Сатин"; //! цвет жалюзи
    document.getElementById('zgrp').innerText = "1"; //! группа жалюзи
    document.getElementById('ztype').textContent = "Rollite"
}