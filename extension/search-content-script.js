console.log("Search page content script");
let query = null;
let port = null;
/**
 * Function Where available robust Search
 **/
function getText(){
    return document.body.innerText;
}

/**
 * Robust search web document given text
 **/
function search(query){
	const Dom = document.querySelectorAll('h1, h2, h3, h4, h5, a, p, li, td, th, span')
	for(let text of Dom){
		console.log(text.innerHTML.includes(query))
		if (text.innerHTML.includes(query)){
			console.log(text)
			text.innerHTML = text.innerHTML.replaceAll(query, "SPONGEBOB");
		}
	}
    return document.body.innerText;
}

chrome.runtime.onMessage.addListener(function(msg) {
	if(msg.type === "query"){
		query = msg.data;
		chrome.runtime.sendMessage({
			type: "bm25",
			data: {key: query, doc: getText()}
		});
	} else {
		console.log(msg.data)
		var lime = getText();
		console.log(lime.slice(msg.data.index[0][0],msg.data.index[0][1]));
		console.log(lime.slice(msg.data.index[1][0],msg.data.index[1][1]));
	}
});