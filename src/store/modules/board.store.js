// import { boardService } from '@/services/board-service.js';

export const boardStore = {
    strict: true,
    state: {
        currBoard: {},
    },
    getters: {
        getBoard(state) {
            return state.currBoard;
        }
    },
    mutations: {
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
    },
    actions: {
        // async loadBoard({ commit }) {
        //     const board = await boardService.query()
        //     commit({ type: 'setCurrBoard', board })
        // },
    }
}