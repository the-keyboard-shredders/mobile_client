const Dom = {};
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  Dom["url"] = msg.url;
  Dom["title"] = msg.title;
  Dom["content"] = msg.content;
  console.log("bg dom", Dom);
});

chrome.browserAction.onClicked.addListener(function() {
  const title = Dom.title;
  const content = Dom.content;
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
  fetch("http://localhost:4000/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: queryJSON
  })
    .then(response => {
      console.log("res to query\n\n\n", response);
    })
    .catch(err => {
      console.log(err);
    });
});
