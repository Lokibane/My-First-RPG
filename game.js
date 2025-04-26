// --- DOM Elements ---
const attackButton = document.getElementById('attack-button');
const defendButton = document.getElementById('defend-button');
const resetButton = document.getElementById('reset-button');
const firstAidButton = document.getElementById('first-aid-button');
const messageElement = document.getElementById('message'); // The <p> tag for messages
const playerHpElement = document.getElementById('player-hp');
const enemyHpElement = document.getElementById('enemy-hp');
const playerStrElement = document.getElementById('player-str');
const playerDefElement = document.getElementById('player-def');
const enemyStrElement = document.getElementById('enemy-str');
const enemyDefElement = document.getElementById('enemy-def');
const playerImageElement = document.getElementById('player-image');
const playerChoiceRadios = document.querySelectorAll('input[name="playerChoice"]');
const playerLevelElement = document.getElementById('player-level');
const playerMaxHpElement = document.getElementById('player-max-hp');
const playerXpElement = document.getElementById('player-xp');
const playerXpNeededElement = document.getElementById('player-xp-needed');
const enemyNameElement = document.getElementById('enemy-name');
const enemyImageElement = document.getElementById('enemy-image');
const messageLogElement = document.getElementById('message-log'); // The <div> containing the message <p>
const highScoreValueElement = document.getElementById('high-score-value');



// --- Game State ---
const INITIAL_PLAYER_STATE = {
    hp: 100,
    maxHp: 100,
    str: 5,
    def: 3,
    minDamage: 7,
    maxDamage: 12,
    isDefending: false,
    level: 1,
    xp: 0,
    xpToNextLevel: 100
};

const enemyCatalog = [
    { name: "Wild Boar", hp: 100, str: 4, def: 2, minDamage: 7, maxDamage: 12, xpValue: 75, imageSrc: "Images/boar.jpg" },
    { name: "Goblin Scout", hp: 80, str: 6, def: 1, minDamage: 5, maxDamage: 10, xpValue: 60, imageSrc: "Images/goblin.jpg" },
    { name: "Orc Grunt", hp: 150, str: 8, def: 4, minDamage: 10, maxDamage: 15, xpValue: 120, imageSrc: "Images/orc.jpg" }
];

const FIRST_AID_COOLDOWN = 4;

let currentEnemyIndex = 0;
let player = { ...INITIAL_PLAYER_STATE };
let enemy = {};
let highScore = 0;
let firstAidCooldownCounter = 0;

// --- Helper Functions ---
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updatePlayerStatDisplay() {
    playerHpElement.textContent = player.hp;
    playerMaxHpElement.textContent = player.maxHp;
    playerStrElement.textContent = player.str;
    playerDefElement.textContent = player.def;
    playerLevelElement.textContent = player.level;
    playerXpElement.textContent = player.xp;
    playerXpNeededElement.textContent = player.xpToNextLevel;
}

// --- Logging Helper Function --- MODIFIED ---
function logMessage(newMessage) {
    // Prepend the new message (add to the beginning)
    messageElement.innerHTML = newMessage + "<br>" + messageElement.innerHTML;

    // No need to scroll to bottom anymore
    // messageLogElement.scrollTop = messageLogElement.scrollHeight;

    console.log("Logged:", newMessage);
}

// --- Spawn Enemy Logic (Sequential) ---
function spawnEnemy(index) {
    if (index < enemyCatalog.length) {
        console.log(`Spawning enemy index ${index}: ${enemyCatalog[index].name}`);
        currentEnemyIndex = index;
        enemy = { ...enemyCatalog[index] };

        enemy.hp = Number(enemy.hp);
        enemy.str = Number(enemy.str);
        enemy.def = Number(enemy.def);
        enemy.minDamage = Number(enemy.minDamage);
        enemy.maxDamage = Number(enemy.maxDamage);
        enemy.xpValue = Number(enemy.xpValue);

        enemyNameElement.textContent = enemy.name;
        enemyHpElement.textContent = enemy.hp;
        enemyStrElement.textContent = enemy.str;
        enemyDefElement.textContent = enemy.def;
        enemyImageElement.src = enemy.imageSrc;
        enemyImageElement.alt = enemy.name + " Character";

        logMessage(`A wild ${enemy.name} appears!`);
        attackButton.disabled = false;
        defendButton.disabled = false;
        firstAidButton.disabled = firstAidCooldownCounter > 0;

        return true;
    } else {
        console.log("No more enemies in the catalog!");
        logMessage('<strong style="color: lightgreen;">You defeated all enemies! YOU WIN!</strong>');
        attackButton.disabled = true;
        defendButton.disabled = true;
        firstAidButton.disabled = true;
        return false;
    }
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

// --- Enemy Turn Logic ---
function enemyTurn() {
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

    console.log("Enemy's turn:");
    let rolledEnemyDamage = getRandomInt(enemy.minDamage, enemy.maxDamage);
    let potentialEnemyDamage = rolledEnemyDamage + Number(enemy.str);
    let finalEnemyDamage = Math.max(1, potentialEnemyDamage - Number(player.def));
    console.log(`Enemy attack roll: ${rolledEnemyDamage}, +STR: ${enemy.str}, vs DEF: ${player.def} -> Final Base: ${finalEnemyDamage}`);

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
}


// --- Player Action Handler ---
function handlePlayerActionTaken() {
    if (player.hp > 0 && enemy.hp > 0) {
        decrementCooldowns();
        enemyTurn();
    } else if (player.hp > 0 && enemy.hp <= 0) {
        decrementCooldowns();
    }
}


// --- Game Logic Handler for ATTACK button ---
function handleAttackButtonClick() {
    console.log("--- Attack button clicked! ---");
    player.isDefending = false;

    let rolledPlayerDamage = getRandomInt(player.minDamage, player.maxDamage);
    let potentialPlayerDamage = rolledPlayerDamage + Number(player.str);
    let finalPlayerDamage = Math.max(1, potentialPlayerDamage - Number(enemy.def));
    console.log(`Player attack roll: ${rolledPlayerDamage}, +STR: ${player.str}, vs DEF: ${enemy.def} -> Final: ${finalPlayerDamage}`);

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
        updatePlayerStatDisplay();
        checkLevelUp();

        const nextEnemyIndex = currentEnemyIndex + 1;
        spawnEnemy(nextEnemyIndex);

        decrementCooldowns(); // Still decrement cooldowns on win/enemy defeat
        return;

    }

    handlePlayerActionTaken();
}

// --- Game Logic Handler for DEFEND button ---
function handleDefendButtonClick() {
    console.log("--- Defend button clicked! ---");
    player.isDefending = true;
    logMessage(`You brace yourself, preparing to defend!`);
    handlePlayerActionTaken();
}

// --- Game Logic Handler for FIRST AID button ---
function handleFirstAidClick() {
    console.log("--- First Aid button clicked! ---");

    if (firstAidCooldownCounter <= 0) {
        const healAmount = Math.floor(Number(player.maxHp) * 0.25);
        const oldHp = Number(player.hp);
        player.hp = Math.min(Number(player.maxHp), oldHp + healAmount);
        updatePlayerStatDisplay();
        const actualHealed = player.hp - oldHp;
        logMessage(`<span style="color: lightgreen;">Used First Aid! Healed for ${actualHealed} HP.</span>`);

        firstAidCooldownCounter = FIRST_AID_COOLDOWN;
        firstAidButton.disabled = true;
        firstAidButton.textContent = `First Aid (${firstAidCooldownCounter})`;

        handlePlayerActionTaken();

    } else {
        logMessage(`First Aid is not ready yet! (Cooldown: ${firstAidCooldownCounter})`);
    }
}


// --- Reset Game Logic ---
function resetGame() {
    console.log("Resetting game...");
    player = { ...INITIAL_PLAYER_STATE };
    player.hp = Number(player.hp);
    player.maxHp = Number(player.maxHp);
    player.str = Number(player.str);
    player.def = Number(player.def);
    player.minDamage = Number(player.minDamage);
    player.maxDamage = Number(player.maxDamage);
    player.level = Number(player.level);
    player.xp = Number(player.xp);
    player.xpToNextLevel = Number(player.xpToNextLevel);

    updatePlayerStatDisplay();
    messageElement.innerHTML = ''; // Clear message paragraph
    logMessage(`Game Reset. Prepare for battle!`); // Add initial message (will now be at top)

    firstAidCooldownCounter = 0;
    firstAidButton.disabled = false;
    firstAidButton.textContent = "First Aid";

    spawnEnemy(0);

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
function loadHighScore() {
    const storedScore = localStorage.getItem('rpgHighScore');
    highScore = parseInt(storedScore, 10) || 0;
    console.log(`Loaded High Score: ${highScore}`);
}
function saveHighScore() {
    localStorage.setItem('rpgHighScore', highScore.toString());
    console.log(`Saved High Score: ${highScore}`);
}
function updateHighScoreDisplay() {
    highScoreValueElement.textContent = highScore;
}

// --- Level Up Logic ---
function levelUp() {
    player.level++;
    console.log(`%cLEVEL UP! Reached Level ${player.level}`, "color: yellow; font-weight: bold;");

    if (player.level > highScore) { /* High score update */ }

    const strGain = getRandomInt(1, 4);
    const defGain = getRandomInt(1, 2);
    const maxHpGain = 10 + getRandomInt(0, player.level * 2);

    player.maxHp += maxHpGain;
    player.str += strGain;
    player.def += defGain;
    player.hp = player.maxHp;

    player.xpToNextLevel = Math.floor(Number(player.xpToNextLevel) * 1.5);

    console.log(`Stats Increased! STR+${strGain}, DEF+${defGain}, MaxHP+${maxHpGain}`);
    console.log(`Next level at ${player.xpToNextLevel} XP.`);

    updatePlayerStatDisplay();

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
    if (!leveledUp) {
         updatePlayerStatDisplay();
    }
}


// --- Event Listeners ---
attackButton.addEventListener('click', handleAttackButtonClick);
defendButton.addEventListener('click', handleDefendButtonClick);
firstAidButton.addEventListener('click', handleFirstAidClick);
resetButton.addEventListener('click', resetGame);
playerChoiceRadios.forEach(radio => {
    radio.addEventListener('change', handlePlayerChoiceChange);
});

// --- Initial Setup ---
console.log("Game script loaded!");
loadHighScore();
updateHighScoreDisplay();
console.log("Character choice listeners attached!");
resetGame(); // Start the game
