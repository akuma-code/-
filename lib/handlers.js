function showsize() {

    for (let div of document.querySelectorAll('[data-livesize]')) {
        let id = div.dataset.livesize; //получаем h, w

        div.innerHTML = (Array.from(id.split("")).includes("H")) ? "h: " + winsize[id] : "w: " + winsize[id]; //выводим размеры
        if (div.innerHTML == "undefined") div.innerHTML = "";

    }

    return winsize

}

function addListener() { //добавляет на поля ввода размеров возможность считать по нажатию ентера
    let sizes = document.getElementsByClassName("size");
    for (let size of sizes) {
        size.addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("calc-btn").focus();
                document.getElementById("calc-btn").click();
            }
        })
    }
}