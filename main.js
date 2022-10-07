
function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 - num2;
}

function divide(num1, num2){
    return num1 / num2;
}

function operate(operator, num1, num2){

    if(operator==="+"){
        add(num1,num2); 
    } else if(operator==="-") {
        subtract(num1,num2);
    } else if(operator==="x"){
        multiply(num1,num2);
    } else if(operator==="x"){
        divide(num1,num2);
    }
}

function displayOutput(text) {
    const output = document.querySelector(".output");
    output.textContent = text;
}

function getCurrentOutput(){
    const output = document.querySelector(".output");
    return output.textContent;
}

function addBtnActions() {
    const digitsBtns = Array.from(document.querySelectorAll('button[data-number]'));
    const operatorBtns = Array.from(document.querySelectorAll('button[data-operator]'));

    let num1 = "";
    let num2 = "";
    let currentOperator;
    digitsBtns.forEach(btn => btn.addEventListener("click", ()=> {
        displayOutput(getCurrentOutput()+""+btn.textContent);
    }));

    operatorBtns.forEach(btn => btn.addEventListener("click", ()=> {
        const currOperator = btn.textContent;
        const lastChar = getCurrentOutput().substring(-1);
        const currOutput = getCurrentOutput();

        if(isNaN(lastChar)){
            displayOutput(num1+" "+currOperator+" ");
        } else { 
            num1 = parseInt(currOutput);
            displayOutput(currOutput+" "+currOperator+" ");
        }
    }));

}

addBtnActions();