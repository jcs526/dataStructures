function solution(jobs) {
    class Heap {
        constructor() {
            this.item = [];
        }

        get length() {
            return this.item.length;
        }

        get heap() {
            return this.item;
        }

        getParent(index) {
            return Math.floor((index - 1) / 2);
        }

        getLeftChild(index) {
            return index * 2 + 1;
        }

        getRightChild(index) {
            return index * 2 + 2;
        }

        swap(a, b) {
            [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
        }

        heapifyUp(index) {
            while (index > 0) {
                let parentIndex = this.getParent(index);
                if (this.item[parentIndex][1] > this.item[index][1]) {
                    this.swap(parentIndex, index);
                    index = parentIndex;
                } else {
                    break;
                }
            }
        }

        heapifyDown(index) {
            let smallest = index;
            const left = this.getLeftChild(index);
            const right = this.getRightChild(index);

            if (left < this.length && this.item[left][1] < this.item[smallest][1]) {
                smallest = left;
            }

            if (right < this.length && this.item[right][1] < this.item[smallest][1]) {
                smallest = right;
            }

            if (smallest !== index) {
                this.swap(index, smallest);
                this.heapifyDown(smallest);
            }
        }

        extract() {
            if (this.length === 0) {
                throw new Error('Heap is empty');
            }

            this.swap(0, this.length - 1);
            const extractedValue = this.item.pop();
            this.heapifyDown(0);
            return extractedValue;
        }

        insert(value) {
            if (!Array.isArray(value) || value.length < 2) {
                throw new Error('Invalid value. Must be an array of at least two elements.');
            }

            this.item.push(value);
            this.heapifyUp(this.length - 1);
        }
    }
    const heap = new Heap();
    const length = jobs.length;
    let answer = 0;
    let time = 0;

    // 선정렬
    jobs = jobs
        .sort((a, b) => a[0] - b[0]);

    while (jobs.length || heap.length) {

        // 현재보다 우선순위가 낮은 항목은 전부 heap에 추가
        while (jobs.length && jobs[0][0] <= time) {
            heap.insert(jobs.shift());
        }

        if (!heap.length) {
            // 가장 앞항목 시간
            const newTime = jobs[0][0];
            // 같은 시간이면 전부 heap에 추가
            while (jobs.length && jobs[0][0] === newTime) {
                heap.insert(jobs.shift());
            }
            // 스킵
            time = newTime;
        }

        // 최우선순위 항목
        const front = heap.extract();

        //현재 시간
        time += front[1];
        //총 소모시간
        answer += time - front[0];

    }

    // 소숫점 버림
    return Math.floor(answer / length);

}
