class TreeNode<T> {
    left: TreeNode<T> | null = null;
    right: TreeNode<T> | null = null;
    item: T;

    constructor(data: T) {
        this.item = data;
    }
}

class BinaryTree<T> {
    root: TreeNode<T> | null = null;

    append(item: T): void {
        const newNode = new TreeNode(item);

        // 트리가 비어있으면, 새 노드를 루트로 설정
        if (this.root === null) {
            this.root = newNode;
            return;
        }

        const queue: TreeNode<T>[] = [this.root];

        while (queue.length) {
            const node = queue.shift()!;

            // 왼쪽 자식이 없다면 새 노드를 왼쪽 자식으로 추가
            if (node.left === null) {
                node.left = newNode;
                return;
            }
            // 오른쪽 자식이 없다면 새 노드를 오른쪽 자식으로 추가
            if (node.right === null) {
                node.right = newNode;
                return;
            }

            // 왼쪽과 오른쪽 자식이 모두 있다면, 그 자식들을 큐에 추가
            queue.push(node.left, node.right);
        }
    }

    pop(): T | null {
        // 트리가 비어있는 경우, null을 반환
        if (this.root === null) {
            return null;
        }

        // 루트 노드만 있는 경우, 루트 노드를 제거
        if (this.root.left === null && this.root.right === null) {
            const item = this.root.item;
            this.root = null;
            return item;
        }

        // 레벨 순서대로 노드를 찾아 마지막 노드를 제거
        const queue: Array<TreeNode<T>> = [this.root];
        let lastNode: TreeNode<T> | null = null;
        let lastNodeParent: TreeNode<T> | null = null;

        while (queue.length) {
            lastNode = queue.shift()!;

            if (lastNode.left) {
                queue.push(lastNode.left);
                lastNodeParent = lastNode;  // 왼쪽 노드의 부모를 기록
            }
            if (lastNode.right) {
                queue.push(lastNode.right);
                lastNodeParent = lastNode;  // 오른쪽 노드의 부모를 기록
            }
        }

        // 마지막 노드를 부모 노드에서 제거
        const lastNodeItem = lastNode!.item;
        if (lastNodeParent!.left === lastNode) {
            lastNodeParent!.left = null;
        } else if (lastNodeParent!.right === lastNode) {
            lastNodeParent!.right = null;
        }

        return lastNodeItem;
    }

    inOrder(): T[] | null {
        // left => node => right 순서
        // Stack을 이용하여 탐색
        if (this.root === null) {
            return null;
        }

        const stack: TreeNode<T>[] = [];
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

    preOrder(): T[] | null {
        // node => left => right 순서
        // Stack을 이용하여 탐색
        if (this.root === null) {
            return null;
        }

        const stack: TreeNode<T>[] = [this.root];
        const result: T[] = [];

        while (stack.length) {
            const node = stack.pop()!;
            result.push(node.item);

            if (node.right) {
                stack.push(node.right);
            }

            if (node.left) {
                stack.push(node.left);
            }
        }

        return result;
    }

    postOrder(): T[] | null {
        // left => right => node 순서
        // Stack 2개를 사용
        if (this.root === null) {
            return null;
        }

        const result: T[] = [];
        const stack1: TreeNode<T>[] = [this.root];
        const stack2: TreeNode<T>[] = [];

        while (stack1.length) {
            const current = stack1.pop()!;
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

        while (stack2.length) {
            const current = stack2.pop()!;
            result.push(current.item);
        }

        return result;
    }

    levelOrder(): T[] | null {
        if (this.root === null) {
            return null;
        }

        const queue: TreeNode<T>[] = [this.root];
        const result: T[] = [];

        while (queue.length) {
            const node = queue.shift()!;
            result.push(node.item);

            if (node.left) {
                queue.push(node.left);
            }

            if (node.right) {
                queue.push(node.right);
            }
        }

        return result;
    }
    inOrderRescursive(): T[] {
        if (this.root === null) {
            return [];
        }
        return this.inorderTraversal(this.root);
    }
    inorderTraversal(root: TreeNode<T> | null) {
        if (root === null) {
            return [];
        }

        let result: T[] = [];
        result.push(...this.inorderTraversal(root.left));
        result.push(root.item);
        result.push(...this.inorderTraversal(root.right));
        return result;
    }
    preOrderRescursive(): T[] {
        if (this.root === null) {
            return [];
        }
        return this.preOrderTraversal(this.root);
    }
    preOrderTraversal(root: TreeNode<T> | null) {
        if (root === null) {
            return [];
        }

        let result: T[] = [];
        result.push(root.item);
        result.push(...this.preOrderTraversal(root.left));
        result.push(...this.preOrderTraversal(root.right));
        return result;
    }
    postOrderRescursive(): T[] {
        if (this.root === null) {
            return [];
        }
        return this.postOrderTraversal(this.root);
    }
    postOrderTraversal(root: TreeNode<T> | null) {
        if (root === null) {
            return [];
        }

        let result: T[] = [];
        result.push(...this.postOrderTraversal(root.left));  // Traverse left subtree
        result.push(...this.postOrderTraversal(root.right)); // Traverse right subtree
        result.push(root.item);                                // Visit node
        return result;
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
console.log("levelOrder", tree.levelOrder());
console.log("preOrder", tree.preOrder());
console.log("재귀 preOrder", tree.preOrderRescursive());
console.log("inorder", tree.inOrder());
console.log("재귀 inorder", tree.inOrderRescursive());
console.log("postOrder", tree.postOrder());
console.log("재귀 postOrder", tree.postOrderRescursive());

