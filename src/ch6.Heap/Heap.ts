interface IHeap<T> {
    insert(item: T): void; // 아이템 삽입 메소드
    extract(): T | undefined; // 최상위 아이템 추출 메소드
    peek(): T | undefined; // 최상위 아이템 확인 메소드
    size(): number; // 힙 크기 반환 메소드
}

class Heap<T> implements IHeap<T> {
    private heap: T[]; // 힙을 저장할 배열

    constructor() {
        this.heap = []; // 힙 초기화
    }

    insert(item: T): void {
        // 삽입 연산을 위한 메소드 스텁
        // 목적: 힙에 새 아이템 추가
        // 세부사항: 아이템을 배열의 다음 가능한 위치에 배치하여 완전 트리를 유지하고,
        // 필요한 경우 버블 업을 통해 힙 속성 (최소-힙 또는 최대-힙)을 확보합니다.
        this.heap.push(item);
        this.bubbleUp(this.heap.length - 1);
    }

    extract(): T | undefined {
        // 추출 연산을 위한 메소드 스텁
        // 목적: 힙의 루트 요소(최소 또는 최대, 힙 유형에 따라 다름)를 제거하고 반환
        // 세부사항: 루트를 힙의 마지막 요소와 교환하고, 마지막 요소를 제거한 다음,
        // 새 루트를 버블 다운하여 힙 속성을 복원합니다. 

        //힙이 비어 있으면 undefined를 반환합니다.
        if (this.heap.length === 0) {
            return;
        }
        // 마지막 요소와 루트를 교환
        const last = this.heap.length - 1;
        [this.heap[0], this.heap[last]] = [this.heap[last], this.heap[0]];

        // 마지막 요소를 제거
        const item = this.heap.pop();
        // 버블다운 진행
        this.bubbleDown(0);
        // 데이터 반환
        return item;
    }

    peek(): T | undefined {
        // 피크 연산을 위한 메소드 스텁
        // 목적: 힙의 루트 요소를 제거하지 않고 반환
        // 세부사항: 힙 유형(최소 힙 또는 최대 힙)에 따라 최소 또는 최대 요소에 빠르게 접근합니다.
        // 힙이 비어 있으면 `undefined`를 반환합니다.
        if (this.size() === 0) {
            return;
        }

        return this.heap[0];
    }

    size(): number {
        // 크기 연산을 위한 메소드 스텁
        // 목적: 현재 힙에 있는 요소의 수를 반환
        // 세부사항: 힙 요소를 저장하는 배열의 길이를 단순히 반환하여 힙에 있는 요소 수를 빠르게 알 수 있습니다.
        return this.heap.length;
    }

    private bubbleUp(index: number): void {
        // 버블 업 메소드 스텁
        // 주어진 인덱스에서 요소를 위로 조정하여 힙 조건이 만족될 때까지 진행합니다.
    }

    private bubbleDown(index: number): void {
        // 버블 다운 메소드 스텁
        // 주어진 인덱스에서 요소를 아래로 조정하여 힙 조건이 만족될 때까지 진행합니다.
    }
}
