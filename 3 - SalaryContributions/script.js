let employees = [];

function AddEmployee() {
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let sector = document.getElementById("sector").value;
    let salary = parseFloat(document.getElementById("salary").value);

    if (fname && lname && sector && !isNaN(salary) && salary > 0) {
        employees.push({ fname, lname, sector, salary });
        
        document.getElementById("fname").value = "";
        document.getElementById("lname").value = "";
        document.getElementById("sector").value = "";
        document.getElementById("salary").value = "";
    } else {
        alert("Please insert valid data!");
    }
}

function CalculateStatistics() {
    if (employees.length === 0) {
        alert("No inserted employees!");
        return;
    }

    let totalSalary = employees.reduce((acc, emp) => acc + emp.salary, 0);
    let sectorStats = {};

    employees.forEach(emp => {
        if (!sectorStats[emp.sector]) {
            sectorStats[emp.sector] = { totalSalary: 0, employees: [] };
        }
        sectorStats[emp.sector].totalSalary += emp.salary;
        sectorStats[emp.sector].employees.push(emp);
    });

    let sectorResults = Object.keys(sectorStats)
        .map(sector => {
            let sectorTotal = sectorStats[sector].totalSalary;
            let sectorPercentage = (sectorTotal / totalSalary) * 100;
            let employeeStats = sectorStats[sector].employees.map(emp => {
                let empPercentage = (emp.salary / sectorTotal) * 100;
                return `${emp.fname} ${emp.lname} (${empPercentage.toFixed(2)}%)`;
            }).join(", ");

            return {
                sector: sector,
                sectorPercentage: sectorPercentage.toFixed(2),
                employeeStats: employeeStats
            };
        })
        .sort((a, b) => b.sectorPercentage - a.sectorPercentage);

    let tableBody = document.querySelector("#sectorTable tbody");
    tableBody.innerHTML = "";

    sectorResults.forEach(result => {
        let row = `<tr>
            <td>${result.sector}</td>
            <td>${result.sectorPercentage}%</td>
            <td>${result.employeeStats}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("addEmployeeButton").addEventListener("click", AddEmployee);
    document.getElementById("calculateButton").addEventListener("click", CalculateStatistics);
});