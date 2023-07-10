//const { writeDataToFile } = require('../utils');
const { database } = require('../dbConnection');

async function getAllCategories() {
    return database.select('*')
        .from('collection_points');
};

async function findAll() {
    const points = await getAllCategories();
    return new Promise((resolve, reject) => {
        // what I want to be sent back to the API

        resolve(points);

    })
}

function findById(id) {
    const points = database.select('*').from('collection_points').where('id', id);

    return new Promise((resolve, reject) => {
        resolve(points);
    })
}

function findProgram(id) {
    const pointProgram = database.select('*').from('timetable_collection_points').where('id', id);
    console.log(pointProgram);
    return new Promise((resolve, reject) => {
        resolve(pointProgram);
    })
}

function findType(id) {
    const garbageTypePoints = database.select('*').from('garbage_type_points').where('point_id', id);
    console.log(garbageTypePoints);
    return new Promise((resolve, reject) => {
        resolve(garbageTypePoints);
    })
}

function getLastId() {

    return new Promise((resolve, reject) => {
        resolve(database('collection_points').max('id'));
    });

}

function insertPointProgram(array) {
    return new Promise((resolve, reject) => {
        database('collection_points').max('id').then(result => {
            array.forEach(element => {
                database('timetable_collection_points')
                    .insert({
                        id: result[0].max,
                        day: element.day,
                        start_time: element.start_time,
                        end_time: element.end_time
                    }).then(function () {
                        console.log('Insertion of timetable completed.');
                    });
            })
        });

        resolve(array);
    });

}

function insertGarbageTypeRecords(/* id, */ array) {
    return new Promise((resolve, reject) => {
        database('collection_points').max('id').then(result => {
            array.forEach(element => {
                database('garbage_type_points')
                    .insert({
                        point_id: result[0].max,
                        general_type: element.general_type,
                        specific_type: element.specific_type
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
        let point = array[0];
        array.shift();
        database('collection_points')
            .insert({
                point_name: point.name,
                point_size: point.size,
                location: point.location,
                email: point.email,
                phone: point.phone
            })
            .then(function () {
                console.log('Insertion completed.');
                database('collection_points').max('id').then(result => {
                    array.forEach(element => {
                        database('garbage_type_points')
                            .insert({
                                point_id: result[0].max,
                                general_type: element.general_type,
                                specific_type: element.specific_type
                            }).then(function () {
                                console.log('Insertion of one row completed.');
                            });
                    })
                        // database('timetable_collection_points')
                        //     .insert({
                        //         id: result[0].max,
                        //         day: element.day,
                        //         start_time: element.start_time,
                        //         end_time: element.end_time
                        //     }).then(function () {
                        //         console.log('Insertion of one row completed.');
                        //     });
                });
            })
            .then(function () {
                console.log('Insertion completed.');
                // database('collection_points').max('id').then(result => {
                //     array.forEach(element => {
                //         database('garbage_type_points')
                //             .insert({
                //                 point_id: result[0].max,
                //                 general_type: element.general_type,
                //                 specific_type: element.specific_type
                //             }).then(function () {
                //                 console.log('Insertion of one row completed.');
                //             });
                //     })
                // });
            });
        resolve(point);
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        resolve(database('collection_points')
            .where('id', id)
            .del());
    })
}



module.exports = {
    findAll,
    findById,
    findType,
    findProgram,
    getLastId,
    insertPointProgram,
    insertGarbageTypeRecords,
    create,
    remove
}