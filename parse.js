import clipboardy from "clipboardy";
import fs from "fs";
import { comment, parseOwner } from "./hooks";

let output = "";
let schemas = [];
fs.readFile("target.sql", "utf8", function (err, data) {
  data.split("\n").forEach(line => {
    line = line.replace(/\[|\]/g, "");
    let words = line.split(/\s+|;/);
    if (words[0].match(/ALTER/i)) {
      alter(words);
    }
    if (words[0].match(/COMMENT/i)) {
      comment(words, schemas);
    }
  });
  let output = schemas.reduce((acc, cur, i) => {
    let line = Object.values(cur).reduce((acc, cur) => `${acc}\t${cur}`);
    return `${acc}${i == 0 ? "" : "\n"}${line}`;
  }, "");
  clipboardy.writeSync(output);
});

const alter = words => {
  let [owner, tableName] = parseOwner(words[2]);
  let column = words[4];
  let type = words[5];
  schemas.push({ owner, tableName, column, type });
};
