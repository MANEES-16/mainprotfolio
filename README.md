# Maneeshwaran — Full Stack Developer Portfolio

A stunning 3D portfolio built with **React + Three.js + EmailJS**.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173
```

---

## ✉️ Enabling the Contact Form (EmailJS)

The contact form uses [EmailJS](https://www.emailjs.com) — **no backend required**.

### Steps

1. Create a free account at https://www.emailjs.com
2. Add an **Email Service** (Gmail, Outlook, etc.) → copy the **Service ID**
3. Create an **Email Template** using these variables:
   ```
   From:    {{from_name}} <{{from_email}}>
   Subject: New message from {{from_name}}
   Body:    {{message}}
   ```
   Copy the **Template ID**
4. Go to **Account → API Keys** → copy your **Public Key**
5. Open `src/Portfolio.jsx` and replace the three constants at the top:

```js
const EMAILJS_SERVICE_ID  = "service_abc123";   // ← your Service ID
const EMAILJS_TEMPLATE_ID = "template_xyz789";  // ← your Template ID
const EMAILJS_PUBLIC_KEY  = "AbCdEfGhIjKlMnOp"; // ← your Public Key
```

---

## 📦 Tech Stack

| Layer      | Technology             |
|------------|------------------------|
| UI         | React 18               |
| 3D         | Three.js r163          |
| Email      | EmailJS (browser SDK)  |
| Bundler    | Vite 5                 |
| Fonts      | Syne + Space Mono      |

---

## 🗂 Project Structure

```
maneeshwaran-portfolio/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx          ← React entry point
    └── Portfolio.jsx     ← All components + styles
```

---

## 🏗 Build for Production

```bash
npm run build
# Output is in /dist — deploy to Vercel, Netlify, or any static host
```
