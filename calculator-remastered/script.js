const outputDisplay = document.getElementById('output');
let output = ['0'];
let negative = false;

function updateDisplay() {
    if (output == []) {
        output = ['0'];
        outputDisplay.textContent = output.join(' ');
    } else {
        outputDisplay.textContent = output.join(' ');
    }
}

function operation(input) {
    if (input === '1' || input === '2' || input === '3' || input === '4' || input === '5' || input === '6' || input === '7' || input === '8' || input === '9' || input === '0') {
        if (output[0] === '0' && output.length === 1) {
            output = [];
        }
        output.push(input);
        updateDisplay();
    }
    if (input === 'add' || input === 'subtract' || input === 'multiply' || input === 'divide') {
        if (output.includes('+') === false && output.includes('-') === false && output.includes('*') === false && output.includes('/') === false) {
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
        }
    }
    if (input === 'equal') {
        let operation = outputDisplay.textContent.split(' ');
        let length = operation.length;
        let firstNumArray = [];
        let secondNumArray = [];
        let operationType;
        for (let i = 0; i < length; i++) {
            if (operation[0] !== '+' && operation[0] !== '-' && operation[0] !== '*' && operation[0] !== '/') {
                    firstNumArray.push(operation[0]);
                    operation.shift();
            } else {
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
        result = String(result).split('');

        output.push('= ' + result.join(' '));
        updateDisplay();
        output = result;
    }
    if (input === 'clear') {
        output = ['0'];
        updateDisplay();
    }
    if (input === 'delete') {
        output.pop();
        updateDisplay();
    }
}
