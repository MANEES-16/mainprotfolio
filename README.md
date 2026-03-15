# 🚀 Maneeshwaran — Full Stack Developer Portfolio

A modern, dark-themed developer portfolio built with **React.js**, featuring smooth animations, custom cursor, scroll-reveal effects, and a fully responsive layout.

---

## 👨‍💻 About

**Maneeshwaran** | Full Stack Developer (Fresher)

- 📧 Email: maneesthilagar@gmail.com
- 🐙 GitHub: [MANEES-16](https://github.com/MANEES-16)
- 💼 LinkedIn: [manees-thilagar-005977363](https://www.linkedin.com/in/manees-thilagar-005977363)

---

## ✨ Features

- ⚡ Custom animated cursor with follower
- 🎯 Scroll-triggered reveal animations (IntersectionObserver)
- 💚 Animated 99% satisfaction progress bar
- 🖥️ Live code card in hero section
- 📐 Responsive grid layout
- 🌑 Dark theme with neon green accent
- 🗂️ 5 Full-Stack Projects showcase
- 🔧 20+ Mini Projects grid

---

## 🗂️ Project Structure

```
maneeshwaran-portfolio/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Cursor.jsx       # Custom animated cursor
│   │   ├── Cursor.css
│   │   ├── Navbar.jsx       # Fixed navigation bar
│   │   ├── Navbar.css
│   │   ├── Reveal.jsx       # Scroll-reveal wrapper
│   │   └── Reveal.css
│   ├── data/
│   │   └── data.js          # All portfolio data (projects, skills, stats)
│   ├── hooks/
│   │   └── useReveal.js     # Custom IntersectionObserver hook
│   ├── sections/
│   │   ├── Hero.jsx         # Hero section with code card
│   │   ├── Hero.css
│   │   ├── Stats.jsx        # Stats bar (satisfaction, projects)
│   │   ├── Stats.css
│   │   ├── About.jsx        # About + skills grid
│   │   ├── About.css
│   │   ├── Projects.jsx     # Full-stack projects
│   │   ├── Projects.css
│   │   ├── MiniProjects.jsx # 20+ mini projects grid
│   │   ├── MiniProjects.css
│   │   ├── Contact.jsx      # Contact section
│   │   ├── Contact.css
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   ├── App.jsx              # Root component
│   ├── App.css
│   ├── index.js             # React entry point
│   └── index.css            # Global styles & CSS variables
├── package.json
├── package-lock.json
└── README.md
```

---

## 🛠️ Tech Stack

| Layer      | Technology          |
|------------|---------------------|
| Framework  | React 18            |
| Styling    | CSS Modules         |
| Fonts      | Google Fonts (Syne, DM Mono, Instrument Serif) |
| Animations | CSS Keyframes + IntersectionObserver |
| Build Tool | Create React App    |

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 14.0.0
- npm >= 6.0.0

### Installation

```bash
# 1. Clone or download the project
cd maneeshwaran-portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view in browser.

### Build for Production

```bash
npm run build
```

Builds the app for production to the `build/` folder.

---

## 📦 Deployment

You can deploy this portfolio on:

| Platform   | Command                          |
|------------|----------------------------------|
| Vercel     | `vercel deploy`                  |
| Netlify    | Drag & drop `build/` folder      |
| GitHub Pages | `npm run build` → push `build/` |

---

## 🎨 Customization

To update your personal info, edit **`src/data/data.js`**:

```js
export const CONTACT_INFO = {
  email: "maneesthilagar@gmail.com",
  github: "https://github.com/MANEES-16",
  linkedin: "https://www.linkedin.com/in/manees-thilagar-005977363",
  whatsapp: "https://wa.me/YOUR_NUMBER",
};
```

Add or edit projects in the `PROJECTS` array, and skills in the `SKILLS` array.

---

## 📄 License

MIT License — feel free to use and customize for your own portfolio.

---

> Built with 💚 by Maneeshwaran
