function operate (arg1, op, arg2) {
    arg1 = (arg1 === '') ? 0 : +arg1;
    arg2 = (arg2 === '') ? 0 : +arg2;
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
        if (btn.classList.contains('digit')) inputNumber(btn.textContent);
        if (btn.classList.contains('op')) inputOperator(btn.textContent);
        if (btn.classList.contains('eq')) computeInput();
        if (btn.classList.contains('delete')) deleteInput();
        if (btn.classList.contains('dot')) inputDot(btn.textContent);
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

let updateInputLine = (update) => {
    if (inputLine.textContent === 'NaN' || inputLine.textContent === 'Infinity') return;
    inputLine.textContent += String(update);

    if (inputLine.textContent.length > 19 && inputLine.textContent.includes('.')) {
        inputLine.textContent = parseFloat(inputLine.textContent).toFixed(maxLengthOfInput - inputLine.textContent.indexOf('.') - 1);
        return
    }

    if (inputLine.textContent.length > 19) {
        inputLine.textContent = String(Number(inputLine.textContent).toExponential(5));
    }

};

// This variable will store arg1, operator and arg2
let calculation = '';

// Input line on the calculator can take this many symbols without stretching
const maxLengthOfInput = 19

// arg1 and arg2 are strings but will be passed to operate() as numbers
let arg1 = '';
let arg2 = '';
let operator = '';
let answerPrinted = false;

let operatorIndex = null;

let deleteInput = () => {
    clearInputLine();
    calculation = '';
    arg1 = '';
    arg2 = '';
    operator = '';
    answerPrinted = false;
};

let inputNumber = (elem) => {
        // check if the number replaces previous answer
        // check if the number extends existing argument
    if (answerPrinted) {
        deleteInput();
        clearInputLine();
        answerPrinted = false; 
    };
    // Need to implement the following. Inputting numbers after operators must allow display to show '-2' if '-' is the first character on display
    // But if another '-' is entered, the display must be wiped
    // So, '-' should not trigger deletion but '-2' should
    if (('+*/'.includes(calculation.slice(-1))) || (('-').includes(calculation.slice(-1)) && inputLine.textContent !== '-')) clearInputLine();
    calculation += elem;
    updateInputLine(elem);
};

let inputOperator = (elem) => {
    if ('+-*/'.includes(calculation.slice(-1))) {calculation = calculation.slice(0, -1)}
    if (calculation.includes('*') || calculation.includes('-') || calculation.includes('/') || calculation.includes('-')) {
        computeInput();
    };
    if (elem === '-' && inputLine.textContent.length === 0) inputLine.textContent += elem;
    operatorIndex = calculation.length; 
    arg1 = calculation;
    operator = elem;
    calculation += elem;
    answerPrinted = false;
};

let allowDot = () => {
    return inputLine.textContent.includes('.') ? false : true;
}

let inputDot = (elem) => {
    if (allowDot()) {
        calculation += elem;
        updateInputLine(elem);
    }
};

// THERE IS SOMETHING BAD GOING ON HERE: try inputting, e.g., 6, +, 9, *, 2
// Not only will it not produce intermediate result after '*' has been entered, it will give a NaN on the entire calculation
// Need to look into the if-condition of the computeInput()

let computeInput = () => {
    if (operator) {
        arg2 = calculation.slice(operatorIndex + 1);
        result = operate(arg1, operator, arg2);
    } else {
        result = inputLine.textContent;
    }
    calculation = String(result);
    clearInputLine();
    updateInputLine(result);
    arg1 = calculation;
    arg2 = '';
    answerPrinted = true;
}




// SUPPRESS ENTER FROM TRIGGERING LAST PRESSED BUTTON
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') e.preventDefault();
});

function inputTooLong () {
    if (inputLine.textContent.length >= 19) {
        return True
    }
    return False
}





// document.addEventListener('keydown', (event) => {
//     let key = event.key;

//     if (('0123456789.').includes(key)) {
//         updateInputLine(key);
//     };

//     if (('+/*-').includes(key)) {
//         if (!('+/*-'.includes(inputLine.textContent.charAt(inputLine.textContent.length-1)))){
//             updateInputLine(key);
//         } else {
//             let line = inputLine.textContent;
//             inputLine.textContent = line.slice(0, -1) + key;
//         };
//     };

//     if (key === 'Delete') {
//         clearInputLine();
//     };

//     if (key === 'Backspace') {
//         let line = inputLine.textContent;
//         inputLine.textContent = line.slice(0, -1);
//     };  

//     // SOMETHING LIKE BELOW FOR EQUALS
//     //
//     // if (key === '=') {
//     //     checkLastCharNotOperator()
//     //     checkDivByZero()
//     //     computeCalculation()
//     // }
// });


// Keep track of two things: the string on the screen and the string collecting the entire input
// When the user enters, in succession, '2', '+', '3', the string on the screen demonstrates single numbers; the memory string collects '2+3' and 
// collects the thing before '+' into arg1 and the thing after it into arg2 and passes them into function according to the operator (add(arg1, arg2) in this case)
// The answer is then displayed


// How to implement?
// First, the display does not get updated with operators - only with 1-9 and '.'
// Second, the function corresponding to the operator pressed in called when the user presses '='




