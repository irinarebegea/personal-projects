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