const rewards = [
    { name: "Blue AK", rarity: "common", label: "common", chance: 60 },
    { name: "Red AWP", rarity: "rare", label: "rare", chance: 25 },
    { name: "Purple Knife", rarity: "epic", label: "epic", chance: 10 },
    { name: "Golden Dragon", rarity: "legendary", label: "legendary", chance: 4 },
    { name: "Secret Knife", rarity: "secret", label: "secret", chance: 1 },
];

const openButton = document.querySelector("#openCase");
const result = document.querySelector("#result");
const inventory = document.querySelector("#inventory");
const inventoryCount = document.querySelector("#inventoryCount");
const storageKey = "my-case-opening-inventory";
const openingDuration = 700;

function loadInventory() {
    try {
        const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
        return Array.isArray(saved) ? saved.filter((item) =>
            item && typeof item.name === "string" && typeof item.rarity === "string" && typeof item.label === "string"
        ) : [];
    } catch {
        return [];
    }
}

let items = loadInventory();

function chooseReward() {
    let roll = Math.random() * 100;

    for (const reward of rewards) {
        roll -= reward.chance;
        if (roll < 0) return reward;
    }

    return rewards[rewards.length - 1];
}

function renderInventory() {
    inventory.replaceChildren();
    inventoryCount.textContent = `${items.length} ${items.length === 1 ? "předmět" : items.length >= 2 && items.length <= 4 ? "předměty" : "předmětů"}`;

    if (items.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "inventory-empty";
        emptyMessage.textContent = "Zatím tu nic není. Zkus otevřít case.";
        inventory.append(emptyMessage);
        return;
    }

    [...items].reverse().forEach((item) => {
        const card = document.createElement("div");
        card.className = `inventory-item ${item.rarity}`;

        const name = document.createElement("span");
        name.className = "item-name";
        name.textContent = item.name;

        const rarity = document.createElement("span");
        rarity.className = "item-rarity";
        rarity.textContent = item.label;

        card.append(name, rarity);
        inventory.append(card);
    });
}

openButton.addEventListener("click", () => {
    if (openButton.disabled) return;

    openButton.disabled = true;
    result.classList.remove("reveal");
    result.textContent = "Case se otevírá...";

    window.setTimeout(() => {
        const reward = chooseReward();
        items.push(reward);

        try {
            localStorage.setItem(storageKey, JSON.stringify(items));
        } catch {
            // Inventář zůstane dostupný do obnovení stránky, pokud je úložiště vypnuté.
        }

        result.textContent = `Získal/a jsi: ${reward.name} (${reward.label})`;
        result.classList.add("reveal");
        renderInventory();
        openButton.disabled = false;
    }, openingDuration);
});

renderInventory();
```css
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    min-height: 100vh;
    background:
        radial-gradient(circle at top, #252544 0%, #11111b 45%, #09090e 100%);

    color: white;
    font-family: Arial, Helvetica, sans-serif;
}


/* =========================
   NAVBAR
========================= */

.navbar {
    height: 70px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 7%;

    background: rgba(10, 10, 18, 0.85);
    border-bottom: 1px solid #29293b;
}

.logo {
    font-size: 24px;
    font-weight: 900;
    letter-spacing: 2px;
}

.logo span {
    color: #8b5cf6;
}

.balance {
    padding: 10px 18px;

    background: #1d1d2b;

    border: 1px solid #35354a;

    border-radius: 10px;

    font-weight: bold;
}


/* =========================
   MAIN
========================= */

main {
    width: min(1100px, 92%);

    margin: auto;
    padding: 50px 0;
}


/* =========================
   CASE
========================= */

.case-section {
    text-align: center;
}

.case-info {
    margin-bottom: 30px;
}

.case-icon {
    width: 100px;
    height: 100px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin: auto;
    margin-bottom: 20px;

    border-radius: 20px;

    background: linear-gradient(
        145deg,
        #2c2c49,
        #171724
    );

    border: 1px solid #44445e;

    font-size: 50px;

    box-shadow:
        0 15px 40px rgba(0,0,0,.4);
}

h1 {
    font-size: 38px;
    margin-bottom: 10px;
}

.case-info p {
    color: #9999ad;
}

.price {
    margin-top: 15px;

    color: #aaaabe;
}

.price strong {
    color: #facc15;
}


/* =========================
   REEL
========================= */

.reel-container {
    position: relative;

    width: 100%;
    height: 150px;

    overflow: hidden;

    margin: 30px auto;

    border-radius: 15px;

    background: #10101a;

    border: 1px solid #343449;
}

.reel-container::before,
.reel-container::after {
    content: "";

    position: absolute;

    top: 0;
    bottom: 0;

    width: 120px;

    z-index: 3;

    pointer-events: none;
}

.reel-container::before {
    left: 0;

    background:
        linear-gradient(
            to right,
            #10101a,
            transparent
        );
}

.reel-container::after {
    right: 0;

    background:
        linear-gradient(
            to left,
            #10101a,
            transparent
        );
}

.pointer {
    position: absolute;

    top: 0;
    bottom: 0;

    left: 50%;

    width: 3px;

    transform: translateX(-50%);

    background: #ffffff;

    box-shadow:
        0 0 15px #ffffff;

    z-index: 5;
}

.reel {
    position: absolute;

    top: 15px;
    left: 0;

    height: 120px;

    display: flex;

    gap: 10px;

    transform: translateX(0);
}


/* =========================
   ITEM CARD
========================= */

.item {
    width: 120px;
    min-width: 120px;

    height: 120px;

    display: flex;

    flex-direction: column;

    justify-content: center;
    align-items: center;

    border-radius: 12px;

    background: #1a1a27;

    border: 2px solid #333346;

    transition: .2s;
}

.item-icon {
    font-size: 40px;

    margin-bottom: 8px;
}

.item-name {
    font-size: 12px;

    font-weight: bold;

    text-align: center;
}

.item-rarity {
    font-size: 10px;

    margin-top: 5px;

    opacity: .8;
}


/* =========================
   RARITIES
========================= */

.common {
    border-color: #737383 !important;
}

.rare {
    border-color: #3b82f6 !important;
}

.epic {
    border-color: #a855f7 !important;
}

.legendary {
    border-color: #f59e0b !important;
}

.mythic {
    border-color: #ef4444 !important;
}


/* =========================
   BUTTON
========================= */

.open-button {
    border: none;

    padding: 16px 45px;

    border-radius: 12px;

    color: white;

    background:
        linear-gradient(
            135deg,
            #8b5cf6,
            #6d28d9
        );

    font-size: 16px;

    font-weight: 900;

    cursor: pointer;

    transition: .2s;

    box-shadow:
        0 10px 30px rgba(139,92,246,.25);
}

.open-button:hover {
    transform: translateY(-2px);

    box-shadow:
        0 15px 40px rgba(139,92,246,.4);
}

.open-button:disabled {
    opacity: .5;

    cursor: not-allowed;

    transform: none;
}


/* =========================
   RESULT
========================= */

.result {
    min-height: 30px;

    margin-top: 20px;

    color: #aaaabe;

    font-size: 17px;
}

.result strong {
    color: white;
}


/* =========================
   INVENTORY
========================= */

.inventory-section {
    margin-top: 80px;
}

.section-header {
    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-bottom: 20px;
}

.section-header h2 {
    font-size: 25px;
}

.section-header span {
    color: #77778b;
}

.inventory {
    display: grid;

    grid-template-columns:
        repeat(auto-fill, minmax(150px, 1fr));

    gap: 15px;
}

.inventory-card {
    padding: 20px;

    background: #171720;

    border: 1px solid #29293a;

    border-radius: 12px;

    text-align: center;
}

.inventory-card .icon {
    font-size: 40px;

    margin-bottom: 10px;
}

.inventory-card .name {
    font-weight: bold;

    font-size: 13px;
}

.inventory-card .rarity {
    margin-top: 5px;

    font-size: 11px;

    color: #77778b;
}

.empty {
    grid-column: 1 / -1;

    padding: 50px;

    text-align: center;

    color: #666679;

    background: #12121b;

    border-radius: 12px;

    border: 1px dashed #303044;
}


/* =========================
   ODDS
========================= */

.odds-section {
    margin-top: 70px;
}

.odds {
    display: grid;

    grid-template-columns:
        repeat(auto-fit, minmax(150px, 1fr));

    gap: 10px;

    margin-top: 20px;
}

.odds div {
    padding: 15px;

    background: #15151f;

    border-radius: 10px;

    border: 1px solid #282838;

    display: flex;

    align-items: center;

    gap: 8px;
}

.odds strong {
    margin-left: auto;
}

.dot {
    width: 10px;
    height: 10px;

    border-radius: 50%;
}

.dot.common {
    background: #737383;
}

.dot.rare {
    background: #3b82f6;
}

.dot.epic {
    background: #a855f7;
}

.dot.legendary {
    background: #f59e0b;
}

.dot.mythic {
    background: #ef4444;
}


/* =========================
   FOOTER
========================= */

footer {
    padding: 30px;

    text-align: center;

    color: #555568;

    border-top: 1px solid #222231;
}


/* =========================
   MOBILE
========================= */

@media (max-width: 600px) {

    h1 {
        font-size: 28px;
    }

    .navbar {
        padding: 0 20px;
    }

    .reel-container {
        height: 135px;
    }

    .reel {
        top: 7px;
    }

    .item {
        width: 110px;
        min-width: 110px;
        height: 120px;
    }

}
```

