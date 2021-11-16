console.log(window)
// console.log(document.querySelector("input[name=q]").value) #discarded as its deprecated

const getSearchQuery = function() {
	let unparse_q = window.location.search.split('&')[0].split('=')[1];
	const parse_q = decodeURIComponent(unparse_q.replace(/\+/g, ' '));
	return parse_q;
}

const getResultLink = function(query) {
	let results = document.querySelectorAll('#search a .iUh30', '#search a .MBeuO', '#search a .DKV0Md');
	for (let perk of results){
		var temp_Button = document.createElement('button');
    // perk.parentNode.parentNode.appendChild(aButton);
		// console.log(perk.parentNode.parentNode.href)
		perk.parentNode.parentNode.addEventListener('click', function() {
    	alert("visiting: " + perk.parentNode.parentNode.href + ".\nQuery: " + query);
    	chrome.runtime.sendMessage({message: query});
    });
		// console.log(perk.parentNode.parentNode.href);
	}
	console.log(results[0].parentNode.parentNode);
}
const init = function() {
  const query = getSearchQuery();
  console.log(query)
  if (query) {
    // Don't do anything if query is empty
    getResultLink(query);
  }
};

init();