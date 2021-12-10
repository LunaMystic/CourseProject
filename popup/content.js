chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.message === "start" ) {
        start(request.data);
      }
    }
  );

  function start(query){
    console.log(query);
    //console.log(document.documentElement.innerHTML);
    
    //alert(document.documentElement.innerHTML);


    html_string = document.documentElement.innerHTML;

    console.log(html_string);

    /*TODO: get sentences from the html*/

    /*TODO: run bm25*/

    res = []; //list of strings that should be highlighted

    
    for (const tmp of res) {
      html_string = html_string.replaceAll(tmp, "<mark>" + tmp + "<\mark>");
    }
    
    console.log(html_string);

    /*TODO: update page with new html*/

  }
