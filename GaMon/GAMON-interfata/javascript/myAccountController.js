/* the user object that will be saved in the database */
let user = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    accountType: "",
    authCode: ""
}

let fullUser = []

function myAccount() {
    let url = "";
    url = "http://localhost:3000/users/token";
    console.log(url);
    fetch(url, {
        method: 'POST',
        mode: "cors",
        body: sessionStorage.getItem('access_token')
    }).then(function (response) {
        console.log(response);
        return response.json();
    })
        .then(function (apiJsonData) {
            console.log('user curent', apiJsonData);
            
            user.firstName = apiJsonData[0].firstName;
            console.log(user.firstName);
            user.lastName = apiJsonData[1].lastName;
            console.log(user.lastName);
            user.emailAddress = apiJsonData[2].emailAddress;
            console.log(user.emailAddress);
            user.accountType = apiJsonData[3].accountType;
            console.log(user.accountType);
            user.authCode = apiJsonData[4].authCode;
            console.log(user.authCode);

            fullUser.push(user);
            fullUser = [...fullUser];
            console.log('full user', fullUser);
            console.log('ce trimit', user);
            let url2 = "http://localhost:3000/user";
            fetch(url2, {
                method: 'POST',
                mode: "cors",
                credentials: 'same-origin',
                body: JSON.stringify(fullUser)
            })
                .then(function (response) {
                    return response.json();
                }).then(function (apiJsonData) {
                    console.log('obiect complet', apiJsonData);
                })
                .then(function (apiJsonData) {
                    console.log('myAccountController:', apiJsonData);
                    sessionStorage.setItem('userEntry', JSON.stringify(apiJsonData[0]));
                    let userSS1 = JSON.parse(sessionStorage.getItem('userEntry'));
        })
    })
}

