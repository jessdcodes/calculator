let calculator = {
    num1: "",
    currNum: "",
    operator: "",
    isPendingSecondNum: false
}

clickBtns();

function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}

function operate(operator, num1, num2){

    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch(operator) {
        case "+":
            return add(num1,num2); 
        case "-":
            return subtract(num1,num2); 
        case "x":
            return multiply(num1,num2);
        case "÷":
            return divide(num1,num2);
    }

}

function calculateTotalForEqual(){
    const total = operate(calculator.operator, calculator.num1, calculator.currNum);
    calculator = {
        num1: total,
        currNum: total.toString(),
        operator: "",
        isPendingSecondNum: false
    }
}

function calculateTotalForOperator(){
    const total = operate(calculator.operator, calculator.num1, calculator.currNum);
    calculator = {
        num1: total,
        currNum: total.toString(),
        operator: calculator.operator,
        isPendingSecondNum: true
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

function clearOutput() {
    const output = document.querySelector(".output");
    output.textContent = "";
}

function appendDecimal() {
    console.log("calculator.currNum: "+calculator.currNum);
    if(calculator.currNum==="") {
        calculator.currNum = "0.";
        displayOutput(getCurrentOutput()+calculator.currNum);
    } else if ((calculator.currNum).indexOf(".") == -1) {
        calculator.currNum = calculator.currNum + ".";
        displayOutput(getCurrentOutput()+".");
    }
}

function handleOperator(e){
    const currOperator = this.textContent;
    const currOutput = getCurrentOutput();
    const currOutputLength = currOutput.length;
    const lastChar = currOutput.charAt(currOutputLength-1);

    if(currOutput.trim()!==""){
        if(currOperator==="=" && !isNaN(lastChar)){
            if(calculator.isPendingSecondNum){
                calculateTotalForEqual();
            } 
            displayOutput(calculator.currNum);
        } else if(currOperator==="=" && isNaN(lastChar)){
            displayOutput(calculator.num1+calculator.operator); 
        } else {
            calculator.operator = currOperator;
            if(isNaN(lastChar)){
                displayOutput(calculator.num1+calculator.operator); 
            } else {
                if(calculator.isPendingSecondNum){
                    calculateTotalForOperator();
                    displayOutput(calculator.num1+calculator.operator); 
                } else {
                    calculator.num1 = calculator.currNum;
                    calculator.isPendingSecondNum = true;
                    displayOutput(currOutput+calculator.operator);
                }
                calculator.currNum = "";
            }
        }
    }
}

function storeNumber(e){
    calculator.currNum = calculator.currNum + this.textContent;
    displayOutput(getCurrentOutput()+this.textContent);
}

function resetValues(){
    calculator = {
        num1: "",
        currNum: "",
        operator: "",
        isPendingSecondNum: false
    }
}

function clickBtns() {
    const digitsBtns = Array.from(document.querySelectorAll('button[data-number]'));
    const operatorBtns = Array.from(document.querySelectorAll('button[data-operator]'));
    const clearBtn = document.querySelector(".clear");
    const decimalBtn = document.querySelector(".decimal");

    decimalBtn.addEventListener("click", appendDecimal);

    clearBtn.addEventListener("click", () => {
        clearOutput();
        resetValues();
    });

    digitsBtns.forEach(btn => btn.addEventListener("click", storeNumber));

    operatorBtns.forEach(btn => btn.addEventListener("click", handleOperator));

}
