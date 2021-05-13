function gonow() {
    let wt = document.getElementById('fon').getAttribute('wintype');
    document.getElementById('reset').style.display = "block";

    let glasses = new MainSelector()[wt]();
    let out = new Outputer();
    let pricer = new PriceCalculator();

    let zh = applyZs(glasses);
    let prices = pricer.calc(zh);
    let box = zbox(zh, prices);

    store.set(box.key, box.data);
    // let str = Object.fromEntries(store)
    console.log(`Store elements: ${store.size}`);
    console.log(`Стекла: ${glasses}`);
    stylelog(`Жалюзи: ${zh}`);
    stylelog(`Price: ${prices}`)
    return out.toDiv(zh);
}




function resetvals() {
    document.getElementById('zlist').value = "";
    document.getElementById('zgrp').textContent = "";
}



function fullreset() {
    document.getElementById('outside').innerHTML = ""; // ! сброс вывода жалюзи
    document.getElementById('zlist').value = ""; //! цвет жалюзи
    document.getElementById('zgrp').innerText = ""; //! группа жалюзи
    document.getElementById("reset").style.display = "none";
    // document.getElementById('gsout').innerHTML = "";
    // document.getElementById('zsout').innerHTML = "";
    // document.getElementById('sysout').innerHTML = "";
    // document.getElementById('zhout').innerHTML = "";

    // let sizebox = document.getElementsByClassName("size");
    // for (const currentsize of sizebox) {
    //     currentsize.value = ""
    // };

}

function reload() {
    td();
    tl()
        // td();
        // document.getElementById('zlist').value = "Лилли Сатин"; //! цвет жалюзи
        // document.getElementById('zgrp').innerText = "1"; //! группа жалюзи
        // document.getElementById('ztype').textContent = "Rollite"
}