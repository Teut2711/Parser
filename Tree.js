const fs = require("fs"); // use promises version of fs module
const Deserializer = require("./Deserializer");
const Serializer = require("./Serializer");

class Tree {
  #root;
  async constructFromFile(path) {
    try {
      let data = await fs.promises.readFile(path, "utf8");

      let deserializer = new Deserializer();
      this.#root = deserializer.deserialize(data);
    } catch (err) {
      throw new Error(`Problem in building tree ${err.message}`);
    }
  }
  constructFromText(data) {
    try {
      let deserializer = new Deserializer();
      this.#root = deserializer.deserialize(data);
    } catch (err) {
      throw new Error(`Problem in building tree ${err.message}`);
    }
  }

  getJson() {
    return this.#root.getJson();
  }
  addChild(parentIndex, label) {
    const index = this.#countNodes(this.#root) + 1;

    this.#root.addChild(parentIndex, index, label);
    this.#renumber(this.#root, 0);
    const serializer = new Serializer(this.#root);
    serializer.serialize();
    serializer.saveToFile();
  }

  #countNodes(root) {
    if (!root) {
      return 0;
    }
    let count = 1; // include current node in count
    for (let child of root.children) {
      count += this.#countNodes(child);
    }
    return count;
  }

  #renumber(root, index) {
    if (!root) return 0;
    if (root.children === null) {
      return index;
    }
    root.index = ++index;
    for (let i = 0; i < root.children.length; i++) {
      index = this.#renumber(root.children[i], index);
    }
    return index;
  }
}
module.exports = {
  Tree,
};
