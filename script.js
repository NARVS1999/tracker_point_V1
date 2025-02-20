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

const checkbox1 = document.getElementById("checkbox1");
const checkbox2 = document.getElementById("checkbox2");

// Disable buttons based on checkbox states
function toggleButtons() {
    // Checkbox 1 disables Group 1 buttons
    if (checkbox1.checked) {
        button1.disabled = true;
        button1.classList.add('bg-gray-500', 'cursor-not-allowed');
        button1.classList.remove('bg-blue-500');

        button2.disabled = true;
        button2.classList.add('bg-gray-500', 'cursor-not-allowed');
        button2.classList.remove('bg-blue-500');

        button3.disabled = true;
        button3.classList.add('bg-gray-500', 'cursor-not-allowed');
        button3.classList.remove('bg-blue-500');

    } else {
        button1.disabled = false;
        button1.classList.remove('bg-gray-500', 'cursor-not-allowed');
        button1.classList.add('bg-blue-500');

        button2.disabled = false;
        button2.classList.remove('bg-gray-500', 'cursor-not-allowed');
        button2.classList.add('bg-blue-500');

        button3.disabled = false;
        button3.classList.remove('bg-gray-500', 'cursor-not-allowed');
        button3.classList.add('bg-blue-500');
    }


    // Checkbox 2 disables Group 2 buttons
    if (checkbox2.checked) {
        button4.disabled = true;
        button4.classList.add('bg-gray-500', 'cursor-not-allowed');
        button4.classList.remove('bg-red-500');

        button5.disabled = true;
        button5.classList.add('bg-gray-500', 'cursor-not-allowed');
        button5.classList.remove('bg-red-500');

        button6.disabled = true;
        button6.classList.add('bg-gray-500', 'cursor-not-allowed');
        button6.classList.remove('bg-red-500');
    } else {
        button4.disabled = false;
        button4.classList.remove('bg-gray-500', 'cursor-not-allowed');
        button4.classList.add('bg-red-500');

        button5.disabled = false;
        button5.classList.remove('bg-gray-500', 'cursor-not-allowed');
        button5.classList.add('bg-red-500');

        button6.disabled = false;
        button6.classList.remove('bg-gray-500', 'cursor-not-allowed');
        button6.classList.add('bg-red-500');

    }

}

// Listen for checkbox changes
checkbox1.addEventListener("change", toggleButtons);
checkbox2.addEventListener("change", toggleButtons);

// Initial button states
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

// localtesting offline// localtesting
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


