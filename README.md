# ⭐ Lone Marble

A two-player abstract strategy game played on a star-shaped board.

Remove full lines (rows, columns, or diagonals) and force your opponent to take the final marble.

> 💀 The player who removes the **last marble loses**.

---

## 🎮 Live Demo

https://blazer35.github.io/Lone_Marble/

---

## 🧠 Game Concept

**Lone Marble** is a deterministic, turn-based strategy game built around:

- A star-shaped grid
- Line-based removal mechanics
- No randomness during gameplay
- Strategic constraint rules

The game focuses on:
- Planning ahead
- Spatial reasoning
- Line intersection control
- Forcing unfavorable moves

---

## ⭐ Game Rules

### 🔁 Turn Structure
Players alternate turns.

On your turn:
1. Tap a marble.
2. Cycle through line types:
   - Row
   - Column
   - Diagonal ↘
   - Diagonal ↙
3. Press **Remove** to remove that entire line.

---

### 🔒 Lock Rule
You cannot remove the same type of line as the previous player  
(if other valid move types exist).

This prevents repetitive strategies and increases tactical depth.

---

### 💀 Losing Condition
The player who removes the **final remaining marble loses**.

---

## 🧩 Board Layout

```
      ● ● ●
    ● ● ● ● ●
  ● ● ● ● ● ● ●
● ● ● ● ● ● ● ● ●
  ● ● ● ● ● ● ●
    ● ● ● ● ●
      ● ● ●
```

Each marble may belong to multiple possible lines.

---

## 🛠️ Built With

- HTML5
- CSS3 (Grid + Gradients)
- Vanilla JavaScript

No external libraries.

---

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/Blazer35/Lone_Marble.git
```

Open the folder:

```bash
cd Lone_Marble
```

Then open:

```bash
index.html
```

Or use VS Code + Live Server.

---

## 📁 Project Structure

```
Lone_Marble/
│
├── index.html
├── styles.css
├── script.js
└── README.md
```

---

## 🎨 Features

- ⭐ Star-shaped board
- 🔁 Tap-to-cycle selection system
- 🔒 Lock rule implementation
- 🎯 Row / Column / Diagonal removal
- 💀 Last-marble-loses mechanic
- ℹ️ Clickable rules panel
- Responsive UI

---

## 🔮 Future Improvements

- AI opponent
- Animation effects
- Move history / undo
- Sound effects
- Competitive rule variants

---

## 📜 License

MIT License

You are free to use, modify, and distribute this project.

---

## 👤 Author

Blazer35  
https://github.com/Blazer35