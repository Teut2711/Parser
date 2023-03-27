class Node {
  constructor(index, label) {
    this.index = index;
    this.label = label;
    this.children = [];
  }
  addChildren(node) {
    this.children.push(node);
  }

  getJson() {
    return {
      [this.index]: {
        label: this.label,
        children: this.children.map((node) => node.getJson()),
      },
    };
  }
}
module.exports = Node;
