const fs = require("fs");

class Serializer {
  constructor(tree) {
    this.root = tree;
    this.file_string = "";
  }

  serialize() {
    this.#serialize(this.root, 0);

  }
  

  #serialize(root, indent) {
    this.file_string +=
      " ".repeat(4 *indent) + `${root.index}: ${root.label}\n`;
    for (let child of root.children) {
      this.#serialize(child, indent + 1);
    }
  }

  async saveToFile() {
    const filePath = __dirname + "/data.txt";
    try {
      await fs.promises.writeFile(filePath, this.file_string, "utf8");
      } catch (error) {
     throw new Error("Failed to serialize the tree")
    }
  }
}
module.exports = Serializer;