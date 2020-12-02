
module.exports = connectSockets

function connectSockets(io) {
    console.log('connect Sockets call');
    io.on('connection', socket => {
        // console.log('connection io.on called', socket.myTopic);
        socket.on('update', msg => {
            // console.log('updateEventInServer with payload', msg._id)
            io.to(socket.myTopic).emit('update', msg)
        })
        socket.on('update topic', topic => {
            // console.log('update topic event in server with payload:', topic)
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(topic)
            socket.myTopic = topic;
        })
    })
}