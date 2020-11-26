import HttpService from './http-service'

export const boardService = {
    getBoards,
    getBoardById,
    addBoard,
    removeBoard,
    updateBoard,
    getListById,
    getCardById,
    getEmptyCard
}

function getBoards() {
    return HttpService.get('boards')
}
function getBoardById(boardId) {
    return HttpService.get(`boards/${boardId}`)
}

async function getListById(boardId, listId) {
    const board = await getBoardById(boardId);
    return board.lists[listId];
}

function getCardById(boardId, listId, cardId) {
    const list = getListById(boardId, listId);
    return list.card[cardId];
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

function getEmptyCard(title = '') {
    const card = {
        id: _makeId(),
        title,
        createdAt: Date.now(),
        createdBy: {
            id: 'u103',
            fullname: 'Shimrit Herbst',
            imgUrl: 'http://some-img'
        }
    }
    return card;
}

function _makeId(length = 4) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
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
