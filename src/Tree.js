"use strict";
const fs = require("fs"); // use promises version of fs module
const Deserializer = require("./Deserializer");
const Serializer = require("./Serializer");
/**
 * A class representing a tree.
 */
class Tree {
  #root;
  /**
   * Constructs a tree from a file.
   *
   * @async
   * @param {string} path - The path of the file to read.
   * @throws {Error} Throws an error if there is a problem building the tree.
   */
  async constructFromFile(path) {
    try {
      let data = await fs.promises.readFile(path, "utf8");

      let deserializer = new Deserializer();
      this.#root = deserializer.deserialize(data);
    } catch (err) {
      throw new Error(`Problem in building tree ${err.message}`);
    }
  }
  /**
   * Constructs a tree from text data.
   *
   * @param {string} data - The text data to build the tree from.
   * @throws {Error} Throws an error if there is a problem building the tree.
   */
  constructFromText(data) {
    try {
      let deserializer = new Deserializer();
      this.#root = deserializer.deserialize(data);
    } catch (err) {
      throw new Error(`Problem in building tree ${err.message}`);
    }
  }
  /**
   * Returns the JSON representation of the tree.
   *
   * @returns {Object} The JSON representation of the tree.
   */
  getJson() {
    return this.#root.getJson();
  }
  /**
   * Adds a new child to the tree.
   *
   * @param {number} parentIndex - The index of the parent node.
   * @param {string} label - The label of the new child node.
   */
  addChild(parentIndex, label) {
    const index = this.#countNodes(this.#root) + 1;

    this.#root.addChild(parentIndex, index, label);
    this.#renumber(this.#root, 0);
    const serializer = new Serializer(this.#root);
    serializer.serialize();
    serializer.saveToFile();
  }
  /**
   * Counts the number of nodes in the tree.
   *
   * @private
   * @param {Object} root - The root node of the tree.
   * @returns {number} The number of nodes in the tree.
   */
  #countNodes(root) {
    if (!root) {
      return 0;
    }
    let count = 1;
    for (let child of root.children) {
      count += this.#countNodes(child);
    }
    return count;
  }
  /**
   * Renumbers the nodes of the tree.
   *
   * @private
   * @param {Object} root - The root node of the tree.
   * @param {number} index - The starting index for the renumbering.
   * @returns {number} The new index after renumbering.
   */
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
module.exports = Tree;
