import prompt from "prompts";
import { FractionFormat } from "./Fraction.js";

const format = new FractionFormat("$ / %");

console.log('Example fraction: 5 / 6');

const frac1 = format.translate(
    (await prompt({
        type: 'text',
        name: 'value',
        message: 'Enter first fraction: '
    })).value
), frac2 = format.translate(
    (await prompt({
        type: 'text',
        name: 'value',
        message: 'Enter second fraction: '
    })).value
);

frac1.alwaysSimplify = true;

console.log(format.apply(frac1.plus(frac2)));
console.log(format.apply(frac1.minus(frac2)));
console.log(format.apply(frac1.multiply(frac2)));
console.log(format.apply(frac1.divide(frac2)));
