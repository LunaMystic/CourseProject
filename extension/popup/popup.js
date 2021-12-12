document.addEventListener('DOMContentLoaded', documentEvents);

function sendBM25Query(input) { 
    console.log(input.value);
    alert(input.value);
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    	var activeTab = tabs[0];
    	chrome.tabs.sendMessage(activeTab.id, 
    		{type:"query", model_name: "bm25",data: input.value});
    });
}

function sendBertQuery(input) { 
    console.log(input.value);
    alert(input.value);
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    	var activeTab = tabs[0];
    	chrome.tabs.sendMessage(activeTab.id, 
    		{type:"query", model_name: "bert", data: input.value});
    });
}

function documentEvents() {    
  document.getElementById('run_bm25_btn').addEventListener('click', 
    function() { sendBM25Query(document.getElementById('textbox'));
  });
  document.getElementById('run_brt_btn').addEventListener('click', 
    function() { sendBertQuery(document.getElementById('textbox'));
  });
}
