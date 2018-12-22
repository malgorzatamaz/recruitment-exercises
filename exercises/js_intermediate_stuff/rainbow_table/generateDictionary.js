var fs = require("fs");

fs.readFile(process.argv[2] || "pan_tadeusz.txt", "utf-8", function(err, data) {
  if (err) throw err;

  const nonUniqueWords = data
    .replace(/[\n\r]/g, " ")
    .split(" ")
    .map(singleWord => singleWord.replace(/[^a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, ""))
    .filter(singleWord => singleWord.length > 0);

  const uniqueWords = [...new Set(nonUniqueWords)];

  fs.writeFile("word_list.txt",
    uniqueWords.join("\n"),
    "utf-8",
    function(err) {
      if (err) throw err;      
      console.log("Dictionary generated.")
    }
  );
});
