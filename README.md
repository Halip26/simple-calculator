# 📱 Premium Glassmorphism Calculator

**[![Twitter Badge](https://img.shields.io/twitter/follow/halip26?style=social)](https://twitter.com/Halip26)
[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-0e76a8?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/halipuddin/)
[![Medium Badge](https://img.shields.io/badge/medium-%2312100E.svg?&style=for-square&logo=medium&logoColor=white)](https://medium.com/@halip26)**

A sleek, responsive, and educational online calculator. Built from scratch using semantic HTML, CSS3 (featuring a modern dark glassmorphism design), and Vanilla JavaScript. Now upgraded with **full keyboard support**, dynamic key press active animations, and smart input validation.

---

## ✨ Upgraded Features

- **💎 Modern Glassmorphism UI**: A beautiful dark interface featuring translucent panels, backdrop blur filters (`backdrop-filter`), glowing shadows, and subtle responsive layouts.
- **⌨️ Keyboard Support**: Input math equations directly from your keyboard without clicking buttons one by one.
- **🎨 Active Key Animations**: On-screen buttons scale down and glow when their matching keyboard keys are pressed to provide satisfying visual feedback.
- **🔢 Real-time Thousand Separators**: Automatically formats numbers with commas as you type (e.g., `1,000,000`) for readability.
- **🛡️ Smart Input Safeguards**:
  - **Operator Overwriting**: Typing a math operator immediately after another replaces it (e.g. changing `+` to `-` instead of displaying `+-`).
  - **Decimal Protection**: Prevents duplicate decimal points in a single number.
  - **Auto-Reset**: Starting a new number directly after calculating a result (`=`) automatically clears the screen instead of appending digits.
- **📱 Fully Responsive**: Layout scales dynamically for a great experience on mobile devices and desktop browsers.

---

## ⌨️ Keyboard Shortcuts Reference

Operate the calculator entirely using your keyboard keys:

| Key(s)               | Action                | On-Screen Button |
| :------------------- | :-------------------- | :--------------: |
| `0` - `9`            | Input Digits          |    `0` - `9`     |
| `.`                  | Decimal Point         |       `.`        |
| `+`                  | Addition              |       `+`        |
| `-`                  | Subtraction           |       `-`        |
| `*`                  | Multiplication        |       `x`        |
| `/`                  | Division              |       `/`        |
| `%`                  | Percentage            |       `%`        |
| `Enter` or `=`       | Calculate Result      |       `=`        |
| `Backspace`          | Delete last character |       `←`        |
| `Escape` or `Delete` | Clear Display         |       `C`        |

---

## 🚀 Getting Started

### Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Halip26/simple-calculator.git
   ```
2. **Navigate to the directory**:
   ```bash
   cd simple-calculator
   ```
3. **Open the App**:
   Simply open `index.html` in your web browser.

---

## 🛠️ Languages and Tools

- **HTML5** - Page structure and inputs.
- **CSS3** - Responsive Grid layout, HSL color tokens, and Glassmorphism effects.
- **Vanilla JavaScript** - Key event listeners, active state animation triggers, and expression parsing.

---

## 🧠 Educational Deep Dives

This project serves as a teaching material for web development. Below are explanations of two core JavaScript implementation concepts:

### 1. Parsing Percentages with Regular Expressions (Regex)

The expression `/(\d+(\.\d+)?)%/g` parses percentage patterns into decimals before mathematical evaluation:

- `\d+` - Matches one or more digits.
- `(\.\d+)?` - Matches an optional decimal point followed by digits.
- `%` - Matches the literal percent symbol.
- `g` - Global flag to replace all occurrences.

```javascript
inputResult = inputResult.replace(/(\d+(\.\d+)?)%/g, function (match, p1) {
  return (parseFloat(p1) / 100).toString();
});
// Example: "80%" -> parseFloat("80") / 100 -> "0.8"
```

### 2. Resolving Browser Focus Conflicts (Auto-Blur)

By default, clicking an on-screen button leaves browser focus on it. If a user subsequently hits `Enter`, the browser triggers a click event on that focused button _and_ fires our keydown listener.

We solve this conflict by immediately blurring focus on button clicks:

```javascript
document.querySelectorAll('.btn input[type="button"]').forEach((button) => {
  button.addEventListener("click", () => {
    button.blur();
  });
});
```

---

## 📬 Contact & Support

- 📫 LinkedIn: [![Linkedin Badge](https://img.shields.io/badge/-Halipuddin%20Hambali-blue?style=flat&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/halipuddin/)
-``

---

## 📬 Contact & Support

- 📫 LinkedIn: [![Linkedin Badge](https://img.shields.io/badge/-Halipuddin%20Hambali-blue?style=flat&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/halipuddin/)
- 🐦 Twitter: [@Halip26](https://twitter.com/Halip26)

---

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
