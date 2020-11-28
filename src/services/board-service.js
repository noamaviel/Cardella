import HttpService from './http-service'
import { utilService } from '@/services/util-service.js';

export const boardService = {
    getBoards,
    getBoardById,
    addBoard,
    removeBoard,
    updateBoard,
    getEmptyCard,
    getEmptyList
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

function getEmptyCard(title = '') {
    const card = {
        id: utilService.makeId(),
        title,
        createdAt: Date.now(),
        dueDate: Date.now(),
        description: '',
        uploadImgUrl: '',
        createdBy: {
            id: 'u103',
            fullname: 'Shimrit Herbst',
            imgUrl: 'http://some-img'
        },
        style: {
            bgColor: '#C1C1C1'
        },
    }
    return card;
}

function getEmptyList(title = '') {
    const list = {
        id: utilService.makeId(),
        title,
        cards: []
    }
    return list;
}
