import clipboardy from "clipboardy";
import fs from "fs";
import { comment, parseOwner } from "./hooks.js";

let output = "";
let schemas = [];
fs.readFile("target.sql", "utf8", function (err, data) {
  let createSts = data.match(/CREATE\s+TABLE\s+\w+\s+\(.+?[^\d]\)/gis);
  createSts.forEach(
    st => {
      let ownerTableName = st.match(/(?<=CREATE\s+TABLE\s+)\w+/i)[0];
      let [owner, tableName] = parseOwner(ownerTableName);
      let columnSts = st
        .match(/(?<=\().+(?=\))/s)[0]
        .trim()
        .split(/,(?!.*\))/g);
      columnSts.forEach(c => {
        let words = c.trim().match(/\w+(\(\w*\))*/g);
        let column = words[0];
        let type = words[1];
        if (type && type.match(/NOT/i) && column.match(/RTPN_CHNL_DVSN_CODE/)) {
          //   console.log(words);
          //   console.log(column.split(""));
        }
        schemas.push({ owner, tableName, column, type });
      });
    }
    // st.split("\n").forEach(line => {
    //   line = line.trim();
    //   let words = line.split(/\s+/g);
    //   words.forEach(w => {
    //     if (w.match(/CREATE/i)) {
    //       let tableName = words[2];
    //       schemas.push(tableName);
    //     }
    //   });
    // })
  );

  let commentSts = data.match(/COMMENT\s+ON\s+COLUMN\s+.*(?=;)/g);
  commentSts.forEach(c => {
    let words = c.split(/\s+/);
    comment(words, schemas);
  });

  let output = schemas.reduce((acc, cur, i) => {
    let line = Object.values(cur).reduce((acc, cur) => `${acc}\t${cur}`);
    return `${acc}${i == 0 ? "" : "\n"}${line}`;
  }, "");
  console.log(output);
});
