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

//takes received data back from content and posts to db
const sendToServer = function(data) {
  //******SERVER NAME HERE!!!! ****/
  fetch("http://localhost:1337" /*change dummy server name please!*/, {
    method: "Post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: data
  }).then(response => {
    console.log(response);
  });
};

//on click triggers function in content to grab dom
chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.sendMessage(contentTabId, { method: "triggerDOM" });
});

//receives DOM from content
chrome.runtime.onMessage.addListener(function(newmsg) {
  if (newmsg.title === "fullDOM") {
    sendToServer(newmsg.content);
  }
});
