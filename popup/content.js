chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.message === "start" ) {
        start(request.data);
      }
    }
  );

  function start(query){
    console.log(query);

    html_string = document.body.innerHTML;
    text = document.body.innerText;
    sentences = text.split('!').join('.').split('?').join('\n').split("\n"); //split into sentences

    /*TODO: run bm25*/
    res = []
    res = ["Extensions"] //testing
    
    for (const tmp of res) {
      html_string = html_string.replaceAll(tmp, "<mark>" + tmp + "<\mark>");
    }
    
    
    //console.log(html_string);

    document.body.innerHTML = html_string;
  }
