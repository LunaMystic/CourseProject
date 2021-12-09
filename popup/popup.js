document.addEventListener('DOMContentLoaded', documentEvents);

function dostuff(input) { 
    console.log("input value is : " + input.value);
    alert("The entered data is : " + input.value);
}

function documentEvents() {    
  document.getElementById('run_btn').addEventListener('click', 
    function() { dostuff(document.getElementById('textbox'));
  });

}