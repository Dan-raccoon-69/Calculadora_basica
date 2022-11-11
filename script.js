const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');
const body = document.querySelector('body');
// theme
const active = document.querySelector('.active');
let theme = false;
const dark = document.querySelector('.dark');
display.innerHTML = '';

buttons.forEach( item => {
    item.onclick = () => {
        if(item.id === 'clean')
            display.innerHTML = ''; 
        else if(item.id === 'D'){
            let cadena = display.innerHTML.toString();
            display.innerHTML = cadena.substring(0, cadena.length - 1);
        }
        else if(display.innerHTML != '' && item.id === '='){
            display.innerHTML = eval(display.innerHTML);
            console.log(display.innerHTML);
        }
        else if(display.innerHTML == '' && item.id === '='){
            // ejecuta esto por defecto y a los 2s se ejecuta el setTimeOut
            display.innerHTML = "Null";
            setTimeout( () => (display.innerHTML = ""),2000);
        }
        else {
            display.innerHTML += item.id;
        }
    };
});

active.addEventListener('click', () => {
    
    if(theme == false){
        
        console.log('Cambia de color...');
        body.style.background = 'linear-gradient(90deg,#f8f2ce,#ececec)';
        dark.style.background = '#13141a';
        theme = true;
    }
    else if(theme){
        body.style.background = 'black';
        dark.style.background = '#d2d09f';
        theme = false;
    }
});


