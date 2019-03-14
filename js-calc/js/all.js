function calc() {
    "use strict";
    var inputArray = [],
        operations = ["÷", "×", "+", "−"],
        number = "",
        i,
        that = this,
        equation = document.querySelector(".sentence"),
        display = document.querySelector(".answer");
    display.textContent = "0";

    this.add = function(a, b) {
        var c = inputArray[a] + inputArray[b];
        inputArray[a] = c;
        inputArray.splice(a + 1, 2);
        i -= 2;
    };
    this.substract = function(a, b) {
        var c = inputArray[a] - inputArray[b];
        inputArray[a] = c;
        inputArray.splice(a + 1, 2);
        i -= 2;
    };
    this.divide = function(a, b) {
        var c = inputArray[a] / inputArray[b];
        if (isNaN(c)) {
            c = 0;
        }
        inputArray[a] = c;
        inputArray.splice(a + 1, 2);
        i -= 2;
    };
    this.multiply = function(a, b) {
        var c = inputArray[a] * inputArray[b];
        inputArray[a] = c;
        inputArray.splice(a + 1, 2);
        i -= 2;
    };
    this.equal = function() {
        for (i = 0; i < inputArray.length; i += 1) {
            if (inputArray[i] === "÷") {
                that.divide(i - 1, i + 1);
            }
            if (inputArray[i] === "×") {
                that.multiply(i - 1, i + 1);
            }
        }
        for (i = 0; i < inputArray.length; i += 1) {
            if (inputArray[i] === "+") {
                that.add(i - 1, i + 1);
            }
            if (inputArray[i] === "-") {
                that.substract(i - 1, i + 1);
            }
        }
        display.textContent = inputArray[0];
    };
    this.clear = function() {
        inputArray = [];
        number = "";
        display.textContent = "0";
        equation.textContent = "";
    };
    this.del = function() {

        if (inputArray.length === 0) return
        inputArray.pop()
        equation.textContent = inputArray;

    };
    this.printEquation = function() {
        equation.textContent = "";
        for (i = 0; i < inputArray.length; i += 1) {
            equation.textContent += inputArray[i];
        }
    };
    this.input = function(e) {
        var input = e.target.textContent;
        var testInput = operations.indexOf(input) === -1 ? false : true;
        //Add a zero if operator is clicked without any input
        if (testInput && number === "") {
            number = "0";
        }
        //Run clear if equal is clicked without any input
        if (input === "=" && inputArray.length === 0) {
            this.clear;
        } else if (testInput) {
            inputArray.push(parseInt(number, 10));
            inputArray.push(input);
            number = "";
            display.textContent = "0";
            that.printEquation();
        } else if (input === "AC") {
            that.clear();
        } else if (input === "⌫") {
            that.del();
        } else if (input === "=") {
            if (number !== "") {
                inputArray.push(parseInt(number, 10));
                number = "";
                that.printEquation();
                that.equal();
            } else {
                inputArray.pop();
                number = "";
                that.equal();
            }
        } else {
            number += input;
            display.textContent = number;
        }
    };
}


var calci = new calc();
var nodes1 = document.querySelector(".calc");
nodes1.addEventListener('click', calci.input, false);
for (let i = 0; i < nodes1.length; i++) {
    if (nodes1[i].nodeName.toLowerCase() === "div") {
        nodes1[i].addEventListener("click", calci.input)
    }
}