// Solve function that accepts one val argument
function Solve(buttons) {
  // Retrieve the input HTML element with ID “inputResult”
  let inputResult = document.getElementById("inputResult");
  // Add the value of the val argument to the value of the input element
  inputResult.value += buttons;
}

// Result function that does not accept any arguments
function Result() {
  // Retrieve the value of the input element with ID ‘inputResult’
  let num1 = document.getElementById("inputResult").value;

  // Replace percentage expressions with their evaluated values
  num1 = num1.replace(/(\d+(\.\d+)?)%/g, function (p1) {
    return (parseFloat(p1) / 100).toString();
  });

  // Evaluate the input element value as a JavaScript expression using the eval() function
  let num2 = eval(num1);
  // Set the input element value to be the evaluation result
  document.getElementById("inputResult").value = num2;
}

// Clear function that does not accept any arguments
function Clear() {
  // Retrieve the input HTML element with ID ‘inputResult’
  let inputted = document.getElementById("inputResult");
  // Clear input element values
  inputted.value = "";
}

// Back function that does not accept any arguments
function Back() {
  // Retrieve the input HTML element with ID ‘inputResult’
  let ev = document.getElementById("inputResult");
  // Remove the last character from the input element value
  ev.value = ev.value.slice(0, -1);
}
