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
const playerDodgeElement = document.getElementById('player-dodge'); // <<< ADDED
const enemyStrElement = document.getElementById('enemy-str');
const enemyDefElement = document.getElementById('enemy-def');
const enemyDodgeElement = document.getElementById('enemy-dodge'); // <<< ADDED
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
const DODGE_PER_LEVEL = 0.01; // 1%
const MAX_DODGE_CHANCE = 0.50; // 50%

const INITIAL_PLAYER_STATE = {
    hp: 100,
    maxHp: 100,
    str: 5,
    def: 4,
    dodgeChance: BASE_DODGE_CHANCE, // <<< ADDED
    minDamage: 7,
    maxDamage: 12,
    isDefending: false,
    level: 1,
    xp: 0,
    xpToNextLevel: 100
};

const enemyCatalog = [
    { name: "Wild Boar", hp: 100, str: 3, def: 2, dodgeChance: BASE_DODGE_CHANCE, minDamage: 7, maxDamage: 12, xpValue: 75, imageSrc: "Images/boar.jpg" }, // <<< ADDED dodgeChance
    { name: "Goblin Scout", hp: 80, str: 5, def: 1, dodgeChance: BASE_DODGE_CHANCE, minDamage: 5, maxDamage: 10, xpValue: 60, imageSrc: "Images/goblin.jpg" }, // <<< ADDED dodgeChance
    { name: "Orc Grunt", hp: 150, str: 6, def: 4, dodgeChance: BASE_DODGE_CHANCE, minDamage: 10, maxDamage: 15, xpValue: 120, imageSrc: "Images/orc.jpg" } // <<< ADDED dodgeChance
];

const FIRST_AID_COOLDOWN = 4;

let player = { ...INITIAL_PLAYER_STATE };
let enemy = {}; // Will be populated by spawnEnemy
let highScore = 0;
let firstAidCooldownCounter = 0;

// --- Helper Functions ---
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// --- Calculate Player's Current Dodge Chance --- <<< NEW FUNCTION ---
function calculatePlayerDodgeChance() {
    // Base + 1% per level above 1, capped at MAX
    const levelBonus = (player.level - 1) * DODGE_PER_LEVEL;
    const currentDodge = Math.min(MAX_DODGE_CHANCE, BASE_DODGE_CHANCE + levelBonus);
    return currentDodge;
}


// --- Update Player Stat Display --- <<< MODIFIED ---
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
    player.dodgeChance = currentDodge; // Update player object's current chance
    playerDodgeElement.textContent = (currentDodge * 100).toFixed(0); // Display as percentage
}

// --- Logging Helper Function ---
function logMessage(newMessage) {
    messageElement.innerHTML = newMessage + "<br>" + messageElement.innerHTML;
    console.log("Logged:", newMessage);
}

// --- Spawn Enemy Logic (Random) --- <<< MODIFIED ---
function spawnEnemy() {
    const randomIndex = getRandomInt(0, enemyCatalog.length - 1);
    const randomEnemyTemplate = enemyCatalog[randomIndex];
    console.log(`Spawning random enemy (index ${randomIndex}): ${randomEnemyTemplate.name}`);
    enemy = { ...randomEnemyTemplate };

    // Ensure stats are numbers
    enemy.hp = Number(enemy.hp);
    enemy.str = Number(enemy.str);
    enemy.def = Number(enemy.def);
    enemy.dodgeChance = Number(enemy.dodgeChance); // <<< ADDED
    enemy.minDamage = Number(enemy.minDamage);
    enemy.maxDamage = Number(enemy.maxDamage);
    enemy.xpValue = Number(enemy.xpValue);

    // Update display
    enemyNameElement.textContent = enemy.name;
    enemyHpElement.textContent = enemy.hp;
    enemyStrElement.textContent = enemy.str;
    enemyDefElement.textContent = enemy.def;
    enemyDodgeElement.textContent = (enemy.dodgeChance * 100).toFixed(0); // <<< ADDED Display dodge %
    enemyImageElement.src = enemy.imageSrc;
    enemyImageElement.alt = enemy.name + " Character";

    logMessage(`A wild ${enemy.name} appears!`);
    // Enable buttons
    attackButton.disabled = false;
    defendButton.disabled = false;
    firstAidButton.disabled = firstAidCooldownCounter > 0;
}

// --- Cooldown Management ---
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

// --- Enemy Turn Logic --- <<< MODIFIED ---
function enemyTurn() {
    if (player.hp <= 0) { /* Game over check */ return; }

    console.log("Enemy's turn:");

    // --- Player Dodge Check --- <<< ADDED >>>
    const playerDodgeRoll = Math.random();
    if (playerDodgeRoll < player.dodgeChance) {
        logMessage(`<span style="color: cyan;">You dodged the ${enemy.name}'s attack!</span>`);
        console.log(`Player dodged! Roll: ${playerDodgeRoll.toFixed(2)}, Chance: ${player.dodgeChance.toFixed(2)}`);
        // If player dodges, enemy turn ends, but player cooldowns still tick
        decrementCooldowns(); // Decrement here since handlePlayerActionTaken won't be called
        return; // End enemy turn
    }
    // --- End Dodge Check ---

    let rolledEnemyDamage = getRandomInt(enemy.minDamage, enemy.maxDamage);
    let potentialEnemyDamage = rolledEnemyDamage + Number(enemy.str);
    let finalEnemyDamage = Math.max(1, potentialEnemyDamage - Number(player.def));
    let damageTaken = finalEnemyDamage;

    if (player.isDefending) {
        console.log("Player is defending! Damage halved.");
        damageTaken = Math.floor(damageTaken / 2);
        logMessage(`Player defends! Enemy damage reduced to ${damageTaken}!`);
    }

    player.hp = Number(player.hp) - damageTaken;
    playerHpElement.textContent = player.hp;
    console.log("Enemy attacks. Player HP:", player.hp);
    logMessage(`Enemy attacks you for ${damageTaken} damage!`);

    if (player.hp <= 0) {
         if (player.level > highScore) { /* High score check */ }
        player.hp = 0;
        playerHpElement.textContent = player.hp;
        logMessage("You have been defeated! GAME OVER.");
        attackButton.disabled = true;
        defendButton.disabled = true;
        firstAidButton.disabled = true;
        console.log("Player defeated. Combat ended.");
        return;
    }

    player.isDefending = false;
    console.log("Player defense status reset.");
    // Cooldowns are handled by handlePlayerActionTaken after player's next action
}


// --- Player Action Handler ---
// Centralizes logic after player action (if attack didn't miss)
function handlePlayerActionTaken() {
    if (player.hp > 0 && enemy.hp > 0) {
        decrementCooldowns();
        enemyTurn(); // Enemy only gets turn if player didn't die and enemy didn't die
    } else if (player.hp > 0 && enemy.hp <= 0) {
        // Enemy defeated, only decrement cooldowns
        decrementCooldowns();
    }
    // If player hp <= 0, enemyTurn handles game over
}


// --- Game Logic Handler for ATTACK button --- <<< MODIFIED >>>
function handleAttackButtonClick() {
    console.log("--- Attack button clicked! ---");
    player.isDefending = false;

    // --- Enemy Dodge Check --- <<< ADDED >>>
    const enemyDodgeRoll = Math.random();
    if (enemyDodgeRoll < enemy.dodgeChance) {
        logMessage(`<span style="color: orange;">The ${enemy.name} dodged your attack!</span>`);
        console.log(`Enemy dodged! Roll: ${enemyDodgeRoll.toFixed(2)}, Chance: ${enemy.dodgeChance.toFixed(2)}`);
        // If enemy dodges, player's turn ends, trigger cooldowns/enemy turn
        handlePlayerActionTaken(); // Still counts as player action for cooldown/enemy turn
        return; // End attack attempt
    }
    // --- End Dodge Check ---


    let rolledPlayerDamage = getRandomInt(player.minDamage, player.maxDamage);
    let potentialPlayerDamage = rolledPlayerDamage + Number(player.str);
    let finalPlayerDamage = Math.max(1, potentialPlayerDamage - Number(enemy.def));

    enemy.hp = Number(enemy.hp) - Number(finalPlayerDamage);
    console.log("Enemy HP after subtract:", enemy.hp);

    enemyHpElement.textContent = enemy.hp;
    logMessage(`You attacked the ${enemy.name} for ${finalPlayerDamage} damage!`);

    if (enemy.hp <= 0) {
        enemy.hp = 0;
        enemyHpElement.textContent = enemy.hp;
        logMessage(`You defeated the ${enemy.name}!`);

        player.xp += Number(enemy.xpValue);
        logMessage(`Gained ${enemy.xpValue} XP!`);
        updatePlayerStatDisplay(); // Updates player dodge display too
        checkLevelUp();

        console.log("Spawning next random enemy...");
        spawnEnemy();

        decrementCooldowns(); // Decrement cooldowns after defeating enemy
        return; // Don't call handlePlayerActionTaken again
    }

    // If attack hit and enemy survived, trigger cooldowns/enemy turn
    handlePlayerActionTaken();
}

// --- Game Logic Handler for DEFEND button ---
function handleDefendButtonClick() {
    console.log("--- Defend button clicked! ---");
    player.isDefending = true; // Set BEFORE enemy turn
    logMessage(`You brace yourself, preparing to defend!`);
    handlePlayerActionTaken(); // Counts as an action
}

// --- Game Logic Handler for FIRST AID button ---
function handleFirstAidClick() {
    console.log("--- First Aid button clicked! ---");
    if (firstAidCooldownCounter <= 0) {
        const healAmount = Math.floor(Number(player.maxHp) * 0.25);
        const oldHp = Number(player.hp);
        player.hp = Math.min(Number(player.maxHp), oldHp + healAmount);
        updatePlayerStatDisplay(); // Updates player dodge display too
        const actualHealed = player.hp - oldHp;
        console.log(`First Aid: MaxHP=${player.maxHp}, Potential Heal=${healAmount}, OldHP=${oldHp}, NewHP=${player.hp}, Actual Healed=${actualHealed}`);
        logMessage(`<span style="color: lightgreen;">Used First Aid! Healed for ${actualHealed} HP.</span>`);

        firstAidCooldownCounter = FIRST_AID_COOLDOWN;
        firstAidButton.disabled = true;
        firstAidButton.textContent = `First Aid (${firstAidCooldownCounter})`;
        handlePlayerActionTaken(); // Counts as an action
    } else {
        logMessage(`First Aid is not ready yet! (Cooldown: ${firstAidCooldownCounter})`);
        // Does NOT count as an action if on cooldown
    }
}


// --- Reset Game Logic --- <<< MODIFIED ---
function resetGame() {
    console.log("Resetting game...");
    player = { ...INITIAL_PLAYER_STATE }; // Resets player dodge to base
    // Ensure initial player stats are numbers
    player.hp = Number(player.hp);
    player.maxHp = Number(player.maxHp);
    player.str = Number(player.str);
    player.def = Number(player.def);
    player.dodgeChance = Number(player.dodgeChance); // <<< ADDED
    player.minDamage = Number(player.minDamage);
    player.maxDamage = Number(player.maxDamage);
    player.level = Number(player.level);
    player.xp = Number(player.xp);
    player.xpToNextLevel = Number(player.xpToNextLevel);

    updatePlayerStatDisplay(); // Updates player dodge display too
    messageElement.innerHTML = '';
    logMessage(`Game Reset. Prepare for battle!`);

    firstAidCooldownCounter = 0;
    firstAidButton.disabled = false;
    firstAidButton.textContent = "First Aid";

    spawnEnemy(); // Spawns random enemy

    attackButton.disabled = false;
    defendButton.disabled = false;
    console.log("Game Reset Complete.");
}

// --- Character Choice Logic ---
function handlePlayerChoiceChange(event) {
    const selectedImageSrc = event.target.value;
    console.log("Player choice changed to:", selectedImageSrc);
    playerImageElement.src = selectedImageSrc;
}

// --- High Score Functions ---
function loadHighScore() { /* ... */ }
function saveHighScore() { /* ... */ }
function updateHighScoreDisplay() { /* ... */ }
function resetHighScore() { /* ... */ }

// --- Level Up Logic --- <<< MODIFIED ---
function levelUp() {
    player.level++;
    console.log(`%cLEVEL UP! Reached Level ${player.level}`, "color: yellow; font-weight: bold;");

    if (player.level > highScore) { /* High score update */ }

    const strGain = getRandomInt(1, 4);
    const defGain = getRandomInt(1, 2);
    const maxHpGain = 10 + getRandomInt(0, player.level * 2);
    // Dodge chance is handled by calculatePlayerDodgeChance() called in updatePlayerStatDisplay

    player.maxHp += maxHpGain;
    player.str += strGain;
    player.def += defGain;
    player.hp = player.maxHp;
    player.xpToNextLevel = Math.floor(Number(player.xpToNextLevel) * 1.5);

    console.log(`Stats Increased! STR+${strGain}, DEF+${defGain}, MaxHP+${maxHpGain}`);
    console.log(`Next level at ${player.xpToNextLevel} XP.`);

    updatePlayerStatDisplay(); // Updates player dodge display too

    logMessage(`<strong style="color: yellow;">LEVEL UP! Reached Level ${player.level}!</strong>`);
    logMessage(`HP Fully Restored! STR+${strGain}, DEF+${defGain}, MaxHP+${maxHpGain}.`);
}

// --- Check Level Up Logic ---
function checkLevelUp() {
    console.log(`Checking level up: XP=${player.xp}, Needed=${player.xpToNextLevel}`);
    let leveledUp = false;
    while (Number(player.xp) >= Number(player.xpToNextLevel)) {
        const remainingXp = Number(player.xp) - Number(player.xpToNextLevel);
        player.xp = remainingXp;
        levelUp();
        leveledUp = true;
    }
    // Always update display after checking, even if no level up,
    // because XP value might have changed. updatePlayerStatDisplay handles dodge.
    updatePlayerStatDisplay();
}


// --- Event Listeners ---
attackButton.addEventListener('click', handleAttackButtonClick);
defendButton.addEventListener('click', handleDefendButtonClick);
firstAidButton.addEventListener('click', handleFirstAidClick);
resetButton.addEventListener('click', resetGame);
resetHighScoreButton.addEventListener('click', resetHighScore);
playerChoiceRadios.forEach(radio => {
    radio.addEventListener('change', handlePlayerChoiceChange);
});

// --- Initial Setup ---
console.log("Game script loaded!");
loadHighScore();
updateHighScoreDisplay();
console.log("Character choice listeners attached!");
resetGame(); // Start the game
