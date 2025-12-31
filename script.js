const beginBtn = document.getElementById('beginBtn');
const resetBtn = document.getElementById('resetBtn');
const headSelection = document.getElementById('headSelection');
const proceed1Btn = document.getElementById('proceed1');
const characterContainer = document.getElementById('characterContainer');
const shirtSelection = document.getElementById('shirtSelection');
const proceed2Btn = document.getElementById('proceed2');
const pantsSelection = document.getElementById('pantsSelection');
const proceed3Btn = document.getElementById('proceed3');
const arrowLeft = document.getElementById('arrowLeft');
const arrowRight = document.getElementById('arrowRight');
const instructions1 = document.getElementById('instructions1');
const instructions2 = document.getElementById('instructions2');
const instructions3 = document.getElementById('instructions3');
const instructions4 = document.getElementById('instructions4');
const heartSelection = document.getElementById('heartSelection');
const finalizeBtn = document.getElementById('finalizeBtn');
const finishBtn = document.getElementById('finishBtn');
const backgroundContainer = document.getElementById('backgroundContainer');
const downloadBtn = document.getElementById('DownloadBtn');
let currentBackground = 1;


beginBtn.addEventListener('click', function() {
    beginBtn.style.display = 'none';
    resetBtn.style.display = 'block';
    headSelection.style.display = 'flex';
    characterContainer.style.display = 'block';
    document.getElementById('proceed1').style.display = 'block'; // Show proceed1
    instructions1.style.display = 'block'; // Show instructions1
    
    // Load head options
    for (let i = 1; i <= 8; i++) {
        const img = document.createElement('img');
        img.src = `head${i}.png`;
        img.className = 'head-option';
        headSelection.appendChild(img);
         setTimeout(() => {
        updateHeadOpacity(1); // Head 1 is centered by default
    }, 0);
    }
    arrowLeft.style.display = 'block';
    arrowRight.style.display = 'block';
});

resetBtn.addEventListener('click', function() {
    resetBtn.style.display = 'none';
    beginBtn.style.display = 'block';
    headSelection.style.display = 'none';
    characterContainer.style.display = 'none';
    document.getElementById('proceed1').style.display = 'none'; // Hide proceed1
    document.getElementById('proceed2').style.display = 'none'; // Hide proceed2
    document.getElementById('proceed3').style.display = 'none'; // Hide proceed3
    document.getElementById('finalizeBtn').style.display = 'none'; // Hide finalizeBtn
     arrowLeft.style.display = 'none';
    arrowRight.style.display = 'none';
    instructions1.style.display = 'none'; // Hide instructions1
    instructions2.style.display = 'none'; // Hide instructions2
    instructions3.style.display = 'none'; // Hide instructions3
    instructions4.style.display = 'none'; // Hide instructions4
    instructions5.style.display = 'none'; // Hide instructions5
    finishBtn.style.display = 'none'; // Hide finishBtn
    backgroundContainer.style.display = 'none'; // Hide background container
    const downloadBtn = document.getElementById('DownloadBtn');
    downloadBtn.style.display = 'none'; // Hide download button
    // Reset finish button
    finishBtn.style.display = 'none';
    finishBtn.disabled = false;

    finishBtn.style.background = ''; // Reset to default
    
    // Reset background
    currentBackground = 1;
    loadBackground();
    


    
    // Clear head options & character container
    while (headSelection.firstChild) {
        headSelection.removeChild(headSelection.firstChild);
           characterContainer.innerHTML = '';
    
    }
    // Clear shirt options
    while (shirtSelection.firstChild) {
        shirtSelection.removeChild(shirtSelection.firstChild);
        characterContainer.innerHTML = '';
    }
    // Clear pants options
    while (pantsSelection.firstChild) {
        pantsSelection.removeChild(pantsSelection.firstChild);
        characterContainer.innerHTML = '';
    }
    // Clear heart options
    while (heartSelection.firstChild) {
        heartSelection.removeChild(heartSelection.firstChild);
        characterContainer.innerHTML = '';
    }
});

let headPosition = 0;
let headCurrent = 1;

document.addEventListener('keydown', function(event) {
    // Only move if head selection is visible
    if (headSelection.style.display !== 'flex') return;
    
   // Get current head BEFORE calculating movement
const currentHead = Math.abs(headPosition / 500) + 1;

if (event.key === 'ArrowLeft') {
    // SPECIAL RULE: If currently on head1, go to head8
    if (currentHead === 1) {
        headPosition = -3500; // Position for head8
    } else {
        headPosition += 500; // Normal movement
    }
} else if (event.key === 'ArrowRight') {
    headPosition -= 500; // Normal right movement
}

// Calculate new head number
let headNumber = Math.abs(headPosition / 500) + 1;

// Regular wrap logic for other cases
if (headNumber > 8) {
    headNumber = 1;
    headPosition = 0;
} else if (headNumber < 1) {
    headNumber = 8;
    headPosition = -3500;
}

document.getElementById('currentHead').textContent = headNumber;
headSelection.style.transform = `translate(${headPosition}px, -50%)`;

document.getElementById('currentHead').textContent = headNumber;
headSelection.style.transform = `translate(${headPosition}px, -50%)`;

// Update opacity for all head options
    updateHeadOpacity(headNumber);
});

// Function to update opacity based on which head is centered
function updateHeadOpacity(centeredHeadNumber) {
    const headOptions = document.querySelectorAll('.head-option');
    
    headOptions.forEach((head, index) => {
        // Head images are in order 1-8 in the DOM
        const headNum = index + 1;
        
        if (headNum === centeredHeadNumber) {
            head.style.opacity = '1'; // Full opacity for centered head
        } else {
            head.style.opacity = '0.5'; // 75% opacity for others
        }
    });
}



// Reset position when heads are cleared
resetBtn.addEventListener('click', function() {
    headPosition = 0;
    headSelection.style.transform = `translateY(-50%)`;
    document.getElementById('currentHead').textContent = '1'; // Reset to head 1
});

proceed1Btn.addEventListener('click', function() {
    // Get current head number (1-8)
    const headNumber = Math.abs(headPosition / 500) + 1;
    
    // Hide head selection
    headSelection.style.display = 'none';
    
    // Hide proceed1 button
    this.style.display = 'none';
    
    // Load selected head into character container
    characterContainer.innerHTML = '';
    const selectedHead = document.createElement('img');
    selectedHead.src = `head${headNumber}.png`;
    selectedHead.style.width = '500px';
    selectedHead.style.height = '500px';
    selectedHead.style.objectFit = 'contain';
    selectedHead.style.position = 'absolute'; // Add this
    selectedHead.style.top = '0'; // Add this
    selectedHead.style.left = '0'; // Add this
    selectedHead.style.zIndex = '3'; // Ensure head is on top

    
    characterContainer.appendChild(selectedHead);
    
    console.log(`Locked in head ${headNumber}`);

    shirtSelection.style.display = 'flex';
    // Load shirt options
    for (let i = 1; i <= 6; i++) {
        const img = document.createElement('img');
        img.src = `shirt${i}.png`;
        img.className = 'shirt-option';
        shirtSelection.appendChild(img);
         setTimeout(() => {
        updateShirtOpacity(1); // Shirt 1 is centered by default
    }, 0);
       

    }
    document.getElementById('proceed2').style.display = 'block'; // Show proceed2
    instructions1.style.display = 'none'; // Hide instructions1
    instructions2.style.display = 'block'; // Show instructions2
    
});

let shirtPosition = 0;
let shirtCurrent = 1;

document.addEventListener('keydown', function(event) {
    // Only move if shirt selection is visible
    if (shirtSelection.style.display !== 'flex') return;

   // Get current shirt BEFORE calculating movement
const currentShirt = Math.abs(shirtPosition / 500) + 1;

if (event.key === 'ArrowLeft') {
    // SPECIAL RULE: If currently on shirt1, go to shirt6
    if (currentShirt === 1) {
        shirtPosition = -2500; // Position for shirt6
    } else {
        shirtPosition += 500; // Normal movement
    }
} else if (event.key === 'ArrowRight') {
    shirtPosition -= 500; // Normal right movement
}

// Calculate new shirt number
let shirtNumber = Math.abs(shirtPosition / 500) + 1;
// Regular wrap logic for other cases
if (shirtNumber > 6) {
    shirtNumber = 1;
    shirtPosition = 0;
} else if (shirtNumber < 1) {
    shirtNumber = 6;
    shirtPosition = -2500;
}

document.getElementById('currentShirt').textContent = shirtNumber;
shirtSelection.style.transform = `translate(${shirtPosition}px, -50%)`;


// Update opacity for all shirt options
    updateShirtOpacity(shirtNumber);
});

// Function to update opacity based on which shirt is centered
function updateShirtOpacity(centeredShirtNumber) {
    const shirtOptions = document.querySelectorAll('.shirt-option');
    
    shirtOptions.forEach((shirt, index) => {
        // Shirt images are in order 1-6 in the DOM
        const shirtNum = index + 1;
        
        if (shirtNum === centeredShirtNumber) {
            shirt.style.opacity = '1'; // Full opacity for centered shirt
        } else {
            shirt.style.opacity = '0.5'; // 50% opacity for others
        }
    });
}

// Reset position when shirts are cleared
resetBtn.addEventListener('click', function() {
    shirtPosition = 0;
    shirtSelection.style.transform = `translateY(-50%)`;
    document.getElementById('currentShirt').textContent = '1'; // Reset to shirt 1
});

proceed2Btn.addEventListener('click', function() {
    // Get current shirt number (1-6)
    const shirtNumber = Math.abs(shirtPosition / 500) + 1;    
    // Hide shirt selection
    shirtSelection.style.display = 'none';
    
    // Hide proceed2 button
    this.style.display = 'none';
    
   // Load selected shirt into character container
// DON'T clear: characterContainer.innerHTML = '';
const selectedShirt = document.createElement('img');
selectedShirt.src = `shirt${shirtNumber}.png`;
selectedShirt.style.width = '500px';
selectedShirt.style.height = '500px';
selectedShirt.style.objectFit = 'contain';
selectedShirt.style.position = 'absolute'; // Add this
selectedShirt.style.zIndex = '2'; // Ensure shirt is below head

selectedShirt.style.top = '0'; // Add this
selectedShirt.style.left = '0'; // Add this
characterContainer.appendChild(selectedShirt);

console.log(`Locked in shirt ${shirtNumber}`);

pantsSelection.style.display = 'flex';
    // Load pants options
    for (let i = 1; i <= 5; i++) {
        const img = document.createElement('img');
        img.src = `pants${i}.png`;
        img.className = 'pants-option';
        pantsSelection.appendChild(img);
            setTimeout(() => {
        updatePantsOpacity(1); // Pants 1 is centered by default
    }, 0);
    }
    document.getElementById('proceed3').style.display = 'block'; // Show proceed3
    instructions2.style.display = 'none'; // Hide instructions2
    instructions3.style.display = 'block'; // Show instructions3
});

let pantsPosition = 0;
let pantsCurrent = 1;

document.addEventListener('keydown', function(event) {
    // Only move if pants selection is visible
    if (pantsSelection.style.display !== 'flex') return;
   // Get current pants BEFORE calculating movement
const currentPants = Math.abs(pantsPosition / 500) + 1;

if (event.key === 'ArrowLeft') {
    // SPECIAL RULE: If currently on pants1, go to pants6
    if (currentPants === 1) {
        pantsPosition = -2000; // Position for pants6
    } else {
        pantsPosition += 500; // Normal movement
    }
} else if (event.key === 'ArrowRight') {
    pantsPosition -= 500; // Normal right movement
}

// Calculate new pants number
let pantsNumber = Math.abs(pantsPosition / 500) + 1;
// Regular wrap logic for other cases
if (pantsNumber > 5) {
    pantsNumber = 1;
    pantsPosition = 0;
} else if (pantsNumber < 1) {
    pantsNumber = 5;
    pantsPosition = -2000;
}

document.getElementById('currentPants').textContent = pantsNumber;
pantsSelection.style.transform = `translate(${pantsPosition}px, -50%)`;

// Update opacity for all pants options
    updatePantsOpacity(pantsNumber);
});

// Function to update opacity based on which pants is centered
function updatePantsOpacity(centeredPantsNumber) {
    const pantsOptions = document.querySelectorAll('.pants-option');

    pantsOptions.forEach((pants, index) => {
        // Pants images are in order 1-5 in the DOM
        const pantsNum = index + 1;

        if (pantsNum === centeredPantsNumber) {
            pants.style.opacity = '1'; // Full opacity for centered pants
        } else {
            pants.style.opacity = '0.5'; // 50% opacity for others
        }
    });
}


// Reset position when pants are cleared
resetBtn.addEventListener('click', function() {
    pantsPositionPosition = 0;
    pantsSelection.style.transform = `translateY(-50%)`;
    document.getElementById('currentPants').textContent = '1'; // Reset to pants 1

});

proceed3Btn.addEventListener('click', function() {
    // Get current pants number (1-5)
    const pantsNumber = Math.abs(pantsPosition / 500) + 1;    
    // Hide pants selection
    pantsSelection.style.display = 'none';
    // Hide proceed3 button
    this.style.display = 'none';
    // Load selected pants into character container
// DON'T clear: characterContainer.innerHTML = '';
const selectedPants = document.createElement('img');
selectedPants.src = `pants${pantsNumber}.png`;
selectedPants.style.width = '500px';
selectedPants.style.height = '500px';
selectedPants.style.objectFit = 'contain';
selectedPants.style.position = 'absolute'; // Add this
selectedPants.style.zIndex = '1'; // Ensure pants is below shirt and head
selectedPants.style.top = '0'; // Add this
selectedPants.style.left = '0'; // Add this         
characterContainer.appendChild(selectedPants);
console.log(`Locked in pants ${pantsNumber}`);

heartSelection.style.display = 'flex';
    // Load heart options
    for (let i = 0; i <= 7; i++) {
        const img = document.createElement('img');
        img.src = `heart${i}.png`;
        img.className = 'heart-option';
        heartSelection.appendChild(img);
            setTimeout(() => {
        updateHeartOpacity(0); // Heart 0 is centered by default
    }, 0);
    }
    document.getElementById('finalizeBtn').style.display = 'block'; // Show finalizeBtn
    instructions3.style.display = 'none'; // Hide instructions3
    instructions4.style.display = 'block'; // Show instructions4
});

let heartPosition = 0;
let heartCurrent = 0;

document.addEventListener('keydown', function(event) {
    // Only move if heart selection is visible
    if (heartSelection.style.display !== 'flex') return;
    // Get current heart BEFORE calculating movement
const currentHeart = Math.abs(heartPosition / 500);

if (event.key === 'ArrowLeft') {
    // SPECIAL RULE: If currently on heart0, go to heart7
    if (currentHeart === 0) {
        heartPosition = -3500; // Position for heart7
    } else {
        heartPosition += 500; // Normal movement
    }
} else if (event.key === 'ArrowRight') {
    heartPosition -= 500; // Normal right movement
}
// Calculate new heart number
let heartNumber = Math.abs(heartPosition / 500);
// Regular wrap logic for other cases
if (heartNumber > 7) {
    heartNumber = 0;
    heartPosition = 0;
} else if (heartNumber < 0) {
    heartNumber = 7;
    heartPosition = -3500;
}     
document.getElementById('currentHeart').textContent = heartNumber;
heartSelection.style.transform = `translate(${heartPosition}px, -50%)`;
// Update opacity for all heart options
    updateHeartOpacity(heartNumber);
});
// Function to update opacity based on which heart is centered
function updateHeartOpacity(centeredHeartNumber) {
    const heartOptions = document.querySelectorAll('.heart-option');
    heartOptions.forEach((heart, index) => {
        // Heart images are in order 0-7 in the DOM
        const heartNum = index;
        if (heartNum === centeredHeartNumber) {
            heart.style.opacity = '1'; // Full opacity for centered heart
        } else {
            heart.style.opacity = '0.5'; // 50% opacity for others
        }
    });
}

// Reset position when hearts are cleared
resetBtn.addEventListener('click', function() {
    heartPosition = 0;
    heartSelection.style.transform = `translateY(-50%)`;
    document.getElementById('currentHeart').textContent = '0'; // Reset to heart 0
});
finalizeBtn.addEventListener('click', function() {
    // Get current heart number (0-7)
    const heartNumber = Math.abs(heartPosition / 500);
    // Hide heart selection
    heartSelection.style.display = 'none';
    // Hide finalize button
    this.style.display = 'none';
    // Load selected heart into character container
    const selectedHeart = document.createElement('img');
    selectedHeart.src = `heart${heartNumber}.png`;
    selectedHeart.style.width = '500px';
    selectedHeart.style.height = '500px';
    selectedHeart.style.objectFit = 'contain';
    selectedHeart.style.position = 'absolute';
    selectedHeart.style.zIndex = '4'; // Ensure heart is on top
    selectedHeart.style.top = '0';
    selectedHeart.style.left = '0';
    characterContainer.appendChild(selectedHeart);
    console.log(`Locked in heart ${heartNumber}`);
    instructions4.style.display = 'none'; // Hide instructions4
    finishBtn.style.display = 'block'; // Show finishBtn
    backgroundContainer.style.display = 'block'; // Show background container
    instructions5.style.display = 'block'; // Show instructions5
});

arrowLeft.addEventListener('click', function() {
    // Trigger left arrow key logic
    const leftEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    document.dispatchEvent(leftEvent);
});

arrowRight.addEventListener('click', function() {
    // Trigger right arrow key logic  
    const rightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    document.dispatchEvent(rightEvent);
});


function loadBackground() {
    const imageNumber = currentBackground - 1; // 1→0, 2→1, etc.
    
    backgroundContainer.style.opacity = '0';
    
    setTimeout(() => {
        backgroundContainer.innerHTML = '';
        const bg = document.createElement('img');
        bg.src = `background${imageNumber}.png`; // background0.png when currentBackground=1
        bg.style.width = '100%';
        bg.style.height = '100%';
        bg.style.objectFit = 'cover';
        backgroundContainer.appendChild(bg);
        
        setTimeout(() => {
            backgroundContainer.style.opacity = '1';
        }, 50);
        
    }, 200);
    
    console.log(`Background ${currentBackground} loaded (background${imageNumber}.png)`);
}

// Initial background load
loadBackground();
document.addEventListener('keydown', function(event) {
    if (finishBtn.style.display !== 'block' || finishBtn.disabled) return;
    
    if (event.key === 'ArrowLeft') {
    currentBackground = currentBackground === 9 ? 1 : currentBackground + 1;
} else if (event.key === 'ArrowRight') {
    currentBackground = currentBackground === 1 ? 9 : currentBackground - 1;
}

    
    loadBackground();
});


arrowLeft.addEventListener('click', function() {
   event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
});

arrowRight.addEventListener('click', function() {
  event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
});

finishBtn.addEventListener('click', function() {
    // Lock in the current background
    const lockedBackground = currentBackground;
    
    // Disable further background changes
    finishBtn.disabled = true;
    finishBtn.style.display = 'none';
    
    // Hide arrow buttons (optional)
    arrowLeft.style.display = 'none';
    arrowRight.style.display = 'none';
    
    console.log(`Background ${lockedBackground} locked in`);
    
    // Optional: Remove keyboard/arrow listeners for backgrounds
    // You can add a flag or remove event listeners here
    instructions5.style.display = 'none'; // Hide instructions5
    const downloadBtn = document.getElementById('DownloadBtn');
    downloadBtn.style.display = 'block'; // Show download button
});

// Download functionality
downloadBtn.addEventListener('click', function() {
    // Create a canvas to combine all layers
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to match character (550x550)
    canvas.width = 550;
    canvas.height = 550;
    
    // Get all the layers
    const layers = [
        backgroundContainer.querySelector('img'),
        document.querySelector('#characterContainer img[src*="pants"]'),
        document.querySelector('#characterContainer img[src*="shirt"]'),
        document.querySelector('#characterContainer img[src*="head"]'),
        document.querySelector('#characterContainer img[src*="heart"]')
    ];
    
    // Function to draw each layer
    function drawLayers(index) {
        if (index >= layers.length) {
            // All layers drawn, trigger download
            const link = document.createElement('a');
            link.download = 'my-vessel.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
            return;
        }
        
        const img = layers[index];
        if (!img) {
            // Skip missing layer, draw next
            drawLayers(index + 1);
            return;
        }
        
        // Create temporary image to ensure it's loaded
        const tempImg = new Image();
        tempImg.crossOrigin = 'anonymous';
        tempImg.onload = function() {
            // Draw this layer
            ctx.drawImage(tempImg, 0, 0, 550, 550);
            // Draw next layer
            drawLayers(index + 1);
        };
        tempImg.onerror = function() {
            // If image fails to load, skip to next
            drawLayers(index + 1);
        };
        tempImg.src = img.src;
    }
    
    // Start drawing from first layer
    drawLayers(0);
});
   