var request = require('request');
var fs = require('fs');
var secret = require('./secret.js');
const gitHubKey = "token " + secret.GITHUB_TOKEN;

module.exports = {

  getRepoContributors: function(repoOwner, repoName, cb) {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request',
        'Authorization': gitHubKey
      }
    };

    request(options, function(err, res, body) {
      var parsedBody = JSON.parse(body);
      if (parsedBody.message == "Not Found") {
        console.log("Error: Not Found");
      }
      else {
        cb(err, parsedBody);
      }
    });
  },

  downloadImageByURL: function (url, filePath) {
    request.get(url)
      .on('error', function (err) {
        console.log("Error!!!");
      })
      .on('response', function (response) {
        console.log("Response Message", response.statusMessage, response.headers['content-type']);
      })
      .pipe(fs.createWriteStream(filePath))
  ;}
}