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
        dueDate: null,
        description: '',
        uploadImgUrl: '',
        style: {
            bgColor: '#C1C1C1'
        },
        createdBy: _getCreatedBy(),
        members: [_getCreatedBy()],
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

// TODO implement when login is ready
function _getCreatedBy() {
    return {
        id: 'u103',
        fullname: 'Shimrit Herbst',
        imgUrl: 'https://res.cloudinary.com/shimrit/image/upload/v1606511397/cardella/shimrit_idcy9l.jpg',
    };
}