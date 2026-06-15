let isCalculated = false;

// Auto-blur any clicked button to prevent browser focus click issues with the Enter key
document.addEventListener("DOMContentLoaded", () => {
  // Restore saved session if it exists
  const savedInput = localStorage.getItem("calculator_input");
  const savedIsCalculated = localStorage.getItem("calculator_isCalculated");
  if (savedInput !== null) {
    document.getElementById("inputResult").value = savedInput;
  }
  if (savedIsCalculated !== null) {
    isCalculated = savedIsCalculated === "true";
  }

  document.querySelectorAll('.btn input[type="button"]').forEach((button) => {
    button.addEventListener("click", () => {
      button.blur();
    });
  });
});

function saveSession() {
  localStorage.setItem("calculator_input", document.getElementById("inputResult").value);
  localStorage.setItem("calculator_isCalculated", isCalculated);
}

function Solve(buttonValue) {
  let inputResult = document.getElementById("inputResult");
  let currentValue = inputResult.value;

  // If a calculation was just performed, start a new calculation unless an operator is pressed
  if (isCalculated) {
    if (["+", "-", "*", "/", "%"].includes(buttonValue)) {
      isCalculated = false;
    } else {
      currentValue = "";
      isCalculated = false;
    }
  }

  // Prevent consecutive operators
  const operators = ["+", "-", "*", "/", "%"];
  if (operators.includes(buttonValue)) {
    if (currentValue === "") {
      if (buttonValue === "-") {
        inputResult.value = "-";
        saveSession();
      }
      return;
    }

    let lastChar = currentValue.slice(-1);
    if (operators.includes(lastChar)) {
      inputResult.value = currentValue.slice(0, -1) + buttonValue;
      saveSession();
      return;
    }
  }

  // Prevent multiple decimal points in the same number part
  if (buttonValue === ".") {
    let parts = currentValue.split(/[+\-*/%]/);
    let lastPart = parts[parts.length - 1];
    if (lastPart.includes(".")) {
      return;
    }
    if (lastPart === "" || lastPart === "-") {
      buttonValue = "0.";
    }
  }

  currentValue += buttonValue;

  // Format all numbers separated by operators with thousand separators
  let cleanValue = currentValue.replace(/,/g, "");
  let parts = cleanValue.split(/([+\-*/%])/);

  parts = parts.map((part) => {
    if (!isNaN(part) && part !== "" && part.indexOf(".") === -1) {
      return Number(part).toLocaleString("en-US");
    }
    return part;
  });

  inputResult.value = parts.join("");
  saveSession();
}

function Result() {
  let inputResultElement = document.getElementById("inputResult");
  let inputResult = inputResultElement.value;

  if (!inputResult) return;

  // Replace percentage expressions (e.g. 50% becomes 0.5)
  inputResult = inputResult.replace(/(\d+(\.\d+)?)%/g, function (match, p1) {
    return (parseFloat(p1) / 100).toString();
  });

  // Remove commas for evaluation
  inputResult = inputResult.replace(/,/g, "");

  // Remove trailing operator if user left one at the end
  const operators = ["+", "-", "*", "/", "%"];
  if (operators.includes(inputResult.slice(-1))) {
    inputResult = inputResult.slice(0, -1);
  }

  try {
    let result = eval(inputResult);

    if (result === undefined || isNaN(result)) {
      inputResultElement.value = "Error";
    } else {
      inputResultElement.value = result.toLocaleString("en-US", {
        maximumFractionDigits: 10,
      });
    }
    isCalculated = true;
  } catch (e) {
    inputResultElement.value = "Error";
    isCalculated = true;
  }
  saveSession();
}

function Clear() {
  document.getElementById("inputResult").value = "";
  isCalculated = false;
  localStorage.removeItem("calculator_input");
  localStorage.removeItem("calculator_isCalculated");
}

function Back() {
  let inputResult = document.getElementById("inputResult");
  if (isCalculated) {
    inputResult.value = "";
    isCalculated = false;
  } else {
    inputResult.value = inputResult.value.slice(0, -1);
  }
  saveSession();
}

// ── Keyboard Support ──────────────────────────────────────────────────────────
function flashButton(value) {
  const buttons = document.querySelectorAll('.btn input[type="button"]');
  buttons.forEach((btn) => {
    if (btn.value === value) {
      btn.classList.add("key-active");
      setTimeout(() => btn.classList.remove("key-active"), 120);
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.altKey || e.metaKey) return;

  const key = e.key;

  if (key >= "0" && key <= "9") {
    e.preventDefault();
    flashButton(key);
    Solve(key);
  } else if (key === ".") {
    e.preventDefault();
    flashButton(".");
    Solve(".");
  } else if (key === "+") {
    e.preventDefault();
    flashButton("+");
    Solve("+");
  } else if (key === "-") {
    e.preventDefault();
    flashButton("-");
    Solve("-");
  } else if (key === "*") {
    e.preventDefault();
    flashButton("x");
    Solve("*");
  } else if (key === "/") {
    e.preventDefault();
    flashButton("/");
    Solve("/");
  } else if (key === "%") {
    e.preventDefault();
    flashButton("%");
    Solve("%");
  } else if (key === "Enter" || key === "=") {
    e.preventDefault();
    flashButton("=");
    Result();
  } else if (key === "Backspace") {
    e.preventDefault();
    flashButton("←");
    Back();
  } else if (key === "Escape" || key === "Delete") {
    e.preventDefault();
    flashButton("C");
    Clear();
  }
});
