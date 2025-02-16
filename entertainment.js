let displayValuePointEntertainment = localStorage.getItem('displayValuePointEntertainment') ? parseInt(localStorage.getItem('displayValuePointEntertainment')) : 0;

const displayElement = document.getElementById('display1');
updateDisplay();

document.getElementById('button1e').addEventListener('click', () => {
    displayValuePointEntertainment += 5;
    updateDisplay();
});

document.getElementById('button2e').addEventListener('click', () => {
    displayValuePointEntertainment += 10;
    updateDisplay();
});

document.getElementById('button3e').addEventListener('click', () => {
    displayValuePointEntertainment += 20;
    updateDisplay();
});

document.getElementById('button4e').addEventListener('click', () => {
    displayValuePointEntertainment = Math.max(0, displayValuePointEntertainment - 5);
    updateDisplay();
});

document.getElementById('button5e').addEventListener('click', () => {
    displayValuePointEntertainment = Math.max(0, displayValuePointEntertainment - 10);
    updateDisplay();
});

document.getElementById('button6e').addEventListener('click', () => {
    displayValuePointEntertainment = Math.max(0, displayValuePointEntertainment - 20);
    updateDisplay();
});

function updateDisplay() {
    displayElement.textContent = displayValuePointEntertainment;
    localStorage.setItem('displayValuePointEntertainment', displayValuePointEntertainment); // Store the value in local storage
}

const checkbox1e = document.getElementById("checkbox1e");
const checkbox2e = document.getElementById("checkbox2e");

// Disable buttons based on checkbox states
function toggleButtons() {
    // Checkbox 1 disables Group 1 buttons
    if (checkbox1e.checked) {
        button1e.disabled = true;
        button1e.classList.add('bg-gray-500', 'cursor-not-allowed');
        button1e.classList.remove('bg-blue-500');

        button2e.disabled = true;
        button2e.classList.add('bg-gray-500', 'cursor-not-allowed');
        button2e.classList.remove('bg-blue-500');

        button3e.disabled = true;
        button3e.classList.add('bg-gray-500', 'cursor-not-allowed');
        button3e.classList.remove('bg-blue-500');

    } else {
        button1e.disabled = false;
        button1e.classList.remove('bg-gray-500', 'cursor-not-allowed');
        button1e.classList.add('bg-blue-500');

        button2e.disabled = false;
        button2e.classList.remove('bg-gray-500', 'cursor-not-allowed');
        button2e.classList.add('bg-blue-500');

        button3e.disabled = false;
        button3e.classList.remove('bg-gray-500', 'cursor-not-allowed');
        button3e.classList.add('bg-blue-500');
    }


    // Checkbox 2 disables Group 2 buttons
    if (checkbox2e.checked) {
        button4e.disabled = true;
        button4e.classList.add('bg-gray-500', 'cursor-not-allowed');
        button4e.classList.remove('bg-red-500');

        button5e.disabled = true;
        button5e.classList.add('bg-gray-500', 'cursor-not-allowed');
        button5e.classList.remove('bg-red-500');

        button6e.disabled = true;
        button6e.classList.add('bg-gray-500', 'cursor-not-allowed');
        button6e.classList.remove('bg-red-500');
    } else {
        button4e.disabled = false;
        button4e.classList.remove('bg-gray-500', 'cursor-not-allowed');
        button4e.classList.add('bg-red-500');

        button5e.disabled = false;
        button5e.classList.remove('bg-gray-500', 'cursor-not-allowed');
        button5e.classList.add('bg-red-500');

        button6e.disabled = false;
        button6e.classList.remove('bg-gray-500', 'cursor-not-allowed');
        button6e.classList.add('bg-red-500');

    }

}

// Listen for checkbox changes
checkbox1e.addEventListener("change", toggleButtons);
checkbox2e.addEventListener("change", toggleButtons);

// Initial button states
toggleButtons();