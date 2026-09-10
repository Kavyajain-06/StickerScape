# StickerScape
Interactive Sketchbook Landing Page

A playful, interactive landing page built with React + Vite + Tailwind CSS v4 and Framer Motion, inspired by the "aesthetic drag-me-around intro card" trend on Instagram Reels. Features a hand-illustrated notebook scene with draggable stickers and a character whose eyes subtly follow the cursor.

✨ Features
Draggable stickers — freely drag any sticker (apple, avatar, coffee, envelope, flower, pencil, star, wallet) anywhere on the canvas using Framer Motion's drag support, with a spring-back feel and "bring to front" behavior on grab.
Cursor-tracking eyes — two small overlay dots sit on top of the illustrated character's eyes and shift subtly toward the cursor, creating a lightweight "eyes follow you" effect without needing a fully separate eye illustration.
Custom name display — large, bold name split left/right around the notebook (KAVYA / JAIN).
Single flattened base illustration — the girl, notebook, wooden stand, and sticky note are combined into one base image for pixel-perfect fidelity to the reference design, avoiding multi-layer alignment drift.
🛠️ Tech Stack
Tool	Purpose
Vite	Build tool / dev server
React 19	UI framework
Tailwind CSS v4	Styling (via @tailwindcss/vite plugin)
Framer Motion	Drag interactions

📂 Project Structure

src/

├── assets/

│   ├── base.png 

│   └── stickers/

│       ├── apple.png

│       ├── avatar.png

│       ├── coffee.png

│       ├── envelope.png

│       ├── flower.png

│       ├── pencil.png

│       ├── star.png

│       └── wallet.png

├── App.jsx     

├── main.jsx     

└── index.css    

vite.config.js                
🚀 Getting Started
bash
npm install
npm run dev

Then open the local URL Vite prints in your terminal (usually http://localhost:5173).

Key setup notes (Tailwind v4)

This project uses Tailwind v4, which works differently from v3:

No tailwind.config.js or postcss.config.js needed.
Tailwind is registered directly as a Vite plugin in vite.config.js:
js
  import tailwindcss from '@tailwindcss/vite'

  export default defineConfig({
    plugins: [react(), tailwindcss()],
  })
src/index.css imports Tailwind with a single line:
css
  @import "tailwindcss";

If styles ever stop applying after edits, try restarting the dev server — Tailwind's JIT compiler can occasionally get out of sync after many rapid file changes, especially with arbitrary-value classes like text-[56px].

🎨 Customization
Repositioning/resizing the base illustration



Adjust width/height here to resize, and the paddingTop on its parent wrapper to shift it up/down within the canvas.

Adjusting the eye-tracking dots

Two small dots are positioned via the Pupil component, using pixel coordinates relative to the base image wrapper:

jsx
<Pupil style={{ top: "145px", left: "340px" }} />
<Pupil style={{ top: "145px", left: "379px" }} />

To find exact coordinates for a different image, temporarily add a click handler on the image wrapper that logs event.clientX/Y relative to the wrapper's bounding box, click on each eye, and copy the resulting values.

Adding/repositioning stickers

Stickers are defined in a single config array for easy editing:

jsx
const stickerConfig = [
  { key: "avatar", src: avatar, top: "55%", left: "30%", width: 90 },
  // ...
];

Add, remove, or reposition entries here — top/left are percentages of the canvas, width is in pixels (height scales automatically).

Sticker behavior

Stickers are currently decorative and freely draggable anywhere on the canvas (no boundary constraints, no nav-link behavior). To make a sticker act as a clickable link later, wrap it in an <a> tag or add an onClick handler, and consider adding dragConstraints if you want to keep stickers confined to the notebook area.
