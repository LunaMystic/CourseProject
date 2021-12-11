console.log("Search page content script");
let query = null;

/**
 * Get the rendered text of current Page
 **/
function getText(){
    return document.body.innerText;
}

/**
 * Highlight html element to yellow based on provided innerText
 **/
function highlighter(lifelist){
	for (const s of lifelist){
			if(s.length>0){
				let painter = Array.from(document.querySelectorAll('*'))
  			 			.filter(el => el.innerText === s);
  			 	if(painter.length){
  			 		for (index in painter){
  			 			milk = painter[index];
  			 			/** Robust way but it work **/
	  			 		milk.innerHTML = 
		  			 		"<span style=\"background-color:yellow\">"
		  			 		+ milk.innerHTML + "</span>"; 
  			 		}
  			 	}
			}
		}
}

/**
 * Listener to message, include receiving query/search result and
 * sending popup searchbox message.
 */
chrome.runtime.onMessage.addListener(function(msg) {
	if(msg.type === "query"){
		query = msg.data;
		chrome.runtime.sendMessage({
			type: "bm25",
			data: {key: query, doc: getText()}
		});
	} else if (msg.type === "res"){
		/** Highlight the first part of matching doc **/
		var lifelist = getText().slice(msg.data[0][0], msg.data[0][1])
			.split("\n").join("\t").split("\t");
		highlighter(lifelist)
		/** Highlight the second part of matching doc **/
		lifelist = getText().slice(msg.data[1][0], msg.data[1][1])
			.split("\n").join("\t").split("\t");
		highlighter(lifelist)
	} else {
		console.log("Undefined behavior for meessage: ", msg)
	}
});