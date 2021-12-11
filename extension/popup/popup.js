document.addEventListener('DOMContentLoaded', documentEvents);

function dostuff(input) { 
    console.log(input.value);
    alert(input.value);
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    	var activeTab = tabs[0];
    	chrome.tabs.sendMessage(activeTab.id, {type:"query", data: input.value});
    });
}

function documentEvents() {    
  document.getElementById('run_btn').addEventListener('click', 
    function() { dostuff(document.getElementById('textbox'));
  });

}
