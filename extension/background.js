var query = null;
var port = null;
var activeSearchTab = null;

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
	/** Wait For page fully Render **/
	if (changeInfo.status === 'complete') {
		if (query){
		  activeSearchTab = tab.id;
		  chrome.tabs.sendMessage(activeSearchTab, {type:"query", data: query});
		  query = null; // query back to none
		}
	}
})

chrome.runtime.onMessage.addListener(function(msg) {
	if(msg.type === "query"){
		query = msg.data;
	} else if (msg.type === "bm25"){
		console.log(encodeURI(msg.data).split(/%..|./).length - 1)
		sendNativeMessage(JSON.stringify(msg.data).replace(/\\"/g, '\"'))
	}
});


function sendNativeMessage(message) {
  port.postMessage(String(message));
  console.log("Sent message: " + message);
}

function onNativeMessage(message) {
  console.log("Received message: " + message);
  console.log(message);
  chrome.tabs.sendMessage(activeSearchTab, {type:"bm25", data: message});
}

function onDisconnected() {
  console.log("Failed to connect: " + chrome.runtime.lastError.message);
  port = null;
  initConn();
}

/**
 * Function where native connect
 **/
function initConn(){
	var hostName = "com.google.chrome.page.bm25";
	port = chrome.runtime.connectNative(hostName);
	port.onMessage.addListener(onNativeMessage);
	port.onDisconnect.addListener(onDisconnected);
}

console.log("let me thinks, again")
initConn()
console.log("OMG SUCESSS!!!")

