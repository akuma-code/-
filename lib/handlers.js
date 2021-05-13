function addListener() { //добавляет на поля ввода размеров возможность считать по нажатию ентера
    let sizes = document.getElementsByClassName("size");
    for (let size of sizes) {
        size.addEventListener("keyup", function(event) {
            if (event.keyCode === 13 && (event.ctrlKey || event.altKey)) {
                event.preventDefault();
            };

            if (event.keyCode === 13) {

                event.preventDefault();
                document.getElementById("calc-btn").focus();
                document.getElementById("calc-btn").click();
            }
        });
        size.addEventListener('mouseup', function(event) {
            event.preventDefault();
            this.value = "";
        })
    };
    let door = document.getElementById('sd');
    const imp = document.getElementById('himp');
    door.addEventListener("click", function() {
        imp.style.display = (door.dataset.isfix == "0") ? "block" : "none";

    });

    //     let side = document.getElementById('cfgbox');
    //     let defwin = [607, 607, 1400, 1800, 1440, 1440, 800];
    //     let defbb = [700, 700, 2100, 690, 1400, 1400, 800];
    //     side.addEventListener("click", function(event) {
    //         event.preventDefault();
    //         let isbb = document.getElementById('imgbox').dataset.isbb;
    //         if (isbb == "false") {
    //             document.getElementById('himp').style.display = "none";
    //             for (let i = 0; i < sizes.length; i++) {
    //                 sizes[i].value = defwin[i]
    //             };
    //         };
    //         if (isbb == "true") {
    //             for (let i = 0; i < sizes.length; i++) {
    //                 sizes[i].value = defbb[i]
    //             };
    //         }
    // });



}