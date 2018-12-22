var fs = require("fs");
var md5 = require("md5");

fs.readFile("word_list.txt", "utf-8", function(err, data) {
  if (err) throw err;

  const rainbowTable = data
    .split("\n")
    .map(singleWord => singleWord + " " + md5(singleWord));

  console.log(rainbowTable);

  fs.writeFile(
    "rainbow_word_list.txt",
    rainbowTable.join("\n"),
    "utf-8",
    function(err) {
      if (err) throw err;
    }
  );
});
