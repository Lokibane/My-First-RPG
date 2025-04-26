// --- DOM Elements ---
// Get references to all the HTML elements we need to interact with
const attackButton = document.getElementById('attack-button');
const evasionButton = document.getElementById('evasion-button');
const resetButton = document.getElementById('reset-button');
const firstAidButton = document.getElementById('first-aid-button');
const messageElement = document.getElementById('message'); // The div where messages are displayed
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
const messageLogElement = document.getElementById('message-log'); // The container for messages and score
const highScoreValueElement = document.getElementById('high-score-value');
const currentLevelValueElement = document.getElementById('current-level-value');
const resetHighScoreButton = document.getElementById('reset-highscore-button');


// --- Game State & Configuration ---
// Dodge configuration
const BASE_DODGE_CHANCE = 0.05; // 5% base dodge
const DODGE_PER_LEVEL = 0.005; // +0.5% dodge per player level
const MAX_DODGE_CHANCE = 0.50; // 50% dodge cap (before Evasion)

// Player Evasion Skill configuration
const EVASION_DODGE_BONUS = 0.30; // +30% dodge when active
const EVASION_DURATION = 3; // Lasts 3 player actions (turns where player acts)
const EVASION_COOLDOWN = 6; // 6 turns cooldown after use
const EVASION_MAX_CAP = 0.85; // Absolute max dodge chance (85%) even with Evasion

// First Aid Skill configuration
const FIRST_AID_HEAL_PERCENT = 0.25; // Heals 25% of max HP
const FIRST_AID_COOLDOWN = 4; // 4 turns cooldown

// Message Log configuration
const MESSAGE_LIMIT = 14; // Max number of messages to display before removing oldest

// Enemy Scaling configuration (per player level beyond 1)
const ENEMY_HP_SCALE_PER_LEVEL = 0.15; // +15% HP per level
const ENEMY_STR_SCALE_PER_LEVEL = 1;   // +1 STR per level
const ENEMY_DEF_SCALE_PER_LEVEL = 0.5; // +0.5 DEF per level (rounded down)
const ENEMY_XP_SCALE_PER_LEVEL = 0.1;  // +10% XP per level

// --- Enemy Skill Configuration ---
// Hornet
const HORNET_VENOM_CHANCE = 0.25; // 25% chance per turn to use Venom Sting
const HORNET_VENOM_DAMAGE = 5;    // 5 damage per turn from venom
const HORNET_VENOM_DURATION = 2;  // Venom lasts 2 player turns
// Kobold
const KOBOLD_EVASION_CHANCE = 0.15; // 15% chance per turn to use Evasion
const KOBOLD_EVASION_DURATION = 1;  // Evasion lasts 1 player turn
// Boar
const BOAR_CHARGE_CHANCE = 0.20; // 20% chance per turn to start charging
const BOAR_CHARGE_BONUS = 0.25;  // +25% damage on the attack following a charge

// Initial Player Stats template (used on reset)
const INITIAL_PLAYER_STATE = {
    hp: 100,
    maxHp: 100,
    str: 5,
    def: 4,
    dodgeChance: BASE_DODGE_CHANCE, // Calculated dynamically
    evasionActive: false,
    evasionDuration: 0,
    poisonTurnsLeft: 0, // Tracks remaining turns of venom
    minDamage: 7,       // Base minimum damage
    maxDamage: 12,      // Base maximum damage
    level: 1,
    xp: 0,
    xpToNextLevel: 100
};

// Base stats for enemies (will be scaled based on player level)
// Added specific base dodge chances
const GOBLIN_BASE_DODGE = 0.08;
const KOBOLD_BASE_DODGE = 0.06;
const HORNET_BASE_DODGE = 0.12;
const SLIME_BASE_DODGE = 0.03;

// <<< UPDATED ENEMY STATS based on user image >>>
const enemyCatalog = [
    // name, hp, str, def, dodgeChance, minDamage, maxDamage, xpValue, imageSrc
    { name: "Wild Boar",        hp: 90,  str: 4, def: 2, dodgeChance: BASE_DODGE_CHANCE, minDamage: 7,  maxDamage: 12, xpValue: 70,  imageSrc: "Images/boar.jpg" },          // STR changed
    { name: "Goblin Scout",     hp: 80,  str: 4, def: 3, dodgeChance: GOBLIN_BASE_DODGE, minDamage: 5,  maxDamage: 10, xpValue: 65,  imageSrc: "Images/goblin.jpg" },        // No change from image
    { name: "Orc Grunt",        hp: 150, str: 6, def: 4, dodgeChance: BASE_DODGE_CHANCE, minDamage: 10, maxDamage: 15, xpValue: 120, imageSrc: "Images/orc.jpg" },           // No change from image
    { name: "Slime",            hp: 60,  str: 2, def: 4, dodgeChance: SLIME_BASE_DODGE,  minDamage: 3,  maxDamage: 6,  xpValue: 40,  imageSrc: "Images/slime.jpg" },         // No change from image
    { name: "Kobold",           hp: 75,  str: 2, def: 2, dodgeChance: KOBOLD_BASE_DODGE, minDamage: 6,  maxDamage: 9,  xpValue: 50,  imageSrc: "Images/kobold.png" },        // STR & DEF changed
    { name: "Hornet",           hp: 85,  str: 6, def: 2, dodgeChance: HORNET_BASE_DODGE, minDamage: 5,  maxDamage: 9,  xpValue: 80,  imageSrc: "Images/hornet.jpg" },        // Max Dmg changed
    { name: "Little Nepenthes", hp: 110, str: 5, def: 3, dodgeChance: BASE_DODGE_CHANCE, minDamage: 8,  maxDamage: 12, xpValue: 90,  imageSrc: "Images/Little_Nepenthes.jpg" } // Max Dmg changed
];
// <<< END UPDATED ENEMY STATS >>>


// --- Live Game Variables ---
let player = { ...INITIAL_PLAYER_STATE }; // Active player state, copied from initial state
let enemy = { // Active enemy state, populated by spawnEnemy
    // Enemy-specific state placeholders (reset in spawnEnemy)
    isCharging: false,      // For Wild Boar
    evasionActive: false,   // For Kobold
    evasionDuration: 0      // For Kobold
};
let highScore = 0; // Tracks highest player level reached
let firstAidCooldownCounter = 0; // Turns remaining on First Aid cooldown
let evasionCooldownCounter = 0; // Turns remaining on Evasion cooldown

// --- Helper Functions ---

/**
 * Generates a random integer between min (inclusive) and max (inclusive).
 * @param {number} min - The minimum possible value.
 * @param {number} max - The maximum possible value.
 * @returns {number} A random integer within the specified range.
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Calculates the player's current dodge chance based on level and Evasion status.
 * @returns {number} The calculated dodge chance (e.g., 0.15 for 15%).
 */
function calculatePlayerDodgeChance() {
    let currentDodge = BASE_DODGE_CHANCE + (DODGE_PER_LEVEL * (player.level - 1));
    currentDodge = Math.min(currentDodge, MAX_DODGE_CHANCE); // Apply normal cap

    if (player.evasionActive) {
        currentDodge += EVASION_DODGE_BONUS;
        currentDodge = Math.min(currentDodge, EVASION_MAX_CAP); // Apply evasion cap
    }
    return currentDodge;
}

/**
 * Updates the player's stats displayed on the HTML page.
 * Also recalculates and updates the displayed dodge chance.
 */
function updatePlayerStatDisplay() {
    playerHpElement.textContent = player.hp;
    playerMaxHpElement.textContent = player.maxHp;
    playerStrElement.textContent = player.str;
    playerDefElement.textContent = player.def;
    playerLevelElement.textContent = player.level;
    playerXpElement.textContent = player.xp;
    playerXpNeededElement.textContent = player.xpToNextLevel;

    // Recalculate and display dodge chance
    player.dodgeChance = calculatePlayerDodgeChance();
    playerDodgeElement.textContent = (player.dodgeChance * 100).toFixed(1); // Show one decimal place

    // Update current level display in the message log footer
    currentLevelValueElement.textContent = player.level;
}

/**
 * Adds a message to the message log display, handling scrolling and message limits.
 * @param {string} newMessage - The message string to add (can include HTML).
 */
function logMessage(newMessage) {
    const messageContainer = document.getElementById('message'); // Target the inner div
    // Check if scroll is near the bottom BEFORE adding the new message
    const wasScrolledToBottom = messageContainer.scrollHeight - messageContainer.clientHeight <= messageContainer.scrollTop + 1;

    // Create a new paragraph element for the message
    const p = document.createElement('p');
    p.innerHTML = newMessage; // Use innerHTML to allow styling tags
    messageContainer.appendChild(p);

    // Limit the number of messages displayed
    while (messageContainer.children.length > MESSAGE_LIMIT) { // Use the constant
        messageContainer.removeChild(messageContainer.firstChild);
    }

    // Auto-scroll to bottom only if it was already near the bottom
    if (wasScrolledToBottom) {
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }
}


// --- Spawn Enemy Logic (Random with Scaling) ---
function spawnEnemy() {
    // Basic check for enemy catalog
    console.log("SpawnEnemy: Catalog Length:", enemyCatalog.length);
    if (!enemyCatalog || enemyCatalog.length === 0) {
        console.error("ERROR: enemyCatalog is missing or empty!");
        logMessage("<span style='color: red;'>ERROR: Cannot load enemies. Game cannot continue.</span>");
        attackButton.disabled = true;
        evasionButton.disabled = true;
        firstAidButton.disabled = true;
        return;
    }

    const randomIndex = getRandomInt(0, enemyCatalog.length - 1);
    console.log("SpawnEnemy: Calculated randomIndex:", randomIndex);

    // Validate index before accessing
    if (randomIndex < 0 || randomIndex >= enemyCatalog.length) {
         console.error(`ERROR: Invalid randomIndex calculated: ${randomIndex}. Max index should be ${enemyCatalog.length - 1}. Check getRandomInt.`);
         logMessage("<span style='color: red;'>ERROR: Failed to select enemy. Trying again...</span>");
         spawnEnemy(); // Recursive call - potential issue if error persists
         return;
    }
    console.log("SpawnEnemy: Entry at randomIndex:", enemyCatalog[randomIndex]);

    const baseEnemy = enemyCatalog[randomIndex];

    // Check if baseEnemy is valid
    if (!baseEnemy) {
         console.error(`ERROR: baseEnemy is undefined/null even with valid randomIndex ${randomIndex}. Check enemyCatalog data.`);
         logMessage("<span style='color: red;'>ERROR: Problem loading enemy data. Trying again...</span>");
         spawnEnemy(); // Recursive call - potential issue
         return;
    }

    console.log(`Spawning base enemy: ${baseEnemy.name}`);
    enemy = { ...baseEnemy }; // Create a working copy

    // --- Apply Scaling based on Player Level ---
    const playerLevelNum = Number(player.level) || 1;
    const playerLevelFactor = Math.max(0, playerLevelNum - 1);

    const baseHp = Number(baseEnemy.hp) || 50;
    const baseStr = Number(baseEnemy.str) || 1;
    const baseDef = Number(baseEnemy.def) || 0;
    const baseXp = Number(baseEnemy.xpValue) || 10;

    enemy.hp = Math.floor(baseHp * (1 + (ENEMY_HP_SCALE_PER_LEVEL * playerLevelFactor)));
    enemy.str = Math.floor(baseStr + (ENEMY_STR_SCALE_PER_LEVEL * playerLevelFactor));
    enemy.def = Math.floor(baseDef + (ENEMY_DEF_SCALE_PER_LEVEL * playerLevelFactor));
    enemy.xpValue = Math.floor(baseXp * (1 + (ENEMY_XP_SCALE_PER_LEVEL * playerLevelFactor)));

    enemy.dodgeChance = Number(baseEnemy.dodgeChance) || BASE_DODGE_CHANCE;
    enemy.minDamage = Number(baseEnemy.minDamage) || 1;
    enemy.maxDamage = Number(baseEnemy.maxDamage) || 2;
    enemy.hp = Math.max(1, enemy.hp); // Ensure HP is at least 1

    console.log(`Scaled Enemy Stats (Player Lvl ${playerLevelNum}): HP=${enemy.hp}, STR=${enemy.str}, DEF=${enemy.def}, XP=${enemy.xpValue}`);

    // --- Reset Enemy Specific States ---
    enemy.isCharging = false;
    enemy.evasionActive = false;
    enemy.evasionDuration = 0;

    // Update enemy display
    enemyNameElement.textContent = enemy.name || "Unknown Enemy";
    enemyHpElement.textContent = enemy.hp;
    enemyStrElement.textContent = enemy.str;
    enemyDefElement.textContent = enemy.def;
    enemyDodgeElement.textContent = (enemy.dodgeChance * 100).toFixed(1);
    enemyImageElement.src = enemy.imageSrc || 'https://placehold.co/80x80/2c3e50/ecf0f1?text=Enemy';
    enemyImageElement.alt = (enemy.name || "Enemy") + " Character";

    logMessage(`A wild Level ${playerLevelNum} ${enemy.name} appears!`);

    // Enable action buttons
    attackButton.disabled = false;
    evasionButton.disabled = evasionCooldownCounter > 0;
    firstAidButton.disabled = firstAidCooldownCounter > 0;
}


// --- Cooldown Management ---
/** Decrements active cooldown counters for player skills each turn. */
function decrementCooldowns() {
    // Evasion Cooldown
    if (evasionCooldownCounter > 0) {
        evasionCooldownCounter--;
        evasionButton.textContent = `Evasion (${evasionCooldownCounter})`;
        if (evasionCooldownCounter <= 0) {
            evasionButton.disabled = false;
            evasionButton.textContent = "Evasion";
             logMessage("Evasion is ready!");
        }
    }

    // First Aid Cooldown
    if (firstAidCooldownCounter > 0) {
        firstAidCooldownCounter--;
        firstAidButton.textContent = `First Aid (${firstAidCooldownCounter})`;
        if (firstAidCooldownCounter <= 0) {
            firstAidButton.disabled = false;
            firstAidButton.textContent = "First Aid";
             logMessage("First Aid is ready!");
        }
    }
     console.log(`Cooldowns decremented. Evasion: ${evasionCooldownCounter}, First Aid: ${firstAidCooldownCounter}`);
}

// --- Status Effect Application ---
/** Applies damage from status effects like poison at the start of the player's action phase */
function applyPlayerStatusEffects() {
    if (player.poisonTurnsLeft > 0) {
        const poisonDamage = HORNET_VENOM_DAMAGE;
        player.hp = Number(player.hp) - poisonDamage;
        player.poisonTurnsLeft--;
        logMessage(`<span style="color:purple;">You take ${poisonDamage} damage from venom! (${player.poisonTurnsLeft} turns left)</span>`);
        console.log(`Venom damage applied. Turns left: ${player.poisonTurnsLeft}`);
        updatePlayerStatDisplay();

        // Check for defeat from poison
        if (player.hp <= 0) {
            player.hp = 0;
            playerHpElement.textContent = player.hp;
            logMessage("You succumbed to the venom! <span style='color: red; font-weight: bold;'>GAME OVER.</span>");
            if (player.level > highScore) {
                 logMessage(`New highest level: ${player.level}!`);
                 highScore = player.level;
                 saveHighScore();
                 updateHighScoreDisplay();
             }
            attackButton.disabled = true;
            evasionButton.disabled = true;
            firstAidButton.disabled = true;
            console.log("Player defeated by venom.");
            return false; // Indicate player was defeated
        }
    }
    return true; // Indicate player is still alive
}


// --- Enemy Turn Logic ---
/** Handles enemy action selection (special moves or normal attack) and execution */
function enemyTurn() {
    if (player.hp <= 0) return;
    if (!enemy || enemy.hp <= 0) return;

    console.log(`Enemy's turn: ${enemy.name} (HP: ${enemy.hp})`);
    let enemyActionTaken = false;

    // --- Enemy Special Move Checks ---
    if (enemy.name === "Hornet" && Math.random() < HORNET_VENOM_CHANCE) {
        player.poisonTurnsLeft = HORNET_VENOM_DURATION;
        logMessage(`<span style="color:purple;">The ${enemy.name} stings you with venom!</span>`);
        console.log(`Hornet applied Venom. Duration: ${player.poisonTurnsLeft}`);
        enemyActionTaken = true;
    } else if (enemy.name === "Kobold" && Math.random() < KOBOLD_EVASION_CHANCE && !enemy.evasionActive) {
        enemy.evasionActive = true;
        enemy.evasionDuration = KOBOLD_EVASION_DURATION;
        logMessage(`<span style="color:teal;">The ${enemy.name} becomes evasive!</span>`);
        console.log(`Kobold activated Evasion. Duration: ${enemy.evasionDuration}`);
        enemyActionTaken = true;
    } else if (enemy.name === "Wild Boar" && Math.random() < BOAR_CHARGE_CHANCE && !enemy.isCharging) {
        enemy.isCharging = true;
        logMessage(`<span style="color:red;">The ${enemy.name} lowers its head to charge!</span>`);
        console.log("Wild Boar is charging.");
    }

    // --- Normal Attack ---
    if (!enemyActionTaken) {
        console.log("Enemy performing normal attack.");
        const playerDodgeRoll = Math.random();
        const currentP_Dodge = Number(player.dodgeChance) || 0;
        if (playerDodgeRoll < currentP_Dodge) {
            logMessage(`<span style="color: cyan;">You dodged the ${enemy.name}'s attack!</span>`);
            console.log(`Player dodged! Roll: ${playerDodgeRoll.toFixed(2)}, Chance: ${currentP_Dodge.toFixed(2)}`);
        } else {
            // Damage Calculation
            const enemyMinDmg = Number(enemy.minDamage) || 1;
            const enemyMaxDmg = Number(enemy.maxDamage) || 2;
            const enemyStr = Number(enemy.str) || 0;
            const playerDef = Number(player.def) || 0;
            let rolledEnemyDamage = getRandomInt(enemyMinDmg, enemyMaxDmg);
            let potentialEnemyDamage = rolledEnemyDamage + enemyStr;

            if (enemy.isCharging) {
                potentialEnemyDamage = Math.floor(potentialEnemyDamage * (1 + BOAR_CHARGE_BONUS));
                logMessage(`<span style="color:red;">Charge Attack!</span>`);
                console.log(`Charge bonus applied. Potential damage before defense: ${potentialEnemyDamage}`);
                enemy.isCharging = false;
            }

            let finalEnemyDamage = Math.max(1, potentialEnemyDamage - playerDef);
            let damageTaken = finalEnemyDamage;

            player.hp = Number(player.hp) - damageTaken;
            player.hp = Math.max(0, player.hp);
            updatePlayerStatDisplay();
            console.log(`Enemy attacks. Player HP: ${player.hp}, Damage Taken: ${damageTaken}`);
            logMessage(`The ${enemy.name} attacks you for ${damageTaken} damage!`);

            // Check Player Defeat
            if (player.hp <= 0) {
                logMessage("You have been defeated! <span style='color: red; font-weight: bold;'>GAME OVER.</span>");
                 if (player.level > highScore) {
                     logMessage(`New highest level: ${player.level}!`);
                     highScore = player.level;
                     saveHighScore();
                     updateHighScoreDisplay();
                 }
                attackButton.disabled = true;
                evasionButton.disabled = true;
                firstAidButton.disabled = true;
                console.log("Player defeated by enemy attack. Combat ended.");
                return;
            }
        }
    }
    console.log("Enemy turn finished.");
}


/**
 * Centralized handler called after a successful player action (Attack, Evasion, First Aid).
 */
function handlePlayerActionTaken() {
    console.log("--- Handling Post-Player Action ---");
    const playerSurvivedStatus = applyPlayerStatusEffects();
    if (!playerSurvivedStatus) {
        console.log("Player action handling stopped: defeated by status effect.");
        return;
    }

    // Tick down Player Evasion
    if (player.evasionActive) {
        player.evasionDuration--;
        console.log(`Player Evasion duration remaining: ${player.evasionDuration}`);
        if (player.evasionDuration <= 0) {
            player.evasionActive = false;
            player.evasionDuration = 0;
            logMessage("Your Evasion effect wore off.");
            updatePlayerStatDisplay();
        }
    }

     // Tick down Enemy Evasion
    if (enemy.evasionActive) {
        enemy.evasionDuration--;
        console.log(`Enemy Evasion duration remaining: ${enemy.evasionDuration}`);
        if (enemy.evasionDuration <= 0) {
            enemy.evasionActive = false;
            enemy.evasionDuration = 0;
            logMessage(`The ${enemy.name} is no longer evasive.`);
        }
    }

    // Proceed to next phase
    if (player.hp > 0 && enemy && enemy.hp > 0) {
        console.log("Both player and enemy alive. Decrementing cooldowns and starting enemy turn.");
        decrementCooldowns();
        setTimeout(enemyTurn, 500); // Delay enemy turn slightly
    } else if (player.hp > 0 && (!enemy || enemy.hp <= 0)) {
        console.log("Player alive, enemy defeated/invalid. Only decrementing cooldowns.");
        decrementCooldowns();
    } else {
        console.log("Player action handling stopped: player defeated.");
    }
}


/**
 * Handles the Attack button click.
 */
function handleAttackButtonClick() {
    console.log("--- Attack button clicked! ---");
    if (!enemy || enemy.hp <= 0) {
        console.log("Attack ignored: No valid enemy or enemy already defeated.");
        return;
    }

    // Check Enemy Evasion
    if (enemy.evasionActive) {
        logMessage(`<span style="color:teal;">Your attack misses the evasive ${enemy.name}!</span>`);
        console.log("Player attack missed due to enemy Evasion.");
        handlePlayerActionTaken();
        return;
    }

    // Check Enemy Dodge
    const enemyDodgeRoll = Math.random();
    const currentE_Dodge = Number(enemy.dodgeChance) || 0;
    if (enemyDodgeRoll < currentE_Dodge) {
        logMessage(`<span style="color: orange;">The ${enemy.name} dodged your attack!</span>`);
        console.log(`Enemy dodged! Roll: ${enemyDodgeRoll.toFixed(2)}, Chance: ${currentE_Dodge.toFixed(2)}`);
        handlePlayerActionTaken();
        return;
    }

    // Damage Calculation
    const playerMinDmg = Number(player.minDamage) || 1;
    const playerMaxDmg = Number(player.maxDamage) || 2;
    const playerStr = Number(player.str) || 0;
    const enemyDef = Number(enemy.def) || 0;
    let rolledPlayerDamage = getRandomInt(playerMinDmg, playerMaxDmg);
    let potentialPlayerDamage = rolledPlayerDamage + playerStr;
    let finalPlayerDamage = Math.max(1, potentialPlayerDamage - enemyDef);

    // Apply Damage
    enemy.hp = Number(enemy.hp) - finalPlayerDamage;
    enemy.hp = Math.max(0, enemy.hp);
    console.log(`Enemy HP after attack: ${enemy.hp}, Damage Dealt: ${finalPlayerDamage}`);
    enemyHpElement.textContent = enemy.hp;
    logMessage(`You attacked the ${enemy.name} for ${finalPlayerDamage} damage!`);

    // Check Enemy Defeat
    if (enemy.hp <= 0) {
        logMessage(`You defeated the ${enemy.name}!`);
        const xpGained = Number(enemy.xpValue) || 0;
        player.xp += xpGained;
        logMessage(`Gained ${xpGained} XP!`);
        updatePlayerStatDisplay();
        checkLevelUp();

        console.log("Enemy defeated. Spawning next random enemy soon...");
        setTimeout(spawnEnemy, 1000); // Delay before next spawn

        decrementCooldowns(); // Decrement cooldowns after win
        return; // End turn
    }

    // If enemy survived
    handlePlayerActionTaken();
}


/**
 * Handles the Evasion button click.
 */
function handleEvasionClick() {
    console.log("--- Evasion button clicked! ---");
    if (evasionCooldownCounter > 0 || player.evasionActive) {
        console.log("Evasion ignored: On cooldown or already active.");
        logMessage("Evasion is not ready yet or already active.");
        return;
    }

    player.evasionActive = true;
    player.evasionDuration = EVASION_DURATION;
    evasionCooldownCounter = EVASION_COOLDOWN;

    evasionButton.disabled = true;
    evasionButton.textContent = `Evasion (${evasionCooldownCounter})`;

    logMessage("<span style='color: cyan;'>You focus, becoming more evasive!</span>");
    console.log(`Evasion activated. Duration: ${player.evasionDuration}, Cooldown: ${evasionCooldownCounter}`);
    updatePlayerStatDisplay();

    handlePlayerActionTaken();
}


/**
 * Handles the First Aid button click.
 */
function handleFirstAidClick() {
    console.log("--- First Aid button clicked! ---");
    if (firstAidCooldownCounter > 0) {
        console.log("First Aid ignored: On cooldown.");
        logMessage("First Aid is not ready yet.");
        return;
    }
    if (player.hp >= player.maxHp) {
        console.log("First Aid ignored: Player already at full HP.");
        logMessage("You are already at full health.");
        return;
    }

    // Use the constant for heal percent
    const healAmount = Math.floor(Number(player.maxHp) * FIRST_AID_HEAL_PERCENT);
    const oldHp = player.hp;
    player.hp = Math.min(Number(player.hp) + healAmount, Number(player.maxHp));
    const actualHeal = player.hp - oldHp;

    firstAidCooldownCounter = FIRST_AID_COOLDOWN;

    firstAidButton.disabled = true;
    firstAidButton.textContent = `First Aid (${firstAidCooldownCounter})`;

    logMessage(`<span style='color: lightgreen;'>You used First Aid and recovered ${actualHeal} HP!</span>`);
    console.log(`First Aid used. Healed: ${actualHeal} (Used ${FIRST_AID_HEAL_PERCENT*100}%), Cooldown: ${firstAidCooldownCounter}`);
    updatePlayerStatDisplay();

    handlePlayerActionTaken();
}


/**
 * Resets the game state to initial values.
 */
function resetGame() {
    console.log("--- Resetting game... ---");
    player = { ...INITIAL_PLAYER_STATE };

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
    player.evasionActive = false;
    player.evasionDuration = 0;
    player.poisonTurnsLeft = 0;

    updatePlayerStatDisplay();

    // Clear message log
    const messageContainer = document.getElementById('message');
    if (messageContainer) {
        messageContainer.innerHTML = '';
    }
    logMessage(`Game Reset. Prepare for battle!`);

    // Reset cooldowns and buttons
    firstAidCooldownCounter = 0;
    firstAidButton.disabled = false;
    firstAidButton.textContent = "First Aid";
    evasionCooldownCounter = 0;
    evasionButton.disabled = false;
    evasionButton.textContent = "Evasion";

    loadHighScore();
    updateHighScoreDisplay();

    spawnEnemy(); // Spawn first enemy

    attackButton.disabled = false;
    console.log("--- Game Reset Complete. ---");
}

/**
 * Handles changes to the character selection radio buttons.
 * @param {Event} event - The change event object.
 */
function handlePlayerChoiceChange(event) {
    const selectedValue = event.target.value;
    console.log("Character selected:", selectedValue);
    if (selectedValue) {
        playerImageElement.src = selectedValue;
    }
}

// --- High Score Functions ---

/** Loads the high score from localStorage. */
function loadHighScore() {
    const savedScore = localStorage.getItem('aincradHighScore');
    highScore = parseInt(savedScore, 10) || 0;
    console.log("High score loaded:", highScore);
}

/** Saves the current high score to localStorage. */
function saveHighScore() {
    localStorage.setItem('aincradHighScore', highScore.toString());
    console.log("High score saved:", highScore);
}

/** Updates the high score display on the page. */
function updateHighScoreDisplay() {
    highScoreValueElement.textContent = highScore;
}

/** Resets the high score. */
function resetHighScore() {
    console.log("Resetting high score...");
    highScore = 0;
    saveHighScore();
    updateHighScoreDisplay();
    logMessage("Highest level record has been reset.");
}

// --- Level Up Logic ---

/** Handles the actual stat increases and display updates for a level up. */
function levelUp() {
    player.level++;
    logMessage(`<span style="color: yellow; font-weight: bold;">Level Up! Reached Level ${player.level}!</span>`);

    // Stat increases
    player.maxHp += 10;
    player.hp = player.maxHp; // Full heal
    player.str += 1;
    player.def += 1;
    player.minDamage += 1;
    player.maxDamage += 1;

    // XP requirement increase
    player.xpToNextLevel = Math.floor(player.xpToNextLevel * 1.5);

    // Update high score if needed
    if (player.level > highScore) {
        logMessage(`New highest level: ${player.level}!`);
        highScore = player.level;
        saveHighScore();
        updateHighScoreDisplay();
    }

    updatePlayerStatDisplay(); // Update display after changes
    console.log(`Leveled up to ${player.level}. New Stats: MaxHP=${player.maxHp}, STR=${player.str}, DEF=${player.def}, XP_Needed=${player.xpToNextLevel}`);
}

/** Checks if player XP is sufficient to level up. */
function checkLevelUp() {
    while (player.xp >= player.xpToNextLevel) {
        player.xp -= player.xpToNextLevel;
        levelUp();
    }
}


// --- Event Listeners ---
attackButton.addEventListener('click', handleAttackButtonClick);
evasionButton.addEventListener('click', handleEvasionClick);
firstAidButton.addEventListener('click', handleFirstAidClick);
resetButton.addEventListener('click', resetGame);
resetHighScoreButton.addEventListener('click', resetHighScore);

playerChoiceRadios.forEach(radio => {
    radio.addEventListener('change', handlePlayerChoiceChange);
});

// --- Initial Setup ---
console.log("Game script loaded!");
console.log("Character choice listeners attached!");
resetGame(); // Initialize the game on load
