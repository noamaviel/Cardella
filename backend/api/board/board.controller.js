const logger = require('../../services/logger.service')
const boardService = require('./board.service')

// TODO: needs error handling! try, catch

async function getBoard(req, res) {
    const board = await boardService.getById(req.params.id)
    res.send(board)
}

async function getBoards(req, res) {
    console.log('getBoards request.query', req.query)
    try {
        const boards = await boardService.query(req.query)
        res.json(boards)
    } catch (err) {
        logger.error('Cannot get boards', err);
        res.status(500).send({ error: 'cannot get boards' })

    }
}

async function deleteBoard(req, res) {
    try {
        await boardService.remove(req.params.id)
        res.end()
    } catch (err) {
        logger.error('Cannot delete board', err);
        res.status(500).send({ error: 'cannot delete board' })
    }
}

async function addBoard(req, res) {
    var board = req.body;
    board = await boardService.add(board)
    res.json(board)
}

async function updateBoard(req, res) {
    const board = req.body;
    await boardService.update(board);
    res.json(board);
}

module.exports = {
    getBoard,
    getBoards,
    deleteBoard,
    addBoard,
    updateBoard
}