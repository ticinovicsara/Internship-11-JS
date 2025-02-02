let students = [];

function addStudent() {
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let score = parseFloat(document.getElementById("score").value);

    if (fname && lname && !isNaN(score) && score >= 0 && score <= 100) {
        students.push({ fname, lname, score });

        document.getElementById("fname").value = "";
        document.getElementById("lname").value = "";
        document.getElementById("score").value = "";
    } else {
        alert("Please insert valid data!");
    }
}

function calculateCategories() {
    if (students.length === 0) {
        alert("No students inserted");
        return;
    }

    let categories = {
        '0-25%': [],
        '25-50%': [],
        '50-75%': [],
        '75-100%': []
    };

    students.forEach(student => {
        let score = student.score;
        if (score >= 0 && score <= 25) {
            categories['0-25%'].push(student);
        } else if (score > 25 && score <= 50) {
            categories['25-50%'].push(student);
        } else if (score > 50 && score <= 75) {
            categories['50-75%'].push(student);
        } else if (score > 75 && score <= 100) {
            categories['75-100%'].push(student);
        }
    });

    let categoryResults = document.getElementById("categoryResults");
    categoryResults.innerHTML = ""; 

    Object.keys(categories).forEach(category => {
        let categoryStudents = categories[category];
        if (categoryStudents.length > 0) {
            categoryStudents.sort((a, b) => a.lname.localeCompare(b.lname));

            let totalScore = categoryStudents.reduce((sum, student) => sum + student.score, 0);
            let averageScore = totalScore / categoryStudents.length;

            categoryResults.innerHTML += `<h3>${category} (Average Score: ${averageScore.toFixed(2)})</h3><ul>`;

            categoryStudents.forEach(student => {
                categoryResults.innerHTML += `<li>${student.lname}, ${student.fname} - ${student.score}</li>`;
            });

            categoryResults.innerHTML += "</ul>";
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("addStudentButton").addEventListener("click", addStudent);
    document.getElementById("calculateButton").addEventListener("click", calculateCategories);
});
