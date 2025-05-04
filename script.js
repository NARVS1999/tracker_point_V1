class LevelSystem {
    constructor() {
        this.currentLevel = localStorage.getItem('currentLevel') ? parseInt(localStorage.getItem('currentLevel')) : 1;
        this.currentExp = localStorage.getItem('currentExp') ? parseInt(localStorage.getItem('currentExp')) : 0;
        this.expToNextLevel = localStorage.getItem('expToNextLevel') ? parseInt(localStorage.getItem('expToNextLevel')) : 100;
        this.levelRequirements = this.calculateAllLevelRequirements();
    }

    calculateAllLevelRequirements() {
        const requirements = { 1: 0 }; // Level 1 starts at 0 XP
        let currentReq = 100;
        for (let level = 2; level <= 100; level++) { // Assuming max level 100
            requirements[level] = currentReq;
            currentReq = Math.floor(currentReq * 1.1);
        }
        return requirements;
    }

    addExp(points) {
        this.currentExp += points;
        const levelsGained = this.checkLevelUp();
        this.saveToLocalStorage();
        return levelsGained;
    }

    subtractExp(points) {
        this.currentExp -= points;
        const levelsLost = this.checkLevelDown();
        this.saveToLocalStorage();
        return levelsLost;
    }
    checkLevelUp() {
        let levelsGained = 0;
        while (this.currentExp >= this.expToNextLevel) {
            this.currentExp -= this.expToNextLevel;
            this.currentLevel++;
            levelsGained++;
            this.expToNextLevel = this.levelRequirements[this.currentLevel + 1] || this.expToNextLevel * 1.1;
        }
        return levelsGained;
    }

    checkLevelDown() {
        let levelsLost = 0;
        while (this.currentLevel > 1 && this.currentExp < 0) {
            this.currentLevel--;
            this.expToNextLevel = this.levelRequirements[this.currentLevel + 1];
            this.currentExp += this.levelRequirements[this.currentLevel + 1];
            levelsLost++;
        }
        // Ensure experience doesn't go below 0 if at level 1
        if (this.currentLevel === 1 && this.currentExp < 0) {
            this.currentExp = 0;
        }
        return levelsLost;
    }

    saveToLocalStorage() {
        localStorage.setItem('currentLevel', this.currentLevel);
        localStorage.setItem('currentExp', this.currentExp);
        localStorage.setItem('expToNextLevel', this.expToNextLevel);
    }

    getProgressPercentage() {
        return Math.floor((this.currentExp / this.expToNextLevel) * 100);
    }
}

// Initialize systems
const playerLevel = new LevelSystem();
let displayValuePoint = localStorage.getItem('displayValuePoint') ? parseInt(localStorage.getItem('displayValuePoint')) : 0;
// DOM elements
const displayElement = document.getElementById('display1');
const levelDisplay = document.getElementById('levelDisplay');
const currentExpDisplay = document.getElementById('currentExp');
const nextLevelExpDisplay = document.getElementById('nextLevelExp');
const progressBar = document.getElementById('progressBar');

// Button elements
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const button4 = document.getElementById('button4');
const button5 = document.getElementById('button5');
const button6 = document.getElementById('button6');
const checkbox1 = document.getElementById('checkbox1');
const checkbox2 = document.getElementById('checkbox2');

// Update all UI elements
function updateUI() {
    displayElement.textContent = displayValuePoint;
    levelDisplay.textContent = playerLevel.currentLevel;
    currentExpDisplay.textContent = playerLevel.currentExp;
    nextLevelExpDisplay.textContent = playerLevel.expToNextLevel;

    const progressPercent = (playerLevel.currentExp / playerLevel.expToNextLevel) * 100;
    progressBar.style.width = `${progressPercent}%`;

    localStorage.setItem('displayValuePoint', displayValuePoint);
}

// Button click handlers
function handleAddPoints(points) {
    if (!checkbox1.checked) {
        displayValuePoint += points;
        const levelsGained = playerLevel.addExp(points);
        if (levelsGained > 0) {
            console.log(`Leveled up to level ${playerLevel.currentLevel}!`);
        }
        updateUI();
    }
}

function handleSubtractPoints(points) {
    if (!checkbox2.checked) {
        displayValuePoint = Math.max(0, displayValuePoint - points);
        const levelsLost = playerLevel.subtractExp(points);
        updateUI();
        
        if (levelsLost > 0) {
            console.log(`Leveled down to level ${playerLevel.currentLevel}!`);
        }
    }
}

// Add event listeners
button1.addEventListener('click', () => handleAddPoints(5));
button2.addEventListener('click', () => handleAddPoints(10));
button3.addEventListener('click', () => handleAddPoints(20));
button4.addEventListener('click', () => handleSubtractPoints(5));
button5.addEventListener('click', () => handleSubtractPoints(10));
button6.addEventListener('click', () => handleSubtractPoints(20));

// Toggle button states based on checkboxes
function toggleButtons() {
    // Group 1 buttons (add points)
    const addButtons = [button1, button2, button3];
    addButtons.forEach(button => {
        button.disabled = checkbox1.checked;
        button.classList.toggle('bg-gray-500', checkbox1.checked);
        button.classList.toggle('cursor-not-allowed', checkbox1.checked);
        button.classList.toggle('bg-blue-500', !checkbox1.checked);
    });

    // Group 2 buttons (subtract points)
    const subtractButtons = [button4, button5, button6];
    subtractButtons.forEach(button => {
        button.disabled = checkbox2.checked;
        button.classList.toggle('bg-gray-500', checkbox2.checked);
        button.classList.toggle('cursor-not-allowed', checkbox2.checked);
        button.classList.toggle('bg-red-500', !checkbox2.checked);
    });
}

// Checkbox event listeners
checkbox1.addEventListener('change', toggleButtons);
checkbox2.addEventListener('change', toggleButtons);

// Initialize UI and button states
updateUI();
toggleButtons();


// github setup offline
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/tracker_point_V1/service-worker.js')
            .then((registration) => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// localtesting offline
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/service-worker.js')
//             .then((registration) => {
//                 console.log('Service Worker registered with scope:', registration.scope);
//             })
//             .catch((error) => {
//                 console.log('Service Worker registration failed:', error);
//             });
//     });
// }


