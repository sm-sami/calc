const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const mainScreen = document.querySelector("h3");
const secondaryScreen = document.querySelector("h5");

let expression = "";
numbers.forEach(number => {
    number.addEventListener("click", () => {
        if(mainScreen.innerText != ""){
            expression = "";
            secondaryScreen.innerText = null;
            mainScreen.innerText = null;
        }
        expression += number.innerHTML;
        secondaryScreen.append(number.innerHTML);
    });
});


operators.forEach(operator => {
    operator.addEventListener("click", () => {
        if(secondaryScreen.innerText != ""){
            if(secondaryScreen.innerText.includes("=")){
                expression = mainScreen.innerText;
                secondaryScreen.innerText = mainScreen.innerText;
                mainScreen.innerText = null;
            }

            if(["+", "-", "*", "/"].indexOf(secondaryScreen.innerText.split("").slice(-1)[0]) == -1){
                expression += operator.innerHTML;
                secondaryScreen.append(operator.innerHTML);
            }
        }
    });
});

equals.addEventListener("click", () => {
    try{
        let answer = eval(expression)
        mainScreen.innerText = answer;
        secondaryScreen.append("=");
    }catch(SyntaxError){
        mainScreen.innerText = "ERROR";
    }
});

clearButton.addEventListener("click", () => {
    mainScreen.innerText = null;
    secondaryScreen.innerText = null;
    expression = "";
});

deleteButton.addEventListener("click", () => {
    console.log("Pressesd")
    if(mainScreen.innerText == ""){
        expression = expression.slice(0, -1);
        secondaryScreen.innerText = expression;
    }else{
        mainScreen.innerText = null;
        secondaryScreen.innerText = null;
        expression = "";
    }
});
