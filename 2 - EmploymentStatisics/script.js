let employees = [];

function AddEmployee() {
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let industry = document.getElementById("industry").value;
    let salary = parseFloat(document.getElementById("salary").value);

    if(fname && lname && industry && !isNaN(salary) && salary > 0) {
        employees.push( {fname, lname, industry, salary} );
        
        document.getElementById("fname").value = "";
        document.getElementById("lname").value = "";
        document.getElementById("industry").value = "";
        document.getElementById("salary").value = "";
    }
    else {
        alert("Please input valid data!");
    }
} 

function CalculateStatistics () {
    if(employees.length === 0) {
        alert("No inserted employees");
        return;
    }

    let industryStatistics = {};

    employees.forEach(emp => {
        if(!industryStatistics[emp.industry]) {
            industryStatistics[emp.industry] = {totalSalary: 0, count: 0};
        }
        industryStatistics[emp.industry].totalSalary += emp.salary;
        industryStatistics[emp.industry].count++;
    }
    );

    let filterIndustries = Object.keys(industryStatistics)
        .filter(ind => industryStatistics[ind].count >= 2)
        .map(ind => ({
            industry: ind,
            avgSalary: (industryStatistics[ind].totalSalary / industryStatistics[ind].count),
            count: industryStatistics[ind].count
        }))
        .sort((a, b) => b.avgSalary - a.avgSalary);

    let tableBody = document.querySelector("#industryTable tbody");
    tableBody.innerHTML = "";

    filterIndustries.forEach(ind => {
        let row = `<tr>
            <td>${ind.industry}</td>
            <td>${ind.avgSalary.toFixed(2)}</td>
            <td>${ind.count}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("addEmployeeButton").addEventListener("click", AddEmployee);
    document.getElementById("calculateButton").addEventListener("click", CalculateStatistics);
});