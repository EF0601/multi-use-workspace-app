const outputDisplay = document.getElementById('output');
let output = ['0'];
let allClear = false;
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
        allClear = true;
        document.getElementById('clearBtn').textContent = 'AC';
    } else {
        outputDisplay.textContent = output.join(' ');
        outputDisplay.textContent = removeSymbols(outputDisplay.textContent.split(''));
    }
}

function updatePreviousOperations() {
    if (previousOperations.operation1 != '') {
        previousOperations.operation2 = previousOperations.operation1;
        document.getElementById('previousCalc2').textContent = previousOperations.operation2;
    }
    previousOperations.operation1 = outputDisplay.textContent;
    document.getElementById('previousCalc1').textContent = previousOperations.operation1;
}
/*
* NOTE: updatePreviousOperations() is called after the updateDisplay() function.
Otherwise, it will not work!
*/

function operation(input) {
    if (output[0] === '0' && output.length === 1) {
        output = [];
    }
    if (input === '1' || input === '2' || input === '3' || input === '4' || input === '5' || input === '6' || input === '7' || input === '8' || input === '9' || input === '0') {
        allClear = false;
        document.getElementById('clearBtn').textContent = 'C';
        output.push(input);
        updateDisplay();
    }
    if (input === 'add' || input === 'subtract' || input === 'multiply' || input === 'divide' || input === 'exponent' || input === 'root'
    ) {
        // if (output.includes('+') === false && output.includes('*') === false && output.includes('/') === false) {
        decimal = false;
        allClear = false;
        document.getElementById('clearBtn').textContent = 'C';

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

            case 'exponent':
                output.push('^');
                break;

            case 'root':
                output.push('r');
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
            if (operation[0] !== '+' && operation[0] !== '*' && operation[0] !== '/' && operation[0] !== '-' && operation[0] !== '^' && operation[0] !== 'r') {
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
            case '^':
                result = Math.pow(parseFloat(firstNum), parseFloat(secondNum));
                break;
            case 'r':
                result = Math.pow(parseFloat(firstNum), 1 / parseFloat(secondNum));
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
        else {
            result = String(result).split('');

            output.push('= ' + result.join(' '));
            updateDisplay();
            updatePreviousOperations();
            output = result;
        }

    }
    if (input === 'clear') {
        if (allClear) {
            previousOperations.operation1 = '';
            previousOperations.operation2 = '';
            document.getElementById('previousCalc1').textContent = '-';
            document.getElementById('previousCalc2').textContent = '-';
            allClear = false;
            document.getElementById('clearBtn').textContent = 'C';
        }
        else {
            output = ['0'];
            updateDisplay();
            allClear = true;
            document.getElementById('clearBtn').textContent = 'AC';
        }
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
        updatePreviousOperations();
        output = result;
    }
    if (input === 'abs') {
        let number = output.join('');
        let result = Math.abs(number);
        result = String(result).split('');
        output = [];
        output.push('| ' + number + ' | = ' + result);
        updateDisplay();
        updatePreviousOperations();
        output = result;
    }
    if (input === "square-root") {
        let number = output.join('');
        let result = Math.sqrt(number);
        result = String(result).split('');
        output = [];
        output.push('sqrt(' + number + ') = ' + result);
        updateDisplay();
        updatePreviousOperations();
        output = result;
    }
    if (input === 'cube-root') {
        let number = output.join('');
        let result = Math.cbrt(number);
        result = String(result).split('');
        output = [];
        output.push('cbrt(' + number + ') = ' + result);
        updateDisplay();
        updatePreviousOperations();
        output = result;
    }
    if (input === 'square') {
        let number = output.join('');
        let result = Math.pow(number, 2);
        result = String(result).split('');
        output = [];
        output.push(number + '^2 = ' + result);
        updateDisplay();
        updatePreviousOperations();
        output = result;
    }
    if (input === 'cube') {
        let number = output.join('');
        let result = Math.pow(number, 3);
        result = String(result).split('');
        output = [];
        output.push(number + '^3 = ' + result);
        updateDisplay();
        updatePreviousOperations();
        output = result;
    }
    if (input === 'pi') {
        output.push(Math.PI);
        updateDisplay();
    }
    if (input === 'reciprocal') {
        let number = output.join('');
        let result = 1 / number;
        result = String(result).split('');
        output = [];
        output.push('1 / ' + number + ' = ' + result);
        updateDisplay();
        updatePreviousOperations();
        output = result;
    }
}

updateDisplay();

allClear = true;
document.getElementById('clearBtn').textContent = 'AC';
