const outputDisplay = document.getElementById('output');
let output = "";

function updateDisplay(){
     outputDisplay.textContent = String(output);
}

function operation(input){
     if(input === 'clear'){
          output = "";
          updateDisplay();
     }
     if(input === '1' || input === '2' || input === '3' || input === '4' || input === '5' || input === '6' || input === '7' || input === '8' || input === '9' || input === '0'){
          output = output + input;
          updateDisplay();
     }
}