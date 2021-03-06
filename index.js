const root = document.documentElement;
const themeSelector = document.querySelector("select");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const mainScreen = document.querySelector("h3");
const secondaryScreen = document.querySelector("h5");

function setTheme(theme){
    root.style.setProperty("--bg-color", theme[0]);
    root.style.setProperty("--primary-color", theme[1]);
    root.style.setProperty("--primary-highlight", theme[2]);
    root.style.setProperty("--secondary-color", theme[3]);
    root.style.setProperty("--font-color", theme[4]);
    root.style.setProperty("--footer-bg-color", theme[5]);
    root.style.setProperty("--footer-color", theme[6]);
    root.style.setProperty("--footer-hover", theme[7]);
}

let themes = {
    default: ["#ffffff", "#eeeeee", "#ffffff", "#2c272e", "#2c272e", "#2c272e", "#ffffff", "#eeeeee"],
    justBlack: ["#212529", "#343a40", "#212529", "#495057", "#adb5bd", "#343a40", "#adb5bd", "#495057"],
    retro: ["#faedf0", "#fabb51", "#faedc6", "#3e8e7e", "#121212", "#3e8e7e", "#faedf0", "#fabb51"],
    nord: ["#4c566a", "#2e3440", "#3b4252", "#434c5e", "#d8dee9", "#2e3440", "#d8dee9", "#434c5e"],
    greenishDelight: ["#d3e4cd", "#acd2A9", "#d3e4cd", "#3e8e7e", "#353535", "#3e8e7e", "#adc2a9", "#d3e4cd"],
    space: ["#222831", "#00adb5", "#222831", "#393e46", "#eaeaed", "#393e46", "#00adb5", "#eaeaed"],
    discordDark: ["#40444b", "#36393f", "#40444d", "#2f3136", "#dcddde", "#36393f", "#eaeaeb", "#dcddde"]
}

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

themeSelector.addEventListener("change", () => {
    setTheme(themes[themeSelector.value])
});
