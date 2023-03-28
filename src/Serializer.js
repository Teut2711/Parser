"use strict";
const fs = require("fs");
/**
 * A class for serializing a tree and saving it to a file.
 * @class
 */
class Serializer {
  /**
   * Creates an instance of Serializer.
   * @constructor
   * @param {object} tree - The root node of the tree to be serialized.
   */
  constructor(tree) {
    /**
     * The root node of the tree to be serialized.
     * @type {object}
     */
    this.root = tree;
    /**
     * The string that represents the serialized tree.
     * @type {string}
     */
    this.file_string = "";
  }
  /**
   * Serializes the tree and stores the result in the `file_string` property.
   * @public
   * @returns {void}
   */
  serialize() {
    this.#serialize(this.root, 0);
  }
  /**
   * Recursively serializes each node in the tree and appends the result to the `file_string` property.
   * @private
   * @param {object} root - The root node of the current subtree.
   * @param {number} indent - The indentation level for the current node.
   * @returns {void}
   */
  #serialize(root, indent) {
    this.file_string +=
      " ".repeat(4 * indent) + `${root.index}: ${root.label}\n`;
    for (let child of root.children) {
      this.#serialize(child, indent + 1);
    }
  }
  /**
   * Saves the serialized tree to a file.
   * @public
   * @async
   * @returns {Promise<void>}
   * @throws {Error} If failed to save the file.
   */
  async saveToFile() {
    const filePath = __dirname + "/data.txt";
    try {
      await fs.promises.writeFile(filePath, this.file_string, "utf8");
    } catch (error) {
      throw new Error("Failed to serialize the tree");
    }
  }
}
module.exports = Serializer;