// --- DOM Elements ---
// Screens
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
// Start Screen
const playerNameInput = document.getElementById('player-name-input');
const startGameButton = document.getElementById('start-game-button');
const playerChoiceRadios = document.querySelectorAll('input[name="playerChoice"]');
const changelogButton = document.getElementById('changelog-button'); // Combined button
// Top Controls
const resetButton = document.getElementById('reset-button');
const newCharacterButton = document.getElementById('new-character-button');
// Actions
const horizontalButton = document.getElementById('horizontal-button');
const evasionButton = document.getElementById('evasion-button');
const firstAidButton = document.getElementById('first-aid-button');
const horizontalArcButton = document.getElementById('horizontal-arc-button');
const horizontalSquareButton = document.getElementById('horizontal-square-button');
const deadlySinsButton = document.getElementById('deadly-sins-button');
const fleeButton = document.getElementById('flee-button');
const actionRow = document.getElementById('action-row');
// Tooltip
const tooltipElement = document.getElementById('tooltip');
// Equipment Display (In-Game)
const equippedWeaponElement = document.getElementById('equipped-weapon');
const equippedArmorElement = document.getElementById('equipped-armor');
const equippedAccessoryElement = document.getElementById('equipped-accessory');
// Message Log & Score
const messageElement = document.getElementById('message');
const messageLogElement = document.getElementById('message-log');
const highScoreValueElement = document.getElementById('high-score-value');
const currentLevelValueElement = document.getElementById('current-level-value');
const resetHighScoreButton = document.getElementById('reset-highscore-button');
// Player Stats Display
const playerNameDisplay = document.getElementById('player-name-display');
const playerHpElement = document.getElementById('player-hp');
const playerMaxHpElement = document.getElementById('player-max-hp');
const playerDotIndicatorElement = document.getElementById('player-dot-indicator');
const playerStrDisplayElement = document.getElementById('player-str-display');
const playerDefDisplayElement = document.getElementById('player-def-display');
const playerDodgeElement = document.getElementById('player-dodge');
const playerImageElement = document.getElementById('player-image');
const playerLevelElement = document.getElementById('player-level');
const playerXpElement = document.getElementById('player-xp');
const playerXpNeededElement = document.getElementById('player-xp-needed');
const playerCritChanceElement = document.getElementById('player-crit-chance');
const playerCritDamageElement = document.getElementById('player-crit-damage');
const playerMinDmgElement = document.getElementById('player-min-dmg');
const playerMaxDmgElement = document.getElementById('player-max-dmg');
const playerDebuffIndicator = document.getElementById('player-debuff-indicator');
const playerStatsBlock = document.getElementById('player-stats');
// Enemy Stats Display
const enemyHpElement = document.getElementById('enemy-hp');
const enemyMaxHpElement = document.getElementById('enemy-max-hp');
const enemyStrElement = document.getElementById('enemy-str');
const enemyDefElement = document.getElementById('enemy-def');
const enemyDodgeElement = document.getElementById('enemy-dodge');
const enemyNameElement = document.getElementById('enemy-name');
const enemyImageElement = document.getElementById('enemy-image');
const enemyDebuffIndicator = document.getElementById('enemy-debuff-indicator');
const enemyStatsBlock = document.getElementById('enemy-stats');
// --- Inventory Elements ---
const inventoryDisplay = document.getElementById('inventory-display'); // Middle column
const backpackContainer = document.getElementById('backpack-container'); // Bottom row container
// Inside inventoryDisplay (Equipped + Details)
const invEquippedWeapon = document.getElementById('inventory-equipped-weapon').querySelector('.item-name');
const invEquippedArmor = document.getElementById('inventory-equipped-armor').querySelector('.item-name');
const invEquippedAccessory = document.getElementById('inventory-equipped-accessory').querySelector('.item-name');
const invEquippedWeaponImg = document.getElementById('inventory-equipped-weapon').querySelector('img');
const invEquippedArmorImg = document.getElementById('inventory-equipped-armor').querySelector('img');
const invEquippedAccessoryImg = document.getElementById('inventory-equipped-accessory').querySelector('img');
const playerCoinsElement = document.getElementById('player-coins');
const itemDetailsSection = document.getElementById('item-details-section');
const equippedItemComparisonDiv = document.getElementById('equipped-item-comparison');
const selectedItemDetailsDiv = document.getElementById('selected-item-details');
const itemDetailActionsDiv = document.getElementById('item-detail-actions');
const equipButton = document.getElementById('equip-button');
const useButton = document.getElementById('use-button'); // Added
const discardButton = document.getElementById('discard-button');
// Inside backpackContainer
const backpackGrid = document.getElementById('backpack-grid');
const backpackCountSpan = document.getElementById('backpack-count');
const backpackMaxSpan = document.getElementById('backpack-max');
// Victory Notification
const victoryNotificationElement = document.getElementById('victory-notification');


// --- Game State & Configuration ---
const MAX_BACKPACK_SIZE = 20;
const MESSAGE_LIMIT = 50;
const FLEE_CHANCE = 0.33; // Base flee chance
const FLEE_CHANCE_INCREASE = 0.10; // Increase per failed attempt
const ITEM_DROP_CHANCE = 0.25; const TIER_LEVELS = { low: 5, mid: 11 };
const BASE_DODGE_CHANCE = 0.05; const DODGE_PER_LEVEL = 0.005; const MAX_DODGE_CHANCE = 0.50;
const EVASION_DODGE_BONUS = 0.40; // Increased Evasion Bonus
const EVASION_DURATION = 3; const EVASION_COOLDOWN = 6; const EVASION_MAX_CAP = 0.85;
const FIRST_AID_HEAL_PERCENT = 0.25; const FIRST_AID_COOLDOWN = 3; // Reduced cooldown
const MULTI_HIT_DAMAGE_MULTIPLIER = 0.95;
const HORIZONTAL_ARC_LEVEL = 3; // Lowered level req
const HORIZONTAL_ARC_HITS = 2; const HORIZONTAL_ARC_COOLDOWN = 3;
const HORIZONTAL_SQUARE_LEVEL = 6; // Lowered level req
const HORIZONTAL_SQUARE_HITS = 4; const HORIZONTAL_SQUARE_COOLDOWN = 5;
const DEADLY_SINS_LEVEL = 11; const DEADLY_SINS_HITS = 7; const DEADLY_SINS_COOLDOWN = 13;
const VORPAL_STRIKE_LEVEL = 16; const VORPAL_STRIKE_COOLDOWN = 12; const VORPAL_STRIKE_STUN_DURATION = 2; const VORPAL_STRIKE_BLEED_PERCENT = 0.08;
// Enemy Scaling
const ENEMY_HP_SCALE_PER_LEVEL = 0.15; const ENEMY_STR_SCALE_PER_LEVEL = 1; const ENEMY_DEF_SCALE_PER_LEVEL = 0.5; const ENEMY_XP_SCALE_PER_LEVEL = 0.12; // Default scaling
const LOW_TIER_ENEMY_HP_SCALE = 0.18; // Slightly higher HP scaling for low tier
const LOW_TIER_ENEMY_STAT_SCALE = 1.2; // Slightly higher STR/DEF scaling for low tier
const LOW_TIER_ENEMY_XP_SCALE = 0.15; // Slightly higher XP scaling for low tier

const HORNET_VENOM_CHANCE = 0.25; const HORNET_VENOM_DAMAGE = 5; const HORNET_VENOM_DURATION = 2;
const KOBOLD_EVASION_CHANCE = 0.15; const KOBOLD_EVASION_DURATION = 1; const BOAR_CHARGE_CHANCE = 0.20; const BOAR_CHARGE_BONUS = 0.25;
const INITIAL_CHAMPION_SPAWN_CHANCE = 0.15; // Updated
const SUBSEQUENT_CHAMPION_SPAWN_CHANCE = 0.05;
const CHAMPION_MIN_LEVEL_SPAWN = 12; // Updated
const DEBUFF_DURATION = 3;
const DEFENSE_DOWN_PERCENT = 0.30;
const ATTACK_DOWN_PERCENT = 0.30;
const STUN_DURATION = 1;
const GOD_CHARGE_CHANCE = 0.15; const GOD_CHARGE_BONUS = 0.40; const GOD_GORE_CHANCE = 0.20;
const ALPHA_POUNCE_CHANCE = 0.15; const WEAKENING_HOWL_CHANCE = 0.15;
const ALPHA_DIRE_WOLF_DODGE_BONUS = 0.02;
const XP_LEVEL_MULTIPLIER = 1.30;
const ITEM_STAT_VARIATION_PERCENT = 0.20; // Increased variation
const BURN_CHANCE = 0.25; const BURN_DAMAGE = 8; const BURN_DURATION = 2; const BURN_COOLDOWN = 5;
const METAL_SLIME_BASE_FLEE_CHANCE = 0.05;
const DISEASE_CHANCE = 0.30; const DISEASE_ATK_MULT = 0.75; const DISEASE_DEF_MULT = 0.75;
const ACCESSORY_2ND_STAT_CHANCE = 0.20;
const ACCESSORY_3RD_STAT_CHANCE = 0.05;
const CRITICAL_HIT_CHANCE = 0.05; // Base crit chance
const CRITICAL_HIT_MULTIPLIER = 1.5; // Base crit damage multiplier
const COIN_VALUES = { low: 1, mid: 3, high: 5, champion: 10 }; // Coin values for discarding

// Initial player state template including backpack and new stats
const INITIAL_PLAYER_STATE = {
    name: "Player", // Default name
    hp: 100, maxHp: 100, str: 5, def: 4,
    dodgeChance: BASE_DODGE_CHANCE, evasionActive: false, evasionDuration: 0,
    poisonTurnsLeft: 0, bleedTurnsLeft: 0, bleedDamagePerTurn: 0, stunTurnsLeft: 0,
    defenseDownTurns: 0, defenseDownMultiplier: 1, attackDownTurns: 0, attackDownMultiplier: 1,
    burnTurnsLeft: 0, burnDamagePerTurn: 0,
    diseaseTurnsLeft: 0, // Added disease counter
    minDamage: 7, maxDamage: 12,
    critChance: CRITICAL_HIT_CHANCE,
    critDamageMultiplier: CRITICAL_HIT_MULTIPLIER,
    level: 1, xp: 0, xpToNextLevel: 80,
    coins: 0, // Added coins
    fleeAttemptsThisEncounter: 0, // Added for flee chance calculation
    equipment: { weapon: null, armor: null, accessory: null },
    backpack: []
};

const GOBLIN_BASE_DODGE = 0.08; const KOBOLD_BASE_DODGE = 0.06; const HORNET_BASE_DODGE = 0.12; const SLIME_BASE_DODGE = 0.03;

// Enemy Catalog (unchanged)
const enemyCatalog = [
     { name: "Wild Boar", hp: 55, str: 4, def: 2, minDamage: 3, maxDamage: 6, xpValue: 15, dodgeChance: 0.05, tier: 'low', minLevel: 1, imageSrc: 'Images/boar.jpg' },
     { name: "Hornet", hp: 30, str: 3, def: 0, minDamage: 1, maxDamage: 3, xpValue: 14, dodgeChance: HORNET_BASE_DODGE, tier: 'low', minLevel: 1, imageSrc: 'Images/hornet.jpg' },
     { name: "Kobold", hp: 45, str: 4, def: 1, minDamage: 2, maxDamage: 5, xpValue: 18, dodgeChance: KOBOLD_BASE_DODGE, tier: 'low', minLevel: 1, imageSrc: 'Images/kobold.png' },
     { name: "Slime", hp: 40, str: 2, def: 3, minDamage: 1, maxDamage: 2, xpValue: 10, dodgeChance: SLIME_BASE_DODGE, tier: 'low', minLevel: 1, imageSrc: 'Images/slime.jpg' },
     { name: "Little Nepenthes", hp: 35, str: 3, def: 1, minDamage: 2, maxDamage: 4, xpValue: 12, dodgeChance: 0.08, tier: 'low', minLevel: 1, imageSrc: 'Images/Little_Nepenthes.jpg' },
     { name: "Orc", hp: 90, str: 7, def: 3, minDamage: 5, maxDamage: 9, xpValue: 30, dodgeChance: 0.04, tier: 'mid', minLevel: TIER_LEVELS.low + 1, imageSrc: 'Images/orc.jpg' },
     { name: "Fire Dancer", hp: 100, str: 9, def: 4, minDamage: 7, maxDamage: 12, xpValue: 45, dodgeChance: 0.15, tier: 'mid', minLevel: 6, imageSrc: 'Images/firedancer.jpg' },
     { name: "Metal Slime", hp: 20, str: 8, def: 50, minDamage: 5, maxDamage: 10, xpValue: 200, dodgeChance: 0.05, tier: 'mid', minLevel: 7, imageSrc: 'Images/metalslime.jpg' },
     { name: "Infected Zombie", hp: 130, str: 7, def: 6, minDamage: 6, maxDamage: 11, xpValue: 55, dodgeChance: 0.02, tier: 'mid', minLevel: 6, imageSrc: 'Images/infected_zombie.jpg' },
     { name: "Dire Wolf", hp: 120, str: 8, def: 5, minDamage: 8, maxDamage: 15, xpValue: 50, dodgeChance: 0.10, tier: 'mid', minLevel: TIER_LEVELS.low + 1, imageSrc: 'Images/dire_wolf.jpg' },
     { name: "Ogre", hp: 250, str: 15, def: 8, minDamage: 15, maxDamage: 25, xpValue: 150, dodgeChance: 0.03, tier: 'high', minLevel: TIER_LEVELS.mid + 1, imageSrc: 'Images/ogre.jpg' },
     { name: "Boar God", hp: 600, str: 28, def: 18, minDamage: 28, maxDamage: 45, xpValue: 750, dodgeChance: 0.08, tier: 'champion', minLevel: CHAMPION_MIN_LEVEL_SPAWN, imageSrc: 'Images/boar_god.jpg' },
     { name: "Alpha Dire Wolf", hp: 450, str: 25, def: 15, minDamage: 25, maxDamage: 40, xpValue: 650, dodgeChance: 0.15 + ALPHA_DIRE_WOLF_DODGE_BONUS, tier: 'champion', minLevel: CHAMPION_MIN_LEVEL_SPAWN, imageSrc: 'Images/alpha_dire_wolf.jpg' },
];
// Accessory naming (unchanged)
const accessoryPrefixes = ["Simple", "Worn", "Engraved", "Ornate", "Glowing", "Ancient", "Blessed", "Cursed"];
const accessoryTypes = ["Ring", "Amulet", "Charm", "Brooch", "Band", "Circlet", "Pendant"];
// Equipment Catalog - Updated Weapon Stats & Added Consumables
const equipmentCatalog = {
    weapon: [
        { id: 'w_low_01', name: "Short Sword", category: 'weapon', tier: 'low', stats: { str: 1, minDmg: 1, maxDmg: 3 } }, // Updated
        { id: 'w_mid_01', name: "Long Sword", category: 'weapon', tier: 'mid', stats: { str: 4, minDmg: 4, maxDmg: 6 } }, // Updated
        { id: 'w_high_01', name: "Great Sword", category: 'weapon', tier: 'high', stats: { str: 7, minDmg: 7, maxDmg: 11 } }, // Updated
    ],
    armor: [ { id: 'a_low_01', name: "Leather Jerkin", category: 'armor', tier: 'low', stats: { def: 2, maxHp: 5 } }, { id: 'a_mid_01', name: "Chain Mail", category: 'armor', tier: 'mid', stats: { def: 5, maxHp: 15 } }, { id: 'a_high_01', name: "Plate Armor", category: 'armor', tier: 'high', stats: { def: 10, maxHp: 30 } }, ],
    accessory: [ { id: 'ac_low_01', baseName: "Ring", category: 'accessory', tier: 'low', stats: { maxHp: 5 } }, { id: 'ac_low_02', baseName: "Charm", category: 'accessory', tier: 'low', stats: { str: 1 } }, { id: 'ac_mid_01', baseName: "Amulet", category: 'accessory', tier: 'mid', stats: { def: 2, maxHp: 10 } }, { id: 'ac_mid_02', baseName: "Brooch", category: 'accessory', tier: 'mid', stats: { str: 1, def: 1 } }, { id: 'ac_high_01', baseName: "Pendant", category: 'accessory', tier: 'high', stats: { maxHp: 25, str: 2 } }, { id: 'ac_high_02', baseName: "Circlet", category: 'accessory', tier: 'high', stats: { dodge: 0.02, def: 3 } }, ],
    consumable: [ // Added Consumable Category
        { id: 'c_heal_low', name: "Healing Potion", category: 'consumable', type: 'potion', tier: 'low', stackable: true, imageSrc: 'Images/healing_potion.jpg', effect: { healPercent: 0.15 }, desc: "Restores 15% of Max HP." },
        { id: 'c_heal_mid', name: "Great Healing Potion", category: 'consumable', type: 'potion', tier: 'mid', stackable: true, imageSrc: 'Images/healing_potion.jpg', effect: { healPercent: 0.30 }, desc: "Restores 30% of Max HP." },
        { id: 'c_heal_high', name: "Superior Healing Potion", category: 'consumable', type: 'potion', tier: 'high', stackable: true, imageSrc: 'Images/healing_potion.jpg', effect: { healPercent: 0.75 }, desc: "Restores 75% of Max HP." },
    ]
};
const SECONDARY_ACCESSORY_STATS = { maxHp: 3, str: 1, def: 1, dodge: 0.01 };

// --- Game State Variables ---
let player = {};
let enemy = {};
let highScore = 0;
let currentCoins = 0; // Use a variable to hold current coins, load/save from localStorage
let firstAidCooldownCounter = 0; let evasionCooldownCounter = 0; let horizontalArcCooldownCounter = 0; let horizontalSquareCooldownCounter = 0; let deadlySinsCooldownCounter = 0;
let selectedPlayerImage = 'Images/they_them.jpg';
let currentChampionSpawnChance = INITIAL_CHAMPION_SPAWN_CHANCE; // Use initial chance by default
let wasAfterCombat = false;
let selectedBackpackIndex = -1;

// Skill Tooltips (unchanged)
const skillTooltips = {
    'horizontal-button': { name: 'Horizontal Strike', level: 1, desc: 'A basic horizontal sword slash.', effect: 'Deals physical damage based on STR and weapon stats, reduced by enemy DEF.', cost: 'Action', cooldown: 0 },
    'horizontal-arc-button': { name: 'Horizontal Arc', level: HORIZONTAL_ARC_LEVEL, desc: 'A wider slash hitting multiple times.', effect: `Deals ${HORIZONTAL_ARC_HITS} hits at ${MULTI_HIT_DAMAGE_MULTIPLIER*100}% damage each.`, cost: 'Action', cooldown: HORIZONTAL_ARC_COOLDOWN },
    'horizontal-square-button': { name: 'Horizontal Square', level: HORIZONTAL_SQUARE_LEVEL, desc: 'A rapid four-hit combo.', effect: `Deals ${HORIZONTAL_SQUARE_HITS} hits at ${MULTI_HIT_DAMAGE_MULTIPLIER*100}% damage each.`, cost: 'Action', cooldown: HORIZONTAL_SQUARE_COOLDOWN },
    'deadly-sins-button': { name: 'Deadly Sins', level: DEADLY_SINS_LEVEL, desc: 'A devastating seven-hit sword skill.', effect: `Deals ${DEADLY_SINS_HITS} hits at ${MULTI_HIT_DAMAGE_MULTIPLIER*100}% damage each.`, cost: 'Action', cooldown: DEADLY_SINS_COOLDOWN },
    'evasion-button': { name: 'Evasion', level: 1, desc: 'Temporarily increases dodge chance.', effect: `Increases Dodge Chance by ${EVASION_DODGE_BONUS*100}% for ${EVASION_DURATION} turns (max ${EVASION_MAX_CAP*100}%).`, cost: 'Instant', cooldown: EVASION_COOLDOWN },
    'first-aid-button': { name: 'First Aid', level: 1, desc: 'Heals a portion of maximum HP.', effect: `Restores ${FIRST_AID_HEAL_PERCENT*100}% of Max HP.`, cost: 'Instant', cooldown: FIRST_AID_COOLDOWN },
    'flee-button': { name: 'Flee', level: 1, desc: 'Attempt to escape from a powerful foe.', effect: `Allows escape from Champions with a ${FLEE_CHANCE*100}% chance (increases with failed attempts). Fails otherwise.`, cost: 'Action', cooldown: 0 },
};

// --- Screen Transition Functions (unchanged) ---
function showStartScreen() { startScreen.classList.add('active'); gameScreen.classList.remove('active'); console.log("Showing Start Screen"); }
function showGameScreen() { startScreen.classList.remove('active'); gameScreen.classList.add('active'); console.log("Showing Game Screen"); }

// --- Helper Functions (unchanged) ---
function getRandomInt(min, max) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min + 1)) + min; }
function randomizeStat(baseValue, variationPercent) { if (baseValue === 0) return 0; const variation = baseValue * variationPercent; const randomVariation = (Math.random() * variation * 2) - variation; let randomizedValue = baseValue + randomVariation; if (Number.isInteger(baseValue)) { randomizedValue = Math.max(1, Math.round(randomizedValue)); } else { randomizedValue = Math.max(0, parseFloat(randomizedValue.toFixed(3))); } return randomizedValue; }
function randomizeItemStats(baseStats, category) { const randomizedStats = {}; const existingStatKeys = []; for (const statKey in baseStats) { if (baseStats.hasOwnProperty(statKey)) { existingStatKeys.push(statKey); randomizedStats[statKey] = randomizeStat(baseStats[statKey], ITEM_STAT_VARIATION_PERCENT); } } if (category === 'accessory') { const possibleExtraStats = Object.keys(SECONDARY_ACCESSORY_STATS); if (Math.random() < ACCESSORY_2ND_STAT_CHANCE) { let availableStats = possibleExtraStats.filter(stat => !existingStatKeys.includes(stat)); if (availableStats.length > 0) { const chosenStatKey = availableStats[getRandomInt(0, availableStats.length - 1)]; const baseValue = SECONDARY_ACCESSORY_STATS[chosenStatKey]; randomizedStats[chosenStatKey] = randomizeStat(baseValue, ITEM_STAT_VARIATION_PERCENT); existingStatKeys.push(chosenStatKey); console.log(`Accessory rolled 2nd stat: ${chosenStatKey}`); if (Math.random() < ACCESSORY_3RD_STAT_CHANCE) { availableStats = possibleExtraStats.filter(stat => !existingStatKeys.includes(stat)); if (availableStats.length > 0) { const chosenStatKey3 = availableStats[getRandomInt(0, availableStats.length - 1)]; const baseValue3 = SECONDARY_ACCESSORY_STATS[chosenStatKey3]; randomizedStats[chosenStatKey3] = randomizeStat(baseValue3, ITEM_STAT_VARIATION_PERCENT); console.log(`Accessory rolled 3rd stat: ${chosenStatKey3}`); } } } } } return randomizedStats; }
function randomizeStatsHigh(baseStats) { const randomizedStats = {}; for (const statKey in baseStats) { if (baseStats.hasOwnProperty(statKey)) { const baseValue = baseStats[statKey]; if (baseValue === 0) { randomizedStats[statKey] = 0; continue; } const variation = baseValue * ITEM_STAT_VARIATION_PERCENT; const randomVariation = Math.random() * variation; let randomizedValue = baseValue + randomVariation; if (Number.isInteger(baseValue)) { randomizedStats[statKey] = Math.max(1, Math.round(randomizedValue)); } else { randomizedStats[statKey] = Math.max(0, parseFloat(randomizedValue.toFixed(3))); } } } return randomizedStats; }
function getBaseItemDataById(itemId) { for (const category in equipmentCatalog) { if (equipmentCatalog.hasOwnProperty(category) && Array.isArray(equipmentCatalog[category])) { const item = equipmentCatalog[category].find(i => i && i.id === itemId); if (item) return item; } else { console.warn(`Equipment category '${category}' is missing or not an array.`); } } console.warn(`Base Item data not found for ID: ${itemId}`); return null; }
function generateAccessoryName(baseName) { const prefix = accessoryPrefixes[getRandomInt(0, accessoryPrefixes.length - 1)]; return `${prefix} ${baseName}`; }
function formatStatName(key) { switch (key) { case 'maxHp': return 'Max HP'; case 'str': return 'STR'; case 'def': return 'DEF'; case 'minDmg': return 'Min DMG'; case 'maxDmg': return 'Max DMG'; case 'dodge': return 'Dodge'; case 'critChance': return 'Crit Chance'; case 'critDamageMultiplier': return 'Crit Damage'; default: return key.toUpperCase(); } }

// --- Core Game Logic ---
// Calculate player's total stats including base stats, equipment, and temporary effects
function calculateTotalStats() {
    // Ensure base stats are initialized
    player.baseMaxHp = player.baseMaxHp ?? INITIAL_PLAYER_STATE.maxHp;
    player.baseStr = player.baseStr ?? INITIAL_PLAYER_STATE.str;
    player.baseDef = player.baseDef ?? INITIAL_PLAYER_STATE.def;
    player.baseMinDmg = player.baseMinDmg ?? INITIAL_PLAYER_STATE.minDamage;
    player.baseMaxDmg = player.baseMaxDmg ?? INITIAL_PLAYER_STATE.maxDamage;
    player.baseCritChance = player.baseCritChance ?? INITIAL_PLAYER_STATE.critChance;
    player.baseCritDamageMultiplier = player.baseCritDamageMultiplier ?? INITIAL_PLAYER_STATE.critDamageMultiplier;

    // Reset current stats to base stats
    player.maxHp = player.baseMaxHp;
    player.str = player.baseStr;
    player.def = player.baseDef;
    player.minDamage = player.baseMinDmg;
    player.maxDamage = player.baseMaxDmg;
    player.critChance = player.baseCritChance;
    player.critDamageMultiplier = player.baseCritDamageMultiplier;

    // Apply equipment stats
    let dodgeBonusFromEquipment = 0;
    for (const slot in player.equipment) {
        const equippedItem = player.equipment[slot];
        if (equippedItem && equippedItem.stats) {
            const itemStats = equippedItem.stats;
            player.maxHp += itemStats.maxHp || 0;
            player.str += itemStats.str || 0;
            player.def += itemStats.def || 0;
            player.minDamage += itemStats.minDmg || 0;
            player.maxDamage += itemStats.maxDmg || 0;
            dodgeBonusFromEquipment += itemStats.dodge || 0;
            player.critChance += itemStats.critChance || 0;
            player.critDamageMultiplier += itemStats.critDamageMultiplier || 0;
        }
    }

    // Apply Disease debuff (only if turns left > 0)
    // Store the potentially modified STR/DEF before applying other temp debuffs
    let strBeforeTempDebuffs = player.str;
    let defBeforeTempDebuffs = player.def;
    if (player.diseaseTurnsLeft > 0) {
        strBeforeTempDebuffs = Math.max(0, Math.floor(strBeforeTempDebuffs * DISEASE_ATK_MULT));
        defBeforeTempDebuffs = Math.max(0, Math.floor(defBeforeTempDebuffs * DISEASE_DEF_MULT));
    }

    // Apply temporary debuffs to the potentially disease-modified stats
    if (player.attackDownTurns > 0) {
        player.str = Math.max(0, Math.floor(strBeforeTempDebuffs * player.attackDownMultiplier));
    } else {
         player.str = strBeforeTempDebuffs; // Use the value potentially modified by disease only
    }
    if (player.defenseDownTurns > 0) {
        player.def = Math.max(0, Math.floor(defBeforeTempDebuffs * player.defenseDownMultiplier));
    } else {
        player.def = defBeforeTempDebuffs; // Use the value potentially modified by disease only
    }


    // Calculate final dodge chance
    let levelDodgeBonus = DODGE_PER_LEVEL * (player.level - 1);
    player.dodgeChance = Math.min(BASE_DODGE_CHANCE + levelDodgeBonus + dodgeBonusFromEquipment, MAX_DODGE_CHANCE);

    // Apply Evasion buff
    if (player.evasionActive) { player.dodgeChance = Math.min(player.dodgeChance + EVASION_DODGE_BONUS, EVASION_MAX_CAP); }

    // Ensure HP doesn't exceed max
    player.hp = Math.min(player.hp, player.maxHp);
}

// Removed adjustPlayerEnemyHeight function


// Update the player's stats display on the screen
function updatePlayerStatDisplay() {
    if (!player || typeof player.hp === 'undefined') { console.error("Player data missing for display."); return; }
    playerNameDisplay.textContent = player.name; // Update player name
    playerImageElement.src = selectedPlayerImage;
    playerLevelElement.textContent = player.level;
    playerXpElement.textContent = player.xp;
    playerXpNeededElement.textContent = player.xpToNextLevel;
    playerHpElement.textContent = Math.max(0, player.hp);
    playerMaxHpElement.textContent = player.maxHp;

    // --- Calculate Base Stats (Including Equipment) for Display ---
    let displayBaseStr = player.baseStr ?? 0;
    let displayBaseDef = player.baseDef ?? 0;
    for (const slot in player.equipment) {
        const item = player.equipment[slot];
        if (item?.stats) {
            displayBaseStr += item.stats.str || 0;
            displayBaseDef += item.stats.def || 0;
        }
    }

    // --- Display STR with Debuff Indicator ---
    const isStrDebuffed = player.attackDownTurns > 0 || player.diseaseTurnsLeft > 0;
    if (isStrDebuffed && player.str < displayBaseStr) {
        playerStrDisplayElement.innerHTML = `STR: ${displayBaseStr} (<span class="debuffed-stat">${player.str}</span>)`;
    } else {
        playerStrDisplayElement.innerHTML = `STR: ${player.str}`;
    }

    // --- Display DEF with Debuff Indicator ---
    const isDefDebuffed = player.defenseDownTurns > 0 || player.diseaseTurnsLeft > 0;
    if (isDefDebuffed && player.def < displayBaseDef) {
        playerDefDisplayElement.innerHTML = `DEF: ${displayBaseDef} (<span class="debuffed-stat">${player.def}</span>)`;
    } else {
        playerDefDisplayElement.innerHTML = `DEF: ${player.def}`;
    }

    // --- Display Other Stats ---
    playerDodgeElement.textContent = (player.dodgeChance * 100).toFixed(1);
    playerCritChanceElement.textContent = (player.critChance * 100).toFixed(1);
    playerCritDamageElement.textContent = Math.round(player.critDamageMultiplier * 100);
    playerMinDmgElement.textContent = player.minDamage;
    playerMaxDmgElement.textContent = player.maxDamage;
    currentLevelValueElement.textContent = player.level;

    // --- Update Debuff Indicator Icons ---
    let debuffIconText = "";
    if (player.stunTurnsLeft > 0) debuffIconText += "[Stunned] ";
    if (player.poisonTurnsLeft > 0) debuffIconText += "[Poisoned] ";
    if (player.burnTurnsLeft > 0) debuffIconText += "[Burning] ";
    if (player.attackDownTurns > 0) debuffIconText += "[ATK Down] ";
    if (player.defenseDownTurns > 0) debuffIconText += "[DEF Down] ";
    if (player.diseaseTurnsLeft > 0) debuffIconText += "[Diseased] ";
    playerDebuffIndicator.textContent = debuffIconText.trim();

    // --- Update DoT Indicator near HP ---
    let dotText = "";
    if (player.poisonTurnsLeft > 0) {
        dotText += `(-${HORNET_VENOM_DAMAGE} Poison/${player.poisonTurnsLeft}t) `;
    }
    if (player.burnTurnsLeft > 0) {
        dotText += `(-${player.burnDamagePerTurn} Burn/${player.burnTurnsLeft}t) `;
    }
    if (player.bleedTurnsLeft > 0) {
        dotText += `(-${player.bleedDamagePerTurn} Bleed/${player.bleedTurnsLeft}t) `;
    }
    playerDotIndicatorElement.textContent = dotText.trim();


    // --- Update Other UI ---
    updateSkillButtons();
    updateEquippedDisplay(); // Update simple display
    displayInventory(); // Update the integrated inventory display
    // Removed call to adjustStatBlockHeights
}

// Update the enemy's stats display (simplified)
function updateEnemyStatDisplay() {
     if (!enemy || typeof enemy.hp === 'undefined') {
         enemyNameElement.textContent = "---";
         enemyHpElement.textContent = "---";
         enemyMaxHpElement.textContent = "---";
         enemyStrElement.textContent = "---";
         enemyDefElement.textContent = "---";
         enemyDodgeElement.textContent = "---";
         enemyImageElement.src = 'https://placehold.co/80x80/2c3e50/ecf0f1?text=Defeated';
         enemyImageElement.alt = "No Enemy";
         if (enemyDebuffIndicator) enemyDebuffIndicator.textContent = "";
         // Removed call to adjustStatBlockHeights
         return;
     }
     enemyNameElement.textContent = enemy.name || "Unknown";
     enemyHpElement.textContent = Math.max(0, enemy.hp);
     enemyMaxHpElement.textContent = enemy.maxHp;
     enemyStrElement.textContent = enemy.str;
     enemyDefElement.textContent = enemy.def;
     enemyDodgeElement.textContent = (enemy.dodgeChance * 100).toFixed(1);
     enemyImageElement.src = enemy.imageSrc || 'https://placehold.co/80x80/2c3e50/ecf0f1?text=Enemy';
     enemyImageElement.alt = (enemy.name || "Enemy") + " Character";
     enemyImageElement.onerror = function() { this.src = 'https://placehold.co/80x80/2c3e50/ecf0f1?text=Enemy'; }; // Fallback for enemy image

     let debuffText = "";
     if (enemy.evasionActive) debuffText += "[Evasive] ";
     if (enemyDebuffIndicator) enemyDebuffIndicator.textContent = debuffText.trim();

     // Removed call to adjustStatBlockHeights
}
// Update the simple equipment display row (unchanged)
function updateEquippedDisplay() { if (!player || !player.equipment) { console.error("Player equipment data missing."); return; } const weaponItem = player.equipment.weapon; const armorItem = player.equipment.armor; const accessoryItem = player.equipment.accessory; const getItemDisplay = (item) => { if (!item) return { name: "None", className: "" }; const name = item.name || item.baseName || "Unknown"; const tierClass = `item-tier-${item.tier || 'low'}`; return { name: name, className: tierClass }; }; const weaponDisplay = getItemDisplay(weaponItem); equippedWeaponElement.innerHTML = `<span class="${weaponDisplay.className}">${weaponDisplay.name}</span>`; const armorDisplay = getItemDisplay(armorItem); equippedArmorElement.innerHTML = `<span class="${armorDisplay.className}">${armorDisplay.name}</span>`; const accessoryDisplay = getItemDisplay(accessoryItem); equippedAccessoryElement.innerHTML = `<span class="${accessoryDisplay.className}">${accessoryDisplay.name}</span>`; }

// Log message function (unchanged)
function logMessage(newMessage) { const messageContainer = document.getElementById('message'); if (!messageContainer) return; const wasScrolledToBottom = messageContainer.scrollHeight - messageContainer.clientHeight <= messageContainer.scrollTop + 1; const p = document.createElement('p'); p.innerHTML = newMessage; messageContainer.appendChild(p); while (messageContainer.children.length > MESSAGE_LIMIT) { messageContainer.removeChild(messageContainer.firstChild); } if (wasScrolledToBottom) { messageContainer.scrollTop = messageContainer.scrollHeight; } }
// Spawn enemy function - Updated scaling logic
function spawnEnemy() {
    player.fleeAttemptsThisEncounter = 0; // Reset flee attempts for new enemy
    let possibleEnemies = [];
    let spawnChampion = false;
    const playerLevelNum = Number(player.level) || 1;

    // --- Champion Spawn Logic ---
    if (playerLevelNum >= CHAMPION_MIN_LEVEL_SPAWN && Math.random() < currentChampionSpawnChance) {
        const championEnemies = enemyCatalog.filter(e => e && e.tier === 'champion' && e.minLevel <= playerLevelNum);
        if (championEnemies.length > 0) {
            possibleEnemies = championEnemies;
            spawnChampion = true;
            console.log(`Champion spawn triggered (Chance: ${currentChampionSpawnChance*100}%). Possible: ${possibleEnemies.map(e=>e.name).join(', ')}`);
        } else {
            console.warn("Champion spawn triggered, but no suitable champions found.");
        }
    }

    // --- Regular Enemy Spawn Logic ---
    if (!spawnChampion) {
        let currentTier = 'low';
        if (playerLevelNum > TIER_LEVELS.mid) { currentTier = 'high'; }
        else if (playerLevelNum > TIER_LEVELS.low) { currentTier = 'mid'; }
        console.log(`Player level ${playerLevelNum}, targeting tier: ${currentTier}`);
        possibleEnemies = enemyCatalog.filter(e => e && e.tier === currentTier && e.minLevel <= playerLevelNum);
        if (possibleEnemies.length === 0 && currentTier === 'high') { console.log(`No high tier enemies, trying mid tier...`); currentTier = 'mid'; possibleEnemies = enemyCatalog.filter(e => e && e.tier === currentTier && e.minLevel <= playerLevelNum); }
        if (possibleEnemies.length === 0 && currentTier === 'mid') { console.log(`No mid tier enemies, trying low tier...`); currentTier = 'low'; possibleEnemies = enemyCatalog.filter(e => e && e.tier === currentTier && e.minLevel <= playerLevelNum); }
        if (possibleEnemies.length === 0) { console.error(`ERROR: No suitable regular enemies found for player level ${playerLevelNum}!`); logMessage("<span style='color:red;'>Error: No enemies available to spawn!</span>"); horizontalButton.disabled = true; updateSkillButtons(); return; }
         console.log(`Possible regular enemies (Tier: ${currentTier}): ${possibleEnemies.map(e=>e.name).join(', ')}`);
    }
    const randomIndex = getRandomInt(0, possibleEnemies.length - 1);
    const baseEnemy = possibleEnemies[randomIndex];
    if (!baseEnemy) { console.error(`ERROR: Failed to get baseEnemy (Index: ${randomIndex}).`); logMessage("<span style='color:red;'>Error: Could not select an enemy!</span>"); return; }
    console.log(`Spawning: ${baseEnemy.name} (Tier: ${baseEnemy.tier})`);
    enemy = { ...baseEnemy }; enemy.fireDancerBurnCooldown = 0; enemy.metalSlimeFleeAttempts = 0;
    let levelForScaling = playerLevelNum;
    if (enemy.tier === 'champion') { enemy.spawnedAtPlayerLevel = playerLevelNum; levelForScaling = enemy.spawnedAtPlayerLevel; }

    // *** Apply Scaling based on Tier ***
    const playerLevelFactor = Math.max(0, levelForScaling - 1);
    const baseHp = Number(baseEnemy.hp) || 50;
    const baseStr = Number(baseEnemy.str) || 1;
    const baseDef = Number(baseEnemy.def) || 0;
    const baseXp = Number(baseEnemy.xpValue) || 10;

    let hpScale = ENEMY_HP_SCALE_PER_LEVEL;
    let strScale = ENEMY_STR_SCALE_PER_LEVEL; // Separate scale for STR
    let defScale = ENEMY_DEF_SCALE_PER_LEVEL; // Separate scale for DEF
    let xpScale = ENEMY_XP_SCALE_PER_LEVEL;

    if (baseEnemy.tier === 'low') {
        hpScale = LOW_TIER_ENEMY_HP_SCALE;
        strScale = LOW_TIER_ENEMY_STAT_SCALE; // Use factor for STR
        defScale = LOW_TIER_ENEMY_STAT_SCALE * 0.5; // DEF scales half as much
        xpScale = LOW_TIER_ENEMY_XP_SCALE;
        console.log("Applying low-tier scaling factors.");
    }

    enemy.hp = Math.max(1, Math.floor(baseHp * (1 + (hpScale * playerLevelFactor))));
    enemy.maxHp = enemy.hp;
    enemy.str = Math.floor(baseStr + (strScale * playerLevelFactor)); // Apply STR scale
    enemy.def = Math.floor(baseDef + (defScale * playerLevelFactor)); // Apply DEF scale
    enemy.xpValue = Math.floor(baseXp * (1 + (xpScale * playerLevelFactor)));
    // ------------------------------------

    enemy.dodgeChance = Number(baseEnemy.dodgeChance) || BASE_DODGE_CHANCE;
    enemy.minDamage = Number(baseEnemy.minDamage) || 1;
    enemy.maxDamage = Number(baseEnemy.maxDamage) || 2;
    console.log(`Scaled Stats (Lvl ${levelForScaling}): HP=${enemy.hp}/${enemy.maxHp}, STR=${enemy.str}, DEF=${enemy.def}, XP=${enemy.xpValue}`);
    enemy.isCharging = false; enemy.isGodCharging = false; enemy.evasionActive = false; enemy.evasionDuration = 0;
    updateEnemyStatDisplay(); const announceLevel = enemy.tier === 'champion' ? levelForScaling : playerLevelNum; if (enemy.tier === 'champion') { logMessage(`<span style='color: red; font-weight: bold;'>A powerful Level ${announceLevel} ${enemy.name} appears!</span>`); } else { logMessage(`A wild Level ${announceLevel} ${enemy.name} appears!`); } if (fleeButton) { fleeButton.classList.toggle('hidden', enemy.tier !== 'champion'); fleeButton.disabled = (enemy.tier !== 'champion'); } horizontalButton.disabled = false; updateSkillButtons();
}
// Decrement cooldowns function (unchanged)
function decrementCooldowns() { if (evasionCooldownCounter > 0) { evasionCooldownCounter--; evasionButton.textContent = `Evasion (${evasionCooldownCounter})`; if (evasionCooldownCounter <= 0) { evasionButton.disabled = false; evasionButton.textContent = "Evasion"; logMessage("<span style='color:cyan;'>Evasion ready!</span>"); } } if (firstAidCooldownCounter > 0) { firstAidCooldownCounter--; firstAidButton.textContent = `First Aid (${firstAidCooldownCounter})`; if (firstAidCooldownCounter <= 0) { firstAidButton.disabled = false; firstAidButton.textContent = "First Aid"; logMessage("<span style='color:lightgreen;'>First Aid ready!</span>"); } } if (horizontalArcCooldownCounter > 0) { horizontalArcCooldownCounter--; horizontalArcButton.textContent = `H. Arc (${horizontalArcCooldownCounter})`; if (horizontalArcCooldownCounter <= 0) { horizontalArcButton.disabled = player.level < HORIZONTAL_ARC_LEVEL; horizontalArcButton.textContent = "Horizontal Arc"; if (!horizontalArcButton.disabled) logMessage("<span style='color:lightblue;'>Horizontal Arc ready!</span>"); } } if (horizontalSquareCooldownCounter > 0) { horizontalSquareCooldownCounter--; horizontalSquareButton.textContent = `H. Square (${horizontalSquareCooldownCounter})`; if (horizontalSquareCooldownCounter <= 0) { horizontalSquareButton.disabled = player.level < HORIZONTAL_SQUARE_LEVEL; horizontalSquareButton.textContent = "Horizontal Square"; if (!horizontalSquareButton.disabled) logMessage("<span style='color:lightblue;'>Horizontal Square ready!</span>"); } } if (deadlySinsCooldownCounter > 0) { deadlySinsCooldownCounter--; deadlySinsButton.textContent = `D. Sins (${deadlySinsCooldownCounter})`; if (deadlySinsCooldownCounter <= 0) { deadlySinsButton.disabled = player.level < DEADLY_SINS_LEVEL; deadlySinsButton.textContent = "Deadly Sins"; if (!deadlySinsButton.disabled) logMessage("<span style='color:violet;'>Deadly Sins ready!</span>"); } } if (enemy && enemy.name === "Fire Dancer" && enemy.fireDancerBurnCooldown > 0) { enemy.fireDancerBurnCooldown--; } }
// Apply player status effects function - Added call to handlePlayerDefeatSequence
function applyPlayerStatusEffects() {
    let stillAlive = true; // Assume player survives

    // Apply Burn Damage
    if (stillAlive && player.burnTurnsLeft > 0) {
        const burnDmg = player.burnDamagePerTurn;
        player.hp = Math.max(0, player.hp - burnDmg); // Apply damage
        player.burnTurnsLeft--; // Decrement duration
        logMessage(`<span class="special-message burn-message">Burning! Took ${burnDmg} damage (${player.burnTurnsLeft} turns left)</span>`);
        updatePlayerStatDisplay(); // Update HP display
        if (player.hp <= 0) { // Check for defeat
            logMessage("<span style='color:red; font-weight:bold;'>Succumbed to burns! GAME OVER.</span>");
            handlePlayerDefeatSequence(); // Call defeat sequence
            stillAlive = false; // Player defeated
        }
         if (player.burnTurnsLeft <= 0) { // If burn ended
            player.burnDamagePerTurn = 0; // Reset damage
            logMessage("<span class='special-message debuff-faded-message'>The burning stopped.</span>");
        }
    }

    // Apply Poison Damage
    if (stillAlive && player.poisonTurnsLeft > 0) {
        const poisonDamage = HORNET_VENOM_DAMAGE;
        player.hp = Math.max(0, player.hp - poisonDamage);
        player.poisonTurnsLeft--;
        logMessage(`<span style="color:purple;">Venom deals ${poisonDamage} damage! (${player.poisonTurnsLeft} turns left)</span>`);
        updatePlayerStatDisplay();
        if (player.hp <= 0) {
            logMessage("<span style='color:red; font-weight:bold;'>Succumbed to venom! GAME OVER.</span>");
            handlePlayerDefeatSequence(); // Call defeat sequence
            stillAlive = false;
        }
    }

    // Apply Bleed Damage (if implemented)
    if (stillAlive && player.bleedTurnsLeft > 0) {
        const bleedDamage = player.bleedDamagePerTurn;
        player.hp = Math.max(0, player.hp - bleedDamage);
        player.bleedTurnsLeft--;
        logMessage(`<span style="color:red;">Bleeding deals ${bleedDamage} damage! (${player.bleedTurnsLeft} turns left)</span>`);
        updatePlayerStatDisplay();
        if (player.hp <= 0) {
            logMessage("<span style='color:red; font-weight:bold;'>Bled out! GAME OVER.</span>");
             handlePlayerDefeatSequence(); // Call defeat sequence
            stillAlive = false;
        }
        if (player.bleedTurnsLeft <= 0) {
            player.bleedDamagePerTurn = 0;
            logMessage("Bleeding stops.");
        }
    }

    return stillAlive; // Return whether player survived
}
// Enemy turn logic - Updated Disease application & Defeat sequence call
function enemyTurn() {
    if (player.hp <= 0 || !enemy || enemy.hp <= 0) { console.log("Enemy turn skipped."); return; }
    console.log(`Enemy turn: ${enemy.name}`);
    let enemyActionTaken = false; let usedModifyingSkill = false;
    if (enemy.name === "Metal Slime") { enemy.metalSlimeFleeAttempts++; const currentFleeChance = METAL_SLIME_BASE_FLEE_CHANCE * enemy.metalSlimeFleeAttempts; console.log(`Metal Slime flee attempt ${enemy.metalSlimeFleeAttempts}, chance: ${currentFleeChance * 100}%`); if (Math.random() < currentFleeChance) { logMessage(`<span style='color:grey;'>The ${enemy.name} fled!</span>`); spawnEnemy(); return; } }
    if (enemy.tier === 'champion') { if (enemy.name === "Boar God") { if (player.defenseDownTurns <= 0 && Math.random() < GOD_GORE_CHANCE) { player.defenseDownTurns = DEBUFF_DURATION; player.defenseDownMultiplier = 1 - DEFENSE_DOWN_PERCENT; logMessage(`<span class="special-message debuff-applied-message">${enemy.name} uses God Gore! Your Defense is lowered!</span>`); calculateTotalStats(); updatePlayerStatDisplay(); enemyActionTaken = true; } else if (Math.random() < GOD_CHARGE_CHANCE && !enemy.isGodCharging) { enemy.isGodCharging = true; logMessage(`<span style='color:darkred; font-weight:bold;'>${enemy.name} lowers its tusks, preparing God Charge!</span>`); usedModifyingSkill = true; enemyActionTaken = true; } } else if (enemy.name === "Alpha Dire Wolf") { if (player.attackDownTurns <= 0 && Math.random() < WEAKENING_HOWL_CHANCE) { player.attackDownTurns = DEBUFF_DURATION; player.attackDownMultiplier = 1 - ATTACK_DOWN_PERCENT; logMessage(`<span class="special-message debuff-applied-message">${enemy.name} lets out a Weakening Howl! Your Attack is lowered!</span>`); calculateTotalStats(); updatePlayerStatDisplay(); enemyActionTaken = true; } else if (player.stunTurnsLeft <= 0 && Math.random() < ALPHA_POUNCE_CHANCE) { player.stunTurnsLeft = STUN_DURATION; logMessage(`<span style='color:orange; font-weight:bold;'>${enemy.name} uses Alpha Pounce! You are stunned!</span>`); enemyActionTaken = true; } } }
    if (!enemyActionTaken && enemy.tier !== 'champion') { if (enemy.name === "Hornet" && player.poisonTurnsLeft <= 0 && Math.random() < HORNET_VENOM_CHANCE) { player.poisonTurnsLeft = HORNET_VENOM_DURATION; logMessage(`<span style="color:purple;">${enemy.name} injects venom! You are poisoned!</span>`); enemyActionTaken = true; } else if (enemy.name === "Kobold" && Math.random() < KOBOLD_EVASION_CHANCE && !enemy.evasionActive) { enemy.evasionActive = true; enemy.evasionDuration = KOBOLD_EVASION_DURATION; logMessage(`<span style="color:teal;">${enemy.name} nimbly dodges, becoming evasive!</span>`); updateEnemyStatDisplay(); enemyActionTaken = true; } else if (enemy.name === "Wild Boar" && Math.random() < BOAR_CHARGE_CHANCE && !enemy.isCharging) { enemy.isCharging = true; logMessage(`<span style="color:red;">${enemy.name} paws the ground, preparing to charge!</span>`); usedModifyingSkill = true; enemyActionTaken = true; } else if (enemy.name === "Fire Dancer" && enemy.fireDancerBurnCooldown <= 0 && Math.random() < BURN_CHANCE) { if (player.burnTurnsLeft <= 0) { player.burnTurnsLeft = BURN_DURATION; player.burnDamagePerTurn = BURN_DAMAGE; logMessage(`<span class="special-message burn-message">${enemy.name} uses Fiery Dance! You are burned!</span>`); } else { player.burnTurnsLeft = BURN_DURATION; logMessage(`<span class="special-message burn-message">${enemy.name}'s Fiery Dance intensifies the burn!</span>`); } enemy.fireDancerBurnCooldown = BURN_COOLDOWN; enemyActionTaken = true; } }
    if (!enemyActionTaken) {
        console.log("Enemy performing standard attack."); const playerDodgeRoll = Math.random(); const currentP_Dodge = player.dodgeChance || 0;
        if (playerDodgeRoll < currentP_Dodge) { logMessage(`<span style='color: cyan;'>You dodged ${enemy.name}'s attack!</span>`); if (enemy.isCharging) { enemy.isCharging = false; logMessage(`${enemy.name}'s charge misses!`); } if (enemy.isGodCharging) { enemy.isGodCharging = false; logMessage(`${enemy.name}'s God Charge misses!`); } }
        else {
            let potentialEnemyDamage = getRandomInt(enemy.minDamage, enemy.maxDamage) + enemy.str; let attackMessage = `${enemy.name} attacks!`; let isCrit = false; if (Math.random() < CRITICAL_HIT_CHANCE) { potentialEnemyDamage = Math.floor(potentialEnemyDamage * CRITICAL_HIT_MULTIPLIER); isCrit = true; } if (enemy.isCharging) { potentialEnemyDamage = Math.floor(potentialEnemyDamage * (1 + BOAR_CHARGE_BONUS)); attackMessage = `${enemy.name}'s <span style='color:red;'>Charge</span> connects!`; enemy.isCharging = false; } else if (enemy.isGodCharging) { potentialEnemyDamage = Math.floor(potentialEnemyDamage * (1 + GOD_CHARGE_BONUS)); attackMessage = `${enemy.name}'s <span style='color:darkred; font-weight:bold;'>God Charge</span> slams into you!`; enemy.isGodCharging = false; } let finalEnemyDamage = Math.max(1, potentialEnemyDamage - player.def); player.hp = Math.max(0, player.hp - finalEnemyDamage); updatePlayerStatDisplay(); let damageLog = `${attackMessage} You take ${finalEnemyDamage} damage!`; if (isCrit) { damageLog = `${attackMessage} <span class='critical-hit'>Critical Hit!</span> You take ${finalEnemyDamage} damage!`; } logMessage(damageLog);
            // *** Disease Application Logic ***
            if (enemy.name === "Infected Zombie" && player.diseaseTurnsLeft <= 0 && Math.random() < DISEASE_CHANCE) { // Check if not already diseased
                player.diseaseTurnsLeft = DEBUFF_DURATION; // Apply disease for duration
                logMessage(`<span class="special-message debuff-applied-message">You've been infected with Disease! Attack and Defense lowered!</span>`);
                calculateTotalStats(); updatePlayerStatDisplay(); // Update stats/display immediately
            }
            if (player.hp <= 0) {
                logMessage("<span style='color:red; font-weight:bold;'>Defeated! GAME OVER.</span>");
                handlePlayerDefeatSequence(); // Call defeat sequence
                return; // Stop turn processing
            }
        }
    }
    console.log("Enemy turn finished.");
}
// Handle player action taken function - Updated Disease decrement
function handlePlayerActionTaken() {
    console.log("--- Post-Player Action ---"); let statsChanged = false;
    if (player.stunTurnsLeft > 0) { player.stunTurnsLeft--; if (player.stunTurnsLeft <= 0) { logMessage("You are no longer stunned."); statsChanged = true; } else { logMessage(`Still stunned for ${player.stunTurnsLeft} more turn(s).`); } }
    if (player.defenseDownTurns > 0) { player.defenseDownTurns--; if (player.defenseDownTurns <= 0) { player.defenseDownMultiplier = 1; logMessage("<span class='special-message debuff-faded-message'>Defense Down faded!</span>"); statsChanged = true; } }
    if (player.attackDownTurns > 0) { player.attackDownTurns--; if (player.attackDownTurns <= 0) { player.attackDownMultiplier = 1; logMessage("<span class='special-message debuff-faded-message'>Attack Down faded!</span>"); statsChanged = true; } }
    // *** Disease Decrement Logic ***
    if (player.diseaseTurnsLeft > 0) {
        player.diseaseTurnsLeft--;
        if (player.diseaseTurnsLeft <= 0) {
            logMessage("<span class='special-message debuff-faded-message'>Disease faded!</span>");
            statsChanged = true; // Recalculate stats when disease wears off
        }
    }
    const playerSurvivedStatus = applyPlayerStatusEffects(); if (!playerSurvivedStatus) { console.log("Player died from status effects."); return; }
    if (player.evasionActive) { player.evasionDuration--; if (player.evasionDuration <= 0) { player.evasionActive = false; logMessage("Your heightened evasion wore off."); statsChanged = true; } }
    if (statsChanged) { calculateTotalStats(); updatePlayerStatDisplay(); }
    if (enemy && enemy.evasionActive) { enemy.evasionDuration--; if (enemy.evasionDuration <= 0) { enemy.evasionActive = false; enemy.evasionDuration = 0; logMessage(`${enemy.name} is no longer evasive.`); updateEnemyStatDisplay(); } }
    if (player.hp > 0 && enemy?.hp > 0) { decrementCooldowns(); console.log("Scheduling enemy turn..."); setTimeout(enemyTurn, 600); }
    else if (player.hp > 0 && (!enemy || enemy.hp <= 0)) { console.log("Enemy defeated, decrementing player cooldowns."); decrementCooldowns(); }
    console.log("--- End Post-Player Action ---");
}

// --- Player Action Handlers (Combat) ---
// Updated Attack Handlers for Metal Slime Crit
function handleHorizontalClick() {
    if (player.stunTurnsLeft > 0) { logMessage("You are stunned!"); handlePlayerActionTaken(); return; }
    console.log("--- Horizontal Strike ---");
    if (!enemy || enemy.hp <= 0) { logMessage("No enemy."); return; }
    if (enemy.evasionActive) { logMessage(`Attack misses! ${enemy.name} is evasive!`); handlePlayerActionTaken(); return; }
    if (Math.random() < enemy.dodgeChance) { logMessage(`<span style='color: orange;'>${enemy.name} dodged!</span>`); handlePlayerActionTaken(); return; }

    let damageDealt = getRandomInt(player.minDamage, player.maxDamage) + player.str;
    let message = `You hit ${enemy.name} with Horizontal Strike for`;
    let isCrit = false;
    let enemyDefense = enemy.def; // Use actual defense by default

    if (Math.random() < player.critChance) {
        damageDealt = Math.floor(damageDealt * player.critDamageMultiplier);
        message += ` <span class='critical-hit'>Critical Hit!</span>`;
        isCrit = true;
        // *** Metal Slime Crit Logic ***
        if (enemy.name === "Metal Slime") {
            console.log("Crit vs Metal Slime! Ignoring high defense.");
            enemyDefense = 1; // Treat defense as 1 for crit damage calculation
        }
    }

    damageDealt = Math.max(1, damageDealt - enemyDefense); // Apply defense (potentially modified)
    enemy.hp = Math.max(0, enemy.hp - damageDealt);
    enemyHpElement.textContent = enemy.hp;
    logMessage(`${message} ${damageDealt} damage!`);

    if (enemy.hp <= 0) { handleEnemyDefeat(); } else { handlePlayerActionTaken(); }
}

function handleHorizontalArcClick() {
    if (player.stunTurnsLeft > 0) { logMessage("You are stunned!"); handlePlayerActionTaken(); return; }
    if (player.level < HORIZONTAL_ARC_LEVEL) { logMessage("Level not high enough!"); return; }
    if (horizontalArcCooldownCounter > 0) { logMessage(`On cooldown (${horizontalArcCooldownCounter} turns).`); return; }
    if (!enemy || enemy.hp <= 0) { logMessage("No enemy."); return; }
    console.log("--- Horizontal Arc ---");
    logMessage("You use <span style='color:lightblue;'>Horizontal Arc</span>!");
    let enemyDefeated = false;
    for (let i = 1; i <= HORIZONTAL_ARC_HITS && !enemyDefeated; i++) {
        if (enemy.evasionActive || Math.random() < enemy.dodgeChance) { logMessage(`&nbsp;&nbsp;<span style='color: orange;'>Hit ${i} missed!</span>`); continue; }

        let hitDamage = Math.floor(getRandomInt(player.minDamage, player.maxDamage) * MULTI_HIT_DAMAGE_MULTIPLIER + player.str);
        let hitMessage = `&nbsp;&nbsp;Hit ${i} deals`;
        let isCrit = false;
        let enemyDefense = enemy.def;

        if (Math.random() < player.critChance) {
            hitDamage = Math.floor(hitDamage * player.critDamageMultiplier);
            hitMessage += ` <span class='critical-hit'>Critical Hit!</span>`;
            isCrit = true;
            if (enemy.name === "Metal Slime") { enemyDefense = 1; console.log("Crit vs Metal Slime!");}
        }

        hitDamage = Math.max(1, hitDamage - enemyDefense);
        enemy.hp = Math.max(0, enemy.hp - hitDamage);
        enemyHpElement.textContent = enemy.hp;
        logMessage(`${hitMessage} ${hitDamage} damage!`);
        if (enemy.hp <= 0) { enemyDefeated = true; }
    }
    horizontalArcCooldownCounter = HORIZONTAL_ARC_COOLDOWN;
    horizontalArcButton.disabled = true;
    horizontalArcButton.textContent = `H. Arc (${horizontalArcCooldownCounter})`;
    if (enemyDefeated) { handleEnemyDefeat(); } else { handlePlayerActionTaken(); }
}

function handleHorizontalSquareClick() {
    if (player.stunTurnsLeft > 0) { logMessage("You are stunned!"); handlePlayerActionTaken(); return; }
    if (player.level < HORIZONTAL_SQUARE_LEVEL) { logMessage("Level not high enough!"); return; }
    if (horizontalSquareCooldownCounter > 0) { logMessage(`On cooldown (${horizontalSquareCooldownCounter} turns).`); return; }
    if (!enemy || enemy.hp <= 0) { logMessage("No enemy."); return; }
    console.log("--- Horizontal Square ---");
    logMessage("You use <span style='color:lightblue;'>Horizontal Square</span>!");
    let enemyDefeated = false;
    for (let i = 1; i <= HORIZONTAL_SQUARE_HITS && !enemyDefeated; i++) {
        if (enemy.evasionActive || Math.random() < enemy.dodgeChance) { logMessage(`&nbsp;&nbsp;<span style='color: orange;'>Hit ${i} missed!</span>`); continue; }

        let hitDamage = Math.floor(getRandomInt(player.minDamage, player.maxDamage) * MULTI_HIT_DAMAGE_MULTIPLIER + player.str);
        let hitMessage = `&nbsp;&nbsp;Hit ${i} deals`;
        let isCrit = false;
        let enemyDefense = enemy.def;

        if (Math.random() < player.critChance) {
            hitDamage = Math.floor(hitDamage * player.critDamageMultiplier);
            hitMessage += ` <span class='critical-hit'>Critical Hit!</span>`;
            isCrit = true;
             if (enemy.name === "Metal Slime") { enemyDefense = 1; console.log("Crit vs Metal Slime!");}
        }

        hitDamage = Math.max(1, hitDamage - enemyDefense);
        enemy.hp = Math.max(0, enemy.hp - hitDamage);
        enemyHpElement.textContent = enemy.hp;
        logMessage(`${hitMessage} ${hitDamage} damage!`);
        if (enemy.hp <= 0) { enemyDefeated = true; }
    }
    horizontalSquareCooldownCounter = HORIZONTAL_SQUARE_COOLDOWN;
    horizontalSquareButton.disabled = true;
    horizontalSquareButton.textContent = `H. Square (${horizontalSquareCooldownCounter})`;
    if (enemyDefeated) { handleEnemyDefeat(); } else { handlePlayerActionTaken(); }
}

function handleDeadlySinsClick() {
    if (player.stunTurnsLeft > 0) { logMessage("You are stunned!"); handlePlayerActionTaken(); return; }
    if (player.level < DEADLY_SINS_LEVEL) { logMessage("Level not high enough!"); return; }
    if (deadlySinsCooldownCounter > 0) { logMessage(`On cooldown (${deadlySinsCooldownCounter} turns).`); return; }
    if (!enemy || enemy.hp <= 0) { logMessage("No enemy."); return; }
    console.log("--- Deadly Sins ---");
    logMessage("You unleash <span style='color:violet; font-weight:bold;'>Deadly Sins</span>!");
    let enemyDefeated = false;
    for (let i = 1; i <= DEADLY_SINS_HITS && !enemyDefeated; i++) {
        if (enemy.evasionActive || Math.random() < enemy.dodgeChance) { logMessage(`&nbsp;&nbsp;<span style='color: orange;'>Hit ${i} missed!</span>`); continue; }

        let hitDamage = Math.floor(getRandomInt(player.minDamage, player.maxDamage) * MULTI_HIT_DAMAGE_MULTIPLIER + player.str);
         let hitMessage = `&nbsp;&nbsp;Hit ${i} deals`;
        let isCrit = false;
        let enemyDefense = enemy.def;

        if (Math.random() < player.critChance) {
            hitDamage = Math.floor(hitDamage * player.critDamageMultiplier);
            hitMessage += ` <span class='critical-hit'>Critical Hit!</span>`;
            isCrit = true;
             if (enemy.name === "Metal Slime") { enemyDefense = 1; console.log("Crit vs Metal Slime!");}
        }

        hitDamage = Math.max(1, hitDamage - enemyDefense);
        enemy.hp = Math.max(0, enemy.hp - hitDamage);
        enemyHpElement.textContent = enemy.hp;
        logMessage(`${hitMessage} ${hitDamage} damage!`);
        if (enemy.hp <= 0) { enemyDefeated = true; }
    }
    deadlySinsCooldownCounter = DEADLY_SINS_COOLDOWN;
    deadlySinsButton.disabled = true;
    deadlySinsButton.textContent = `D. Sins (${deadlySinsCooldownCounter})`;
    if (enemyDefeated) { handleEnemyDefeat(); } else { handlePlayerActionTaken(); }
}
// Other action handlers (Evasion, First Aid) remain unchanged
function handleEvasionClick() { if (player.stunTurnsLeft > 0) { logMessage("You are stunned!"); return; } console.log("--- Evasion (Instant) ---"); if (evasionCooldownCounter > 0) { logMessage(`On cooldown (${evasionCooldownCounter} turns).`); return; } if (player.evasionActive) { logMessage("Already active."); return; } player.evasionActive = true; player.evasionDuration = EVASION_DURATION; evasionCooldownCounter = EVASION_COOLDOWN; evasionButton.disabled = true; evasionButton.textContent = `Evasion (${evasionCooldownCounter})`; logMessage("<span style='color: cyan;'>You focus, becoming more evasive! (Instant)</span>"); calculateTotalStats(); updatePlayerStatDisplay(); }
function handleFirstAidClick() { if (player.stunTurnsLeft > 0) { logMessage("You are stunned!"); return; } console.log("--- First Aid (Instant) ---"); if (firstAidCooldownCounter > 0) { logMessage(`On cooldown (${firstAidCooldownCounter} turns).`); return; } if (player.hp >= player.maxHp) { logMessage("Already full health."); return; } const healAmount = Math.floor(player.maxHp * FIRST_AID_HEAL_PERCENT); const oldHp = player.hp; player.hp = Math.min(player.maxHp, player.hp + healAmount); const actualHeal = player.hp - oldHp; firstAidCooldownCounter = FIRST_AID_COOLDOWN; firstAidButton.disabled = true; firstAidButton.textContent = `First Aid (${firstAidCooldownCounter})`; logMessage(`<span style='color: lightgreen;'>Recovered ${actualHeal} HP! (Instant)</span>`); updatePlayerStatDisplay(); }
// Flee action - Updated flee chance calculation
function handleFleeClick() {
    if (player.stunTurnsLeft > 0) { logMessage("You are stunned!"); handlePlayerActionTaken(); return; }
    if (!enemy || enemy.hp <= 0) { logMessage("No enemy."); return; }
     if (enemy.tier !== 'champion') { logMessage("Can only attempt to flee from powerful Champion enemies!"); return; }

    console.log("--- Flee ---");
    // Calculate current flee chance
    const currentFleeChance = Math.min(1.0, FLEE_CHANCE + (player.fleeAttemptsThisEncounter * FLEE_CHANCE_INCREASE)); // Cap at 100%
    logMessage(`Attempting to flee (Chance: ${(currentFleeChance * 100).toFixed(0)}%)...`);

    if (Math.random() < currentFleeChance) {
        logMessage("<span style='color:yellow;'>You successfully fled!</span>");
        player.fleeAttemptsThisEncounter = 0; // Reset attempts on success
        spawnEnemy(); // Spawn a new enemy
        handlePlayerActionTaken(); // Fleeing counts as an action, process end-of-turn
    }
    else {
        logMessage("<span style='color:red;'>Your attempt to flee failed!</span>");
        player.fleeAttemptsThisEncounter++; // Increment attempts on failure
        // Failing to flee also counts as an action, proceed to end-of-turn effects
        handlePlayerActionTaken();
    }
}

// --- Item Handling ---
// Add item to backpack if space allows
function addItemToBackpack(itemData) {
    if (!itemData) return false;

    // Add quantity property if missing (for items coming from equipment)
    if (itemData.quantity === undefined) {
        itemData.quantity = 1;
    }

    // Check for stacking
    if (itemData.stackable) {
        const existingStackIndex = player.backpack.findIndex(
            item => item.id === itemData.id // Find item with the same ID
        );
        if (existingStackIndex !== -1) {
            player.backpack[existingStackIndex].quantity += itemData.quantity; // Add to existing stack
            const tierClass = `item-tier-${itemData.tier || 'low'}`;
            logMessage(`<span class="item-drop-message">Added x${itemData.quantity} <span class="${tierClass}">${itemData.name || itemData.baseName}</span> to backpack stack.</span>`);
            displayInventory();
            return true;
        }
    }

    // If not stackable or no existing stack found, add as new item if space
    if (player.backpack.length < MAX_BACKPACK_SIZE) {
        player.backpack.push(itemData); // Add new item object (already has quantity: 1)
        const tierClass = `item-tier-${itemData.tier || 'low'}`;
        logMessage(`<span class="item-drop-message">Added <span class="${tierClass}">${itemData.name || itemData.baseName}</span> to backpack.</span>`);
        displayInventory();
        return true;
    } else {
        const tierClass = `item-tier-${itemData.tier || 'low'}`;
        logMessage(`<span style="color:orange;">Backpack full! Could not pick up <span class="${tierClass}">${itemData.name || itemData.baseName}</span>.</span>`);
        return false;
    }
}


// Handle enemy defeat - Added Champion check for spawn chance reduction
function handleEnemyDefeat() {
    if (!enemy) return;
    const defeatedEnemyName = enemy.name;
    const defeatedEnemyTier = enemy.tier; // Store tier before clearing enemy object

    logMessage(`<span style="color:lime; font-weight:bold;">Defeated ${defeatedEnemyName}!</span>`);
    const xpGained = Number(enemy.xpValue) || 0;
    if (xpGained > 0) { player.xp += xpGained; logMessage(`Gained ${xpGained} XP!`); }
    wasAfterCombat = true;
    player.fleeAttemptsThisEncounter = 0; // Reset flee attempts after combat ends

    // *** Reduce champion spawn chance ONLY if a champion was defeated ***
    if (defeatedEnemyTier === 'champion') {
        currentChampionSpawnChance = SUBSEQUENT_CHAMPION_SPAWN_CHANCE;
        console.log(`Champion defeated! Spawn chance reduced to ${currentChampionSpawnChance*100}%`);
        showVictoryNotification(`[Victory!] You defeated ${defeatedEnemyName}! You loot a rare treasure!`); // Show notification
    }

    const leveledUp = checkLevelUp();
    if (!leveledUp) { updatePlayerStatDisplay(); } // Update display if no level up (level up handles its own update)
    let itemGenerated = false;
    if (defeatedEnemyName === "Metal Slime") { itemGenerated = handleGuaranteedMaxStatDrop(); }
    else if (Math.random() < ITEM_DROP_CHANCE) { itemGenerated = handleItemDrop(); }

    // Drop consumables sometimes
    if (Math.random() < 0.15) { // 15% chance to drop a potion
         const potionTierRoll = Math.random();
         let potionId;
         if (potionTierRoll < 0.6) potionId = 'c_heal_low'; // 60% for low
         else if (potionTierRoll < 0.9) potionId = 'c_heal_mid'; // 30% for mid
         else potionId = 'c_heal_high'; // 10% for high

         const potionData = equipmentCatalog.consumable.find(p => p.id === potionId);
         if (potionData) {
             addItemToBackpack({ ...potionData, quantity: 1 }); // Add one potion
         }
    }


    logMessage("Prepare for the next battle...");
    const delay = itemGenerated ? 1500 : 1000;
    setTimeout(() => { spawnEnemy(); decrementCooldowns(); wasAfterCombat = false; }, delay);
    enemy = null;
    updateEnemyStatDisplay();
}

// Generate a random item drop and add to backpack
function handleItemDrop() {
    const playerLevel = player.level;
    let tier = 'low';
    if (playerLevel > TIER_LEVELS.mid) { tier = 'high'; }
    else if (playerLevel > TIER_LEVELS.low) { tier = 'mid'; }
    const possibleCategories = ['weapon', 'armor', 'accessory']; // Exclude consumable from random drops for now
    const chosenCategory = possibleCategories[getRandomInt(0, possibleCategories.length - 1)];
    const possibleItems = equipmentCatalog[chosenCategory]?.filter(item => item && item.tier === tier) || [];
    if (possibleItems.length > 0) {
        const baseItemData = { ...possibleItems[getRandomInt(0, possibleItems.length - 1)] };
        const droppedItemData = { ...baseItemData };
        if (droppedItemData.category === 'accessory' && droppedItemData.baseName) { droppedItemData.name = generateAccessoryName(droppedItemData.baseName); }
        else if (!droppedItemData.name) { droppedItemData.name = `${tier} ${chosenCategory}`; }
        if (droppedItemData.stats) { droppedItemData.stats = randomizeItemStats(droppedItemData.stats, droppedItemData.category); }
        else { droppedItemData.stats = {}; }
        droppedItemData.quantity = 1; // Equipment always drops as 1
        return addItemToBackpack(droppedItemData);
    } else { console.warn(`No items found for category '${chosenCategory}' tier '${tier}'.`); return false; }
}

// Generate a guaranteed high-stat drop and add to backpack
function handleGuaranteedMaxStatDrop() {
    const tier = 'mid';
    const possibleCategories = ['weapon', 'armor', 'accessory'];
    const chosenCategory = possibleCategories[getRandomInt(0, possibleCategories.length - 1)];
    const possibleItems = equipmentCatalog[chosenCategory]?.filter(item => item && item.tier === tier) || [];
    if (possibleItems.length > 0) {
        const baseItemData = { ...possibleItems[getRandomInt(0, possibleItems.length - 1)] };
        const droppedItemData = { ...baseItemData };
        if (droppedItemData.category === 'accessory' && droppedItemData.baseName) { droppedItemData.name = generateAccessoryName(droppedItemData.baseName); }
        else if (!droppedItemData.name) { droppedItemData.name = `${tier} ${chosenCategory}`; }
        if (droppedItemData.stats) { droppedItemData.stats = randomizeStatsHigh(droppedItemData.stats); }
        else { droppedItemData.stats = {}; }
        droppedItemData.quantity = 1; // Equipment always drops as 1
        return addItemToBackpack(droppedItemData);
    } else { console.warn(`No mid-tier items for Metal Slime drop.`); return false; }
}

// --- Inventory UI Functions ---
// Removed openInventory and closeInventory

// Populate the inventory display (now always visible)
function displayInventory() {
    if (!player || !player.equipment || !player.backpack) { console.error("Cannot display inventory: Player data missing."); return; }

    // --- Update Equipped Gear Section ---
    const slots = ['weapon', 'armor', 'accessory'];
    const equippedElements = { weapon: { nameEl: invEquippedWeapon, imgEl: invEquippedWeaponImg }, armor: { nameEl: invEquippedArmor, imgEl: invEquippedArmorImg }, accessory: { nameEl: invEquippedAccessory, imgEl: invEquippedAccessoryImg }, };
    const imagePaths = { weapon: { low: 'Images/LT_1h_sword.jpg', mid: 'Images/MT_1H_sword.png', high: 'Images/HT_1H_sword.jpg', default: 'https://placehold.co/40x40/a52a2a/eee?text=WPN' }, armor: { low: 'Images/LT_leatherarmor.jpg', mid: 'Images/MT_chainmail.jpg', high: 'Images/HT_platemail.jpg', default: 'https://placehold.co/40x40/708090/eee?text=ARM' }, accessory: { low: 'Images/LT_accessories.jpg', mid: 'Images/MT_accessories.jpg', high: 'Images/HT_accessories.jpg', default: 'https://placehold.co/40x40/ffd700/333?text=ACC' }, consumable: { default: 'Images/healing_potion.jpg'} }; // Added consumable path
    slots.forEach(slot => {
        const item = player.equipment[slot];
        const els = equippedElements[slot];
        const defaultImgSrc = imagePaths[slot]?.default || 'https://placehold.co/40x40/555/eee?text=ERR'; // Define default here
        if (item) {
            const tierClass = `item-tier-${item.tier || 'low'}`;
            const name = item.name || item.baseName || "Unknown";
            els.nameEl.innerHTML = `${slot.charAt(0).toUpperCase() + slot.slice(1)}: <span class="${tierClass}">${name}</span>`;
            els.imgEl.src = imagePaths[slot]?.[item.tier] || defaultImgSrc; // Use defined default
            els.imgEl.alt = name;
            // Add onerror fallback for equipped items too
            els.imgEl.onerror = function() { this.src = defaultImgSrc; };
        } else {
            els.nameEl.innerHTML = `${slot.charAt(0).toUpperCase() + slot.slice(1)}: <span class="item-tier-low">None</span>`;
            els.imgEl.src = defaultImgSrc;
            els.imgEl.alt = "Empty Slot";
            els.imgEl.onerror = null; // Remove handler if no image src
        }
    });
    // Update Coin Display
    playerCoinsElement.textContent = currentCoins; // Use the global coin variable


    // --- Update Backpack Grid ---
    backpackGrid.innerHTML = '';
    backpackCountSpan.textContent = player.backpack.length;
    backpackMaxSpan.textContent = MAX_BACKPACK_SIZE;
    for (let i = 0; i < MAX_BACKPACK_SIZE; i++) {
        const slotDiv = document.createElement('div');
        slotDiv.classList.add('backpack-slot');
        if (i < player.backpack.length) {
            const item = player.backpack[i];
            const tier = item.tier || 'low';
            const category = item.category || 'unknown';
            // *** Corrected Image Path Logic for Backpack ***
            const imgSrc = item.imageSrc || imagePaths[category]?.[tier] || imagePaths[category]?.default || 'https://placehold.co/40x40/555/eee?text=???';
            const defaultImgSrc = imagePaths[category]?.default || 'https://placehold.co/40x40/555/eee?text=???'; // Define default here

            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = item.name || item.baseName || category;
            // Add onerror handler for backpack images
            img.onerror = function() { this.src = defaultImgSrc; };
            slotDiv.appendChild(img);
            slotDiv.dataset.backpackIndex = i;
            slotDiv.classList.add(`item-tier-${tier}`);
            slotDiv.addEventListener('click', handleBackpackSlotClick);

            // Display quantity if > 1
            if (item.quantity > 1) {
                const quantitySpan = document.createElement('span');
                quantitySpan.classList.add('item-quantity');
                quantitySpan.textContent = item.quantity;
                slotDiv.appendChild(quantitySpan);
            }
        } else {
            slotDiv.classList.add('empty');
        }
         backpackGrid.appendChild(slotDiv);
    }

    // Clear item details initially when refreshing inventory
    clearItemSelection();
}
function handleBackpackSlotClick(event) { const targetSlot = event.currentTarget; if (!targetSlot.classList.contains('backpack-slot') || targetSlot.classList.contains('empty')) { clearItemSelection(); return; } const clickedIndex = parseInt(targetSlot.dataset.backpackIndex, 10); if (isNaN(clickedIndex) || clickedIndex < 0 || clickedIndex >= player.backpack.length) { console.warn("Invalid backpack index clicked."); clearItemSelection(); return; } const previouslySelected = backpackGrid.querySelector('.selected'); if (previouslySelected) { previouslySelected.classList.remove('selected'); } targetSlot.classList.add('selected'); selectedBackpackIndex = clickedIndex; showItemDetails(selectedBackpackIndex); }

// Clear the item details and comparison panes
function clearItemSelection() {
    equippedItemComparisonDiv.innerHTML = '<h4>Currently Equipped</h4><p>N/A</p>'; // Clear equipped comparison
    selectedItemDetailsDiv.innerHTML = '<h4>Selected Item</h4><p>Select an item from backpack.</p>'; // Clear selected details
    itemDetailActionsDiv.classList.add('hidden'); // Hide buttons
    selectedBackpackIndex = -1; // Reset selected index

    const currentlySelected = backpackGrid.querySelector('.selected');
    if (currentlySelected) {
        currentlySelected.classList.remove('selected');
    }
}

// Show details for the selected backpack item and comparison with equipped
function showItemDetails(index) {
    if (index < 0 || index >= player.backpack.length) { clearItemSelection(); return; }
    const selectedItem = player.backpack[index];
    if (!selectedItem) { clearItemSelection(); return; }

    const slot = selectedItem.category;
    const equippedItem = (slot === 'weapon' || slot === 'armor' || slot === 'accessory') ? player.equipment[slot] : null; // Get equipped only if comparable

    // --- Populate Equipped Item Comparison (Only if selected is equippable) ---
    if (equippedItem !== null) { // Check if there is an equipped item to compare against
        let equippedHTML = `<h4>Currently Equipped</h4>`;
        const eqTierClass = `item-tier-${equippedItem.tier || 'low'}`;
        equippedHTML += `<h5><span class="${eqTierClass}">${equippedItem.name || equippedItem.baseName}</span></h5>`;
        equippedHTML += `<ul>${generateStatsHTML(equippedItem)}</ul>`;
        equippedItemComparisonDiv.innerHTML = equippedHTML;
        equippedItemComparisonDiv.classList.remove('hidden');
    } else if (slot === 'weapon' || slot === 'armor' || slot === 'accessory') { // If slot is equippable but empty
         equippedItemComparisonDiv.innerHTML = '<h4>Currently Equipped</h4><p>None</p>';
         equippedItemComparisonDiv.classList.remove('hidden');
    } else { // If selected item is not equippable (e.g., consumable)
         equippedItemComparisonDiv.innerHTML = '';
         equippedItemComparisonDiv.classList.add('hidden');
    }


    // --- Populate Selected Item Details ---
    const selTierClass = `item-tier-${selectedItem.tier || 'low'}`;
    let selectedHTML = `<h4>Selected Item</h4>`;
    selectedHTML += `<h5><span class="${selTierClass}">${selectedItem.name || selectedItem.baseName}</span>${selectedItem.quantity > 1 ? ` (x${selectedItem.quantity})` : ''}</h5>`; // Show quantity if > 1
    // Show description for consumables or items with stats
    if (selectedItem.desc) {
        selectedHTML += `<p style="font-size: 0.8em; font-style: italic; color: #bdc3c7;">${selectedItem.desc}</p>`;
    }
    selectedHTML += `<ul>${generateStatsHTML(selectedItem, equippedItem)}</ul>`; // Pass equipped for comparison
    selectedItemDetailsDiv.innerHTML = selectedHTML;
    selectedItemDetailsDiv.classList.remove('hidden'); // Ensure visible

    // --- Show Appropriate Buttons ---
    itemDetailActionsDiv.classList.remove('hidden');
    if (selectedItem.category === 'consumable') {
        equipButton.classList.add('hidden');
        useButton.classList.remove('hidden');
    } else if (slot === 'weapon' || slot === 'armor' || slot === 'accessory') {
        equipButton.classList.remove('hidden');
        useButton.classList.add('hidden');
    } else { // Should not happen, but hide both if unknown category
         equipButton.classList.add('hidden');
         useButton.classList.add('hidden');
    }
    discardButton.classList.remove('hidden'); // Always show discard
}

// Helper function to generate HTML list of stats for an item, optionally comparing
function generateStatsHTML(item, compareToItem = null) {
    let statsHTML = '';
    let hasStats = false;
    if (item && item.stats) {
        for (const statKey in item.stats) {
            if (item.stats.hasOwnProperty(statKey)) {
                const statValue = item.stats[statKey];
                const numericValue = parseFloat(statValue);
                if (!isNaN(numericValue) && numericValue !== 0) {
                    hasStats = true;
                    const formattedName = formatStatName(statKey);
                    let formattedValue = "";
                    let comparisonClass = '';

                    // Format value
                    if (statKey === 'dodge' || statKey === 'critChance') {
                        formattedValue = `+${(numericValue * 100).toFixed(1)}%`;
                    } else if (statKey === 'critDamageMultiplier') {
                        formattedValue = `+${Math.round((numericValue - 1) * 100)}%`; // Show bonus %
                    } else {
                        const roundedValue = Number.isInteger(numericValue) ? numericValue : parseFloat(numericValue.toFixed(1));
                        formattedValue = roundedValue > 0 ? `+${roundedValue}` : `${roundedValue}`;
                    }

                    // Add comparison indicators if comparing
                    if (compareToItem && compareToItem.stats && compareToItem.stats.hasOwnProperty(statKey)) {
                        const equippedValue = parseFloat(compareToItem.stats[statKey] || 0);
                        if (numericValue > equippedValue) comparisonClass = 'positive';
                        if (numericValue < equippedValue) comparisonClass = 'negative';
                    }

                    statsHTML += `<li><strong class="${comparisonClass}">${formattedValue}</strong> ${formattedName}</li>`;
                }
            }
        }
    }
    // Show effect description for consumables if no regular stats
    if (!hasStats && item?.category === 'consumable' && item.effect) {
        // Example: Display heal percentage
        if (item.effect.healPercent) {
             statsHTML += `<li>Heals ${item.effect.healPercent * 100}% Max HP</li>`;
             hasStats = true; // Mark as having stats/effect to prevent "No Stats" message
        }
        // Add more 'else if' blocks here for other consumable effects (e.g., buffs)
    }

    if (!hasStats) { statsHTML += "<li>No Stats</li>"; }
    return statsHTML;
}


function handleEquipFromBackpack() {
    if (selectedBackpackIndex < 0 || selectedBackpackIndex >= player.backpack.length) { console.warn("No valid item selected to equip."); return; }
    const itemToEquip = player.backpack[selectedBackpackIndex];
    // Ensure it's actually equippable
    if (itemToEquip.category !== 'weapon' && itemToEquip.category !== 'armor' && itemToEquip.category !== 'accessory') {
        logMessage(`<span style='color:orange;'>Cannot equip a ${itemToEquip.category}.</span>`);
        return;
    }
    const slot = itemToEquip.category;
    if (!slot || !player.equipment.hasOwnProperty(slot)) { console.error(`Cannot equip item: Invalid category "${slot}"`); logMessage(`<span style='color:orange;'>Error: Cannot equip this item type.</span>`); return; }
    const currentlyEquippedItem = player.equipment[slot];
    player.equipment[slot] = { ...itemToEquip, quantity: 1 }; // Equip a copy with quantity 1
    const equipTierClass = `item-tier-${itemToEquip.tier || 'low'}`;
    logMessage(`Equipped <span class="${equipTierClass}">${itemToEquip.name || itemToEquip.baseName}</span>.`);
    player.backpack.splice(selectedBackpackIndex, 1); // Remove from backpack
    if (currentlyEquippedItem) {
        addItemToBackpack({ ...currentlyEquippedItem, quantity: 1 }); // Add old item back with quantity 1
    }
    calculateTotalStats();
    updatePlayerStatDisplay();
    displayInventory();
}

// Handle discarding an item from the backpack - Added Coin Logic
function handleDiscardFromBackpack() {
    if (selectedBackpackIndex < 0 || selectedBackpackIndex >= player.backpack.length) {
        console.warn("No valid item selected to discard.");
        return;
    }

    const itemToDiscard = player.backpack[selectedBackpackIndex];
    const discardTierClass = `item-tier-${itemToDiscard.tier || 'low'}`;
    const coinValue = COIN_VALUES[itemToDiscard.tier] || 0; // Get coin value based on tier

    // Remove the item from the backpack array
    player.backpack.splice(selectedBackpackIndex, 1);

    // Add coins
    currentCoins += coinValue; // Add to the global variable
    saveCoins(); // Save the new total

    logMessage(`Discarded <span class="${discardTierClass}">${itemToDiscard.name || itemToDiscard.baseName}</span> for ${coinValue} coin(s).`);

    // Update inventory display (this also clears selection and updates coin display)
    displayInventory();
    updatePlayerStatDisplay(); // Update main stats as well (in case coins affect something later)
}

// Handle using a consumable item
function handleUseItemClick() {
    if (selectedBackpackIndex < 0 || selectedBackpackIndex >= player.backpack.length) {
        console.warn("No valid item selected to use.");
        return;
    }
    const itemToUse = player.backpack[selectedBackpackIndex];

    if (itemToUse.category !== 'consumable') {
        logMessage("Cannot use this item.");
        return;
    }

    // Apply effect (currently only healPercent)
    if (itemToUse.effect?.healPercent) {
        if (player.hp >= player.maxHp) {
            logMessage("Already at full health.");
            return; // Don't use if already full
        }
        const healAmount = Math.floor(player.maxHp * itemToUse.effect.healPercent);
        const oldHp = player.hp;
        player.hp = Math.min(player.maxHp, player.hp + healAmount);
        const actualHeal = player.hp - oldHp;
        logMessage(`<span style='color: lightgreen;'>Used ${itemToUse.name}. Recovered ${actualHeal} HP!</span>`);
        updatePlayerStatDisplay(); // Update HP display immediately
    } else {
        logMessage(`Used ${itemToUse.name}, but it had no effect.`); // Placeholder for other effects
    }

    // Decrement quantity or remove item
    itemToUse.quantity--;
    if (itemToUse.quantity <= 0) {
        player.backpack.splice(selectedBackpackIndex, 1); // Remove item from array
    }

    displayInventory(); // Refresh inventory (clears selection, updates counts)
}


// --- Coin Storage Functions ---
function loadCoins() {
    const savedCoins = localStorage.getItem('aincradCoins');
    currentCoins = parseInt(savedCoins, 10) || 0; // Load into global variable
    console.log(`Loaded coins: ${currentCoins}`);
}
function saveCoins() {
     if (typeof currentCoins === 'number') {
        localStorage.setItem('aincradCoins', currentCoins.toString());
        console.log(`Saved coins: ${currentCoins}`);
    } else {
        console.error("Attempted to save invalid coin amount:", currentCoins);
    }
}

// --- Player Defeat Sequence ---
function handlePlayerDefeatSequence() {
    if (player.level > highScore) {
        highScore = player.level;
        saveHighScore();
        logMessage(`New highest level: ${highScore}!`);
    }

    let coinsGained = 0;
    logMessage("<span style='color:orange;'>Your equipment shatters upon defeat...</span>");

    // Iterate through equipment, add coins, clear slot
    for (const slot in player.equipment) {
        const item = player.equipment[slot];
        if (item) {
            const coinValue = COIN_VALUES[item.tier] || 0;
            coinsGained += coinValue;
            const tierClass = `item-tier-${item.tier || 'low'}`;
            logMessage(`Lost <span class="${tierClass}">${item.name || item.baseName}</span>, gained ${coinValue} coin(s).`);
            player.equipment[slot] = null; // Remove item
        }
    }

    currentCoins += coinsGained; // Add gained coins to total
    saveCoins(); // Save the updated total
    player.fleeAttemptsThisEncounter = 0; // Reset flee attempts on defeat

    // Disable actions
    horizontalButton.disabled = true;
    updateSkillButtons();
    evasionButton.disabled = true;
    firstAidButton.disabled = true;
    if(fleeButton) fleeButton.disabled = true;

    // Update displays (including coins)
    updatePlayerStatDisplay();
    updateEquippedDisplay(); // Update the quick view row
    displayInventory(); // Update the detailed inventory view
}


// --- Game Management ---
function resetGame() {
    console.log("--- Resetting game ---");
    loadCoins(); // Load persistent coins FIRST
    loadHighScore(); // Load high score

    player = JSON.parse(JSON.stringify(INITIAL_PLAYER_STATE));
    player.coins = currentCoins; // Set loaded coins onto the new player object
    // Get player name from input or use default
    player.name = playerNameInput.value.trim() || "Player";
    playerNameInput.value = player.name; // Update input field in case default was used

    player.equipment = { weapon: null, armor: null, accessory: null };
    player.backpack = [];
    // Set base stats
    player.baseMaxHp = INITIAL_PLAYER_STATE.maxHp; player.baseStr = INITIAL_PLAYER_STATE.str; player.baseDef = INITIAL_PLAYER_STATE.def; player.baseMinDmg = INITIAL_PLAYER_STATE.minDamage; player.baseMaxDmg = INITIAL_PLAYER_STATE.maxDamage;
    player.baseCritChance = INITIAL_PLAYER_STATE.critChance;
    player.baseCritDamageMultiplier = INITIAL_PLAYER_STATE.critDamageMultiplier;
    player.hp = player.baseMaxHp;
    // Reset dynamic state
    player.dodgeChance = BASE_DODGE_CHANCE; player.evasionActive = false; player.evasionDuration = 0;
    player.poisonTurnsLeft = 0; player.bleedTurnsLeft = 0; player.bleedDamagePerTurn = 0; player.stunTurnsLeft = 0;
    player.defenseDownTurns = 0; player.defenseDownMultiplier = 1; player.attackDownTurns = 0; player.attackDownMultiplier = 1;
    player.burnTurnsLeft = 0; player.burnDamagePerTurn = 0;
    player.diseaseTurnsLeft = 0; // Reset disease counter
    player.fleeAttemptsThisEncounter = 0; // Reset flee attempts
    firstAidCooldownCounter = 0; evasionCooldownCounter = 0; horizontalArcCooldownCounter = 0; horizontalSquareCooldownCounter = 0; deadlySinsCooldownCounter = 0;
    currentChampionSpawnChance = INITIAL_CHAMPION_SPAWN_CHANCE; // Reset spawn chance
    wasAfterCombat = false;
    selectedBackpackIndex = -1;
    calculateTotalStats(); player.hp = player.maxHp; updatePlayerStatDisplay(); // Calls displayInventory
    const messageContainer = document.getElementById('message');
    if (messageContainer) messageContainer.innerHTML = '';
    logMessage(`Game Started. Welcome, ${player.name}! Prepare for battle!`);
    firstAidButton.disabled = false; firstAidButton.textContent = "First Aid";
    evasionButton.disabled = false; evasionButton.textContent = "Evasion";
    horizontalButton.disabled = false; updateSkillButtons();
     if(fleeButton) { fleeButton.classList.add('hidden'); fleeButton.disabled = true; }
     updateHighScoreDisplay(); // Update high score display
    spawnEnemy();
    console.log("--- Game Reset Complete ---", player);
}
function handlePlayerChoiceChange(event) { if (event.target.value) { selectedPlayerImage = event.target.value; console.log("Selected player image:", selectedPlayerImage); } }
function loadHighScore() { const savedScore = localStorage.getItem('aincradHighScore'); highScore = parseInt(savedScore, 10) || 0; console.log(`Loaded high score: ${highScore}`); }
function saveHighScore() { if (typeof highScore === 'number') { localStorage.setItem('aincradHighScore', highScore.toString()); console.log(`Saved high score: ${highScore}`); } else { console.error("Invalid high score:", highScore); } }
function updateHighScoreDisplay() { if (highScoreValueElement) { highScoreValueElement.textContent = highScore; } }
function resetHighScore() { console.log("Resetting high score."); highScore = 0; saveHighScore(); updateHighScoreDisplay(); logMessage("Highest level record reset."); }
function levelUp() { const oldLevel = player.level; player.level++; logMessage(`<span style="color: yellow; font-weight: bold;">Level Up! Reached Level ${player.level}!</span>`); if (oldLevel < HORIZONTAL_ARC_LEVEL && player.level >= HORIZONTAL_ARC_LEVEL) { logMessage(`<span class="special-message skill-learned-message">Learned: Horizontal Arc!</span>`); } if (oldLevel < HORIZONTAL_SQUARE_LEVEL && player.level >= HORIZONTAL_SQUARE_LEVEL) { logMessage(`<span class="special-message skill-learned-message">Learned: Horizontal Square!</span>`); } if (oldLevel < DEADLY_SINS_LEVEL && player.level >= DEADLY_SINS_LEVEL) { logMessage(`<span class="special-message skill-learned-message">Learned: Deadly Sins!</span>`); } player.baseMaxHp += 10; player.baseStr += getRandomInt(1, 2); player.baseDef += getRandomInt(1, 2); const minDmgIncrease = getRandomInt(1, 2); const maxDmgIncrease = getRandomInt(1, 2); player.baseMinDmg += minDmgIncrease; player.baseMaxDmg += Math.max(minDmgIncrease, maxDmgIncrease); calculateTotalStats(); player.hp = player.maxHp; logMessage("<span style='color:lime;'>HP fully restored!</span>"); player.xpToNextLevel = Math.floor(player.xpToNextLevel * XP_LEVEL_MULTIPLIER); if (player.level > highScore) { highScore = player.level; saveHighScore(); updateHighScoreDisplay(); logMessage(`New highest level: ${highScore}!`); } updatePlayerStatDisplay(); updateSkillButtons(); console.log(`Leveled up to ${player.level}.`); return true; }
function checkLevelUp() { let leveledUp = false; while (player.xp >= player.xpToNextLevel) { player.xp -= player.xpToNextLevel; leveledUp = levelUp(); } if (player.xp < 0) player.xp = 0; return leveledUp; }
function updateSkillButtons() { evasionButton.disabled = evasionCooldownCounter > 0; firstAidButton.disabled = firstAidCooldownCounter > 0; const canUseHA = player.level >= HORIZONTAL_ARC_LEVEL; horizontalArcButton.classList.toggle('hidden', !canUseHA); horizontalArcButton.disabled = !canUseHA || horizontalArcCooldownCounter > 0; const canUseHS = player.level >= HORIZONTAL_SQUARE_LEVEL; horizontalSquareButton.classList.toggle('hidden', !canUseHS); horizontalSquareButton.disabled = !canUseHS || horizontalSquareCooldownCounter > 0; const canUseDS = player.level >= DEADLY_SINS_LEVEL; deadlySinsButton.classList.toggle('hidden', !canUseDS); deadlySinsButton.disabled = !canUseDS || deadlySinsCooldownCounter > 0; if (fleeButton) { fleeButton.disabled = !enemy || enemy.tier !== 'champion' || player.hp <= 0; fleeButton.classList.toggle('hidden', !enemy || enemy.tier !== 'champion'); } if (player.hp <= 0) { horizontalButton.disabled = true; horizontalArcButton.disabled = true; horizontalSquareButton.disabled = true; deadlySinsButton.disabled = true; evasionButton.disabled = true; firstAidButton.disabled = true; if(fleeButton) fleeButton.disabled = true; } else if (player.stunTurnsLeft > 0) { horizontalButton.disabled = true; horizontalArcButton.disabled = true; horizontalSquareButton.disabled = true; deadlySinsButton.disabled = true; if(fleeButton) fleeButton.disabled = true; } else { horizontalButton.disabled = false; } }
function showTooltip(event) { const buttonId = event.target.id; const tooltipData = skillTooltips[buttonId]; if (tooltipData && tooltipElement) { let tooltipHTML = `<strong>${tooltipData.name}</strong>`; if (tooltipData.level > 1) { tooltipHTML += ` (Lvl ${tooltipData.level})`; } tooltipHTML += `<hr style="margin: 4px 0; border-top: 1px solid #7f8c8d;">`; tooltipHTML += `<p style="margin: 2px 0;">${tooltipData.desc}</p>`; tooltipHTML += `<p style="margin: 2px 0;"><em>Effect:</em> ${tooltipData.effect}</p>`; tooltipHTML += `<p style="margin: 2px 0;"><em>Cost:</em> ${tooltipData.cost}</p>`; if (tooltipData.cooldown > 0) { tooltipHTML += `<p style="margin: 2px 0;"><em>Cooldown:</em> ${tooltipData.cooldown} turns</p>`; } tooltipElement.innerHTML = tooltipHTML; tooltipElement.classList.remove('hidden'); updateTooltipPosition(event); document.addEventListener('mousemove', updateTooltipPosition); } else { hideTooltip(); if (!tooltipData) console.warn(`No tooltip data for button: ${buttonId}`); } }
function hideTooltip() { if (tooltipElement) { tooltipElement.classList.add('hidden'); document.removeEventListener('mousemove', updateTooltipPosition); } }
function updateTooltipPosition(event) { if (tooltipElement && !tooltipElement.classList.contains('hidden')) { const offsetX = 15; const offsetY = 10; let x = event.pageX + offsetX; let y = event.pageY + offsetY; const tooltipRect = tooltipElement.getBoundingClientRect(); const viewportWidth = document.documentElement.clientWidth; const viewportHeight = document.documentElement.clientHeight; if (x + tooltipRect.width > viewportWidth) { x = event.pageX - tooltipRect.width - offsetX; } if (y + tooltipRect.height > viewportHeight + window.scrollY) { y = event.pageY - tooltipRect.height - offsetY; } if (x < 0) { x = offsetX; } if (y < window.scrollY) { y = window.scrollY + offsetY; } tooltipElement.style.left = `${x}px`; tooltipElement.style.top = `${y}px`; } }

// --- Victory Notification ---
function showVictoryNotification(message) {
    victoryNotificationElement.textContent = message;
    victoryNotificationElement.classList.add('show');
    setTimeout(() => {
        victoryNotificationElement.classList.remove('show');
    }, 3500); // Hide after 3.5 seconds
}


// --- Event Listeners ---
// Action Buttons
horizontalButton.addEventListener('click', handleHorizontalClick);
evasionButton.addEventListener('click', handleEvasionClick);
firstAidButton.addEventListener('click', handleFirstAidClick);
horizontalArcButton.addEventListener('click', handleHorizontalArcClick);
horizontalSquareButton.addEventListener('click', handleHorizontalSquareClick);
deadlySinsButton.addEventListener('click', handleDeadlySinsClick);
if(fleeButton) fleeButton.addEventListener('click', handleFleeClick);
// Top Control Buttons
resetButton.addEventListener('click', resetGame);
newCharacterButton.addEventListener('click', showStartScreen);
resetHighScoreButton.addEventListener('click', resetHighScore);
// Start Screen Buttons
playerChoiceRadios.forEach(radio => { radio.addEventListener('change', handlePlayerChoiceChange); });
startGameButton.addEventListener('click', () => { showGameScreen(); resetGame(); });
changelogButton.addEventListener('click', () => {
    // Open the Google Doc link in a new tab
    window.open('https://docs.google.com/document/d/12Rn4Zxb8fIwjxyBiFS0M_kZkgLMb4lWakfq5dX1B1B4/edit?usp=sharing', '_blank');
});

// Tooltip Listeners
const actionButtons = [ horizontalButton, evasionButton, firstAidButton, horizontalArcButton, horizontalSquareButton, deadlySinsButton, fleeButton ];
actionButtons.forEach(button => { if (button) { button.addEventListener('mouseover', showTooltip); button.addEventListener('mouseout', hideTooltip); } });
// Inventory Action Listeners
equipButton.addEventListener('click', handleEquipFromBackpack);
useButton.addEventListener('click', handleUseItemClick); // Added listener for Use button
discardButton.addEventListener('click', handleDiscardFromBackpack);


// --- Initial Setup ---
console.log("Game script loaded!");
loadHighScore();
loadCoins(); // Load coins on startup
updateHighScoreDisplay();
showStartScreen(); // Show start screen initially
