console.log("Search page content script");
let query = null;

chrome.runtime.onMessage.addListener(function(msg) {
  query = msg.message;
});