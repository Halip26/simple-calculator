let expression = "";
let isCalculated = false;

document.addEventListener("DOMContentLoaded", () => {
  const mainDisplay = document.getElementById("mainDisplay");
  const expressionHistory = document.getElementById("expressionHistory");
  const btnContainer = document.getElementById("btnContainer");
  const themeToggle = document.getElementById("themeToggle");

  // Enable active touch state responsiveness on iOS Safari
  document.addEventListener("touchstart", () => {}, { passive: true });

  // Theme Management
  const savedTheme = localStorage.getItem("calculator_theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("calculator_theme", newTheme);
  });

  // Restore saved session if it exists
  const savedExpression = localStorage.getItem("calculator_expression");
  const savedHistory = localStorage.getItem("calculator_history");
  const savedIsCalculated = localStorage.getItem("calculator_isCalculated");

  if (savedExpression !== null) {
    expression = savedExpression;
    mainDisplay.textContent = formatExpression(expression) || "0";
  }
  if (savedHistory !== null) {
    expressionHistory.textContent = savedHistory;
  }
  if (savedIsCalculated !== null) {
    isCalculated = savedIsCalculated === "true";
  }

  scrollDisplayToEnd();

  // Event Delegation for Buttons
  btnContainer.addEventListener("click", (e) => {
    const target = e.target.closest("button");
    if (!target) return;

    // Blur button to prevent browser focus click issues with the Enter/Space keys
    target.blur();

    const val = target.getAttribute("data-val");
    const action = target.getAttribute("data-action");

    if (val !== null) {
      handleInput(val);
    } else if (action !== null) {
      handleAction(action);
    }
  });

  // Keyboard Support
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    
    let key = e.key;
    
    // Map keys to actions
    let button = null;
    if (key >= "0" && key <= "9") {
      button = btnContainer.querySelector(`button[data-val="${key}"]`);
    } else if (key === "00") {
      button = btnContainer.querySelector('button[data-val="00"]');
    } else if (key === ".") {
      button = btnContainer.querySelector('button[data-val="."]');
    } else if (key === "+") {
      button = btnContainer.querySelector('button[data-val="+"]');
    } else if (key === "-") {
      button = btnContainer.querySelector('button[data-val="-"]');
    } else if (key === "*") {
      button = btnContainer.querySelector('button[data-val="*"]');
    } else if (key === "/") {
      button = btnContainer.querySelector('button[data-val="/"]');
    } else if (key === "%") {
      button = btnContainer.querySelector('button[data-val="%"]');
    } else if (key === "Enter" || key === "=") {
      e.preventDefault();
      button = btnContainer.querySelector('button[data-action="result"]');
    } else if (key === "Backspace") {
      e.preventDefault();
      button = btnContainer.querySelector('button[data-action="back"]');
    } else if (key === "Escape" || key === "Delete") {
      e.preventDefault();
      button = btnContainer.querySelector('button[data-action="clear"]');
    }

    if (button) {
      button.click();
      button.classList.add("key-active");
      setTimeout(() => button.classList.remove("key-active"), 120);
    }
  });
});

function saveSession() {
  const expressionHistory = document.getElementById("expressionHistory");
  localStorage.setItem("calculator_expression", expression);
  localStorage.setItem("calculator_history", expressionHistory.textContent);
  localStorage.setItem("calculator_isCalculated", isCalculated);
}

function scrollDisplayToEnd() {
  const mainDisplay = document.getElementById("mainDisplay");
  const expressionHistory = document.getElementById("expressionHistory");
  requestAnimationFrame(() => {
    if (mainDisplay) {
      mainDisplay.scrollLeft = mainDisplay.scrollWidth;
    }
    if (expressionHistory) {
      expressionHistory.scrollLeft = expressionHistory.scrollWidth;
    }
  });
}

function formatExpression(expr) {
  if (!expr) return "";
  const tokens = expr.split(/([+\-*/%])/);
  return tokens.map(token => {
    if (["+", "-", "*", "/"].includes(token)) {
      if (token === "+") return " + ";
      if (token === "-") return " − ";
      if (token === "*") return " × ";
      if (token === "/") return " ÷ ";
    }
    if (token === "%") return "%";
    
    if (token && !isNaN(token.replace(/,/g, ""))) {
      const parts = token.split(".");
      const integerPart = parts[0];
      const decimalPart = parts[1];
      
      let formattedInt = integerPart;
      if (integerPart !== "" && integerPart !== "-") {
        formattedInt = Number(integerPart).toLocaleString("en-US");
      }
      
      if (parts.length > 1) {
        return formattedInt + "." + decimalPart;
      }
      return formattedInt;
    }
    return token;
  }).join("");
}

function handleInput(val) {
  const mainDisplay = document.getElementById("mainDisplay");
  const expressionHistory = document.getElementById("expressionHistory");
  const operators = ["+", "-", "*", "/", "%"];

  // If a calculation was just performed, start fresh unless an operator is clicked
  if (isCalculated) {
    if (operators.includes(val)) {
      isCalculated = false;
    } else {
      expression = "";
      isCalculated = false;
      expressionHistory.textContent = "";
    }
  }

  // Prevent consecutive operators
  if (operators.includes(val)) {
    if (expression === "") {
      if (val === "-") {
        expression = "-";
        mainDisplay.textContent = "-";
        saveSession();
      }
      return;
    }

    const lastChar = expression.slice(-1);
    if (operators.includes(lastChar)) {
      expression = expression.slice(0, -1) + val;
      mainDisplay.textContent = formatExpression(expression);
      saveSession();
      scrollDisplayToEnd();
      return;
    }
  }

  // Prevent multiple decimal points in the same number part
  if (val === ".") {
    const parts = expression.split(/[+\-*/%]/);
    const lastPart = parts[parts.length - 1];
    if (lastPart.includes(".")) {
      return;
    }
    if (lastPart === "" || lastPart === "-") {
      expression += "0.";
      mainDisplay.textContent = formatExpression(expression);
      saveSession();
      scrollDisplayToEnd();
      return;
    }
  }

  expression += val;
  mainDisplay.textContent = formatExpression(expression);
  saveSession();
  scrollDisplayToEnd();
}

function handleAction(action) {
  const mainDisplay = document.getElementById("mainDisplay");
  const expressionHistory = document.getElementById("expressionHistory");

  if (action === "clear") {
    expression = "";
    isCalculated = false;
    mainDisplay.textContent = "0";
    expressionHistory.textContent = "";
    localStorage.removeItem("calculator_expression");
    localStorage.removeItem("calculator_history");
    localStorage.removeItem("calculator_isCalculated");
  } else if (action === "back") {
    if (isCalculated) {
      expression = "";
      mainDisplay.textContent = "0";
      expressionHistory.textContent = "";
      isCalculated = false;
    } else {
      expression = expression.slice(0, -1);
      mainDisplay.textContent = formatExpression(expression) || "0";
    }
    saveSession();
    scrollDisplayToEnd();
  } else if (action === "result") {
    if (!expression) return;

    let evalExpr = expression;
    const operators = ["+", "-", "*", "/", "%"];
    
    // Trim trailing operators
    while (evalExpr && operators.includes(evalExpr.slice(-1))) {
      evalExpr = evalExpr.slice(0, -1);
    }

    if (!evalExpr) return;

    try {
      // Replace percentages (e.g., 50% -> (50/100))
      let sanitized = evalExpr.replace(/,/g, "").replace(/\s+/g, "");
      sanitized = sanitized.replace(/(\d+(\.\d+)?)%/g, "($1/100)");

      if (!/^[0-9+\-*/%().]+$/.test(sanitized)) {
        throw new Error("Invalid characters");
      }

      const result = new Function(`return ${sanitized}`)();

      if (result === undefined || isNaN(result) || !isFinite(result)) {
        throw new Error("Invalid result");
      }

      // Show history with an equals sign
      expressionHistory.textContent = formatExpression(evalExpr) + " =";
      
      // Format result
      let formattedResult;
      if (Number.isInteger(result)) {
        formattedResult = result.toLocaleString("en-US");
      } else {
        formattedResult = result.toLocaleString("en-US", {
          maximumFractionDigits: 10
        });
      }

      mainDisplay.textContent = formattedResult;
      expression = result.toString();
      isCalculated = true;
    } catch (e) {
      mainDisplay.textContent = "Error";
      expression = "";
      isCalculated = true;
    }
    saveSession();
    scrollDisplayToEnd();
  }
}
