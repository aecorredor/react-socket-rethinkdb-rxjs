import openSocket from 'socket.io-client';
import Rx from 'rxjs/Rx';
const socket = openSocket('http://localhost:8000');

function subscribeToDrawings(cb) {
  socket.on('drawing', drawing => cb(drawing));
  socket.emit('subscribeToDrawings');
}

function createDrawing(name) {
  socket.emit('createDrawing', { name });
}

function publishLine({ drawingId, line }) {
  socket.emit('publishLine', { drawingId, ...line });
}

function subscribeToDrawingLines(drawingId, cb) {
  const lineStream = Rx.Observable.fromEventPattern(
    handler => socket.on(`drawingLine:${drawingId}`, handler),
    handler => socket.off(`drawingLine:${drawingId}`, handler),
  );

  const bufferedTimeStream = lineStream
  .bufferTime(100)
  .map(lines => ({ lines }));

  bufferedTimeStream.subscribe(linesEvent => cb(linesEvent));
  socket.emit('subscribeToDrawingLines', drawingId);
}

export {
  publishLine,
  createDrawing,
  subscribeToDrawings,
  subscribeToDrawingLines,
};