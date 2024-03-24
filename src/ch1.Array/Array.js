"use strict";
//Generic을 통해 type이 지정가능한 배열 생성 class
class CustomArray {
    // 외부에서 접근 가능한 public 변수
    length;
    // method를 통해서만 접근 가능한 private 변수
    data;
    // 생성자
    constructor(...arg) {
        this.length = 0;
        this.data = {};
        for (const key of arg) {
            this.data[this.length] = key;
            this.length++;
        }
        // Proxy 객체를 통해 getter와 setter 관리
        return new Proxy(this, {
            get: (target, prop) => {
                if (typeof prop === 'string' || typeof prop === 'symbol') {
                    const value = target[prop];
                    if (typeof value === 'function') {
                        return value.bind(target);
                    }
                    return value;
                }
            },
            set: (target, prop, value) => {
                const propNum = Number(prop);
                if (!isNaN(propNum)) {
                    target.data[propNum] = value;
                    target.length = Math.max(target.length, propNum + 1);
                    return true;
                }
                else {
                    target[prop] = value;
                    return true;
                }
            }
        });
    }
    // push 메소드
    // 입력받은 값을 배열의 마지막에 추가하는 함수
    push(...elements) {
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            this.data[this.length] = element;
            this.length++;
        }
        return this.length;
    }
    // pop 메소드
    // 배열의 마지막 값을 return하고 제거하는 함수
    pop() {
        if (this.length === 0) {
            return undefined;
        }
        const lastElement = this.data[this.length - 1];
        delete this.data[this.length - 1];
        this.length--;
        return lastElement;
    }
    // unshift 메소드
    // 입력받은 값을 배열의 맨 앞에 추가하는 함수
    unshift(...elements) {
        for (let i = this.length - 1; i >= 0; i--) {
            this.data[i + elements.length] = this.data[i];
        }
        for (let index = 0; index < elements.length; index++) {
            this.data[index] = elements[index];
        }
        this.length += elements.length;
        return this.length;
    }
    // shift 메소드
    // 배열의 맨 앞의 값을 return 하고 제거하는 함수
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
    // forEach 메소드
    // 배열을 순회하며 입력받은 callback을 실행하는 함수
    forEach(callback) {
        for (let i = 0; i < this.length; i++) {
            callback(this.data[i], i, this);
        }
    }
    // map 메소드
    // 배열을 순회하며 입력받은 callback대로 각 데이터를 변경하는 함수
    map(callback) {
        const resultMap = new CustomArray();
        for (let i = 0; i < this.length; i++) {
            resultMap.push(callback(this.data[i], i, this));
        }
        return resultMap;
    }
    // filter 메소드
    // 배열을 순회하며 callback 함수의 결과가 true인 데이터만 남기는 함수
    filter(callback) {
        const resultFilter = new CustomArray();
        for (let i = 0; i < this.length; i++) {
            if (callback(this.data[i], i, this)) {
                resultFilter.push(this.data[i]);
            }
        }
        return resultFilter;
    }
    // reduce 메소드
    // callback과 기본값을 입력받아 결과값에 할당한 뒤 배열을 순회하며
    // 이전 회차의 값과 현재 데이터를 callback을 통해 연산한 결과값을 결과에 할당하는 함수
    reduce(callback, initialValue) {
        let accumulator = initialValue;
        for (let i = 0; i < this.length; i++) {
            if (accumulator !== undefined) {
                accumulator = callback(accumulator, this.data[i], i, this);
            }
            else {
                accumulator = this.data[i];
            }
        }
        return accumulator;
    }
    // toString
    // 배열을 String으로 변환하는 함수
    toString() {
        return String(this);
    }
    // toLocaleString
    // 배열 데이터중 Date객체가 있으면 toLocaleString 함수를 적용후
    // 배열을 String으로 변환하는 함수
    toLocaleString(locale, option = {}) {
        const resultMap = new CustomArray();
        for (let i = 0; i < this.length; i++) {
            if (this.data[i] instanceof Date) {
                resultMap.push(this.data[i].toLocaleString(locale, option));
            }
            else {
                resultMap.push(this.data[i]);
            }
        }
        return resultMap;
    }
    // concat
    // 배열과 배열을 합쳐주는 함수
    concat(...arrays) {
        const result = new CustomArray();
        // Add all elements of the current CustomArray
        for (let i = 0; i < this.length; i++) {
            result.push(this.data[i]);
        }
        for (let arrayIndex = 0; arrayIndex < arrays.length; arrayIndex++) {
            const currentArray = arrays[arrayIndex];
            // Check if current array is CustomArray and add its elements
            if (currentArray instanceof CustomArray) {
                for (let i = 0; i < currentArray.length; i++) {
                    result.push(currentArray.data[i]);
                }
            }
            // If it's a regular array, add its elements
            else if (Array.isArray(currentArray)) {
                for (let i = 0; i < currentArray.length; i++) {
                    result.push(currentArray[i]);
                }
            }
        }
        return result;
    }
    ;
    // join
    // 입력받은 구분자로 배열 데이터를 이은 후 String으로 반환해주는 함수
    join(separator = ',') {
        let result = '';
        for (let index = 0; index < this.length; index++) {
            result += this.data[index];
            if (index < this.length - 1) {
                result += separator;
            }
        }
        return result;
    }
    // reverse
    // 배열의 순서를 뒤집은 결과를 return 해주는 함수
    // Array.reverse는 배열에 영향을 줌
    // 구현은 toReverse와 같은 기능으로 함
    reverse() {
        const result = new CustomArray();
        for (let i = this.length - 1; i >= 0; i--) {
            result.push(this.data[i]);
        }
        return result;
    }
    ;
    // slice
    // 시작 index과 종료 index를 입력받아서
    // 배열의 일부를 return하는 함수
    slice(start, end) {
        const result = new CustomArray();
        if (start === undefined) {
            for (let i = 0; i < this.length; i++) {
                result.push(this.data[i]);
            }
        }
        else {
            for (let i = start; i < this.length; i++) {
                if (end === i) {
                    break;
                }
                result.push(this.data[i]);
            }
        }
        return result;
    }
    ;
    // sort
    // 배열 내부데이터를 정렬하는 함수
    // 정렬 방식은 Bubble sort를 활용
    sort(compareFn) {
        if (!compareFn) {
            throw new Error('A comparison function must be provided.');
        }
        for (let i = 0; i < this.length - 1; i++) {
            for (let j = 0; j < this.length - i - 1; j++) {
                if (compareFn(this.data[j], this.data[j + 1]) > 0) {
                    // Swap elements
                    const temp = this.data[j];
                    this.data[j] = this.data[j + 1];
                    this.data[j + 1] = temp;
                }
            }
        }
        return this;
    }
    ;
    // /**
    //  * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
    //  * @param start The zero-based location in the array from which to start removing elements.
    //  * @param deleteCount The number of elements to remove.
    //  * @returns An array containing the elements that were deleted.
    //  */
    splice(start, deleteCount) {
        const result = new CustomArray();
        const end = deleteCount ?? this.length - 1 - start;
        for (let index = start; index < end; index++) {
            result.push(this.data[index]);
        }
        return result;
    }
    ;
    // /**
    //  * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
    //  * @param start The zero-based location in the array from which to start removing elements.
    //  * @param deleteCount The number of elements to remove.
    //  * @param items Elements to insert into the array in place of the deleted elements.
    //  * @returns An array containing the elements that were deleted.
    //  */
    // splice(start: number, deleteCount: number, ...items: T[]): T[];
    // /**
    //  * Inserts new elements at the start of an array, and returns the new length of the array.
    //  * @param items Elements to insert at the start of the array.
    //  */
    // indexOf
    // 배열에서 입력받은 값이 몇번째 index에 존재하는지 확인하는 함수
    indexOf(searchElement, fromIndex) {
        const start = fromIndex ?? 0;
        for (let index = start; index < this.length; index++) {
            const element = this.data[index];
            if (element === searchElement) {
                return this.length - index;
            }
        }
        return -1;
    }
    // indexOf
    // 배열에서 입력받은 값이 몇번째 index에 존재하는지 확인하는 함수
    lastIndexOf(searchElement, fromIndex) {
        const from = fromIndex ?? this.length;
        for (let index = from; index >= 0; index--) {
            const element = this.data[index];
            if (element === searchElement) {
                return index;
            }
        }
        return -1;
    }
    ;
    // some
    // 배열을 순회하며 입력받은 callback을 실행하여 모든 값이 truthy 를 return 받는지 확인하는 함수
    every(predicate, thisArg) {
        if (!predicate) {
            throw new Error('A predicate function must be provided.');
        }
        for (let index = 0; index < this.length; index++) {
            const condition = predicate(this.data[index], index, this);
            if (!condition) {
                return false;
            }
        }
        return true;
    }
    ;
    // some
    // 배열을 순회하며 입력받은 callback을 실행하여 하나라도 truthy 를 return 받는지 확인하는 함수
    some(predicate, thisArg) {
        if (!predicate) {
            throw new Error('A predicate function must be provided.');
        }
        for (let index = 0; index < this.length; index++) {
            const condition = predicate(this.data[index], index, this);
            if (condition) {
                return true;
            }
        }
        return false;
    }
    ;
}
const arr = new CustomArray('a', 'bb', 'ccc');
console.log("new Array('a', 'bb', 'ccc') : ", arr);
arr.unshift(...[1, 3, 3]);
console.log("unshift(...[1, 3, 3]) : ", arr);
arr.shift();
console.log("shift() : ", arr);
arr.push(...['가', '나', '다']);
console.log("push(...['가', '나', '다']) : ", arr);
arr.pop();
console.log("pop() : ", arr);
const arr2 = [1, 2, 3];
arr2.pop();
let a3 = arr.toLocaleString('en', {});
console.log(a3.join('!'));
console.log(a3.reverse());
console.log(a3.slice(1, 6));
const a4 = new CustomArray(1, 3, 2, '가', '나', '다');
const a5 = new CustomArray(1, 3, 2, '가', '나', '다');
// console.log("### sort ", a4.sort((a, b) => a - b));
// console.log("### sort ", a5.sort((a, b) => b - a));
console.log("### indexOf ", a5.lastIndexOf(3));
console.log("### every ", a5.every((v) => {
    return typeof v === "number" || typeof v === "string";
}));
console.log("### splice ", [1, 2, 3, 4, 5, 6, 7, 8, 9].splice(1, 3));
