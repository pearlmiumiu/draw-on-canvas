const path = require('path');
const express = require('express');
const app = express();
const socketio = require('socket.io');//constructor function, invoke

// app.listen() returns an http.Server object
// http://expressjs.com/en/4x/api.html#app.listen
const server = app.listen(1337, function () {
    console.log(`Listening on http://localhost:${server.address().port}`);
});
//input output system . socket connection is a signle client to server relationship
//

const io = socketio(server);//socketio needs to take a server to emit event
const drawings=[]
io.on('connection', function(socket){


	socket.emit('load', drawings);
    console.log('A new client has connected!');
    console.log(socket.id);
    //need access to socket, a single client connect
    socket.on('disconnect', function(){ //server socket
    	console.log('sad! user disconnect')
    })
    //socket.on('Idrewsomthing',drewSomething)
    socket.on('Idrewsomthing',(...payload)=>{
    	console.log('got a drawing')


    	drawings.push(payload)
    	socket.broadcast.emit('someoneElseDrew', ...payload) //spread, from a single array to comma separated items
    	console.log("pay", typeof payload, payload) //payload is a object, array
    })
})

// function drewSomething(start, end, color){
// 	console.log("got a drawing")
// }



function getRoomName(){
	consoloe.log('refer', socket.request.headers.referer)
	return 
}

app.use(express.static(path.join(__dirname, 'public'))); //

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
})
