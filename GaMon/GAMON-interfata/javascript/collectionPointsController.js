/* controller */


displayedName = document.getElementById('displayed-name');
displayedName.innerHTML = sessionStorage.getItem('name');

function renderDataInTheTable(points) {
    const mytable = document.getElementById("coll-points-list-table");
    points.forEach(point => {
        let newRow = document.createElement("tr");
        /* check box */
        let firstCell = document.createElement("td");
        let firstCellChild = document.createElement("input");
        firstCellChild.type = "checkbox";
        firstCellChild.id = "id" + point.id;
        // console.log('id is', firstCellChild.id);
        // firstCell.onclick = deleteRecordFromTable();
        firstCell.appendChild(firstCellChild);
        newRow.append(firstCell);
        /* dynamic entries */
        Object.entries(point).forEach(([key, value]) => {
            let cell = document.createElement("td");

            cell.innerText = value;
            newRow.appendChild(cell);

        })

        /* show details */
        let lastCell = document.createElement("td");
        let lastCellChild = document.createElement("a");
        lastCellChild.textContent = "Details";

        lastCellChild.id = "id_point" + point.id;
        lastCellChild.addEventListener('click', () => {
            let url = "http://localhost:3000/collectionPoints/" + (point.id);
            fetch(url, {
                method: 'GET',
                mode: "cors"
            })
                .then(function (response) {
                    return response.json();
                }).then(function (apiJsonData) {
                    console.log('collectionPointsController:', apiJsonData);
                    sessionStorage.setItem('pointEntry', JSON.stringify(apiJsonData[0]));
                    let pointSS1 = JSON.parse(sessionStorage.getItem('pointEntry'));
                    lastCellChild.href = "details-collection-point.html";

                })


        })

        lastCell.append(lastCellChild);
        newRow.append(lastCell);
        mytable.appendChild(newRow);
    });



}


const deleteButton = document.getElementById("delete-button");
deleteButton.addEventListener("click", deleteRecordFromTable);

function deleteRecordFromTable( /* id_numerical*/) {
    const mytable = document.getElementById("coll-points-list-table");
    const checkboxes = document.querySelectorAll('[type="checkbox"]');
    let index = 0;
    checkboxes.forEach(checkbox => {
        index++;
        if (checkbox.checked === true) {
            let matches = checkbox.id.match(/(\d+)/);
            console.log(matches[0]);
            mytable.deleteRow(index);
            let url = "http://localhost:3000/collectionPoints/" + (matches[0]);
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

const createButton = document.getElementById('create-button');

const privateButton = document.getElementById('private-button');
if (sessionStorage.getItem('account_type') === 'Citizen') {
    privateButton.style.display = 'none';
    deleteButton.style.display = 'none';
    createButton.style.display = 'none';
}



module.exports = {
    renderDataInTheTable
}
