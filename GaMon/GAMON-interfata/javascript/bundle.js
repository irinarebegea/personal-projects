(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/* controller */
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

},{}],2:[function(require,module,exports){
/* model */
const { renderDataInTheTable } = require('./garbageController');
fetch('http://localhost:3000/garbage?requestType=private')
    .then(function (response) {
        return response.json();
    }).then(function (apiJsonData) {
        console.log(apiJsonData);
        renderDataInTheTable(apiJsonData);
    })


},{"./garbageController":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImphdmFzY3JpcHQvZ2FyYmFnZUNvbnRyb2xsZXIuanMiLCJqYXZhc2NyaXB0L2dhcmJhZ2VNb2RlbFByaXZhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKiBjb250cm9sbGVyICovXHJcbmZ1bmN0aW9uIHJlbmRlckRhdGFJblRoZVRhYmxlKGdhcmJhZ2VzKSB7XHJcbiAgICBjb25zdCBteXRhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdW1wLWxpc3QtdGFibGVcIik7XHJcbiAgICBnYXJiYWdlcy5mb3JFYWNoKGdhcmJhZ2UgPT4ge1xyXG4gICAgICAgIGxldCBuZXdSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XHJcbiAgICAgICAgLyogY2hlY2sgYm94ICovXHJcbiAgICAgICAgbGV0IGZpcnN0Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICBsZXQgZmlyc3RDZWxsQ2hpbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgZmlyc3RDZWxsQ2hpbGQudHlwZSA9IFwiY2hlY2tib3hcIjtcclxuICAgICAgICBmaXJzdENlbGxDaGlsZC5pZCA9IFwiaWRcIiArIGdhcmJhZ2UuaWQ7XHJcbiAgICAgICAgZmlyc3RDZWxsLmFwcGVuZENoaWxkKGZpcnN0Q2VsbENoaWxkKTtcclxuICAgICAgICBuZXdSb3cuYXBwZW5kKGZpcnN0Q2VsbCk7XHJcbiAgICAgICAgLyogZHluYW1pYyBlbnRyaWVzICovXHJcbiAgICAgICAgT2JqZWN0LmVudHJpZXMoZ2FyYmFnZSkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG5cclxuICAgICAgICAgICAgY2VsbC5pbm5lclRleHQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgbmV3Um93LmFwcGVuZENoaWxkKGNlbGwpO1xyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvKiBzaG93IGRldGFpbHMgKi9cclxuICAgICAgICBsZXQgbGFzdENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgbGV0IGxhc3RDZWxsQ2hpbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcclxuICAgICAgICBsYXN0Q2VsbENoaWxkLnRleHRDb250ZW50ID0gXCJEZXRhaWxzXCI7XHJcblxyXG4gICAgICAgIGxhc3RDZWxsQ2hpbGQuaWQgPSBcImlkX3RyYXNoXCIgKyBnYXJiYWdlLmlkO1xyXG4gICAgICAgIGxhc3RDZWxsQ2hpbGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB1cmwgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9nYXJiYWdlL1wiICsgKGdhcmJhZ2UuaWQpO1xyXG4gICAgICAgICAgICBmZXRjaCh1cmwsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICBtb2RlOiBcImNvcnNcIlxyXG4gICAgICAgICAgICAgICAgLy8gaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICdBY2Nlc3MtQ29udHJvbC1SZXF1ZXN0LUhlYWRlcnMnOiAnQXV0aG9yaXphdGlvbicsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgJ0F1dGhvcml6YXRpb24nOiBKU09OLnN0cmluZ2lmeShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdhY2Nlc3NfdG9rZW4nKSlcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIC8vIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2FjY2Vzc190b2tlbicpKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGFwaUpzb25EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2dhcmJhZ2VDb250cm9sbGVyOicsIGFwaUpzb25EYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdnYXJiYWdlRW50cnknLCBKU09OLnN0cmluZ2lmeShhcGlKc29uRGF0YVswXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBnYXJiYWdlU1MxID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdnYXJiYWdlRW50cnknKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdENlbGxDaGlsZC5ocmVmID0gXCJkZXRhaWxzLXRyYXNoLWxpc3QuaHRtbFwiO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICB9KVxyXG4gICAgICAgIGxhc3RDZWxsLmFwcGVuZChsYXN0Q2VsbENoaWxkKTtcclxuICAgICAgICBuZXdSb3cuYXBwZW5kKGxhc3RDZWxsKTtcclxuICAgICAgICBteXRhYmxlLmFwcGVuZENoaWxkKG5ld1Jvdyk7XHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcblxyXG5jb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlbGV0ZS1idXR0b25cIik7XHJcbmRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZGVsZXRlUmVjb3JkRnJvbVRhYmxlKTtcclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZVJlY29yZEZyb21UYWJsZSgpIHtcclxuICAgIGNvbnN0IG15dGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1bXAtbGlzdC10YWJsZVwiKTtcclxuICAgIGNvbnN0IGNoZWNrYm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbdHlwZT1cImNoZWNrYm94XCJdJyk7XHJcbiAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgY2hlY2tib3hlcy5mb3JFYWNoKGNoZWNrYm94ID0+IHtcclxuICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgIGlmIChjaGVja2JveC5jaGVja2VkID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGxldCBtYXRjaGVzID0gY2hlY2tib3guaWQubWF0Y2goLyhcXGQrKS8pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtYXRjaGVzWzBdKTtcclxuICAgICAgICAgICAgbXl0YWJsZS5kZWxldGVSb3coaW5kZXgpO1xyXG4gICAgICAgICAgICBsZXQgdXJsID0gXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvZ2FyYmFnZS9cIiArIChtYXRjaGVzWzBdKTtcclxuICAgICAgICAgICAgZmV0Y2godXJsLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxyXG4gICAgICAgICAgICAgICAgbW9kZTogXCJjb3JzXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChhcGlKc29uRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFwaUpzb25EYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG5jb25zdCB1cGRhdGVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVwZGF0ZS1idXR0b25cIik7XHJcbnVwZGF0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbWFya1JlY29yZEFzQ2xlYW5lZCk7XHJcblxyXG5mdW5jdGlvbiBtYXJrUmVjb3JkQXNDbGVhbmVkKCkge1xyXG4gICAgY29uc3QgbXl0YWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVtcC1saXN0LXRhYmxlXCIpO1xyXG4gICAgY29uc3QgY2hlY2tib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1t0eXBlPVwiY2hlY2tib3hcIl0nKTtcclxuICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICBjaGVja2JveGVzLmZvckVhY2goY2hlY2tib3ggPT4ge1xyXG4gICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgaWYgKGNoZWNrYm94LmNoZWNrZWQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgbGV0IG1hdGNoZXMgPSBjaGVja2JveC5pZC5tYXRjaCgvKFxcZCspLyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGluZGV4KTtcclxuICAgICAgICAgICAgbXl0YWJsZS5kZWxldGVSb3coaW5kZXgpO1xyXG4gICAgICAgICAgICBsZXQgdXJsID0gXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvZ2FyYmFnZS9cIiArIChtYXRjaGVzWzBdKTtcclxuICAgICAgICAgICAgZmV0Y2godXJsLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxyXG4gICAgICAgICAgICAgICAgbW9kZTogXCJjb3JzXCIsXHJcbiAgICAgICAgICAgICAgICBib2R5OiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdhY2Nlc3NfdG9rZW4nKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGFwaUpzb25EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXBpSnNvbkRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICByZW5kZXJEYXRhSW5UaGVUYWJsZVxyXG59XHJcbiIsIi8qIG1vZGVsICovXHJcbmNvbnN0IHsgcmVuZGVyRGF0YUluVGhlVGFibGUgfSA9IHJlcXVpcmUoJy4vZ2FyYmFnZUNvbnRyb2xsZXInKTtcclxuZmV0Y2goJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9nYXJiYWdlP3JlcXVlc3RUeXBlPXByaXZhdGUnKVxyXG4gICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGFwaUpzb25EYXRhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYXBpSnNvbkRhdGEpO1xyXG4gICAgICAgIHJlbmRlckRhdGFJblRoZVRhYmxlKGFwaUpzb25EYXRhKTtcclxuICAgIH0pXHJcblxyXG4iXX0=
