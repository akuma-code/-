class Calcbb {
    get getmap() {
        let sizes = document.getElementsByClassName("size");
        let sizemap = new Map();
        for (const size of sizes) {
            // console.log(size.id);
            sizemap.set(`${size.id}`, `${size.value}`);
        }
        // (Array.from(sizes)).map(item => item.value)
        return (Object.fromEntries(sizemap))
    }
}

let test = new Calcbb();
console.log(test.getmap);
let foo = test.getmap;
foo;

function wait() {
    let sizes = document.getElementsByClassName("size");
    let sizemap = new Map();
    const sm = new Map(sizes);
    for (const size of sizes) {
        // console.log(size.id);
        sizemap.set(`${size.id}`, `${size.value}`);
    }
    // (Array.from(sizes)).map(item => item.value)
    return Object.fromEntries(sizemap)
}
let allsize = wait().sm;
allsize;