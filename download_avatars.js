var request = require('request');
var secret = require('./secret.js');

const gitHubKey = "token " + secret.GITHUB_TOKEN;

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': gitHubKey
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}



getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  //console.log("Result:", result);
  var repos = JSON.parse(result);
  repos.forEach(function(repo) {
    console.log(repo.avatar_url);
  });

  //console.log(repos);
});

function downloadImageByURL(url, filePath) {
  console.log(url);
  console.log(filePath);
}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")