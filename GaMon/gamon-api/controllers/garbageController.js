const Garbage = require('../models/garbageModel');
const { findToken } = require('../models/usersModel');
const { getPostData } = require('../utils');

async function testAccess(req, res, method) {
    const body = await getPostData(req);
    let bodyArray = []
    let token = {}
    if (method === 'PUT') {
        token = body;

    }

    else if (method === 'POST') {
        bodyArray = JSON.parse(body);
        token = bodyArray[0].access_token;

    }


    console.log(token);

    const dbToken = await findToken(token);

    console.log(dbToken);

    if (dbToken.length === 0) {
        return 0;
    }

    else {
        return bodyArray;
    }


}

async function choosePathGarbage(queryParameters, method, path, req, res) {
    try {
        const result = await testAccess(req, res, method);
        if (result !== 0) {
            console.log(1);
            if (path === '/garbage' && method === 'GET') {
                switch (queryParameters.requesttype) {
                    case "private":
                        getGarbageTable(req, res, "private");
                        break;
                    case "public":
                        getGarbageTable(req, res, "public");
                        break;
                }
            }



            else if (path.match(/\/garbage\/([0-9]+)\/type/) && method === 'GET') {
                const id = path.split('/')[2];
                getGarbageType(req, res, id);
            }

            else if (path.match(/\/garbage\/countSolved/) && method === 'GET') {
                getGarbageCountSolved(req, res);
            }

            else if (path.match(/\/garbage\/count/) && method === 'GET') {
                getGarbageCount(req, res);
            }



            else if (path.match(/\/garbage\/([0-9]+)/) && method === 'GET') {
                const id = path.split('/')[2];
                getGarbage(req, res, id);
            }

            else if (path === '/garbage' && method === 'POST') {
                console.log(2);
                createGarbage(req, res, result);
            }

            else if (path.match(/\/garbage\/([0-9]+)/) && method === 'PUT') {
                const id = path.split('/')[2];
                updateGarbage(req, res, id);

            }

            else if (path.match(/\/garbage\/([0-9]+)/) && method === 'DELETE') {
                const id = path.split('/')[2];
                deleteGarbage(req, res, id);

            }


        }

        else {

            if (path === '/garbage' && method === 'GET') {
                switch (queryParameters.requesttype) {
                    case "private":
                        getGarbageTable(req, res, "private");
                        break;
                    case "public":
                        getGarbageTable(req, res, "public");
                        break;
                }
            }

            else if (path.match(/\/garbage\/countSolved/) && method === 'GET') {
                getGarbageCountSolved(req, res);
            }

            else if (path.match(/\/garbage\/count/) && method === 'GET') {
                getGarbageCount(req, res);
            }

            else if (path.match(/\/garbage\/([0-9]+)\/type/) && method === 'GET') {
                const id = path.split('/')[2];
                getGarbageType(req, res, id);
            }


            else if (path.match(/\/garbage\/([0-9]+)/) && method === 'GET') {
                const id = path.split('/')[2];
                getGarbage(req, res, id);
            }

            else if (path.match(/\/garbage\/([0-9]+)/) && method === 'DELETE') {
                const id = path.split('/')[2];
                deleteGarbage(req, res, id);

            }

        }

    } catch (error) {
        console.log(error);
    }
}

// gets all garbage
//@route GET /api/garbage
async function getGarbageTable(req, res, type) {
    try {
        const garbages = await Garbage.findAll();

        let garbageTable = garbages.filter(property => property.status === "Not cleaned").map(garbage => {
            let properties = {
                "id": garbage.id,
                "date_added": garbage.date_added,
                "garbage_size": garbage.garbage_size,
                "location": garbage.location,
                "request_type": garbage.request_type
            }



            return properties;
        });


        let privateRequests = garbageTable.filter(property => property.request_type === "private");
        let publicRequests = garbageTable.filter(property => property.request_type === "public");
        res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5555");
        res.writeHead(200, { 'Content-Type': 'application/json' });
        if (type === "private") {
            res.end(JSON.stringify(privateRequests));
        }

        else if (type === "public") {
            res.end(JSON.stringify(publicRequests));
        }

    } catch (error) {
        console.log(error);
    }
}

// get single garbage
//@route GET /garbage/:id
async function getGarbage(req, res, id) {
    try {
        const garbage = await Garbage.findById(id);

        res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5555");
        res.writeHead(404, { 'Content-Type': 'application/json' });

        if (!garbage) {
            res.end(JSON.stringify({ message: 'Garbage not found.' }));
        }

        else {
            res.end(JSON.stringify(garbage));
        }

    } catch (error) {
        console.log(error);
    }
}

async function getGarbageType(req, res, id) {
    try {
        const garbageType = await Garbage.findType(id);

        res.writeHead(404, { 'Content-Type': 'application/json' });
        // res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5555");


        if (!garbageType) {
            res.end(JSON.stringify({ message: 'Garbage types not found.' }));
        }

        else {
            // res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(garbageType));
        }
    } catch (error) {
        console.log(error);
    }
}

// create a garbage
//@route POST /garbage
async function createGarbage(req, res, result) {
    console.log(3);
    // console.log(req);
    try {
        // const body = await getPostData(req);
        // const bodyArray = JSON.parse(body);
        console.log('body', result);

        result.shift();
        console.log('body', result);
        const {
            date,
            size,
            location,
            requestType,
            status,
            updatedBy,
            specificType } = result[0];

        const garbage = {
            date,
            size,
            location,
            requestType,
            status,
            updatedBy,
            specificType
        }

        const newGarbage = await Garbage.create(result);
        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newGarbage));


    } catch (error) {
        console.log(error);
    }
}


// update a garbage
// @route PUT /garbage/:id
async function updateGarbage(req, res, id) {
    try {

        const garbage = await Garbage.findById(id);
        // res.setHeader('Access-Control-Allow-Credentials', 'true');
        // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

        if (!garbage) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Garbage not found.' }));
        }

        else {
            // const body = await getPostData(req);
            // const { date,
            //     size,
            //     location,
            //     requestType,
            //     status,
            //     updatedBy,
            //     specificType } = JSON.parse(body);

            const garbageData = {
                date: /* date || */ garbage.date,
                size: /* size || */ garbage.size,
                location: /* location || */ garbage.location,
                requestType: /* requestType || */ garbage.requestType,
                status: 'Cleaned',
                updatedBy: /* updatedBy || */ garbage.updatedBy,
                specificType: /* specificType || */ garbage.specificType
            }
            // console.log(garbageData);
            const updGarbage = await Garbage.update(id, garbageData);

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updGarbage));
        }

    } catch (error) {
        console.log(error);
    }
}


// delete single garbage
//@route DELETE /garbage/:id
async function deleteGarbage(req, res, id) {
    try {
        const garbage = await Garbage.findById(id);
        if (!garbage) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Garbage not found.' }));
        }

        else {
            await Garbage.remove(id);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `Garbage ${id} removed` }));
        }
    } catch (error) {
        console.log(error);
    }
}

async function getGarbageCount(req, res) {
    try {
        const count = await Garbage.countAll();
        console.log('count', count);
        if (!count) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Entries not found.' }));
        }

        else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(count));
        }
    } catch (error) {
        console.log(error);
    }
}


async function getGarbageCountSolved(req, res) {
    try {
        const countSolved = await Garbage.countSolved();
        console.log('count', countSolved);
        console.log(countSolved.length);
        if (!countSolved) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Entries not found.' }));
        }

        else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(countSolved.length));
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getGarbageTable,
    getGarbage,
    createGarbage,
    updateGarbage,
    deleteGarbage,
    choosePathGarbage,
    getGarbageType,
    getGarbageCountSolved
}