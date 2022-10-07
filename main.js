
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
    let currNum = "";
    let operator = "";
    let isSecondNumAvail = false;

    digitsBtns.forEach(btn => btn.addEventListener("click", ()=> {
        currNum = currNum + btn.textContent;
        displayOutput(getCurrentOutput()+""+btn.textContent);
    }));

    operatorBtns.forEach(btn => btn.addEventListener("click", ()=> {
        const currOperator = btn.textContent;
        const lastChar = getCurrentOutput().substring(-1);
        const currOutput = getCurrentOutput();

        if(currOutput.trim()!==""){
            if(currOperator==="=" && (num1.trim()!=="" && currNum.trim()!=="")){
            } else {
                operator = currOperator;
                if(isNaN(lastChar)){
                    displayOutput(num1+" "+operator+" ");
                } else { 
                    num1 = currOutput;
                    if(currOperator==="="){
                        displayOutput(num1);
                    } else {
                        displayOutput(currOutput+" "+operator+" ");
                    }
                }
            }
        }
    }));

}

addBtnActions();