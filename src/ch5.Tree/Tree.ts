
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

    append(item: T) {
        const newNode = new TreeNode(item);

        if (this.root === null) {
            this.root = newNode;
            return;
        }

    }
    pop() { }
    inOrder() { }
    preOrder() { }
    postOrder() { }
    levelOrder() { }
}

const tree = new BinaryTree<number>();

console.log(tree);
