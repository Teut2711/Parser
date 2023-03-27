"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs/promises"); // use promises version of fs module
const { Deserializer } = require("v8");
const port = 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app
  .route("/api/v1")
  .get((_, res) => {
    res.sendFile(__dirname + "/index.html");
  })
  .post(async (req, res) => {
    const text = req.body.text;

    try {
      const filePath = __dirname + "/data.txt";
      await fs.promises.writeFile(filePath, text, "utf8");

      let deserializer = Deserializer(filePath);
      await deserializer.deserialize();

      res.status(200).json({
        status: "success",
        data: {
          message: `Received text: ${text}`,
        },
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
