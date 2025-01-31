let plants = [];

function addPlant() {
    let plantName = document.getElementById("plantName").value;
    let color = document.getElementById("color").value;
    let calories = parseFloat(document.getElementById("calories").value);

    if (plantName && color && !isNaN(calories) && calories > 0) {
        plants.push({ plantName, color, calories });
        
        document.getElementById("plantName").value = "";
        document.getElementById("color").value = "";
        document.getElementById("calories").value = "";
    } else {
        alert("Please insert valid data!");
    }
}

function calculateStatistics() {
    if (plants.length === 0) {
        alert("No plants inserted");
        return;
    }

    let colorStats = {};

    plants.forEach(plant => {
        if (!colorStats[plant.color]) {
            colorStats[plant.color] = { totalCalories: 0, plants: [] };
        }
        colorStats[plant.color].totalCalories += plant.calories;
        colorStats[plant.color].plants.push(plant);
    });

    let sortedColors = Object.keys(colorStats).sort();

    let tableBody = document.querySelector("#colorTable tbody");
    tableBody.innerHTML = "";

    sortedColors.forEach(color => {
        let row = `<tr>
            <td>${color}</td>
            <td>${colorStats[color].totalCalories}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });

    let topColors = Object.keys(colorStats)
        .map(color => ({ color: color, totalCalories: colorStats[color].totalCalories }))
        .sort((a, b) => b.totalCalories - a.totalCalories)
        .slice(0, 3); 

    let topColorsList = document.getElementById("topColors");
    topColorsList.innerHTML = "";

    topColors.forEach(color => {
        let listItem = `<li>${color.color}: ${color.totalCalories} calories</li>`;
        topColorsList.innerHTML += listItem;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("addPlantButton").addEventListener("click", addPlant);
    document.getElementById("calculateButton").addEventListener("click", calculateStatistics);
});
