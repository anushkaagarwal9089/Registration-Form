// Function to set the valid date range for the date picker
function setDateRange() {
    let today = new Date();
    
    // Calculate 18 years ago for the minimum age
    let minDate = new Date(today);
    minDate.setFullYear(today.getFullYear() - 55); // Maximum 55 years ago

    // Calculate 55 years ago for the maximum age
    let maxDate = new Date(today);
    maxDate.setFullYear(today.getFullYear() - 18); // Minimum 18 years ago

    // Format the dates in YYYY-MM-DD format
    let minDateString = minDate.toISOString().split('T')[0];
    let maxDateString = maxDate.toISOString().split('T')[0];

    // Set the min and max attributes for the date input
    document.getElementById('dob').setAttribute('min', minDateString);
    document.getElementById('dob').setAttribute('max', maxDateString);
}

// Call the function to set date range when the page loads
window.onload = setDateRange;

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form data
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let dob = document.getElementById('dob').value;
    let acceptedTerms = document.getElementById('acceptedTerms').checked;

    // Validate age (18-55 years old)
    let today = new Date();
    let birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    // If age is not between 18 and 55, show an alert and exit
    if (age < 18 || age > 55) {
        alert("You must be between 18 and 55 years old.");
        return;
    }

    // Save form data to localStorage
    let registrationData = { name, email, password, dob, acceptedTerms };
    let existingData = JSON.parse(localStorage.getItem('registrations')) || [];
    existingData.push(registrationData);
    localStorage.setItem('registrations', JSON.stringify(existingData));

    // Reload table with the new data
    alert("Registration successful!");
    loadData();
});

// Function to load data from localStorage and display it in the table
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

    // Clear data from localStorage
    localStorage.removeItem('registrations');
}

// Add event listener for the Clear Table button
document.getElementById('clearTableButton').addEventListener('click', function() {
    clearTable();
});
