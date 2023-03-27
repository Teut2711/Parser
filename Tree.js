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
  addNode() {}
}
module.exports = {
  Tree,
};
