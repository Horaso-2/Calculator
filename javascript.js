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

let calculation = [];

btns = document.querySelectorAll('button');
btns.forEach((btn) => {

    btn.addEventListener('mouseenter', () => {
        increaseOpacity(btn)
    });

    btn.addEventListener('mouseleave', () => {
        decreaseOpacity(btn)
        });

});


let increaseOpacity = (element) => {
    const newOpacity = +getComputedStyle(element).opacity - 0.1;
    element.style.opacity = `${newOpacity}`;
};

let decreaseOpacity = (element) => {
    const newOpacity = +getComputedStyle(element).opacity + 0.1;
    element.style.opacity = `${newOpacity}`;
};

let enterInput = (element) => {
    if (element.classList.contains('digit')) {
        let input = +element.innerText;
        calculation.push(input);
    }

}