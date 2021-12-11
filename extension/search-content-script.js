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

function start(query){

	html_string = document.documentElement.innerText;
	console.log(html_string);

	for (const tmp of res) {
	  html_string = html_string.replaceAll(tmp, "<mark>" + tmp + "<\mark>");
	}

	console.log(html_string);

	/*TODO: update page with new html*/
}

chrome.runtime.onMessage.addListener(function(msg) {
	if(msg.type === "query"){
		query = msg.data;
		chrome.runtime.sendMessage({
			type: "bm25",
			data: {key: query, doc: getText()}
		});
	} else if (msg.type === "res"){
		console.log(msg.data)
		console.log(msg.data[0][0])
		console.log(getText().slice(msg.data[1][0], msg.data[1][1]))
	} else {
		console.log("Undefined behavior for meessage: ", msg)
	}
});