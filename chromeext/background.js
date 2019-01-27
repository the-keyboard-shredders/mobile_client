//gets us the url and title

// chrome.browserAction.onClicked.addListener(function(tab) {
//   console.log("url", tab.url);
//   console.log("title", tab.title);
// });

//tab id
let contentTabId;

//gets tabID from content
chrome.runtime.onMessage.addListener(function(msg, sender) {
  if (msg.from == 'content') {
    contentTabId = sender.tab.id;
    console.log(contentTabId);
  }
});

//takes received data back from content and posts to db
const sendToServer = function(data) {
  console.log('data is \n\n', data);
  fetch('http://localhost:4000/?', {
    credentials: 'include',
    headers: {
      accept: 'application/json',
      'accept-language': 'en-US,en;q=0.9,it;q=0.8,la;q=0.7',
      'content-type': 'application/json'
    },
    referrer: 'http://localhost:4000/',
    referrerPolicy: 'origin',
    body:
      '{"query":"mutation{\\n  addArticle(name:\\"123\\"){\\n  \\tname\\n\\t}\\n}","variables":null}',
    method: 'POST',
    mode: 'cors'
  }).then(response => {
    console.log('res to query\n\n\n', response);
  });
};

//on click triggers function in content to grab dom
chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.sendMessage(contentTabId, { method: 'triggerDOM' });
});

//receives DOM from content
chrome.runtime.onMessage.addListener(function(newmsg) {
  if (newmsg.title == 'fullDOM') {
    sendToServer(newmsg.content);
  }
});
