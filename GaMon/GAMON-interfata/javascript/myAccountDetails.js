/* current account from session storage */
let userSS = JSON.parse(sessionStorage.getItem('userEntry'));

/* name */
let urlName = "http://localhost:3000/users/" + (userSS.id);
fetch(urlName, {
    method: 'GET',
    mode: "cors"
})
    .then(function (response) {
        return response.json();
    }).then(function (user) {
        console.log('User by id:', user);
        console.log(userSS.id);

        //name
        let name = document.getElementById('name-bar');
        let nameHeader = document.createElement("h1");
        nameHeader.classList.add('user-name');
        nameHeader.textContent = userSS.first_name + " " + userSS.last_name;
        name.appendChild(nameHeader);
        //email
        let email = document.getElementById('email');
        let emailHeader = document.createElement("span");
        emailHeader.classList.add('adress');
        emailHeader.textContent = userSS.email_address;
        email.appendChild(emailHeader);
        //level
        let level = document.getElementById('no-level');
        let levelHeader = document.createElement("span");
        levelHeader.classList.add('number-level');
        levelHeader.textContent = userSS.clean_level;
        level.appendChild(levelHeader);
        //reports
        let reports = document.getElementById('reports');
        let reportsHeader = document.createElement("p");
        reportsHeader.classList.add('small-box-text');
        reportsHeader.textContent = userSS.reports;
        reports.appendChild(reportsHeader);
        //events
        let events = document.getElementById('events');
        let eventsHeader = document.createElement("p");
        eventsHeader.classList.add('small-box-text');
        eventsHeader.textContent = userSS.events;
        events.appendChild(eventsHeader);

        //acc type
        let url = "http://localhost:3000/users/" + (userSS.id) + "/type";
        fetch(url, {
            method: 'GET',
            mode: "cors"
        })
            .then(function (response) {
                return response.json();
            }).then(function (userType) {
                console.log('User types by id:', userType);
                console.log(userSS.id);
                let citizen = document.getElementById('citizen');
                let authorized = document.getElementById('authorized');

                userType.forEach(element => {
                    let newElement = document.createElement('span');
                    newElement.classList.add('account-text');
                    newElement.textContent = element.account_type;
                    switch (userSS.account_type) {
                        case 'Citizen':
                            citizen.appendChild(newElement);
                            break;
                        case 'Authorized':
                            authorized.appendChild(newElement);

                    }

                });
            })
    })

