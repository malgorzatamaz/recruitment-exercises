var fs = require("fs");

fs.readFile("rainbow_word_list.txt", "utf-8", function(err, data) {
  if (err) throw err;
  const hashedPassword = process.argv[2];

  const passwordsList = data.split("\n");
  const password = passwordsList.filter(
    singleWord =>
      singleWord.split(" ") && singleWord.split(" ")[1] === hashedPassword
  );

  console.log(
    password.toString().split(" ").length && password.toString().split(" ")[0]
  );
});
