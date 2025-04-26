// --- DOM Elements ---
const attackButton = document.getElementById('attack-button');
const defendButton = document.getElementById('defend-button');
const resetButton = document.getElementById('reset-button');
const messageElement = document.getElementById('message');
const playerHpElement = document.getElementById('player-hp');
const enemyHpElement = document.getElementById('enemy-hp');
const playerStrElement = document.getElementById('player-str'); // <<< ADD THIS
const playerDefElement = document.getElementById('player-def'); // <<< ADD THIS
const enemyStrElement = document.getElementById('enemy-str');   // <<< ADD THIS
const enemyDefElement = document.getElementById('enemy-def');
const playerImageElement = document.getElementById('player-image');
const playerChoiceRadios = document.querySelectorAll('input[name="playerChoice"]');
const winVideoContainer = document.getElementById('win-video-container'); // <<< ADD
const loseVideoContainer = document.getElementById('lose-video-container'); // <<< ADD
const winVideo = document.getElementById('win-video');     // <<< ADD (optional, if needing direct video control often)
const loseVideo = document.getElementById('lose-video');   // <<< ADD (optional)

// --- Game State ---
const INITIAL_PLAYER_STATE = {
    hp: 100,
    str: 5,
    def: 3,
    minDamage: 7,
    maxDamage: 12,
    isDefending: false // Include defending state here
};

const INITIAL_ENEMY_STATE = {
    hp: 100, // Or your previous value
    str: 4,
    def: 2,
    minDamage: 7,
    maxDamage: 19 // Or your previous value
    // Enemy doesn't need isDefending state (unless we add that later)
};

// Define current state objects using a copy of the initial state
// Using spread syntax (...) creates a shallow copy
let player = { ...INITIAL_PLAYER_STATE };
let enemy = { ...INITIAL_ENEMY_STATE };

// --- Initial Display ---
// Set the initial HP values displayed on the page when the script loads.
//playerHpElement.textContent = playerHp;
//enemyHpElement.textContent = enemyHp;
//messageElement.textContent = "A wild Boar appears! What will you do?";

// --- Helper Functions ---
function calculateDamage(minDamage, maxDamage) {
    // Math.random() gives a number between 0 (inclusive) and 1 (exclusive)
    // Multiply by the range size (+1 because we want maxDamage to be inclusive)
    // Floor it to get an integer
    // Add the minimum damage to shift the range
    const damage = Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;
    return damage;
}

// --- Video Helper Function ---
function playEndVideo(videoContainer, videoElement) {
    console.log("Playing end video:", videoElement.id);
    videoContainer.style.display = 'flex'; // Show the container (using flex for centering)

    // Ensure video starts from beginning
    videoElement.currentTime = 0;
    videoElement.play()
        .then(() => {
            console.log("Video playback started");
        })
        .catch(error => {
            // Autoplay might fail if not muted or other browser restrictions
            console.error("Video play failed:", error);
            // Optionally hide container right away if play fails
            // videoContainer.style.display = 'none';
        });

    // Add listener to hide the video when it ends
    // Use .onended property or remove/add event listener to avoid duplicates
    videoElement.onended = () => {
        console.log("Video ended, hiding container:", videoContainer.id);
        videoContainer.style.display = 'none';
        videoElement.onended = null; // Remove the listener after it fires once
    };
}

// --- Enemy Turn Logic ---
function enemyTurn() {
    console.log("Enemy's turn:");

    let rolledEnemyDamage = calculateDamage(enemy.minDamage, enemy.maxDamage); // Use enemy object properties
    let potentialEnemyDamage = rolledEnemyDamage + enemy.str; // Use enemy.str
    let finalEnemyDamage = Math.max(1, potentialEnemyDamage - player.def); // Use player.def
    console.log(`Enemy attack roll: ${rolledEnemyDamage}, +STR: ${enemy.str}, vs DEF: ${player.def} -> Final Base: ${finalEnemyDamage}`);

    let damageTaken = finalEnemyDamage;
    if (player.isDefending) { // Check state within player object
        console.log("Player is defending! Damage halved.");
        damageTaken = Math.floor(damageTaken / 2);
        messageElement.innerHTML += `Player defends! Enemy damage reduced to ${damageTaken}!<br>`;
    }

    player.hp -= damageTaken; // Modify player.hp
    playerHpElement.textContent = player.hp; // Display player.hp
    console.log("Enemy attacks. Player HP:", player.hp);
    messageElement.innerHTML += `Enemy attacks you for ${damageTaken} damage!`;

    if (player.hp <= 0) { // Check player.hp
        player.hp = 0; // Clamp player.hp
        playerHpElement.textContent = player.hp; // Display player.hp
        messageElement.innerHTML = "You have been defeated! GAME OVER.";
        attackButton.disabled = true;
        defendButton.disabled = true;
        console.log("Player defeated. Combat ended.");
        playEndVideo(loseVideoContainer, loseVideo);
        return; // Exit if defeated (return added here for consistency)
    }

    player.isDefending = false; // Reset state within player object
    console.log("Player defense status reset.");
}

// --- Game Logic Handler for ATTACK button ---
function handleAttackButtonClick() {
    messageElement.innerHTML = '';
    console.log("Player's turn: Attack button clicked!");
    player.isDefending = false; // Set state within the player object

    let rolledPlayerDamage = calculateDamage(player.minDamage, player.maxDamage); // Use player object properties
    let potentialPlayerDamage = rolledPlayerDamage + player.str; // Use player.str
    let finalPlayerDamage = Math.max(1, potentialPlayerDamage - enemy.def); // Use enemy.def
    console.log(`Player attack roll: ${rolledPlayerDamage}, +STR: ${player.str}, vs DEF: ${enemy.def} -> Final: ${finalPlayerDamage}`);

    enemy.hp -= finalPlayerDamage; // Modify enemy.hp
    enemyHpElement.textContent = enemy.hp; // Display enemy.hp
    console.log("Player attacks. Enemy HP:", enemy.hp);
    messageElement.innerHTML += `You attacked the enemy for ${finalPlayerDamage} damage!<br>`;

    if (enemy.hp <= 0) { // Check enemy.hp
        enemy.hp = 0; // Clamp enemy.hp
        enemyHpElement.textContent = enemy.hp; // Display enemy.hp
        messageElement.innerHTML = "You defeated the enemy! VICTORY!";
        attackButton.disabled = true;
        defendButton.disabled = true;
        console.log("Enemy defeated. Combat ended.");
        playEndVideo(winVideoContainer, winVideo);
        return;
    }
    enemyTurn();
}

// --- Game Logic Handler for DEFEND button ---
function handleDefendButtonClick() {
    messageElement.innerHTML = '';
    console.log("Player's turn: Defend button clicked!");
    player.isDefending = true; // Set state within the player object
    messageElement.innerHTML += "You brace yourself, preparing to defend!<br>";
    enemyTurn();
}
// --- Reset Game Logic ---
function resetGame() {
    console.log("Resetting game...");

    // 1. Reset game state objects by copying initial state
    player = { ...INITIAL_PLAYER_STATE };
    enemy = { ...INITIAL_ENEMY_STATE };

    // 2. Update displays using object properties
    playerHpElement.textContent = player.hp;
    enemyHpElement.textContent = enemy.hp;
    playerStrElement.textContent = player.str;
    playerDefElement.textContent = player.def;
    enemyStrElement.textContent = enemy.str;
    enemyDefElement.textContent = enemy.def;

    // 3. Reset message log
    messageElement.innerHTML = "Game Reset. What will you do?";

    // 4. Re-enable action buttons
    attackButton.disabled = false;
    defendButton.disabled = false;

    // 5. Hide and stop any end-game videos
    if (winVideoContainer.style.display !== 'none') {
        winVideoContainer.style.display = 'none';
        winVideo.pause();
        winVideo.onended = null; // Clear listener just in case
    }
    if (loseVideoContainer.style.display !== 'none') {
        loseVideoContainer.style.display = 'none';
        loseVideo.pause();
        loseVideo.onended = null; // Clear listener
    }

    console.log("Game Reset Complete.");
}

// --- Character Choice Logic ---
function handlePlayerChoiceChange(event) {
    // 'event.target' is the radio button that was changed
    const selectedImageSrc = event.target.value; // Get the value (e.g., "male.png")
    console.log("Player choice changed to:", selectedImageSrc);

    // Update the src attribute of the player's image element
    playerImageElement.src = selectedImageSrc;
}

// --- Event Listeners ---
// Tell the browser to run our function when the button is clicked.
attackButton.addEventListener('click', handleAttackButtonClick);
defendButton.addEventListener('click', handleDefendButtonClick);
resetButton.addEventListener('click', resetGame);
playerChoiceRadios.forEach(radio => { // Loop through each radio button
    radio.addEventListener('change', handlePlayerChoiceChange);
});

// --- Initial Setup ---
console.log("Game script loaded!");
console.log("Initial Player State:", player); // Log the whole object
console.log("Initial Enemy State:", enemy); // Log the whole object
console.log("Character choice listeners attached!");
resetGame(); // Call this if you want initial display handled by resetGame