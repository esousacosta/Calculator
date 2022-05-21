"use strict";

class Calculator {
    firstOperand;
    currentOperation;
    operationOngoing = false;
    clearDisplayOnNextDigit = false;
    #displayElement;
    displayValue;
    operationButtonsList;
    digitButtonsList;
    
    operationButtonFunctionsMap = {
        'add': this.toggleAdd,
        'subtract': this.subtract,
        'multiply': this.multiply,
        'divide': this.divide,
        'getRemainder': this.getRemainder,
        'clearDisplay': this.clearDisplay,
        'calculateResult': this.calculateResult
    };

    constructor(ioDisplayElement)
    {
        this.displayValue = "0";
        this.#displayElement = ioDisplayElement;
    }
    
    setDisplayValue(newDisplayValue)
    {
        this.displayValue = newDisplayValue;
        this.#displayElement.textContent = this.displayValue;
    }
    
    toggleAdd(iOperationButtonClickEvent)
    {
        this.firstOperand = this.displayValue;
        this.clearDisplayOnNextDigit = true;
        this.operationOngoing = true;
        this.currentOperation = this.add;
    }

    add(iFirstOperand, iSecondOperand)
    {
        return Number(iFirstOperand) + Number(iSecondOperand);
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

    getRemainder(iFirstOperand, iSecondOperand)
    {
        return iFirstOperand % iSecondOperand;
    }
    
    calculateResult(iEqualsButtonClickEvent)
    {
        this.setDisplayValue(this.currentOperation(this.firstOperand, this.displayValue));
    }
    
    getDisplayContent()
    {
        return this.#displayElement.textContent;
    }

    clearDisplay()
    {
        this.setDisplayValue("");
    }
    
    addDigitOnDisplay(iDigitButtonClickEvent)
    {
        if (this.getDisplayContent() === '0' || this.clearDisplayOnNextDigit)
        {
            this.clearDisplay();
            this.clearDisplayOnNextDigit = false;
        }
        this.setDisplayValue(this.displayValue + iDigitButtonClickEvent.target.textContent);
    }
    
    configureOperationButtonFunctions()
    {
        if (this.operationButtonsList !== undefined)
        {
            this.operationButtonsList.forEach(aOperationButton =>
                {
                if (aOperationButton.dataset.function && (aOperationButton.dataset.function in this.operationButtonFunctionsMap))
                {
                    aOperationButton.addEventListener('click', this.operationButtonFunctionsMap[aOperationButton.dataset.function].bind(this), false);
                }
            });
        }
    }
    
    setUpDigitButtons()
    {
        this.digitButtonsList.forEach((aDigitButton) =>
        {
            aDigitButton.addEventListener('click', this.addDigitOnDisplay.bind(this));
        })
    }
    
}


const aCalculatorDisplay = document.getElementById("calculatorDisplayId");
const aCalculatorDisplayParagraph = aCalculatorDisplay.firstChild;

const aCalculator = new Calculator(aCalculatorDisplayParagraph);

// Set up of operation buttons
aCalculator.operationButtonsList = document.querySelectorAll(".operationButton");
aCalculator.configureOperationButtonFunctions();

// Set up of digit buttons
aCalculator.digitButtonsList = document.querySelectorAll(".digitButton");
aCalculator.setUpDigitButtons();

const aAdditionButton = document.getElementById("additionButtonId");
//aAdditionButton.addEventListener('click', () => aCalculator.setDisplayValue(aCalculator.add(1, 2)));


