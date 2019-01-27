//gets us the url and title

// chrome.browserAction.onClicked.addListener(function(tab) {
//   console.log("url", tab.url);
//   console.log("title", tab.title);
// });

//tab id
let contentTabId;

//gets tabID from content
chrome.runtime.onMessage.addListener(function(msg, sender) {
  if (msg.from == "content") {
    contentTabId = sender.tab.id;
    console.log(contentTabId);
  }
});

//on click triggers function in content to grab dom
chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.sendMessage(contentTabId, { method: "triggerDOM" });
});
