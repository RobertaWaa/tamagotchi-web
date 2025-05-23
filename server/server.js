const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let tamagotchiState = {
    hunger: 50,       
    happiness: 50,    
    energy: 50,       
    cleanliness: 50,  
    isAlive: true     
};

app.get('/api/tamagotchi', (req, res) => {
    res.json(tamagotchiState);
});

app.post('/api/tamagotchi/feed', (req, res) => {
    if (!tamagotchiState.isAlive) return res.status(400).json({ error: "Tamagotchi died!" });
    tamagotchiState.hunger = Math.min(100, tamagotchiState.hunger + 20);
    tamagotchiState.cleanliness = Math.max(0, tamagotchiState.cleanliness - 10);
    checkAliveStatus();
    res.json(tamagotchiState);
});

app.post('/api/tamagotchi/play', (req, res) => {
    if (!tamagotchiState.isAlive) return res.status(400).json({ error: "Tamagotchi died!" });
    tamagotchiState.happiness = Math.min(100, tamagotchiState.happiness + 20);
    tamagotchiState.energy = Math.max(0, tamagotchiState.energy - 15);
    checkAliveStatus();
    res.json(tamagotchiState);
});

app.post('/api/tamagotchi/sleep', (req, res) => {
    if (!tamagotchiState.isAlive) return res.status(400).json({ error: "Tamagotchi died!" });
    tamagotchiState.energy = Math.min(100, tamagotchiState.energy + 30);
    tamagotchiState.hunger = Math.max(0, tamagotchiState.hunger - 10);
    checkAliveStatus();
    res.json(tamagotchiState);
});

app.post('/api/tamagotchi/clean', (req, res) => {
    if (!tamagotchiState.isAlive) return res.status(400).json({ error: "Tamagotchi died!" });
    tamagotchiState.cleanliness = Math.min(100, tamagotchiState.cleanliness + 25);
    checkAliveStatus();
    res.json(tamagotchiState);
});

app.post('/api/tamagotchi/decrease', (req, res) => {
    if (!tamagotchiState.isAlive) return res.json(tamagotchiState);
    tamagotchiState.hunger -= 5;
    tamagotchiState.happiness -= 5;
    tamagotchiState.energy -= 5;
    tamagotchiState.cleanliness -= 5;
    checkAliveStatus();
    res.json(tamagotchiState);
});

app.post('/api/tamagotchi/reset', (req, res) => {
    tamagotchiState = {
        hunger: 50,
        happiness: 50,
        energy: 50,
        cleanliness: 50,
        isAlive: true
    };
    res.json(tamagotchiState);
});

function checkAliveStatus() {
    if (tamagotchiState.hunger <= 0 || 
        tamagotchiState.happiness <= 0 || 
        tamagotchiState.cleanliness <= 0 ||
        tamagotchiState.energy <= 0) { 
        tamagotchiState.isAlive = false;
    }
}

app.listen(3000, () => {
    console.log('The server is running on http://localhost:3000');
});