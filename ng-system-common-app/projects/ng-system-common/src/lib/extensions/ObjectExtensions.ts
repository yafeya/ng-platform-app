
export function IsDefined(value: any): boolean {
    return typeof value !== 'undefined' && value !== null;
}

export function IsObject(item: any): boolean {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

export function MergeDeep(target: any, source: any): any {
    target = JSON.parse(JSON.stringify(target));
    source = JSON.parse(JSON.stringify(source));
    let output = Object.assign({}, target);
    if (IsObject(target) && IsObject(source)) {
        Object.keys(source).forEach((key: any) => {
            if (IsObject(source[key])) {
                if (!(key in target)) {
                    Object.assign(output, { [key]: source[key] });
                } else {
                    output[key] = MergeDeep(target[key], source[key]);
                }
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
}
/**
 * Clone given object
 * @param source 
 */
export function Clone(source: any): any {
    if (!source) {
        return source;
    }
    return JSON.parse(JSON.stringify(source));
}
/**
 * 
 * @param source 
 * @param target 
 */
export function CompareProperties(source: any, target: any): boolean {
    if (source === undefined && target === undefined) {
        return true;
    }
    if (Object.prototype.toString.call(source) === '[object Array]') {
        let arrayX = source as Array<any>;
        let arrayY = target as Array<any>;
        if (arrayX.length !== arrayY.length) {
            return false;
        }

        for (let index = 0; index < arrayX.length; index++) {
            console.log(arrayX[index]);
            console.log(arrayY[index]);

            if (CompareProperties(arrayX[index], arrayY[index] === false)) {
                return false;
            }
        }

    } else {
        let names = Object.getOwnPropertyNames(source);
        // console.log(names);
        for (let name of names) {
            let property = Object.getOwnPropertyDescriptor(target, name);
            if (!property) {
                return false;
            } else {
                if (Object.prototype.toString.call(source) === '[object Array]') {
                    if (CompareProperties(property.value, source[name] === false)) {
                        return false;
                    }
                } else if (property.value !== source[name] && property.value.toString() !== source[name].toString()) {
                    // console.log(`Property ${name} ${typeof property.value}: '${property.value}', '${source[name]}'`);
                    return false;
                }
            }
        }
    }
    return true;
}