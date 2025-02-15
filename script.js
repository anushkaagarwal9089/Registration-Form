document.addEventListener("DOMContentLoaded", () => {
    loadStoredData();
});

document.getElementById("dob").addEventListener("input", function () {
    const dob = new Date(this.value);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    if (age < 18 || age > 55) {
        this.setCustomValidity("Age must be between 18 and 55.");
    } else {
        this.setCustomValidity("");
    }
});

document.getElementById("registrationForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const userData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        dob: document.getElementById("dob").value,
        acceptedTerms: document.getElementById("terms").checked,
    };

    saveData(userData);
    displayData();
    this.reset();
});

function saveData(data) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));
}

function loadStoredData() {
    displayData();
}

function displayData() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    users.forEach(user => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = user.name;
        row.insertCell(1).textContent = user.email;
        row.insertCell(2).textContent = user.password;
        row.insertCell(3).textContent = user.dob;
        row.insertCell(4).textContent = user.acceptedTerms;
    });
}
