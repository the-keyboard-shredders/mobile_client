//tab id
let contentTabId;

//gets tabID from content
chrome.runtime.onMessage.addListener(function(msg, sender) {
  if (msg.from === 'content') {
    contentTabId = sender.tab.id;
    console.log(contentTabId);
  }
});

//takes received data back from content and posts to db
const sendToServer = function(data) {
  const title = data[0];
  const content = data[1];

  const queryJSON = JSON.stringify({
    query: `
        mutation($title: String $content: String) {
          addArticle(title: $title, content: $content){
            title
          }
        }
    `,
    variables: {
      title,
      content
    }
  });
  fetch('http://localhost:4000/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: queryJSON
  }).then(response => {
    console.log('res to query\n\n\n', response);
  });
};

//on click triggers function in content to grab dom
chrome.browserAction.onClicked.addListener(function() {
  contentTabId = [...arguments][0].id;
  const title = [...arguments][0].title;
  const url = [...arguments][0].url;
  sendToServer([title, url]);

  chrome.tabs.sendMessage(contentTabId, { method: 'triggerDOM' });
});

//receives DOM from content
chrome.runtime.onMessage.addListener(function(newmsg) {
  if (newmsg.title === 'fullDOM') {
    sendToServer(newmsg.content);
  }
});
