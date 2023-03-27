"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs"); // use promises version of fs module
const { DeserializerText } = require("./Deserializer");
const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.route("/api/v1/tree").get(async (req, res) => {
  try {
    const filePath = __dirname + "/data.txt";
    const text = await fs.promises.readFile(filePath);

    let deserializer = new DeserializerText(filePath);
    await deserializer.deserialize();

    res.status(200).json({
      status: "success",
      data: [deserializer.getJsonTree()],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: `Error :\n${err.message}`,
    });
  }
});

app
  .route("/api/v1/tree/2")
  .get((_, res) => {
    res.status(100).json({
      status: "success",
      message: `Send a POST request to this url in 'x-www-form-urlencoded' format`,
    });
  })
  .post(async (req, res) => {
    const text = req.body.text;

    try {
      const filePath = __dirname + "/data.txt";
      await fs.promises.writeFile(filePath, text, "utf8");

      let deserializer = new DeserializerText(filePath);
      await deserializer.deserialize();

      res.status(200).json({
        status: "success",
        data: [deserializer.getJsonTree()],
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
