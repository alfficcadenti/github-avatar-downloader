var request = require('request');
var secret = require('./secret.js');

const gitHubKey = "token " + secret.GITHUB_TOKEN;
var repoOwner = process.argv[2];
var repoName = process.argv[3];

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

function downloadImageByURL(url, filePath) {
  console.log(url);
  console.log(filePath);
}


if (repoName != undefined && repoOwner != undefined) {
  getRepoContributors(repoOwner, repoName, function(err, result) {
    console.log("Errors:", err);
    //console.log("Result:", result);
    var contributors = JSON.parse(result);
    contributors.forEach(function(contrib) {
      var file_path = "avatars/" + contrib.login + ".jpg";
      var url = contrib.avatar_url;
      downloadImageByURL(url, file_path);
    });
  });
}
else {console.log("Error: Missing input!")}


