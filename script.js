const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
let expression = "";

function updateDisplay() {
  display.value = expression || "0";
}

function calculate() {
  if (!expression) return;
  try {
    // Only allow calculator characters before evaluating the expression.
    if (!/^[0-9+*/%.()\- ]+$/.test(expression)) throw new Error("Invalid");
    const result = Function('"use strict"; return (' + expression + ')')();
    if (!Number.isFinite(result)) throw new Error("Invalid");
    expression = String(Number(result.toFixed(10)));
  } catch {
    expression = "";
    display.value = "Error";
    return;
  }
  updateDisplay();
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (action === "clear") {
      expression = "";
      updateDisplay();
      return;
    }
    if (action === "delete") {
      expression = expression.slice(0, -1);
      updateDisplay();
      return;
    }
    if (action === "calculate") {
      calculate();
      return;
    }

    if (value) {
      expression += value;
      updateDisplay();
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (/^[0-9.+*/%()-]$/.test(event.key)) {
    expression += event.key;
    updateDisplay();
  } else if (event.key === "Enter" || event.key === "=") {
    event.preventDefault();
    calculate();
  } else if (event.key === "Backspace") {
    expression = expression.slice(0, -1);
    updateDisplay();
  } else if (event.key === "Escape") {
    expression = "";
    updateDisplay();
  }
});
