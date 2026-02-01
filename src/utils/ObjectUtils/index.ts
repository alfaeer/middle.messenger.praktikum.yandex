
export const isEquals = (first: CustomObject, second: CustomObject): boolean => {
    function isPlainObject(value: unknown): value is CustomObject {
        return typeof value === 'object'
            && value !== null
            && value.constructor === Object
            && Object.prototype.toString.call(value) === '[object Object]';
    }

    function isArray(value: unknown): value is [] {
        return Array.isArray(value);
    }

    function isArrayOrObject(value: unknown): value is [] | CustomObject {
        return isPlainObject(value) || isArray(value);
    }

    function isEqual(lhs: CustomObject, rhs: CustomObject) {
        if (Object.keys(lhs).length !== Object.keys(rhs).length) {
            return false;
        }

        for (const [key, value] of Object.entries(lhs)) {
            const rightValue = rhs[key];
            if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
                if (isEqual(value, rightValue)) {
                    continue;
                }
                return false;
            }

            if (value !== rightValue) {
                return false;
            }
        }

        return true;
    }

    return isEqual(first, second);
}

type CloneTypes<T extends object = object> = T | Date | Set<unknown> | Map<unknown, unknown> | object | T[];

export const cloneDeep = <T extends object = object>(obj: T) => {
    return (function _cloneDeep(item: T): CloneTypes<T> {
        // Handle:
        // * null
        // * undefined
        // * boolean
        // * number
        // * string
        // * symbol
        // * function
        if (item === null || typeof item !== "object") {
            return item;
        }

        // Handle:
        // * Date
        if (item instanceof Date) {
            return new Date(item.valueOf());
        }

        // Handle:
        // * Array
        if (item instanceof Array) {
            let copy: unknown[] = [];

            item.forEach((_, i) => (copy[i] = _cloneDeep(item[i])));

            return copy;
        }

        // Handle:
        // * Set
        if (item instanceof Set) {
            let copy = new Set();

            item.forEach(v => copy.add(_cloneDeep(v)));

            return copy;
        }

        // Handle:
        // * Map
        if (item instanceof Map) {
            let copy = new Map();

            item.forEach((v, k) => copy.set(k, _cloneDeep(v)));

            return copy;
        }

        // Handle:
        // * Object
        if (item instanceof Object) {
            let copy: CustomObject = {};

            // Handle:
            // * Object.symbol
            // @ts-ignore
            Object.getOwnPropertySymbols(item).forEach(s => (copy[s] = _cloneDeep(item[s])));

            // Handle:
            // * Object.name (other)
            // @ts-ignore
            Object.keys(item).forEach(k => (copy[k] = _cloneDeep(item[k])));

            return copy;
        }

        throw new Error(`Unable to copy object: ${item}`);
    })(obj);
}
