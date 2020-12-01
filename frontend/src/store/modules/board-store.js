import { boardService } from '@/services/board-service.js';
import socketService from '@/services/socket-service.js';


export const boardStore = {
    strict: true,
    state: {
        boards: [],
        currBoard: {},
    },
    getters: {
        getCurrBoard(state) {
            return state.currBoard;
        },
        getBoards(state) {
            return state.boards;
        }
    },
    mutations: {
        //BOARD//
        setBoards(state, { boards }) {
            state.boards = boards;
        },

        setCurrBoard(state, { board }) {
            console.log('setCurrBoard', board._id);
            state.currBoard = board;
        },
        addBoard(state, { newBoard }) {
            state.boards.push(newBoard);
            state.currBoard = newBoard;
        },
        updateBoard(state, { board }) {
            const idx = state.boards.findIndex(currBoard => currBoard._id === board._id);
            state.boards.splice(idx, 1, board);
            state.currBoard = board;
        },
        addActivity(state, { activity }) {
            state.currBoard.boardActivites.unshift(activity);
        },
        // removeBoard(state, { boardId }) {
        //     const idx = state.boards.findIndex(board => board._id === boardId);
        //     state.boards.splice(idx, 1);
        // },

        //CARD//
        addCard(state, { listId, card }) {
            const listIdx = state.currBoard.lists.findIndex(list => list.id === listId);
            const cards = state.currBoard.lists[listIdx].cards;
            cards.push(card);
        },
        updateCard(state, { list, card }) {
            const listIdx = state.currBoard.lists.findIndex(currList => currList.id === list.id);
            const cardIdx = state.currBoard.lists[listIdx].cards.findIndex(currCard => currCard.id === card.id);
            const cards = state.currBoard.lists[listIdx].cards;
            cards.splice(cardIdx, 1, card);
        },
        removeCard(state, { listId, cardId }) {
            const listIdx = state.currBoard.lists.findIndex(list => list.id === listId);
            const cardIdx = state.currBoard.lists[listIdx].cards.findIndex(card => card.id === cardId);
            const cards = state.currBoard.lists[listIdx].cards;
            cards.splice(cardIdx, 1);
        },
        //LIST//
        addList(state, { list }) {
            const lists = state.currBoard.lists;
            lists.push(list);
        },
        updateList(state, { list }) {
            const listIdx = state.currBoard.lists.findIndex(currList => currList.id === list.id);
            const lists = state.currBoard.lists;
            lists.splice(listIdx, 1, list);
        },
        removeList(state, { listId }) {
            const listIdx = state.currBoard.lists.findIndex(currList => currList.id === listId);
            const lists = state.currBoard.lists;
            lists.splice(listIdx, 1);
        },
    },
    actions: {
        //BOARD//
        async addBoard({ commit }) {
            // TO DO: get logedin user (from the user-store)
            const newBoard = await boardService.addBoard();
            commit({ type: 'addBoard', newBoard });
            return newBoard;
        },
        async loadBoard({ commit }, { boardId }) {
            const board = await boardService.getBoardById(boardId)
            socketService.emit('update topic', boardId);
            socketService.on('update', board => {
                console.log('socket update event', board)
                commit({ type: 'setCurrBoard', board })
            })
            commit({ type: 'setCurrBoard', board })
        },
        async loadBoards({ commit }) {
            console.log('loadBoards');
            const boards = await boardService.getBoards()
            commit({ type: 'setBoards', boards })
        },
        async updateBoard({ state }) {
            await boardService.updateBoard(state.currBoard);
        },
        async updateBoardV2({ commit, state }, { board }) {
            await boardService.updateBoard(state.currBoard);
            commit({ type: 'updateBoard', board });
            socketService.emit('update', board);
        },
        //CARD//
        async addCard({ commit, state }, { listId, cardTitle }) {
            const card = boardService.getEmptyCard(cardTitle);
            commit({ type: 'addCard', listId, card })
            await boardService.updateBoard(state.currBoard);
            socketService.emit('update', state.currBoard);
        },
        async updateCard({ commit, state }, { list, card }) {
            commit({ type: 'setIsLoading', isLoading: true })
            commit({ type: 'updateCard', list, card });
            await boardService.updateBoard(state.currBoard);
            commit({ type: 'setIsLoading', isLoading: false })
            console.log('updateCard in board-store before socket service emit')
            socketService.emit('update', state.currBoard);
        },
        async removeCard({ commit, state }, { listId, cardId }) {
            commit({ type: 'removeCard', listId, cardId })
            await boardService.updateBoard(state.currBoard);
            socketService.emit('update', state.currBoard);
        },

        //LIST//
        async addList({ commit, state }, { listTitle }) {
            const list = boardService.getEmptyList(listTitle);
            commit({ type: 'addList', list })
            await boardService.updateBoard(state.currBoard);
            socketService.emit('update', state.currBoard);
        },
        async updateList({ commit, state }, { list }) {
            commit({ type: 'updateList', list });
            await boardService.updateBoard(state.currBoard);
            socketService.emit('update', state.currBoard);
        },
        async removeList({ commit, state }, { listId }) {
            commit({ type: 'removeList', listId })
            await boardService.updateBoard(state.currBoard);
            socketService.emit('update', state.currBoard);
        },
    }
}