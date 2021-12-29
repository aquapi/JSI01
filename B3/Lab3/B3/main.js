import create from "prompt-sync";
import { FractionFormat } from "./Fraction.js";

const prompt = create();

const format = new FractionFormat("$ / %");

const frac1 = format.translate(
    prompt("Example fraction: 5 / 6\nEnter first fraction: ")
), frac2 = format.translate(
    prompt("Enter second fraction: ")
);

console.log(format.apply(frac1.plus(frac2)));
console.log(format.apply(frac1.minus(frac2)));
console.log(format.apply(frac1.multiply(frac2)));
console.log(format.apply(frac1.divide(frac2)));
