// File: script.js
// This is a simple calculator script that handles basic arithmetic operations.
      let currentInput = "0";
      let previousInput = "";
      let operation = null;
      let resetInput = false;

      const mainDisplay = document.getElementById("main-display");
      const secondaryDisplay = document.getElementById("secondary-display");

      function updateDisplay() {
        mainDisplay.textContent = currentInput;
        if (operation && previousInput) {
          secondaryDisplay.textContent = `${previousInput} ${operation}`;
        } else {
          secondaryDisplay.textContent = "";
        }
      }

      function addToDisplay(value) {
        if (resetInput) {
          currentInput = "0";
          resetInput = false;
        }

        if (value === "." && currentInput.includes(".")) {
          return;
        }

        if (currentInput === "0" && value !== ".") {
          currentInput = value;
        } else {
          currentInput += value;
        }

        updateDisplay();
      }

      function clearAll() {
        currentInput = "0";
        previousInput = "";
        operation = null;
        updateDisplay();
      }

      function backspace() {
        if (currentInput.length === 1) {
          currentInput = "0";
        } else {
          currentInput = currentInput.slice(0, -1);
        }
        updateDisplay();
      }

      function setOperation(op) {
        if (currentInput === "0" && previousInput) {
          operation = op;
          updateDisplay();
          return;
        }

        if (operation && !resetInput) {
          calculate();
        }

        previousInput = currentInput;
        operation = op;
        resetInput = true;
        updateDisplay();
      }

      function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) {
          return;
        }

        switch (operation) {
          case "+":
            result = prev + current;
            break;
          case "-":
            result = prev - current;
            break;
          case "*":
            result = prev * current;
            break;
          case "/":
            result = prev / current;
            break;
          default:
            return;
        }

        currentInput = result.toString();
        operation = null;
        previousInput = "";
        resetInput = true;
        updateDisplay();
      }

      // Initialize display
      updateDisplay();

      // Add keyboard support
      document.addEventListener("keydown", (event) => {
        if (/[0-9.]/.test(event.key)) {
          addToDisplay(event.key);
        } else if (event.key === "Enter") {
          calculate();
        } else if (event.key === "Escape") {
          clearAll();
        } else if (event.key === "Backspace") {
          backspace();
        } else if (["+", "-", "*", "/"].includes(event.key)) {
          setOperation(event.key);
        }
      });