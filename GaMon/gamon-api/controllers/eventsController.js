const Events = require('../models/eventsModel');
const { getPostData } = require('../utils');

async function choosePathEvent(queryParameters, method, path, req, res) {
    try {
        if (path === '/events' && method === 'GET') {
            getEventsTable(req, res);
        }


        else if (path.match(/\/events\/([0-9]+)\/program/) && method === 'GET') {
            const id = path.split('/')[2];
            getEventProgram(req, res, id);
        }

        else if (path.match(/\/events\/([0-9]+)/) && method === 'GET') {
            const id = path.split('/')[2];
            getEvent(req, res, id);
        }

        else if (path === '/events' && method === 'POST') {
            createEvent(req, res);
        }

        else if (path.match(/\/events\/([0-9]+)/) && method === 'DELETE') {
            const id = path.split('/')[2]
            deleteEvent(req, res, id);

        }

        else if (path.match(/\/events\/([0-9]+)/) && method === 'PUT') {
            const id = path.split('/')[2]
            updateEvent(req, res, id);

        }

    } catch (error) {
        console.log(error);
    }
}

// gets all events
//@route GET /api/events
async function getEventsTable(req, res) {
    try {
        const events = await Events.findAll();

        let EventsTable = events.map(events => {
            let properties = {
                "id": events.id,
                "event_name": events.event_name
            }

            return properties;
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(EventsTable));

    }
    catch (error) {
        console.log(error);
    }
}

async function getEventProgram(req, res, id) {
    try {
        const eventProgram = await Events.findProgram(id);
        if (!eventProgram) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Program not found.' }));
        }

        else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(eventProgram));
        }
    } catch (error) {
        console.log(error);
    }
}

// get single event
//@route GET /events/:id
async function getEvent(req, res, id) {
    try {
        const events = await Events.findById(id);
        if (!events) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Event not found.' }));
        }

        else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(events));
        }

    } catch (error) {
        console.log(error);
    }
}

// create an event
//@route POST /events
async function createEvent(req, res) {
    try {
        const body = await getPostData(req);
        const bodyArray = JSON.parse(body);
        console.log('body array', bodyArray);
        console.log('ba0', bodyArray[0]);
        const {
            name,
            description,
            location,
            organiser_name,
            organiser_email,
            organiser_phone,
            attendance,
            volume } = bodyArray[0];

        const event = {
            name,
            description,
            location,
            organiser_name,
            organiser_email,
            organiser_phone,
            attendance,
            volume
        }

        const newEvent = await Events.create(bodyArray);
        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newEvent));


    } catch (error) {
        console.log(error);
    }
}


// delete single event
//@route DELETE /events/:id
async function deleteEvent(req, res, id) {
    try {
        const events = await Events.findById(id);
        if (!events) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Event not found.' }));
        }

        else {
            await Events.remove(id);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `Event ${id} removed` }));
        }
    } catch (error) {
        console.log(error);
    }
}

async function updateEvent(req, res, id) {
    try {
        const body = await getPostData(req);
        const {
            name,
            description,
            location,
            organiser_name,
            organiser_email,
            organiser_phone,
            attendance,
            volume } = JSON.parse(body);

        const eventData = {
            name,
            description,
            location,
            organiser_name,
            organiser_email,
            organiser_phone,
            attendance,
            volume
        }

        const updEvent = await Events.update(body);
        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newEvent));


    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getEventsTable,
    getEvent,
    deleteEvent,
    createEvent,
    choosePathEvent,
    getEventProgram
}