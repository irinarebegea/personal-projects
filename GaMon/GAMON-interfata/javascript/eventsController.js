/* controller */

const privateButton = document.getElementById('private-button');
if (sessionStorage.getItem('account_type') === 'Citizen') {
    privateButton.style.display = 'none';
}

displayedName = document.getElementById('displayed-name');
displayedName.innerHTML = sessionStorage.getItem('name');

function renderDataInTheTable(events) {
    const mytable = document.getElementById("events-list-table");
    events.forEach(event => {
        let newRow = document.createElement("tr");
        /* check box */
        let firstCell = document.createElement("td");
        let firstCellChild = document.createElement("input");
        firstCellChild.type = "checkbox";
        firstCellChild.id = "id" + event.id;
        // console.log('id is', firstCellChild.id);
        // firstCell.onclick = deleteRecordFromTable();
        firstCell.appendChild(firstCellChild);
        newRow.append(firstCell);
        /* dynamic entries */
        Object.entries(event).forEach(([key, value]) => {
            let cell = document.createElement("td");

            cell.innerText = value;
            newRow.appendChild(cell);

        })

        /* show details */

        let lastCell = document.createElement("td");
        let lastCellChild = document.createElement("a");
        lastCellChild.textContent = "Details";

        lastCellChild.id = "id_event" + event.id;
        console.log(lastCellChild);
        lastCellChild.addEventListener('click', () => {
            let url = "http://localhost:3000/events/" + (event.id);
            fetch(url, {
                method: 'GET',
                mode: "cors"
            })
                .then(function (response) {
                    return response.json();
                }).then(function (apiJsonData) {
                    console.log('eventsController:', apiJsonData);
                    sessionStorage.setItem('eventEntry', JSON.stringify(apiJsonData[0]));
                    let eventSS1 = JSON.parse(sessionStorage.getItem('eventEntry'));
                    lastCellChild.href = "details-events.html";

                })


        })

        lastCell.append(lastCellChild);
        newRow.append(lastCell);
        mytable.appendChild(newRow);
    });



}


const deleteButton = document.getElementById("delete-button");
if (sessionStorage.getItem('account_type') === 'Citizen') {
    deleteButton.style.display = 'none';
}
deleteButton.addEventListener("click", deleteRecordFromTable);

function deleteRecordFromTable() {
    const mytable = document.getElementById("events-list-table");
    const checkboxes = document.querySelectorAll('[type="checkbox"]');
    let index = 0;
    checkboxes.forEach(checkbox => {
        index++;
        if (checkbox.checked === true) {
            let matches = checkbox.id.match(/(\d+)/);
            console.log(matches[0]);
            mytable.deleteRow(index);
            let url = "http://localhost:3000/events/" + (matches[0]);
            fetch(url, {
                method: 'DELETE',
                mode: "cors"
            })
                .then(function (response) {
                    return response.json();
                }).then(function (apiJsonData) {
                    console.log(apiJsonData);
                })

        }
    })
}




module.exports = {
    renderDataInTheTable//,
    // deleteRecordFromTable
}
