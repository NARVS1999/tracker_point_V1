let displayValuePoint = localStorage.getItem('displayValuePoint') ? parseInt(localStorage.getItem('displayValuePoint')) : 0;

const displayElement = document.getElementById('display1');
updateDisplay();

document.getElementById('button1').addEventListener('click', () => {
    displayValuePoint += 5;
    updateDisplay();
});

document.getElementById('button2').addEventListener('click', () => {
    displayValuePoint += 10;
    updateDisplay();
});

document.getElementById('button3').addEventListener('click', () => {
    displayValuePoint += 20;
    updateDisplay();
});

document.getElementById('button4').addEventListener('click', () => {
    displayValuePoint = Math.max(0, displayValuePoint - 5);
    updateDisplay();
});

document.getElementById('button5').addEventListener('click', () => {
    displayValuePoint = Math.max(0, displayValuePoint - 10);
    updateDisplay();
});

document.getElementById('button6').addEventListener('click', () => {
    displayValuePoint = Math.max(0, displayValuePoint - 20);
    updateDisplay();
});

function updateDisplay() {
    displayElement.textContent = displayValuePoint;
    localStorage.setItem('displayValuePoint', displayValuePoint); // Store the value in local storage
}
