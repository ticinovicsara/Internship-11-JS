let books = [];

function AddBook() {
    let title = document.getElementById("title").value;
    let price = Number(document.getElementById("price").value);
    let genre = document.getElementById("genre").value;

    if(title && !isNaN(price) && genre) {
        books.push({title, price, genre});
        document.getElementById("title").value = "";
        document.getElementById("price").value = "";
        document.getElementById("genre").value = "";
    }
    else {
        alert("Please input valid data!");
    }
}


function AnalyseBook() {
    if(books.length === 0) {
        alert("No inserted books");
        return;
    }

    let total = books.reduce((sum, book) => sum + book.price, 0);
    let average = total / books.length;
    document.getElementById("averagePrice").textContent = `Average price: ${average}`;

    books.forEach(book => book.deviation = Math.abs(book.price - average));
    books.sort((a, b) => b.deviation - a.deviation);

    document.getElementById("mostDeviant").textContent = `Biggest deviation: ${books[0].title} (${books[0].price} eura)`;

    let tableBody = document.querySelector("#bookTable tbody");
    tableBody.innerHTML = ""; 

    books.forEach(book => {
        const row = `
            <tr>
                <td>${book.title}</td>
                <td>${book.price} €</td>
                <td>${book.genre}</td>
                <td>${book.deviation.toFixed(2)}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}