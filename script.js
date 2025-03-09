const buttons = document.querySelectorAll('button');  
const display = document.querySelector('.display');  
const body = document.querySelector('body');  

const active = document.querySelector('.active');  
let theme = false;  
const dark = document.querySelector('.dark');  
display.innerHTML = '';  

const history = [];  
const historyList = document.createElement('ol');  
historyList.style.listStyleType = 'none';
body.appendChild(historyList);  

function deleteLastNumberAndOperator() {  
    let cadena = display.innerHTML.toString();  
    if (cadena.length === 0) return;  

    let lastOperatorIndex = -1;  
    for (let i = cadena.length - 1; i >= 0; i--) {  
        if (['+', '-', '*', '/'].includes(cadena[i])) {  
            lastOperatorIndex = i;  
            break;  
        }  
    }  

    if (lastOperatorIndex !== -1) {  
        display.innerHTML = cadena.substring(0, lastOperatorIndex);  
    } else {  
        display.innerHTML = '';  
    }  
}  

buttons.forEach(item => {  
    item.onclick = () => {  
        if (item.id === 'clean')  
            display.innerHTML = '';  
        else if (item.id === 'D') {  
            let cadena = display.innerHTML.toString();  
            display.innerHTML = cadena.substring(0, cadena.length - 1);  
        }  
        else if (item.id === 'deleteLastNumber') { 
            deleteLastNumberAndOperator();  
        }  
        else if (item.id === '.') {  
            if (display.innerHTML.includes('.')) {  
                return;  
            } else {  
                display.innerHTML += item.id;  
            }  
        }  
        else if (['+', '-', '*', '/'].includes(item.id)) {  
            const lastChar = display.innerHTML.slice(-1);  
            if (['+', '-', '*', '/'].includes(lastChar)) {  
                display.innerHTML = display.innerHTML.slice(0, -1) + item.id;  
            } else if (display.innerHTML === '' && item.id === '-') {  
                display.innerHTML += item.id;  
            }  
            else {  
                display.innerHTML += item.id;  
            }  
        }  
        else if (display.innerHTML != '' && item.id === '=') {  
            try {  
                const expression = display.innerHTML;  
                const result = eval(expression);  
                if (isNaN(result) || !isFinite(result)) {  
                    display.innerHTML = "Error";  
                    setTimeout(() => (display.innerHTML = ""), 1200);  
                } else {  
                    const formattedResult = parseFloat(result.toFixed(2));  
                    display.innerHTML = formattedResult;  

                    history.push(`${expression} = ${formattedResult}`);  
                    updateHistoryList();  
                }  
            } catch (error) {  
                display.innerHTML = "Error";  
                setTimeout(() => (display.innerHTML = ""), 1200);  
            }  
        }  
        else if (display.innerHTML == '' && item.id === '=') {  
            display.innerHTML = "Null";  
            setTimeout(() => (display.innerHTML = ""), 1200);  
        }  
        else {  
            if (display.innerHTML === '0') {  
                if (item.id === '0') {  
                    return;  
                } else if (item.id !== '.') {  
                    display.innerHTML = item.id;  
                } else {  
                    display.innerHTML += item.id;  
                }  
            } else {  
                display.innerHTML += item.id;  
            }  
        }  
    };  
});  

active.addEventListener('click', () => {  
    if (!theme) {  
        body.style.background = 'linear-gradient(90deg,#f8f2ce,#ececec)';  
        dark.style.background = '#13141a';  
    } else {  
        body.style.background = 'black';  
        dark.style.background = '#d2d09f';  
    }  
    theme = !theme;  
});  

function updateHistoryList() {  
    historyList.innerHTML = '';  
    for (let i = history.length - 1; i >= 0; i--) {  
        const listItem = document.createElement('li');  
        listItem.textContent = `[${[i + 1]}]    ${history[i]}`;  
        historyList.appendChild(listItem);  
    }  
}  