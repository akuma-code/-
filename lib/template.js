let tmpl = `
    <div class="cont">
        <!--*контейнер для кнопок право-лево, картинки рамы и створок, ввод размеров-->
        <div class="pnbtn prev" onclick="stepleft()">&#9194;</div>
        <div class="pnbtn next" onclick="stepright()">&#9193;</div>
        <div class="imgbox anim" id="imgbox">
            <img src="img/fff.svg" alt="nope" class="x3 anim" id="fon" data-rama-step="3">
            <img src="img/s1.svg" alt="nope" class="x1 s1 anim" id="s1" onclick="opaopa(s1)">
            <img src="img/s2.svg" alt="nope" class="x1 s2 anim" id="s2" onclick="opaopa(s2)">
            <img src="img/s3.svg" alt="nope" class="x1 s3 anim" id="s3" onclick="opaopa(s3)">

            <div class="sizebox" id="sizebox">
                <input type="text" tabindex="3" class="size" name="sizes" id="levo" min="0" placeholder="лево" autocomplete="on" value="600">
                <input type="text" tabindex="4" class="size" name="sizes" id="pravo" min="0" placeholder="право" autocomplete="on" value="600">
                <input type="text" tabindex="1" class="size" name="sizes" id="h" min="0" placeholder="высота" autocomplete="on" value="1400">
                <input type="text" tabindex="2" class="size" name="sizes" id="w" min="0" placeholder="ширина" autocomplete="on" value="1800">
            </div>

        </div>
        <div class="wrapper">
            <!--обертка для риалтайм размеров-->
            <div class="w1 abs" id="w1">
                <div class="livesize" data-livesize="WL"></div>
                <div class="livesize" data-livesize="HL"></div>
            </div>
            <div class="w2 abs" id="w2">
                <div class="livesize" data-livesize="WM"></div>
                <div class="livesize" data-livesize="HM"></div>
            </div>
            <div class="w3 abs" id="w3">
                <div class="livesize" data-livesize="WR"></div>
                <div class="livesize" data-livesize="HR"></div>
            </div>
        </div>

        <div class="current">
            <div id="outside">
            </div>
        </div>
    </div>
  `;

async function showside() {

    // let txt = document.getElementById('win-cont');
    let elem = document.createElement('div');
    elem.innerHTML = tmpl;
    document.getElementById('cfgbox').after(elem)
}