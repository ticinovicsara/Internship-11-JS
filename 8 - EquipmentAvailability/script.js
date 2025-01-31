const equipmentList = [];
const equipmentListElement = document.getElementById('equipmentList');
const ratioElement = document.getElementById('ratio');

const equipmentForm = document.getElementById('equipmentForm');
equipmentForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('equipmentName').value;
    const price = parseFloat(document.getElementById('equipmentPrice').value);
    const status = document.getElementById('equipmentStatus').value;

    if (name && !isNaN(price) && price > 0) {
        const newEquipment = {
            name,
            price,
            status
        };

        equipmentList.push(newEquipment);

        equipmentList.sort((a, b) => {
            if (a.status === b.status) {
                return a.name.localeCompare(b.name);
            }
            return a.status === 'available' ? -1 : 1;
        });

        updateEquipmentList();

        document.getElementById('equipmentName').value = '';
        document.getElementById('equipmentPrice').value = '';
        document.getElementById('equipmentStatus').value = 'available';
    } else {
        alert('Please input valid data.');
    }
});

function updateEquipmentList() {
    equipmentListElement.innerHTML = '';

    let availableCount = 0;
    let unavailableCount = 0;

    equipmentList.forEach(equipment => {
        const row = document.createElement('tr');

        const statusCell = document.createElement('td');
        statusCell.className = equipment.status === 'available' ? 'available' : 'unavailable';
        statusCell.textContent = equipment.status.charAt(0).toUpperCase() + equipment.status.slice(1);

        row.innerHTML = `
            <td>${equipment.name}</td>
            <td>${equipment.price.toFixed(2)}</td>
        `;
        row.appendChild(statusCell);

        equipmentListElement.appendChild(row);

        if (equipment.status === 'available') {
            availableCount++;
        } else {
            unavailableCount++;
        }
    });

    ratioElement.textContent = `${availableCount} / ${unavailableCount}`;
}
