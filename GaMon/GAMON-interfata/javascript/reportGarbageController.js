const privateButton = document.getElementById('private-button');
if (sessionStorage.getItem('account_type') === 'Citizen') {
    privateButton.style.display = 'none';
}

displayedName = document.getElementById('displayed-name');
displayedName.innerHTML = sessionStorage.getItem('name');

const button = document.getElementById('report-button');
button.addEventListener('click', reportGarbge);

/* recyclable, household, others */
let general_type = document.querySelectorAll('.titles');

/* garbage type key: value */
let types = []

/* the garbage object that will be saved in the database */
let garbage = {
    id: "",
    date: "",
    size: "",
    location: "",
    requestType: "",
    status: "",
    updatedBy: ""
}

let fullGarbage = []

let accessToken = {}
accessToken.access_token = sessionStorage.getItem('access_token');

fullGarbage.push(accessToken);

general_type.forEach(type => {
    switch (type.innerHTML) {
        case 'Recyclables':
            let specific_type_recyclables = document.querySelectorAll('#recyclable .type-recycle');
            specific_type_recyclables.forEach(type => {
                let obj = {
                    general_type: 'Recyclables',
                    specific_type: type.innerText
                }
                types.push(obj);
            })
            break;
        case 'Household':
            let specific_type_household = document.querySelectorAll('#household .type-recycle');
            specific_type_household.forEach(type => {
                let obj = {
                    general_type: 'Household',
                    specific_type: type.innerText
                }
                types.push(obj);
            })
            break;
        case 'Other':
            let specific_type_other = document.querySelectorAll('#other .type-recycle');
            specific_type_other.forEach(type => {
                let obj = {
                    general_type: 'Others',
                    specific_type: type.innerText
                }
                types.push(obj);
            })
            break;
    }

})

console.log('all types', types);

function reportGarbge() {
    let garbageType = []

    const checkboxes = document.querySelectorAll('.type-recycle [type="checkbox"]');
    checkboxes.forEach(checkbox => {
        if (checkbox.checked === true) {
            let getter = types.filter((p) => p.specific_type === checkbox.parentNode.textContent);
            let garbageObject = {
                general_type: getter[0].general_type,
                specific_type: checkbox.parentNode.textContent
            }
            garbageType.push(garbageObject);
        }
    })

    const radioButtons = document.querySelectorAll('.sizetypes [type="radio"]');
    radioButtons.forEach(radioButton => {
        if (radioButton.checked === true) {
            let label = radioButton.parentNode;
            garbage.size = label.innerText;
        }
    })

    const radioButtonsRequestType = document.querySelectorAll('.requesttypes [type="radio"]');
    radioButtonsRequestType.forEach(radioButton => {
        if (radioButton.checked === true) {
            let label = radioButton.parentNode;
            garbage.requestType = label.innerText;
        }
    })

    const locationInput = document.getElementById('location');
    garbage.location = locationInput.value;

    garbage.status = "Not cleaned";

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    garbage.date = today;
    let obj = { updatedBy: "" }
    let url = "";
    url = "http://127.0.0.1:3000/users/token";
    console.log(url);
    fetch(url, {
        method: 'POST',
        mode: "cors",
        // credentials: 'same-origin',
        body: sessionStorage.getItem('access_token')
    }).then(function (response) {
        console.log(response);
        return response.json();
    })
        .then(function (apiJsonData) {
            console.log('user curent', apiJsonData);

            garbage.updatedBy = apiJsonData[0].first_name + " " + apiJsonData[0].last_name;
            console.log(garbage.updatedBy);
            fullGarbage.push(garbage);
            fullGarbage = [...fullGarbage, ...garbageType];
            console.log('full garbage', fullGarbage);
            console.log('ce trimit', garbage);
            let url2 = "http://localhost:3000/garbage";
            fetch(url2, {
                method: 'POST',
                mode: "cors",
                credentials: 'same-origin',
                body: JSON.stringify(fullGarbage)
            })
                .then(function (response) {
                    return response.json();
                }).then(function (apiJsonData) {
                    console.log('obiect complet', apiJsonData);
                    window.location.replace('dashboard.html');
                })
        })

}