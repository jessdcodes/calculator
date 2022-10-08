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
    if(operator==="+"){
        return add(num1,num2); 
    } else if(operator==="-") {
        return subtract(num1,num2);
    } else if(operator==="x"){
        return multiply(num1,num2);
    } else if(operator==="x"){
        return divide(num1,num2);
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

function handleOperator(){

}

function storeNumber(){

}

function clickBtns() {
    const digitsBtns = Array.from(document.querySelectorAll('button[data-number]'));
    const operatorBtns = Array.from(document.querySelectorAll('button[data-operator]'));
    const clearBtn = document.querySelector(".clear");
    const decimalBtn = document.querySelector(".decimal");

    decimalBtn.addEventListener("click", () => {
        if(calculator.currNum==="") {
            calculator.currNum = "0.";
            displayOutput(getCurrentOutput()+calculator.currNum);
        } else if ((calculator.currNum).indexOf(".") == -1) {
            calculator.currNum = calculator.currNum + ".";
            displayOutput(getCurrentOutput()+".");
        }
    });

    clearBtn.addEventListener("click", () => {
        clearOutput();
        calculator.num1 = "";
        calculator.currNum = "";
        calculator.operator = "";
        calculator.isPendingSecondNum = false;
    });

    digitsBtns.forEach(btn => btn.addEventListener("click", ()=> {
        calculator.currNum = calculator.currNum + btn.textContent;
        displayOutput(getCurrentOutput()+btn.textContent);
    }));

    operatorBtns.forEach(btn => btn.addEventListener("click", ()=> {
        const currOperator = btn.textContent;
        const currOutput = getCurrentOutput();
        const currOutputLength = currOutput.length;
        const lastChar = currOutput.charAt(currOutputLength-1);

        if(currOutput.trim()!==""){
            if(currOperator==="=" && !isNaN(lastChar)){
                if(calculator.isPendingSecondNum){
                    console.log("calculator.operator="+calculator.operator+",calculator.num1:"+calculator.num1+",num2: "+calculator.currNum);
                    const total = operate(calculator.operator, calculator.num1, calculator.currNum);
                    calculator.num1 = total;
                    calculator.currNum = total;
                    calculator.operator = "";
                    calculator.isPendingSecondNum = false;
                    displayOutput(calculator.num1);
                } else {      
                    displayOutput(calculator.currNum);
                }
            } else {
                calculator.operator = currOperator;
                if(isNaN(lastChar)){
                    console.log("lastChar: "+lastChar);
                    displayOutput(calculator.num1+calculator.operator);
                } else {
                    calculator.num1 = calculator.currNum;
                    displayOutput(currOutput+calculator.operator);
                    calculator.isPendingSecondNum = true;
                    calculator.currNum = "";
                }
            }
        }
    }));

}
