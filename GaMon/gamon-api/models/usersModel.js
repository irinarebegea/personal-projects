const { getPointsTable } = require('../controllers/collectionPointsController');
const { database } = require('../dbConnection');
async function getAllCategories() {
    return database.select('*')
        .from('users');
};

async function findAll() {
    const users = await getAllCategories();
    return new Promise((resolve, reject) => {
        resolve(users);

    })
}

function findById(id) {
    const user = database.select('*').from('users').where('id', id);
    return new Promise((resolve, reject) => {
        resolve(user);
    })
}

function findByEmail(email) {
    const user = database.select('*').from('users').where('email_address', email);
    return new Promise((resolve, reject) => {
        resolve(user);
    })
}

function findOrganisation(code) {
    const organisation = database.select('*').from('organisations').where('code', code);
    return new Promise((resolve, reject) => {
        resolve(organisation);
    })
}

function findByCredentials(email, password) {
    const user = database.select('*').from('users').where({ email_address: email, password: password });
    return new Promise((resolve, reject) => {
        resolve(user);
    })
}

function findType(account_type) {
    const userType = database.select('*').from('users').where('account_type', account_type);
    // console.log(userType);
    return new Promise((resolve, reject) => {
        resolve(userType);
    })
}

function getLastId() {
    return new Promise((resolve, reject) => {
        resolve(database('users').max('id'));
    });
}

function getUserToken(email) {
    return new Promise((resolve, reject) => {
        resolve(database.select('session_id').from('sessions').where('email_address', email));
    })
}

function getUserFromToken(token) {
    return new Promise((resolve, reject) => {
        resolve(
            database('users')
                .join('sessions', 'users.email_address', 'sessions.email_address')
                .where({session_id: token})
                .select('users.id', 
                'users.first_name', 
                'users.last_name', 
                'users.email_address', 
                'users.account_type', 
                'users.phone_number', 
                'users.code', 
                'users.clean_level', 
                'users.user_points', 
                'users.reports', 
                'users.events')

        )
    })
}

function findToken(token) {
    return new Promise((resolve, reject) => {
        resolve(
            database.select('id')
            .from('sessions')
            .where('session_id', token)
        )
    })
}

function removeEntry(email) {
    return new Promise((resolve, reject) => {
        resolve(
            database('sessions')
            .where('email_address', email)
            .del()
        );

    })
}


function getEmailFromSession() {
    return new Promise((resolve, reject) => {
        resolve(
            database.select('email_address')
            .from('sessions')
        )
    })
}

function storeUserSessionId(email, token) {
    return new Promise((resolve, reject) => {
        database('sessions')
            .insert({
                email_address: email,
                session_id: token
            }).then(function () {
                console.log('Token insertion completed.');
            })

        resolve(token);
    })
}

function create(user) {

    return new Promise((resolve, reject) => {
        database('users')
            .insert({
                first_name: user.firstName,
                last_name: user.lastName,
                email_address: user.emailAddress,
                password: user.password,
                account_type: user.accountType,
                code: user.authCode.toUpperCase(),
                clean_level: 0,
                user_points: 0,
                reports: 0,
                events: 0
            }).then(function () {
                console.log('Insertion completed.');
            });
        resolve(user);
    })
}

function update(id, user) {
    return new Promise((resolve, reject) => {
        resolve(database('users').where('id', id)
            .update({
                first_name: user.firstName,
                last_name: user.lastName,
                email_address: user.emailAddress,
                password: user.password,
                account_type: user.accountType,
                phone_number: user.phone_number,
                code: user.authCode,
                clean_level: user.cleanLevel,
                user_points: user.points,
                reports: user.reports,
                events: user.events
            }));

    })
}


function remove(id) {
    return new Promise((resolve, reject) => {
        resolve(database('users')
            .where('id', id)
            .del());
    })
}

function getAccountType(email) {
    return new Promise((resolve, reject) => {
        resolve(database.select('account_type')
        .from('users')
        .where('email_address', email)
        )
    })
}

function getUserName(email) {
    return new Promise((resolve, reject) => {
        resolve(database.select('first_name', 'last_name')
        .from('users')
        .where('email_address', email));
    })
}



module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
    findType,
    getLastId,
    findByCredentials,
    findByEmail,
    findOrganisation,
    storeUserSessionId,
    getUserToken,
    getUserFromToken,
    findToken,
    getEmailFromSession,
    removeEntry,
    getAccountType,
    getUserName
}