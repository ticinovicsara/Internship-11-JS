function generateSquares(N) {
    if (N === 0) return [];
    return [...generateSquares(N - 1), N * N];
}

function calculate() {
    const N = parseInt(document.getElementById("numInput").value);

    if (isNaN(N) || N <= 0) {
        alert("Please input valid data!");
        return;
    }

    const squares = generateSquares(N);

    const sum = squares.reduce((acc, num) => acc + num, 0);

    const average = sum / N;

    const sortedSquares = [...squares].sort((a, b) => a - b);
    let median;
    if (N % 2 === 1) {
        median = sortedSquares[Math.floor(N / 2)];
    } else {
        const middle1 = sortedSquares[N / 2 - 1];
        const middle2 = sortedSquares[N / 2];
        median = (middle1 + middle2) / 2;
    }

    document.getElementById("sum").textContent = `Sum of squares: ${sum}`;
    document.getElementById("average").textContent = `Average of squares: ${average.toFixed(2)}`;
    document.getElementById("median").textContent = `Median of squares: ${median}`;
}

document.getElementById("calculateButton").addEventListener("click", calculate);
