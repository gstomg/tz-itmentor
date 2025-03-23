let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let firstOperand = '';
let secondOperand = '';
let hasDecimal = false;
let isCalculated = false;

// Добавляем цифру на дисплей
function appendNumber(number) {
    if (isCalculated) {
        clearDisplay();
        isCalculated = false;
    }
    if (operator === '') {
        if (currentInput === '0' && number !== '.') {
            currentInput = number;
        } else {
            currentInput += number;
        }
    } else {
        if (currentInput === firstOperand || currentInput === '') {
            currentInput = number;
        } else {
            currentInput += number;
        }
    }
    updateDisplay();
}

// Добавляем десятичную точку
function appendDecimal() {
    if (isCalculated) {
        clearDisplay();
        isCalculated = false;
    }
    if (!hasDecimal) {
        if (currentInput === '' || currentInput === firstOperand) {
            currentInput = '0.';
        } else {
            currentInput += '.';
        }
        hasDecimal = true;
        updateDisplay();
    }
}

// Добавляем оператор
function appendOperator(op) {
    if (currentInput === '') return;
    if (firstOperand !== '' && operator !== '') {
        calculate();
    }
    operator = op;
    firstOperand = currentInput;
    currentInput = '';
    hasDecimal = false;
    isCalculated = false;
    updateDisplay();
}

// Вычисляем результат
function calculate() {
    if (currentInput === '' || operator === '' || firstOperand === '') return;

    secondOperand = currentInput;

    try {
        let result = operate(operator, parseFloat(firstOperand), parseFloat(secondOperand));
        display.textContent = result;
        currentInput = result.toString();
        operator = '';
        firstOperand = '';
        secondOperand = '';
        hasDecimal = currentInput.includes('.');
        isCalculated = true;
    } catch (error) {
        display.textContent = 'Error'; // Выводим ошибку
        clearDisplay(); // Сбрасываем калькулятор
    }
}

// Очищаем дисплей
function clearDisplay() {
    display.textContent = '0';
    currentInput = '';
    operator = '';
    firstOperand = '';
    secondOperand = '';
    hasDecimal = false;
    isCalculated = false;
}

// Выполняем арифметическую операцию
function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case 'x':
            return a * b;
        case '/':
            if (b === 0) {
                throw new Error("Division by zero"); // Выбрасываем ошибку
            }
            return a / b;
        default:
            throw new Error("Unknown operator"); // Выбрасываем ошибку для неизвестных операторов
    }
}

// Обновляем дисплей
function updateDisplay() {
    if (operator === '') {
        display.textContent = currentInput || '0';
    } else {
        display.textContent = `${firstOperand} ${operator} ${currentInput || ''}`;
    }
}
