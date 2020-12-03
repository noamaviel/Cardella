
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId


async function query(filterBy = {}) {
    let boards;
    // TODO: Build the criteria with $regex
    const criteria = _buildCriteria(filterBy)
    console.log('criteria', criteria);
    const collection = await dbService.getCollection('board')
    try {
        if (criteria.title) {
            console.log('criteria.title in query -boardService', criteria.title);
            // boards = await collection.find(criteria, { $project: { title: '1' } }).toArray();

            boards = await collection.aggregate([
                {
                    $match: {$or: [{title: { $regex: filterBy.txt, $options: 'i' } }, {"createdBy.fullName" : { $regex: filterBy.txt, $options: 'i' } }]}
                },

                // { $match: { $or: [ { score: { $gt: 70, $lt: 90 } }, { views: { $gte: 1000 } } ] } },
                {
                    $project: {
                        "title": 1,
                        "createdBy.fullName" : 1
                    }
                }
                // {
                //     $lookup:
                //     {
                //         localField: 'byUserId',
                //         from: 'user',
                //         foreignField: '_id',
                //         as: 'byUser'
                //     }
                // },
                // {
                //     $unwind: '$byUser'
                // },
                // {
                //     $lookup:
                //     {
                //         localField: 'aboutUserId',
                //         from: 'user',
                //         foreignField: '_id',
                //         as: 'aboutUser'
                //     }
                // },
                // {
                //     $unwind: '$aboutUser'
                // }
            ]).toArray()
        } else {
            boards = await collection.find(criteria).toArray();
        }

        // boards = boards.map(board => {
        //     board.byUser = { _id: board.byUser._id, username: board.byUser.username }
        //     board.aboutUser = { _id: board.aboutUser._id, username: board.aboutUser.username }
        //     delete board.byUserId;
        //     delete board.aboutUserId;
        //     return board;
        // })

        return boards
    } catch (err) {
        console.log('ERROR: cannot find boards')
        throw err;
    }
}

async function getById(boardId) {
    const collection = await dbService.getCollection('board')
    try {
        const board = await collection.findOne({ '_id': ObjectId(boardId) })
        return board
    }
    catch (err) {
        console.log(`ERROR: while finding board ${boardId}`)
        throw err;
    }
}

async function remove(boardId) {
    const collection = await dbService.getCollection('board')
    try {
        await collection.deleteOne({ "_id": ObjectId(boardId) })
    } catch (err) {
        console.log(`ERROR: cannot remove board ${boardId}`)
        throw err;
    }
}

async function add(board) {
    // board.byUserId = ObjectId(board.byUserId);
    // board.aboutUserId = ObjectId(board.aboutUserId);

    const collection = await dbService.getCollection('board')
    try {
        await collection.insertOne(board);
        return board;
    } catch (err) {
        console.log(`ERROR: cannot insert board`)
        throw err;
    }
}

async function update(board) {
    const collection = await dbService.getCollection('board')
    board._id = ObjectId(board._id);

    try {
        await collection.replaceOne({ _id: board._id }, { $set: board })
        return board
    } catch (err) {
        console.log(`ERROR: cannot update board ${board._id}`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    console.log('filterBy in builCriteria', filterBy);
    const criteria = {};
    if (filterBy.txt) {
        criteria.title = { $regex: filterBy.txt, $options: 'i' };
        // { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] }

    }
    return criteria;
}

module.exports = {
    query,
    getById,
    remove,
    add,
    update
}


