    //!расчитывает округленные размеры для поиска в таблице
    class MCeil {
        constructor(h, w) {
            this.h = +h;
            this.w = +w;
        }
        get h() {
            return this._h
        }

        set h(value) {
            this._h = (Math.ceil(value / 100)) / 10;

        }
        get w() {
            return this._w
        }

        set w(value) {
            this._w = (Math.ceil(value / 100)) / 10;
        }

        out() {
            return `${this.w} x ${this.h}`
        }

    }