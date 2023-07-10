const button = document.getElementById('submit-button');
button.addEventListener('click', registerUser);

function registerUser(e) {
    e.preventDefault();

    let user = {
        firstName: "",
        lastName: "",
        emailAddress: "",
        password: "",
        accountType: "",
        authCode: ""
    }

    let first_name = document.getElementById('firstname').value;
    user.firstName = first_name;

    let last_name = document.getElementById('lastname').value;
    user.lastName = last_name;

    let email_address = document.querySelector('[type="email"]').value;
    user.emailAddress = email_address;

    let password = document.querySelector('[type="password"]').value;
    user.password = password;

    let account_type = document.querySelectorAll('.acctypes [type="radio"]');
    account_type.forEach(radioButton => {
        if (radioButton.checked === true) {
            let label = radioButton.parentNode;
            if (label.innerText === 'Citizen') {
                user.authCode = '100';
            }
            else {
                user.accountType = label.innerText;
                user.authCode = document.getElementById('authcode').value;
            }
        }
    })

    // let auth_code = document.getElementById('authcode').value;
    // user.authCode = auth_code;

    // console.log(user);

    let url = "http://localhost:3000/users";
    fetch(url, {
        method: 'POST',
        mode: "cors",
        type: 'basic',
        credentials: 'same-origin',
        body: JSON.stringify(user)
    })
        .then(function (response) {
            return response.json();
        }).then(function (apiJsonData) {
            // console.log(apiJsonData);
            if (apiJsonData.message === 'This email address is already registered.') {
                e.preventDefault();
                alert(apiJsonData.message);
            }

            else if (apiJsonData.message === 'You have to provide the code of the organisation to whom you belong.') {
                e.preventDefault();
                alert(apiJsonData.message);
            }

            else if (apiJsonData.message === 'The code of the organisation is not valid.') {
                e.preventDefault();
                alert(apiJsonData.message);
            }

            else {
                console.log('ok00');
                window.location.replace('login.html');
            }
        })


}