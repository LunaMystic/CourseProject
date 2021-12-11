// Citation to MDN Docs and Stackoverflow for fetch google searchbox query
/**
 * Get the input query
 */
const getSearchQuery = function() {
	let unparse_q = window.location.search.split('&')[0].split('=')[1];
	const parse_q = decodeURIComponent(unparse_q.replace(/\+/g, ' '));
	return parse_q;
}

/**
 * Modify each outgoing href by input query
 */
const modifyResultLink = function(query) {
	let results = document.querySelectorAll('#search a .iUh30', '#search a .MBeuO', '#search a .DKV0Md');
	for (let perk of results){
		var temp_Button = document.createElement('button');
		perk.parentNode.parentNode.addEventListener('click', function() {
	    	alert("Similarity search will be performed based on detecting Query: " + query);
	    	chrome.runtime.sendMessage({type: "query", data: query});
    	});
	}
}

/**
 * Init function called after page render
 */
const init = function() {
  const query = getSearchQuery();
  console.log(query)
  if (query) {
    // Don't do anything if query is empty
    modifyResultLink(query);
  }
};

init();