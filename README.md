# Tamagotchi Web

A fun, web-based Tamagotchi pet simulation game where you take care of a virtual pet hosted on Vercel.

**Live Demo:** https://tamagotchi-web.vercel.app/

---

##  Overview

Tamagotchi Web lets users nurture a virtual pet by managing its **hunger**, **happiness**, **energy**, and **cleanliness**.  
Stats decrease over time, and user actions influence its well-being. If any stat hits zero, the game ends—users can reset and start over.  

The game features interactive UI elements and is **fully responsive** across devices.

---

##  Technologies

- **Frontend:** HTML5, CSS3, JavaScript (ES6)
- **Backend:** Node.js with Express
- **Hosting:** Vercel

---

##  Project Structure

```bash
/client        # Frontend assets (HTML, CSS, JS, images)
/server        # Backend code using Express.js
vercel.json    # Vercel deployment configuration
README.md      # Project overview and documentation
```

---

##  Getting Started

### Clone the repository

```bash
git clone https://github.com/RobertaWaa/tamagotchi-web.git
cd tamagotchi-web
```

### Setup & Run Backend

```bash
cd server
npm install
node server.js
```

### Access the App

Open the frontend by navigating to client/index.html (if served locally), or

Visit the live version: https://tamagotchi-web.vercel.app/

---

## Gameplay

Monitor your pet through four status bars: hunger, happiness, energy, cleanliness.

Use the buttons to feed, play with, put to sleep, or clean the pet.

If a stat reaches zero, the game ends—hit Reset to start again.

Designed to be simple, intuitive, and responsive.

---

## Contributing

Contributions are welcome!

Fork the repo

Create a new branch (git checkout -b feature/my-feature)

Commit changes and push (git push origin feature/my-feature)

Open a pull request
