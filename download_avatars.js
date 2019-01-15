var gitFunc = require('./gitFunc.js')

var repoOwner = process.argv[2];
var repoName = process.argv[3];

const downloadDir = "avatars/"

console.log('Welcome to the GitHub Avatar Downloader!');

// check for input present
if (repoName != undefined && repoOwner != undefined) {
  gitFunc.getRepoContributors(repoOwner, repoName, function(err, contibutors) {
    contibutors.forEach(function(contrib) {
      var file_path = downloadDir + contrib.login + ".jpg";
      var url = contrib.avatar_url;
      gitFunc.downloadImageByURL(url, file_path);
    });

  });
}
else {
  console.log("Error: Missing input!")
}