const privateButton = document.getElementById('private-button');
if (sessionStorage.getItem('account_type') === 'Citizen') {
    privateButton.style.display = 'none';
}

displayedName = document.getElementById('displayed-name');
displayedName.innerHTML = sessionStorage.getItem('name');


/* current point from session storage */
let pointSS = JSON.parse(sessionStorage.getItem('pointEntry'));

/* name */
let point_name = document.getElementById('point-name');
let nameHeader = document.createElement("h1");
nameHeader.classList.add('name');
nameHeader.textContent = pointSS.point_name;
point_name.appendChild(nameHeader);

/* email */
let email = document.getElementById('point-email');
let emailHeader = document.createElement("span");
emailHeader.classList.add('icon');
emailHeader.textContent = pointSS.email;
email.appendChild(emailHeader);

/* phone */
let phone = document.getElementById('point-phone');
let phoneHeader = document.createElement("span");
phoneHeader.classList.add('icon');
phoneHeader.textContent = pointSS.phone;
phone.appendChild(phoneHeader);

/* size */
let point_size = document.getElementById('point-size');
let sizeHeader = document.createElement('span');
sizeHeader.classList.add('icon');
sizeHeader.textContent = pointSS.point_size;
point_size.appendChild(sizeHeader);

/* location */
let point_location = document.getElementById('point-location');
let locationHeader = document.createElement("span");
locationHeader.classList.add('icon');
locationHeader.textContent = pointSS.location;
point_location.appendChild(locationHeader);

console.log('Point by id:', pointSS);

/* timetable */
let urlTimetable = "http://localhost:3000/collectionPoints/" + (pointSS.id) + "/program";
fetch(urlTimetable, {
    method: 'GET',
    mode: "cors"
})
    .then(function (response) {
        return response.json();
    }).then(function (pointProgram) {
        console.log('Program by id:', pointProgram);
        console.log(pointSS.id);
        let mon = document.getElementById('mon');
        let tue = document.getElementById('tue');
        let wed = document.getElementById('wed');
        let thu = document.getElementById('thu');
        let fri = document.getElementById('fri');
        let sat = document.getElementById('sat');
        let sun = document.getElementById('sun');

        pointProgram.forEach(element => {
            let newElement1 = document.createElement('td');
            newElement1.textContent = element.start_time;
            let newElement2 = document.createElement('td');
            newElement2.textContent = element.end_time;
            switch (element.day) {
                case 'Mon':
                    mon.appendChild(newElement1);
                    mon.appendChild(newElement2);
                    break;
                case 'Tue':
                    tue.appendChild(newElement1);
                    tue.appendChild(newElement2);
                    break;
                case 'Wed':
                    wed.appendChild(newElement1);
                    wed.appendChild(newElement2);
                    break;
                case 'Thu':
                    thu.appendChild(newElement1);
                    thu.appendChild(newElement2);
                    break;
                case 'Fri':
                    fri.appendChild(newElement1);
                    fri.appendChild(newElement2);
                    break;
                case 'Sat':
                    sat.appendChild(newElement1);
                    sat.appendChild(newElement2);
                    break;
                case 'Sun':
                    sun.appendChild(newElement1);
                    sun.appendChild(newElement2);

            }

        });
    })

/* collection point types */
let url = "http://localhost:3000/collectionPoints/" + (pointSS.id) + "/type";
fetch(url, {
    method: 'GET',
    mode: "cors"
})
    .then(function (response) {
        return response.json();
    }).then(function (garbageTypePoints) {
        console.log('Garbage types by id:', garbageTypePoints);
        console.log(pointSS.id);
        let recyclables = document.getElementById('recyclable');
        let household = document.getElementById('household');
        let others = document.getElementById('other');

        garbageTypePoints.forEach(element => {
            let newElement = document.createElement('p');
            newElement.classList.add('text');
            newElement.textContent = element.specific_type;
            switch (element.general_type) {
                case 'Recyclables':
                    recyclables.appendChild(newElement);
                    break;
                case 'Household':
                    household.appendChild(newElement);
                    break;
                case 'Others':
                    others.appendChild(newElement);

            }

        });
    })