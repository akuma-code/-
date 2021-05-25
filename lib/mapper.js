//TODO: вывести маппер в глобальную переменную

const Store = new Map();
let count = 1;
/**
 * 
 * @param {array} sizes массив размеров жалюзей
 * @param {array} prices массив цен на жалюзи
 * @returns {object} объект для записи в БД store
 */
function toStore(sizes = [], prices = []) {
    const $ztype = document.getElementById('ztype');
    const $color = document.getElementById('zlist');
    const $grp = document.getElementById('zgrp');

    const sum = prices.reduce((a, b) => a + b);
    // console.log(`Current sum: ${ sum }`);

    function counter() {
        return `${$ztype.innerText}_${count++}`
    }

    return {
        key: counter(),
        data: {
            // type: $ztype.innerText,
            col: $color.value,
            grp: $grp.innerText,
            size: sizes,
            price: prices,
            full_price: sum
        }
    }
}


//! доделать!
function showStored(store = Store) {
    const $calc = document.getElementById('rs__calc');
    const obj = Object.fromEntries(store);
    let div = document.createElement('div');
    div.innerHTML = `
${obj}
`



    $calc.insertAdjacentHTML("afterend", Store.entries());
}