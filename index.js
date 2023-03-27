"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs"); // use promises version of fs module
const { Tree } = require("./Tree");
const port = parseInt(process.env.PORT) || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.route("/api/v1/tree").get(async (req, res) => {
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
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
