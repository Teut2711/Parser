const { DeserializerText } = require("./Deserializer");

function dfs(root, indexToAppend) {
  if (root.index == indexToAppend) {
    root.appendNode(new Node());
    return;
  }
  for (let child of root.children) {
    dfs(child);
  }
}
async function appendNode(data) {
  try {
    const filePath = __dirname + "/data.txt";

    let deserializer = new DeserializerText(filePath);
    await deserializer.deserialize();
    const tree = deserializer.getTreeDS();
  } catch (err) {}
}
