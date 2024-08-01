// Generate and display the array
function RenderScreen() {
    const arrayContainer = document.querySelector('.array');
    arrayContainer.innerHTML = ''; // Clear previous elements

    // Get the array size from the dropdown
    const arraySize = parseInt(document.querySelector('.size-menu').value, 10) || 10;
    const array = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 1);

    // Create divs for each array item
    array.forEach(value => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.style.height = `${value * 2}px`; // Example height based on value
        cell.dataset.value = value; // Store the value for sorting
        arrayContainer.appendChild(cell);
    });
}

// Start sorting the array
function startSorting() {
    const cells = Array.from(document.querySelectorAll('.cell'));
    const duration = parseFloat(document.querySelector('.speed-menu').value) || 1;
    
    // Bubble Sort algorithm with animation
    async function bubbleSort() {
        const len = cells.length;
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len - i - 1; j++) {
                const cellA = cells[j];
                const cellB = cells[j + 1];
                
                if (parseInt(cellA.style.height) > parseInt(cellB.style.height)) {
                    // Swap cells
                    cellA.style.zIndex = 1;
                    cellB.style.zIndex = 1;

                    await new Promise(resolve => setTimeout(resolve, 1000 / duration));

                    const tempHeight = cellA.style.height;
                    cellA.style.height = cellB.style.height;
                    cellB.style.height = tempHeight;

                    // Swap dataset values
                    [cellA.dataset.value, cellB.dataset.value] = [cellB.dataset.value, cellA.dataset.value];

                    cellA.style.zIndex = '';
                    cellB.style.zIndex = '';
                }
            }
            // Mark sorted cells
            cells[len - i - 1].classList.add('done');
        }
    }
    
    bubbleSort();
}

// Initialize
function initialize() {
    document.querySelector('#random').addEventListener('click', RenderScreen);
    document.querySelector('.start').addEventListener('click', startSorting);
    RenderScreen(); // Generate initial array on load
}

// Run initialize on page load
window.addEventListener('DOMContentLoaded', initialize);
