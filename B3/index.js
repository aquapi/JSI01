// @ts-check
/**
 * @param {any} obj 
 */
const getWrapper =
    (obj) => {
        if (typeof obj === 'string')
            return String;
        if (typeof obj === 'number')
            return Number;
        if (typeof obj === 'boolean')
            return Boolean;
        if (typeof obj === 'object')
            return Object;
        throw new Error("Invalid type");
    }
/**
 * @param {any | object} type 
 * @param {any | object} obj 
 */
const checkType = (type, obj) => {
    let Wrapper = getWrapper(obj);
    if (typeof type === 'function')
        return Wrapper === type ?? obj instanceof type;
    for (let e in type) {
        if (!checkType(type[e], obj[e])) return false;
    }
    return true;
}

/**
 * @param {object} schema 
 * @returns 
 */
const TypeChecker = class {
    /**
     * @param {object} schema 
     */
    constructor(schema) {
        return class {
            /**
             * @param {object} obj 
             * @returns 
             */
            constructor(obj) {
                for (const e in schema) {
                    if (!checkType(schema[e], obj[e]))
                        throw new Error("Invalid object");
                }
                for (const e in obj) {
                    if (!checkType(schema[e], obj[e]))
                        throw new Error("Invalid object");
                }
                return obj;
            }
        }
    }
}

// New type checker
let User = new TypeChecker({
    name: String,
    password: String
});

// @ts-ignore
let sample = new User({
    name: "Reve",
    password: "983hgnv"
});

// Log the user object
console.log(sample);