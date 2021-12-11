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

function highlighter(lifelist){
	for (const s of lifelist){
			if(s.length>0){
				console.log(s);
				let painter = Array.from(document.querySelectorAll('*'))
  			 			.filter(el => el.innerText === s);
  			 	// if(!painter.length){
  			 	// 	painter = Array.from(document.querySelectorAll('*'))
  			 	// 		.filter(el => el.innerText.includes(s))
  			 	// }
  			 	if(painter.length){
  			 		for (index in painter){
  			 			milk = painter[index]
  			 			console.log(milk.innerHTML);
	  			 		milk.innerHTML = 
		  			 		"<span style=\"background-color:yellow\">"
		  			 		+ milk.innerHTML + "</span>"; 
  			 		}
  			 	}
			}
		}
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
		console.log(msg.data[0][0], msg.data[0][1])
		var lifelist = getText().slice(msg.data[0][0], msg.data[0][1])
			.split("\n").join("\t").split("\t");
		highlighter(lifelist)
		lifelist = getText().slice(msg.data[1][0], msg.data[1][1])
			.split("\n").join("\t").split("\t");
		highlighter(lifelist)
	} else {
		console.log("Undefined behavior for meessage: ", msg)
	}
});