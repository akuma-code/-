function gonow() {
    let wt = document.getElementById('fon').getAttribute('wintype');
    document.getElementById('reset').style.display = "block";
    let disc = document.getElementById('discount').value;

    let glasses = new MainSelector()[wt]();
    let out = new Outputer();
    let pricer = new PriceCalculator();

    let zh = applyZs(glasses);
    let prices = pricer.calc(zh);
    let box = zbox(zh, prices);
    let sum = prices.reduce((prev, current) => current + prev)
    if (store.has('summ')) {
        let temp = store.get('summ') + sum;
        store.set('summ', temp);
    } else { store.set('summ', sum) }

    store.set(box.key, box.data);
    console.log(`Стекла: ${glasses}`);
    console.log(`Жалюзи: ${zh}`);
    stylelog(`Price: ${prices}
Summary: ${sum} rub`);
    out.toDiv(zh);
    document.getElementById('calc-btn').innerHTML = `${Math.ceil(store.get("summ") * (1-disc/100))} руб.`;
    document.getElementById('outside').insertAdjacentHTML('beforeend', `<div class="summ">Скидка ${disc}%: <b>${Math.round(sum*(1-disc/100))} руб.</b></div> `);
    return console.log(`Stored elements: ${store.size - 1}`);
}

function calcThis() {
    const $w = document.querySelector('#rs__calc > input.rs_calc_w.rs_size');
    const $h = document.querySelector('#rs__calc > input.rs_calc_h.rs_size');
    const $color = document.getElementById('zlist').value;
    const $disc = 1 - document.getElementById('discount').value / 100;
    const calc = new PriceCalculator();
    let output = document.getElementById('calc_res');
    output.insertAdjacentHTML("beforeend", `<div class="rs_out">${$w.value} x ${$h.value} ::: ${calc.type}</div>`);
    output.insertAdjacentHTML("beforeend", `<div class="rs_out bb"><b>${$color} :::  ${Math.round(calc.calcIt($w.value, $h.value)*$disc)} руб.</b></div>`);
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
    tl();
    tt();
    // td();
    // document.getElementById('zlist').value = "Лилли Сатин"; //! цвет жалюзи
    // document.getElementById('zgrp').innerText = "1"; //! группа жалюзи
    // document.getElementById('ztype').textContent = "Rollite"
}