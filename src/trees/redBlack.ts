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
