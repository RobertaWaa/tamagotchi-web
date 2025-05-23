class Tamagotchi {
    constructor(name) {
        this.name = name || "Cat";
        this.loadInitialState();
    }

    async loadInitialState() {
        try {
            const response = await fetch('http://localhost:3000/api/tamagotchi');
            const data = await response.json();
            this.updateState(data);
            this.startDecreaseInterval(); 
        } catch (error) {
            console.error("Error loading status:", error);
            
            this.updateState({
                hunger: 50,
                happiness: 50,
                energy: 50,
                cleanliness: 50,
                isAlive: true
            });
            this.startDecreaseInterval();
        }
    }

    startDecreaseInterval() {
        setInterval(() => this.decreaseStats(), 3000);
    }

    async decreaseStats() {
        try {
            const response = await fetch('http://localhost:3000/api/tamagotchi/decrease', {
                method: 'POST'
            });
            const data = await response.json();
            this.updateState(data);
        } catch (error) {
            console.error("Error while subtracting statistics:", error);
        }
    }

    async sendAction(action) {
        try {
            const response = await fetch(`http://localhost:3000/api/tamagotchi/${action}`, {
                method: 'POST'
            });
            const data = await response.json();
            this.updateState(data);
        } catch (error) {
            console.error(`Error at ${action}:`, error);
        }
    }

    updateState(state) {
    const wasAlive = this.isAlive;
    this.hunger = state.hunger;
    this.happiness = state.happiness;
    this.energy = state.energy;
    this.cleanliness = state.cleanliness;
    this.isAlive = state.isAlive;
    
    if (wasAlive && !this.isAlive) {
        if (this.energy <= 0) {
            this.showMessage(`${this.name} died of fatigue! 💤☠️`);
        } else if (this.hunger <= 0) {
            this.showMessage(`${this.name} died of hunger! 🍗☠️`);
        } else if (this.happiness <= 0) {
            this.showMessage(`${this.name} died of sadness! 😢☠️`);
        } else {
            this.showMessage(`${this.name} died of dirtyness! 🧼☠️`);
        }
    }
    
    this.updateUI();
}

    updateUI() {
        document.querySelector('#hunger-bar .bar-fill').style.width = `${this.hunger}%`;
        document.querySelector('#happiness-bar .bar-fill').style.width = `${this.happiness}%`;
        document.querySelector('#energy-bar .bar-fill').style.width = `${this.energy}%`;
        document.querySelector('#cleanliness-bar .bar-fill').style.width = `${this.cleanliness}%`;

        const petImage = document.getElementById('pet-image');
        if (!this.isAlive) {
            petImage.src = 'assets/dead.png';
            this.showGameOver(); 
        } else if (this.happiness > 70 & this.cleanliness > 70 & this.energy > 70 & this.hunger > 70) {
            petImage.src = 'assets/happy.png';
            document.getElementById('game-over').style.display = 'none';
        } else if (this.happiness > 30 && this.cleanliness > 30 && this.energy > 30 && this.hunger > 30) {
            petImage.src = 'assets/neutral.png';
        } else {
            petImage.src = 'assets/sad.png';
        }
    }

    showGameOver() {
        document.getElementById('game-over').style.display = 'block';
        document.querySelector('.buttons').style.display = 'none'; 
    }

    async resetGame() {
        try {
            const response = await fetch('http://localhost:3000/api/tamagotchi/reset', {
                method: 'POST'
            });
            const data = await response.json();
            this.updateState(data);
            document.getElementById('game-over').style.display = 'none';
            document.querySelector('.buttons').style.display = 'flex'; 
            this.showMessage(`${this.name} came back to life! ✨`);
            const petImage = document.getElementById('pet-image');
            petImage.classList.add('revive');
            setTimeout(() => petImage.classList.remove('revive'), 1000);
        } catch (error) {
            console.error("Reset error:", error);
        }
    }


    showMessage(msg) {
        const messageEl = document.getElementById('message');
        messageEl.textContent = msg;
        setTimeout(() => messageEl.textContent = '', 3000);
    }
}

window.resetGame = () => pet.resetGame();

const pet = new Tamagotchi("Cat");


window.feed = () => pet.sendAction('feed');
window.play = () => pet.sendAction('play');
window.sleep = () => pet.sendAction('sleep');
window.clean = () => pet.sendAction('clean');