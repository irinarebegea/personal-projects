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
fetch('http://localhost:3000/garbage?requestType=public')
    .then(function (response) {
        return response.json();
    }).then(function (apiJsonData) {
        console.log(apiJsonData);
        renderDataInTheTable(apiJsonData);
    })


},{"./garbageController":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImphdmFzY3JpcHQvZ2FyYmFnZUNvbnRyb2xsZXIuanMiLCJqYXZhc2NyaXB0L2dhcmJhZ2VNb2RlbFB1YmxpYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qIGNvbnRyb2xsZXIgKi9cclxuZnVuY3Rpb24gcmVuZGVyRGF0YUluVGhlVGFibGUoZ2FyYmFnZXMpIHtcclxuICAgIGNvbnN0IG15dGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1bXAtbGlzdC10YWJsZVwiKTtcclxuICAgIGdhcmJhZ2VzLmZvckVhY2goZ2FyYmFnZSA9PiB7XHJcbiAgICAgICAgbGV0IG5ld1JvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcclxuICAgICAgICAvKiBjaGVjayBib3ggKi9cclxuICAgICAgICBsZXQgZmlyc3RDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgIGxldCBmaXJzdENlbGxDaGlsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICBmaXJzdENlbGxDaGlsZC50eXBlID0gXCJjaGVja2JveFwiO1xyXG4gICAgICAgIGZpcnN0Q2VsbENoaWxkLmlkID0gXCJpZFwiICsgZ2FyYmFnZS5pZDtcclxuICAgICAgICBmaXJzdENlbGwuYXBwZW5kQ2hpbGQoZmlyc3RDZWxsQ2hpbGQpO1xyXG4gICAgICAgIG5ld1Jvdy5hcHBlbmQoZmlyc3RDZWxsKTtcclxuICAgICAgICAvKiBkeW5hbWljIGVudHJpZXMgKi9cclxuICAgICAgICBPYmplY3QuZW50cmllcyhnYXJiYWdlKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgICAgICAgbGV0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcblxyXG4gICAgICAgICAgICBjZWxsLmlubmVyVGV4dCA9IHZhbHVlO1xyXG4gICAgICAgICAgICBuZXdSb3cuYXBwZW5kQ2hpbGQoY2VsbCk7XHJcblxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8qIHNob3cgZGV0YWlscyAqL1xyXG4gICAgICAgIGxldCBsYXN0Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICBsZXQgbGFzdENlbGxDaGlsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG4gICAgICAgIGxhc3RDZWxsQ2hpbGQudGV4dENvbnRlbnQgPSBcIkRldGFpbHNcIjtcclxuXHJcbiAgICAgICAgbGFzdENlbGxDaGlsZC5pZCA9IFwiaWRfdHJhc2hcIiArIGdhcmJhZ2UuaWQ7XHJcbiAgICAgICAgbGFzdENlbGxDaGlsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHVybCA9IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2dhcmJhZ2UvXCIgKyAoZ2FyYmFnZS5pZCk7XHJcbiAgICAgICAgICAgIGZldGNoKHVybCwge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgIG1vZGU6IFwiY29yc1wiXHJcbiAgICAgICAgICAgICAgICAvLyBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgJ0FjY2Vzcy1Db250cm9sLVJlcXVlc3QtSGVhZGVycyc6ICdBdXRob3JpemF0aW9uJyxcclxuICAgICAgICAgICAgICAgIC8vICAgICAnQXV0aG9yaXphdGlvbic6IEpTT04uc3RyaW5naWZ5KHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2FjY2Vzc190b2tlbicpKVxyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgLy8gYm9keTogSlNPTi5zdHJpbmdpZnkoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnYWNjZXNzX3Rva2VuJykpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoYXBpSnNvbkRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZ2FyYmFnZUNvbnRyb2xsZXI6JywgYXBpSnNvbkRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2dhcmJhZ2VFbnRyeScsIEpTT04uc3RyaW5naWZ5KGFwaUpzb25EYXRhWzBdKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdhcmJhZ2VTUzEgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2dhcmJhZ2VFbnRyeScpKTtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0Q2VsbENoaWxkLmhyZWYgPSBcImRldGFpbHMtdHJhc2gtbGlzdC5odG1sXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgbGFzdENlbGwuYXBwZW5kKGxhc3RDZWxsQ2hpbGQpO1xyXG4gICAgICAgIG5ld1Jvdy5hcHBlbmQobGFzdENlbGwpO1xyXG4gICAgICAgIG15dGFibGUuYXBwZW5kQ2hpbGQobmV3Um93KTtcclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuXHJcbmNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVsZXRlLWJ1dHRvblwiKTtcclxuZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBkZWxldGVSZWNvcmRGcm9tVGFibGUpO1xyXG5cclxuZnVuY3Rpb24gZGVsZXRlUmVjb3JkRnJvbVRhYmxlKCkge1xyXG4gICAgY29uc3QgbXl0YWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVtcC1saXN0LXRhYmxlXCIpO1xyXG4gICAgY29uc3QgY2hlY2tib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1t0eXBlPVwiY2hlY2tib3hcIl0nKTtcclxuICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICBjaGVja2JveGVzLmZvckVhY2goY2hlY2tib3ggPT4ge1xyXG4gICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgaWYgKGNoZWNrYm94LmNoZWNrZWQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgbGV0IG1hdGNoZXMgPSBjaGVja2JveC5pZC5tYXRjaCgvKFxcZCspLyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1hdGNoZXNbMF0pO1xyXG4gICAgICAgICAgICBteXRhYmxlLmRlbGV0ZVJvdyhpbmRleCk7XHJcbiAgICAgICAgICAgIGxldCB1cmwgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9nYXJiYWdlL1wiICsgKG1hdGNoZXNbMF0pO1xyXG4gICAgICAgICAgICBmZXRjaCh1cmwsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXHJcbiAgICAgICAgICAgICAgICBtb2RlOiBcImNvcnNcIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGFwaUpzb25EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXBpSnNvbkRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuXHJcbmNvbnN0IHVwZGF0ZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXBkYXRlLWJ1dHRvblwiKTtcclxudXBkYXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBtYXJrUmVjb3JkQXNDbGVhbmVkKTtcclxuXHJcbmZ1bmN0aW9uIG1hcmtSZWNvcmRBc0NsZWFuZWQoKSB7XHJcbiAgICBjb25zdCBteXRhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdW1wLWxpc3QtdGFibGVcIik7XHJcbiAgICBjb25zdCBjaGVja2JveGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3R5cGU9XCJjaGVja2JveFwiXScpO1xyXG4gICAgbGV0IGluZGV4ID0gMDtcclxuICAgIGNoZWNrYm94ZXMuZm9yRWFjaChjaGVja2JveCA9PiB7XHJcbiAgICAgICAgaW5kZXgrKztcclxuICAgICAgICBpZiAoY2hlY2tib3guY2hlY2tlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2hlcyA9IGNoZWNrYm94LmlkLm1hdGNoKC8oXFxkKykvKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coaW5kZXgpO1xyXG4gICAgICAgICAgICBteXRhYmxlLmRlbGV0ZVJvdyhpbmRleCk7XHJcbiAgICAgICAgICAgIGxldCB1cmwgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9nYXJiYWdlL1wiICsgKG1hdGNoZXNbMF0pO1xyXG4gICAgICAgICAgICBmZXRjaCh1cmwsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXHJcbiAgICAgICAgICAgICAgICBtb2RlOiBcImNvcnNcIixcclxuICAgICAgICAgICAgICAgIGJvZHk6IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2FjY2Vzc190b2tlbicpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoYXBpSnNvbkRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhcGlKc29uRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIHJlbmRlckRhdGFJblRoZVRhYmxlXHJcbn1cclxuIiwiLyogbW9kZWwgKi9cclxuY29uc3QgeyByZW5kZXJEYXRhSW5UaGVUYWJsZSB9ID0gcmVxdWlyZSgnLi9nYXJiYWdlQ29udHJvbGxlcicpO1xyXG5mZXRjaCgnaHR0cDovL2xvY2FsaG9zdDozMDAwL2dhcmJhZ2U/cmVxdWVzdFR5cGU9cHVibGljJylcclxuICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChhcGlKc29uRGF0YSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGFwaUpzb25EYXRhKTtcclxuICAgICAgICByZW5kZXJEYXRhSW5UaGVUYWJsZShhcGlKc29uRGF0YSk7XHJcbiAgICB9KVxyXG5cclxuIl19
