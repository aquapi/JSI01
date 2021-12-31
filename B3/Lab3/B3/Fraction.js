class Fraction {
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
        return new Fraction(this.#denominator, this.#numerator);
    }

    /**
     * Get the value in number
     */
    get value() {
        return this.#value;
    }

    /**
     * @param {Fraction} e 
     */
    plus(e) {
        const res = new Fraction(
            this.#numerator * e.#denominator
            + e.#numerator * this.#denominator,
            this.#denominator * e.#denominator
        );
        if (this.#alwaysSimplify)
            res.simplify();
        return res;
    }

    /**
     * @param {Fraction} e 
     */
    minus(e) {
        return this.plus(new Fraction(-e.#numerator, e.#denominator));
    }

    /**
     * @param {Fraction} e 
     */
    multiply(e) {
        const res = new Fraction(
            this.#numerator * e.#numerator,
            this.#denominator * e.#denominator
        );
        if (this.#alwaysSimplify)
            res.simplify();
        return res;
    }

    /**
     * @param {Fraction} e 
     */
    divide(e) {
        return this.multiply(new Fraction(e.#denominator, e.#numerator));
    }

    /**
     * Simplify the fraction
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

    toString() {
        return this.#numerator + " / " + this.#denominator;
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
     * @param {Fraction} e 
     */
    apply(e) {
        return this.format
            .replace('$', e.numerator)
            .replace('%', e.denominator);
    }

    /**
     * @param {string} e 
     * @returns {Fraction}
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
        return new Fraction(numerator, denominator);
    }
}

/**
 * 
 * @param  {...any} args 
 * @returns {Fraction}
 */
export default function (...args) {
    if (!new.target)
        return new FractionFormat().translate(args[0])
    return new Fraction(args[0], args[1]);
}

