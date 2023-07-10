const privateButton = document.getElementById('private-button');
if (sessionStorage.getItem('account_type') === 'Citizen') {
    privateButton.style.display = 'none';
}

const displayedName = document.getElementById('displayed-name');
displayedName.innerHTML = sessionStorage.getItem('name');

let totalNr = document.getElementById('total-nr');
let solvedNr = document.getElementById('solved-nr')

let url = "http://localhost:3000/garbage/count";
fetch(url, {
    method: 'GET',
    mode: 'cors'
}).then(function (response) {
    return response.json();
}).then(function (apiJsonData) {
    console.log(apiJsonData[0].count);
    totalNr.innerHTML = apiJsonData[0].count;

    let url2 = "http://localhost:3000/garbage/countSolved";
    fetch(url2, {
        method: 'GET',
        mode: 'cors'
    }).then(function (response) {
        return response.json();
    }).then(function (apiJsonData) {
        console.log(apiJsonData);
        solvedNr.innerHTML = apiJsonData;
    });

})