⭐ Lone Marble

A two-player abstract strategy game played on a star-shaped board.
Remove full lines (rows, columns, or diagonals) and force your opponent to take the final marble.

💀 The player who removes the last marble loses.

🎮 Live Demo

👉 https://blazer35.github.io/Lone_Marble/

🧠 Game Concept

Lone Marble is a deterministic, turn-based strategy game built around:

A star-shaped grid

Line-based removal mechanics

No randomness during gameplay

Strategic constraint rules

The game focuses on:

Planning ahead

Spatial reasoning

Line intersection control

Forcing unfavorable moves

⭐ Game Rules
🔁 Turn Structure

Players alternate turns.

On your turn:

Tap a marble.

Cycle through line types:

Row

Column

Diagonal ↘

Diagonal ↙

Press Remove to remove that entire line.

🔒 Lock Rule

You cannot remove the same type of line as the previous player
(if other valid move types exist).

This prevents repetitive strategies and increases tactical depth.

💀 Losing Condition

The player who removes the final remaining marble loses.

🧩 Board Design

The game uses a symmetric star-shaped layout:

      ● ● ●
    ● ● ● ● ●
  ● ● ● ● ● ● ●
● ● ● ● ● ● ● ● ●
  ● ● ● ● ● ● ●
    ● ● ● ● ●
      ● ● ●

Each marble may belong to multiple possible lines.

🛠️ Built With

HTML5

CSS3 (Grid + Gradients)

Vanilla JavaScript (no frameworks)

No external libraries.

🚀 Getting Started

Clone the repository:

git clone https://github.com/Blazer35/Lone_Marble.git

Open the folder:

cd Lone_Marble

Then simply open:

index.html

Or use VS Code + Live Server.

🌐 Hosting

This project is deployed using GitHub Pages.

To deploy:

Push to main

Go to Settings → Pages

Set source to main branch / (root)

📁 Project Structure
Lone_Marble/
│
├── index.html
├── styles.css
├── script.js
└── README.md
🎨 Features

⭐ Star-shaped board

🔁 Tap-to-cycle selection system

🔒 Lock rule implementation

🎯 Row / Column / Diagonal removal

💀 Last-marble-loses mechanic

ℹ️ Clickable rules panel

Responsive UI

🔮 Future Improvements

AI opponent

Animation effects

Move history / undo

Sound effects

Center control bonus rule

Competitive mode variant

🧠 Design Philosophy

This game emphasizes:

Deterministic outcomes

No hidden information

No random events

Skill-based play

Emergent complexity from simple rules

📜 License

MIT License

You are free to use, modify, and distribute this project.

👤 Author

Blazer35
GitHub: https://github.com/Blazer35