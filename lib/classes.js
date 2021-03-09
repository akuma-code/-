async function getsizes() {
    let box = [];
    let sizebox = document.getElementById("sizebox");
    console.log(`>>>get running`);
    for (let size of sizebox.children) {
        box.push(await size.value);
        console.log(await size.value);
    }


    let p = box[1];
    let l = box[0];
    let h = box[2];
    let w = box[3];
    return [h, w, l, p]

    // await w.value
}

function calc() {
    console.log(`>>>calc starting`);
    getsizes().then(
        function(result) {
            let one, two, three;
            console.log(`>>>getting base ramas sizes running`);
            let r = result[1] - result[2];
            let middle = result[1] - result[2] - result[3];
            if (result[3] == 0 && result[2] == 0) {
                console.log(`height=${result[0]} width=${result[1]}`);
                one = {
                    h: result[0],
                    w: result[1],
                }
                return one
            }
            if (result[3] == 0) {
                console.log(`height=${result[0]} width=${result[1]} left=${result[2]} right=${r}`);
                one = {
                    h: result[0],
                    l: result[2],
                }
                two = {
                    h: result[0],
                    r: result[1] - result[2]
                }

                return [one, two]
            }
            if (result[3] !== 0 && result[2] !== 0) {
                console.log(`height=${result[0]} width=${result[1]} left=${result[2]} middile = ${middle} right=${result[3]}`);
                one = {
                    h: result[0],
                    l: result[2],
                }
                two = {
                    h: result[0],
                    m: result[1] - result[2] - result[3],
                }
                three = {
                    h: +result[0],
                    r: result[1] - result[2]

                }
                return [one, two, three]
            }

        }
    )
}

async function isFixa(id) {
    let fix = document.getElementById(`${id}`).style;

    if (fix.opacity == "0") { return true } else { return false }
}

function getdelta() {
    let result = isFixa(`s1`);
    (result == true) ? console.log(result): console.log(`false`);
}