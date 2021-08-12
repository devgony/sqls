import clipboardy from 'clipboardy';
import fs from 'fs';

let output = "";
let schemas = [];
fs.readFile('target.sql', 'utf8', function(err, data){
    data.split('\n').forEach(line => {
        line = line.replace(/\[|\]/g, "");
        let words = line.split(/\s+|;/);
        // console.log(words)
        if (words[0].match(/ALTER/i)) {
            alter(words);
        }
        if (words[0].match(/COMMENT/i)) {
            comment(words);
        }
    });
    let output = schemas.reduce((acc, cur, i) => {
        let line = Object.values(cur).reduce((acc, cur) => `${acc}\t${cur}`);
        return `${acc}${i == 0? "" : "\n"}${line}`;
    }, "");
    console.log(output);
    clipboardy.writeSync(output);
});

const comment = words => {
    let [owner, tableName] = parseOwner(words[3]);
    let comment = words[5];
    schemas.forEach(s => {
        if (s.owner === owner && s.tableName == tableName) {
            s["comment"] = comment.replace(/'/g, "");
        }
    })
}

const alter = words => {
        let [owner, tableName] = parseOwner(words[2]);
        let column = words[4];
        let type = words[5];
        schemas.push({owner, tableName, column, type});
};

const parseOwner = source => {
    let owner, tableName;
    if (source.match(/\./)) {
        [owner, tableName] = source.split(".");
    } else {
        tableName = source;
    }
    owner = owner? owner : 'SYSADMIN';
    return [owner, tableName]
}