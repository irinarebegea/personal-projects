/* model */
const { renderDataInTheTable } = require('./eventsController');
// import renderDataInTheTable from './eventsController.js';
fetch('http://localhost:3000/events')
    .then(function (response) {
        return response.json();
    }).then(function (apiJsonData) {
        console.log(apiJsonData);
        renderDataInTheTable(apiJsonData);
    })

