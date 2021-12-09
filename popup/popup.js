document.addEventListener('DOMContentLoaded', documentEvents);

function dostuff(input) { 
    console.log(input.value);
    alert(input.value);
}

function documentEvents() {    
  document.getElementById('run_btn').addEventListener('click', 
    function() { dostuff(document.getElementById('textbox'));
  });

}
