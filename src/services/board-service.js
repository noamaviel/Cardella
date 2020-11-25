import HttpService from './http-service'

export default {
    getBoards,
    getBoardById,
    addBoard,
    removeBoard,
    updateBoard
}

function getBoards() {
    return HttpService.get('boards')
}
function getBoardById(boardId) {
    return HttpService.get(`boards/${boardId}`)
}

function addBoard(board) {
    return HttpService.post('boards', board)
}
function removeBoard(boardId) {
    return HttpService.delete(`boards/${boardId}`)
}

function updateBoard(board) {
    return HttpService.put(`boards/${board._id}`, board)
}


// Service Testing


// // var testboard = {_id: "b102", test:'testboard'}
// // update(testboard);

// // async function update(board) {
// //   console.log('board in ENTRANCE', board)
// //   var t = await boardService.update(board)
// //   console.log('updatedboard', t)
// // }

// getBoards();

// async function getBoards() {
//   var bs = await boardService.getBoards();
//   console.log('boards:', bs);
// }

// const testBoard = {
//   _id: "b101"
// }
// getBoardById(testBoard._id)

// async function getBoardById(testBoardId) {
//   var bst = await boardService.getBoardById(testBoardId);
//   console.log('boardById', bst)
// }

// removeBoard("b102")

// async function removeBoard(boardId) {
//   var rb = await boardService.remove(boardId)
//   console.log('removedBoard', rb)
// }

// // const newTestBoard = {
// //   _id: "b102"
// // }

// // addBoard(newTestBoard)

// // async function addBoard(newBoard) {
// //   var ntb = await boardService.addBoard(newBoard);
// //   console.log('newBoard', ntb);
// // }
