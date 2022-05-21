"use strict";

class Calculator {
    #displayElement;
    displayValue;
    operationButtonsList;
    
    operationButtonFunctionsMap = {
        'add': this.add,
        'subtract': this.subtract,
        'multiply': this.multiply,
        'divide': this.divide,
        'getRemainder': this.getRemainder,
        'clearDisplay': this.clearDisplay
    };

    constructor(ioDisplayElement)
    {
        this.displayValue = 0;
        this.#displayElement = ioDisplayElement;
    }
    
    setDisplayValue(newDisplayValue)
    {
        this.displayValue = newDisplayValue;
        this.#displayElement.textContent = this.displayValue;
    }

    add(firstOperand, secondOperand)
    {
        return firstOperand + secondOperand;
    }

    subtract(firstOperand, secondOperand)
    {
        return firstOperand - secondOperand;
    }

    multiply(firstOperand, secondOperand)
    {
        return firstOperand * secondOperand;
    }

    divide(numerator, denominator)
    {
        // TODO: check if the denominator is not zero
        return numerator * denominator;
    }

    getRemainder(firstOperand, secondOperand)
    {
        return firstOperand % secondOperand;
    }

    clearDisplay()
    {
        this.setDisplayValue(0);
    }
    
    configureOperationButtonFunctions()
    {
        console.log(this);
        if (this.operationButtonsList !== undefined)
        {
            this.operationButtonsList.forEach(aOperationButton =>
                {
                console.log("This is the selected button: " + aOperationButton.dataset.function);
                if (aOperationButton.dataset.function && (aOperationButton.dataset.function in this.operationButtonFunctionsMap))
                {
                    aOperationButton.addEventListener('click',this.operationButtonFunctionsMap[aOperationButton.dataset.function].bind(this), false);
                }
            });
        }
    }
    
}


const aCalculatorDisplay = document.getElementById("calculatorDisplayId");
const aCalculatorDisplayParagraph = aCalculatorDisplay.firstChild;

const aCalculator = new Calculator(aCalculatorDisplayParagraph);

aCalculator.operationButtonsList = document.querySelectorAll(".operationButton");
aCalculator.configureOperationButtonFunctions();

const aAdditionButton = document.getElementById("additionButtonId");
//aAdditionButton.addEventListener('click', () => aCalculator.setDisplayValue(aCalculator.add(1, 2)));


