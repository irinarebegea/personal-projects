const { database } = require('../dbConnection');
async function getAllCategories() {
    return database.select('*')
        .from('garbage_records');
};

async function findAll() {
    const garbages = await getAllCategories();
    return new Promise((resolve, reject) => {
        // what I want to be sent back to the API

        resolve(garbages);

    })
}

function findById(id) {
    const garbage = database.select('*').from('garbage_records').where('id', id);
    return new Promise((resolve, reject) => {
        // const garbage = garbages.find((p) => p.id === id)
        resolve(garbage);
    })
}

function findType(id) {
    const garbageType = database.select('*').from('garbage_type').where('garbage_id', id);
    // console.log(garbageType);
    return new Promise((resolve, reject) => {
        resolve(garbageType);
    })
}

function getLastId() {
    return new Promise((resolve, reject) => {
        resolve(database('garbage_records').max('id'));
    });
}

function insertGarbageTypeRecords(/* id, */ array) {
    return new Promise((resolve, reject) => {
        database('garbage_records').max('id').then(result => {
            array.forEach(element => {
                database('garbage_type')
                    .insert({
                        garbage_id: result[0].max,
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
        let garbage = array[0];
        array.shift();
        database('garbage_records')
            .insert({
                date_added: garbage.date,
                garbage_size: garbage.size,
                location: garbage.location,
                request_type: garbage.requestType.toLowerCase(),
                status: garbage.status,
                updated_by: garbage.updatedBy
            }).then(function () {
                console.log('Insertion completed.');
                database('garbage_records').max('id').then(result => {
                    array.forEach(element => {
                        database('garbage_type')
                            .insert({
                                garbage_id: result[0].max,
                                general_type: element.general_type,
                                specific_type: element.specific_type
                            }).then(function () {
                                console.log('Insertion of one row completed.');
                            });
                    })
                });
            });
        resolve(garbage);
    })
}

function update(id, garbage) {
    return new Promise((resolve, reject) => {
        resolve(database('garbage_records').where('id', id)
            .update({
                date_added: garbage.date,
                garbage_size: garbage.size,
                location: garbage.location,
                request_type: garbage.requestType,
                status: 'Cleaned',
                updated_by: garbage.updatedBy
            }));

    })
}


function remove(id) {
    return new Promise((resolve, reject) => {
        resolve(database('garbage_records')
            .where('id', id)
            .del());
    })
}

function countAll() {
    return new Promise((resolve, reject) => {
        resolve(database('garbage_records').count('*'));
    })
}

function countSolved() {
    return new Promise((resolve, reject) => {
        resolve(database('garbage_records')
        .select('*')
        .where('status', 'Cleaned')
        )
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
    insertGarbageTypeRecords,
    countAll,
    countSolved
}