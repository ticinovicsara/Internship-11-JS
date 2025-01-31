document.getElementById('cityForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const inputCities = document.getElementById('cityNames').value.split(',').map(city => city.trim());

    const filteredCities = inputCities.filter(city => city.length > 5);

    filteredCities.sort();

    displayCities(filteredCities);

    const csvContent = generateCSV(filteredCities);

    enableDownloadButton(csvContent);
});

function displayCities(cities) {
    const cityListElement = document.getElementById('cityList');
    cityListElement.innerHTML = '';

    cities.forEach(city => {
        const listItem = document.createElement('li');
        listItem.textContent = city;
        cityListElement.appendChild(listItem);
    });
}

function generateCSV(cities) {
    const csv = ['City Names'].concat(cities).join('\n');
    return csv;
}

function enableDownloadButton(csvContent) {
    const downloadButton = document.getElementById('downloadButton');
    downloadButton.addEventListener('click', function() {
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'cities.csv');

        link.click();
    });
}
