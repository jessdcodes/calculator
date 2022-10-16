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

    if(operator==="÷" && num2==0){
        return "ERROR";
    }

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

function getTotal(){
    const total = operate(calculator.operator, calculator.num1, calculator.currNum);

    return total;
}

function calculateTotal(operator) {
    let totalStatus = "ERROR";
    if(operator==="=") {
        if(calculator.currNum==="") {
            calculator.currNum = calculator.num1;
        } 
    }

    let total = getTotal();
    if(total !== "ERROR"){
        total = Number((total).toFixed(10));
        if(operator==="="){
            displayOutput(calculator.num1+calculator.operator+calculator.currNum+"=", "upper");
            setCalc(total, total.toString(), "", false);
        } else {
            setCalc(total, total.toString(), calculator.operator, true);
        }

        return "SUCCESS";
    } 
    return "ERROR";
}

function setCalc(num1, currNum, operator, isPendingSecondNum) {
    calculator = {
        num1: num1,
        currNum: currNum,
        operator: operator,
        isPendingSecondNum: isPendingSecondNum
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

    lowerOutput.textContent = "0";
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
            if(calculateTotal("=")==="SUCCESS"){
                displayOutput(calculator.currNum, "lower");
            } else {
                displayOutput("", "upper");
                displayOutput("ERROR", "lower");
            }
        } 
    } else {
        calculator.operator = currOperator;
        if(isNaN(lastChar) && calculator.currNum===""){
            displayOutput(calculator.num1+calculator.operator, "upper"); 
        } else {
            if(calculator.isPendingSecondNum){
                if(calculateTotal(currOperator)==="SUCCESS"){
                    displayOutput(calculator.num1+calculator.operator, "upper"); 
                    displayOutput(calculator.num1, "lower");
                } else {
                    displayOutput("", "upper");
                    displayOutput("ERROR", "lower");
                }
               
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
