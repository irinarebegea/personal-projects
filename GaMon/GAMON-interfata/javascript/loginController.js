const button = document.getElementById('submit-button');
button.addEventListener('click', checkCredentials);

function checkCredentials(e) {
    e.preventDefault();
    let credentials = {
        emailAddress: "",
        password: ""
    }

    const emailAddress = document.querySelector('[type="email"]').value;

    credentials.emailAddress = emailAddress;

    const password = document.querySelector('[type="password"]').value;

    credentials.password = password;

    let ok = 0;
    let url = "http://localhost:3000/users/login";
    fetch(url, {
        method: 'POST',
        type: 'basic',
        credentials: 'same-origin',
        mode: 'cors',
        body: JSON.stringify(credentials)
    })
        .then(function (response) {
            for (const header of response.headers) {
                if (header[0] === 'authorization') {
                    sessionStorage.setItem('access_token', header[1]);

                }
            }
            return response.json();
        }).then(function (apiJsonData) {
            console.log(apiJsonData);
            if (apiJsonData.message === 'Login successful.') {
                sessionStorage.setItem('account_type', apiJsonData.accountType);
                sessionStorage.setItem('name', apiJsonData.name);

                window.location.replace('dashboard.html');
            }

            else if (apiJsonData.message === 'Wrong email or password.') {
                e.preventDefault();
                alert("Wrong credentials!");
            }

        })
}

