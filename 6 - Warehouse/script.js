let equipment = [];

function addEquipment() {
    let name = document.getElementById("equipmentName").value;
    let price = parseFloat(document.getElementById("equipmentPrice").value);
    let status = document.getElementById("equipmentStatus").value;

    if (name && !isNaN(price) && price > 0 && (status === "available" || status === "unavailable")) {
        equipment.push({ name, price, status });
        
        document.getElementById("equipmentName").value = "";
        document.getElementById("equipmentPrice").value = "";
        document.getElementById("equipmentStatus").value = "available";
    } else {
        alert("Please input valid data!");
    }
}

function processData() {
    if (equipment.length === 0) {
        alert("No equipment added");
        return;
    }

    let unavailableIndices = equipment
        .map((item, index) => item.status === "unavailable" ? index : -1)
        .filter(index => index !== -1);
    
    document.getElementById("unavailableIndices").innerHTML = unavailableIndices.length > 0
        ? `<p>Indices of unavailable equipment: ${unavailableIndices.join(', ')}</p>`
        : "<p>No unavailable equipment.</p>";

    let availableEquipment = equipment.filter(item => item.status === "available");
    availableEquipment.sort((a, b) => a.price - b.price || a.name.localeCompare(b.name));

    let availableEquipmentHtml = availableEquipment.map(item => 
        `<p>${item.name} - ${item.price.toFixed(2)}</p>`
    ).join('');
    
    document.getElementById("availableEquipment").innerHTML = availableEquipmentHtml;

    let totalValue = equipment.reduce((sum, item) => sum + item.price, 0);
    let unavailableValue = equipment.filter(item => item.status === "unavailable")
        .reduce((sum, item) => sum + item.price, 0);
    
    let unavailablePercentage = (unavailableValue / totalValue) * 100;
    document.getElementById("unavailablePercentage").innerHTML = `
        <p>Unavailable equipment value percentage: ${unavailablePercentage.toFixed(2)}%</p>
    `;

    let cheap = availableEquipment.filter(item => item.price <= 50);
    let medium = availableEquipment.filter(item => item.price > 50 && item.price <= 150);
    let expensive = availableEquipment.filter(item => item.price > 150);

    let priceRangeHtml = `
        <h3>Cheap Equipment (<= 50)</h3>
        ${cheap.map(item => `<p>${item.name} - ${item.price.toFixed(2)}</p>`).join('')}
        <h3>Medium Equipment (51 - 150)</h3>
        ${medium.map(item => `<p>${item.name} - ${item.price.toFixed(2)}</p>`).join('')}
        <h3>Expensive Equipment (> 150)</h3>
        ${expensive.map(item => `<p>${item.name} - ${item.price.toFixed(2)}</p>`).join('')}
    `;
    
    document.getElementById("equipmentByPriceRange").innerHTML = priceRangeHtml;
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("addEquipmentButton").addEventListener("click", addEquipment);
    document.getElementById("processButton").addEventListener("click", processData);
});
