import prompt from "prompts";
import { Fraction, FractionFormat } from "./Fraction.js";

// Format
const format = new FractionFormat;

// Example 
console.log('Example fraction: 5 / 6');

// Translate the input value
const frac1 = Fraction(
    // Input value
    (await prompt({
        type: 'text',
        name: 'value',
        message: 'Enter first fraction: '
    })).value
),
    // Translate the input value
    frac2 = Fraction(
        // Input value
        (await prompt({
            type: 'text',
            name: 'value',
            message: 'Enter second fraction: '
        })).value
    );

// Always simplify after doing some calculation
frac1.alwaysSimplify = true;

// Calculations
console.log(format.apply(frac1.plus(frac2)));
console.log(format.apply(frac1.minus(frac2)));
console.log(format.apply(frac1.multiply(frac2)));
console.log(format.apply(frac1.divide(frac2)));
