// script.js
document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const dobInput = document.getElementById('dob');
    const acceptTermsCheckbox = document.getElementById('acceptTerms');
    const submitButton = document.getElementById('submitButton');
    const userTableBody = document.getElementById('userTable').getElementsByTagName('tbody')[0];

    // Load saved users
    let users = JSON.parse(localStorage.getItem('users')) || [];
    displayUsers();

    // Date validation
    dobInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const currentDate = new Date();
        const minAgeDate = new Date(currentDate);
        minAgeDate.setFullYear(minAgeDate.getFullYear() - 55);
        const maxAgeDate = new Date(currentDate);
        maxAgeDate.setFullYear(maxAgeDate.getFullYear() - 18);

        if (selectedDate < minAgeDate || selectedDate > maxAgeDate) {
            alert("Date of birth must be between 18 and 55 years ago.");
            this.value = '';
        } else {
            this.setAttribute('readonly', 'true');
        }
    });

    // Submit button event listener
    submitButton.addEventListener('click', function() {
        const name = nameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
        const dob = dobInput.value;
        const acceptTerms = acceptTermsCheckbox.checked;

        const newUser = { name, email, password, dob, acceptTerms };
        users.push(newUser);

        localStorage.setItem('users', JSON.stringify(users));
        displayUsers();
        resetForm();
    });

    function displayUsers() {
        userTableBody.innerHTML = '';
        users.forEach(user => {
            const row = userTableBody.insertRow();
            row.insertCell().textContent = user.name;
            row.insertCell().textContent = user.email;
            row.insertCell().textContent = user.password;
            row.insertCell().textContent = user.dob;
            row.insertCell().textContent = user.acceptTerms;
        });
    }

    function resetForm() {
        nameInput.value = '';
        emailInput.value = '';
        passwordInput.value = '';
        dobInput.value = '';
        dobInput.removeAttribute('readonly');
        acceptTermsCheckbox.checked = false;
    }
});
