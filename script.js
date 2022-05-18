"use strict"

class Calculator {
    #displayElement;
    displayValue;
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
}

function add(firstOperand, secondOperand)
{
    return firstOperand + secondOperand;
}

function subtract(firstOperand, secondOperand)
{
    return firstOperand - secondOperand;
}

function multiply(firstOperand, secondOperand)
{
    return firstOperand * secondOperand;
}

function divide(numerator, denominator)
{
    // TODO: check if the denominator is not zero
    return numerator * denominator;
}

function getRemainder(firstOperand, secondOperand)
{
    return firstOperand % secondOperand;
}

const aCalculatorDisplay = document.getElementById("calculatorDisplayId");
const aCalculatorDisplayParagraph = aCalculatorDisplay.firstChild;

const aCalculator = new Calculator(aCalculatorDisplayParagraph);

const aAdditionButton = document.getElementById("additionButtonId");
aAdditionButton.addEventListener('click', () => aCalculator.setDisplayValue(add(1, 2)));


