const CollectionPoints = require('../models/collectionPointsModel');
const { getPostData } = require('../utils');

async function choosePathCollectionPoints(queryParameters, method, path, req, res) {
    try {
        if (path === '/collectionPoints' && method === 'GET') {
            getPointsTable(req,res);
        }

        else if (path === /\/collectionPoints\/type/ && method === 'POST') {
            createCPRecords(req, res);
        }

        else if (path.match(/\/collectionPoints\/([0-9]+)\/program/) && method === 'GET') {
            const id = path.split('/')[2];
            getPointProgram(req, res, id);
        }

        else if (path.match(/\/collectionPoints\/([0-9]+)\/type/) && method === 'GET') {
            const id = path.split('/')[2];
            getGarbageTypePoints(req, res, id);
        }

        else if (path.match(/\/collectionPoints\/([0-9]+)/) && method === 'GET') {
            const id = path.split('/')[2];
            getCollectionPoints(req, res, id);
        }

        else if (path === '/collectionPoints' && method === 'POST') {
            createPoint(req, res);
        }

        else if (path.match(/\/collectionPoints\/([0-9]+)/) && method === 'DELETE') {
            const id = path.split('/')[2]
            deletePoint(req, res, id)

        }

    } catch (error) {
        console.log(error);
    }
}

// gets all points
//@route GET /api/collectionPoints
async function getPointsTable(req, res) {
    try {
        const points = await CollectionPoints.findAll();

        let PointsTable = points.map(points => {
            let properties = {
                "id": points.id,
                "point_name": points.point_name,
                "point_size": points.point_size,
                "location": points.location
                
            }

    

            return properties;
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(PointsTable));

    } 
    catch (error) {
        console.log(error);
    }
}

async function getPointProgram(req, res, id) {
    try {
        const pointProgram = await CollectionPoints.findProgram(id);
        if (!pointProgram) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Program not found.' }));
        }

        else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(pointProgram));
        }
    } catch (error) {
        console.log(error);
    }
}

async function getGarbageTypePoints(req, res, id) {
    try {
        const garbageTypePoints = await CollectionPoints.findType(id);
        if (!garbageTypePoints) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Garbage types not found.' }));
        }

        else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(garbageTypePoints));
        }
    } catch (error) {
        console.log(error);
    }
}

// get single point
//@route GET /collectionPoint/:id
async function getCollectionPoints(req, res, id) {
    try {
        const points = await CollectionPoints.findById(id);
        if (!points) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Point not found.' }));
        }

        else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(points));
        }

    } catch (error) {
        console.log(error);
    }
}

// create a point
//@route POST /collectionPoint
async function createPoint(req, res) {
    try {
        const body = await getPostData(req);
        const bodyArray = JSON.parse(body);
        const {
            name,
            size,
            location,
            email,
            phone
        } = bodyArray[0];

        const point = {
            name,
            size,
            location,
            email, 
            phone
        }

        const newPoint = await CollectionPoints.create(bodyArray);

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newPoint));


    } catch (error) {
        console.log(error);
    }
}

// delete single point
//@route DELETE /collectionPoint/:id
async function deletePoint(req, res, id) {
    try {
        const points = await CollectionPoints.findById(id);
        if (!points) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Point not found.' }));
        }

        else {
            await CollectionPoints.remove(id);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `Point ${id} removed` }));
        }
    } catch (error) {
        console.log(error);
    }
}

async function createCPRecords(req, res) {
    try {
        const body = await getPostData(req);
        const bodyArray = JSON.parse(body);

        console.log('ba', bodyArray);
        const insertRecords = await CollectionPoints.insertPointProgram(bodyArray);
        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(insertRecords));


    }

    catch(error) {
        console.log(error);
    }
}


module.exports = {
    getPointsTable,
    getCollectionPoints,
    createPoint,
    deletePoint,
    choosePathCollectionPoints,
    getGarbageTypePoints,
    getPointProgram,
    createCPRecords
}