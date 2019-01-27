const grabDom = () => {
  const text = document.body.textContent;
  const title = document.title;
  const url = document.URL;
  const data = { text, title, url };
  return data;
};

chrome.runtime.sendMessage({ from: "content" }); //first, tell the background page that this is the tab that wants to receive the messages.

chrome.runtime.onMessage.addListener(function(msg) {
  if (msg.method == "triggerDOM") {
    //get the dom
    let Dom = grabDom();

    chrome.runtime.sendMessage({ title: "fullDOM", content: Dom });
  }
});
