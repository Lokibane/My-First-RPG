// --- DOM Elements ---
const horizontalButton = document.getElementById('horizontal-button');
const evasionButton = document.getElementById('evasion-button');
const resetButton = document.getElementById('reset-button');
const firstAidButton = document.getElementById('first-aid-button');
const horizontalArcButton = document.getElementById('horizontal-arc-button');
const horizontalSquareButton = document.getElementById('horizontal-square-button');
const deadlySinsButton = document.getElementById('deadly-sins-button');
const fleeButton = document.getElementById('flee-button');
const tooltipElement = document.getElementById('tooltip');
// Equipment Display Elements
const equippedWeaponElement = document.getElementById('equipped-weapon');
const equippedArmorElement = document.getElementById('equipped-armor');
const equippedAccessoryElement = document.getElementById('equipped-accessory');
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
const FLEE_CHANCE = 0.33;
const ITEM_DROP_CHANCE = 0.25;
const TIER_LEVELS = { low: 5, mid: 11 };
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
// Player Offensive Skills (Increased Cooldowns)
const MULTI_HIT_DAMAGE_MULTIPLIER = 0.90;
const HORIZONTAL_ARC_LEVEL = 4;
const HORIZONTAL_ARC_HITS = 2;
const HORIZONTAL_ARC_COOLDOWN = 3;
const HORIZONTAL_SQUARE_LEVEL = 8;
const HORIZONTAL_SQUARE_HITS = 4;
const HORIZONTAL_SQUARE_COOLDOWN = 4;
const DEADLY_SINS_LEVEL = 12;
const DEADLY_SINS_HITS = 7;
const DEADLY_SINS_COOLDOWN = 13;
// Vorpal Strike (Deferred)
const VORPAL_STRIKE_LEVEL = 16;
const VORPAL_STRIKE_COOLDOWN = 12;
const VORPAL_STRIKE_STUN_DURATION = 2;
const VORPAL_STRIKE_BLEED_PERCENT = 0.08;

// Enemy Scaling & Skills
const ENEMY_HP_SCALE_PER_LEVEL = 0.15;
const ENEMY_STR_SCALE_PER_LEVEL = 1;
const ENEMY_DEF_SCALE_PER_LEVEL = 0.5;
const ENEMY_XP_SCALE_PER_LEVEL = 0.1;
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
const BLEED_DAMAGE_PERCENT = 0.03;
const STUN_DURATION = 1;
const GOD_CHARGE_CHANCE = 0.15;
const GOD_CHARGE_BONUS = 0.40;
const GOD_GORE_CHANCE = 0.25;
const ALPHA_POUNCE_CHANCE = 0.15;
const ALPHA_REND_CHANCE = 0.25;
const ALPHA_DIRE_WOLF_DODGE_BONUS = 0.02;

// --- Initial Player Stats template (used on reset) ---
const INITIAL_PLAYER_STATE = {
    hp: 100, maxHp: 100, str: 5, def: 4,
    dodgeChance: BASE_DODGE_CHANCE, evasionActive: false, evasionDuration: 0,
    poisonTurnsLeft: 0, bleedTurnsLeft: 0, bleedDamagePerTurn: 0, stunTurnsLeft: 0,
    minDamage: 7, maxDamage: 12, level: 1, xp: 0, xpToNextLevel: 100
};

// Enemy Base Stats & Catalog
const GOBLIN_BASE_DODGE = 0.08; const KOBOLD_BASE_DODGE = 0.06; const HORNET_BASE_DODGE = 0.12; const SLIME_BASE_DODGE = 0.03;
const enemyCatalog = [
    { name: "Slime", tier: "low", hp: 60, str: 2, def: 4, dodgeChance: SLIME_BASE_DODGE, minDamage: 3, maxDamage: 6, xpValue: 40, imageSrc: "Images/slime.jpg" },
    { name: "Kobold", tier: "low", hp: 75, str: 2, def: 2, dodgeChance: KOBOLD_BASE_DODGE, minDamage: 6, maxDamage: 9, xpValue: 50, imageSrc: "Images/kobold.png" },
    { name: "Goblin Scout", tier: "low", hp: 80, str: 4, def: 3, dodgeChance: GOBLIN_BASE_DODGE, minDamage: 5, maxDamage: 10, xpValue: 65, imageSrc: "Images/goblin.jpg" },
    { name: "Wild Boar", tier: "low", hp: 90, str: 4, def: 2, dodgeChance: BASE_DODGE_CHANCE, minDamage: 7, maxDamage: 12, xpValue: 70, imageSrc: "Images/boar.jpg" },
    { name: "Hornet", tier: "mid", hp: 85, str: 6, def: 2, dodgeChance: HORNET_BASE_DODGE, minDamage: 5, maxDamage: 9, xpValue: 80, imageSrc: "Images/hornet.jpg" },
    { name: "Little Nepenthes", tier: "mid", hp: 110, str: 5, def: 3, dodgeChance: BASE_DODGE_CHANCE, minDamage: 8, maxDamage: 12, xpValue: 90, imageSrc: "Images/Little_Nepenthes.jpg" },
    { name: "Orc Grunt", tier: "mid", hp: 150, str: 6, def: 4, dodgeChance: BASE_DODGE_CHANCE, minDamage: 10, maxDamage: 15, xpValue: 120, imageSrc: "Images/orc.jpg" },
    { name: "Boar God", tier: "champion", hp: 250, str: 10, def: 6, dodgeChance: BASE_DODGE_CHANCE, minDamage: 15, maxDamage: 22, xpValue: 400, imageSrc: "Images/boargod.jpg" },
    { name: "Alpha Dire Wolf", tier: "champion", hp: 220, str: 8, def: 5, dodgeChance: BASE_DODGE_CHANCE + ALPHA_DIRE_WOLF_DODGE_BONUS, minDamage: 12, maxDamage: 18, xpValue: 380, imageSrc: "Images/alphadirewolf.jpg" }
];

// --- Equipment Data ---
const accessoryPrefixes = ["Simple", "Worn", "Engraved", "Ornate", "Glowing", "Ancient", "Blessed", "Cursed"];
const accessoryTypes = ["Ring", "Amulet", "Charm", "Brooch", "Band", "Circlet", "Pendant"];
const equipmentCatalog = {
    'weapon': [ { id: 'ohs_l_1', name: 'Rusty Sword', tier: 'low', category: 'weapon', stats: { str: 1, maxDmg: 1 }, minLevel: 1 }, { id: 'ohs_l_2', name: 'Short Sword', tier: 'low', category: 'weapon', stats: { str: 1, minDmg: 1, maxDmg: 1 }, minLevel: 2 }, { id: 'ohs_l_3', name: 'Iron Sword', tier: 'low', category: 'weapon', stats: { str: 2, maxDmg: 2 }, minLevel: 4 }, { id: 'ohs_m_1', name: 'Steel Sword', tier: 'mid', category: 'weapon', stats: { str: 3, minDmg: 1, maxDmg: 3 }, minLevel: 6 }, { id: 'ohs_m_2', name: 'Knight Sword', tier: 'mid', category: 'weapon', stats: { str: 4, maxDmg: 4 }, minLevel: 7 }, { id: 'ohs_m_3', name: 'Broadsword', tier: 'mid', category: 'weapon', stats: { str: 4, minDmg: 2, maxDmg: 4 }, minLevel: 8 }, { id: 'ohs_m_4', name: 'Longsword', tier: 'mid', category: 'weapon', stats: { str: 5, maxDmg: 5 }, minLevel: 9 }, { id: 'ohs_m_5', name: 'Bastard Sword', tier: 'mid', category: 'weapon', stats: { str: 5, minDmg: 2, maxDmg: 6 }, minLevel: 10 }, { id: 'ohs_h_1', name: 'Elucidator', tier: 'high', category: 'weapon', stats: { str: 7, minDmg: 3, maxDmg: 8 }, minLevel: 12 }, { id: 'ohs_h_2', name: 'Dark Repulser', tier: 'high', category: 'weapon', stats: { str: 8, maxDmg: 10 }, minLevel: 13 }, { id: 'ohs_h_3', name: 'Excalibur Fragment', tier: 'high', category: 'weapon', stats: { str: 9, minDmg: 4, maxDmg: 11 }, minLevel: 14 }, { id: 'ohs_h_4', name: 'Holy Sword', tier: 'high', category: 'weapon', stats: { str: 10, maxDmg: 12, maxHp: 20 }, minLevel: 15 }, { id: 'ohs_h_5', name: 'Demonic Blade', tier: 'high', category: 'weapon', stats: { str: 12, minDmg: 5, maxDmg: 14 }, minLevel: 16 }, { id: 'ohs_h_6', name: 'Sword of Light', tier: 'high', category: 'weapon', stats: { str: 11, maxDmg: 13, def: 2 }, minLevel: 17 }, { id: 'ohs_h_7', name: 'Aincrad Liberator', tier: 'high', category: 'weapon', stats: { str: 14, minDmg: 6, maxDmg: 16, maxHp: 30 }, minLevel: 18 }, ],
    'armor': [ { id: 'arm_l_1', name: 'Cloth Tunic', tier: 'low', category: 'armor', stats: { def: 1, maxHp: 5 }, minLevel: 1 }, { id: 'arm_l_2', name: 'Leather Vest', tier: 'low', category: 'armor', stats: { def: 2, maxHp: 10 }, minLevel: 2 }, { id: 'arm_l_3', name: 'Studded Leather', tier: 'low', category: 'armor', stats: { def: 3, maxHp: 15 }, minLevel: 4 }, { id: 'arm_m_1', name: 'Chain Mail', tier: 'mid', category: 'armor', stats: { def: 4, maxHp: 20 }, minLevel: 6 }, { id: 'arm_m_2', name: 'Scale Mail', tier: 'mid', category: 'armor', stats: { def: 5, maxHp: 25 }, minLevel: 7 }, { id: 'arm_m_3', name: 'Breastplate', tier: 'mid', category: 'armor', stats: { def: 6, maxHp: 30 }, minLevel: 8 }, { id: 'arm_m_4', name: 'Half Plate', tier: 'mid', category: 'armor', stats: { def: 7, maxHp: 35 }, minLevel: 9 }, { id: 'arm_m_5', name: 'Full Plate', tier: 'mid', category: 'armor', stats: { def: 8, maxHp: 40 }, minLevel: 10 }, { id: 'arm_h_1', name: 'Knight Armor', tier: 'high', category: 'armor', stats: { def: 10, maxHp: 50 }, minLevel: 12 }, { id: 'arm_h_2', name: 'Dragon Scale', tier: 'high', category: 'armor', stats: { def: 11, maxHp: 60, str: 1 }, minLevel: 13 }, { id: 'arm_h_3', name: 'Obsidian Plate', tier: 'high', category: 'armor', stats: { def: 12, maxHp: 70 }, minLevel: 14 }, { id: 'arm_h_4', name: 'Holy Cuirass', tier: 'high', category: 'armor', stats: { def: 13, maxHp: 80, dodge: 0.01 }, minLevel: 15 }, { id: 'arm_h_5', name: 'Demonic Hauberk', tier: 'high', category: 'armor', stats: { def: 14, maxHp: 90, str: 2 }, minLevel: 16 }, { id: 'arm_h_6', name: 'Armor of Light', tier: 'high', category: 'armor', stats: { def: 15, maxHp: 100, dodge: 0.02 }, minLevel: 17 }, { id: 'arm_h_7', name: 'Coat of Midnight', tier: 'high', category: 'armor', stats: { def: 16, maxHp: 110, str: 3 }, minLevel: 18 }, ],
    'accessory': [ { id: 'acc_l_1', baseName: 'Ring', tier: 'low', category: 'accessory', stats: { maxHp: 15 }, minLevel: 1 }, { id: 'acc_l_2', baseName: 'Amulet', tier: 'low', category: 'accessory', stats: { def: 1 }, minLevel: 2 }, { id: 'acc_l_3', baseName: 'Charm', tier: 'low', category: 'accessory', stats: { str: 1 }, minLevel: 4 }, { id: 'acc_m_1', baseName: 'Brooch', tier: 'mid', category: 'accessory', stats: { maxHp: 30 }, minLevel: 6 }, { id: 'acc_m_2', baseName: 'Band', tier: 'mid', category: 'accessory', stats: { def: 2, maxHp: 10 }, minLevel: 7 }, { id: 'acc_m_3', baseName: 'Circlet', tier: 'mid', category: 'accessory', stats: { str: 2, maxHp: 10 }, minLevel: 8 }, { id: 'acc_m_4', baseName: 'Pendant', tier: 'mid', category: 'accessory', stats: { dodge: 0.01, maxHp: 20 }, minLevel: 9 }, { id: 'acc_m_5', baseName: 'Ring', tier: 'mid', category: 'accessory', stats: { str: 1, def: 1, maxHp: 15 }, minLevel: 10 }, { id: 'acc_h_1', baseName: 'Amulet', tier: 'high', category: 'accessory', stats: { maxHp: 50, str: 2 }, minLevel: 12 }, { id: 'acc_h_2', baseName: 'Charm', tier: 'high', category: 'accessory', stats: { maxHp: 50, def: 2 }, minLevel: 13 }, { id: 'acc_h_3', baseName: 'Brooch', tier: 'high', category: 'accessory', stats: { str: 3, def: 3 }, minLevel: 14 }, { id: 'acc_h_4', baseName: 'Band', tier: 'high', category: 'accessory', stats: { dodge: 0.02, maxHp: 40 }, minLevel: 15 }, { id: 'acc_h_5', baseName: 'Circlet', tier: 'high', category: 'accessory', stats: { str: 4, maxHp: 40 }, minLevel: 16 }, { id: 'acc_h_6', baseName: 'Pendant', tier: 'high', category: 'accessory', stats: { def: 4, maxHp: 40 }, minLevel: 17 }, { id: 'acc_h_7', baseName: 'Ring', tier: 'high', category: 'accessory', stats: { str: 2, def: 2, maxHp: 30, dodge: 0.01 }, minLevel: 18 }, ]
};

// --- Live Game Variables ---
let player = {}; // Initialized in resetGame
let enemy = { /* Populated by spawnEnemy */ };
let highScore = 0;
// Cooldown Counters
let firstAidCooldownCounter = 0; let evasionCooldownCounter = 0; let horizontalArcCooldownCounter = 0; let horizontalSquareCooldownCounter = 0; let deadlySinsCooldownCounter = 0;

// --- Tooltip Data ---
const skillTooltips = {
    'horizontal-button': { name: "Horizontal Strike", desc: "A simple sword skill slashing horizontally.", effect: "Deals standard attack damage.", cost: "Uses turn.", level: 1, cooldown: 0 },
    'horizontal-arc-button': { name: "Horizontal Arc", desc: "A flat two-part skill...", effect: `Hits ${HORIZONTAL_ARC_HITS} times. Each hit deals ${MULTI_HIT_DAMAGE_MULTIPLIER * 100}% base damage.`, cost: "Uses turn.", level: HORIZONTAL_ARC_LEVEL, cooldown: HORIZONTAL_ARC_COOLDOWN },
    'horizontal-square-button': { name: "Horizontal Square", desc: "A mid-level sword skill tracing the shape of a rhombus.", effect: `Hits ${HORIZONTAL_SQUARE_HITS} times. Each hit deals ${MULTI_HIT_DAMAGE_MULTIPLIER * 100}% base damage.`, cost: "Uses turn.", level: HORIZONTAL_SQUARE_LEVEL, cooldown: HORIZONTAL_SQUARE_COOLDOWN },
    'deadly-sins-button': { name: "Deadly Sins", desc: "A seven-hit skill...", effect: `Hits ${DEADLY_SINS_HITS} times. Each hit deals ${MULTI_HIT_DAMAGE_MULTIPLIER * 100}% base damage.`, cost: "Uses turn.", level: DEADLY_SINS_LEVEL, cooldown: DEADLY_SINS_COOLDOWN },
    'evasion-button': { name: "Evasion", desc: "Focus your senses...", effect: `Increases Dodge Chance by ${EVASION_DODGE_BONUS * 100}% for ${EVASION_DURATION} turns (max ${EVASION_MAX_CAP * 100}%).`, cost: "Instant Use.", level: 1, cooldown: EVASION_COOLDOWN },
    'first-aid-button': { name: "First Aid", desc: "Perform basic first aid...", effect: `Heals ${FIRST_AID_HEAL_PERCENT * 100}% of Max HP.`, cost: "Instant Use.", level: 1, cooldown: FIRST_AID_COOLDOWN },
    'flee-button': { name: "Flee you Bitch", desc: "Attempt a hasty retreat...", effect: `A ${Math.round(FLEE_CHANCE * 100)}% chance to escape. No XP if successful. Failure uses turn.`, cost: "Uses turn (if failed).", level: CHAMPION_MIN_LEVEL, cooldown: 0 }
};


// --- Helper Functions ---

/** Generates a random integer between min (inclusive) and max (inclusive). */
function getRandomInt(min, max) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min + 1)) + min; }

/** Calculates total player stats based on base stats and equipment. */
function calculateTotalStats() {
    console.log("--- Calculating Total Stats ---");
    // Ensure base stats exist on the player object
    player.baseMaxHp = player.baseMaxHp ?? INITIAL_PLAYER_STATE.maxHp;
    player.baseStr = player.baseStr ?? INITIAL_PLAYER_STATE.str;
    player.baseDef = player.baseDef ?? INITIAL_PLAYER_STATE.def;
    player.baseMinDmg = player.baseMinDmg ?? INITIAL_PLAYER_STATE.minDamage;
    player.baseMaxDmg = player.baseMaxDmg ?? INITIAL_PLAYER_STATE.maxDamage;
    console.log("Base Stats:", { maxHp: player.baseMaxHp, str: player.baseStr, def: player.baseDef, minDmg: player.baseMinDmg, maxDmg: player.baseMaxDmg });

    // Start totals with base stats
    player.maxHp = player.baseMaxHp;
    player.str = player.baseStr;
    player.def = player.baseDef;
    player.minDamage = player.baseMinDmg;
    player.maxDamage = player.baseMaxDmg;
    let dodgeBonus = 0;
    let totalEquipStats = { maxHp: 0, str: 0, def: 0, minDmg: 0, maxDmg: 0, dodge: 0 };

    // Add stats from equipment
    for (const slot in player.equipment) {
        const itemId = player.equipment[slot];
        if (itemId) {
            const itemData = getItemDataById(itemId);
            if (itemData?.stats) {
                console.log(`Adding stats from ${itemData.name} (${slot}):`, itemData.stats);
                const itemHp = itemData.stats.maxHp || 0; const itemStr = itemData.stats.str || 0; const itemDef = itemData.stats.def || 0;
                const itemMinDmg = itemData.stats.minDmg || 0; const itemMaxDmg = itemData.stats.maxDmg || 0; const itemDodge = itemData.stats.dodge || 0;
                player.maxHp += itemHp; player.str += itemStr; player.def += itemDef;
                player.minDamage += itemMinDmg; player.maxDamage += itemMaxDmg; dodgeBonus += itemDodge;
                totalEquipStats.maxHp += itemHp; totalEquipStats.str += itemStr; totalEquipStats.def += itemDef;
                totalEquipStats.minDmg += itemMinDmg; totalEquipStats.maxDmg += itemMaxDmg; totalEquipStats.dodge += itemDodge;
            }
        }
    }
    console.log("Total Equipment Stats:", totalEquipStats);

    // Calculate final dodge chance
    let levelDodge = BASE_DODGE_CHANCE + (DODGE_PER_LEVEL * (player.level - 1));
    player.dodgeChance = Math.min(levelDodge + dodgeBonus, MAX_DODGE_CHANCE);
    console.log(`Dodge Calc: Base=${BASE_DODGE_CHANCE.toFixed(3)}, LvlBonus=${(DODGE_PER_LEVEL * (player.level - 1)).toFixed(3)}, EquipBonus=${dodgeBonus.toFixed(3)}, PreCap=${(levelDodge + dodgeBonus).toFixed(3)}, Final=${player.dodgeChance.toFixed(3)}`);

    // Apply evasion bonus if active
    if (player.evasionActive) {
        const dodgeBeforeEvasion = player.dodgeChance;
        player.dodgeChance = Math.min(player.dodgeChance + EVASION_DODGE_BONUS, EVASION_MAX_CAP);
        console.log(`Evasion Active: Added ${EVASION_DODGE_BONUS.toFixed(3)}, PreCap=${(dodgeBeforeEvasion + EVASION_DODGE_BONUS).toFixed(3)}, Final=${player.dodgeChance.toFixed(3)}`);
    }

    // Ensure HP doesn't exceed new MaxHP
    player.hp = Math.min(player.hp, player.maxHp);
    console.log("Final Calculated Stats:", { maxHp: player.maxHp, str: player.str, def: player.def, minDmg: player.minDamage, maxDmg: player.maxDamage, dodge: player.dodgeChance });
    console.log("--------------------------------");
}

/** Updates the player's stats displayed on the HTML page. Uses total stats. */
function updatePlayerStatDisplay() {
    playerHpElement.textContent = Math.min(player.hp, player.maxHp); playerMaxHpElement.textContent = player.maxHp;
    playerStrElement.textContent = player.str; playerDefElement.textContent = player.def;
    playerLevelElement.textContent = player.level; playerXpElement.textContent = player.xp; playerXpNeededElement.textContent = player.xpToNextLevel;
    playerDodgeElement.textContent = (player.dodgeChance * 100).toFixed(1); currentLevelValueElement.textContent = player.level;
    updateSkillButtons(); updateEquippedDisplay();
}

/** Updates the displayed equipped items */
function updateEquippedDisplay() {
    const weaponId = player.equipment.weapon; const armorId = player.equipment.armor; const accessoryId = player.equipment.accessory;
    equippedWeaponElement.textContent = weaponId ? getItemDataById(weaponId)?.name || "Unknown" : "None";
    equippedArmorElement.textContent = armorId ? getItemDataById(armorId)?.name || "Unknown" : "None";
    equippedAccessoryElement.textContent = accessoryId ? getItemDataById(accessoryId)?.name || "Unknown" : "None";
}

/** Helper to find item data by ID across all categories */
function getItemDataById(itemId) { for (const category in equipmentCatalog) { const item = equipmentCatalog[category].find(i => i.id === itemId); if (item) return item; } return null; }

/** Generates a random accessory name */
function generateAccessoryName(baseName) { const prefix = accessoryPrefixes[getRandomInt(0, accessoryPrefixes.length - 1)]; return `${prefix} ${baseName}`; }

/** Adds a message to the message log display */
function logMessage(newMessage) {
    const messageContainer = document.getElementById('message'); const wasScrolledToBottom = messageContainer.scrollHeight - messageContainer.clientHeight <= messageContainer.scrollTop + 1;
    const p = document.createElement('p'); p.innerHTML = newMessage; messageContainer.appendChild(p);
    while (messageContainer.children.length > MESSAGE_LIMIT) { messageContainer.removeChild(messageContainer.firstChild); }
    if (wasScrolledToBottom) { messageContainer.scrollTop = messageContainer.scrollHeight; }
}

/** Spawns an enemy, handling champion logic and scaling */
function spawnEnemy() {
    let possibleEnemies = []; let spawnChampion = false; const playerLevelNum = Number(player.level) || 1;
    if (playerLevelNum >= CHAMPION_MIN_LEVEL && Math.random() < CHAMPION_SPAWN_CHANCE) { const championEnemies = enemyCatalog.filter(e => e.tier === 'champion'); if (championEnemies.length > 0) { possibleEnemies = championEnemies; spawnChampion = true; } else { console.warn("No champions found."); } }
    if (!spawnChampion) { if (possibleEnemies.length === 0) possibleEnemies = enemyCatalog.filter(e => e.tier !== 'champion'); if (possibleEnemies.length === 0) { console.error("ERROR: No regular enemies!"); return; } }
    const randomIndex = getRandomInt(0, possibleEnemies.length - 1); const baseEnemy = possibleEnemies[randomIndex]; if (!baseEnemy) { console.error(`ERROR: Failed to get baseEnemy.`); return; }
    console.log(`Spawning: ${baseEnemy.name} (Tier: ${baseEnemy.tier})`); enemy = { ...baseEnemy };
    let levelForScaling = playerLevelNum; if (enemy.tier === 'champion') { enemy.spawnedAtPlayerLevel = playerLevelNum; levelForScaling = enemy.spawnedAtPlayerLevel; }
    const playerLevelFactor = Math.max(0, levelForScaling - 1);
    const baseHp = Number(baseEnemy.hp) || 50; const baseStr = Number(baseEnemy.str) || 1; const baseDef = Number(baseEnemy.def) || 0; const baseXp = Number(baseEnemy.xpValue) || 10;
    enemy.hp = Math.max(1, Math.floor(baseHp * (1 + (ENEMY_HP_SCALE_PER_LEVEL * playerLevelFactor)))); enemy.maxHp = enemy.hp;
    enemy.str = Math.floor(baseStr + (ENEMY_STR_SCALE_PER_LEVEL * playerLevelFactor)); enemy.def = Math.floor(baseDef + (ENEMY_DEF_SCALE_PER_LEVEL * playerLevelFactor));
    enemy.xpValue = Math.floor(baseXp * (1 + (ENEMY_XP_SCALE_PER_LEVEL * playerLevelFactor)));
    enemy.dodgeChance = Number(baseEnemy.dodgeChance) || BASE_DODGE_CHANCE; enemy.minDamage = Number(baseEnemy.minDamage) || 1; enemy.maxDamage = Number(baseEnemy.maxDamage) || 2;
    console.log(`Scaled Stats (Lvl ${levelForScaling}): HP=${enemy.hp}/${enemy.maxHp}, STR=${enemy.str}, DEF=${enemy.def}, XP=${enemy.xpValue}`);
    enemy.isCharging = false; enemy.isGodCharging = false; enemy.evasionActive = false; enemy.evasionDuration = 0;
    enemyNameElement.textContent = enemy.name || "Unknown"; enemyHpElement.textContent = enemy.hp; enemyMaxHpElement.textContent = enemy.maxHp;
    enemyStrElement.textContent = enemy.str; enemyDefElement.textContent = enemy.def; enemyDodgeElement.textContent = (enemy.dodgeChance * 100).toFixed(1);
    enemyImageElement.src = enemy.imageSrc || 'https://placehold.co/80x80/2c3e50/ecf0f1?text=Enemy'; enemyImageElement.alt = (enemy.name || "Enemy") + " Character";
    const announceLevel = enemy.tier === 'champion' ? levelForScaling : playerLevelNum;
    if (enemy.tier === 'champion') { logMessage(`<span style='color: red; font-weight: bold;'>A powerful Level ${announceLevel} ${enemy.name} appears!</span>`); } else { logMessage(`A wild Level ${announceLevel} ${enemy.name} appears!`); }
    if (fleeButton) { fleeButton.classList.toggle('hidden', enemy.tier !== 'champion'); fleeButton.disabled = (enemy.tier !== 'champion'); }
    horizontalButton.disabled = false; updateSkillButtons();
}

/** Decrements active cooldown counters for player skills each turn. */
function decrementCooldowns() {
    if (evasionCooldownCounter > 0) { evasionCooldownCounter--; evasionButton.textContent = `Evasion (${evasionCooldownCounter})`; if (evasionCooldownCounter <= 0) { evasionButton.disabled = false; evasionButton.textContent = "Evasion"; logMessage("Evasion ready!"); } }
    if (firstAidCooldownCounter > 0) { firstAidCooldownCounter--; firstAidButton.textContent = `First Aid (${firstAidCooldownCounter})`; if (firstAidCooldownCounter <= 0) { firstAidButton.disabled = false; firstAidButton.textContent = "First Aid"; logMessage("First Aid ready!"); } }
    if (horizontalArcCooldownCounter > 0) { horizontalArcCooldownCounter--; horizontalArcButton.textContent = `H. Arc (${horizontalArcCooldownCounter})`; if (horizontalArcCooldownCounter <= 0) { horizontalArcButton.disabled = player.level < HORIZONTAL_ARC_LEVEL; horizontalArcButton.textContent = "Horizontal Arc"; if (!horizontalArcButton.disabled) logMessage("H. Arc ready!"); } }
    if (horizontalSquareCooldownCounter > 0) { horizontalSquareCooldownCounter--; horizontalSquareButton.textContent = `H. Square (${horizontalSquareCooldownCounter})`; if (horizontalSquareCooldownCounter <= 0) { horizontalSquareButton.disabled = player.level < HORIZONTAL_SQUARE_LEVEL; horizontalSquareButton.textContent = "Horizontal Square"; if (!horizontalSquareButton.disabled) logMessage("H. Square ready!"); } }
    if (deadlySinsCooldownCounter > 0) { deadlySinsCooldownCounter--; deadlySinsButton.textContent = `D. Sins (${deadlySinsCooldownCounter})`; if (deadlySinsCooldownCounter <= 0) { deadlySinsButton.disabled = player.level < DEADLY_SINS_LEVEL; deadlySinsButton.textContent = "Deadly Sins"; if (!deadlySinsButton.disabled) logMessage("D. Sins ready!"); } }
    console.log(`Cooldowns: Evasion=${evasionCooldownCounter}, FirstAid=${firstAidCooldownCounter}, H.Arc=${horizontalArcCooldownCounter}, H.Square=${horizontalSquareCooldownCounter}, D.Sins=${deadlySinsCooldownCounter}`);
}

/** Applies damage/effects from status effects like poison and bleed. */
function applyPlayerStatusEffects() {
    let stillAlive = true;
    if (player.poisonTurnsLeft > 0) { const poisonDamage = HORNET_VENOM_DAMAGE; player.hp = Math.max(0, player.hp - poisonDamage); player.poisonTurnsLeft--; logMessage(`<span style="color:purple;">Venom: ${poisonDamage} dmg (${player.poisonTurnsLeft} turns)</span>`); updatePlayerStatDisplay(); if (player.hp <= 0) { logMessage("Succumbed to venom! GAME OVER."); if (player.level > highScore) { /*...*/ } horizontalButton.disabled = true; updateSkillButtons(); evasionButton.disabled = true; firstAidButton.disabled = true; stillAlive = false; } }
    if (stillAlive && player.bleedTurnsLeft > 0) { const bleedDamage = player.bleedDamagePerTurn; player.hp = Math.max(0, player.hp - bleedDamage); player.bleedTurnsLeft--; logMessage(`<span style="color:red;">Bleeding: ${bleedDamage} dmg (${player.bleedTurnsLeft} turns)</span>`); updatePlayerStatDisplay(); if (player.hp <= 0) { logMessage("Bled out! GAME OVER."); if (player.level > highScore) { /*...*/ } horizontalButton.disabled = true; updateSkillButtons(); evasionButton.disabled = true; firstAidButton.disabled = true; stillAlive = false; } if (player.bleedTurnsLeft <= 0) { player.bleedDamagePerTurn = 0; logMessage("Bleeding stops."); } }
    return stillAlive;
}

/** Handles enemy action selection and execution. */
function enemyTurn() {
    if (player.hp <= 0 || !enemy || enemy.hp <= 0) return;
    console.log(`Enemy turn: ${enemy.name}`); let enemyActionTaken = false; let usedModifyingSkill = false;
    if (enemy.tier === 'champion') {
        if (enemy.name === "Boar God") { if (player.bleedTurnsLeft <= 0 && Math.random() < GOD_GORE_CHANCE) { const bleedDamage = Math.max(1, Math.floor(player.maxHp * BLEED_DAMAGE_PERCENT)); player.bleedTurnsLeft = BLEED_DURATION; player.bleedDamagePerTurn = bleedDamage; logMessage(`<span style='color:darkred; font-weight:bold;'>${enemy.name} uses God Gore! Bleeding!</span>`); enemyActionTaken = true; } else if (Math.random() < GOD_CHARGE_CHANCE && !enemy.isGodCharging) { enemy.isGodCharging = true; logMessage(`<span style='color:darkred; font-weight:bold;'>${enemy.name} prepares God Charge!</span>`); usedModifyingSkill = true; } }
        else if (enemy.name === "Alpha Dire Wolf") { if (player.bleedTurnsLeft <= 0 && Math.random() < ALPHA_REND_CHANCE) { const bleedDamage = Math.max(1, Math.floor(player.maxHp * BLEED_DAMAGE_PERCENT)); player.bleedTurnsLeft = BLEED_DURATION; player.bleedDamagePerTurn = bleedDamage; logMessage(`<span style='color:red; font-weight:bold;'>${enemy.name} uses Alpha Rend! Bleeding!</span>`); enemyActionTaken = true; } else if (player.stunTurnsLeft <= 0 && Math.random() < ALPHA_POUNCE_CHANCE) { player.stunTurnsLeft = STUN_DURATION; logMessage(`<span style='color:orange; font-weight:bold;'>${enemy.name} uses Alpha Pounce! Stunned!</span>`); enemyActionTaken = true; } }
    }
    if (!enemyActionTaken && enemy.tier !== 'champion') {
        if (enemy.name === "Hornet" && player.poisonTurnsLeft <= 0 && Math.random() < HORNET_VENOM_CHANCE) { player.poisonTurnsLeft = HORNET_VENOM_DURATION; logMessage(`<span style="color:purple;">${enemy.name} stings with venom!</span>`); enemyActionTaken = true; }
        else if (enemy.name === "Kobold" && Math.random() < KOBOLD_EVASION_CHANCE && !enemy.evasionActive) { enemy.evasionActive = true; enemy.evasionDuration = KOBOLD_EVASION_DURATION; logMessage(`<span style="color:teal;">${enemy.name} becomes evasive!</span>`); enemyActionTaken = true; }
        else if (enemy.name === "Wild Boar" && Math.random() < BOAR_CHARGE_CHANCE && !enemy.isCharging) { enemy.isCharging = true; logMessage(`<span style="color:red;">${enemy.name} charges!</span>`); usedModifyingSkill = true; }
    }
    if (!enemyActionTaken) {
        console.log("Enemy attacking."); const playerDodgeRoll = Math.random(); const currentP_Dodge = player.dodgeChance || 0;
        if (playerDodgeRoll < currentP_Dodge) { logMessage(`Dodged ${enemy.name}'s attack!`); if (enemy.isCharging) enemy.isCharging = false; if (enemy.isGodCharging) enemy.isGodCharging = false; }
        else { let potentialEnemyDamage = getRandomInt(enemy.minDamage, enemy.maxDamage) + enemy.str;
            if (enemy.isCharging) { potentialEnemyDamage = Math.floor(potentialEnemyDamage * (1 + BOAR_CHARGE_BONUS)); logMessage(`Charge Attack!`); enemy.isCharging = false; }
            else if (enemy.isGodCharging) { potentialEnemyDamage = Math.floor(potentialEnemyDamage * (1 + GOD_CHARGE_BONUS)); logMessage(`God Charge Attack!`); enemy.isGodCharging = false; }
            let finalEnemyDamage = Math.max(1, potentialEnemyDamage - player.def); player.hp = Math.max(0, player.hp - finalEnemyDamage);
            updatePlayerStatDisplay(); logMessage(`${enemy.name} hits for ${finalEnemyDamage} damage!`);
            if (player.hp <= 0) { logMessage("Defeated! GAME OVER."); if (player.level > highScore) { /*...*/ } horizontalButton.disabled = true; updateSkillButtons(); evasionButton.disabled = true; firstAidButton.disabled = true; return; }
        }
    }
    console.log("Enemy turn finished.");
}

/** Centralized handler called after a successful *turn-consuming* player action. */
function handlePlayerActionTaken() {
    console.log("--- Post-Player Action ---");
    if (player.stunTurnsLeft > 0) { player.stunTurnsLeft--; if (player.stunTurnsLeft <= 0) logMessage("No longer stunned."); }
    const playerSurvivedStatus = applyPlayerStatusEffects(); if (!playerSurvivedStatus) return;
    if (player.evasionActive) { player.evasionDuration--; if (player.evasionDuration <= 0) { player.evasionActive = false; player.evasionDuration = 0; logMessage("Evasion wore off."); calculateTotalStats(); updatePlayerStatDisplay(); } } // Recalc stats when evasion ends
    if (enemy.evasionActive) { enemy.evasionDuration--; if (enemy.evasionDuration <= 0) { enemy.evasionActive = false; enemy.evasionDuration = 0; logMessage(`${enemy.name} no longer evasive.`); } }
    if (player.hp > 0 && enemy?.hp > 0) { decrementCooldowns(); setTimeout(enemyTurn, 500); }
    else if (player.hp > 0 && (!enemy || enemy.hp <= 0)) { decrementCooldowns(); }
}

// --- Player Action Handlers ---
function handleHorizontalClick() {
    if (player.stunTurnsLeft > 0) { logMessage("Stunned!"); handlePlayerActionTaken(); return; }
    console.log("--- Horizontal Strike ---"); if (!enemy || enemy.hp <= 0) return;
    if (enemy.evasionActive) { logMessage(`Miss! Evasive!`); handlePlayerActionTaken(); return; }
    if (Math.random() < enemy.dodgeChance) { logMessage(`${enemy.name} dodged!`); handlePlayerActionTaken(); return; }
    const finalPlayerDamage = Math.max(1, (getRandomInt(player.minDamage, player.maxDamage) + player.str) - enemy.def);
    enemy.hp = Math.max(0, enemy.hp - finalPlayerDamage); enemyHpElement.textContent = enemy.hp;
    logMessage(`Hit ${enemy.name} for ${finalPlayerDamage} damage!`);
    if (enemy.hp <= 0) { handleEnemyDefeat(); return; } handlePlayerActionTaken();
}
function handleHorizontalArcClick() {
    if (player.stunTurnsLeft > 0) { logMessage("Stunned!"); handlePlayerActionTaken(); return; }
    if (player.level < HORIZONTAL_ARC_LEVEL) { logMessage("Level too low!"); return; }
    if (horizontalArcCooldownCounter > 0) { logMessage(`On cooldown.`); return; }
    if (!enemy || enemy.hp <= 0) return;
    console.log("--- Horizontal Arc ---"); logMessage("Use <span style='color:lightblue;'>Horizontal Arc</span>!");
    let enemyDefeated = false;
    for (let i = 1; i <= HORIZONTAL_ARC_HITS && !enemyDefeated; i++) {
        if (enemy.evasionActive || Math.random() < enemy.dodgeChance) { logMessage(`Hit ${i} missed!`); continue; }
        const finalDamage = Math.max(1, Math.floor((getRandomInt(player.minDamage, player.maxDamage) * MULTI_HIT_DAMAGE_MULTIPLIER + player.str) - enemy.def));
        enemy.hp = Math.max(0, enemy.hp - finalDamage); enemyHpElement.textContent = enemy.hp;
        logMessage(`&nbsp;&nbsp;Hit ${i} deals ${finalDamage} damage!`);
        if (enemy.hp <= 0) { enemyDefeated = true; }
    }
    horizontalArcCooldownCounter = HORIZONTAL_ARC_COOLDOWN; horizontalArcButton.disabled = true; horizontalArcButton.textContent = `H. Arc (${horizontalArcCooldownCounter})`;
    if (enemyDefeated) { handleEnemyDefeat(); } else { handlePlayerActionTaken(); }
}
function handleHorizontalSquareClick() {
    if (player.stunTurnsLeft > 0) { logMessage("Stunned!"); handlePlayerActionTaken(); return; }
    if (player.level < HORIZONTAL_SQUARE_LEVEL) { logMessage("Level too low!"); return; }
    if (horizontalSquareCooldownCounter > 0) { logMessage(`On cooldown.`); return; }
    if (!enemy || enemy.hp <= 0) return;
    console.log("--- Horizontal Square ---"); logMessage("Use <span style='color:lightblue;'>Horizontal Square</span>!");
    let enemyDefeated = false;
    for (let i = 1; i <= HORIZONTAL_SQUARE_HITS && !enemyDefeated; i++) {
        if (enemy.evasionActive || Math.random() < enemy.dodgeChance) { logMessage(`Hit ${i} missed!`); continue; }
        const finalDamage = Math.max(1, Math.floor((getRandomInt(player.minDamage, player.maxDamage) * MULTI_HIT_DAMAGE_MULTIPLIER + player.str) - enemy.def));
        enemy.hp = Math.max(0, enemy.hp - finalDamage); enemyHpElement.textContent = enemy.hp;
        logMessage(`&nbsp;&nbsp;Hit ${i} deals ${finalDamage} damage!`);
        if (enemy.hp <= 0) { enemyDefeated = true; }
    }
    horizontalSquareCooldownCounter = HORIZONTAL_SQUARE_COOLDOWN; horizontalSquareButton.disabled = true; horizontalSquareButton.textContent = `H. Square (${horizontalSquareCooldownCounter})`;
    if (enemyDefeated) { handleEnemyDefeat(); } else { handlePlayerActionTaken(); }
}
function handleDeadlySinsClick() {
    if (player.stunTurnsLeft > 0) { logMessage("Stunned!"); handlePlayerActionTaken(); return; }
    if (player.level < DEADLY_SINS_LEVEL) { logMessage("Level too low!"); return; }
    if (deadlySinsCooldownCounter > 0) { logMessage(`On cooldown.`); return; }
    if (!enemy || enemy.hp <= 0) return;
    console.log("--- Deadly Sins ---"); logMessage("Unleash <span style='color:violet; font-weight:bold;'>Deadly Sins</span>!");
    let enemyDefeated = false;
    for (let i = 1; i <= DEADLY_SINS_HITS && !enemyDefeated; i++) {
        if (enemy.evasionActive || Math.random() < enemy.dodgeChance) { logMessage(`Hit ${i} missed!`); continue; }
        const finalDamage = Math.max(1, Math.floor((getRandomInt(player.minDamage, player.maxDamage) * MULTI_HIT_DAMAGE_MULTIPLIER + player.str) - enemy.def));
        enemy.hp = Math.max(0, enemy.hp - finalDamage); enemyHpElement.textContent = enemy.hp;
        logMessage(`&nbsp;&nbsp;Hit ${i} deals ${finalDamage} damage!`);
        if (enemy.hp <= 0) { enemyDefeated = true; }
    }
    deadlySinsCooldownCounter = DEADLY_SINS_COOLDOWN; deadlySinsButton.disabled = true; deadlySinsButton.textContent = `D. Sins (${deadlySinsCooldownCounter})`;
    if (enemyDefeated) { handleEnemyDefeat(); } else { handlePlayerActionTaken(); }
}
function handleEvasionClick() {
    if (player.stunTurnsLeft > 0) { logMessage("Stunned!"); return; }
    console.log("--- Evasion (Instant) ---"); if (evasionCooldownCounter > 0 || player.evasionActive) { logMessage("Evasion not ready/active."); return; }
    player.evasionActive = true; player.evasionDuration = EVASION_DURATION; evasionCooldownCounter = EVASION_COOLDOWN; evasionButton.disabled = true;
    evasionButton.textContent = `Evasion (${evasionCooldownCounter})`; logMessage("<span style='color: cyan;'>More evasive! (Instant)</span>");
    calculateTotalStats(); updatePlayerStatDisplay();
}
function handleFirstAidClick() {
    if (player.stunTurnsLeft > 0) { logMessage("Stunned!"); return; }
    console.log("--- First Aid (Instant) ---"); if (firstAidCooldownCounter > 0) { logMessage("First Aid not ready."); return; }
    if (player.hp >= player.maxHp) { logMessage("Already full health."); return; }
    const healAmount = Math.floor(player.maxHp * FIRST_AID_HEAL_PERCENT); const oldHp = player.hp;
    player.hp = Math.min(player.maxHp, player.hp + healAmount); const actualHeal = player.hp - oldHp;
    firstAidCooldownCounter = FIRST_AID_COOLDOWN; firstAidButton.disabled = true; firstAidButton.textContent = `First Aid (${firstAidCooldownCounter})`;
    logMessage(`<span style='color: lightgreen;'>Recovered ${actualHeal} HP! (Instant)</span>`); updatePlayerStatDisplay();
}
function handleFleeClick() {
    if (player.stunTurnsLeft > 0) { logMessage("Stunned! Cannot flee!"); handlePlayerActionTaken(); return; }
    if (!enemy || enemy.tier !== 'champion') { logMessage("Can only flee from Champions!"); return; }
    console.log("--- Flee ---"); logMessage("Attempting to flee...");
    if (Math.random() < FLEE_CHANCE) { logMessage("<span style='color:yellow;'>Fled successfully!</span>"); spawnEnemy(); }
    else { logMessage("<span style='color:red;'>Flee failed!</span>"); handlePlayerActionTaken(); }
}

// --- Enemy Defeat Handler ---
function handleEnemyDefeat() {
    logMessage(`Defeated ${enemy.name}!`); const xpGained = Number(enemy.xpValue) || 0;
    player.xp += xpGained; logMessage(`Gained ${xpGained} XP!`);
    updatePlayerStatDisplay(); checkLevelUp();
    if (Math.random() < ITEM_DROP_CHANCE) { handleItemDrop(); }
    setTimeout(spawnEnemy, 1000); decrementCooldowns();
}

// --- Item Drop/Equip Logic ---
function handleItemDrop() {
    const playerLevel = player.level; let tier = (playerLevel <= TIER_LEVELS.low) ? 'low' : (playerLevel <= TIER_LEVELS.mid) ? 'mid' : 'high';
    const possibleCategories = ['weapon', 'armor', 'accessory']; const chosenCategory = possibleCategories[getRandomInt(0, possibleCategories.length - 1)];
    const possibleItems = equipmentCatalog[chosenCategory].filter(item => item.tier === tier);
    if (possibleItems.length > 0) {
        const droppedItemData = { ...possibleItems[getRandomInt(0, possibleItems.length - 1)] };
        if (droppedItemData.category === 'accessory') droppedItemData.name = generateAccessoryName(droppedItemData.baseName);
        logMessage(`<span class="special-message item-drop-message">Dropped: ${droppedItemData.name}!</span>`); equipItem(droppedItemData);
    } else { console.warn(`No items found for ${chosenCategory} tier ${tier}.`); }
}
function equipItem(itemData) {
    const slot = itemData.category;
    if (player.equipment.hasOwnProperty(slot)) {
        if (player.equipment[slot] === null) {
            player.equipment[slot] = itemData.id; logMessage(`Equipped ${itemData.name}.`);
            calculateTotalStats(); updatePlayerStatDisplay();
        } else { const currentItem = getItemDataById(player.equipment[slot]); logMessage(`Found ${itemData.name}, but ${currentItem?.name || 'slot'} is full.`); }
    } else { console.error(`Invalid slot: ${slot}`); }
}

// --- Game Management ---
/** Resets the game state to initial values. */
function resetGame() {
    console.log("--- Resetting game ---");
    player = {
        ...INITIAL_PLAYER_STATE,
        equipment: { weapon: null, armor: null, accessory: null },
        baseMaxHp: INITIAL_PLAYER_STATE.maxHp, baseStr: INITIAL_PLAYER_STATE.str, baseDef: INITIAL_PLAYER_STATE.def,
        baseMinDmg: INITIAL_PLAYER_STATE.minDamage, baseMaxDmg: INITIAL_PLAYER_STATE.maxDamage,
        hp: INITIAL_PLAYER_STATE.maxHp, maxHp: INITIAL_PLAYER_STATE.maxHp, str: INITIAL_PLAYER_STATE.str,
        def: INITIAL_PLAYER_STATE.def, minDamage: INITIAL_PLAYER_STATE.minDamage, maxDamage: INITIAL_PLAYER_STATE.maxDamage,
        dodgeChance: BASE_DODGE_CHANCE, evasionActive: false, evasionDuration: 0,
        poisonTurnsLeft: 0, bleedTurnsLeft: 0, bleedDamagePerTurn: 0, stunTurnsLeft: 0,
    };
    firstAidCooldownCounter = 0; evasionCooldownCounter = 0; horizontalArcCooldownCounter = 0;
    horizontalSquareCooldownCounter = 0; deadlySinsCooldownCounter = 0;
    calculateTotalStats(); player.hp = player.maxHp;
    updatePlayerStatDisplay();
    const messageContainer = document.getElementById('message'); if (messageContainer) messageContainer.innerHTML = '';
    logMessage(`Game Reset. Prepare for battle!`);
    firstAidButton.disabled = false; firstAidButton.textContent = "First Aid";
    evasionButton.disabled = false; evasionButton.textContent = "Evasion";
    horizontalButton.disabled = false;
    if(fleeButton) fleeButton.classList.add('hidden');
    loadHighScore(); updateHighScoreDisplay();
    spawnEnemy();
    console.log("--- Game Reset Complete. ---");
}
function handlePlayerChoiceChange(event) { if (event.target.value) playerImageElement.src = event.target.value; }
// --- High Score Functions ---
function loadHighScore() { const savedScore = localStorage.getItem('aincradHighScore'); highScore = parseInt(savedScore, 10) || 0; }
function saveHighScore() { localStorage.setItem('aincradHighScore', highScore.toString()); }
function updateHighScoreDisplay() { highScoreValueElement.textContent = highScore; }
function resetHighScore() { highScore = 0; saveHighScore(); updateHighScoreDisplay(); logMessage("Highest level reset."); }
// --- Level Up Logic ---
function levelUp() {
    const oldLevel = player.level; player.level++;
    logMessage(`<span style="color: yellow; font-weight: bold;">Level Up! ${player.level}!</span>`);
    if (oldLevel < HORIZONTAL_ARC_LEVEL && player.level >= HORIZONTAL_ARC_LEVEL) { logMessage(`<span class="special-message skill-learned-message">Learned: Horizontal Arc!</span>`); }
    if (oldLevel < HORIZONTAL_SQUARE_LEVEL && player.level >= HORIZONTAL_SQUARE_LEVEL) { logMessage(`<span class="special-message skill-learned-message">Learned: Horizontal Square!</span>`); }
    if (oldLevel < DEADLY_SINS_LEVEL && player.level >= DEADLY_SINS_LEVEL) { logMessage(`<span class="special-message skill-learned-message">Learned: Deadly Sins!</span>`); }
    player.baseMaxHp += 10; player.baseStr += 1; player.baseDef += 1; player.baseMinDmg += 1; player.baseMaxDmg += 1;
    calculateTotalStats(); player.hp = player.maxHp; // Full heal
    player.xpToNextLevel = Math.floor(player.xpToNextLevel * 1.5);
    if (player.level > highScore) { highScore = player.level; saveHighScore(); updateHighScoreDisplay(); }
    updatePlayerStatDisplay(); // Update display with new stats
    console.log(`Leveled up to ${player.level}.`);
    console.log("Stats after level up display update:", {hp: player.hp, maxHp: player.maxHp, str: player.str, def: player.def});
}
function checkLevelUp() { while (player.xp >= player.xpToNextLevel) { player.xp -= player.xpToNextLevel; levelUp(); } }
// --- Skill Button Update Logic ---
function updateSkillButtons() {
    evasionButton.disabled = evasionCooldownCounter > 0; firstAidButton.disabled = firstAidCooldownCounter > 0;
    const canUseHA = player.level >= HORIZONTAL_ARC_LEVEL; horizontalArcButton.classList.toggle('hidden', !canUseHA); horizontalArcButton.disabled = !canUseHA || horizontalArcCooldownCounter > 0;
    const canUseHS = player.level >= HORIZONTAL_SQUARE_LEVEL; horizontalSquareButton.classList.toggle('hidden', !canUseHS); horizontalSquareButton.disabled = !canUseHS || horizontalSquareCooldownCounter > 0;
    const canUseDS = player.level >= DEADLY_SINS_LEVEL; deadlySinsButton.classList.toggle('hidden', !canUseDS); deadlySinsButton.disabled = !canUseDS || deadlySinsCooldownCounter > 0;
    if (fleeButton) fleeButton.disabled = false;
     if (player.hp <= 0) {
        horizontalButton.disabled = true; horizontalArcButton.disabled = true; horizontalSquareButton.disabled = true;
        deadlySinsButton.disabled = true; evasionButton.disabled = true; firstAidButton.disabled = true;
        if(fleeButton) fleeButton.disabled = true;
    } else { horizontalButton.disabled = false; }
}
// --- Tooltip Functions ---
function showTooltip(event) {
    const buttonId = event.target.id; const tooltipData = skillTooltips[buttonId];
    if (tooltipData && tooltipElement) {
        let tooltipHTML = `<strong>${tooltipData.name}</strong> (Lvl ${tooltipData.level})<hr><p>${tooltipData.desc}</p><p><em>Effect:</em> ${tooltipData.effect}</p><p><em>Cost:</em> ${tooltipData.cost}</p>`;
        if (tooltipData.cooldown > 0) tooltipHTML += `<p><em>Cooldown:</em> ${tooltipData.cooldown} turns</p>`;
        tooltipElement.innerHTML = tooltipHTML; tooltipElement.classList.remove('hidden');
        updateTooltipPosition(event); document.addEventListener('mousemove', updateTooltipPosition);
    } else { hideTooltip(); }
}
function hideTooltip() { if (tooltipElement) { tooltipElement.classList.add('hidden'); document.removeEventListener('mousemove', updateTooltipPosition); } }
function updateTooltipPosition(event) {
    if (tooltipElement && !tooltipElement.classList.contains('hidden')) {
        const offsetX = 15, offsetY = 10; let x = event.pageX + offsetX, y = event.pageY + offsetY;
        const tooltipRect = tooltipElement.getBoundingClientRect(); const bodyRect = document.body.getBoundingClientRect();
        if (x + tooltipRect.width > bodyRect.width) x = event.pageX - tooltipRect.width - offsetX;
        if (y + tooltipRect.height > window.innerHeight + window.scrollY) y = event.pageY - tooltipRect.height - offsetY;
        if (x < 0) x = offsetX; if (y < window.scrollY) y = window.scrollY + offsetY;
        tooltipElement.style.left = `${x}px`; tooltipElement.style.top = `${y}px`;
    }
}

// --- Event Listeners ---
horizontalButton.addEventListener('click', handleHorizontalClick);
evasionButton.addEventListener('click', handleEvasionClick);
firstAidButton.addEventListener('click', handleFirstAidClick);
resetButton.addEventListener('click', resetGame);
resetHighScoreButton.addEventListener('click', resetHighScore);
playerChoiceRadios.forEach(radio => { radio.addEventListener('change', handlePlayerChoiceChange); });
horizontalArcButton.addEventListener('click', handleHorizontalArcClick);
horizontalSquareButton.addEventListener('click', handleHorizontalSquareClick);
deadlySinsButton.addEventListener('click', handleDeadlySinsClick);
fleeButton.addEventListener('click', handleFleeClick);
// Tooltip Listeners
const actionButtons = [ horizontalButton, evasionButton, firstAidButton, horizontalArcButton, horizontalSquareButton, deadlySinsButton, fleeButton ];
actionButtons.forEach(button => { if (button) { button.addEventListener('mouseover', showTooltip); button.addEventListener('mouseout', hideTooltip); } });

// --- Initial Setup ---
console.log("Game script loaded!");
console.log("Character choice listeners attached!");
resetGame(); // Initialize the game on load

