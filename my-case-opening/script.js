const items = [
    { name: "Blue AK", rarity: "common", chance: 60 },
    { name: "Red AWP", rarity: "rare", chance: 25 },
    { name: "Purple Knife", rarity: "epic", chance: 10 },
    { name: "Golden Dragon", rarity: "legendary", chance: 4 },
    { name: "Secret Knife", rarity: "secret", chance: 1 },
];

let inventory = [];

const button = document.getElementById("openCase");
const result = document.getElementById("result");
const inventoryElement = document.getElementById("inventory");
const inventoryCount = document.getElementById("inventoryCount");

function getRandomItem() {
    const random = Math.random() * 100;
    let total = 0;

    for (const item of items) {
        total += item.chance;
        if (random < total) return item;
    }

    return items[items.length - 1];
}

function updateInventory() {
    inventoryElement.replaceChildren();
    inventoryCount.textContent = `${inventory.length} ${inventory.length === 1 ? "předmět" : inventory.length >= 2 && inventory.length <= 4 ? "předměty" : "předmětů"}`;

    inventory.forEach((item) => {
        const card = document.createElement("div");
        card.className = `inventory-item ${item.rarity}`;

        const name = document.createElement("span");
        name.className = "item-name";
        name.textContent = item.name;

        const rarity = document.createElement("span");
        rarity.className = "item-rarity";
        rarity.textContent = item.rarity;

        card.append(name, rarity);
        inventoryElement.append(card);
    });
}

function openCase() {
    if (button.disabled) return;

    button.disabled = true;
    result.classList.remove("reveal");
    result.textContent = "🎰 Otevírám case...";

    const item = getRandomItem();

    window.setTimeout(() => {
        result.replaceChildren(document.createTextNode("🎉 Získal jsi "));

        const itemName = document.createElement("strong");
        itemName.textContent = item.name;

        const rarity = document.createElement("span");
        rarity.className = item.rarity;
        rarity.textContent = ` (${item.rarity})`;

        result.append(itemName, rarity);
        result.classList.add("reveal");

        inventory.push(item);
        updateInventory();
        button.disabled = false;
    }, 2000);
}

button.addEventListener("click", openCase);
updateInventory();
body {
    background: #101018;
    color: white;
    font-family: Arial, sans-serif;
    text-align: center;
}

.case {
    width: 500px;
    max-width: 90%;
    margin: 50px auto;
    padding: 40px;
    background: #3434fd;
    border-radius: 20px;
}

#result {
    margin-bottom: 30px;
    font-size: 20px;
}

button {
    padding: 15px 30px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
}

.inventory-item {
    display: inline-block;
    padding: 15px;
    margin: 5px;
    background: #0000ff;
    border-radius: 8px;
}

.common {
    color: gray;
}

.rare {
    color: blue;
}

.epic {
    color: purple;
}

.legendary {
    color: gold;
}

.secret {
    color: red;
}
