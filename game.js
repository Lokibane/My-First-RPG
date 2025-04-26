// --- DOM Elements ---
const horizontalButton = document.getElementById('horizontal-button'); // Renamed
const evasionButton = document.getElementById('evasion-button');
const resetButton = document.getElementById('reset-button');
const firstAidButton = document.getElementById('first-aid-button');
// New Skill Buttons
const horizontalArcButton = document.getElementById('horizontal-arc-button');
const horizontalSquareButton = document.getElementById('horizontal-square-button');
const deadlySinsButton = document.getElementById('deadly-sins-button');
// Other Elements
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
const enemyMaxHpElement = document.getElementById('enemy-max-hp');


// --- Game State & Configuration ---
// General Config
const MESSAGE_LIMIT = 10;
// Player Base Stats & Scaling
const BASE_DODGE_CHANCE = 0.05;
const DODGE_PER_LEVEL = 0.005;
const MAX_DODGE_CHANCE = 0.50;
// Player Utility Skills
const EVASION_DODGE_BONUS = 0.30;
const EVASION_DURATION = 3;
const EVASION_COOLDOWN = 6;
const EVASION_MAX_CAP = 0.85;
const FIRST_AID_HEAL_PERCENT = 0.25;
const FIRST_AID_COOLDOWN = 4;
// Player Offensive Skills
const MULTI_HIT_DAMAGE_MULTIPLIER = 0.90; // 90% base damage per hit
// Horizontal Arc
const HORIZONTAL_ARC_LEVEL = 4;
const HORIZONTAL_ARC_HITS = 2;
const HORIZONTAL_ARC_COOLDOWN = 2;
// Horizontal Square
const HORIZONTAL_SQUARE_LEVEL = 8;
const HORIZONTAL_SQUARE_HITS = 4;
const HORIZONTAL_SQUARE_COOLDOWN = 3;
// Deadly Sins
const DEADLY_SINS_LEVEL = 12;
const DEADLY_SINS_HITS = 7;
const DEADLY_SINS_COOLDOWN = 12;
// Vorpal Strike (Deferred - Curved Blade)
const VORPAL_STRIKE_LEVEL = 16;
const VORPAL_STRIKE_COOLDOWN = 12;
const VORPAL_STRIKE_STUN_DURATION = 2;
const VORPAL_STRIKE_BLEED_PERCENT = 0.08;

// Enemy Scaling
const ENEMY_HP_SCALE_PER_LEVEL = 0.15;
const ENEMY_STR_SCALE_PER_LEVEL = 1;
const ENEMY_DEF_SCALE_PER_LEVEL = 0.5;
const ENEMY_XP_SCALE_PER_LEVEL = 0.1;
// Enemy Skills & Status Effects
const HORNET_VENOM_CHANCE = 0.25;
const HORNET_VENOM_DAMAGE = 5;
const HORNET_VENOM_DURATION = 2;
const KOBOLD_EVASION_CHANCE = 0.15;
const KOBOLD_EVASION_DURATION = 1;
const BOAR_CHARGE_CHANCE = 0.20;
const BOAR_CHARGE_BONUS = 0.25;
const CHAMPION_MIN_LEVEL = 6;
const CHAMPION_SPAWN_CHANCE = 0.10;
const BLEED_DURATION = 3;
const BLEED_DAMAGE_PERCENT = 0.03; // Enemy bleed %
const STUN_DURATION = 1; // Enemy stun duration
const GOD_CHARGE_CHANCE = 0.15;
const GOD_CHARGE_BONUS = 0.40;
const GOD_GORE_CHANCE = 0.25;
const ALPHA_POUNCE_CHANCE = 0.15;
const ALPHA_REND_CHANCE = 0.25;
const ALPHA_DIRE_WOLF_DODGE_BONUS = 0.02;

// Initial Player State
const INITIAL_PLAYER_STATE = {
    hp: 100, maxHp: 100, str: 5, def: 4,
    dodgeChance: BASE_DODGE_CHANCE, evasionActive: false, evasionDuration: 0,
    poisonTurnsLeft: 0, bleedTurnsLeft: 0, bleedDamagePerTurn: 0, stunTurnsLeft: 0,
    minDamage: 7, maxDamage: 12, level: 1, xp: 0, xpToNextLevel: 100
};

// Enemy Base Stats
const GOBLIN_BASE_DODGE = 0.08;
const KOBOLD_BASE_DODGE = 0.06;
const HORNET_BASE_DODGE = 0.12;
const SLIME_BASE_DODGE = 0.03;

// Enemy Catalog
const enemyCatalog = [
    // Low Tier
    { name: "Slime",            tier: "low", hp: 60,  str: 2, def: 4, dodgeChance: SLIME_BASE_DODGE,  minDamage: 3,  maxDamage: 6,  xpValue: 40,  imageSrc: "Images/slime.jpg" },
    { name: "Kobold",           tier: "low", hp: 75,  str: 2, def: 2, dodgeChance: KOBOLD_BASE_DODGE, minDamage: 6,  maxDamage: 9,  xpValue: 50,  imageSrc: "Images/kobold.png" },
    { name: "Goblin Scout",     tier: "low", hp: 80,  str: 4, def: 3, dodgeChance: GOBLIN_BASE_DODGE, minDamage: 5,  maxDamage: 10, xpValue: 65,  imageSrc: "Images/goblin.jpg" },
    { name: "Wild Boar",        tier: "low", hp: 90,  str: 4, def: 2, dodgeChance: BASE_DODGE_CHANCE, minDamage: 7,  maxDamage: 12, xpValue: 70,  imageSrc: "Images/boar.jpg" },
    // Mid Tier
    { name: "Hornet",           tier: "mid", hp: 85,  str: 6, def: 2, dodgeChance: HORNET_BASE_DODGE, minDamage: 5,  maxDamage: 9,  xpValue: 80,  imageSrc: "Images/hornet.jpg" },
    { name: "Little Nepenthes", tier: "mid", hp: 110, str: 5, def: 3, dodgeChance: BASE_DODGE_CHANCE, minDamage: 8,  maxDamage: 12, xpValue: 90,  imageSrc: "Images/Little_Nepenthes.jpg" },
    { name: "Orc Grunt",        tier: "mid", hp: 150, str: 6, def: 4, dodgeChance: BASE_DODGE_CHANCE, minDamage: 10, maxDamage: 15, xpValue: 120, imageSrc: "Images/orc.jpg" },
    // Champion Tier
    { name: "Boar God",         tier: "champion", hp: 250, str: 10, def: 6, dodgeChance: BASE_DODGE_CHANCE, minDamage: 15, maxDamage: 22, xpValue: 400, imageSrc: "Images/boargod.jpg" },
    { name: "Alpha Dire Wolf",  tier: "champion", hp: 220, str: 8,  def: 5, dodgeChance: BASE_DODGE_CHANCE + ALPHA_DIRE_WOLF_DODGE_BONUS, minDamage: 12, maxDamage: 18, xpValue: 380, imageSrc: "Images/alphadirewolf.jpg" }
];


// --- Live Game Variables ---
let player = { ...INITIAL_PLAYER_STATE };
let enemy = { /* Populated by spawnEnemy */ };
let highScore = 0;
// Cooldown Counters
let firstAidCooldownCounter = 0;
let evasionCooldownCounter = 0;
let horizontalArcCooldownCounter = 0;
let horizontalSquareCooldownCounter = 0;
let deadlySinsCooldownCounter = 0;

// --- Helper Functions ---

/** Generates a random integer between min (inclusive) and max (inclusive). */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Calculates the player's current dodge chance based on level and Evasion status. */
function calculatePlayerDodgeChance() {
    let currentDodge = BASE_DODGE_CHANCE + (DODGE_PER_LEVEL * (player.level - 1));
    currentDodge = Math.min(currentDodge, MAX_DODGE_CHANCE);
    if (player.evasionActive) {
        currentDodge += EVASION_DODGE_BONUS;
        currentDodge = Math.min(currentDodge, EVASION_MAX_CAP);
    }
    return currentDodge;
}

/** Updates the player's stats displayed on the HTML page. */
function updatePlayerStatDisplay() {
    playerHpElement.textContent = player.hp;
    playerMaxHpElement.textContent = player.maxHp;
    playerStrElement.textContent = player.str;
    playerDefElement.textContent = player.def;
    playerLevelElement.textContent = player.level;
    playerXpElement.textContent = player.xp;
    playerXpNeededElement.textContent = player.xpToNextLevel;
    player.dodgeChance = calculatePlayerDodgeChance();
    playerDodgeElement.textContent = (player.dodgeChance * 100).toFixed(1);
    currentLevelValueElement.textContent = player.level;
    // Update skill button visibility/state based on level
    updateSkillButtons();
}

/** Adds a message to the message log display, handling scrolling and message limits. */
function logMessage(newMessage) {
    const messageContainer = document.getElementById('message');
    const wasScrolledToBottom = messageContainer.scrollHeight - messageContainer.clientHeight <= messageContainer.scrollTop + 1;
    const p = document.createElement('p');
    p.innerHTML = newMessage;
    messageContainer.appendChild(p);
    while (messageContainer.children.length > MESSAGE_LIMIT) {
        messageContainer.removeChild(messageContainer.firstChild);
    }
    if (wasScrolledToBottom) {
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }
}

/** Spawns an enemy, handling champion logic. */
function spawnEnemy() {
    let possibleEnemies = [];
    let spawnChampion = false;
    const playerLevelNum = Number(player.level) || 1;

    // Regular Champion Spawn Check
    if (playerLevelNum >= CHAMPION_MIN_LEVEL && Math.random() < CHAMPION_SPAWN_CHANCE) {
        const championEnemies = enemyCatalog.filter(e => e.tier === 'champion');
        if (championEnemies.length > 0) {
            possibleEnemies = championEnemies;
            spawnChampion = true;
            console.log(`Player level ${playerLevelNum} >= ${CHAMPION_MIN_LEVEL}, Champion spawn roll succeeded!`);
        } else {
            console.warn("Attempted Champion spawn roll, but none found. Spawning regular.");
        }
    }

    // Regular Enemy Selection
    if (!spawnChampion) {
        if (possibleEnemies.length === 0) {
             possibleEnemies = enemyCatalog.filter(e => e.tier !== 'champion');
        }
        if (possibleEnemies.length === 0) {
            console.error("ERROR: No regular enemies found!");
            logMessage("<span style='color: red;'>ERROR: Failed to find enemy!</span>");
            horizontalButton.disabled = true; evasionButton.disabled = true; firstAidButton.disabled = true;
            return;
        }
         console.log(`Player level ${playerLevelNum}. Spawning regular enemy.`);
    }

    // Select and Spawn
    const randomIndex = getRandomInt(0, possibleEnemies.length - 1);
    const baseEnemy = possibleEnemies[randomIndex];

    if (!baseEnemy) {
        console.error(`ERROR: Failed to get baseEnemy from list (index: ${randomIndex}).`);
        logMessage("<span style='color: red;'>ERROR: Problem selecting enemy data.</span>");
        return;
    }

    console.log(`Spawning base enemy: ${baseEnemy.name} (Tier: ${baseEnemy.tier})`);
    enemy = { ...baseEnemy }; // Create copy

    // Apply Scaling
    const playerLevelFactor = Math.max(0, playerLevelNum - 1);
    const baseHp = Number(baseEnemy.hp) || 50;
    const baseStr = Number(baseEnemy.str) || 1;
    const baseDef = Number(baseEnemy.def) || 0;
    const baseXp = Number(baseEnemy.xpValue) || 10;

    enemy.hp = Math.max(1, Math.floor(baseHp * (1 + (ENEMY_HP_SCALE_PER_LEVEL * playerLevelFactor))));
    enemy.maxHp = enemy.hp;
    enemy.str = Math.floor(baseStr + (ENEMY_STR_SCALE_PER_LEVEL * playerLevelFactor));
    enemy.def = Math.floor(baseDef + (ENEMY_DEF_SCALE_PER_LEVEL * playerLevelFactor));
    enemy.xpValue = Math.floor(baseXp * (1 + (ENEMY_XP_SCALE_PER_LEVEL * playerLevelFactor)));
    enemy.dodgeChance = Number(baseEnemy.dodgeChance) || BASE_DODGE_CHANCE;
    enemy.minDamage = Number(baseEnemy.minDamage) || 1;
    enemy.maxDamage = Number(baseEnemy.maxDamage) || 2;

    console.log(`Scaled Enemy Stats (Player Lvl ${playerLevelNum}): HP=${enemy.hp}/${enemy.maxHp}, STR=${enemy.str}, DEF=${enemy.def}, XP=${enemy.xpValue}`);

    // Reset States
    enemy.isCharging = false;
    enemy.isGodCharging = false;
    enemy.evasionActive = false;
    enemy.evasionDuration = 0;

    // Update Display
    enemyNameElement.textContent = enemy.name || "Unknown Enemy";
    enemyHpElement.textContent = enemy.hp;
    enemyMaxHpElement.textContent = enemy.maxHp;
    enemyStrElement.textContent = enemy.str;
    enemyDefElement.textContent = enemy.def;
    enemyDodgeElement.textContent = (enemy.dodgeChance * 100).toFixed(1);
    enemyImageElement.src = enemy.imageSrc || 'https://placehold.co/80x80/2c3e50/ecf0f1?text=Enemy';
    enemyImageElement.alt = (enemy.name || "Enemy") + " Character";

    // Announce Spawn
    if (enemy.tier === 'champion') {
         logMessage(`<span style='color: red; font-weight: bold;'>A powerful Level ${playerLevelNum} ${enemy.name} appears!</span>`);
    } else {
         logMessage(`A wild Level ${playerLevelNum} ${enemy.name} appears!`);
    }

    // Enable Buttons
    horizontalButton.disabled = false; // Enable basic attack
    updateSkillButtons(); // Enable skills based on level and cooldown
}

/** Decrements active cooldown counters for player skills each turn. */
function decrementCooldowns() {
    // Utility Skills
    if (evasionCooldownCounter > 0) {
        evasionCooldownCounter--;
        evasionButton.textContent = `Evasion (${evasionCooldownCounter})`;
        if (evasionCooldownCounter <= 0) {
            evasionButton.disabled = false;
            evasionButton.textContent = "Evasion";
             logMessage("Evasion is ready!");
        }
    }
    if (firstAidCooldownCounter > 0) {
        firstAidCooldownCounter--;
        firstAidButton.textContent = `First Aid (${firstAidCooldownCounter})`;
        if (firstAidCooldownCounter <= 0) {
            firstAidButton.disabled = false;
            firstAidButton.textContent = "First Aid";
             logMessage("First Aid is ready!");
        }
    }
    // Offensive Skills
    if (horizontalArcCooldownCounter > 0) {
        horizontalArcCooldownCounter--;
        horizontalArcButton.textContent = `H. Arc (${horizontalArcCooldownCounter})`;
        if (horizontalArcCooldownCounter <= 0) {
            horizontalArcButton.disabled = player.level < HORIZONTAL_ARC_LEVEL;
            horizontalArcButton.textContent = "Horizontal Arc";
            if (!horizontalArcButton.disabled) logMessage("Horizontal Arc is ready!");
        }
    }
     if (horizontalSquareCooldownCounter > 0) {
        horizontalSquareCooldownCounter--;
        horizontalSquareButton.textContent = `H. Square (${horizontalSquareCooldownCounter})`;
        if (horizontalSquareCooldownCounter <= 0) {
            horizontalSquareButton.disabled = player.level < HORIZONTAL_SQUARE_LEVEL;
            horizontalSquareButton.textContent = "Horizontal Square";
             if (!horizontalSquareButton.disabled) logMessage("Horizontal Square is ready!");
        }
    }
     if (deadlySinsCooldownCounter > 0) {
        deadlySinsCooldownCounter--;
        deadlySinsButton.textContent = `D. Sins (${deadlySinsCooldownCounter})`;
        if (deadlySinsCooldownCounter <= 0) {
            deadlySinsButton.disabled = player.level < DEADLY_SINS_LEVEL;
            deadlySinsButton.textContent = "Deadly Sins";
             if (!deadlySinsButton.disabled) logMessage("Deadly Sins is ready!");
        }
    }

     console.log(`Cooldowns: Evasion=${evasionCooldownCounter}, FirstAid=${firstAidCooldownCounter}, H.Arc=${horizontalArcCooldownCounter}, H.Square=${horizontalSquareCooldownCounter}, D.Sins=${deadlySinsCooldownCounter}`);
}

/** Applies damage/effects from status effects like poison and bleed. */
function applyPlayerStatusEffects() {
    let stillAlive = true;
    // Poison
    if (player.poisonTurnsLeft > 0) {
        const poisonDamage = HORNET_VENOM_DAMAGE;
        player.hp = Math.max(0, Number(player.hp) - poisonDamage);
        player.poisonTurnsLeft--;
        logMessage(`<span style="color:purple;">You take ${poisonDamage} damage from venom! (${player.poisonTurnsLeft} turns left)</span>`);
        console.log(`Venom damage applied. Turns left: ${player.poisonTurnsLeft}`);
        updatePlayerStatDisplay();
        if (player.hp <= 0) {
            logMessage("You succumbed to the venom! <span style='color: red; font-weight: bold;'>GAME OVER.</span>");
            if (player.level > highScore) { /* High score check */ }
            horizontalButton.disabled = true; evasionButton.disabled = true; firstAidButton.disabled = true;
            console.log("Player defeated by venom.");
            stillAlive = false;
        }
    }
    // Bleed
    if (stillAlive && player.bleedTurnsLeft > 0) {
        const bleedDamage = player.bleedDamagePerTurn;
        player.hp = Math.max(0, Number(player.hp) - bleedDamage);
        player.bleedTurnsLeft--;
        logMessage(`<span style="color:red;">You bleed for ${bleedDamage} damage! (${player.bleedTurnsLeft} turns left)</span>`);
        console.log(`Bleed damage applied: ${bleedDamage}. Turns left: ${player.bleedTurnsLeft}`);
        updatePlayerStatDisplay();
        if (player.hp <= 0) {
            logMessage("You bled out! <span style='color: red; font-weight: bold;'>GAME OVER.</span>");
            if (player.level > highScore) { /* High score check */ }
            horizontalButton.disabled = true; evasionButton.disabled = true; firstAidButton.disabled = true;
            console.log("Player defeated by bleed.");
            stillAlive = false;
        }
         if (player.bleedTurnsLeft <= 0) {
             player.bleedDamagePerTurn = 0;
             logMessage("The bleeding stops.");
         }
    }
    return stillAlive;
}

/** Handles enemy action selection and execution. */
function enemyTurn() {
    if (player.hp <= 0) return;
    if (!enemy || enemy.hp <= 0) return;

    console.log(`Enemy's turn: ${enemy.name} (Tier: ${enemy.tier}, HP: ${enemy.hp}/${enemy.maxHp})`);
    let enemyActionTaken = false;   // Skill replaces attack
    let usedModifyingSkill = false; // Skill modifies attack (Charge)

    // Champion Skills
    if (enemy.tier === 'champion') {
        if (enemy.name === "Boar God") {
            if (player.bleedTurnsLeft <= 0 && Math.random() < GOD_GORE_CHANCE) {
                const bleedDamage = Math.max(1, Math.floor(player.maxHp * BLEED_DAMAGE_PERCENT));
                player.bleedTurnsLeft = BLEED_DURATION; player.bleedDamagePerTurn = bleedDamage;
                logMessage(`<span style='color:darkred; font-weight:bold;'>The ${enemy.name} uses God Gore! You are bleeding heavily!</span>`);
                console.log(`Boar God applied Bleed. Damage/Turn: ${bleedDamage}, Duration: ${player.bleedTurnsLeft}`);
                enemyActionTaken = true;
            } else if (Math.random() < GOD_CHARGE_CHANCE && !enemy.isGodCharging) {
                 enemy.isGodCharging = true;
                 logMessage(`<span style='color:darkred; font-weight:bold;'>The ${enemy.name} bellows and prepares a God Charge!</span>`);
                 console.log("Boar God is God Charging.");
                 usedModifyingSkill = true;
            }
        } else if (enemy.name === "Alpha Dire Wolf") {
             if (player.bleedTurnsLeft <= 0 && Math.random() < ALPHA_REND_CHANCE) {
                const bleedDamage = Math.max(1, Math.floor(player.maxHp * BLEED_DAMAGE_PERCENT));
                player.bleedTurnsLeft = BLEED_DURATION; player.bleedDamagePerTurn = bleedDamage;
                logMessage(`<span style='color:red; font-weight:bold;'>The ${enemy.name} uses Alpha Rend! You are bleeding!</span>`);
                console.log(`Alpha Dire Wolf applied Bleed. Damage/Turn: ${bleedDamage}, Duration: ${player.bleedTurnsLeft}`);
                enemyActionTaken = true;
             } else if (player.stunTurnsLeft <= 0 && Math.random() < ALPHA_POUNCE_CHANCE) {
                 player.stunTurnsLeft = STUN_DURATION;
                 logMessage(`<span style='color:orange; font-weight:bold;'>The ${enemy.name} uses Alpha Pounce! You are stunned!</span>`);
                 console.log(`Alpha Dire Wolf applied Stun. Duration: ${player.stunTurnsLeft}`);
                 enemyActionTaken = true;
             }
        }
    }

    // Regular Skills
    if (!enemyActionTaken && enemy.tier !== 'champion') {
        if (enemy.name === "Hornet" && player.poisonTurnsLeft <= 0 && Math.random() < HORNET_VENOM_CHANCE) {
            player.poisonTurnsLeft = HORNET_VENOM_DURATION;
            logMessage(`<span style="color:purple;">The ${enemy.name} stings you with venom!</span>`);
            console.log(`Hornet applied Venom. Duration: ${player.poisonTurnsLeft}`);
            enemyActionTaken = true;
        } else if (enemy.name === "Kobold" && Math.random() < KOBOLD_EVASION_CHANCE && !enemy.evasionActive) {
            enemy.evasionActive = true; enemy.evasionDuration = KOBOLD_EVASION_DURATION;
            logMessage(`<span style="color:teal;">The ${enemy.name} becomes evasive!</span>`);
            console.log(`Kobold activated Evasion. Duration: ${enemy.evasionDuration}`);
            enemyActionTaken = true;
        } else if (enemy.name === "Wild Boar" && Math.random() < BOAR_CHARGE_CHANCE && !enemy.isCharging) {
            enemy.isCharging = true;
            logMessage(`<span style="color:red;">The ${enemy.name} lowers its head to charge!</span>`);
            console.log("Wild Boar is charging.");
            usedModifyingSkill = true;
        }
    }

    // Normal Attack
    if (!enemyActionTaken) {
        console.log("Enemy performing normal attack.");
        const playerDodgeRoll = Math.random();
        const currentP_Dodge = Number(player.dodgeChance) || 0;
        if (playerDodgeRoll < currentP_Dodge) {
            logMessage(`<span style="color: cyan;">You dodged the ${enemy.name}'s attack!</span>`);
            console.log(`Player dodged! Roll: ${playerDodgeRoll.toFixed(2)}, Chance: ${currentP_Dodge.toFixed(2)}`);
            if (enemy.isCharging) { enemy.isCharging = false; console.log("Reset Boar Charge due to player dodge."); }
            if (enemy.isGodCharging) { enemy.isGodCharging = false; console.log("Reset God Charge due to player dodge."); }
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
                logMessage(`<span style='color:red;'>Charge Attack!</span>`);
                console.log(`Charge bonus applied. Potential damage: ${potentialEnemyDamage}`);
                enemy.isCharging = false;
            } else if (enemy.isGodCharging) {
                 potentialEnemyDamage = Math.floor(potentialEnemyDamage * (1 + GOD_CHARGE_BONUS));
                 logMessage(`<span style='color:darkred; font-weight:bold;'>God Charge Attack!</span>`);
                 console.log(`God Charge bonus applied. Potential damage: ${potentialEnemyDamage}`);
                 enemy.isGodCharging = false;
            }

            let finalEnemyDamage = Math.max(1, potentialEnemyDamage - playerDef);
            let damageTaken = finalEnemyDamage;

            player.hp = Math.max(0, Number(player.hp) - damageTaken);
            updatePlayerStatDisplay();
            console.log(`Enemy attacks. Player HP: ${player.hp}, Damage Taken: ${damageTaken}`);
            logMessage(`The ${enemy.name} attacks you for ${damageTaken} damage!`);

            // Check Player Defeat
            if (player.hp <= 0) {
                logMessage("You have been defeated! <span style='color: red; font-weight: bold;'>GAME OVER.</span>");
                 if (player.level > highScore) { /* High score check */ }
                horizontalButton.disabled = true; // Disable basic attack too
                updateSkillButtons(); // Disable all skills
                evasionButton.disabled = true; firstAidButton.disabled = true;
                console.log("Player defeated by enemy attack. Combat ended.");
                return;
            }
        }
    }
    console.log("Enemy turn finished.");
}

/** Centralized handler called after a successful *turn-consuming* player action. */
function handlePlayerActionTaken() {
    console.log("--- Handling Post-Player Action (Turn Consumed) ---");

    // Tick stun FIRST (determines if enemy gets to act)
    if (player.stunTurnsLeft > 0) {
        player.stunTurnsLeft--;
        console.log(`Player stun duration remaining: ${player.stunTurnsLeft}`);
        if (player.stunTurnsLeft <= 0) {
            logMessage("You are no longer stunned.");
        }
        // If stunned this turn, the enemy still gets their turn, but player action was skipped earlier
    }

    // Apply status effects (poison, bleed) - Check if player survives
    const playerSurvivedStatus = applyPlayerStatusEffects();
    if (!playerSurvivedStatus) {
        console.log("Player action handling stopped: defeated by status effect.");
        return; // Stop if player was defeated
    }

    // Tick Player Evasion duration if active
    if (player.evasionActive) {
        player.evasionDuration--;
        console.log(`Player Evasion duration remaining: ${player.evasionDuration}`);
        if (player.evasionDuration <= 0) {
            player.evasionActive = false; player.evasionDuration = 0;
            logMessage("Your Evasion effect wore off.");
            updatePlayerStatDisplay(); // Recalculate dodge display
        }
    }

     // Tick Enemy Evasion duration if active
    if (enemy.evasionActive) {
        enemy.evasionDuration--;
        console.log(`Enemy Evasion duration remaining: ${enemy.evasionDuration}`);
        if (enemy.evasionDuration <= 0) {
            enemy.evasionActive = false; enemy.evasionDuration = 0;
            logMessage(`The ${enemy.name} is no longer evasive.`);
        }
    }

    // Check game state before proceeding to enemy turn/cooldowns
    if (player.hp > 0 && enemy && enemy.hp > 0) { // If both are alive and enemy is valid
        console.log("Both player and enemy alive. Decrementing cooldowns and starting enemy turn.");
        decrementCooldowns(); // Decrement skill cooldowns
        setTimeout(enemyTurn, 500); // Delay enemy turn slightly for pacing
    } else if (player.hp > 0 && (!enemy || enemy.hp <= 0)) { // If player alive, enemy defeated or invalid
        console.log("Player alive, enemy defeated/invalid. Only decrementing cooldowns.");
        decrementCooldowns(); // Only decrement cooldowns, no enemy turn
    } else {
        console.log("Player action handling stopped: player defeated.");
    }
}

// --- Player Action Handlers ---

/** Handles the basic Horizontal attack click. Checks for stun first. */
function handleHorizontalClick() {
    if (player.stunTurnsLeft > 0) {
        logMessage("<span style='color:orange;'>You are stunned and cannot attack!</span>");
        console.log("Player attack blocked by stun.");
        handlePlayerActionTaken(); // Still process enemy turn etc.
        return;
    }

    console.log("--- Horizontal button clicked! ---");
    if (!enemy || enemy.hp <= 0) {
        console.log("Attack ignored: No valid enemy or enemy already defeated.");
        return;
    }

    // Check Enemy Evasion
    if (enemy.evasionActive) {
        logMessage(`<span style="color:teal;">Your attack misses the evasive ${enemy.name}!</span>`);
        console.log("Player attack missed due to enemy Evasion.");
        handlePlayerActionTaken(); // Consume turn even on miss
        return;
    }

    // Check Enemy Dodge
    const enemyDodgeRoll = Math.random();
    const currentE_Dodge = Number(enemy.dodgeChance) || 0;
    if (enemyDodgeRoll < currentE_Dodge) {
        logMessage(`<span style="color: orange;">The ${enemy.name} dodged your attack!</span>`);
        console.log(`Enemy dodged! Roll: ${enemyDodgeRoll.toFixed(2)}, Chance: ${currentE_Dodge.toFixed(2)}`);
        handlePlayerActionTaken(); // Consume turn even on miss
        return;
    }

    // Damage Calculation (Standard Attack)
    const playerMinDmg = Number(player.minDamage) || 1;
    const playerMaxDmg = Number(player.maxDamage) || 2;
    const playerStr = Number(player.str) || 0;
    const enemyDef = Number(enemy.def) || 0;
    let rolledPlayerDamage = getRandomInt(playerMinDmg, playerMaxDmg);
    let potentialPlayerDamage = rolledPlayerDamage + playerStr;
    let finalPlayerDamage = Math.max(1, potentialPlayerDamage - enemyDef);

    // Apply Damage
    enemy.hp = Math.max(0, Number(enemy.hp) - finalPlayerDamage);
    console.log(`Enemy HP after attack: ${enemy.hp}/${enemy.maxHp}, Damage Dealt: ${finalPlayerDamage}`);
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
        console.log("Enemy defeated. Spawning next enemy soon...");
        setTimeout(spawnEnemy, 1000);
        decrementCooldowns(); // Decrement cooldowns after win
        return; // End turn here
    }

    // If enemy survived
    handlePlayerActionTaken(); // Consume turn
}

/** Handles the Horizontal Arc skill click. */
function handleHorizontalArcClick() {
    if (player.stunTurnsLeft > 0) { logMessage("<span style='color:orange;'>Stunned! Cannot use Horizontal Arc!</span>"); handlePlayerActionTaken(); return; }
    if (player.level < HORIZONTAL_ARC_LEVEL) { logMessage("You haven't learned Horizontal Arc yet!"); return; }
    if (horizontalArcCooldownCounter > 0) { logMessage(`Horizontal Arc on cooldown (${horizontalArcCooldownCounter} turns).`); return; }
    if (!enemy || enemy.hp <= 0) { console.log("Skill ignored: No valid enemy."); return; }

    console.log("--- Horizontal Arc button clicked! ---");
    logMessage("You use <span style='color:lightblue;'>Horizontal Arc</span>!");
    let enemyDefeated = false;

    for (let i = 1; i <= HORIZONTAL_ARC_HITS; i++) {
        const enemyDodgeRoll = Math.random();
        const currentE_Dodge = Number(enemy.dodgeChance) || 0;
        if (enemy.evasionActive || enemyDodgeRoll < currentE_Dodge) {
            logMessage(`<span style="color: orange;">H. Arc hit ${i}/${HORIZONTAL_ARC_HITS} missed!</span>`);
            console.log(`H.Arc Hit ${i} missed. Evasion: ${enemy.evasionActive}, Roll: ${enemyDodgeRoll.toFixed(2)}, Chance: ${currentE_Dodge.toFixed(2)}`);
            continue;
        }
        const playerMinDmg = Number(player.minDamage) || 1;
        const playerMaxDmg = Number(player.maxDamage) || 2;
        const playerStr = Number(player.str) || 0;
        const enemyDef = Number(enemy.def) || 0;
        let baseDamageThisHit = getRandomInt(playerMinDmg, playerMaxDmg) * MULTI_HIT_DAMAGE_MULTIPLIER;
        let potentialDamage = baseDamageThisHit + playerStr;
        let finalDamage = Math.max(1, Math.floor(potentialDamage - enemyDef));
        enemy.hp = Math.max(0, Number(enemy.hp) - finalDamage);
        console.log(`H.Arc Hit ${i}/${HORIZONTAL_ARC_HITS}: Dealt ${finalDamage}. Enemy HP: ${enemy.hp}/${enemy.maxHp}`);
        enemyHpElement.textContent = enemy.hp;
        logMessage(`&nbsp;&nbsp;Hit ${i}/${HORIZONTAL_ARC_HITS} deals ${finalDamage} damage!`);
        if (enemy.hp <= 0) {
            logMessage(`You defeated the ${enemy.name} with Horizontal Arc!`);
            const xpGained = Number(enemy.xpValue) || 0;
            player.xp += xpGained; logMessage(`Gained ${xpGained} XP!`);
            updatePlayerStatDisplay(); checkLevelUp();
            console.log("Enemy defeated by H.Arc. Spawning next...");
            setTimeout(spawnEnemy, 1000);
            enemyDefeated = true; break;
        }
    }
    horizontalArcCooldownCounter = HORIZONTAL_ARC_COOLDOWN;
    horizontalArcButton.disabled = true;
    horizontalArcButton.textContent = `H. Arc (${horizontalArcCooldownCounter})`;
    if (!enemyDefeated) { handlePlayerActionTaken(); } // Consume turn if enemy survived
    else { decrementCooldowns(); } // Only decrement cooldowns if enemy defeated
}

/** Handles the Horizontal Square skill click. */
function handleHorizontalSquareClick() {
    if (player.stunTurnsLeft > 0) { logMessage("<span style='color:orange;'>Stunned! Cannot use Horizontal Square!</span>"); handlePlayerActionTaken(); return; }
    if (player.level < HORIZONTAL_SQUARE_LEVEL) { logMessage("You haven't learned Horizontal Square yet!"); return; }
    if (horizontalSquareCooldownCounter > 0) { logMessage(`Horizontal Square on cooldown (${horizontalSquareCooldownCounter} turns).`); return; }
    if (!enemy || enemy.hp <= 0) { console.log("Skill ignored: No valid enemy."); return; }

    console.log("--- Horizontal Square button clicked! ---");
    logMessage("You use <span style='color:lightblue;'>Horizontal Square</span>!");
    let enemyDefeated = false;

    for (let i = 1; i <= HORIZONTAL_SQUARE_HITS; i++) {
        const enemyDodgeRoll = Math.random();
        const currentE_Dodge = Number(enemy.dodgeChance) || 0;
        if (enemy.evasionActive || enemyDodgeRoll < currentE_Dodge) {
            logMessage(`<span style="color: orange;">H. Square hit ${i}/${HORIZONTAL_SQUARE_HITS} missed!</span>`);
            console.log(`H.Square Hit ${i} missed. Evasion: ${enemy.evasionActive}, Roll: ${enemyDodgeRoll.toFixed(2)}, Chance: ${currentE_Dodge.toFixed(2)}`);
            continue;
        }
        const playerMinDmg = Number(player.minDamage) || 1;
        const playerMaxDmg = Number(player.maxDamage) || 2;
        const playerStr = Number(player.str) || 0;
        const enemyDef = Number(enemy.def) || 0;
        let baseDamageThisHit = getRandomInt(playerMinDmg, playerMaxDmg) * MULTI_HIT_DAMAGE_MULTIPLIER;
        let potentialDamage = baseDamageThisHit + playerStr;
        let finalDamage = Math.max(1, Math.floor(potentialDamage - enemyDef));
        enemy.hp = Math.max(0, Number(enemy.hp) - finalDamage);
        console.log(`H.Square Hit ${i}/${HORIZONTAL_SQUARE_HITS}: Dealt ${finalDamage}. Enemy HP: ${enemy.hp}/${enemy.maxHp}`);
        enemyHpElement.textContent = enemy.hp;
        logMessage(`&nbsp;&nbsp;Hit ${i}/${HORIZONTAL_SQUARE_HITS} deals ${finalDamage} damage!`);
        if (enemy.hp <= 0) {
            logMessage(`You defeated the ${enemy.name} with Horizontal Square!`);
            const xpGained = Number(enemy.xpValue) || 0;
            player.xp += xpGained; logMessage(`Gained ${xpGained} XP!`);
            updatePlayerStatDisplay(); checkLevelUp();
            console.log("Enemy defeated by H.Square. Spawning next...");
            setTimeout(spawnEnemy, 1000);
            enemyDefeated = true; break;
        }
    }
    horizontalSquareCooldownCounter = HORIZONTAL_SQUARE_COOLDOWN;
    horizontalSquareButton.disabled = true;
    horizontalSquareButton.textContent = `H. Square (${horizontalSquareCooldownCounter})`;
    if (!enemyDefeated) { handlePlayerActionTaken(); } // Consume turn
    else { decrementCooldowns(); }
}

/** Handles the Deadly Sins skill click. */
function handleDeadlySinsClick() {
    if (player.stunTurnsLeft > 0) { logMessage("<span style='color:orange;'>Stunned! Cannot use Deadly Sins!</span>"); handlePlayerActionTaken(); return; }
    if (player.level < DEADLY_SINS_LEVEL) { logMessage("You haven't learned Deadly Sins yet!"); return; }
    if (deadlySinsCooldownCounter > 0) { logMessage(`Deadly Sins on cooldown (${deadlySinsCooldownCounter} turns).`); return; }
    if (!enemy || enemy.hp <= 0) { console.log("Skill ignored: No valid enemy."); return; }

    console.log("--- Deadly Sins button clicked! ---");
    logMessage("You unleash <span style='color:violet; font-weight:bold;'>Deadly Sins</span>!");
    let enemyDefeated = false;

    for (let i = 1; i <= DEADLY_SINS_HITS; i++) {
        const enemyDodgeRoll = Math.random();
        const currentE_Dodge = Number(enemy.dodgeChance) || 0;
        if (enemy.evasionActive || enemyDodgeRoll < currentE_Dodge) {
            logMessage(`<span style="color: orange;">D. Sins hit ${i}/${DEADLY_SINS_HITS} missed!</span>`);
            console.log(`D.Sins Hit ${i} missed. Evasion: ${enemy.evasionActive}, Roll: ${enemyDodgeRoll.toFixed(2)}, Chance: ${currentE_Dodge.toFixed(2)}`);
            continue;
        }
        const playerMinDmg = Number(player.minDamage) || 1;
        const playerMaxDmg = Number(player.maxDamage) || 2;
        const playerStr = Number(player.str) || 0;
        const enemyDef = Number(enemy.def) || 0;
        let baseDamageThisHit = getRandomInt(playerMinDmg, playerMaxDmg) * MULTI_HIT_DAMAGE_MULTIPLIER;
        let potentialDamage = baseDamageThisHit + playerStr;
        let finalDamage = Math.max(1, Math.floor(potentialDamage - enemyDef));
        enemy.hp = Math.max(0, Number(enemy.hp) - finalDamage);
        console.log(`D.Sins Hit ${i}/${DEADLY_SINS_HITS}: Dealt ${finalDamage}. Enemy HP: ${enemy.hp}/${enemy.maxHp}`);
        enemyHpElement.textContent = enemy.hp;
        logMessage(`&nbsp;&nbsp;Hit ${i}/${DEADLY_SINS_HITS} deals ${finalDamage} damage!`);
        if (enemy.hp <= 0) {
            logMessage(`You defeated the ${enemy.name} with Deadly Sins!`);
            const xpGained = Number(enemy.xpValue) || 0;
            player.xp += xpGained; logMessage(`Gained ${xpGained} XP!`);
            updatePlayerStatDisplay(); checkLevelUp();
            console.log("Enemy defeated by D.Sins. Spawning next...");
            setTimeout(spawnEnemy, 1000);
            enemyDefeated = true; break;
        }
    }
    deadlySinsCooldownCounter = DEADLY_SINS_COOLDOWN;
    deadlySinsButton.disabled = true;
    deadlySinsButton.textContent = `D. Sins (${deadlySinsCooldownCounter})`;
    if (!enemyDefeated) { handlePlayerActionTaken(); } // Consume turn
    else { decrementCooldowns(); }
}

/** Handles the Evasion button click. Instant Use. */
function handleEvasionClick() {
    // Stun Check (still applies)
    if (player.stunTurnsLeft > 0) {
        logMessage("<span style='color:orange;'>You are stunned and cannot use Evasion!</span>");
        // Note: We don't call handlePlayerActionTaken here if stunned, as Evasion is instant
        return;
    }
    console.log("--- Evasion button clicked! (Instant) ---");
    if (evasionCooldownCounter > 0 || player.evasionActive) {
        console.log("Evasion ignored: On cooldown or already active.");
        logMessage("Evasion is not ready yet or already active."); return;
    }
    player.evasionActive = true;
    player.evasionDuration = EVASION_DURATION;
    evasionCooldownCounter = EVASION_COOLDOWN;
    evasionButton.disabled = true;
    evasionButton.textContent = `Evasion (${evasionCooldownCounter})`;
    logMessage("<span style='color: cyan;'>You focus, becoming more evasive! (Instant)</span>");
    console.log(`Evasion activated. Duration: ${player.evasionDuration}, Cooldown: ${evasionCooldownCounter}`);
    updatePlayerStatDisplay(); // Update dodge display

    // <<< REMOVED handlePlayerActionTaken(); >>>
    // Does not consume the turn
}

/** Handles the First Aid button click. Instant Use. */
function handleFirstAidClick() {
    // Stun Check (still applies)
    if (player.stunTurnsLeft > 0) {
        logMessage("<span style='color:orange;'>You are stunned and cannot use First Aid!</span>");
        // Note: We don't call handlePlayerActionTaken here if stunned, as First Aid is instant
        return;
    }
    console.log("--- First Aid button clicked! (Instant) ---");
    if (firstAidCooldownCounter > 0) {
        console.log("First Aid ignored: On cooldown.");
        logMessage("First Aid is not ready yet."); return;
    }
    if (player.hp >= player.maxHp) {
        console.log("First Aid ignored: Player already at full HP.");
        logMessage("You are already at full health."); return;
    }
    const healAmount = Math.floor(Number(player.maxHp) * FIRST_AID_HEAL_PERCENT);
    const oldHp = player.hp;
    player.hp = Math.min(Number(player.maxHp), Number(player.hp) + healAmount);
    const actualHeal = player.hp - oldHp;
    firstAidCooldownCounter = FIRST_AID_COOLDOWN;
    firstAidButton.disabled = true;
    firstAidButton.textContent = `First Aid (${firstAidCooldownCounter})`;
    logMessage(`<span style='color: lightgreen;'>You used First Aid and recovered ${actualHeal} HP! (Instant)</span>`);
    console.log(`First Aid used. Healed: ${actualHeal}, Cooldown: ${firstAidCooldownCounter}`);
    updatePlayerStatDisplay(); // Update HP display

    // <<< REMOVED handlePlayerActionTaken(); >>>
    // Does not consume the turn
}

/** Resets the game state to initial values. */
function resetGame() {
    console.log("--- Resetting game ---");
    player = { ...INITIAL_PLAYER_STATE };

    // Reset status/skill states
    player.evasionActive = false; player.evasionDuration = 0;
    player.poisonTurnsLeft = 0;
    player.bleedTurnsLeft = 0; player.bleedDamagePerTurn = 0;
    player.stunTurnsLeft = 0;

    // Reset cooldown counters
    firstAidCooldownCounter = 0;
    evasionCooldownCounter = 0;
    horizontalArcCooldownCounter = 0;
    horizontalSquareCooldownCounter = 0;
    deadlySinsCooldownCounter = 0;

    updatePlayerStatDisplay(); // Update display (includes skill button update)

    // Clear message log
    const messageContainer = document.getElementById('message');
    if (messageContainer) messageContainer.innerHTML = '';
    logMessage(`Game Reset. Prepare for battle!`);

    // Reset button states (updateSkillButtons handles offensive skills)
    firstAidButton.disabled = false; firstAidButton.textContent = "First Aid";
    evasionButton.disabled = false; evasionButton.textContent = "Evasion";
    horizontalButton.disabled = false; // Ensure basic attack is enabled

    loadHighScore();
    updateHighScoreDisplay();

    spawnEnemy(); // Spawn first enemy

    console.log("--- Game Reset Complete. ---");
}

/** Handles changes to the character selection radio buttons. */
function handlePlayerChoiceChange(event) {
    const selectedValue = event.target.value;
    console.log("Character selected:", selectedValue);
    if (selectedValue) { playerImageElement.src = selectedValue; }
}

// --- High Score Functions ---
function loadHighScore() {
    const savedScore = localStorage.getItem('aincradHighScore');
    highScore = parseInt(savedScore, 10) || 0;
    console.log("High score loaded:", highScore);
}
function saveHighScore() {
    localStorage.setItem('aincradHighScore', highScore.toString());
    console.log("High score saved:", highScore);
}
function updateHighScoreDisplay() {
    highScoreValueElement.textContent = highScore;
}
function resetHighScore() {
    console.log("Resetting high score...");
    highScore = 0;
    saveHighScore();
    updateHighScoreDisplay();
    logMessage("Highest level record has been reset.");
}

// --- Level Up Logic ---
function levelUp() {
    player.level++;
    logMessage(`<span style="color: yellow; font-weight: bold;">Level Up! Reached Level ${player.level}!</span>`);

    player.maxHp += 10;
    player.hp = player.maxHp; // Full heal
    player.str += 1;
    player.def += 1;
    player.minDamage += 1;
    player.maxDamage += 1;
    player.xpToNextLevel = Math.floor(player.xpToNextLevel * 1.5);

    if (player.level > highScore) {
        logMessage(`New highest level: ${player.level}!`);
        highScore = player.level;
        saveHighScore();
        updateHighScoreDisplay();
    }

    updatePlayerStatDisplay(); // Update display (includes skill button update)
    console.log(`Leveled up to ${player.level}. New Stats: MaxHP=${player.maxHp}, STR=${player.str}, DEF=${player.def}, XP_Needed=${player.xpToNextLevel}`);
}
function checkLevelUp() {
    while (player.xp >= player.xpToNextLevel) {
        player.xp -= player.xpToNextLevel;
        levelUp(); // levelUp now calls updatePlayerStatDisplay which calls updateSkillButtons
    }
    // No need for extra updatePlayerStatDisplay here if levelUp calls it
}

// --- Skill Button Update Logic ---
/** Checks player level and cooldowns to show/hide/enable/disable skill buttons. */
function updateSkillButtons() {
    // Utility Skills (check cooldown only)
    evasionButton.disabled = evasionCooldownCounter > 0;
    firstAidButton.disabled = firstAidCooldownCounter > 0;

    // Horizontal Arc
    if (player.level >= HORIZONTAL_ARC_LEVEL) {
        horizontalArcButton.classList.remove('hidden');
        horizontalArcButton.disabled = horizontalArcCooldownCounter > 0;
    } else {
        horizontalArcButton.classList.add('hidden');
        horizontalArcButton.disabled = true;
    }

    // Horizontal Square
    if (player.level >= HORIZONTAL_SQUARE_LEVEL) {
        horizontalSquareButton.classList.remove('hidden');
        horizontalSquareButton.disabled = player.level < HORIZONTAL_SQUARE_LEVEL || horizontalSquareCooldownCounter > 0; // Also check level
    } else {
        horizontalSquareButton.classList.add('hidden');
        horizontalSquareButton.disabled = true;
    }

    // Deadly Sins
    if (player.level >= DEADLY_SINS_LEVEL) {
        deadlySinsButton.classList.remove('hidden');
        deadlySinsButton.disabled = player.level < DEADLY_SINS_LEVEL || deadlySinsCooldownCounter > 0; // Also check level
    } else {
        deadlySinsButton.classList.add('hidden');
        deadlySinsButton.disabled = true;
    }

     // Disable all action buttons if player is defeated
     if (player.hp <= 0) {
        horizontalButton.disabled = true;
        horizontalArcButton.disabled = true;
        horizontalSquareButton.disabled = true;
        deadlySinsButton.disabled = true;
        evasionButton.disabled = true;
        firstAidButton.disabled = true;
    } else {
        // Re-enable basic attack if player is alive (might have been disabled on defeat)
        horizontalButton.disabled = false;
    }
}


// --- Event Listeners ---
horizontalButton.addEventListener('click', handleHorizontalClick);
evasionButton.addEventListener('click', handleEvasionClick);
firstAidButton.addEventListener('click', handleFirstAidClick);
resetButton.addEventListener('click', resetGame);
resetHighScoreButton.addEventListener('click', resetHighScore);
playerChoiceRadios.forEach(radio => {
    radio.addEventListener('change', handlePlayerChoiceChange);
});
// New Skill Listeners
horizontalArcButton.addEventListener('click', handleHorizontalArcClick);
horizontalSquareButton.addEventListener('click', handleHorizontalSquareClick);
deadlySinsButton.addEventListener('click', handleDeadlySinsClick);

// --- Initial Setup ---
console.log("Game script loaded!");
console.log("Character choice listeners attached!");
resetGame(); // Initialize the game on load

