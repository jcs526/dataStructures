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
    // iterator 구현
    [Symbol.iterator]() {
        let currentIndex = 0;
        let data = this.data;
        return {
            next() {
                // 모든 요소를 방문했으면 done을 true로 설정
                if (currentIndex < Object.keys(data).length) {
                    return { value: data[currentIndex++], done: false };
                }
                else {
                    return { done: true };
                }
            }
        };
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
        let accumulator;
        let startIndex = 0;
        // 초기값이 주어지지 않았을 경우
        if (initialValue === undefined && this.length > 0) {
            accumulator = this.data[0]; // T 타입을 U 타입으로 캐스팅
            startIndex = 1; // 두 번째 요소부터 반복 시작
        }
        else {
            accumulator = initialValue;
            startIndex = 0;
        }
        // 배열을 순회하며 callback 함수 적용
        for (let i = startIndex; i < this.length; i++) {
            accumulator = callback(accumulator, this.data[i], i, this);
        }
        return accumulator;
    }
    // toString
    // 배열을 String으로 변환하는 함수
    toString() {
        if (this.length === 0)
            return '';
        let result = '' + this.data[0];
        for (let i = 1; i < this.length; i++) {
            result += `,${this.data[i]}`;
        }
        return result;
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
    reverse() {
        let start = 0;
        let end = this.length - 1;
        while (start < end) {
            [this.data[start], this.data[end]] = [this.data[end], this.data[start]];
            start++;
            end--;
        }
        return this;
    }
    // toReverse
    // 배열의 순서를 뒤집은 결과를 return 해주는 함수
    toReverse() {
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
    // spilce
    // 시작할 index, 삭제할 갯수, 삽입할 데이터를 입력받아서
    // 삭제한 데이터를 응답받고 원본 배열을 변경하는 함수
    splice(start, deleteCount, ...items) {
        // 응답할 배열 생성
        const removedItems = new CustomArray();
        // start가 음수일 경우 처리
        if (start < 0) {
            start = Math.max(this.length + start, 0);
        }
        else {
            start = start;
        }
        // 최대 삭제 갯수
        const maxDeletion = this.length - start;
        // 삭제할 갯수 처리
        if (deleteCount === undefined) {
            deleteCount = maxDeletion;
        }
        else {
            if (deleteCount > maxDeletion) {
                deleteCount = maxDeletion;
            }
            else {
                deleteCount = deleteCount;
            }
        }
        // 배열 내부 데이터 삭제
        for (let i = 0; i < deleteCount; i++) {
            removedItems.push(this.data[start + i]);
            delete this.data[start + i];
        }
        // 삭제후 index 정리
        const shiftStart = start + deleteCount;
        for (let i = shiftStart; i < this.length; i++) {
            this.data[i - deleteCount] = this.data[i];
            delete this.data[i];
        }
        // 삭제후 length 정리
        this.length -= deleteCount;
        // 추가해야할 데이터가 있을시 데이터 추가
        if (items.length > 0) {
            for (let i = this.length - 1; i >= start; i--) {
                this.data[i + items.length] = this.data[i];
            }
            for (let i = 0; i < items.length; i++) {
                this.data[start + i] = items[i];
            }
            this.length += items.length;
        }
        // 제거한 데이터 응답
        return removedItems;
    }
    ;
    // indexOf
    // 배열에서 입력받은 값이 몇번째 index에 존재하는지 확인하는 함수
    indexOf(searchElement, fromIndex = 0) {
        for (let i = fromIndex; i < this.length; i++) {
            if (this.data[i] === searchElement) {
                return i;
            }
        }
        return -1;
    }
    // lastIndexOf
    // 배열에서 입력받은 값이 몇번째 index에 존재하는지 확인하는 함수
    lastIndexOf(searchElement, fromIndex) {
        let start = fromIndex !== undefined ? Math.min(fromIndex, this.length - 1) : this.length - 1;
        for (let i = start; i >= 0; i--) {
            if (this.data[i] === searchElement) {
                return i;
            }
        }
        return -1;
    }
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
    // find
    // 배열을 순회하며 callback을 실행하여 truthy를 만족하는 데이터를 return
    find(predicate, thisArg) {
        for (let i = 0; i < this.length; i++) {
            const condition = predicate(this.data[i], i, this);
            if (condition === true) {
                return this.data[i];
            }
        }
        return;
    }
    ;
    // findIndex
    // 배열을 순회하며 callback을 실행하여 truthy를 만족하는 데이터의 index를 return
    findIndex(predicate, thisArg) {
        for (let i = 0; i < this.length; i++) {
            const condition = predicate(this.data[i], i, this);
            if (condition === true) {
                return i;
            }
        }
        return -1;
    }
    ;
    includes(searchElement, fromIndex) {
        const from = fromIndex ?? 0;
        for (let i = from; i < this.length; i++) {
            if (this.data[i] === searchElement) {
                return true;
            }
        }
        return false;
    }
    flat(depth = 1) {
        const result = new CustomArray();
        for (let index = 0; index < this.length; index++) {
            if (this.data[index] instanceof CustomArray && depth > 0) {
                result.push(...this.data[index].flat(depth - 1));
            }
            else if (this.data[index] instanceof Array && depth > 0) {
                result.push(...this.data[index].flat(depth - 1));
            }
            else {
                result.push(this.data[index]);
            }
        }
        return result;
    }
}
