**[![Twitter Badge](https://img.shields.io/twitter/follow/halip26?style=social)](https://twitter.com/Halip26)
[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-0e76a8?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/halipuddin/)
[![Medium Badge](https://img.shields.io/badge/medium-%2312100E.svg?&style=for-square&logo=medium&logoColor=white)](https://medium.com/@halip26)**

# Simple Calculator

This is a simple calculator project that performs basic mathematical operations such as addition, subtraction, multiplication, and division. It is designed as a web application using HTML, CSS, and JavaScript.

<p align="center"><img src="https://media.giphy.com/media/dWesBcTLavkZuG35MI/giphy.gif" style="width:100%"  /></p>

## How to Use

To run locally, run this command on your git bash:

Linux, Windows and macOS:

```bash
sudo git clone https://github.com/Halip26/simple-calculator.git
```

```bash
cd simple-calculator
```

Windows:

```bash
git clone https://github.com/Halip26/simple-calculator.git
```

```bash
cd simple-calculator
```

1. Open index.html in a web browser
2. Enter numbers and click on the respective operation buttons to perform calculations

### Features

- Addition
- Subtraction
- Multiplication
- Division

---

### 🛠 &nbsp;Languages and Tools

<p>
  <img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-original.svg" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/vscode/vscode-original.svg" title="VSCode" alt="VSCode" width="40" height="40"/>&nbsp;
</p>

### The expression `/(\d+(\.\d+)?)%/g` is a regular expression (regex) used to match patterns in a string. Let's break it down

- `/ ... /`: This denotes the start and end of the regular expression.
- `\d+`: This matches one or more digits. `\d` is a shorthand for any digit (0-9), and `+` means one or more of the preceding element.
- `(\.\d+)?`: This matches an optional decimal part.
  - `\.` matches a literal dot (decimal point).
  - `\d+` matches one or more digits following the decimal point.
  - `()` groups these parts together.
  - `?` means the grouped part is optional (it may occur zero or one time).
- `%`: This matches the literal percent symbol.
- `g`: This is a flag meaning "global," which indicates that the regex should match all occurrences in the string, not just the first one.

In simpler terms, this regex matches:

- Any number of digits (`\d+`), optionally followed by a decimal part (`(\.\d+)?`), and then a percent symbol (`%`).

For example:

- `80%` matches `80` followed by `%`.
- `80.5%` matches `80.5` followed by `%`.

Here's what each part does in the context of the `replace` function in your code:

```javascript
num1 = num1.replace(/(\d+(\.\d+)?)%/g, function(match, p1) {
  return (parseFloat(p1) / 100).toString();
});
```

- `num1.replace(...)`: This function is used to replace parts of the string that match the regex.
- `/(\d+(\.\d+)?)%/g`: The regex pattern to match numbers followed by a percent symbol.
- `function(match, p1) { return (parseFloat(p1) / 100).toString(); }`: This is a replacement function that takes each match and converts the percentage to its decimal form.
  - `match`: The entire matched string (e.g., `80%`).
  - `p1`: The first capturing group, which is the number part of the match (e.g., `80` or `80.5`).
  - `parseFloat(p1) / 100`: Converts the number to a float and divides by 100 to convert it to a decimal (e.g., `80` becomes `0.8`).
  - `.toString()`: Converts the resulting number back to a string.

---

### Contact

- 📫 How to reach me: &nbsp; [![Linkedin Badge](https://img.shields.io/badge/-Halipuddin%20Hambali-blue?style=flat&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/halipuddin/)

---
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
