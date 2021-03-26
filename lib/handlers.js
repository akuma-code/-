function showsize(gsizes) {
    let system = document.getElementById("prof").value;
    let lstv = document.getElementById("s1").style.opacity;
    let mstv = document.getElementById("s2").style.opacity;
    let rstv = document.getElementById("s3").style.opacity;
    let sizebox = document.getElementById('sizebox');
    let delta = Delta[system].dsize;
    [dr, di, dsi, drs] = delta;
    
    let size = {};

    for (let div of document.querySelectorAll('[data-livesize]')) {
        let id = div.dataset.livesize; //получаем h, w
        div.innerHTML = size[id]; //выводим размеры
    }

    return this

}