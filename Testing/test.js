async function gv() {
    let h = await document.getElementById("h").value;
    let w = await document.getElementById("w").value;
    let l = await document.getElementById("levo").value;
    let r = await document.getElementById("pravo").value;
    let system = await document.getElementById("prof").value;
    let lstv = await document.getElementById("s1").style.opacity;
    let mstv = await document.getElementById("s2").style.opacity;
    let rstv = await document.getElementById("s3").style.opacity;

    function consumeValues() {
        let left, right, mid;
        let dr, drs, di, dsi;
        if (system == "Proline") {
            dr = 48;
            di = 26.5;
            dsi = 74.5;
            drs = 96;
        };
        if (system == "Softline") {
            dr = 51;
            di = 25.5;
            dsi = 76.5;
            drs = 102;
        };

        if (system == 'Euroline') {
            dr = 54;
            di = 28;
            dsi = 84.5;
            drs = 110.5;
        };

        if (system == 'Premium82') {
            dr = 58;
            di = 32;
            dsi = 78;
            drs = 104;
        };

        if (system == 'BasePlus') {
            dr = 50;
            di = 27;
            dsi = 76;
            drs = 99;
        };

        if (system == 'Lux') {
            dr = 55; //дельта рама
            di = 27; //дельта импост
            dsi = 79; //дельта импост-створка
            drs = 109; // дельта рама-створка
        };
        if (system == 'Optima') {
            dr = 55; //дельта рама
            di = 24.5; //дельта импост
            dsi = 79; //дельта импост-створка
            drs = 109; // дельта рама-створка
        };
        if (system == 'Termoplus') {
            dr = 55; //дельта рама
            di = 27; //дельта импост
            dsi = 76; //дельта импост-створка
            drs = 104; // дельта рама-створка

        };
        if (system == 'WHS72') {
            dr = 45; //дельта рама
            di = 24.5; //дельта импост
            dsi = 74.5; //дельта импост-створка
            drs = 95; // дельта рама-створка
        };

        if (system == 'WHS60') {
            dr = 44; //дельта рама
            di = 23.5; //дельта импост
            dsi = 71.5; //дельта импост-створка
            drs = 92; // дельта рама-створка
        };


        if (l && r) {
            //3 stvorki
            left = (!lstv) ? l - dr - di : l - (drs + dsi);
            right = (!rstv) ? r - dr - di : r - drs - dsi;
            mid = (!mstv) ? w - di * 2 : w - dsi * 2;
        };
        if (!r) {
            // 2 stvorki
            left = (!lstv) ? l - dr - di : l - (drs + dsi);
            right = (!lstv) ? w - l - dr - di : w - l - dsi - drs;
            mid = 0;
        };

        if (!l && !r) {
            //1 stvorka
            left = (!lstv) ? w - 2 * dr : w - 2 * drs;
            right = 0;
            mid = 0;
        };


    }
    // left = (lstv == 0) ? l - dr - di : l - drs - dsi;
    // right = (rstv == 0) ? r - dr - di : r - drs - dsi;
    // mid = (mstv == 0) ? mid - di * 2 : mid - dsi * 2;



    return [
        [system],
        [h, left, (lstv)],
        [h, mid, (mstv)],
        [h, right, (rstv)]
    ]

}

function out() {
    gv().then(
        result => {
            for (let item of result) {
                console.log(item);
            }
        })
}