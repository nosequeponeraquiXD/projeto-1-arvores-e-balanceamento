enum Color {
  RED,
  BLACK,
}

class Node {
  key: number;
  color: Color;
  left: Node | null = null;
  right: Node | null = null;
  parent: Node | null = null;

  constructor(key: number) {
    this.key = key;
    this.color = Color.RED;
  }
}

export class RedBlackTree {
  root: Node | null = null;

  private rotateLeft(x: Node) {
    const y = x.right!;
    x.right = y.left;

    if (y.left) y.left.parent = x;

    y.parent = x.parent;

    if (!x.parent) this.root = y;
    else if (x === x.parent.left) x.parent.left = y;
    else x.parent.right = y;

    y.left = x;
    x.parent = y;
  }

  private rotateRight(y: Node) {
    const x = y.left!;
    y.left = x.right;

    if (x.right) x.right.parent = y;

    x.parent = y.parent;

    if (!y.parent) this.root = x;
    else if (y === y.parent.left) y.parent.left = x;
    else y.parent.right = x;

    x.right = y;
    y.parent = x;
  }

  insert(key: number) {
    const node = new Node(key);

    let parent: Node | null = null;
    let current = this.root;

    while (current) {
      parent = current;
      if (node.key < current.key) current = current.left;
      else current = current.right;
    }

    node.parent = parent;

    if (!parent) this.root = node;
    else if (node.key < parent.key) parent.left = node;
    else parent.right = node;

    this.fixInsert(node);
  }

  private fixInsert(node: Node) {
    while (node.parent && node.parent.color === Color.RED) {
      const parent = node.parent;
      const grand = parent.parent!;

      if (parent === grand.left) {
        const uncle = grand.right;

        if (uncle && uncle.color === Color.RED) {
          parent.color = Color.BLACK;
          uncle.color = Color.BLACK;
          grand.color = Color.RED;
          node = grand;
        } else {
          if (node === parent.right) {
            node = parent;
            this.rotateLeft(node);
          }

          parent.color = Color.BLACK;
          grand.color = Color.RED;
          this.rotateRight(grand);
        }
      } else {
        const uncle = grand.left;

        if (uncle && uncle.color === Color.RED) {
          parent.color = Color.BLACK;
          uncle.color = Color.BLACK;
          grand.color = Color.RED;
          node = grand;
        } else {
          if (node === parent.left) {
            node = parent;
            this.rotateRight(node);
          }

          parent.color = Color.BLACK;
          grand.color = Color.RED;
          this.rotateLeft(grand);
        }
      }
    }

    this.root!.color = Color.BLACK;
  }

  search(key: number): boolean {
    let current = this.root;

    while (current) {
      if (key === current.key) return true;

      if (key < current.key) current = current.left;
      else current = current.right;
    }

    return false;
  }

  height(node: Node | null = this.root): number {
    if (!node) return -1;

    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }
}
