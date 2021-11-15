console.log(window)
// console.log(document.querySelector("input[name=q]").value) #discarded as its deprecated


const getSearchQuery = function() {
	let unparse_q = window.location.search.split('&')[0].split('=')[1];
	const parse_q = decodeURIComponent(unparse_q.replace(/\+/g, ' '));
	console.log(parse_q);
	return parse_q;
}

const getResultLink = function() {
	let results = document.querySelectorAll('#search a .iUh30', '#search a .MBeuO', '#search a .DKV0Md');
	console.log(results);
}
const init = function() {
  const query = getSearchQuery();
  console.log(query)
  if (query) {
    // This file is loaded only after the DOM is ready, so no need to wait for
    // DOMContentLoaded.
    getResultLink();
  }
};

console.log(window.location.search)
init();