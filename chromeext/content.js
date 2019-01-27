const grabDom = () => {
  const dom = document.body.textContent;
  return dom;
};

chrome.runtime.sendMessage({ from: "content" }); //first, tell the background page that this is the tab that wants to receive the messages.

chrome.runtime.onMessage.addListener(function(msg) {
  if (msg.method == "triggerDOM") {
    //get the dom
    let Dom = grabDom();

    chrome.runtime.sendMessage({ title: "fullDOM", content: Dom });
  }
});
