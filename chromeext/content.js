// console.log("this is here people");
// chrome.browserAction.onClicked.addListener(function(tab) {
//   chrome.tabs.getCurrent(function(page) {
//     console.log("window data", page);
//     console.log("tab?", tab);
//   });
// });
// console.log(
//   "test action.js here - gets us too much",
//   this.document.documentElement.textContent

// );

// var fetch = require("fetch");
// var cheerio = require("cheerio");

// fetch("http://www.nytimes.come", function(err, resp, html) {
//   if (!err) {
//     const $ = cheerio.load(html);
//     console.log(html);
//   }
// });

// console.log("chekc documentElm here", this.document.documentElement);

// console.log("get whole thing here", this);

// chrome.browserAction.onClicked.addListener(function(tab) {
//   console.log("tabba tabba doo", tab);
// });

chrome.browserAction.onClicked.addListener(function() {
  console.log("tabba tabba doo", this);
});
