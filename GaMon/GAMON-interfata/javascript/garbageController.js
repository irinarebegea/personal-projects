/* controller */
displayedName = document.getElementById('displayed-name');
displayedName.innerHTML = sessionStorage.getItem('name');
function renderDataInTheTable(garbages) {
    const mytable = document.getElementById("dump-list-table");
    garbages.forEach(garbage => {
        let newRow = document.createElement("tr");
        /* check box */
        let firstCell = document.createElement("td");
        let firstCellChild = document.createElement("input");
        firstCellChild.type = "checkbox";
        firstCellChild.id = "id" + garbage.id;
        firstCell.appendChild(firstCellChild);
        newRow.append(firstCell);
        /* dynamic entries */
        Object.entries(garbage).forEach(([key, value]) => {
            let cell = document.createElement("td");

            cell.innerText = value;
            newRow.appendChild(cell);

        })

        /* show details */
        let lastCell = document.createElement("td");
        let lastCellChild = document.createElement("a");
        lastCellChild.textContent = "Details";

        lastCellChild.id = "id_trash" + garbage.id;
        lastCellChild.addEventListener('click', () => {
            let url = "http://localhost:3000/garbage/" + (garbage.id);
            fetch(url, {
                method: 'GET',
                mode: "cors"
                // headers: {
                //     'Access-Control-Request-Headers': 'Authorization',
                //     'Authorization': JSON.stringify(sessionStorage.getItem('access_token'))
                // }
                // body: JSON.stringify(sessionStorage.getItem('access_token'))
            })
                .then(function (response) {
                    return response.json();
                }).then(function (apiJsonData) {
                    console.log('garbageController:', apiJsonData);
                    sessionStorage.setItem('garbageEntry', JSON.stringify(apiJsonData[0]));
                    let garbageSS1 = JSON.parse(sessionStorage.getItem('garbageEntry'));
                    lastCellChild.href = "details-trash-list.html";

                })


        })
        lastCell.append(lastCellChild);
        newRow.append(lastCell);
        mytable.appendChild(newRow);
    });

}


const deleteButton = document.getElementById("delete-button");
deleteButton.addEventListener("click", deleteRecordFromTable);

function deleteRecordFromTable() {
    const mytable = document.getElementById("dump-list-table");
    const checkboxes = document.querySelectorAll('[type="checkbox"]');
    let index = 0;
    checkboxes.forEach(checkbox => {
        index++;
        if (checkbox.checked === true) {
            let matches = checkbox.id.match(/(\d+)/);
            console.log(matches[0]);
            mytable.deleteRow(index);
            let url = "http://localhost:3000/garbage/" + (matches[0]);
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


const updateButton = document.getElementById("update-button");
updateButton.addEventListener("click", markRecordAsCleaned);

function markRecordAsCleaned() {
    const mytable = document.getElementById("dump-list-table");
    const checkboxes = document.querySelectorAll('[type="checkbox"]');
    let index = 0;
    checkboxes.forEach(checkbox => {
        index++;
        if (checkbox.checked === true) {
            let matches = checkbox.id.match(/(\d+)/);
            console.log(index);
            mytable.deleteRow(index);
            let url = "http://localhost:3000/garbage/" + (matches[0]);
            fetch(url, {
                method: 'PUT',
                mode: "cors",
                body: sessionStorage.getItem('access_token')
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
    renderDataInTheTable
}
