(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImphdmFzY3JpcHQvZ2FyYmFnZUNvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyogY29udHJvbGxlciAqL1xyXG5kaXNwbGF5ZWROYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXllZC1uYW1lJyk7XHJcbmRpc3BsYXllZE5hbWUuaW5uZXJIVE1MID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnbmFtZScpO1xyXG5mdW5jdGlvbiByZW5kZXJEYXRhSW5UaGVUYWJsZShnYXJiYWdlcykge1xyXG4gICAgY29uc3QgbXl0YWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVtcC1saXN0LXRhYmxlXCIpO1xyXG4gICAgZ2FyYmFnZXMuZm9yRWFjaChnYXJiYWdlID0+IHtcclxuICAgICAgICBsZXQgbmV3Um93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xyXG4gICAgICAgIC8qIGNoZWNrIGJveCAqL1xyXG4gICAgICAgIGxldCBmaXJzdENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgbGV0IGZpcnN0Q2VsbENoaWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgIGZpcnN0Q2VsbENoaWxkLnR5cGUgPSBcImNoZWNrYm94XCI7XHJcbiAgICAgICAgZmlyc3RDZWxsQ2hpbGQuaWQgPSBcImlkXCIgKyBnYXJiYWdlLmlkO1xyXG4gICAgICAgIGZpcnN0Q2VsbC5hcHBlbmRDaGlsZChmaXJzdENlbGxDaGlsZCk7XHJcbiAgICAgICAgbmV3Um93LmFwcGVuZChmaXJzdENlbGwpO1xyXG4gICAgICAgIC8qIGR5bmFtaWMgZW50cmllcyAqL1xyXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKGdhcmJhZ2UpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuXHJcbiAgICAgICAgICAgIGNlbGwuaW5uZXJUZXh0ID0gdmFsdWU7XHJcbiAgICAgICAgICAgIG5ld1Jvdy5hcHBlbmRDaGlsZChjZWxsKTtcclxuXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLyogc2hvdyBkZXRhaWxzICovXHJcbiAgICAgICAgbGV0IGxhc3RDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgIGxldCBsYXN0Q2VsbENoaWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XHJcbiAgICAgICAgbGFzdENlbGxDaGlsZC50ZXh0Q29udGVudCA9IFwiRGV0YWlsc1wiO1xyXG5cclxuICAgICAgICBsYXN0Q2VsbENoaWxkLmlkID0gXCJpZF90cmFzaFwiICsgZ2FyYmFnZS5pZDtcclxuICAgICAgICBsYXN0Q2VsbENoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdXJsID0gXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvZ2FyYmFnZS9cIiArIChnYXJiYWdlLmlkKTtcclxuICAgICAgICAgICAgZmV0Y2godXJsLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgbW9kZTogXCJjb3JzXCJcclxuICAgICAgICAgICAgICAgIC8vIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAnQWNjZXNzLUNvbnRyb2wtUmVxdWVzdC1IZWFkZXJzJzogJ0F1dGhvcml6YXRpb24nLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICdBdXRob3JpemF0aW9uJzogSlNPTi5zdHJpbmdpZnkoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnYWNjZXNzX3Rva2VuJykpXHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAvLyBib2R5OiBKU09OLnN0cmluZ2lmeShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdhY2Nlc3NfdG9rZW4nKSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChhcGlKc29uRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnYXJiYWdlQ29udHJvbGxlcjonLCBhcGlKc29uRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnZ2FyYmFnZUVudHJ5JywgSlNPTi5zdHJpbmdpZnkoYXBpSnNvbkRhdGFbMF0pKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZ2FyYmFnZVNTMSA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnZ2FyYmFnZUVudHJ5JykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RDZWxsQ2hpbGQuaHJlZiA9IFwiZGV0YWlscy10cmFzaC1saXN0Lmh0bWxcIjtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgfSlcclxuICAgICAgICBsYXN0Q2VsbC5hcHBlbmQobGFzdENlbGxDaGlsZCk7XHJcbiAgICAgICAgbmV3Um93LmFwcGVuZChsYXN0Q2VsbCk7XHJcbiAgICAgICAgbXl0YWJsZS5hcHBlbmRDaGlsZChuZXdSb3cpO1xyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG5cclxuY29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZWxldGUtYnV0dG9uXCIpO1xyXG5kZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGRlbGV0ZVJlY29yZEZyb21UYWJsZSk7XHJcblxyXG5mdW5jdGlvbiBkZWxldGVSZWNvcmRGcm9tVGFibGUoKSB7XHJcbiAgICBjb25zdCBteXRhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdW1wLWxpc3QtdGFibGVcIik7XHJcbiAgICBjb25zdCBjaGVja2JveGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3R5cGU9XCJjaGVja2JveFwiXScpO1xyXG4gICAgbGV0IGluZGV4ID0gMDtcclxuICAgIGNoZWNrYm94ZXMuZm9yRWFjaChjaGVja2JveCA9PiB7XHJcbiAgICAgICAgaW5kZXgrKztcclxuICAgICAgICBpZiAoY2hlY2tib3guY2hlY2tlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2hlcyA9IGNoZWNrYm94LmlkLm1hdGNoKC8oXFxkKykvKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobWF0Y2hlc1swXSk7XHJcbiAgICAgICAgICAgIG15dGFibGUuZGVsZXRlUm93KGluZGV4KTtcclxuICAgICAgICAgICAgbGV0IHVybCA9IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2dhcmJhZ2UvXCIgKyAobWF0Y2hlc1swXSk7XHJcbiAgICAgICAgICAgIGZldGNoKHVybCwge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcclxuICAgICAgICAgICAgICAgIG1vZGU6IFwiY29yc1wiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoYXBpSnNvbkRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhcGlKc29uRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuY29uc3QgdXBkYXRlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1cGRhdGUtYnV0dG9uXCIpO1xyXG51cGRhdGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1hcmtSZWNvcmRBc0NsZWFuZWQpO1xyXG5cclxuZnVuY3Rpb24gbWFya1JlY29yZEFzQ2xlYW5lZCgpIHtcclxuICAgIGNvbnN0IG15dGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1bXAtbGlzdC10YWJsZVwiKTtcclxuICAgIGNvbnN0IGNoZWNrYm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbdHlwZT1cImNoZWNrYm94XCJdJyk7XHJcbiAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgY2hlY2tib3hlcy5mb3JFYWNoKGNoZWNrYm94ID0+IHtcclxuICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgIGlmIChjaGVja2JveC5jaGVja2VkID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGxldCBtYXRjaGVzID0gY2hlY2tib3guaWQubWF0Y2goLyhcXGQrKS8pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpbmRleCk7XHJcbiAgICAgICAgICAgIG15dGFibGUuZGVsZXRlUm93KGluZGV4KTtcclxuICAgICAgICAgICAgbGV0IHVybCA9IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2dhcmJhZ2UvXCIgKyAobWF0Y2hlc1swXSk7XHJcbiAgICAgICAgICAgIGZldGNoKHVybCwge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcclxuICAgICAgICAgICAgICAgIG1vZGU6IFwiY29yc1wiLFxyXG4gICAgICAgICAgICAgICAgYm9keTogc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnYWNjZXNzX3Rva2VuJylcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChhcGlKc29uRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFwaUpzb25EYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgcmVuZGVyRGF0YUluVGhlVGFibGVcclxufVxyXG4iXX0=
