# 📱 Premium Cross-Platform Calculator

**[![Twitter Badge](https://img.shields.io/twitter/follow/halip26?style=social)](https://twitter.com/Halip26)
[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-0e76a8?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/halipuddin/)
[![Medium Badge](https://img.shields.io/badge/medium-%2312100E.svg?&style=for-square&logo=medium&logoColor=white)](https://medium.com/@halip26)**

A sleek, responsive, and educational online calculator. Built from scratch using semantic HTML, CSS3, and Vanilla JavaScript. Upgraded with a **Google Calculator-like dual display**, **Dark/Light theme toggle**, **full keyboard support**, and critical **cross-platform mobile optimization (iOS & Android)**.

---

## ✨ Premium Features

- **📊 Google-style Dual Display**:
  - **History Line**: Displays the previous equation with an equals sign (e.g., `12,500 + 280 =`) in a muted font.
  - **Main Line**: Displays the current expression or evaluated result in large, clear typography.
- **↔️ Long Expression Auto-Scroll**: Fixed the issue where typing long sequences of numbers (e.g., `11400+280+280+280...`) overflows and hides the typing cursor. The display now automatically scrolls to the rightmost edge (`scrollLeft = scrollWidth`), keeping the latest numbers focused and visible.
- **🌗 Theme Toggle**: Switch seamlessly between a high-contrast Dark Mode and a clean Light Mode. Your preference is saved in `localStorage` and restored automatically.
- **⚡ iOS Performance & Touch Optimizations**:
  - **No Double-Tap Zoom**: Uses `touch-action: manipulation` to prevent iOS Safari from zooming in when buttons are tapped quickly.
  - **No GPU Paint Lag**: Replaced heavy backdrop filters with lightweight CSS background variables. This prevents Safari from triggering costly card repaints when display text updates.
  - **Smooth Hover Fallback**: Wrapped all hover styles in `@media (hover: hover)` media queries. This prevents touchscreens from emulating hover states, which previously caused sticky buttons and required double-taps to click.
- **⌨️ Keyboard Support**: Input math equations directly from your keyboard. On-screen buttons light up and scale down (`transform: scale(0.92)`) to match your keystrokes.
- **🔢 Real-time Thousand Separators**: Automatically formats numbers with commas as you type (e.g., `11,400 + 280`) for maximum readability.
- **🛡️ Smart Input Safeguards**:
  - **Operator Overwriting**: Typing an operator immediately after another replaces it (e.g., changing `+` to `-` instead of displaying `+-`).
  - **Decimal Protection**: Prevents duplicate decimal points in a single number.
  - **Auto-Reset**: Starting a new number directly after calculating a result (`=`) clears the screen and starts fresh. Chaining an operator continues from the result.

---

## ⌨️ Keyboard Shortcuts Reference

Operate the calculator entirely using your keyboard keys:

| Key(s)               | Action                | On-Screen Button |
| :------------------- | :-------------------- | :--------------: |
| `0` - `9`            | Input Digits          |    `0` - `9`     |
| `.`                  | Decimal Point         |       `.`        |
| `+`                  | Addition              |       `+`        |
| `-`                  | Subtraction           |       `−`        |
| `*`                  | Multiplication        |       `×`        |
| `/`                  | Division              |       `÷`        |
| `%`                  | Percentage            |       `%`        |
| `Enter` or `=`       | Calculate Result      |       `=`        |
| `Backspace`          | Delete last character |  `⌫` (SVG Icon)  |
| `Escape` or `Delete` | Clear Display         |       `C`        |

---

## 🚀 Getting Started

### Running Locally

Since this is a lightweight static website, you don't need to install any packages or run local build servers:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Halip26/simple-calculator.git
   ```

2. **Navigate to the directory**:

   ```bash
   cd simple-calculator
   ```

3. **Open the App**:
   Double-click `index.html` to open it directly in your web browser.

---

## 🛠️ Languages and Tools

- **HTML5** - Semantic structure and layout.
- **CSS3** - CSS Grid, CSS Custom Variables, Media Queries (Themeing and Hover checks).
- **Vanilla JavaScript** - DOM Event delegation, keyboard mapping, calculation parsing, and scroll position management.

---

## 🧠 Educational Deep Dives (For Teaching Materials)

On mobile browsers, double-tapping can trigger a zoom gesture. Additionally, touch screens don't support hovering, which causes `:hover` styles to "stick" and mimic click delays. We solve these mobile-specific bugs using pure CSS:

```css
/* 1. Prevent double-tap-to-zoom and remove the default gray tap overlay */
.btn button {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

/* 2. Only apply hover animations on devices that actually support hovering (mice) */
@media (hover: hover) {
  .btn-number:hover {
    background: var(--btn-num-active);
  }
}
```

### 2. Auto-Scroll with `requestAnimationFrame`

When updating the display text programmatically, browsers don't always scroll to the rightmost edge of an overflowing element immediately. We wrap our scroll logic in `requestAnimationFrame` to ensure the scroll position updates _after_ the browser has recalculated the text layout:

```javascript
function scrollDisplayToEnd() {
  const mainDisplay = document.getElementById("mainDisplay");

  // Wait for the next repaint so we get the accurate scrollWidth
  requestAnimationFrame(() => {
    if (mainDisplay) {
      mainDisplay.scrollLeft = mainDisplay.scrollWidth;
    }
  });
}
```

### 3. Event Delegation
lLeft = mainDisplay.scrollWidth;
    }
  });
}
```

### 3. Event Delegation

Instead of binding event listeners to 20 different buttons (which consumes more memory and makes the code cluttered), we bind a single listener to the parent element (`#btnContainer`). We then use `.closest()` to identify which button was clicked and read its custom `data-` attributes:

```javascript
btnContainer.addEventListener("click", (e) => {
  const target = e.target.closest("button");
  if (!target) return;

  target.blur(); // Remove focus to prevent Enter key conflicts

  const val = target.getAttribute("data-val");
  const action = target.getAttribute("data-action");

  if (val !== null) handleInput(val);
  else if (action !== null) handleAction(action);
});
```

---

## 📬 Contact & Support

- 📫 LinkedIn: [Halipuddin Hambali](https://www.linkedin.com/in/halipuddin/)
- 🐦 Twitter: [@Halip26](https://twitter.com/Halip26)

---

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
