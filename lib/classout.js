class Output {
    constructor(system, gdepth, ztype, zcolor, zgroup, korob, gsizes, zsizes) {
        this.system = system;
        this.gdepth = gdepth;
        this.ztype = ztype;
        this.color = zcolor;
        this.zgroup = zgroup;
        this.zsizes = zsizes;
        this.gsizes;
        this.korob = korob;

    }

    get gsizes() {
        return this._gsizes
    }

    set gsizes([value]) {

        gsizes = value
    }

    allout() {
        return `${this.system}`
    }
}

function setout() {
    return new Output(gv()).gsizes
}