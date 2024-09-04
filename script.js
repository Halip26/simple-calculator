function Solve(buttons) {
  let inputResult = document.getElementById("inputResult");

  // Append the button value to the current input value
  inputResult.value += buttons;

  // Remove commas for reformatting but keep the decimal point
  let currentValue = inputResult.value.replace(/,/g, "");

  // Separate the numbers and operators using regex
  let parts = currentValue.split(/([+\-*/%])/);

  // Format all number parts with commas as thousand separators, except for decimal numbers
  parts = parts.map((part) => {
    if (!isNaN(part) && part !== "" && part.indexOf(".") === -1) {
      // Format only numbers without decimal points
      return Number(part).toLocaleString("en-US");
    }
    return part;
  });

  // Update the input with formatted numbers and unformatted operators
  inputResult.value = parts.join("");
}

function Result() {
  let inputResult = document.getElementById("inputResult").value;

  // Replace percentage expressions with their evaluated values
  inputResult = inputResult.replace(/(\d+(\.\d+)?)%/g, function (p1) {
    return (parseFloat(p1) / 100).toString();
  });

  // Remove commas for evaluation
  inputResult = inputResult.replace(/,/g, "");

  try {
    // Evaluate the expression
    let result = eval(inputResult);

    // Format the result with commas as thousand separators
    document.getElementById("inputResult").value =
      result.toLocaleString("en-US");
  } catch (e) {
    document.getElementById("inputResult").value = "Error";
  }
}

function Clear() {
  document.getElementById("inputResult").value = "";
}

function Back() {
  let inputResult = document.getElementById("inputResult");

  // Remove the last character from the input value
  inputResult.value = inputResult.value.slice(0, -1);
}
