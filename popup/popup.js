function popup() {
  console.log("button pressed")
  console.log(document.documentElement.innerHTML);
  q = document.getElementById('textbox').value;
  console.log(q); 
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "start", data:q});
  });
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("run_btn").addEventListener("click", popup);
});
