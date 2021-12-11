var query = null;
var port = null;
var activeSearchTab = null;

/**
 * Send query to new page outgoing from google.com
 **/
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	/** Wait For page fully Render **/
	if (changeInfo.status === 'complete') {
		if (query){
		  activeSearchTab = tab.id;
		  chrome.tabs.sendMessage(activeSearchTab, {type:"query", data: query});
		  query = null; // query back to none
		}
	}
})

/**
 * Handling Search Request send by tabs
 **/
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
	if(msg.type === "query"){
		query = msg.data;
	} else if (msg.type === "bm25"){
		console.log(encodeURI(msg.data.doc).split(/%..|./).length - 1)
		start(msg.data.doc, msg.data.key, sender.tab.id)
	}
});

/**
 * Resolving Search Request and send the result back to tabs
 **/
function start(doc, query, tabId){
	let url = "http://localhost:8000/pred"
	var data = {
		"model_name" : "BM25",
		"doc": doc,
		"query": query,
		"res_num": 10,
		"min_len_recoganizedAs_doc" : doc.length/10
	};
	let parameter = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		mode: 'cors',
		body: JSON.stringify(data)
	}
	const req = fetch(url, parameter)
		.then(response => response.json())
		.then(data => {
			console.log(data)
			chrome.tabs.sendMessage(tabId, {type:"res", data: JSON.parse(data)});
		})
		.catch(error => {
		  console.error('Error:', error);
		});
}

console.log("Background start")