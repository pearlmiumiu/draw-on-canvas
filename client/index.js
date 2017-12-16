// Import from the module './whiteboard':
//   The default export, naming it draw,
//   An export named `events`, calling it `whiteboard`.
import whiteboard, {draw} from './whiteboard'
import clientIo from 'socket.io-client'

//const socket=clientIo(window.location.origin)
// Example of listening to draw events:
//   (This logging will probably get really annoying):

whiteboard.on('draw', (start, end, color)=>{
	console.log('drawing', start, end, color);
	socket.emit("IdrewSomthing", start, end, color)
});



// Example: Draw a single stroke.
draw([0, 0], [250, 250], 'red', true)

var socket= io(window.location.origin); //socket on frontend
//each socket listen to different event
socket.on('connect', function(){
	console.log("I have made a persistent two-way connection to the server!")
})
socket.on('omeoneElseDrew',(start, end, color)=>{
    draw(start, end, color, false)
})

socket.on('load', drawingHistory=>{
	drawingHistory.forEach(([start, end, color])=>{
		draw(start, end, color, true)
	})
})