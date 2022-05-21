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
        'subtract': this.toggleSubtract,
        'multiply': this.toggleMultiply,
        'divide': this.toggleDivide,
        'calculatePercentage': this.toggleGetPercentage,
        'clearDisplay': this.clearDisplay,
        'calculateResult': this.calculateResult,
        'eraseDigit': this.eraseDigit,
        'invertSign': this.invertSign
    };

    constructor(ioDisplayElement)
    {
        this.displayValue = "0";
        this.#displayElement = ioDisplayElement;
    }
    
    setDisplayValue(newDisplayValue)
    {
        this.displayValue = String(newDisplayValue);
        this.#displayElement.textContent = this.displayValue;
        if (this.#displayElement.textContent.length >= 12)
        {
            this.setDisplayValue(this.#displayElement.textContent.slice(0, 10));
        }
    }
    
    perpareCalculatorForNextOperation()
    {
        this.firstOperand = this.displayValue;
        this.clearDisplayOnNextDigit = true;
        this.operationOngoing = true;
    }
    
    toggleAdd(iOperationButtonClickEvent)
    {
        this.perpareCalculatorForNextOperation();
        this.currentOperation = this.add;
    }

    add(iFirstOperand, iSecondOperand)
    {
        return Number(iFirstOperand) + Number(iSecondOperand);
    }

    toggleSubtract(iOperationButtonClickEvent)
    {
        this.perpareCalculatorForNextOperation();
        this.currentOperation = this.subtract;
    }

    subtract(iFirstOperand, iSecondOperand)
    {
        return Number(iFirstOperand) - (iSecondOperand);
    }

    toggleMultiply(iOperationButtonClickEvent)
    {
        this.perpareCalculatorForNextOperation();
        this.currentOperation = this.multiply;
    }
    
    multiply(iFirstOperand, iSecondOperand)
    {
        return Number(iFirstOperand) * Number(iSecondOperand);
    }
    
    toggleDivide(iOperationButtonClickEvent)
    {
        this.perpareCalculatorForNextOperation();
        this.currentOperation = this.divide;
    }

    divide(iNumerator, iDenominator)
    {
        // TODO: check if the denominator is not zero
        if (iDenominator != 0)
        {
            return Number(iNumerator) / Number(iDenominator);
        }
        this.clearDisplayOnNextDigit = true;
        return "ERROR"
    }
    
    toggleGetPercentage(iOperationButtonClickEvent)
    {
        this.perpareCalculatorForNextOperation();
        this.currentOperation = this.getPercentage;
    }

    getPercentage(iFirstOperand, iSecondOperand)
    {
        return (Number(iFirstOperand) / 100) * Number(iSecondOperand);
    }
    
    eraseDigit(iButtonClickEvent)
    {
        if (this.displayValue.length !== 0)
        {
            this.setDisplayValue(this.displayValue.slice(0, this.displayValue.length - 1));
        }
    }
    
    invertSign(iButtonClickEvent)
    {
        if (this.displayValue.charAt(0) === '-')
        {
            this.setDisplayValue(this.displayValue.slice(1, this.displayValue.length));
        }
        else if (this.displayValue.length > 0)
        {
            this.setDisplayValue("-" + this.displayValue);
        }
    }
    
    calculateResult(iEqualsButtonClickEvent)
    {
        this.clearDisplayOnNextDigit = true;
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


