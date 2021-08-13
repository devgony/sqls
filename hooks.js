export const parseOwner = source => {
  let owner, tableName;
  if (source.match(/\./)) {
    [owner, tableName] = source.split(".");
  } else {
    tableName = source;
  }
  //   owner = owner ? owner : "SYSADMIN";
  return [owner, tableName];
};

export const comment = (words, schemas) => {
  let owner, tableName, column;
  let keys = words[3].split(".");
  // console.log(keys);
  if (keys.length === 3) {
    owner = keys[0];
    tableName = keys[1];
    column = keys[2];
  } else if (keys.length === 2) {
    tableName = keys[0];
    column = keys[1];
  }
  let comment = words[5];
  schemas.forEach(s => {
    // console.log(s.owner, owner, s.tableName, tableName, s.column, column);
    if (s.owner === owner && s.tableName == tableName && s.column == column) {
      s["comment"] = comment.replace(/'/g, "");
    }
  });
  return schemas;
};
