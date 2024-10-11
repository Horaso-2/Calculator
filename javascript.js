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
const maxLengthOfInput = 19

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
    if (arg1_on && arg1 === '-') return;

    calculation_done = false;

    // handles the case if user carries on with a result from previous calculation
    if (!(arg1 === '') && !(arg2 === '')) {
        computeInput();
        calculation_done = false;
    }

    if ('*/+'.includes(elem)) {
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

    // If the input has reached max length, do not accept further inputs to this arg
    if (inputLine.textContent.length >= 19) {
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
        if ((arg1_on) && (arg1.contains('.'))) {
            return
        }

        if ((!arg1_on) && (arg2.contains('.'))) {
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
    if (String(result).length >= 19) {
        result = result.toExponential();
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




