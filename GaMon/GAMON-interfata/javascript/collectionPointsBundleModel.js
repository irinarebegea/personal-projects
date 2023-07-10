(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/* controller */

const privateButton = document.getElementById('private-button');
if (sessionStorage.getItem('account_type') === 'Citizen') {
    privateButton.style.display = 'none';
}

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

module.exports = {
    renderDataInTheTable
}

},{}],2:[function(require,module,exports){
/* model */
const { renderDataInTheTable } = require('./collectionPointsController');
// import renderDataInTheTable from './collectionPointsController.js';
fetch('http://localhost:3000/collectionPoints')
    .then(function (response) {
        return response.json();
    }).then(function (apiJsonData) {
        console.log(apiJsonData);
        renderDataInTheTable(apiJsonData);
    })
},{"./collectionPointsController":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImphdmFzY3JpcHQvY29sbGVjdGlvblBvaW50c0NvbnRyb2xsZXIuanMiLCJqYXZhc2NyaXB0L2NvbGxlY3Rpb25Qb2ludHNNb2RlbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKiBjb250cm9sbGVyICovXHJcblxyXG5jb25zdCBwcml2YXRlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByaXZhdGUtYnV0dG9uJyk7XHJcbmlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdhY2NvdW50X3R5cGUnKSA9PT0gJ0NpdGl6ZW4nKSB7XHJcbiAgICBwcml2YXRlQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlckRhdGFJblRoZVRhYmxlKHBvaW50cykge1xyXG4gICAgY29uc3QgbXl0YWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29sbC1wb2ludHMtbGlzdC10YWJsZVwiKTtcclxuICAgIHBvaW50cy5mb3JFYWNoKHBvaW50ID0+IHtcclxuICAgICAgICBsZXQgbmV3Um93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xyXG4gICAgICAgIC8qIGNoZWNrIGJveCAqL1xyXG4gICAgICAgIGxldCBmaXJzdENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgbGV0IGZpcnN0Q2VsbENoaWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgIGZpcnN0Q2VsbENoaWxkLnR5cGUgPSBcImNoZWNrYm94XCI7XHJcbiAgICAgICAgZmlyc3RDZWxsQ2hpbGQuaWQgPSBcImlkXCIgKyBwb2ludC5pZDtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnaWQgaXMnLCBmaXJzdENlbGxDaGlsZC5pZCk7XHJcbiAgICAgICAgLy8gZmlyc3RDZWxsLm9uY2xpY2sgPSBkZWxldGVSZWNvcmRGcm9tVGFibGUoKTtcclxuICAgICAgICBmaXJzdENlbGwuYXBwZW5kQ2hpbGQoZmlyc3RDZWxsQ2hpbGQpO1xyXG4gICAgICAgIG5ld1Jvdy5hcHBlbmQoZmlyc3RDZWxsKTtcclxuICAgICAgICAvKiBkeW5hbWljIGVudHJpZXMgKi9cclxuICAgICAgICBPYmplY3QuZW50cmllcyhwb2ludCkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG5cclxuICAgICAgICAgICAgY2VsbC5pbm5lclRleHQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgbmV3Um93LmFwcGVuZENoaWxkKGNlbGwpO1xyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvKiBzaG93IGRldGFpbHMgKi9cclxuICAgICAgICBsZXQgbGFzdENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgbGV0IGxhc3RDZWxsQ2hpbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcclxuICAgICAgICBsYXN0Q2VsbENoaWxkLnRleHRDb250ZW50ID0gXCJEZXRhaWxzXCI7XHJcblxyXG4gICAgICAgIGxhc3RDZWxsQ2hpbGQuaWQgPSBcImlkX3BvaW50XCIgKyBwb2ludC5pZDtcclxuICAgICAgICBsYXN0Q2VsbENoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdXJsID0gXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvY29sbGVjdGlvblBvaW50cy9cIiArIChwb2ludC5pZCk7XHJcbiAgICAgICAgICAgIGZldGNoKHVybCwge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgIG1vZGU6IFwiY29yc1wiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoYXBpSnNvbkRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY29sbGVjdGlvblBvaW50c0NvbnRyb2xsZXI6JywgYXBpSnNvbkRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3BvaW50RW50cnknLCBKU09OLnN0cmluZ2lmeShhcGlKc29uRGF0YVswXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwb2ludFNTMSA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgncG9pbnRFbnRyeScpKTtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0Q2VsbENoaWxkLmhyZWYgPSBcImRldGFpbHMtY29sbGVjdGlvbi1wb2ludC5odG1sXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGxhc3RDZWxsLmFwcGVuZChsYXN0Q2VsbENoaWxkKTtcclxuICAgICAgICBuZXdSb3cuYXBwZW5kKGxhc3RDZWxsKTtcclxuICAgICAgICBteXRhYmxlLmFwcGVuZENoaWxkKG5ld1Jvdyk7XHJcbiAgICB9KTtcclxuXHJcblxyXG5cclxufVxyXG5cclxuXHJcbmNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVsZXRlLWJ1dHRvblwiKTtcclxuZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBkZWxldGVSZWNvcmRGcm9tVGFibGUpO1xyXG5cclxuZnVuY3Rpb24gZGVsZXRlUmVjb3JkRnJvbVRhYmxlKCAvKiBpZF9udW1lcmljYWwqLykge1xyXG4gICAgY29uc3QgbXl0YWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29sbC1wb2ludHMtbGlzdC10YWJsZVwiKTtcclxuICAgIGNvbnN0IGNoZWNrYm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbdHlwZT1cImNoZWNrYm94XCJdJyk7XHJcbiAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgY2hlY2tib3hlcy5mb3JFYWNoKGNoZWNrYm94ID0+IHtcclxuICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgIGlmIChjaGVja2JveC5jaGVja2VkID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGxldCBtYXRjaGVzID0gY2hlY2tib3guaWQubWF0Y2goLyhcXGQrKS8pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtYXRjaGVzWzBdKTtcclxuICAgICAgICAgICAgbXl0YWJsZS5kZWxldGVSb3coaW5kZXgpO1xyXG4gICAgICAgICAgICBsZXQgdXJsID0gXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvY29sbGVjdGlvblBvaW50cy9cIiArIChtYXRjaGVzWzBdKTtcclxuICAgICAgICAgICAgZmV0Y2godXJsLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxyXG4gICAgICAgICAgICAgICAgbW9kZTogXCJjb3JzXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChhcGlKc29uRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFwaUpzb25EYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgcmVuZGVyRGF0YUluVGhlVGFibGVcclxufVxyXG4iLCIvKiBtb2RlbCAqL1xyXG5jb25zdCB7IHJlbmRlckRhdGFJblRoZVRhYmxlIH0gPSByZXF1aXJlKCcuL2NvbGxlY3Rpb25Qb2ludHNDb250cm9sbGVyJyk7XHJcbi8vIGltcG9ydCByZW5kZXJEYXRhSW5UaGVUYWJsZSBmcm9tICcuL2NvbGxlY3Rpb25Qb2ludHNDb250cm9sbGVyLmpzJztcclxuZmV0Y2goJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9jb2xsZWN0aW9uUG9pbnRzJylcclxuICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChhcGlKc29uRGF0YSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGFwaUpzb25EYXRhKTtcclxuICAgICAgICByZW5kZXJEYXRhSW5UaGVUYWJsZShhcGlKc29uRGF0YSk7XHJcbiAgICB9KSJdfQ==
