document.addEventListener('DOMContentLoaded', () => { // Wait for HTML to load

    // --- DOM Elements ---
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const playerNameInput = document.getElementById('player-name-input');
    const startGameButton = document.getElementById('start-game-button');
    const playerChoiceRadios = document.querySelectorAll('input[name="playerChoice"]');
    const changelogButton = document.getElementById('changelog-button');
    const resetButton = document.getElementById('reset-button');
    const newCharacterButton = document.getElementById('new-character-button');
    const muteButton = document.getElementById('mute-button');
    const horizontalButton = document.getElementById('horizontal-button');
    const evasionButton = document.getElementById('evasion-button');
    const firstAidButton = document.getElementById('first-aid-button');
    const horizontalArcButton = document.getElementById('horizontal-arc-button');
    const horizontalSquareButton = document.getElementById('horizontal-square-button');
    const deadlySinsButton = document.getElementById('deadly-sins-button');
    const fleeButton = document.getElementById('flee-button');
    const actionRow = document.getElementById('action-row');
    const tooltipElement = document.getElementById('tooltip');
    const equippedWeaponElement = document.getElementById('equipped-weapon');
    const equippedArmorElement = document.getElementById('equipped-armor');
    const equippedHatElement = document.getElementById('equipped-hat');
    const equippedRingElement = document.getElementById('equipped-ring');
    const equippedAmuletElement = document.getElementById('equipped-amulet');
    const equippedBeltElement = document.getElementById('equipped-belt');
    const messageElement = document.getElementById('message');
    const messageLogElement = document.getElementById('message-log');
    const highScoreValueElement = document.getElementById('high-score-value');
    const currentLevelValueElement = document.getElementById('current-level-value');
    const resetHighScoreButton = document.getElementById('reset-highscore-button');
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
    const enemyHpElement = document.getElementById('enemy-hp');
    const enemyMaxHpElement = document.getElementById('enemy-max-hp');
    const enemyStrElement = document.getElementById('enemy-str');
    const enemyDefElement = document.getElementById('enemy-def');
    const enemyDodgeElement = document.getElementById('enemy-dodge');
    const enemyNameElement = document.getElementById('enemy-name');
    const enemyImageElement = document.getElementById('enemy-image');
    const enemyDebuffIndicator = document.getElementById('enemy-debuff-indicator');
    const enemyStatsBlock = document.getElementById('enemy-stats');
    const inventoryDisplay = document.getElementById('inventory-display');
    const backpackContainer = document.getElementById('backpack-container');
    const invEquippedWeapon = document.getElementById('inventory-equipped-weapon').querySelector('.item-name');
    const invEquippedArmor = document.getElementById('inventory-equipped-armor').querySelector('.item-name');
    const invEquippedHat = document.getElementById('inventory-equipped-hat').querySelector('.item-name');
    const invEquippedRing = document.getElementById('inventory-equipped-ring').querySelector('.item-name');
    const invEquippedAmulet = document.getElementById('inventory-equipped-amulet').querySelector('.item-name');
    const invEquippedBelt = document.getElementById('inventory-equipped-belt').querySelector('.item-name');
    const invEquippedWeaponImg = document.getElementById('inventory-equipped-weapon').querySelector('img');
    const invEquippedArmorImg = document.getElementById('inventory-equipped-armor').querySelector('img');
    const invEquippedHatImg = document.getElementById('inventory-equipped-hat').querySelector('img');
    const invEquippedRingImg = document.getElementById('inventory-equipped-ring').querySelector('img');
    const invEquippedAmuletImg = document.getElementById('inventory-equipped-amulet').querySelector('img');
    const invEquippedBeltImg = document.getElementById('inventory-equipped-belt').querySelector('img');
    const playerCoinsElement = document.getElementById('player-coins');
    const itemDetailsSection = document.getElementById('item-details-section');
    const equippedItemComparisonDiv = document.getElementById('equipped-item-comparison');
    const selectedItemDetailsDiv = document.getElementById('selected-item-details');
    const itemDetailActionsDiv = document.getElementById('item-detail-actions');
    const equipButton = document.getElementById('equip-button');
    const useButton = document.getElementById('use-button');
    const discardButton = document.getElementById('discard-button');
    const backpackGrid = document.getElementById('backpack-grid');
    const backpackCountSpan = document.getElementById('backpack-count');
    const backpackMaxSpan = document.getElementById('backpack-max');
    const victoryNotificationElement = document.getElementById('victory-notification');


    // --- Sound Effects (Tone.js) ---
    let isMuted = true; // Start muted by default
    // Initialize synths
    const hitSynth = new Tone.Synth({ oscillator: { type: "triangle" }, envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.1 } }).toDestination();
    const critHitSynth = new Tone.Synth({ oscillator: { type: "sawtooth" }, envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.2 }, volume: -6 }).toDestination();
    const multiHitSynth = new Tone.Synth({ oscillator: { type: "square" }, envelope: { attack: 0.005, decay: 0.05, sustain: 0.05, release: 0.08 }, volume: -10 }).toDestination();
    const skillSynth = new Tone.Synth({ oscillator: { type: "sine" }, envelope: { attack: 0.05, decay: 0.2, sustain: 0.3, release: 0.5 }, volume: -8 }).toDestination();
    const damageSynth = new Tone.Synth({ oscillator: { type: "sine" }, envelope: { attack: 0.01, decay: 0.3, sustain: 0, release: 0.1 }, volume: -5 }).toDestination();
    const potionSynth = new Tone.Synth({ oscillator: { type: "sine" }, envelope: { attack: 0.1, decay: 0.3, sustain: 0.5, release: 0.5 }, volume: -12 }).toDestination();
    const equipSynth = new Tone.Synth({ oscillator: { type: "sine" }, envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.1 }, volume: -15 }).toDestination();
    const discardSynth = new Tone.Synth({ oscillator: { type: "triangle" }, envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.1 }, volume: -18 }).toDestination();
    const levelUpSynth = new Tone.Synth({ oscillator: { type: "sine" }, envelope: { attack: 0.05, decay: 0.5, sustain: 0.2, release: 0.8 }, volume: -6 }).toDestination();
    const defeatSynth = new Tone.Synth({ oscillator: { type: "fmsquare" }, envelope: { attack: 0.1, decay: 0.8, sustain: 0.1, release: 1.0 }, volume: -3 }).toDestination();
    const fleeSynth = new Tone.Synth({ oscillator: { type: "triangle" }, envelope: { attack: 0.01, decay: 0.2, sustain: 0, release: 0.3 }, volume: -10 }).toDestination();
    const errorSynth = new Tone.Synth({ oscillator: { type: "square" }, envelope: { attack: 0.01, decay: 0.1, sustain: 0, release: 0.1 }, volume: -15 }).toDestination();
    const clickSynth = new Tone.Synth({ oscillator: { type: "sine" }, envelope: { attack: 0.005, decay: 0.05, sustain: 0, release: 0.1 }, volume: -20 }).toDestination(); // For UI clicks

    // --- Sound Playback Functions ---
    function playSound(synth, note, duration = "8n", time = "+0.05") {
        if (isMuted) return;
        if (Tone.context.state === 'running') {
            synth.triggerAttackRelease(note, duration, Tone.now() + parseFloat(time.substring(1)));
        } else {
            console.warn("AudioContext not running. Sound ignored. Interact with the page first.");
        }
    }
    function playPlayerAttackSound(isCrit = false) { if (isCrit) { playSound(critHitSynth, "G5", "16n"); } else { playSound(hitSynth, "C4", "16n"); } }
    function playMultiHitSound() { playSound(multiHitSynth, "E5", "32n"); }
    function playSkillSound() { playSound(skillSynth, "A4", "4n"); }
    function playEnemyAttackSound() { playSound(damageSynth, "F3", "8n"); }
    function playDamageSound() { playSound(damageSynth, "C3", "8n"); }
    function playPotionSound() { playSound(potionSynth, "G4", "4n"); }
    function playEquipSound() { playSound(equipSynth, "E5", "16n"); }
    function playDiscardSound() { playSound(discardSynth, "C3", "16n"); }
    function playLevelUpSound() { playSound(levelUpSynth, "C5", "2n"); playSound(levelUpSynth, "G5", "2n", "+0.1"); }
    function playDefeatSound() { playSound(defeatSynth, "C2", "1n"); }
    function playFleeSound() { playSound(fleeSynth, "A3", "8n"); }
    function playErrorSound() { playSound(errorSynth, "A2", "16n"); }
    function playClickSound() { playSound(clickSynth, "C6", "32n"); }


    // --- Game State & Configuration ---
    const MAX_BACKPACK_SIZE = 20;
    const MESSAGE_LIMIT = 50;
    const FLEE_CHANCE = 0.33;
    const FLEE_CHANCE_INCREASE = 0.10;
    const ITEM_DROP_CHANCE = 0.25; const TIER_LEVELS = { low: 5, mid: 11 };
    const BASE_DODGE_CHANCE = 0.05; const DODGE_PER_LEVEL = 0.005; const MAX_DODGE_CHANCE = 0.50;
    const EVASION_DODGE_BONUS = 0.40;
    const EVASION_DURATION = 3; const EVASION_COOLDOWN = 6; const EVASION_MAX_CAP = 0.85;
    const FIRST_AID_HEAL_PERCENT = 0.25; const FIRST_AID_COOLDOWN = 3;
    const MULTI_HIT_DAMAGE_MULTIPLIER = 0.95;
    const HORIZONTAL_ARC_LEVEL = 3;
    const HORIZONTAL_ARC_HITS = 2; const HORIZONTAL_ARC_COOLDOWN = 3;
    const HORIZONTAL_SQUARE_LEVEL = 6;
    const HORIZONTAL_SQUARE_HITS = 4; const HORIZONTAL_SQUARE_COOLDOWN = 5;
    const DEADLY_SINS_LEVEL = 11; const DEADLY_SINS_HITS = 7; const DEADLY_SINS_COOLDOWN = 13;
    const VORPAL_STRIKE_LEVEL = 16; const VORPAL_STRIKE_COOLDOWN = 12; const VORPAL_STRIKE_STUN_DURATION = 2; const VORPAL_STRIKE_BLEED_PERCENT = 0.08;
    // Enemy Scaling
    const ENEMY_HP_SCALE_PER_LEVEL = 0.15; const ENEMY_STR_SCALE_PER_LEVEL = 1; const ENEMY_DEF_SCALE_PER_LEVEL = 0.5; const ENEMY_XP_SCALE_PER_LEVEL = 0.12; // Default
    const LOW_TIER_ENEMY_HP_SCALE = 0.25;
    const LOW_TIER_ENEMY_STAT_SCALE = 1.5;
    const LOW_TIER_ENEMY_XP_SCALE = 0.20;

    const HORNET_VENOM_CHANCE = 0.25; const HORNET_VENOM_DAMAGE = 5; const HORNET_VENOM_DURATION = 2;
    const KOBOLD_EVASION_CHANCE = 0.15; const KOBOLD_EVASION_DURATION = 1; const BOAR_CHARGE_CHANCE = 0.20; const BOAR_CHARGE_BONUS = 0.25;
    const INITIAL_CHAMPION_SPAWN_CHANCE = 0.15;
    const SUBSEQUENT_CHAMPION_SPAWN_CHANCE = 0.05;
    const CHAMPION_MIN_LEVEL_SPAWN = 12;
    const DEBUFF_DURATION = 3;
    const DEFENSE_DOWN_PERCENT = 0.30;
    const ATTACK_DOWN_PERCENT = 0.30;
    const STUN_DURATION = 1;
    const GOD_CHARGE_CHANCE = 0.15; const GOD_CHARGE_BONUS = 0.40; const GOD_GORE_CHANCE = 0.20;
    const ALPHA_POUNCE_CHANCE = 0.15; const WEAKENING_HOWL_CHANCE = 0.15;
    const ALPHA_DIRE_WOLF_DODGE_BONUS = 0.02;
    const XP_LEVEL_MULTIPLIER = 1.30;
    const ITEM_STAT_VARIATION_PERCENT = 0.20;
    const BURN_CHANCE = 0.25; const BURN_DAMAGE = 8; const BURN_DURATION = 2; const BURN_COOLDOWN = 5;
    const METAL_SLIME_BASE_FLEE_CHANCE = 0.05;
    const DISEASE_CHANCE = 0.30; const DISEASE_ATK_MULT = 0.75; const DISEASE_DEF_MULT = 0.75;
    const ACCESSORY_2ND_STAT_CHANCE = 0.20;
    const ACCESSORY_3RD_STAT_CHANCE = 0.05;
    const CRITICAL_HIT_CHANCE = 0.05;
    const CRITICAL_HIT_MULTIPLIER = 1.5;
    const COIN_VALUES = { low: 1, mid: 3, high: 5, champion: 10 };
    const POTION_DROP_CHANCE = 0.20;

    // Initial player state template
    const INITIAL_PLAYER_STATE = {
        name: "Player", hp: 100, maxHp: 100, str: 5, def: 4,
        dodgeChance: BASE_DODGE_CHANCE, evasionActive: false, evasionDuration: 0,
        poisonTurnsLeft: 0, bleedTurnsLeft: 0, bleedDamagePerTurn: 0, stunTurnsLeft: 0,
        defenseDownTurns: 0, defenseDownMultiplier: 1, attackDownTurns: 0, attackDownMultiplier: 1,
        burnTurnsLeft: 0, burnDamagePerTurn: 0, diseaseTurnsLeft: 0,
        minDamage: 7, maxDamage: 12, critChance: CRITICAL_HIT_CHANCE, critDamageMultiplier: CRITICAL_HIT_MULTIPLIER,
        level: 1, xp: 0, xpToNextLevel: 80, coins: 0, fleeAttemptsThisEncounter: 0,
        // Updated equipment slots
        equipment: { weapon: null, armor: null, hat: null, ring: null, amulet: null, belt: null },
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
            { id: 'w_low_01', name: "Short Sword", category: 'weapon', tier: 'low', stats: { str: 1, minDmg: 1, maxDmg: 3 } },
            { id: 'w_mid_01', name: "Long Sword", category: 'weapon', tier: 'mid', stats: { str: 5, minDmg: 5, maxDmg: 8 } },
            { id: 'w_high_01', name: "Great Sword", category: 'weapon', tier: 'high', stats: { str: 9, minDmg: 9, maxDmg: 14 } },
        ],
        armor: [ { id: 'a_low_01', name: "Leather Jerkin", category: 'armor', tier: 'low', stats: { def: 2, maxHp: 5 } }, { id: 'a_mid_01', name: "Chain Mail", category: 'armor', tier: 'mid', stats: { def: 5, maxHp: 15 } }, { id: 'a_high_01', name: "Plate Armor", category: 'armor', tier: 'high', stats: { def: 10, maxHp: 30 } }, ],
        // Renamed accessory to hat, added ring, amulet, belt
        hat: [ { id: 'hat_low_01', baseName: "Leather Cap", category: 'hat', tier: 'low', stats: { maxHp: 5 } }, { id: 'hat_mid_01', baseName: "Iron Helm", category: 'hat', tier: 'mid', stats: { def: 1, maxHp: 10 } }, { id: 'hat_high_01', baseName: "Steel Greathelm", category: 'hat', tier: 'high', stats: { def: 2, maxHp: 20 } }, ],
        ring: [ { id: 'ring_low_01', baseName: "Simple Ring", category: 'ring', tier: 'low', stats: { str: 1 } }, { id: 'ring_mid_01', baseName: "Engraved Ring", category: 'ring', tier: 'mid', stats: { str: 1, def: 1 } }, { id: 'ring_high_01', baseName: "Ornate Ring", category: 'ring', tier: 'high', stats: { str: 2, maxHp: 10 } }, ],
        amulet: [ { id: 'amu_low_01', baseName: "Plain Amulet", category: 'amulet', tier: 'low', stats: { def: 1 } }, { id: 'amu_mid_01', baseName: "Protective Charm", category: 'amulet', tier: 'mid', stats: { def: 2, maxHp: 5 } }, { id: 'amu_high_01', baseName: "Guardian Pendant", category: 'amulet', tier: 'high', stats: { def: 3, dodge: 0.01 } }, ],
        belt: [ { id: 'belt_low_01', baseName: "Cloth Sash", category: 'belt', tier: 'low', stats: { maxHp: 3 } }, { id: 'belt_mid_01', baseName: "Leather Belt", category: 'belt', tier: 'mid', stats: { maxHp: 8, str: 1 } }, { id: 'belt_high_01', baseName: "Reinforced Belt", category: 'belt', tier: 'high', stats: { maxHp: 15, def: 1 } }, ],
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

    // --- Skill Tooltips (unchanged) ---
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
    function randomizeItemStats(baseStats, category) { const randomizedStats = {}; const existingStatKeys = []; for (const statKey in baseStats) { if (baseStats.hasOwnProperty(statKey)) { existingStatKeys.push(statKey); randomizedStats[statKey] = randomizeStat(baseStats[statKey], ITEM_STAT_VARIATION_PERCENT); } } if (category === 'accessory' || category === 'hat' || category === 'ring' || category === 'amulet' || category === 'belt') { const possibleExtraStats = Object.keys(SECONDARY_ACCESSORY_STATS); if (Math.random() < ACCESSORY_2ND_STAT_CHANCE) { let availableStats = possibleExtraStats.filter(stat => !existingStatKeys.includes(stat)); if (availableStats.length > 0) { const chosenStatKey = availableStats[getRandomInt(0, availableStats.length - 1)]; const baseValue = SECONDARY_ACCESSORY_STATS[chosenStatKey]; randomizedStats[chosenStatKey] = randomizeStat(baseValue, ITEM_STAT_VARIATION_PERCENT); existingStatKeys.push(chosenStatKey); console.log(`Accessory/Gear rolled 2nd stat: ${chosenStatKey}`); if (Math.random() < ACCESSORY_3RD_STAT_CHANCE) { availableStats = possibleExtraStats.filter(stat => !existingStatKeys.includes(stat)); if (availableStats.length > 0) { const chosenStatKey3 = availableStats[getRandomInt(0, availableStats.length - 1)]; const baseValue3 = SECONDARY_ACCESSORY_STATS[chosenStatKey3]; randomizedStats[chosenStatKey3] = randomizeStat(baseValue3, ITEM_STAT_VARIATION_PERCENT); console.log(`Accessory/Gear rolled 3rd stat: ${chosenStatKey3}`); } } } } } return randomizedStats; }
    function randomizeStatsHigh(baseStats) { const randomizedStats = {}; for (const statKey in baseStats) { if (baseStats.hasOwnProperty(statKey)) { const baseValue = baseStats[statKey]; if (baseValue === 0) { randomizedStats[statKey] = 0; continue; } const variation = baseValue * ITEM_STAT_VARIATION_PERCENT; const randomVariation = Math.random() * variation; let randomizedValue = baseValue + randomVariation; if (Number.isInteger(baseValue)) { randomizedStats[statKey] = Math.max(1, Math.round(randomizedValue)); } else { randomizedStats[statKey] = Math.max(0, parseFloat(randomizedValue.toFixed(3))); } } } return randomizedStats; }
    function getBaseItemDataById(itemId) { for (const category in equipmentCatalog) { if (equipmentCatalog.hasOwnProperty(category) && Array.isArray(equipmentCatalog[category])) { const item = equipmentCatalog[category].find(i => i && i.id === itemId); if (item) return item; } else { console.warn(`Equipment category '${category}' is missing or not an array.`); } } console.warn(`Base Item data not found for ID: ${itemId}`); return null; }
    function generateAccessoryName(baseName) { const prefix = accessoryPrefixes[getRandomInt(0, accessoryPrefixes.length - 1)]; return `${prefix} ${baseName}`; }
    function formatStatName(key) { switch (key) { case 'maxHp': return 'Max HP'; case 'str': return 'STR'; case 'def': return 'DEF'; case 'minDmg': return 'Min DMG'; case 'maxDmg': return 'Max DMG'; case 'dodge': return 'Dodge'; case 'critChance': return 'Crit Chance'; case 'critDamageMultiplier': return 'Crit Damage'; default: return key.toUpperCase(); } }

    // --- Core Game Logic ---
    // (Keep calculateTotalStats, updatePlayerStatDisplay, updateEnemyStatDisplay, updateEquippedDisplay, logMessage, spawnEnemy, decrementCooldowns, applyPlayerStatusEffects, enemyTurn, handlePlayerActionTaken functions as they were)
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
        for (const slot in player.equipment) { // Iterate through all equipment slots
            const equippedItem = player.equipment[slot];
            if (equippedItem && equippedItem.stats) {
                const itemStats = equippedItem.stats;
                player.maxHp += itemStats.maxHp || 0;
                player.str += itemStats.str || 0;
                player.def += itemStats.def || 0;
                player.minDamage += itemStats.minDmg || 0; // Primarily for weapons
                player.maxDamage += itemStats.maxDmg || 0; // Primarily for weapons
                dodgeBonusFromEquipment += itemStats.dodge || 0;
                player.critChance += itemStats.critChance || 0;
                player.critDamageMultiplier += itemStats.critDamageMultiplier || 0;
            }
        }

        // Apply Disease debuff (only if turns left > 0)
        let strBeforeTempDebuffs = player.str;
        let defBeforeTempDebuffs = player.def;
        if (player.diseaseTurnsLeft > 0) {
            strBeforeTempDebuffs = Math.max(0, Math.floor(strBeforeTempDebuffs * DISEASE_ATK_MULT));
            defBeforeTempDebuffs = Math.max(0, Math.floor(defBeforeTempDebuffs * DISEASE_DEF_MULT));
        }

        // Apply temporary debuffs
        if (player.attackDownTurns > 0) { player.str = Math.max(0, Math.floor(strBeforeTempDebuffs * player.attackDownMultiplier)); }
        else { player.str = strBeforeTempDebuffs; }
        if (player.defenseDownTurns > 0) { player.def = Math.max(0, Math.floor(defBeforeTempDebuffs * player.defenseDownMultiplier)); }
        else { player.def = defBeforeTempDebuffs; }

        // Calculate final dodge chance
        let levelDodgeBonus = DODGE_PER_LEVEL * (player.level - 1);
        player.dodgeChance = Math.min(BASE_DODGE_CHANCE + levelDodgeBonus + dodgeBonusFromEquipment, MAX_DODGE_CHANCE);

        // Apply Evasion buff
        if (player.evasionActive) { player.dodgeChance = Math.min(player.dodgeChance + EVASION_DODGE_BONUS, EVASION_MAX_CAP); }

        // Ensure HP doesn't exceed max
        player.hp = Math.min(player.hp, player.maxHp);
    }

    // Update the player's stats display on the screen
    function updatePlayerStatDisplay() {
        if (!player || typeof player.hp === 'undefined') { console.error("Player data missing for display."); return; }
        playerNameDisplay.textContent = player.name;
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
        if (player.poisonTurnsLeft > 0) { dotText += `(-${HORNET_VENOM_DAMAGE} Poison/${player.poisonTurnsLeft}t) `; }
        if (player.burnTurnsLeft > 0) { dotText += `(-${player.burnDamagePerTurn} Burn/${player.burnTurnsLeft}t) `; }
        if (player.bleedTurnsLeft > 0) { dotText += `(-${player.bleedDamagePerTurn} Bleed/${player.bleedTurnsLeft}t) `; }
        playerDotIndicatorElement.textContent = dotText.trim();

        // --- Update Other UI ---
        updateSkillButtons();
        updateEquippedDisplay();
        displayInventory();
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
         enemyImageElement.onerror = function() { this.src = 'https://placehold.co/80x80/2c3e50/ecf0f1?text=Enemy'; };

         let debuffText = "";
         if (enemy.evasionActive) debuffText += "[Evasive] ";
         if (enemyDebuffIndicator) enemyDebuffIndicator.textContent = debuffText.trim();
    }
    // Update the simple equipment display row - Updated for new slots
    function updateEquippedDisplay() {
        if (!player || !player.equipment) { console.error("Player equipment data missing."); return; }
        const slots = ['weapon', 'armor', 'hat', 'ring', 'amulet', 'belt']; // Updated slots
        const elements = {
            weapon: equippedWeaponElement,
            armor: equippedArmorElement,
            hat: equippedHatElement, // Renamed
            ring: equippedRingElement, // Added
            amulet: equippedAmuletElement, // Added
            belt: equippedBeltElement // Added
        };

        slots.forEach(slot => {
            const item = player.equipment[slot];
            const element = elements[slot];
            if (element) { // Check if element exists
                if (item) {
                    const name = item.name || item.baseName || "Unknown";
                    const tierClass = `item-tier-${item.tier || 'low'}`;
                    element.innerHTML = `<span class="${tierClass}">${name}</span>`;
                    element.parentElement.title = `${slot.charAt(0).toUpperCase() + slot.slice(1)}: ${name}`; // Update tooltip
                } else {
                    element.innerHTML = `<span class="item-tier-low">None</span>`;
                     element.parentElement.title = `${slot.charAt(0).toUpperCase() + slot.slice(1)}`; // Basic tooltip
                }
            }
        });
    }

    // (Keep logMessage, spawnEnemy, decrementCooldowns, applyPlayerStatusEffects, enemyTurn, handlePlayerActionTaken functions as they were)
    // --- Player Action Handlers (Combat) ---
    function handleHorizontalClick() {
        console.log("handleHorizontalClick called");
        // TODO: Implement the actual logic for horizontal attack
    }
    function handleHorizontalArcClick() {
        console.log("handleHorizontalArcClick called");
        // TODO: Implement the actual logic for horizontal arc attack
    }
    function handleHorizontalSquareClick() {
        console.log("handleHorizontalSquareClick called");
        // TODO: Implement the actual logic for horizontal square attack
    }
    function handleDeadlySinsClick() {
        console.log("handleDeadlySinsClick called");
        // TODO: Implement the actual logic for deadly sins attack
    }
    function handleEvasionClick() {
        console.log("handleEvasionClick called");
        // TODO: Implement the actual logic for evasion skill
    }
    function handleFirstAidClick() {
        console.log("handleFirstAidClick called");
        // TODO: Implement the actual logic for first aid skill
    }
    function handleFleeClick() {
        console.log("handleFleeClick called");
        // TODO: Implement the actual logic for flee action
    }
    // (Keep handleHorizontalClick, handleHorizontalArcClick, handleHorizontalSquareClick, handleDeadlySinsClick, handleEvasionClick, handleFirstAidClick, handleFleeClick functions as they were)
    // --- Item Handling ---
    // (Keep addItemToBackpack, handleEnemyDefeat, handleItemDrop, handleGuaranteedMaxStatDrop functions as they were)
    // --- Inventory UI Functions ---
    // Populate the inventory display (now includes new slots)
    function displayInventory() {
        if (!player || !player.equipment || !player.backpack) { console.error("Cannot display inventory: Player data missing."); return; }

        // --- Update Equipped Gear Section ---
        const slots = ['weapon', 'armor', 'hat', 'ring', 'amulet', 'belt']; // Updated slots
        const equippedElements = {
            weapon: { nameEl: invEquippedWeapon, imgEl: invEquippedWeaponImg },
            armor: { nameEl: invEquippedArmor, imgEl: invEquippedArmorImg },
            hat: { nameEl: invEquippedHat, imgEl: invEquippedHatImg }, // Renamed
            ring: { nameEl: invEquippedRing, imgEl: invEquippedRingImg }, // Added
            amulet: { nameEl: invEquippedAmulet, imgEl: invEquippedAmuletImg }, // Added
            belt: { nameEl: invEquippedBelt, imgEl: invEquippedBeltImg } // Added
        };
        const imagePaths = {
            weapon: { low: 'Images/LT_1h_sword.jpg', mid: 'Images/MT_1H_sword.png', high: 'Images/HT_1H_sword.jpg', default: 'https://placehold.co/40x40/a52a2a/eee?text=WPN' },
            armor: { low: 'Images/LT_leatherarmor.jpg', mid: 'Images/MT_chainmail.jpg', high: 'Images/HT_platemail.jpg', default: 'https://placehold.co/40x40/708090/eee?text=ARM' },
            hat: { default: 'https://placehold.co/40x40/8B4513/eee?text=HAT' }, // Added placeholder
            ring: { default: 'https://placehold.co/40x40/FFD700/333?text=RNG' }, // Added placeholder
            amulet: { default: 'https://placehold.co/40x40/4682B4/eee?text=AMU' }, // Added placeholder
            belt: { default: 'https://placehold.co/40x40/8B4513/eee?text=BLT' }, // Added placeholder
            consumable: { default: 'Images/healing_potion.jpg'}
        };

        slots.forEach(slot => {
            const item = player.equipment[slot];
            const els = equippedElements[slot];
            const defaultImgSrc = imagePaths[slot]?.default || 'https://placehold.co/40x40/555/eee?text=ERR';
            if (item) {
                const tierClass = `item-tier-${item.tier || 'low'}`;
                const name = item.name || item.baseName || "Unknown";
                els.nameEl.innerHTML = `${slot.charAt(0).toUpperCase() + slot.slice(1)}: <span class="${tierClass}">${name}</span>`;
                els.imgEl.src = item.imageSrc || imagePaths[slot]?.[item.tier] || defaultImgSrc;
                els.imgEl.alt = name;
                els.imgEl.onerror = function() { this.src = defaultImgSrc; };
            } else {
                els.nameEl.innerHTML = `${slot.charAt(0).toUpperCase() + slot.slice(1)}: <span class="item-tier-low">None</span>`;
                els.imgEl.src = defaultImgSrc;
                els.imgEl.alt = "Empty Slot";
                els.imgEl.onerror = null;
            }
        });
        // Update Coin Display
        playerCoinsElement.textContent = currentCoins;


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
                const imgSrc = item.imageSrc || imagePaths[category]?.[tier] || imagePaths[category]?.default || 'https://placehold.co/40x40/555/eee?text=???';
                const defaultImgSrc = imagePaths[category]?.default || 'https://placehold.co/40x40/555/eee?text=???';

                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = item.name || item.baseName || category;
                img.onerror = function() { this.src = defaultImgSrc; };
                slotDiv.appendChild(img);
                slotDiv.dataset.backpackIndex = i;
                slotDiv.classList.add(`item-tier-${tier}`);
                slotDiv.addEventListener('click', handleBackpackSlotClick);

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
    // (Keep handleBackpackSlotClick, clearItemSelection, showItemDetails, generateStatsHTML functions as they were)
    // (Keep handleEquipFromBackpack, handleDiscardFromBackpack, handleUseItemClick functions as they were)
    // --- Coin Storage Functions ---
    // (Keep loadCoins, saveCoins functions as they were)
    // --- Player Defeat Sequence ---
    // (Keep handlePlayerDefeatSequence function as it was)
    // --- Game Management ---
    // (Keep resetGame, handlePlayerChoiceChange, loadHighScore, saveHighScore, updateHighScoreDisplay, resetHighScore, levelUp, checkLevelUp, updateSkillButtons, showTooltip, hideTooltip, updateTooltipPosition functions as they were)
    // --- Victory Notification ---
    // (Keep showVictoryNotification function as it was)


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
    // Mute Button Listener
    muteButton.addEventListener('click', () => {
        isMuted = !isMuted; // Toggle mute state
        muteButton.textContent = isMuted ? "[Unmute]" : "[Mute]";
        muteButton.classList.toggle('muted', isMuted);
        console.log(`Audio ${isMuted ? 'muted' : 'unmuted'}.`);
        if (!isMuted) {
            playClickSound(); // Play a sound when unmuting
        }
    });
    // Start Screen Buttons
    playerChoiceRadios.forEach(radio => { radio.addEventListener('change', handlePlayerChoiceChange); });
    startGameButton.addEventListener('click', async () => {
        // Start Tone.js audio context on the first user gesture
        try {
            if (Tone.context.state !== 'running') {
                await Tone.start();
                console.log("Audio context started by Start Game button.");
            }
        } catch (e) {
            console.error("Error starting audio context:", e);
        }
        showGameScreen();
        resetGame();
    });
    changelogButton.addEventListener('click', () => {
        window.open('https://docs.google.com/document/d/12Rn4Zxb8fIwjxyBiFS0M_kZkgLMb4lWakfq5dX1B1B4/edit?usp=sharing', '_blank');
    });

    // Tooltip Listeners
    const actionButtons = [ horizontalButton, evasionButton, firstAidButton, horizontalArcButton, horizontalSquareButton, deadlySinsButton, fleeButton ];
    actionButtons.forEach(button => { if (button) { button.addEventListener('mouseover', showTooltip); button.addEventListener('mouseout', hideTooltip); } });
    // Inventory Action Listeners
    equipButton.addEventListener('click', handleEquipFromBackpack);
    useButton.addEventListener('click', handleUseItemClick);
    discardButton.addEventListener('click', handleDiscardFromBackpack);


    // --- Initial Setup ---
    console.log("Game script loaded!");
    loadHighScore();
    loadCoins(); // Load coins on startup
    updateHighScoreDisplay();
    // Set initial mute button state
    muteButton.textContent = isMuted ? "[Unmute]" : "[Mute]";
    muteButton.classList.toggle('muted', isMuted);
    showStartScreen(); // Show start screen initially


}); // End of DOMContentLoaded listener
