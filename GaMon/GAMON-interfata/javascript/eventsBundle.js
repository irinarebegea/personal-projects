(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImphdmFzY3JpcHQvZXZlbnRzQ29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qIGNvbnRyb2xsZXIgKi9cclxuXHJcbmNvbnN0IHByaXZhdGVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJpdmF0ZS1idXR0b24nKTtcclxuaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2FjY291bnRfdHlwZScpID09PSAnQ2l0aXplbicpIHtcclxuICAgIHByaXZhdGVCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxufVxyXG5cclxuZGlzcGxheWVkTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5ZWQtbmFtZScpO1xyXG5kaXNwbGF5ZWROYW1lLmlubmVySFRNTCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ25hbWUnKTtcclxuXHJcbmZ1bmN0aW9uIHJlbmRlckRhdGFJblRoZVRhYmxlKGV2ZW50cykge1xyXG4gICAgY29uc3QgbXl0YWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXZlbnRzLWxpc3QtdGFibGVcIik7XHJcbiAgICBldmVudHMuZm9yRWFjaChldmVudCA9PiB7XHJcbiAgICAgICAgbGV0IG5ld1JvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcclxuICAgICAgICAvKiBjaGVjayBib3ggKi9cclxuICAgICAgICBsZXQgZmlyc3RDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgIGxldCBmaXJzdENlbGxDaGlsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICBmaXJzdENlbGxDaGlsZC50eXBlID0gXCJjaGVja2JveFwiO1xyXG4gICAgICAgIGZpcnN0Q2VsbENoaWxkLmlkID0gXCJpZFwiICsgZXZlbnQuaWQ7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2lkIGlzJywgZmlyc3RDZWxsQ2hpbGQuaWQpO1xyXG4gICAgICAgIC8vIGZpcnN0Q2VsbC5vbmNsaWNrID0gZGVsZXRlUmVjb3JkRnJvbVRhYmxlKCk7XHJcbiAgICAgICAgZmlyc3RDZWxsLmFwcGVuZENoaWxkKGZpcnN0Q2VsbENoaWxkKTtcclxuICAgICAgICBuZXdSb3cuYXBwZW5kKGZpcnN0Q2VsbCk7XHJcbiAgICAgICAgLyogZHluYW1pYyBlbnRyaWVzICovXHJcbiAgICAgICAgT2JqZWN0LmVudHJpZXMoZXZlbnQpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuXHJcbiAgICAgICAgICAgIGNlbGwuaW5uZXJUZXh0ID0gdmFsdWU7XHJcbiAgICAgICAgICAgIG5ld1Jvdy5hcHBlbmRDaGlsZChjZWxsKTtcclxuXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLyogc2hvdyBkZXRhaWxzICovXHJcblxyXG4gICAgICAgIGxldCBsYXN0Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICBsZXQgbGFzdENlbGxDaGlsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG4gICAgICAgIGxhc3RDZWxsQ2hpbGQudGV4dENvbnRlbnQgPSBcIkRldGFpbHNcIjtcclxuXHJcbiAgICAgICAgbGFzdENlbGxDaGlsZC5pZCA9IFwiaWRfZXZlbnRcIiArIGV2ZW50LmlkO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGxhc3RDZWxsQ2hpbGQpO1xyXG4gICAgICAgIGxhc3RDZWxsQ2hpbGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB1cmwgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9ldmVudHMvXCIgKyAoZXZlbnQuaWQpO1xyXG4gICAgICAgICAgICBmZXRjaCh1cmwsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICBtb2RlOiBcImNvcnNcIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGFwaUpzb25EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2V2ZW50c0NvbnRyb2xsZXI6JywgYXBpSnNvbkRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2V2ZW50RW50cnknLCBKU09OLnN0cmluZ2lmeShhcGlKc29uRGF0YVswXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBldmVudFNTMSA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnZXZlbnRFbnRyeScpKTtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0Q2VsbENoaWxkLmhyZWYgPSBcImRldGFpbHMtZXZlbnRzLmh0bWxcIjtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgbGFzdENlbGwuYXBwZW5kKGxhc3RDZWxsQ2hpbGQpO1xyXG4gICAgICAgIG5ld1Jvdy5hcHBlbmQobGFzdENlbGwpO1xyXG4gICAgICAgIG15dGFibGUuYXBwZW5kQ2hpbGQobmV3Um93KTtcclxuICAgIH0pO1xyXG5cclxuXHJcblxyXG59XHJcblxyXG5cclxuY29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZWxldGUtYnV0dG9uXCIpO1xyXG5pZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnYWNjb3VudF90eXBlJykgPT09ICdDaXRpemVuJykge1xyXG4gICAgZGVsZXRlQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbn1cclxuZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBkZWxldGVSZWNvcmRGcm9tVGFibGUpO1xyXG5cclxuZnVuY3Rpb24gZGVsZXRlUmVjb3JkRnJvbVRhYmxlKCkge1xyXG4gICAgY29uc3QgbXl0YWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXZlbnRzLWxpc3QtdGFibGVcIik7XHJcbiAgICBjb25zdCBjaGVja2JveGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3R5cGU9XCJjaGVja2JveFwiXScpO1xyXG4gICAgbGV0IGluZGV4ID0gMDtcclxuICAgIGNoZWNrYm94ZXMuZm9yRWFjaChjaGVja2JveCA9PiB7XHJcbiAgICAgICAgaW5kZXgrKztcclxuICAgICAgICBpZiAoY2hlY2tib3guY2hlY2tlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2hlcyA9IGNoZWNrYm94LmlkLm1hdGNoKC8oXFxkKykvKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobWF0Y2hlc1swXSk7XHJcbiAgICAgICAgICAgIG15dGFibGUuZGVsZXRlUm93KGluZGV4KTtcclxuICAgICAgICAgICAgbGV0IHVybCA9IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2V2ZW50cy9cIiArIChtYXRjaGVzWzBdKTtcclxuICAgICAgICAgICAgZmV0Y2godXJsLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxyXG4gICAgICAgICAgICAgICAgbW9kZTogXCJjb3JzXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChhcGlKc29uRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFwaUpzb25EYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgcmVuZGVyRGF0YUluVGhlVGFibGUvLyxcclxuICAgIC8vIGRlbGV0ZVJlY29yZEZyb21UYWJsZVxyXG59XHJcbiJdfQ==
