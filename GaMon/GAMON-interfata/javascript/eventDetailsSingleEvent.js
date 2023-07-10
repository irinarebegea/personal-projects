displayedName = document.getElementById('displayed-name');
displayedName.innerHTML = sessionStorage.getItem('name');

/* current event from session storage */
let eventSS = JSON.parse(sessionStorage.getItem('eventEntry'));

const privateButton = document.getElementById('private-button');
if (sessionStorage.getItem('account_type') === 'Citizen') {
    privateButton.style.display = 'none';
}

/* name */
let event_name = document.getElementById('event-name-and-description');
let nameHeader = document.createElement('h1');
nameHeader.classList.add('event-name');
nameHeader.textContent = eventSS.event_name;
event_name.appendChild(nameHeader);

/* description */
let event_description = document.getElementById('event-name-and-description');
let descriptionHeader = document.createElement('p');
descriptionHeader.classList.add('text');
descriptionHeader.textContent = eventSS.description;
event_description.appendChild(descriptionHeader);

/* location */


/* when */

let row = []
let rows = document.querySelectorAll('.first-col');

console.log(rows);


let url = "http://localhost:3000/events/" + (eventSS.id) + "/program";
fetch(url, {
    method: 'GET',
    mode: "cors"
})
    .then(function (response) {
        return response.json();
    }).then(function (eventProgram) {
        console.log('Program by id:', eventProgram);
        console.log(eventSS.id);

        let dateColumn = document.getElementById('date');
        let timeColumn = document.getElementById('time');

        eventProgram.forEach(element => {
            let newElement1 = document.createElement('td');
            newElement1.classList.add('when');
            newElement1.classList.add('when-td');
            newElement1.textContent = element.date;

            let newElement2 = document.createElement('td');
            newElement2.classList.add('when');
            newElement2.classList.add('when-td');
            newElement2.textContent = element.date;

            let newElement3 = document.createElement('td');
            newElement3.classList.add('when-td');
            newElement3.textContent = element.start_time;

            let newElement4 = document.createElement('td');
            newElement4.classList.add('when-td');
            newElement4.textContent = element.end_time;

            rows.forEach(row => {
                console.log('in foreach', row);
                console.log('row html', row.innerHTML);
                switch (row.innerHTML) {
                    case 'Date':
                        dateColumn.appendChild(newElement1);
                        dateColumn.appendChild(newElement2);
                        break;
                    case 'Time':
                        timeColumn.appendChild(newElement3);
                        timeColumn.appendChild(newElement4);
                }
            })


        });
    })

/* organiser-name */

let organiser_name = document.getElementById('organiser-name');
let organiserNameHeader = document.createElement('td');
organiserNameHeader.textContent = eventSS.organiser_name;
organiser_name.appendChild(organiserNameHeader);

/* organiser-phone */
let organiser_phone = document.getElementById('organiser-phone');
let organiserPhoneHeader = document.createElement('td');
organiserPhoneHeader.textContent = eventSS.organiser_phone;
organiser_phone.appendChild(organiserPhoneHeader);

/* organiser email address */
let organiser_email = document.getElementById('organiser-email');
let organiserEmailHeader = document.createElement('td');
organiserEmailHeader.textContent = eventSS.organiser_email;
organiser_email.appendChild(organiserEmailHeader);

/* participants */
let participants = document.getElementById('participants-event');
let participantsHeader = document.createElement('h1');
participantsHeader.classList.add('nr-participants-volume');
participantsHeader.textContent = eventSS.attendance_number;
participants.appendChild(participantsHeader);

const attendButton = document.getElementById('attend-button');
attendButton.addEventListener('click', () => {
    console.log(1);
    const initialText = 'attend';

    console.log(attendButton.textContent.toLowerCase());

    let createBody = []

    if (attendButton.textContent.toLowerCase() === initialText.toLowerCase()) {
        attendButton.textContent = "Don't attend";
        participantsHeader.textContent = eventSS.attendance_number + 1;
        participants.appendChild(participantsHeader);
        createBody.push({ token: sessionStorage.getItem('access_token') } );
        createBody.push({ message: 'incrementEvents' });
        console.log('create body', createBody);
        
    } 
    
    else {
        attendButton.textContent = initialText;
        participantsHeader.textContent = eventSS.attendance_number;
        participants.appendChild(participantsHeader);
        createBody.push({ token: sessionStorage.getItem('access_token') } );
        createBody.push({ message: 'decrementEvents' });
    }

    let url = "http://localhost:3000/users/token";
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(createBody)
        })
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function (apiJsonData) {
                console.log('user curent', apiJsonData);
            })



})
/* volume */
let volume = document.getElementById('volume-event');
let volumeHeader = document.createElement('h1');
volumeHeader.classList.add('nr-participants-volume');
volumeHeader.textContent = eventSS.volume_waste;
volume.appendChild(volumeHeader);

console.log('Event by id:', eventSS);
