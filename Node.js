class Node {
  constructor(index, label) {
    this.index = index;
    this.label = label;
    this.children = [];
  }
  addChildren(node) {
    this.children.push(node);
  }
}
module.exports = Node;
