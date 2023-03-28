const fs = require("fs"); // use promises version of fs module
const { Deserializer } = require("./Deserializer");

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
}
module.exports = {
  Tree,
};
