const privateButton = document.getElementById('private-button');
if (sessionStorage.getItem('account_type') === 'Citizen') {
    privateButton.style.display = 'none';
}

displayedName = document.getElementById('displayed-name');
displayedName.innerHTML = sessionStorage.getItem('name');

const button = document.getElementById('create-button');
button.addEventListener('click', createEvent);

/* the event object that will be saved in the database */
let newEvent = {
    id: "",
    name: "",
    description: "",
    location: "",
    organiser_name: "",
    organiser_email: "",
    organiser_phone: "",
    attendance: "",
    volume: ""
}

let timeTable = []

console.log(timeTable)

let fullEvent = []

let event = {}

function createEvent() {



    //name
    const nameInput = document.getElementById('name');
    newEvent.name = nameInput.value;

    //location
    const locationInput = document.getElementById('location');
    newEvent.location = locationInput.value;

    //description
    const descriptionInput = document.getElementById('big-input');
    newEvent.description = descriptionInput.value;


    /* timetable events */


    //date
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    // newEvent.date = today;

    let obj = [{
        date: today
    }]

    console.log('obj', obj);

    // timeTable.push(obj);


    //start-time
    const startInput = document.getElementById('start');
    // newEvent.start = descriptionInput.value;

    let obj1 = {
        start: startInput.value
    }

    obj.push(obj1);

    // timeTable.push(obj1);


    // timeTable.start = startInput.value;

    //end-time
    const endInput = document.getElementById('big-input');
    // newEvent.description = endInput.value;

    let obj2 = {
        end: endInput.value
    }

    // timeTable.end = endInput.value;
    obj.push(obj2);

    // push.timeTable(obj2);

    console.log('timetable', timeTable);

    /* ------------------ */

    //organiser
    const organiserInput = document.getElementById('organiser');
    newEvent.organiser_name = organiserInput.value;


    //attendance
    const attendanceInput = document.getElementById('attendance');
    newEvent.attendance = attendanceInput.value;

    //volume
    const volumeInput = document.getElementById('volume');
    newEvent.volume = volumeInput.value;

    let url = "http://localhost:3000/users/token";
    fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: sessionStorage.getItem('access_token')
    })
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (apiJsonData) {
            console.log('user curent', apiJsonData);
            newEvent.organiser_email = apiJsonData[0].email_address;
            newEvent.organiser_phone = apiJsonData[0].phone_number;
            console.log('newEvent', newEvent);
            fullEvent.push(newEvent);
            // // fullEvent.push(timeTable);
            fullEvent = [ ...fullEvent, ...obj];
            console.log(fullEvent);
            let url2 = "http://localhost:3000/events";
            fetch(url2, {
                method: 'POST',
                mode: "cors",
                body: JSON.stringify(fullEvent)
            })
                .then(function (response) {
                    return response.json();
                }).then(function (apiJsonData) {
                    console.log('obiect complet', apiJsonData);
                })


        })


}