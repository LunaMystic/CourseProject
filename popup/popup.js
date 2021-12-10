<<<<<<< HEAD
function popup() {
  console.log("button pressed")
  console.log(document.documentElement.innerHTML);
  q = document.getElementById('textbox').value;
  console.log(q); 
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "start", data:q});
=======
document.addEventListener('DOMContentLoaded', documentEvents);

function dostuff(input) { 
    console.log(input.value);
    alert(input.value);
}

function documentEvents() {    
  document.getElementById('run_btn').addEventListener('click', 
    function() { dostuff(document.getElementById('textbox'));
>>>>>>> b7a9b2fe0896aff21f9f4100ca4761ddbed3bab6
  });
}

<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("run_btn").addEventListener("click", popup);
});
=======
}
>>>>>>> b7a9b2fe0896aff21f9f4100ca4761ddbed3bab6
