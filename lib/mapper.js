class Storage {
    constructor() {
        this.store = new Map()
    }
    add(block = {}) {
        return this.store.set(block.color, block.cont)
    }
    pull(color = '') {
        return this.store.get(color)
    }
    prepare(color = "", sizes = [], prices = []) {
        let block = {
            color: color,
            cont: {
                sizes: sizes,
                prices: prices
            }
        }
        return { block }
    }
}
//TODO: вывести маппер в глобальную переменную
function spy() {
    let spy = new Map();
    // if (document.getElementById('outside').textContent == "") return console.log(`#outside empty`);


    document.getElementById('calc-btn').addEventListener('mouseup', function(event) {
        spy.set(event.type, event.detail)
    })

    console.log(spy.entries);
}