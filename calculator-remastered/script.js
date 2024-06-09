const outputDisplay = document.getElementById('output');
let output = ['0'];
let negative = false;
let decimal = false;

let previousOperations = {
    operation1: "",
    operation2: "",
};

function removeSymbols(input) {
    for (let i = 0; i < input.length; i++) {
        if (input[i] === ',') {
            input.splice(i, 1);
        }
    }
    return input.join(' ');
}

function updateDisplay() {
    if (output == []) {
        output = ['0'];
        outputDisplay.textContent = output.join(' ');
        outputDisplay.textContent = removeSymbols(outputDisplay.textContent.split(''));
    } else {
        outputDisplay.textContent = output.join(' ');
        outputDisplay.textContent = removeSymbols(outputDisplay.textContent.split(''));
    }
}

function operation(input) {
    if (output[0] === '0' && output.length === 1) {
        output = [];
    }
    if (input === '1' || input === '2' || input === '3' || input === '4' || input === '5' || input === '6' || input === '7' || input === '8' || input === '9' || input === '0') {
        output.push(input);
        updateDisplay();
    }
    if (input === 'add' || input === 'subtract' || input === 'multiply' || input === 'divide') {
        // if (output.includes('+') === false && output.includes('*') === false && output.includes('/') === false) {
            decimal = false;
            switch (input) {
                case 'add':
                    output.push('+');
                    break;

                case 'subtract':
                    output.push('-');
                    break;

                case 'multiply':
                    output.push('*');
                    break;

                case 'divide':
                    output.push('/');
                    break;

                default:
                    break;
            }
            updateDisplay();
        // }
    }
    if (input === 'equal') {
        let operation = outputDisplay.textContent.split(' ');
        let length = operation.length;
        let firstNumArray = [];
        let secondNumArray = [];
        let operationType;
        for (let i = 0; i < length; i++) {
            if (operation[0] !== '+' && operation[0] !== '*' && operation[0] !== '/' && operation[0] !== '-') {
                    // console.log(operation[0]);
                    // console.log(i);
                    firstNumArray.push(operation[0]);
                    operation.shift();
            }
            else if (operation[0] === '-' && i === 0) {
                firstNumArray.push(operation[0]);
                operation.shift();
            }
            else {
                operationType = operation[0];
                operation.shift();
                break;
            }
        }
        length = operation.length;
        for (let i = 0; i < length; i++) {
            secondNumArray.push(operation[0]);
            operation.shift();
        }
        let firstNum = firstNumArray.join('');
        let secondNum = secondNumArray.join('');

        let result;
        switch (operationType) {
            case '+':
                result = parseFloat(firstNum) + parseFloat(secondNum);
                break;
            case '-':
                result = parseFloat(firstNum) - parseFloat(secondNum);
                break;
            case '*':
                result = parseFloat(firstNum) * parseFloat(secondNum);
                break;
            case '/':
                result = parseFloat(firstNum) / parseFloat(secondNum);
                break;

            default:
                break;
        }
        if (isNaN(result)) {
            result = 'Error';
            result = String(result).split('');

            output.push('= ' + result.join(' '));
            updateDisplay();
            // output = result;
            output = ['0']; // Reset the output
        }
        else{
            result = String(result).split('');

            output.push('= ' + result.join(' '));
            updateDisplay();
            if (previousOperations.operation1 != '') {
                previousOperations.operation2 = previousOperations.operation1;
                document.getElementById('previousCalc2').textContent = previousOperations.operation2;
            }
            previousOperations.operation1 = outputDisplay.textContent;
            document.getElementById('previousCalc1').textContent = previousOperations.operation1;
            output = result;
        }

    }
    if (input === 'clear') {
        output = ['0'];
        updateDisplay();
    }
    if (input === 'delete') {
        output.pop();
        updateDisplay();
    }
    if (input === 'decimal') {
        if (decimal === false) {
            if (output.length === 0 || isNaN(output[output.length - 1])) {
                output.push('0 .');
                decimal = true;
            }
            else if (output.length > 0) {
                output.push('.');
                decimal = true;
            }
            updateDisplay();
        }
    }
    if (input === 'factorial') {
        let number = output.join('');
        let result = 1;
        for (let i = 1; i <= number; i++) {
            result *= i;
        }
        result = String(result).split('');

        output.push('! = ' + result);
        updateDisplay();
        output = result;
    }
}
