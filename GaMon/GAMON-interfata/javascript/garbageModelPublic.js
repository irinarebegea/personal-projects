/* model */
const { renderDataInTheTable } = require('./garbageController');
fetch('http://localhost:3000/garbage?requestType=public')
    .then(function (response) {
        return response.json();
    }).then(function (apiJsonData) {
        console.log(apiJsonData);
        renderDataInTheTable(apiJsonData);
    })

