class __Fraction__ {
    #value = 0;
    #numerator;
    #denominator;
    #alwaysSimplify;

    /**
     * @param {number} numerator 
     * @param {number} denominator 
     */
    constructor(numerator = 1, denominator = 1) {
        if (denominator === 0)
            throw new Error("Denominator cannot equals 0");
        this.#numerator = numerator;
        this.#denominator = denominator;
        this.#value = numerator / denominator;
    }

    get numerator() {
        return this.#numerator;
    }

    get denominator() {
        return this.#denominator;
    }

    /**
     * @param {boolean} value
     */
    set alwaysSimplify(value) {
        this.#alwaysSimplify = value;
    }

    /**
     * Get the inversion of this _fraction_
     */
    get inverse() {
        return new __Fraction__(this.#denominator, this.#numerator);
    }

    /**
     * Get the value in number
     */
    get value() {
        return this.#value;
    }

    /**
     * @param {__Fraction__} e 
     */
    plus(e) {
        const res = new __Fraction__(
            this.#numerator * e.#denominator
            + e.#numerator * this.#denominator,
            this.#denominator * e.#denominator
        );
        if (this.#alwaysSimplify) 
            res.simplify();
        return res;
    }

    /**
     * @param {__Fraction__} e 
     */
    minus(e) {
        return this.plus(new __Fraction__(-e.#numerator, e.#denominator));
    }

    /**
     * @param {__Fraction__} e 
     */
    multiply(e) {
        const res = new __Fraction__(
            this.#numerator * e.#numerator,
            this.#denominator * e.#denominator
        );
        if (this.#alwaysSimplify) 
            res.simplify();
        return res;
    }

    /**
     * @param {__Fraction__} e 
     */
    divide(e) {
        return this.multiply(new __Fraction__(e.#denominator, e.#numerator));
    }

    /**
     * Simplify the _fraction_
     */
    simplify() {
        let gcd =
            /**
             * @param {number} a 
             * @param {number} b 
             * @returns {number} the result
             */
            (a, b) =>
                b === 0 ? a :
                    gcd(b, a % b);
        let div = gcd(this.#numerator, this.#denominator);
        this.#numerator /= div;
        this.#denominator /= div;
    }
}

export class FractionFormat {

    /**
     * @param {string} format 
     */
    constructor(format = "$ / %") {
        this.format = format;
    }

    /**
     * @param {__Fraction__} e 
     */
    apply(e) {
        return this.format
            .replace('$', e.numerator)
            .replace('%', e.denominator);
    }

    /**
     * @param {string} e 
     * @returns {__Fraction__}
     */
    translate(e) {
        let numerator, denominator, i, back = 0;
        for (i = 0; i < this.format.length; i++) {
            let index = 
                e.indexOf(this.format[i + 1]);
            index = index === -1 ? e.length : index;
            if (this.format[i] === "$") {
                numerator = Number(e.slice(i + back, index));
                back += index - 1 - i - back;
            }
            if (this.format[i] === "%") {
                denominator = Number(e.slice(i + back, index));
                back += index - 1 - i - back;
            }
        }
        return new __Fraction__(numerator, denominator);
    }
}

/**
 * 
 * @param  {...any} args 
 * @returns {__Fraction__}
 */
export function Fraction(...args) {
    if (!new.target) 
        return new FractionFormat().translate(args[0])
    return new __Fraction__(args[0], args[1]);
}

