document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const userTableBody = document.getElementById('userTable').querySelector('tbody');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const dobInput = document.getElementById('dob');
    const acceptedTermsInput = document.getElementById('acceptedTerms');

    // Calculate min and max dates for the date picker
    const today = new Date();
    let maxDate = new Date(today);
    maxDate.setFullYear(today.getFullYear() - 18); // 18 years ago

    let minDate = new Date(today);
    minDate.setFullYear(today.getFullYear() - 55); // 55 years ago

    // Format the min and max dates for the input[type="date"]
    const formatDate = (date) => {
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        let day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    dobInput.setAttribute('max', formatDate(maxDate));
    dobInput.setAttribute('min', formatDate(minDate));

    // Attempt to completely disable typing (more robust)
    dobInput.addEventListener('keydown', function(event) {
        event.preventDefault(); // Prevent any key presses from entering the field
    });

    dobInput.addEventListener('paste', function(event) {
        event.preventDefault();  // Prevent pasting
    });

    dobInput.addEventListener('contextmenu', function(event) {
        event.preventDefault(); // Prevent right-click context menu
    });


    // Load saved data from local storage
    loadData();


    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        if (!validateAge(dobInput.value)) {
            alert("Age must be between 18 and 55.");
            return;
        }

        const name = nameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
        const dob = dobInput.value;
        const acceptedTerms = acceptedTermsInput.checked;

        // Create a new row in the table
        const newRow = userTableBody.insertRow();
        const nameCell = newRow.insertCell();
        const emailCell = newRow.insertCell();
        const passwordCell = newRow.insertCell();
        const dobCell = newRow.insertCell();
        const acceptedTermsCell = newRow.insertCell();

        nameCell.textContent = name;
        emailCell.textContent = email;
        passwordCell.textContent = password;
        dobCell.textContent = dob;
        acceptedTermsCell.textContent = acceptedTerms;

        // Save data to local storage
        saveData(name, email, password, dob, acceptedTerms);

        // Clear the form fields
        nameInput.value = '';
        emailInput.value = '';
        passwordInput.value = '';
        dobInput.value = '';
        acceptedTermsInput.checked = false;
    });


    function validateAge(dateString) {
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();

        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age >= 18 && age <= 55;
    }


    function saveData(name, email, password, dob, acceptedTerms) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ name, email, password, dob, acceptedTerms });
        localStorage.setItem('users', JSON.stringify(users));
    }


    function loadData() {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.forEach(user => {
            const newRow = userTableBody.insertRow();
            const nameCell = newRow.insertCell();
            const emailCell = newRow.insertCell();
            const passwordCell = newRow.insertCell();
            const dobCell = newRow.insertCell();
            const acceptedTermsCell = newRow.insertCell();

            nameCell.textContent = user.name;
            emailCell.textContent = user.email;
            passwordCell.textContent = user.password;
            dobCell.textContent = user.dob;
            acceptedTermsCell.textContent = user.acceptedTerms;
        });
    }
});
