import io from 'socket.io-client';
const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/'
    : '//localhost:3030' 
var socket;

export default {
    setup,
    terminate,
    on,
    off,
    emit    
}

function setup() {
    socket = io(BASE_URL);
}

function terminate() {
    socket = null;
}

function on(eventName, cb) {
    socket.on(eventName, cb)
}

function off(eventName, cb) {
    socket.off(eventName, cb)
}

function emit(eventName, data) {
    // console.log('emit in socket service', eventName, data)
    socket.emit(eventName, data)
}
