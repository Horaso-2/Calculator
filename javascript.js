function operate (arg1, op, arg2) {
    switch(op) {
        case '+':
            add(arg1, arg2);
        case '-':
            subtract(arg1, arg2);
        case '*':
            multiply(arg1, arg2);
        case '/':
            divide(arg1, arg2)
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