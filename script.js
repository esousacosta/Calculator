"use strict";


class Calculator {
    #displayElement;
    displayValue;
    operationButtonsList;
    
    static sOperationButtonFunctionsMap = {
        'add': Calculator.add,
        'subtract': Calculator.subtract,
        'multiply': Calculator.multiply,
        'divide': Calculator.divide,
        'getRemainder': Calculator.getRemainder,
        'clearDisplay': Calculator.clearDisplay
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

    static add(firstOperand, secondOperand)
    {
        return firstOperand + secondOperand;
    }

    static subtract(firstOperand, secondOperand)
    {
        return firstOperand - secondOperand;
    }

    static multiply(firstOperand, secondOperand)
    {
        return firstOperand * secondOperand;
    }

    static divide(numerator, denominator)
    {
        // TODO: check if the denominator is not zero
        return numerator * denominator;
    }

    static getRemainder(firstOperand, secondOperand)
    {
        return firstOperand % secondOperand;
    }

    static clearDisplay()
    {
        this.setDisplayValue(0);
    }
    
    configureOperationButtonFunctions()
    {
        if (this.operationButtonsList !== undefined)
        {
            this.operationButtonsList.forEach(aOperationButton => {
                console.log("This is the selected button: " + aOperationButton.dataset.function);
                if (aOperationButton.dataset.function && (aOperationButton.dataset.function in Calculator.sOperationButtonFunctionsMap))
                {
                    const x = Calculator.sOperationButtonFunctionsMap[aOperationButton.dataset.function];
                    console.log(x);
                    aOperationButton.addEventListener('click', Calculator.sOperationButtonFunctionsMap[aOperationButton.dataset.function]);
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


