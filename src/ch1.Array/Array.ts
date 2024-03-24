

//Generic을 통해 type이 지정가능한 배열 생성 class
class CustomArray<T> {
    // 외부에서 접근 가능한 public 변수
    length: number;
    // method를 통해서만 접근 가능한 private 변수
    private data: { [index: number]: any }

    // 생성자
    constructor(...arg: any[]) {
        this.length = 0;
        this.data = {};

        for (const key of arg) {
            this.data[this.length] = key;
            this.length++;
        }

        // Proxy 객체를 통해 getter와 setter 관리
        return new Proxy(this, {
            get: (target: CustomArray<T>, prop: string | symbol) => {
                if (typeof prop === 'string' || typeof prop === 'symbol') {
                    const value = target[prop as keyof CustomArray<T>];
                    if (typeof value === 'function') {
                        return value.bind(target);
                    }
                    return value;
                }
            },
            set: (target: CustomArray<T>, prop: string, value: any) => {
                const propNum = Number(prop);
                if (!isNaN(propNum)) {
                    target.data[propNum] = value;
                    target.length = Math.max(target.length, propNum + 1);
                    return true;
                } else {
                    (target as any)[prop] = value;
                    return true;
                }
            }
        });
    }

    // push 메소드
    // 입력받은 값을 배열의 마지막에 추가하는 함수
    push(...elements: T[]): number {
        for (let i = 0; i < elements.length; i++) {
            const element: T = elements[i];
            this.data[this.length] = element;
            this.length++;
        }
        return this.length;
    }

    // pop 메소드
    // 배열의 마지막 값을 return하고 제거하는 함수
    pop(): T | undefined {
        if (this.length === 0) {
            return undefined;
        }
        const lastElement: T = this.data[this.length - 1];
        delete this.data[this.length - 1];
        this.length--;
        return lastElement;
    }

    // unshift 메소드
    // 입력받은 값을 배열의 맨 앞에 추가하는 함수
    unshift(...elements: T[]): number {
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
    shift(): T | undefined {
        if (this.length === 0) {
            return undefined;
        }

        const firstElement: T = this.data[0];

        for (let i = 0; i < this.length - 1; i++) {
            this.data[i] = this.data[i + 1];
        }

        delete this.data[this.length - 1];
        this.length--;
        return firstElement;
    }

    // forEach 메소드
    // 배열을 순회하며 입력받은 callback을 실행하는 함수
    forEach(callback: (element: T, index: number, array: CustomArray<T>) => void): void {
        for (let i = 0; i < this.length; i++) {
            callback(this.data[i], i, this);
        }
    }

    // map 메소드
    // 배열을 순회하며 입력받은 callback대로 각 데이터를 변경하는 함수
    map(callback: (element: T, index: number, array: CustomArray<T>) => T): CustomArray<T> {
        const resultMap: CustomArray<any> = new CustomArray();
        for (let i = 0; i < this.length; i++) {
            resultMap.push(callback(this.data[i], i, this));
        }
        return resultMap;
    }

    // filter 메소드
    // 배열을 순회하며 callback 함수의 결과가 true인 데이터만 남기는 함수
    filter(callback: (element: T, index: number, array: CustomArray<T>) => boolean): CustomArray<T> {
        const resultFilter: CustomArray<any> = new CustomArray();
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
    reduce<U>(callback: (accumulator: U, currentValue: T, currentIndex: number, array: CustomArray<T>) => U, initialValue?: U): U {
        let accumulator: U | undefined = initialValue;
        for (let i = 0; i < this.length; i++) {
            if (accumulator !== undefined) {
                accumulator = callback(accumulator, this.data[i], i, this);
            } else {
                accumulator = this.data[i];
            }
        }
        return accumulator as U;
    }

    // toString
    // 배열을 String으로 변환하는 함수
    toString(): string {
        return String(this)
    }

    // toLocaleString
    // 배열 데이터중 Date객체가 있으면 toLocaleString 함수를 적용후
    // 배열을 String으로 변환하는 함수
    toLocaleString(locale: string, option: object = {}): CustomArray<T> {
        const resultMap: CustomArray<any> = new CustomArray();
        for (let i = 0; i < this.length; i++) {
            if (this.data[i] instanceof Date) {
                resultMap.push(this.data[i].toLocaleString(locale, option))
            } else {
                resultMap.push(this.data[i])
            }
        }
        return resultMap
    }

    // concat
    // 배열과 배열을 합쳐주는 함수
    concat(...arrays: Array<T[] | CustomArray<T>>): CustomArray<T> {
        const result = new CustomArray<T>();

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
    };

    // join
    // 입력받은 구분자로 배열 데이터를 이은 후 String으로 반환해주는 함수
    join(separator: string = ','): string {
        let result: string = '';
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
    reverse(): CustomArray<T> {
        const result = new CustomArray<T>();

        for (let i = this.length - 1; i >= 0; i--) {
            result.push(this.data[i])
        }

        return result;
    };

    // slice
    // 시작 index과 종료 index를 입력받아서
    // 배열의 일부를 return하는 함수
    slice(start?: number, end?: number): CustomArray<T> {
        const result = new CustomArray<T>();

        if (start === undefined) {
            for (let i = 0; i < this.length; i++) {
                result.push(this.data[i]);
            }
        } else {
            for (let i = start; i < this.length; i++) {
                if (end === i) {
                    break;
                }
                result.push(this.data[i]);
            }
        }
        return result;
    };

    // sort
    // 배열 내부데이터를 정렬하는 함수
    // 정렬 방식은 Bubble sort를 활용
    sort(compareFn?: (a: T, b: T) => number): CustomArray<T> {

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
    };



    splice(start: number, deleteCount?: number, ...items: T[]): CustomArray<T> {

    };


    // indexOf
    // 배열에서 입력받은 값이 몇번째 index에 존재하는지 확인하는 함수
    indexOf(searchElement: T, fromIndex?: number): number {
        const start: number = fromIndex ?? 0;

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
    lastIndexOf(searchElement: T, fromIndex?: number): number {
        const from: number = fromIndex ?? this.length;

        for (let index = from; index >= 0; index--) {
            const element = this.data[index];
            if (element === searchElement) {
                return index;
            }
        }
        return -1;
    };
    // some
    // 배열을 순회하며 입력받은 callback을 실행하여 모든 값이 truthy 를 return 받는지 확인하는 함수
    every(predicate: (value: T, index?: number, array?: CustomArray<T>) => boolean, thisArg?: any): boolean {

        if (!predicate) {
            throw new Error('A predicate function must be provided.');
        }

        for (let index = 0; index < this.length; index++) {
            const condition = predicate(this.data[index], index, this)
            if (!condition) {
                return false;
            }
        }

        return true;
    };

    // some
    // 배열을 순회하며 입력받은 callback을 실행하여 하나라도 truthy 를 return 받는지 확인하는 함수
    some(predicate: (value: T, index: number, array: CustomArray<T>) => boolean, thisArg?: any): boolean {
        if (!predicate) {
            throw new Error('A predicate function must be provided.');
        }

        for (let index = 0; index < this.length; index++) {
            const condition = predicate(this.data[index], index, this)
            if (condition) {
                return true;
            }
        }

        return false;
    };



}



console.log("### splice ", [1, 2, 3, 4, 5, 6, 7, 8, 9].splice(1, 3));


