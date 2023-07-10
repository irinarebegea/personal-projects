const privateButton = document.getElementById('private-button');
if (sessionStorage.getItem('account_type') === 'Citizen') {
    privateButton.style.display = 'none';
}

displayedName = document.getElementById('displayed-name');
displayedName.innerHTML = sessionStorage.getItem('name');

/* current garbage from session storage */
let garbageSS = JSON.parse(sessionStorage.getItem('garbageEntry'));

/* location */
let garbage_location = document.getElementById('garbage-location');
let locationHeader = document.createElement("h1");
locationHeader.classList.add('street-name');
locationHeader.textContent = garbageSS.location;
garbage_location.appendChild(locationHeader);

/* size */
let garbage_size = document.getElementById('garbage-size');
let sizeHeader = document.createElement('span');
sizeHeader.classList.add('little-text');
sizeHeader.textContent = garbageSS.garbage_size;
garbage_size.appendChild(sizeHeader);


/* status */
let garbage_status = document.getElementById('garbage-status');
let statusHeader = document.createElement('span');
statusHeader.classList.add('little-text');
statusHeader.textContent = garbageSS.status;
garbage_status.appendChild(statusHeader);



/* updated by */
let updated_by = document.getElementById('updated-by');
let updatedHeader = document.createElement('p');
updatedHeader.classList.add('little-text');
updatedHeader.classList.add('img-text');
updatedHeader.textContent = garbageSS.updated_by;
updated_by.appendChild(updatedHeader);

console.log('Garbage by id:', garbageSS);

/* garbage types */
let url = "http://localhost:3000/garbage/" + (garbageSS.id) + "/type";
fetch(url, {
    method: 'GET',
    mode: "cors"
})
    .then(function (response) {
        return response.json();
    }).then(function (garbageType) {
        console.log('Garbage types by id:', garbageType);
        console.log(garbageSS.id);
        let recyclables = document.getElementById('recyclable');
        let household = document.getElementById('household');
        let others = document.getElementById('other');

        garbageType.forEach(element => {
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


/* images */

let first_image = document.getElementById('first-image');
let second_image = document.getElementById('second-image');
let third_image = document.getElementById('third-image');
let firstImageChild = document.createElement('img');
let secondImageChild = document.createElement('img');
let thirdImageChild = document.createElement('img');


firstImageChild.src = garbageSS.image_path1;
first_image.appendChild(firstImageChild);

secondImageChild.src = garbageSS.image_path2;
second_image.appendChild(secondImageChild);

thirdImageChild.src = garbageSS.image_path3;
third_image.appendChild(thirdImageChild);