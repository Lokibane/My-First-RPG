// --- DOM Elements ---
const attackButton = document.getElementById('attack-button');
const defendButton = document.getElementById('defend-button');
const resetButton = document.getElementById('reset-button');
const firstAidButton = document.getElementById('first-aid-button');
const messageElement = document.getElementById('message');
const playerHpElement = document.getElementById('player-hp');
const enemyHpElement = document.getElementById('enemy-hp');
const playerStrElement = document.getElementById('player-str');
const playerDefElement = document.getElementById('player-def');
const playerDodgeElement = document.getElementById('player-dodge');
const enemyStrElement = document.getElementById('enemy-str');
const enemyDefElement = document.getElementById('enemy-def');
const enemyDodgeElement = document.getElementById('enemy-dodge');
const playerImageElement = document.getElementById('player-image');
const playerChoiceRadios = document.querySelectorAll('input[name="playerChoice"]');
const playerLevelElement = document.getElementById('player-level');
const playerMaxHpElement = document.getElementById('player-max-hp');
const playerXpElement = document.getElementById('player-xp');
const playerXpNeededElement = document.getElementById('player-xp-needed');
const enemyNameElement = document.getElementById('enemy-name');
const enemyImageElement = document.getElementById('enemy-image');
const messageLogElement = document.getElementById('message-log');
const highScoreValueElement = document.getElementById('high-score-value');
const currentLevelValueElement = document.getElementById('current-level-value');
const resetHighScoreButton = document.getElementById('reset-highscore-button');



// --- Game State ---
const BASE_DODGE_CHANCE = 0.05; // 5%
const DODGE_PER_LEVEL = 0.005; // 0.5% per level
const MAX_DODGE_CHANCE = 0.50; // 50%

const INITIAL_PLAYER_STATE = {
    hp: 100,
    maxHp: 100,
    str: 5,
    def: 4,
    dodgeChance: BASE_DODGE_CHANCE,
    minDamage: 7,
    maxDamage: 12,
    isDefending: false,
    level: 1,
    xp: 0,
    xpToNextLevel: 100
};

const enemyCatalog = [
    { name: "Wild Boar", hp: 100, str: 3, def: 2, dodgeChance: BASE_DODGE_CHANCE, minDamage: 7, maxDamage: 12, xpValue: 75, imageSrc: "Images/boar.jpg" },
    { name: "Goblin Scout", hp: 80, str: 5, def: 1, dodgeChance: BASE_DODGE_CHANCE, minDamage: 5, maxDamage: 10, xpValue: 60, imageSrc: "Images/goblin.jpg" },
    { name: "Orc Grunt", hp: 150, str: 6, def: 4, dodgeChance: BASE_DODGE_CHANCE, minDamage: 10, maxDamage: 15, xpValue: 120, imageSrc: "Images/orc.jpg" }
];

const FIRST_AID_COOLDOWN = 4;

// --- Enemy Scaling Factors ---
const ENEMY_HP_SCALE_PER_LEVEL = 0.15; // 15% HP increase per player level (after level 1)
const ENEMY_STR_SCALE_PER_LEVEL = 1;   // +1 STR per player level
const ENEMY_DEF_SCALE_PER_LEVEL = 0.5; // +0.5 DEF per player level
const ENEMY_XP_SCALE_PER_LEVEL = 0.1;  // 10% XP increase per player level

let player = { ...INITIAL_PLAYER_STATE };
let enemy = {}; // Will be populated by spawnEnemy
let highScore = 0;
let firstAidCooldownCounter = 0;

// --- Helper Functions ---
// Generates a random integer between min and max (inclusive)
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Calculates the player's current dodge chance based on level
function calculatePlayerDodgeChance() {
    const levelBonus = (player.level - 1) * DODGE_PER_LEVEL;
    const currentDodge = Math.min(MAX_DODGE_CHANCE, BASE_DODGE_CHANCE + levelBonus);
    return currentDodge;
}

// Updates all player-related stats displayed on the page
function updatePlayerStatDisplay() {
    playerHpElement.textContent = player.hp;
    playerMaxHpElement.textContent = player.maxHp;
    playerStrElement.textContent = player.str;
    playerDefElement.textContent = player.def;
    playerLevelElement.textContent = player.level;
    playerXpElement.textContent = player.xp;
    playerXpNeededElement.textContent = player.xpToNextLevel;
    currentLevelValueElement.textContent = player.level;

    // Calculate and display dodge chance
    const currentDodge = calculatePlayerDodgeChance();
    player.dodgeChance = currentDodge; // Update player object
    playerDodgeElement.textContent = (currentDodge * 100).toFixed(1); // Display as percentage
}

// --- Logging Helper Function ---
// Adds a new message to the top of the message log
function logMessage(newMessage) {
    messageElement.innerHTML = newMessage + "<br>" + messageElement.innerHTML;
    console.log("Logged:", newMessage); // Also log to console for debugging
}

// --- Spawn Enemy Logic (Random with Scaling) ---
// Selects a random enemy, scales its stats based on player level, and updates the display
function spawnEnemy() {
    const randomIndex = getRandomInt(0, enemyCatalog.length - 1);
    const baseEnemy = enemyCatalog[randomIndex]; // Get the base template
    console.log(`Spawning base enemy: ${baseEnemy.name}`);

    // Create a working copy
    enemy = { ...baseEnemy };

    // --- Apply Scaling based on Player Level ---
    const playerLevelFactor = Math.max(0, player.level - 1); // Scaling starts from player level 2

    enemy.hp = Math.floor(Number(baseEnemy.hp) * (1 + (ENEMY_HP_SCALE_PER_LEVEL * playerLevelFactor)));
    enemy.str = Math.floor(Number(baseEnemy.str) + (ENEMY_STR_SCALE_PER_LEVEL * playerLevelFactor));
    enemy.def = Math.floor(Number(baseEnemy.def) + (ENEMY_DEF_SCALE_PER_LEVEL * playerLevelFactor));
    enemy.xpValue = Math.floor(Number(baseEnemy.xpValue) * (1 + (ENEMY_XP_SCALE_PER_LEVEL * playerLevelFactor)));

    // Ensure other stats are numbers
    enemy.dodgeChance = Number(baseEnemy.dodgeChance);
    enemy.minDamage = Number(baseEnemy.minDamage);
    enemy.maxDamage = Number(baseEnemy.maxDamage);

    console.log(`Scaled Enemy Stats (Player Lvl ${player.level}): HP=${enemy.hp}, STR=${enemy.str}, DEF=${enemy.def}, XP=${enemy.xpValue}`);
    // --- End Scaling ---

    // Update the display with scaled stats
    enemyNameElement.textContent = enemy.name;
    enemyHpElement.textContent = enemy.hp;
    enemyStrElement.textContent = enemy.str;
    enemyDefElement.textContent = enemy.def;
    enemyDodgeElement.textContent = (enemy.dodgeChance * 100).toFixed(0);
    enemyImageElement.src = enemy.imageSrc;
    enemyImageElement.alt = enemy.name + " Character";

    logMessage(`A wild Level ${player.level} ${enemy.name} appears!`);
    // Enable action buttons
    attackButton.disabled = false;
    defendButton.disabled = false;
    firstAidButton.disabled = firstAidCooldownCounter > 0;
}

// --- Cooldown Management ---
// Decrements the First Aid cooldown counter each turn
function decrementCooldowns() {
    if (firstAidCooldownCounter > 0) {
        firstAidCooldownCounter--;
        console.log(`First Aid cooldown: ${firstAidCooldownCounter}`);
        if (firstAidCooldownCounter === 0) {
            firstAidButton.disabled = false;
            firstAidButton.textContent = "First Aid";
            logMessage("First Aid is ready!");
        } else {
             firstAidButton.textContent = `First Aid (${firstAidCooldownCounter})`;
        }
    }
}

// --- Enemy Turn Logic ---
// Handles the enemy's attack phase, including player dodge check and damage calculation
function enemyTurn() {
    // Check if player is already defeated
    if (player.hp <= 0) {
        // This case should ideally not be reached if checks are done correctly after player action
        console.error("Enemy turn triggered while player HP <= 0");
        return;
    }

    console.log("Enemy's turn:");

    // --- Player Dodge Check ---
    const playerDodgeRoll = Math.random();
    if (playerDodgeRoll < player.dodgeChance) {
        logMessage(`<span style="color: cyan;">You dodged the ${enemy.name}'s attack!</span>`);
        console.log(`Player dodged! Roll: ${playerDodgeRoll.toFixed(2)}, Chance: ${player.dodgeChance.toFixed(2)}`);
        // If player dodges, enemy turn ends, but player cooldowns still tick (handled by handlePlayerActionTaken)
        // We only decrement here if the *enemy* turn was skipped due to dodge, before player action handler runs
        // Note: Logic adjusted slightly - cooldowns now tick *after* action resolution via handlePlayerActionTaken
        return; // End enemy turn attempt
    }

    // --- Damage Calculation ---
    let rolledEnemyDamage = getRandomInt(enemy.minDamage, enemy.maxDamage);
    let potentialEnemyDamage = rolledEnemyDamage + Number(enemy.str);
    let finalEnemyDamage = Math.max(1, potentialEnemyDamage - Number(player.def));
    let damageTaken = finalEnemyDamage;

    // Apply defense reduction if player is defending
    if (player.isDefending) {
        console.log("Player is defending! Damage halved.");
        damageTaken = Math.floor(damageTaken / 2);
        logMessage(`Player defends! Enemy damage reduced to ${damageTaken}!`);
    }

    // Apply damage to player
    player.hp = Number(player.hp) - damageTaken;
    playerHpElement.textContent = player.hp;
    console.log("Enemy attacks. Player HP:", player.hp);
    logMessage(`Enemy attacks you for ${damageTaken} damage!`);

    // --- Check Player Defeat ---
    if (player.hp <= 0) {
         if (player.level > highScore) { // Final high score check
             console.log(`New High Score on defeat (post-attack): ${player.level}`);
             highScore = player.level;
             saveHighScore();
             updateHighScoreDisplay();
         }
        player.hp = 0; // Clamp HP
        playerHpElement.textContent = player.hp;
        logMessage("You have been defeated! GAME OVER.");
        // Disable all action buttons
        attackButton.disabled = true;
        defendButton.disabled = true;
        firstAidButton.disabled = true;
        console.log("Player defeated. Combat ended.");
        return; // End turn
    }

    // Reset player defense state if they survived
    player.isDefending = false;
    console.log("Player defense status reset.");
}


// --- Player Action Handler ---
// Centralizes logic that happens after ANY successful player action (attack hit, defend, first aid used)
function handlePlayerActionTaken() {
    // Only proceed if player is alive and enemy is alive
    if (player.hp > 0 && enemy.hp > 0) {
        decrementCooldowns(); // Decrement cooldowns first
        enemyTurn();          // Then trigger enemy's turn
    } else if (player.hp > 0 && enemy.hp <= 0) {
        // If enemy was just defeated, only decrement cooldowns
        decrementCooldowns();
    }
    // If player hp <= 0, the game over logic in enemyTurn or attack handler already ran
}


// --- Game Logic Handler for ATTACK button ---
// Handles player attack, including enemy dodge check and damage application
function handleAttackButtonClick() {
    console.log("--- Attack button clicked! ---");
    player.isDefending = false; // Attacking removes defending state

    // --- Enemy Dodge Check ---
    const enemyDodgeRoll = Math.random();
    if (enemyDodgeRoll < enemy.dodgeChance) {
        logMessage(`<span style="color: orange;">The ${enemy.name} dodged your attack!</span>`);
        console.log(`Enemy dodged! Roll: ${enemyDodgeRoll.toFixed(2)}, Chance: ${enemy.dodgeChance.toFixed(2)}`);
        // If enemy dodges, it still counts as the player's action for cooldowns/enemy turn
        handlePlayerActionTaken();
        return; // End this attack attempt
    }

    // --- Damage Calculation (if not dodged) ---
    let rolledPlayerDamage = getRandomInt(player.minDamage, player.maxDamage);
    let potentialPlayerDamage = rolledPlayerDamage + Number(player.str);
    let finalPlayerDamage = Math.max(1, potentialPlayerDamage - Number(enemy.def));

    // Apply damage to enemy
    enemy.hp = Number(enemy.hp) - Number(finalPlayerDamage);
    console.log("Enemy HP after subtract:", enemy.hp);

    // Update display and log message
    enemyHpElement.textContent = enemy.hp;
    logMessage(`You attacked the ${enemy.name} for ${finalPlayerDamage} damage!`);

    // --- Check Enemy Defeat ---
    if (enemy.hp <= 0) {
        enemy.hp = 0; // Clamp HP
        enemyHpElement.textContent = enemy.hp;
        logMessage(`You defeated the ${enemy.name}!`);

        // Grant XP and check level up
        player.xp += Number(enemy.xpValue);
        logMessage(`Gained ${enemy.xpValue} XP!`);
        updatePlayerStatDisplay(); // Includes dodge update
        checkLevelUp(); // Includes level up logic and HS check

        // Spawn next enemy
        console.log("Spawning next random enemy...");
        spawnEnemy();

        // Decrement cooldowns after defeating enemy, but don't trigger enemy turn
        decrementCooldowns();
        return; // End turn here
    }

    // If attack hit and enemy survived, proceed to next phase
    handlePlayerActionTaken();
}

// --- Game Logic Handler for DEFEND button ---
function handleDefendButtonClick() {
    console.log("--- Defend button clicked! ---");
    player.isDefending = true; // Set defense state
    logMessage(`You brace yourself, preparing to defend!`);
    handlePlayerActionTaken(); // Counts as an action, triggers cooldowns/enemy turn
}

// --- Game Logic Handler for FIRST AID button ---
function handleFirstAidClick() {
    console.log("--- First Aid button clicked! ---");
    if (firstAidCooldownCounter <= 0) { // Check if skill is off cooldown
        // Calculate heal amount
        const healAmount = Math.floor(Number(player.maxHp) * 0.25);
        const oldHp = Number(player.hp);

        // Apply heal, capped at max HP
        player.hp = Math.min(Number(player.maxHp), oldHp + healAmount);
        updatePlayerStatDisplay(); // Update display (includes dodge)

        // Log the actual amount healed
        const actualHealed = player.hp - oldHp;
        console.log(`First Aid: MaxHP=${player.maxHp}, Potential Heal=${healAmount}, OldHP=${oldHp}, NewHP=${player.hp}, Actual Healed=${actualHealed}`);
        logMessage(`<span style="color: lightgreen;">Used First Aid! Healed for ${actualHealed} HP.</span>`);

        // Start cooldown
        firstAidCooldownCounter = FIRST_AID_COOLDOWN;
        firstAidButton.disabled = true;
        firstAidButton.textContent = `First Aid (${firstAidCooldownCounter})`;

        // Using the skill counts as an action
        handlePlayerActionTaken();
    } else {
        // Skill is on cooldown, inform player
        logMessage(`First Aid is not ready yet! (Cooldown: ${firstAidCooldownCounter})`);
        // Does NOT count as an action if on cooldown
    }
}


// --- Reset Game Logic ---
// Resets player stats, clears messages, resets cooldowns, spawns first enemy
function resetGame() {
    console.log("Resetting game...");
    player = { ...INITIAL_PLAYER_STATE }; // Reset player object to initial state
    // Ensure initial stats are numbers
    player.hp = Number(player.hp);
    player.maxHp = Number(player.maxHp);
    player.str = Number(player.str);
    player.def = Number(player.def);
    player.dodgeChance = Number(player.dodgeChance);
    player.minDamage = Number(player.minDamage);
    player.maxDamage = Number(player.maxDamage);
    player.level = Number(player.level);
    player.xp = Number(player.xp);
    player.xpToNextLevel = Number(player.xpToNextLevel);

    updatePlayerStatDisplay(); // Update display (includes dodge)
    messageElement.innerHTML = ''; // Clear message log
    logMessage(`Game Reset. Prepare for battle!`); // Add initial message

    // Reset cooldowns and button state
    firstAidCooldownCounter = 0;
    firstAidButton.disabled = false;
    firstAidButton.textContent = "First Aid";

    spawnEnemy(); // Spawns first scaled enemy

    // Ensure action buttons are enabled
    attackButton.disabled = false;
    defendButton.disabled = false;
    console.log("Game Reset Complete.");
}

// --- Character Choice Logic ---
// Updates the player image based on radio button selection
function handlePlayerChoiceChange(event) {
    const selectedImageSrc = event.target.value;
    console.log("Player choice changed to:", selectedImageSrc);
    playerImageElement.src = selectedImageSrc;
}

// --- High Score Functions ---
// Loads high score from localStorage
function loadHighScore() {
    const storedScore = localStorage.getItem('rpgHighScore');
    highScore = parseInt(storedScore, 10) || 0; // Use 0 if not found or invalid
    console.log(`Loaded High Score: ${highScore}`);
}
// Saves high score to localStorage
function saveHighScore() {
    localStorage.setItem('rpgHighScore', highScore.toString());
    console.log(`Saved High Score: ${highScore}`);
}
// Updates the high score display element
function updateHighScoreDisplay() {
    highScoreValueElement.textContent = highScore;
}

// --- Reset High Score Function ---
// Resets high score variable and clears localStorage after confirmation
function resetHighScore() {
    // Ask for confirmation before resetting
    if (confirm("Are you sure you want to reset the high score? This cannot be undone.")) {
        highScore = 0; // Reset in-memory variable
        localStorage.removeItem('rpgHighScore'); // Remove from browser storage
        updateHighScoreDisplay(); // Update the displayed value
        logMessage("High score has been reset.");
        console.log("High score reset.");
    }
}

// --- Level Up Logic ---
// Handles player leveling up, increasing stats, and checking high score
function levelUp() {
    player.level++;
    console.log(`%cLEVEL UP! Reached Level ${player.level}`, "color: yellow; font-weight: bold;");

    // Check if the new level is a high score
    if (player.level > highScore) {
        console.log(`New High Score: ${player.level}`);
        highScore = player.level;
        saveHighScore();
        updateHighScoreDisplay();
    }

    // Calculate stat gains
    const strGain = getRandomInt(1, 4);
    const defGain = getRandomInt(1, 2);
    const maxHpGain = 10 + getRandomInt(0, player.level * 2);

    // Apply stat gains
    player.maxHp += maxHpGain;
    player.str += strGain;
    player.def += defGain;
    player.hp = player.maxHp; // Fully heal on level up
    player.xpToNextLevel = Math.floor(Number(player.xpToNextLevel) * 1.5); // Increase XP needed

    console.log(`Stats Increased! STR+${strGain}, DEF+${defGain}, MaxHP+${maxHpGain}`);
    console.log(`Next level at ${player.xpToNextLevel} XP.`);

    updatePlayerStatDisplay(); // Update display (includes dodge)

    // Log level up messages
    logMessage(`<strong style="color: yellow;">LEVEL UP! Reached Level ${player.level}!</strong>`);
    logMessage(`HP Fully Restored! STR+${strGain}, DEF+${defGain}, MaxHP+${maxHpGain}.`);
}

// --- Check Level Up Logic ---
// Checks if player XP is sufficient to level up, handles multiple level ups
function checkLevelUp() {
    console.log(`Checking level up: XP=${player.xp}, Needed=${player.xpToNextLevel}`);
    let leveledUp = false; // Flag to see if a level up occurred
    // Loop in case enough XP for multiple levels is gained
    while (Number(player.xp) >= Number(player.xpToNextLevel)) {
        const remainingXp = Number(player.xp) - Number(player.xpToNextLevel);
        player.xp = remainingXp; // Carry over excess XP
        levelUp(); // Perform the level up
        leveledUp = true;
    }
    // Always update display after checking, as XP might have changed even without level up
    // Or to reflect changes after multiple level ups
    updatePlayerStatDisplay();
}


// --- Event Listeners ---
// Assign functions to button clicks and radio button changes
attackButton.addEventListener('click', handleAttackButtonClick);
defendButton.addEventListener('click', handleDefendButtonClick);
firstAidButton.addEventListener('click', handleFirstAidClick);
resetButton.addEventListener('click', resetGame); // Game reset button
resetHighScoreButton.addEventListener('click', resetHighScore); // High score reset button
playerChoiceRadios.forEach(radio => {
    radio.addEventListener('change', handlePlayerChoiceChange); // Character selection
});

// --- Initial Setup ---
// Runs when the script is first loaded
console.log("Game script loaded!");
loadHighScore(); // Load saved high score
updateHighScoreDisplay(); // Display it
console.log("Character choice listeners attached!");
resetGame(); // Start the game for the first time
