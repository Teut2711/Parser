const { DeserializerText } = require("./Deserializer");


function dfs(root, indexToAppendAt, nodeToAppend) {
  if (root.index == indexToAppendAt) {
    root.appendNode(new Node());
    return;
  }
  for (let child of root.children) {
    dfs(child, indexToAppendAt, nodeToAppend);
  }
}
async function appendNode(data) {
  try {
    const filePath = __dirname + "/data.txt";
  
    let deserializerMain = new DeserializerText();
    let deserializer = deserializerMain.deserialize
      const nodeToAppend = new Node(..);

    await deserializer.deserialize();
    const tree = deserializer.getTreeDS();
  } catch (err) {}
}
