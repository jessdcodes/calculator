
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

function addBtnActions() {
    const digitsBtns = Array.from(document.querySelectorAll('button[data-number]'));
    const operatorBtns = Array.from(document.querySelectorAll('button[data-operator]'));

    let num1 = "";
    let currNum = "";
    let operator = "";
    let isPendingSecondNum = false;

    digitsBtns.forEach(btn => btn.addEventListener("click", ()=> {
        currNum = currNum + btn.textContent;
        displayOutput(getCurrentOutput()+btn.textContent);
    }));

    operatorBtns.forEach(btn => btn.addEventListener("click", ()=> {
        const currOperator = btn.textContent;
        const currOutput = getCurrentOutput();
        const currOutputLength = currOutput.length;
        const lastChar = currOutput.charAt(currOutputLength-1);

        if(currOutput.trim()!==""){
            if(currOperator==="=" && !isNaN(lastChar)){
                if(isPendingSecondNum){
                    console.log("operator="+operator+",num1:"+num1+",num2: "+currNum);
                    const total = operate(operator, num1, currNum);
                    num1 = total;
                    operator = "";
                    isPendingSecondNum = false;
                    displayOutput(num1);
                } else {      
                    if(num1===""){
                        num1 = currNum;
                    }        
                    displayOutput(num1);
                }
            } else {
                operator = currOperator;
                if(isNaN(lastChar)){
                    console.log("lastChar: "+lastChar);
                    displayOutput(num1+operator);
                } else {
                    if(num1===""){
                        num1 = currNum;
                    }
                    displayOutput(currOutput+operator);
                    isPendingSecondNum = true;
                    currNum = "";
                }
            }
        }
    }));

}

addBtnActions();