var query = null;

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  /** Wait For page fully Render **/
  if (changeInfo.status == 'complete') {
    if (query){
      chrome.tabs.sendMessage(tab.id, {message: query});
      query = null; // query back to none
    }
  }
})

chrome.runtime.onMessage.addListener(function(msg) {
  query = msg.message;
});