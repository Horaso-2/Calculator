function operate (arg1, op, arg2) {
    arg1 = (arg1 === '') ? 0 : +arg1;
    arg2 = (arg2 === '') ? +arg1 : +arg2;
    if (!op) {
        op = '+';
        arg1 = +calculation;
    };  
    switch(op) {
        case '+':
            return add(arg1, arg2);
        case '-':
            return subtract(arg1, arg2);
        case '*':
            return multiply(arg1, arg2);
        case '/':
            return divide(arg1, arg2)
    }
}

function add (arg1, arg2) {
    return arg1 + arg2;
}

function multiply (arg1, arg2) {
    return arg1 * arg2;
}

function divide (arg1, arg2) {
    return arg1/arg2;
}

function subtract (arg1, arg2) {
    return arg1 - arg2;
}

btns = document.querySelectorAll('button');
btns.forEach((btn) => {
    btn.addEventListener('mouseenter', () => {
        increaseOpacity(btn)
    });

    btn.addEventListener('mouseleave', () => {
        decreaseOpacity(btn)
    });

    btn.addEventListener('mousedown', () => {
        increaseOpacity(btn);
    });

    btn.addEventListener('mouseup', () => {
        decreaseOpacity(btn);
    });

    btn.addEventListener('click', () => {
        if (btn.classList.contains('digit') || btn.classList.contains('dot')) receiveDigitOrDot(btn.textContent);
        if (btn.classList.contains('op')) receiveOperator(btn.textContent);
        if (btn.classList.contains('eq')) computeInput();
        if (btn.classList.contains('delete')) deleteInput();
    });
});

let inputLine = document.querySelector('.compute');
const initialOpacity = +getComputedStyle(document.querySelector('button')).opacity;

let increaseOpacity = (element) => {
    const newOpacity = +getComputedStyle(element).opacity - 0.1;
    element.style.opacity = `${newOpacity}`;
};

let decreaseOpacity = (element) => {
    const newOpacity = +getComputedStyle(element).opacity + 0.1;
    element.style.opacity = `${newOpacity}`;
};

let resetOpacity = () => btns.forEach((btn) => {
    btn.style.opacity = initialOpacity;
});

let clearInputLine = () => inputLine.textContent = '';

// This variable will store arg1, operator and arg2
let calculation = '';

// Input line on the calculator can take this many symbols without stretching
const maxLengthOfInput = 15;

// arg1 and arg2 are strings but will be passed to operate() as numbers
let arg1 = '';
let arg2 = '';
let operator = '';
// By default, the first input entered correspond to the first argument of the operation.
// This boolean keeps track of whether the input is part of arg1 or arg2
let arg1_on = true

let calculation_done = false

let deleteInput = () => {
    clearInputLine();
    calculation = '';
    arg1 = '';
    arg2 = '';
    operator = '';
    calculation_done = false;
    arg1_on = true;
};


function receiveOperator(elem) {
    if (arg1_on && (arg1 === '-')) return;

    calculation_done = false;

    // handles the case if user carries on with a result from previous calculation
    if (!(arg1 === '') && !(arg2 === '')) {
        computeInput();
        calculation_done = false;
    }

    if ('*/+'.includes(elem)) {
        if (arg1 === '') return;
        arg1_on = false;
        operator = elem;
    } 

    // Need the following functionality for '-': 
    // If it figures as the first symbol of arg1, show it. If not, do not.
    if (elem === '-') {
        if (arg1_on && arg1 === '') {
            inputLine.textContent += elem;
            arg1 += elem;
        } else {
            arg1_on = false;
            operator = elem;
        }
    }
}

function receiveDigitOrDot(elem) {

    // NEED TO HANDLE THE CORNER CASE: len(arg1) = 16 but we still need to accept arg2 and display it. But the function returns due to the first if-conditions

    // If the input has reached max length, do not accept further inputs to this arg
    if (inputLine.textContent.length >= maxLengthOfInput) {
        return
    }

    if (calculation_done === true) {
        deleteInput();
        // arg1_on = true;
        arg1 += elem;
        inputLine.textContent += elem;
        return
    }

    if (elem === '.') {
        if ((arg1_on) && (arg1.includes('.'))) {
            return
        }

        if ((!arg1_on) && (arg2.includes('.'))) {
            return
        }
    }
    
    if (arg1_on) {
        arg1 += elem;
        inputLine.textContent += elem;
    } else {
        inputLine.textContent = (arg2 === '') ? elem : inputLine.textContent + elem;
        arg2 += elem;
    }
}

function computeInput() {
    let result = operate(arg1, operator, arg2);

    // check if result is too big or too long
    if (result >= Number.MAX_SAFE_INTEGER) {
        result = result.toExponential(6)
    } else if (String(result).length >= maxLengthOfInput) {
        result = (String(result).includes('.')) ? result.toFixed(maxLengthOfInput) : result.toExponential(6);
    }

    inputLine.textContent = String(result);

    // Annul operator and second argument to prepare for next calculation. 
    // Save result into arg1 in case the user wants to continue manipulating the result immediately
    arg2 = '';
    operator = '';
    arg1 = String(result);
    calculation_done = true;
}

// SUPPRESS ENTER FROM TRIGGERING LAST PRESSED BUTTON
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') e.preventDefault();
});

document.addEventListener('keydown', (event) => {
    let key = event.key;

    if (('0123456789.').includes(key)) {
        receiveDigitOrDot(key);
    };

    if (('+/*-').includes(key)) {
        receiveOperator(key);
    };

    if (key === 'Delete') {
        deleteInput();
    };

    if (key === 'Backspace') {
        if (arg1_on && arg1.length > 0) {
            arg1 = arg1.slice(0, -1);
            inputLine.textContent = inputLine.textContent.slice(0, -1);
        }

        if (!arg1_on && arg2 !== '') {
            arg2 = arg2.slice(0, -1);
            inputLine.textContent = inputLine.textContent.slice(0, -1);
        }
    };  

    if (key === 'Enter') {
        computeInput();
    };
});




