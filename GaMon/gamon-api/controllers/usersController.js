const User = require('../models/usersModel');
const { getPostData } = require('../utils');
const jwt = require("jsonwebtoken");

async function choosePathUsers(queryParameters, method, path, req, res) {
    try {
        if (path === '/users' && method === 'GET') {
            getUsers(req, res);
        }

        else if (path.match(/\/users\/([0-9]+)\/type/) && method === 'GET') {
            const id = path.split('/')[2];
            getUsersType(req, res, id);
        }

        else if (path.match(/\/users\/token/) && method === 'POST') {
            getUserDetailsFromToken(req, res);
        }

        else if (path.match(/\/users\/token/) && method === 'PUT') {
            updateUserBasedOnToken(req, res);
        }


        else if (path.match(/\/users\/([0-9]+)/) && method === 'GET') {
            const id = path.split('/')[2];
            getUser(req, res, id);
        }

        else if (path === '/users' && method === 'POST') {
            createUser(req, res);
        }

        else if (path.match(/\/users\/([0-9]+)/) && method === 'PUT') {
            const id = path.split('/')[2];
            let check = 1;
            updateUser(req, res, id, check);

        }

        else if (path.match(/\/users\/([0-9]+)/) && method === 'DELETE') {
            const id = path.split('/')[2];
            deleteUser(req, res, id);

        }

        else if (path.match(/\/users\/login/) && method === 'POST') {
            checkCredentials(req, res);
        }


    } catch (error) {
        console.log(error);
    }
}

// gets all users
// @route GET /api/users

async function getUsers(req, res) {
    try {
        const users = await User.findAll();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    } catch (error) {
        console.log(error);
    }
}

// get single user
// @route GET /user/:id
async function getUser(req, res, id) {
    try {
        const user = await User.findById(id);
        if (!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found.' }));
        }

        else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
        }

    } catch (error) {
        console.log(error);
    }
}

async function getUsersType(req, res, id) {
    try {
        const usersType = await User.findType(id);
        if (!usersType) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User types not found.' }));
        }

        else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(usersType));
        }
    } catch (error) {
        console.log(error);
    }
}

// create a user
//@route POST /user
async function createUser(req, res) {
    try {
        const body = await getPostData(req);
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            accountType,
            phone,
            authCode
        } = JSON.parse(body);

        const user = {
            firstName,
            lastName,
            emailAddress,
            password,
            accountType,
            phone,
            authCode
        }

        console.log('auth cde', user.authCode);
        console.log('acc type', user.accountType);

        let orgResult = await User.findOrganisation(user.authCode);


        const existingUser = await User.findByEmail(user.emailAddress);
        if (existingUser.length === 0) {
            if (user.accountType === 'Authorized person') {
                if (user.authCode === null || user.authCode == '') {
                    res.setHeader('Access-Control-Allow-Credentials', 'true');
                    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5555");

                    res.writeHead(400, { 'Content-Type': 'application/json' })
                    return res.end(JSON.stringify({ message: 'You have to provide the code of the organisation to whom you belong.' }));
                }

                else if (orgResult.length === 0) {
                    res.setHeader('Access-Control-Allow-Credentials', 'true');
                    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5555");

                    res.writeHead(400, { 'Content-Type': 'application/json' })
                    return res.end(JSON.stringify({ message: 'The code of the organisation is not valid.' }));

                }

                else {

                    const newUser = await User.create(user);
                    res.setHeader('Access-Control-Allow-Credentials', 'true');
                    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5555");

                    res.writeHead(201, { 'Content-Type': 'application/json' })
                    return res.end(JSON.stringify({ message: 'Registration successful.' }));
                }

            }

            else {
                const newUser = await User.create(user);
                res.setHeader('Access-Control-Allow-Credentials', 'true');
                res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5555");

                res.writeHead(201, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify({ message: 'Registration successful.' }));
            }

        }

        else {
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5555");

            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'This email address is already registered.' }));
        }


    } catch (error) {
        console.log(error);
    }
}


// update a user
// @route PUT /user/:id
async function updateUser(req, res, id, check) {
    try {
        let variable = {}
        console.log('ce id vine', id);
        const user = await User.findById(id);
        console.log(user);

        if (!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found.' }));
        }

        else {
            if (check === 1) {
                const body = await getPostData(req);
                variable = JSON.parse(body);
                console.log('variable in check 1', variable);
            }

            else if (check === 0) {
                variable = req;
                console.log('variable in check 0', variable);

            }

            const {
                first_name,
                last_name,
                email_address,
                password,
                account_type,
                phone_number,
                code,
                clean_level,
                user_points,
                reports,
                events
            } = variable;

            const userData = {
                first_name: first_name || user.first_name,
                last_name: last_name || user.last_name,
                email_address: email_address || user.email_address,
                password: password || user.password,
                account_type: account_type || user.account_type,
                phone_number: phone_number || user.phone_number,
                code: code || user.code,
                clean_level: clean_level || user.clean_level,
                user_points: user_points || user.user_points,
                reports: reports || user.reports,
                events: events || user.events
            }
            console.log(userData);
            const updUser = await User.update(id, userData);

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updUser));
        }

    } catch (error) {
        console.log(error);
    }
}


// delete single user
//@route DELETE /user/:id
async function deleteUser(req, res, id) {
    try {
        const user = await User.findById(id);
        if (!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found.' }));
        }

        else {
            await User.remove(id);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `User ${id} removed` }));
        }
    } catch (error) {
        console.log(error);
    }
}


async function checkCredentials(req, res) {
    try {
        const body = await getPostData(req);
        const {
            emailAddress,
            password
        } = JSON.parse(body);

        const user = {
            emailAddress,
            password
        }

        const existingUser = await User.findByCredentials(user.emailAddress, user.password);

        if (existingUser.length === 0) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Wrong email or password.' }));
        }

        else {
            const existsInSessionTable = await User.getEmailFromSession();
            console.log(existsInSessionTable.length);



            if (existsInSessionTable.length !== 0) {
                await User.removeEntry(existsInSessionTable[0].email_address);

            }

            const token = jwt.sign({ existingUser }, "secret_key");
            await User.storeUserSessionId(user.emailAddress, token);

            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5555");
            res.setHeader('Set-Cookie', `access_token=${token}; Path=/; Domain=http://127.0.0.1:5555; HttpOnly=false; SameSite=none`); 7
            res.setHeader('Authorization', `${token}`);
            res.writeHead(200, {
                'Access-Control-Expose-Headers': '*',
                'Set-Cookie': `access_token=${token}; Path=/; Domain=http://127.0.0.1:5555; HttpOnly=false; SameSite=none`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': ['Content-Type', 'Set-Cookie']
            });

            const permissions = await User.getAccountType(user.emailAddress);
            const name = await User.getUserName(user.emailAddress);
            console.log(permissions[0].account_type);

            res.end(JSON.stringify({
                message: "Login successful.",
                accountType: permissions[0].account_type,
                name: name[0].first_name
            }));
        }

    }

    catch (error) {
        console.log(error);
    }
}


async function getUserDetailsFromToken(req, res) {
    try {
        const body = await getPostData(req);
        // console.log(body);
        // console.log('token', body);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5555");
        res.setHeader('Access-Control-Allow-Methods', '*');

        const user = await User.getUserFromToken(body);
        console.log(user);
        if (!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found.' }));
        }

        else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
        }

    } catch (error) {
        console.log(error);
    }
}


async function updateUserBasedOnToken(req, res) {
    try {
        const body = await getPostData(req);
        const arrayBody = JSON.parse(body);
        console.log(arrayBody);
        console.log(arrayBody[0].token);
        const user = await User.getUserFromToken(arrayBody[0].token);
        console.log('user id', user[0].id);
        console.log('message', arrayBody[1].message);
        let newUser = user[0];
        if (arrayBody[1].message === 'incrementEvents') {
            newUser.events = user[0].events + 1;

        }

        else if (arrayBody[1].message === 'decrementEvents') {
            newUser.events = user[0].events - 1;

        }

        updateUser(newUser, res, user[0].id, 0);

    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    choosePathUsers,
    getUsersType,
    checkCredentials,
    getUserDetailsFromToken,
    updateUserBasedOnToken
}