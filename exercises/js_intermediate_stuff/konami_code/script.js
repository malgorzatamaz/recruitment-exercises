let password = "";
let timeOutId;

function getJSONP(url, loaded) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";

  xhr.onload = function() {
    const status = xhr.status;
    loaded(status, xhr.response);
  };
  xhr.send();
}

function getData(success, failed) {
  getJSONP("https://api.github.com/repos/elixir-lang/elixir/issues", function(
    status,
    data
  ) {
    console.log(status);

    if (status == 200) {
      const dataLength = data.length > 5 ? 5 : dataLength;
      let issues = [];

      for (let i in data) {
        let issue = {
          id: data[i].id,
          username: data[i].user.login,
          timeCreated: Date.parse(data[i].created_at),
          title: data[i].title
        };

        issues.push(issue);
      }

      issues.sort(compare);

      success(issues.slice(0, 5));
    } else {
      failed();
    }
  });
}

function compare(a, b) {
  if (a.timeCreated < b.timeCreated) return -1;
  if (a.timeCreated > b.timeCreated) return 1;
  return 0;
}

function loadCats() {
  getData(
    function(issues) {
      console.log(issues);
      let catsContainer = document.getElementById("more-cats-container");

      catsContainer.innerHTML = createIssueList(issues);

      setTimeout(hideAllIssues, 15000);
      clearPassword();
    },
    function() {
      document.getElementById("more-cats-container").innerHTML =
        "<p>Cannot load kittens. Try again later.</p>";
    }
  );
}

function hideAllIssues() {
  document.getElementById("more-cats-container").innerHTML = "";
}

function createIssueList(issues) {
  let html = "<ul>";

  for (let i in issues) {
    html += "<li>";
    html += "<p> Title: " + issues[i].title + "</p>";
    html += "<p> Author: " + issues[i].username + "</p>";
    html += "</li>";
  }

  html += "</ul>";
  return html;
}

function validateCode() {
  console.log(password);

  if (password === "injects3crets") {
    loadCats();
  } else {
    hideAllIssues();
  }
}

function clearPassword() {
  password = "";
}

function setKeyboardHandler() {
  document.onkeydown = function(evt) {
    evt = evt || window.event;

    if (timeOutId) clearTimeout(timeOutId);
    timeOutId = setTimeout(clearPassword, 5000);

    if (evt.keyCode == 27) {
      clearPassword();
    } else if (evt.keyCode > 47 && evt.keyCode < 91) {
      let letter = String.fromCharCode(evt.keyCode);
      if (!evt.shiftKey) letter = letter.toLowerCase();
      password += letter;
    }

    validateCode();
  };
}
