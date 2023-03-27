"use strict";
const fs = require("fs");
const Node = require("./Node");

class DeserializerText {
  constructor(path) {
    this.#path = path;
  }

  async deserialize() {
    let path = this.#path;
    try {
      let data = await fs.promises.readFile(path, "utf8");
      data = data.split("\n");
      const [index, label] = this.#getIndexAndLabel(data[0]);
      const root = new Node(index, label);
      let start = 1;
      let end = data.length - 1;
      this.#buildTree(root, data, start, end, 0);
      this.#root = root;
    } catch (err) {
      throw new Error(`Problem in building tree ${err.message}`);
    }
  }
  getTreeDS() {
    return this.#root;
  }
  getJsonTree() {
    return this.#root.getJson();
  }
  #buildTree(root, data, start, end, parentIndent) {
    for (let i = start; i <= end; i++) {
      const currIndent = (data[i].match(/^\s*/) || [""])[0].length / 4;
      if (currIndent < parentIndent) {
        return;
      }
      if (currIndent === parentIndent + 1) {
        const [index, label] = this.#getIndexAndLabel(data[i]);
        root.addChildren(new Node(index, label));
      } else {
        let start = i;
        let end = data.length - 1;

        this.#buildTree(
          root.children[root.children.length - 1],
          data,
          start,
          end,
          parentIndent + 1
        );
        i = end;
      }
    }
  }

  #getIndexAndLabel(str) {
    const regexPattern = /^\s*\d+:\s*(.*)$/;
    const match = str.match(regexPattern);

    if (match) {
      const index = parseInt(match[0], 10);
      const label = match[1];
      return [index, label];
    } else {
      throw new Error(`Parsing failed at "${str}"`);
    }
  }
}

module.exports = {
  DeserializerText,
};
