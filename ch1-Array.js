class CustomArray {
    constructor(...arg) {
        this.length = 0;
        this.data = {};

        for (const key of arg) {
            this.data[this.length] = key;
            this.length++;
        }

        return new Proxy(this, {
            get: (target, prop) => {
                if (prop in target) {
                    return typeof target[prop] === 'function' ? target[prop].bind(target) : target[prop];
                } else if (!isNaN(prop)) {
                    return target.data[prop];
                }
            },
            set: (target, prop, value) => {
                if (!isNaN(prop)) {
                    target.data[prop] = value;
                    target.length = Math.max(target.length, Number(prop) + 1);
                    return true;
                } else {
                    target[prop] = value;
                    return true;
                }
            }
        });
    }

    push(...elements) {
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            this.data[this.length] = element;
            this.length++;
        }
        return this.length;
    }

    pop() {
        if (this.length === 0) {
            return undefined;
        }
        const lastElement = this.data[this.length - 1];
        delete this.data[this.length - 1];
        this.length--;
        return lastElement;
    }

    unshift(...elements) {
        for (let i = this.length; i > 0; i--) {
            this.data[i + elements.length] = this.data[i - 1];
        }
        for (let index = 0; index < elements.length; index++) {
            this.data[index] = elements[index];
        }
        this.length += elements.length;
        return this.length;
    }

    shift() {
        if (this.length === 0) {
            return undefined;
        }
        const firstElement = this.data[0];
        for (let i = 0; i < this.length - 1; i++) {
            this.data[i] = this.data[i + 1];
        }
        delete this.data[this.length - 1];
        this.length--;
        return firstElement;
    }

    forEach(callback) {
        for (let i = 0; i < this.length; i++) {
            callback(this.data[i], i, this);
        }
    }

    map(callback) {
        const resultMap = new CustomArray();
        for (let i = 0; i < this.length; i++) {
            resultMap.push(callback(this.data[i], i, this));
        }
        return resultMap;
    }

    filter(callback) {
        const resultFilter = new CustomArray();
        for (let i = 0; i < this.length; i++) {
            if (callback(this.data[i], i, this)) {
                resultFilter.push(this.data[i]);
            }
        }
        return resultFilter;
    }

    reduce(callback, initialValue) {
        let accumulator = initialValue;
        for (let i = 0; i < this.length; i++) {
            if (accumulator !== undefined) {
                accumulator = callback(accumulator, this.data[i], i, this);
            } else {
                accumulator = this.data[i];
            }
        }
        return accumulator;
    }
}

const arr = new CustomArray('a', 'bb', 'ccc')
console.log("new Array('a', 'bb', 'ccc') : ", arr);
arr.unshift(...[1, 3, 3])
console.log("unshift(...[1, 3, 3]) : ", arr);
arr.shift()
console.log("shift() : ", arr);
arr.push(...['가', '나', '다'])
console.log("push(...['가', '나', '다']) : ", arr);
arr.pop()
console.log("pop() : ", arr);