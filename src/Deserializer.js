"use strict";
const fs = require("fs");
const Node = require("./Node");

/**
 * A class for deserializing a string representation of a tree into a Node object.
 */
class Deserializer {
  /**
   * Deserialize the input string and create a tree.
   * @param {string} data - The string representation of the tree to deserialize.
   * @returns {Node} - The root node of the deserialized tree.
   * @throws {Error} - If there is a problem parsing the input string.
   */
  deserialize(data) {
    data = data.split("\n");

    const [index, label] = this.#getIndexAndLabel(data[0]);
    let root = new Node(index, label);
    let start = 1;
    let end = data.length - 1;
    this.#buildTree(root, data, start, end, 0);
    return root;
  }
  /**
   * Build a tree from a string representation.
   * @param {Node} root - The current node being processed.
   * @param {string[]} data - The array of strings representing the tree.
   * @param {number} start - The starting index for processing.
   * @param {number} end - The ending index for processing.
   * @param {number} parentIndent - The indentation level of the parent node.
   */
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
        let end = i;
        let levelIndent = parentIndent + 1;
        let nextIndent = currIndent;

        for (
          let end = i;
          end <= data.length - 1 && nextIndent != levelIndent;
          end++
        ) {
          nextIndent = (data[i].match(/^\s*/) || [""])[0].length / 4;
        }

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
  /**
   * Parse an index and label from a string.
   * @param {string} str - The string to parse.
   * @returns {[number, string]} - An array containing the index and label.
   * @throws {Error} - If the string cannot be parsed.
   */
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

module.exports = Deserializer;
