/**
 * Express app for serving and modifying a Tree via API.
 * @module TreeApp
 */

"use strict";
const express = require("express");
const Tree = require("./Tree");
const port = parseInt(process.env.PORT) || 3000;

const app = express();
/**
 * Middleware for parsing JSON request bodies.
 * @name express.json
 * @function
 * @memberof TreeApp
 */
app.use(express.json());
/**
 * Route for getting the entire tree.
 * @name get/api/v1/tree
 * @function
 * @memberof TreeApp
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @throws {Error} If an error occurs while constructing the tree or sending the response.
 */
app
  .route("/api/v1/tree")
  .get(async (_, res) => {
    try {
      const filePath = __dirname + "/data.txt";

      let tree = new Tree();
      await tree.constructFromFile(filePath);
      res.status(200).json({
        status: "success",
        data: [tree.getJson()],
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: "error",
        message: `Error :\n${err.message}`,
      });
    }
  })
  /**
   * Route for adding a child to the tree.
   * @name post/api/v1/tree
   * @function
   * @memberof TreeApp
   * @async
   * @param {Object} req - Express request object with JSON body of {parent: string, label: string}.
   * @param {Object} res - Express response object.
   * @throws {Error} If an error occurs while constructing the tree, adding the child, or sending the response.
   */
  .post(async (req, res) => {
    try {
      const filePath = __dirname + "/data.txt";
      const { parent, label } = req.body;
      let tree = new Tree();
      await tree.constructFromFile(filePath);
      tree.addChild(parent, label);
      res.status(200).json({
        status: "success",
        data: [tree.getJson()],
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: "error",
        message: `Error :\n${err.message}`,
      });
    }
  });
/**
 * Start the Express app.
 * @name listen
 * @function
 * @memberof TreeApp
 * @param {number} port - Port number to listen on.
 */
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
