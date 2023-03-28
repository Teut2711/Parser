"use strict";
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
  addChild(parentIndex, index, label) {
    if (this.index == parentIndex) {
      this.children.push(new Node(index, label));
     
    } else {
      for (let child of this.children) {
        child.addChild(parentIndex, index, label);
      }
    }
  }
}

module.exports = Node;
