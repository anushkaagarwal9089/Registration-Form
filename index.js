document.addEventListener('DOMContentLoaded', function () {
    const dobInput = document.getElementById('dob');

    // Set the minimum and maximum date for the date input
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    dobInput.min = minDate.toISOString().split('T')[0];
    dobInput.max = maxDate.toISOString().split('T')[0];

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.forEach(user => addUserToTable(user));
});

document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const terms = document.getElementById('terms').checked;

    // Validate email format using pattern and JS regex
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    const age = calculateAge(new Date(dob));
    if (age < 18 || age > 55) {
        alert('Date of Birth must be for people between ages 18 and 55 only.');
        return;
    }

    const user = {
        name,
        email,
        password,
        dob,
        terms
    };

    // Save user data to web storage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    // Add user to table
    addUserToTable(user);

    // Clear the form
    document.getElementById('registrationForm').reset();
});

function calculateAge(dob) {
    const diff = Date.now() - dob.getTime();
    const ageDt = new Date(diff); 
    return Math.abs(ageDt.getUTCFullYear() - 1970);
}

function addUserToTable(user) {
    const table = document.getElementById('userTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const nameCell = newRow.insertCell(0);
    const emailCell = newRow.insertCell(1);
    const passwordCell = newRow.insertCell(2);
    const dobCell = newRow.insertCell(3);
    const termsCell = newRow.insertCell(4);

    nameCell.textContent = user.name;
    emailCell.textContent = user.email;
    passwordCell.textContent = user.password;
    dobCell.textContent = user.dob;
    termsCell.textContent = user.terms ? 'true' : 'false';
}
