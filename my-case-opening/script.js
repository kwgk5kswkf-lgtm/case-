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