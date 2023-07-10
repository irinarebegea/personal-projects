const privateButton = document.getElementById('private-button');
if (sessionStorage.getItem('account_type') === 'Citizen') {
    privateButton.style.display = 'none';
}

displayedName = document.getElementById('displayed-name');
displayedName.innerHTML = sessionStorage.getItem('name');

const button = document.getElementById('create-button');
button.addEventListener('click', createPoint);

/* recyclable, household, others */
let general_type = document.querySelectorAll('.titles');

/* garbage type key: value */
let types = []

/* the point object that will be saved in the database */
let point = {
    id: "",
    name: "",
    size: "",
    location: "",
    email: "",
    phone: ""

}

let fullPoint = []

let timeTable = []



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

function createPoint() {
    //size
    const radioButtons = document.querySelectorAll('.sizetypes [type="radio"]');
    radioButtons.forEach(radioButton => {
        if (radioButton.checked === true) {
            let label = radioButton.parentNode;
            point.size = label.innerText;
        }
    })

    //name
    const nameInput = document.getElementById('name');
    point.name = nameInput.value;

    //location
    const locationInput = document.getElementById('location');
    point.location = locationInput.value;

    //email
    const emailInput = document.getElementById('email');
    point.email = emailInput.value;

    //phone
    const phoneInput = document.getElementById('phone');
    point.phone = phoneInput.value;

    //collection point types
    let pointType = []

    const checkboxes = document.querySelectorAll('.type-recycle [type="checkbox"]');
    checkboxes.forEach(checkbox => {
        if (checkbox.checked === true) {
            let getter = types.filter((p) => p.specific_type === checkbox.parentNode.textContent);
            let pointTypeObject = {
                general_type: getter[0].general_type,
                specific_type: checkbox.parentNode.textContent
            }
            pointType.push(pointTypeObject);
        }
    })

    fullPoint.push(point);
    fullPoint = [...fullPoint, ...pointType];
    console.log('full point', fullPoint);
    // console.log('ce trimit', point);

    timeTable = []

    let weekdays = document.querySelectorAll('[type="time"]');

    let weekdaysNames = document.querySelectorAll('.weekday');
    weekdaysNames.forEach(wd => {
        console.log(wd.innerHTML);

    })
    console.log(weekdaysNames);

    for (i = 0, j=0; i < 13; i = i + 2, j++) {
        let obj = {
            day: "",
            start_time: "",
            end_time: ""
        }
        obj.day = weekdaysNames[j].innerHTML;
        obj.start_time = weekdays[i].value;
        obj.end_time = weekdays[i+1].value;

        timeTable.push(obj);
    }

    console.log(timeTable);


    let url = "http://localhost:3000/collectionPoints";
    fetch(url, {
        method: 'POST',
        mode: "cors",
        body: JSON.stringify(fullPoint)
    })
        .then(function (response) {
            return response.json();
        }).then(function (apiJsonData) {
            console.log('obiect complet', apiJsonData);
            url2 = "http://localhost:3000/collectionPoints/type";
            fetch(url2, {
                method: 'POST',
                mode: "cors",
                body: JSON.stringify(timeTable)
            }) .then(function (response) {
                return response.json();
            }).then(function (apiJsonData) {
                console.log(apiJsonData);
            })
        })



}

