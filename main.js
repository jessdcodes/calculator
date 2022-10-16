let calculator = {
    num1: null,
    currNum: "0",
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
    if(calculator.currNum==="") {
        calculator.currNum = calculator.num1;
    }

    let total = operate(calculator.operator, calculator.num1, calculator.currNum);
    displayOutput(calculator.num1+calculator.operator+calculator.currNum+"=", "upper");
    total = Number((total).toFixed(10));
    calculator = {
        num1: total,
        currNum: total.toString(),
        operator: "",
        isPendingSecondNum: false
    }
}

function calculateTotalForOperator(){
    let total = operate(calculator.operator, calculator.num1, calculator.currNum);
    total = Number((total).toFixed(10));
    calculator = {
        num1: total,
        currNum: total.toString(),
        operator: calculator.operator,
        isPendingSecondNum: true
    }
}

function displayOutput(text, textLoc) {
    const upperOutput = document.querySelector(".upper-output");
    const lowerOutput = document.querySelector(".lower-output");

    
    if(textLoc==="upper") {
        upperOutput.textContent = text;
    } else {
        lowerOutput.textContent = text;
    }
}

function getCurrentOutput(){
    const upperOutput = document.querySelector(".upper-output");
    const lowerOutput = document.querySelector(".lower-output");

    return upperOutput.textContent+lowerOutput.textContent;
}

function getUpperOutput(){
    const upperOutput = document.querySelector(".upper-output");
    
    return upperOutput.textContent;
}

function clearOutput() {
    const upperOutput = document.querySelector(".upper-output");
    const lowerOutput = document.querySelector(".lower-output");

    lowerOutput.textContent = "";
    upperOutput.textContent = "";
}

function appendDecimal() {
    if(calculator.currNum==="") {
        calculator.currNum = "0.";
        displayOutput(calculator.currNum, "lower");
    }else if (((calculator.currNum).indexOf(".") == -1) || calculator.currNum==="0") {
        calculator.currNum = calculator.currNum + ".";
        displayOutput(calculator.currNum, "lower");
    }
}

function getLastChar(str) {
    const strLength = str.length;
    return str.charAt(strLength-1);
}

function handleOperator(e){
    const currOperator = this.textContent;
    const currOutput = getUpperOutput();
    const currOutputLength = currOutput.length;
    const lastChar = currOutput.charAt(currOutputLength-1);
    
    if(currOperator==="="){
        if(calculator.isPendingSecondNum){
            calculateTotalForEqual();
        } 
        displayOutput(calculator.currNum, "lower");
    } else {
        calculator.operator = currOperator;
        if(isNaN(lastChar) && calculator.currNum===""){
            displayOutput(calculator.num1+calculator.operator, "upper"); 
        } else {
            if(calculator.isPendingSecondNum){
                calculateTotalForOperator();
                displayOutput(calculator.num1+calculator.operator, "upper"); 
            } else {
                calculator.num1 = calculator.currNum;
                calculator.isPendingSecondNum = true;
                displayOutput(calculator.currNum+calculator.operator, "upper");
            }
            calculator.currNum = "";
        }
    }                                             
    
}

function storeNumber(e){
    if(getLastChar(getCurrentOutput())==='0'){
        calculator.currNum = this.textContent;
        displayOutput(this.textContent, "lower");
    } else {
        calculator.currNum = calculator.currNum + this.textContent;
        displayOutput(calculator.currNum, "lower");
    }
}

function resetValues(){
    displayOutput(0);
    calculator = {
        num1: null,
        currNum: "0",
        operator: "",
        isPendingSecondNum: false
    }
}

function removeLastDigit() {
    const currNumLen = calculator.currNum.length;
       
    if(currNumLen <= 1){
        calculator.currNum = "0";
    } else {
        calculator.currNum = calculator.currNum.substring(0, currNumLen-1);
    }
}

function deleteCurrNumber(){
    const currOutput = getCurrentOutput();
    const currOutputLength = currOutput.length;
    const lastChar = currOutput.charAt(currOutputLength-1);

    if((!isNaN(lastChar) || lastChar==".")) {
        if(!calculator.isPendingSecondNum){
            removeLastDigit(); 
        } else if(calculator.isPendingSecondNum) {
            removeLastDigit();
        }
        displayOutput(calculator.currNum, "lower");
    }
    
}

function clickBtns() {
    const digitsBtns = Array.from(document.querySelectorAll('button[data-number]'));
    const operatorBtns = Array.from(document.querySelectorAll('button[data-operator]'));
    const clearBtn = document.querySelector(".clear");
    const deleteBtn = document.querySelector(".delete");
    const decimalBtn = document.querySelector(".decimal");

    digitsBtns.forEach(btn => btn.addEventListener("click", storeNumber));
    operatorBtns.forEach(btn => btn.addEventListener("click", handleOperator));
    clearBtn.addEventListener("click", () => {
        clearOutput();
        resetValues();
    });
    deleteBtn.addEventListener("click", deleteCurrNumber);
    decimalBtn.addEventListener("click", appendDecimal);
}
