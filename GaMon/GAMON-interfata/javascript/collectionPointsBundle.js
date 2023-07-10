(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImphdmFzY3JpcHQvY29sbGVjdGlvblBvaW50c0NvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qIGNvbnRyb2xsZXIgKi9cclxuXHJcblxyXG5kaXNwbGF5ZWROYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXllZC1uYW1lJyk7XHJcbmRpc3BsYXllZE5hbWUuaW5uZXJIVE1MID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnbmFtZScpO1xyXG5cclxuZnVuY3Rpb24gcmVuZGVyRGF0YUluVGhlVGFibGUocG9pbnRzKSB7XHJcbiAgICBjb25zdCBteXRhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb2xsLXBvaW50cy1saXN0LXRhYmxlXCIpO1xyXG4gICAgcG9pbnRzLmZvckVhY2gocG9pbnQgPT4ge1xyXG4gICAgICAgIGxldCBuZXdSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XHJcbiAgICAgICAgLyogY2hlY2sgYm94ICovXHJcbiAgICAgICAgbGV0IGZpcnN0Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICBsZXQgZmlyc3RDZWxsQ2hpbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgZmlyc3RDZWxsQ2hpbGQudHlwZSA9IFwiY2hlY2tib3hcIjtcclxuICAgICAgICBmaXJzdENlbGxDaGlsZC5pZCA9IFwiaWRcIiArIHBvaW50LmlkO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdpZCBpcycsIGZpcnN0Q2VsbENoaWxkLmlkKTtcclxuICAgICAgICAvLyBmaXJzdENlbGwub25jbGljayA9IGRlbGV0ZVJlY29yZEZyb21UYWJsZSgpO1xyXG4gICAgICAgIGZpcnN0Q2VsbC5hcHBlbmRDaGlsZChmaXJzdENlbGxDaGlsZCk7XHJcbiAgICAgICAgbmV3Um93LmFwcGVuZChmaXJzdENlbGwpO1xyXG4gICAgICAgIC8qIGR5bmFtaWMgZW50cmllcyAqL1xyXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKHBvaW50KS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgICAgICAgbGV0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcblxyXG4gICAgICAgICAgICBjZWxsLmlubmVyVGV4dCA9IHZhbHVlO1xyXG4gICAgICAgICAgICBuZXdSb3cuYXBwZW5kQ2hpbGQoY2VsbCk7XHJcblxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8qIHNob3cgZGV0YWlscyAqL1xyXG4gICAgICAgIGxldCBsYXN0Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICBsZXQgbGFzdENlbGxDaGlsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG4gICAgICAgIGxhc3RDZWxsQ2hpbGQudGV4dENvbnRlbnQgPSBcIkRldGFpbHNcIjtcclxuXHJcbiAgICAgICAgbGFzdENlbGxDaGlsZC5pZCA9IFwiaWRfcG9pbnRcIiArIHBvaW50LmlkO1xyXG4gICAgICAgIGxhc3RDZWxsQ2hpbGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB1cmwgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9jb2xsZWN0aW9uUG9pbnRzL1wiICsgKHBvaW50LmlkKTtcclxuICAgICAgICAgICAgZmV0Y2godXJsLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgbW9kZTogXCJjb3JzXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChhcGlKc29uRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb2xsZWN0aW9uUG9pbnRzQ29udHJvbGxlcjonLCBhcGlKc29uRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgncG9pbnRFbnRyeScsIEpTT04uc3RyaW5naWZ5KGFwaUpzb25EYXRhWzBdKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvaW50U1MxID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdwb2ludEVudHJ5JykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RDZWxsQ2hpbGQuaHJlZiA9IFwiZGV0YWlscy1jb2xsZWN0aW9uLXBvaW50Lmh0bWxcIjtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgbGFzdENlbGwuYXBwZW5kKGxhc3RDZWxsQ2hpbGQpO1xyXG4gICAgICAgIG5ld1Jvdy5hcHBlbmQobGFzdENlbGwpO1xyXG4gICAgICAgIG15dGFibGUuYXBwZW5kQ2hpbGQobmV3Um93KTtcclxuICAgIH0pO1xyXG5cclxuXHJcblxyXG59XHJcblxyXG5cclxuY29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZWxldGUtYnV0dG9uXCIpO1xyXG5kZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGRlbGV0ZVJlY29yZEZyb21UYWJsZSk7XHJcblxyXG5mdW5jdGlvbiBkZWxldGVSZWNvcmRGcm9tVGFibGUoIC8qIGlkX251bWVyaWNhbCovKSB7XHJcbiAgICBjb25zdCBteXRhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb2xsLXBvaW50cy1saXN0LXRhYmxlXCIpO1xyXG4gICAgY29uc3QgY2hlY2tib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1t0eXBlPVwiY2hlY2tib3hcIl0nKTtcclxuICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICBjaGVja2JveGVzLmZvckVhY2goY2hlY2tib3ggPT4ge1xyXG4gICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgaWYgKGNoZWNrYm94LmNoZWNrZWQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgbGV0IG1hdGNoZXMgPSBjaGVja2JveC5pZC5tYXRjaCgvKFxcZCspLyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1hdGNoZXNbMF0pO1xyXG4gICAgICAgICAgICBteXRhYmxlLmRlbGV0ZVJvdyhpbmRleCk7XHJcbiAgICAgICAgICAgIGxldCB1cmwgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9jb2xsZWN0aW9uUG9pbnRzL1wiICsgKG1hdGNoZXNbMF0pO1xyXG4gICAgICAgICAgICBmZXRjaCh1cmwsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXHJcbiAgICAgICAgICAgICAgICBtb2RlOiBcImNvcnNcIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGFwaUpzb25EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXBpSnNvbkRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuY29uc3QgY3JlYXRlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0ZS1idXR0b24nKTtcclxuXHJcbmNvbnN0IHByaXZhdGVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJpdmF0ZS1idXR0b24nKTtcclxuaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2FjY291bnRfdHlwZScpID09PSAnQ2l0aXplbicpIHtcclxuICAgIHByaXZhdGVCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIGRlbGV0ZUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgY3JlYXRlQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbn1cclxuXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICByZW5kZXJEYXRhSW5UaGVUYWJsZVxyXG59XHJcbiJdfQ==
