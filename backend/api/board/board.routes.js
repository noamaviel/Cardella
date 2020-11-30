const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {getBoard, addBoard, getBoards, updateBoard, deleteBoard} = require('./board.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getBoards)
router.get('/:id', getBoard)
router.post('/',  addBoard)
// router.post('/',  requireAuth, addBoard) 
router.put('/:id', updateBoard)
// router.put('/:id', requireAuth, updateBoard)
router.delete('/:id',  deleteBoard)
// router.delete('/:id',  requireAuth, deleteBoard)

module.exports = router