let count = 1;

function resizeWin() {
    let win3 = document.getElementsByClassName("imgbox3")[0];
    let fon = document.getElementById("fon");
    let pravo = document.getElementById("pravo");
    let s3 = document.getElementById("s3");
    let s2 = document.getElementById("s2");
    let levo = document.getElementById("levo");
    console.log(count)
    switch (count.toString()) {
        case "3":
            fon.style.width = "375px";
            fon.src = "lib/img/fff.svg";
            s3.style.display = "block";
            s2.style.display = "block";
            levo.style.display = "block";
            pravo.style.display = "block";
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
            pushButton(1);
            break;
            // return count++

        default:
            alert(count)
            break;
            // count++

    }
    count++;
    if (count == 4) count = 1
}

async function pushButton(step) {
    let elem = document.getElementById("butt");
    if (step == 1) elem.style.top = "8px";
    if (step == 2) elem.style.top = "-28px";
    if (step == 3) elem.style.top = "-64px";
}

function opaopa(item) {
    if (item.style.opacity < 1) {
        item.style.opacity = 1;

    } else {
        item.style.opacity = 0

    }
}