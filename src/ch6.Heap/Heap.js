"use strict";
class Heap {
    heap; // 힙을 저장할 배열
    compare; // 비교 함수
    constructor(comparator) {
        this.heap = []; // 힙 초기화
        this.compare = comparator; // 비교 함수를 초기화
    }
    insert(item) {
        // 삽입 연산을 위한 메소드
        // 목적: 힙에 새 아이템 추가
        // 세부사항: 아이템을 배열의 다음 가능한 위치에 배치하여 완전 트리를 유지하고,
        // 필요한 경우 버블 업을 통해 힙 속성(최소-힙 또는 최대-힙)을 확보합니다.
        this.heap.push(item);
        this.bubbleUp(this.size() - 1);
    }
    extract() {
        // 추출 연산을 위한 메소드
        // 목적: 힙의 루트 요소(최소 또는 최대, 힙 유형에 따라 다름)를 제거하고 반환
        // 세부사항: 루트를 힙의 마지막 요소와 교환하고, 마지막 요소를 제거한 다음,
        // 새 루트를 버블 다운하여 힙 속성을 복원합니다.
        // 힙이 비어 있으면 undefined를 반환합니다.
        if (this.size() === 0) {
            return;
        }
        // 마지막 요소와 루트를 교환
        const last = this.size() - 1;
        [this.heap[0], this.heap[last]] = [this.heap[last], this.heap[0]];
        // 마지막 요소를 제거
        const item = this.heap.pop();
        // 버블 다운 진행
        this.bubbleDown(0);
        // 데이터 반환
        return item;
    }
    peek() {
        // 피크 연산을 위한 메소드
        // 목적: 힙의 루트 요소를 제거하지 않고 반환
        // 세부사항: 힙 유형(최소 힙 또는 최대 힙)에 따라 최소 또는 최대 요소에 빠르게 접근합니다.
        // 힙이 비어 있으면 `undefined`를 반환합니다.
        if (this.size() === 0) {
            return;
        }
        return this.heap[0];
    }
    size() {
        // 크기 연산을 위한 메소드
        // 목적: 현재 힙에 있는 요소의 수를 반환
        // 세부사항: 힙 요소를 저장하는 배열의 길이를 단순히 반환하여 힙에 있는 요소 수를 빠르게 알 수 있습니다.
        return this.heap.length;
    }
    bubbleUp(index) {
        // 버블 업 메소드
        // 주어진 인덱스에서 요소를 위로 조정하여 힙 조건이 만족될 때까지 진행합니다.
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.compare(this.heap[index], this.heap[parentIndex]) < 0) {
                // 현재 노드와 부모 노드 간의 위치 교환
                [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
                index = parentIndex;
            }
            else {
                break;
            }
        }
    }
    bubbleDown(index) {
        // 버블 다운 메소드
        // 주어진 인덱스에서 요소를 아래로 조정하여 힙 조건이 만족될 때까지 진행합니다.
        while (index < this.size()) {
            const leftIndex = index * 2 + 1;
            const rightIndex = index * 2 + 2;
            // `best` 변수를 현재 인덱스로 초기화
            let best = index;
            // 왼쪽 자식이 존재하며, 현재 노드보다 작은 경우
            if (leftIndex < this.size() && this.compare(this.heap[leftIndex], this.heap[best]) < 0) {
                best = leftIndex;
            }
            // 오른쪽 자식이 존재하며, 가장 작은 값보다 작은 경우
            if (rightIndex < this.size() && this.compare(this.heap[rightIndex], this.heap[best]) < 0) {
                best = rightIndex;
            }
            // 현재 노드가 올바른 위치에 있으면 반복문 종료
            if (best === index) {
                break;
            }
            // 현재 노드와 가장 작은 자식 노드 간의 위치 교환
            [this.heap[index], this.heap[best]] = [this.heap[best], this.heap[index]];
            // 새로운 인덱스(가장 작은 자식 노드)로 이동
            index = best;
        }
    }
}
// 최소 힙 및 최대 힙 Comparator 정의
const minHeapComparator = (a, b) => a - b;
const maxHeapComparator = (a, b) => b - a;
// 최소 힙 및 최대 힙 사용 예시
const minHeap = new Heap(minHeapComparator);
const maxHeap = new Heap(maxHeapComparator);
minHeap.insert(1);
minHeap.insert(6);
minHeap.insert(2);
minHeap.insert(4);
minHeap.insert(3);
minHeap.insert(7);
minHeap.insert(15);
minHeap.insert(13);
minHeap.insert(5);
console.log(minHeap);
minHeap.extract();
console.log(minHeap);
minHeap.extract();
console.log(minHeap);
minHeap.extract();
console.log(minHeap);
maxHeap.insert(1);
maxHeap.insert(6);
maxHeap.insert(2);
maxHeap.insert(4);
maxHeap.insert(3);
maxHeap.insert(7);
maxHeap.insert(15);
maxHeap.insert(13);
maxHeap.insert(5);
console.log(maxHeap);
maxHeap.extract();
console.log(maxHeap);
maxHeap.extract();
console.log(maxHeap);
maxHeap.extract();
console.log(maxHeap);
