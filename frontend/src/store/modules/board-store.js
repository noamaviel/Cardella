import { boardService } from '@/services/board-service.js';
import socketService from '@/services/socket-service.js';


export const boardStore = {
    strict: true,
    state: {
        boards: [],
        currBoard: {},
        filteredList: []
    },
    getters: {
        getCurrBoard(state) {
            return state.currBoard
        },
        getBoards(state) {
            return state.boards;
        },
        getFilteredList(state) {
            return state.filteredList;
        }
    },
    mutations: {
        //BOARD//
        setBoards(state, { boards }) {
            state.boards = boards;
        },

        setCurrBoard(state, { board }) {
            state.currBoard = board;
        },
        setFilteredList(state, { filteredList }) {
            state.filteredList = filteredList;
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
        removeBoard(state, { boardId }) {
            if (state.boards.length > 0) {
                const idx = state.boards.findIndex(board => board._id === boardId);
                state.boards.splice(idx, 1);
            }
        },

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
            try {
                const newBoard = await boardService.addBoard();
                commit({ type: 'addBoard', newBoard });
                return newBoard;
            }
            catch (err) {
                console.error('Cannot add board', err);
                // $swal.error();
            }
        },
        async query({ commit }, { filterBy }) {
            console.log('filterBy - query action', filterBy)
            let res = await boardService.getBoards(filterBy)
            console.log('action query getBoards RESULT', res);
            commit({ type: 'setFilteredList', filteredList: res });
        },
        async loadBoard({ commit }, { boardId }) {
            try {
                const board = await boardService.getBoardById(boardId)
                socketService.emit('update topic', boardId);
                commit({ type: 'setCurrBoard', board })
            }
            catch (err) {
                console.error('Cannot load board', err);
                // $swal.error();
            }
        },
        async loadBoards({ commit }) {
            try {
                const boards = await boardService.getBoards()
                commit({ type: 'setBoards', boards })
            }
            catch (err) {
                console.error('Cannot load boards', err);
                // $swal.error();
            }
        },
        // async updateBoard({ state }) {
        //     await boardService.updateBoard(state.currBoard);
        // },
        async updateBoardV2({ commit }, { board }) {
            try {
                await boardService.updateBoard(board);
                commit({ type: 'updateBoard', board });
                socketService.emit('update', board);
            } catch (err) {
                console.error('Cannot update board', err);
                // $swal.error();
            }
        },
        async removeBoard({ commit }, { boardId }) {
            try {
                await boardService.removeBoard(boardId);
                commit({ type: 'removeBoard', boardId })
            } catch (err) {
                console.error('Cannot remove board', err);
                // $swal.error();
            }
        },
        //CARD//
        async addCard({ commit, state }, { listId, cardTitle }) {
            try {
                const card = boardService.getEmptyCard(cardTitle);
                console.log("🚀 ~ file: board-store.js ~ line 142 ~ addCard ~ card", card)
                commit({ type: 'addCard', listId, card })
                await boardService.updateBoard(state.currBoard);
                socketService.emit('update', state.currBoard);
            } catch (err) {
                console.error('Cannot add card', err);
                // $swal.error();
            }
        },
        async updateCard({ commit, state }, { list, card }) {
            try {
                commit({ type: 'setIsLoading', isLoading: true })
                await boardService.updateBoard(state.currBoard);
                commit({ type: 'updateCard', list, card });
                commit({ type: 'setIsLoading', isLoading: false })
                socketService.emit('update', state.currBoard);
            } catch (err) {
                console.error('Cannot update card', err);
                // $swal.error();
            }
        },
        async removeCard({ commit, state }, { listId, cardId }) {
            try {
                commit({ type: 'removeCard', listId, cardId })
                await boardService.updateBoard(state.currBoard);
                socketService.emit('update', state.currBoard);
            } catch (err) {
                console.error('Cannot remove card', err);
                // $swal.error();
            }
        },
        //LIST//
        async addList({ commit, state }, { listTitle }) {
            try {
                const list = boardService.getEmptyList(listTitle);
                commit({ type: 'addList', list })
                await boardService.updateBoard(state.currBoard);
                socketService.emit('update', state.currBoard);
            } catch (err) {
                console.error('Cannot add list', err);
                // $swal.error();
            }
        },
        async updateList({ commit, state }, { list }) {
            try {
                commit({ type: 'updateList', list });
                await boardService.updateBoard(state.currBoard);
                socketService.emit('update', state.currBoard);
            } catch (err) {
                console.error('Cannot update list', err);
                // $swal.error();
            }
        },
        async removeList({ commit, state }, { listId }) {
            try {
                commit({ type: 'removeList', listId })
                await boardService.updateBoard(state.currBoard);
                socketService.emit('update', state.currBoard);
            } catch (err) {
                console.error('Cannot remove list', err);
                // $swal.error();
            }
        },
    }
}