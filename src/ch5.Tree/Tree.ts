
class TreeNode<T> {
    left: TreeNode<T> | null = null;
    right: TreeNode<T> | null = null;
    item: T;

    constructor(data: T) {
        this.item = data;
    }
}

class BinaryTree<T>{
    root: TreeNode<T> | null = null

    append(item: T): void {
        const newNode = new TreeNode(item);

        if (this.root === null) {
            this.root = newNode;
            return;
        }

        // level order랑 구조상 같은듯함?
        const queue = [];
        queue.push(this.root)

        while (queue.length) {
            const node: TreeNode<T> = queue.shift()!;

            if (node.left === null) {
                node.left = newNode;
                return;
            }
            if (node.right === null) {
                node.right = newNode;
                return;
            }

            queue.push(node.left, node.right)

        }

    }
    pop() { }
    inOrder() {
        // left => node => right 순서
        // Stack을 이용하여 탐색
        if (this.root === null) {
            return null;
        }

        const stack = [];

        const result: T[] = [];

        let current: TreeNode<T> | null = this.root;
        while (current || stack.length) {
            while (current !== null) {
                stack.push(current);
                current = current.left;
            }
            // 가장 왼쪽까지 이동
            current = stack.pop()!;
            // 결과에 입력
            result.push(current.item);
            // 오른쪽으로 이동
            current = current.right;
        }
        return result;
    }
    preOrder() {
        // node => left => right 순서
        // Stack을 이용하여 탐색
        if (this.root === null) {
            return null;
        }

        const stack = [];
        stack.push(this.root)

        const result = [];

        while (stack.length) {
            const node: TreeNode<T> = stack.pop()!;
            result.push(node.item)



            if (node.right) {
                stack.push(node.right)
            }

            if (node.left) {
                stack.push(node.left)
            }
        }

        return result

    }

    postOrder() {
        // left => right => node 순서
        // Stack 2개를 사용
        if (this.root === null) {
            return null;
        }
        const result = [];

        let stack1 = [];
        let stack2 = [];

        stack1.push(this.root);
        // []
        // [1,3,2,5,4,7,6]
        while (stack1.length > 0) {
            let current: TreeNode<T> = stack1.pop()!;
            // 선입후출
            // node 먼저 입력
            stack2.push(current);

            // left를 stack1에 먼저 넣음 => stack2에 더 나중에 들어감
            if (current.left !== null) {
                stack1.push(current.left);
            }
            // right를 stack1에 나중에 넣음 => stack2에 더 먼저 들어감
            if (current.right !== null) {
                stack1.push(current.right);
            }
        }

        while (stack2.length > 0) {
            let current = stack2.pop();
            result.push(current?.item)
        }

        return result
    }
    levelOrder(): T[] | null {
        // Queue를 이용하여 level별 탐색
        if (this.root === null) {
            return null;
        }

        const queue = [];
        queue.push(this.root)

        const result = [];

        while (queue.length) {
            const node: TreeNode<T> = queue.shift()!;
            result.push(node.item)

            if (node.left) {
                queue.push(node.left)
            }

            if (node.right) {
                queue.push(node.right)
            }
        }

        return result
    }
}

const tree = new BinaryTree<number>();

tree.append(1)
tree.append(2)
tree.append(3)
tree.append(4)
tree.append(5)
tree.append(6)
tree.append(7)
tree.append(8)
tree.append(9)
tree.append(10)
tree.append(11)
tree.append(12)
tree.append(13)
tree.append(14)

console.log(tree);
console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.inOrder());
console.log(tree.postOrder());


console.log(`            1
     2            3
   4   5       6      7
 8 9 10 11   12 13  14`);

/**
 *           1
 *     2            3
 *   4   5       6      7
 * 8 9 10 11   12 13  14
 * 
 */
