document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get values from the form
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let dob = document.getElementById('dob').value;
    let acceptedTerms = document.getElementById('acceptedTerms').checked;

    // Validate the age (between 18 and 55 years old)
    let today = new Date();
    let birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();

    // If birthdate hasn't occurred yet this year, subtract one from age
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    // If the user is not between 18 and 55 years old, show an alert
    if (age < 18 || age > 55) {
        alert("You must be between 18 and 55 years old.");
        return;
    }

    // Save the data to localStorage
    let registrationData = { name, email, password, dob, acceptedTerms };
    let existingData = JSON.parse(localStorage.getItem('registrations')) || [];
    existingData.push(registrationData);
    localStorage.setItem('registrations', JSON.stringify(existingData));

    alert("Registration successful!");
    loadData(); // Reload the data in the table
});

// Function to load data from localStorage and display it in a table
function loadData() {
    let table = document.getElementById('registrationTable').getElementsByTagName('tbody')[0];
    table.innerHTML = ''; // Clear existing table rows

    let registrations = JSON.parse(localStorage.getItem('registrations')) || [];
    registrations.forEach(function(data) {
        let row = table.insertRow();
        row.insertCell(0).innerText = data.name;
        row.insertCell(1).innerText = data.email;
        row.insertCell(2).innerText = data.password;
        row.insertCell(3).innerText = data.dob;
        row.insertCell(4).innerText = data.acceptedTerms ? 'true' : 'false';
    });
}

// Function to clear the table and localStorage
function clearTable() {
    // Clear the table in the DOM
    let table = document.getElementById('registrationTable').getElementsByTagName('tbody')[0];
    table.innerHTML = '';

    // Clear the data from localStorage
    localStorage.removeItem('registrations');
}

// Load data when the page is loaded
window.onload = function() {
    loadData();
};

// Add event listener for the Clear Table button
document.getElementById('clearTableButton').addEventListener('click', function() {
    clearTable();
});
