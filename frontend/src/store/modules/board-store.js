import { boardService } from '@/services/board-service.js';
import socketService from '@/services/socket-service.js';
import Swal from "sweetalert2";


export const boardStore = {
    strict: true,
    state: {
        boards: [],
        currBoard: {},
        filterBy: {
            txt: "",
        },
        filteredList: [],
    },
    getters: {
        getCurrBoard(state) {
            return state.currBoard
        },
        getBoards(state) {
            return state.boards;
        },
        getFilteredList(state) {
            var cardsList = [];
            if (state.filteredList.length > 0) {
                //boards
                state.filteredList.filter((board) => {
                    // console.log("board", board);
                    //lists
                    board.lists.filter((list) => {
                        // console.log("list", list);
                        let cards = list.cards.filter((card) => {
                            // console.log("card", card);
                            let res = false;
                            if (card.title) {
                                if (
                                    card.title
                                        .toLowerCase()
                                        .includes(
                                            state.filterBy.txt.toLowerCase()
                                        )
                                ) {
                                    res = true;
                                }
                            }
                            if (card.description) {
                                if (
                                    card.description
                                        .toLowerCase()
                                        .includes(
                                            state.filterBy.txt.toLowerCase()
                                        )
                                ) {
                                    res = true;
                                }
                            }
                            if (res) {
                                card.boardId = board._id;
                                card.boardTitle = board.title;
                                card.listId = list.id;
                                card.listTitle = list.title;
                            }
                            return res;
                        });
                        // console.log("cards", cards);

                        cardsList = cardsList.concat(cards);
                        // console.log("cardsList", cardsList);

                        return false;
                    });
                    return false;
                });
            }
            return cardsList;
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
        setFilterBy(state, {filterBy}) {
          state.filterBy = filterBy;
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
                Swal.fire({
                    icon: 'error',
                    text: 'Cannot add board',
                })
            }
        },
        async query({ commit }, { filterBy }) {
            // console.log('filterBy - query action', filterBy)
            commit({type: 'setFilteredList', filteredList: []})
            commit({ type: 'setFilterBy', filterBy: filterBy })
            let res = await boardService.getBoards(filterBy)
            // console.log('action query getBoards RESULT', res);
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
                Swal.fire({
                    icon: 'error',
                    text: 'Cannot load board',
                })
            }
        },
        async loadBoards({ commit }) {
            try {
                const boards = await boardService.getBoards()
                commit({ type: 'setBoards', boards })
            }
            catch (err) {
                console.error('Cannot load boards', err);
                Swal.fire({
                    icon: 'error',
                    text: 'Cannot load boards',
                })
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
                Swal.fire({
                    icon: 'error',
                    text: 'Cannot update board',
                })
            }
        },
        async removeBoard({ commit }, { boardId }) {
            try {
                await boardService.removeBoard(boardId);
                commit({ type: 'removeBoard', boardId })
            } catch (err) {
                console.error('Cannot remove board', err);
                Swal.fire({
                    icon: 'error',
                    text: 'Cannot remove board',
                })
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
                Swal.fire({
                    icon: 'error',
                    text: 'Cannot add card',
                })
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
                Swal.fire({
                    icon: 'error',
                    text: 'Cannot update card',
                })
            }
        },
        async removeCard({ commit, state }, { listId, cardId }) {
            try {
                commit({ type: 'removeCard', listId, cardId })
                await boardService.updateBoard(state.currBoard);
                socketService.emit('update', state.currBoard);
            } catch (err) {
                console.error('Cannot remove card', err);
                Swal.fire({
                    icon: 'error',
                    text: 'Cannot remove card',
                })
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
                Swal.fire({
                    icon: 'error',
                    text: 'Cannot add list',
                })
            }
        },
        async updateList({ commit, state }, { list }) {
            try {
                commit({ type: 'updateList', list });
                await boardService.updateBoard(state.currBoard);
                socketService.emit('update', state.currBoard);
            } catch (err) {
                console.error('Cannot update list', err);
                Swal.fire({
                    icon: 'error',
                    text: 'Cannot update list',
                })
            }
        },
        async removeList({ commit, state }, { listId }) {
            try {
                commit({ type: 'removeList', listId })
                await boardService.updateBoard(state.currBoard);
                socketService.emit('update', state.currBoard);
            } catch (err) {
                console.error('Cannot remove list', err);
                Swal.fire({
                    icon: 'error',
                    text: 'Cannot remove list',
                })
            }
        },
    }
}