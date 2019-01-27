const grabDom = () => {
  const domHead = document.head;
  const domBody = document.body;
  const url = domHead.getElementsByTagName("link")[0].href;
  const title = domHead.getElementsByTagName("title")[0].innerHTML;
  const body = domBody.getElementsByClassName("section-content");
  const contentArr = [];
  for (let i = 0; i < body.length; i++) {
    contentArr.push(body[i].innerText);
  }
  const content = contentArr.join("\n");
  return { url, title, content };
};

chrome.runtime.sendMessage({ from: "content" }); //first, tell the background page that this is the tab that wants to receive the messages.

chrome.runtime.onMessage.addListener(function(msg) {
  if (msg.method == "triggerDOM") {
    //get the dom
    let Dom = grabDom();

    chrome.runtime.sendMessage({ title: "fullDOM", content: Dom });
  }
});
