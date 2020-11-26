import { boardService } from '@/services/board-service.js';

export const boardStore = {
    strict: true,
    state: {
        boards: [],
        currBoard: {},
    },
    getters: {
        getCurrBoard(state) {
            return state.currBoard;
        }
    },
    mutations: {
        //BOARD//
        setCurrBoard(state, { board }) {
            state.currBoard = board;
        },
        addBoard(state, { board }) {
            state.boards.push(board);
            state.currBoard = board;
        },
        updateBoard(state, { board }) {
            const idx = state.boards.findIndex(currBoard => currBoard._id === board._id);
            state.boards.splice(idx, 1, board);
            state.currBoard = board;
        },
        removeBoard(state, { boardId }) {
            const idx = state.boards.findIndex(board => board._id === boardId);
            state.boards.splice(idx, 1);
        },
        //CARD//
        addCard(state, { listId, card }) {
            console.log('this is it',state.currBoard.lists)
            const cards = state.currBoard.lists[listId].cards;
            cards.push(card);
        },
    },
    actions: {
        //BOARD//
        async loadBoard({ commit }, { boardId }) {
            const board = await boardService.getBoardById(boardId)
            commit({ type: 'setCurrBoard', board })
        },
        //CARD//
        async addCard({ commit, state }, { listId, cardTitle }) {
            const card = boardService.getEmptyCard(cardTitle);
            console.log("🚀 ~ file: board-store.js ~ line 47 ~ addCard ~ card", card)
            commit({ type: 'addCard', listId, card })
            await boardService.updateBoard(state.currBoard);
        },

    }
}