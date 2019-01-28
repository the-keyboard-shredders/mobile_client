const Dom = {};
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  Dom["url"] = msg.url;
  Dom["title"] = msg.title;
  Dom["content"] = msg.content;
  console.log("bg dom", Dom);
});

chrome.browserAction.onClicked.addListener(function() {
  console.log("title: ", Dom.title);
  console.log("content: ", Dom.content);
  fetch("http://localhost:4000/graphql", {
    credentials: "include",
    headers: {
      accept: "application/json",
      "content-type": "application/json"
    },
    referrer: "http://localhost:4000/",
    referrerPolicy: "origin",
    body:
      '{"query":"mutation{\\naddArticle(title:\\"from chrome ext\\" content:\\"some content\\"){\\n  title\\n    content\\n\\t}\\n}","variables":null}',
    method: "POST",
    mode: "cors"
  })
    .then(response => {
      console.log("res to query\n\n\n", response);
    })
    .catch(e => {
      console.log(e);
    });
});
