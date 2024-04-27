
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
    inOrder() { }
    preOrder() { }
    postOrder() { }
    levelOrder(): T[] | null {
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

console.log(tree);
console.log(tree.levelOrder());
