const { database } = require('../dbConnection');

async function getAllCategories() {
    return database.select('*')
        .from('events');
};

async function findAll() {
    const events = await getAllCategories();
    return new Promise((resolve, reject) => {
        // what I want to be sent back to the API

        resolve(events);

    })
}

function findById(id) {
    const events = database.select('*').from('events').where('id', id);

    return new Promise((resolve, reject) => {
        resolve(events);
    })
}

function getLastId() {

    return new Promise((resolve, reject) => {
        resolve(database('events').max('id'));
    });

}

function findProgram(id) {
    const eventProgram = database.select('*').from('timetable_events').where('id', id);
    console.log(eventProgram);
    return new Promise((resolve, reject) => {
        resolve(eventProgram);
    })
}

function insertEventProgram(array) {
    return new Promise((resolve, reject) => {
        database('events').max('id').then(result => {
            array.forEach(element => {
                database('timetable_events')
                    .insert({
                        id: result[0].max,
                        date: element.date,
                        start_time: element.start_time,
                        end_time: element.end_time
                    }).then(function () {
                        console.log('Insertion of one row completed.');
                    });
            })
        });

        resolve(array);
    });

}

function create(array) {
    return new Promise((resolve, reject) => {
        let event = array[0];
        array.shift();
        let newObject = {}
        newObject.date = array[0].date;
        newObject.start = array[1].start;
        newObject.end = array[2].end;
        database('events')
            .insert({
                event_name: event.name,
                description: event.description,
                location: event.location,
                organiser_name: event.organiser_name,
                organiser_email: event.organiser_email,
                organiser_phone: event.organiser_phone,
                attendance_number: event.attendance,
                volume_waste: event.volume
            })
            .then(function () {
                console.log('Insertion completed.');
                database('events').max('id')
                    .then(result => {
                        database('timetable_events')
                            .insert({
                                id: result[0].max,
                                date: newObject.date,
                                start_time: newObject.start,
                                end_time: newObject.end
                            }).then(function () {
                                console.log('Insertion of one row completed.');
                            });
                    });
            });
        resolve(event);
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        resolve(database('events')
            .where('id', id)
            .del());
    })
}

function update(id, event) {
    return new Promise((resolve, reject) => {
        resolve(database('events').where('id', id)
            .update({
                attendance_number: event.attendance
             
            }));

    })
}
 

module.exports = {
    findAll,
    findById,
    getLastId,
    findProgram,
    create,
    remove,
    insertEventProgram,
    update
}