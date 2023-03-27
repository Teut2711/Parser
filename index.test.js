const sum = require("./sum");

const { serialize, deserialize } = require("./index");

test("reads data correctly", () => {

    const data = `
    1: root
        2: ant
        3: bear
            4: cat
            5: dog
                6: elephant
        7: frog
    `;  
  expect(deserialize(data)).toBe(3);
});
