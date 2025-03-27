let display = document.getElementById('display');
let currentInput = ''; //текущий ввод пользователя
let operator = ''; //знак оператора
let firstOperand = ''; 
let secondOperand = '';
let hasDecimal = false; //отслеживание десятичной точки
let isCalculated = false; //флаг завершенного вычисления

// добавляем цифру на дисплей
function appendNumber(number) { 
    if (isCalculated) { //если было выполнено вычисление, то обнуляем калькулятор
        clearDisplay();
        isCalculated = false; //флаг вычисления сбрасывается
    } 
    if (operator === '' || operator === '-') { //если знак оператора не выбран или -
        if (currentInput === '0' && number !== '.') { //текущий ввод 0 и вводится не точка
            currentInput = number; //записываем цифру в переменную 
        } else {
            currentInput += number; //иначе добавляет цифру к текущему вводу
        }
    } else {
        if (currentInput === firstOperand || currentInput === '') {
            //если текущий ввод - первое число или пуст, начинается новый ввод
            currentInput = number;
        } else {
            currentInput += number; //иначе добавляет цифру к текущему вводу
        }
    }
    updateDisplay();
}

// добавляем десятичную точку
function appendDecimal() {
    if (isCalculated) {//если было выполнено вычисление, то обнуляем калькулятор
        clearDisplay();
        isCalculated = false;
    }

    if (currentInput === '-') { 
        currentInput = '-0.';
        hasDecimal = true;
        updateDisplay();
    }

    if (!hasDecimal) {//если точка не добавлена
        if (currentInput === '' || currentInput === firstOperand) {//если ввод пуст или равен первому числу
            currentInput = '0.'; //текущий ввод при отработки условий начинается так
        } else {//иначе добавляем точку к текущему вводу
            currentInput += '.';
        }
        if (currentInput === '-') {//если тек. ввод начинается с минуса
            currentInput = '-0.';}//при нажатии на точку будет добавляться 0
        hasDecimal = true;//флаг использования точки
        updateDisplay();//обновляем дисплей
    }
}

// обработка выбора оператора
function appendOperator(appendOp) {
   if (firstOperand !== '' && operator !== '') {//если есть первое число и первый оператор
        if (appendOp === '-') {//если второй оператор явл. минус
            switch (operator) {//если первый оператор
                case '+': //выбран плюс
                    operator = '-';//то первый оператор становится минусом
                    break;//выход
                case '-': //если текущий ввод числа с минуса и оператор выбран -, то игнорируем оператор
                    currentInput = '';
                    break;
                default://в остальных случаях (/ и *)
                    currentInput = '-'//текущий ввод числа отрицательное
            }
        } else {//иначе
            operator = appendOp; //обновление знака
        }
        updateDisplay();//обновление дисплея
        return; //выход
    }

    

    if (currentInput === '' && appendOp === '-') {//если тек. ввод пуст и оператор не минус
        currentInput = '-';//начинает ввод отрицательного числа
        updateDisplay();//обновить дисплей
        return;
    }
    if (currentInput === '-') return;//если тек. ввод только -, то игнорируем новый оператор
    if (currentInput === '' && appendOp !== '-') return; //если тек. ввод пуст и оператор не -, то игнорирует
    if (firstOperand !== '' && operator !== '') {// есть первое число  и есть оператор, то выполняется вычисление 
        calculate();
    }
    operator = appendOp;//устанавливаем новый оператор
    firstOperand = currentInput; //сохраняем первое число -тек. ввод
    currentInput = ''; //тек. ввод обнуляется
    hasDecimal = false; //флаг использования точки обнуляется 
    isCalculated = false; //флаг вычисление обнуляется
    updateDisplay();//обновляем дисплей
}

// производим вычисления
function calculate() {
    if (currentInput === '' || operator === '' || firstOperand === '') return;
    //если не хватает чисел или оператора, то выходим

    secondOperand = currentInput;
    //записываем второе число, кото. явл последним

    try {//конструкция, которая обрабатывает код и в случае чего выводит ошибку
        //выводит на экран результат и обнуляет оператор и числа, ставит флаг завершенного вычисления
        let result = operate(operator, parseFloat(firstOperand), parseFloat(secondOperand));
        //parseFLoat- функция преобразует введенную строку в число, в т. числе работает с десятичными числами
        display.textContent = result;
        currentInput = result.toString();//метод, который преобразует значение в строку
        //тк textContent работает только со строками и currentInput хранит только строки
        operator = '';
        firstOperand = '';
        secondOperand = '';
        hasDecimal = currentInput.includes('.');//метод, который проверяет есть ли точка
        isCalculated = true;
    } catch (error) {//код, который выполнится при ошибке
        display.textContent = 'Error'; // Выводим ошибку
        clearDisplay(); // Сбрасываем калькулятор
    }
}

// очищаем дисплей
function clearDisplay() {//сбрасываем все переменные в начальное  состояние, дисплей 0
    display.textContent = '0';
    currentInput = '';
    operator = '';
    firstOperand = '';
    secondOperand = '';
    hasDecimal = false;
    isCalculated = false;
}

// выполняем арифметическую операцию
function operate(operator, a, b) {//
    switch (operator) {//если оператор, то 
        case '+':
            return a + b;
        case '-':
            return a - b;
        case 'x':
            return a * b;
        case '/':
            if (b === 0) {//если делим на ноль
                return "Error"; // выводит ошибку
            }
            return a / b;
        default:
            return "Error"; // выводим ошибку для неизвестных операторов
    }
} //switch - оператор условного ветвления, которы позволяет сравнивать одно значение с множеством
//вариантов и выполнять соот-ий блок кода

// обновление дисплея
function updateDisplay() {
    if (operator === '') {//если оператор не выбран
        display.textContent = currentInput || '0'; //показывает текущий ввод, если нет ввода,то 0
    } else {//иначе выводится первое число оператор текущий ввод- второе число, или пустота для второго числа
        display.textContent = `${firstOperand} ${operator} ${currentInput || ''}`;
    }
}
//textContent - предоставляет доступ к тексту внутри элемента
