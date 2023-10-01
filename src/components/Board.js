// import React, { useRef, useEffect } from 'react';
// import './styles/board.css';
// import App from '../App';



// const Board = () => {
//     const canvasRef = useRef(null);
//     const colorsRef = useRef(null);
//     // const socketRef = useRef();

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         const context = canvas.getContext('2d');
//         const colors = document.getElementsByClassName('color');

//         const current = {
//             color: 'black',
//         };

//         let dataURL = '';
//         let drawing = false;

//         const onColorUpdate = (e) => {
//             current.color = e.target.className.split(' ')[1];
//         };

//         const drawLine = (x0, y0, x1, y1, color, send) => {
//             context.beginPath();
//             context.moveTo(x0, y0);
//             context.lineTo(x1, y1);
//             context.strokeStyle = color;
//             context.lineWidth = 2;
//             context.stroke();
//             context.closePath();
//             context.save();
//         };

//         const onMouseDown = (e) => {
//             drawing = true;
//             if (e.touches && e.touches.length > 0) {
//                 // Handle touch events
//                 current.x = e.touches[0].clientX;
//                 current.y = e.touches[0].clientY;
//             } else {
//                 // Handle mouse events
//                 current.x = e.clientX;
//                 current.y = e.clientY;
//             }
//         };

//         const onMouseMove = (e) => {
//             if (drawing) {
//                 if (e.touches && e.touches.length > 0) {
//                     // Handle touch events
//                     drawLine(current.x, current.y, e.touches[0].clientX, e.touches[0].clientY, current.color, true);
//                     current.x = e.touches[0].clientX;
//                     current.y = e.touches[0].clientY;
//                 } else {
//                     // Handle mouse events
//                     drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true);
//                     current.x = e.clientX;
//                     current.y = e.clientY;
//                 }
//             }
//         };

//         const onMouseUp = (e) => {
//             if (e.touches && e.touches.length > 0) {
//                 drawLine(current.x, current.y, e.touches[0].clientX, e.touches[0].clientY, current.color, true);
//             } else {
//                 drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true);
//             }
//             drawing = false;
//         };

//         const onMouseLeaveCanvas = () => {
//             drawing = false;
//         };

//         const throttle = (callBack, delay) => {
//             let previousCall = new Date().getTime()
//             return function () {
//                 const time = new Date().getTime()
//                 if ((time - previousCall) >= delay) {
//                     previousCall = time
//                     callBack.apply(null, arguments)
//                 }
//             }
//         }

//         canvas.addEventListener('mousedown', onMouseDown, false);
//         canvas.addEventListener('mouseup', onMouseUp, false);
//         // canvas.addEventListener('mouseout', onMouseUp, false);
//         canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);
//         canvas.addEventListener('mouseleave', onMouseLeaveCanvas, false);

//         canvas.addEventListener('touchstart', onMouseDown, false);
//         canvas.addEventListener('touchend', onMouseUp, false);
//         canvas.addEventListener('touchcancel', onMouseUp, false);
//         canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);

//         for (let i = 0; i < colors.length; i++) {
//             colors[i].addEventListener('click', onColorUpdate, false);
//         }

//         const onResize = () => {
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
//             let img = document.createElement('img');
//             img.src = dataURL;
//             context.drawImage(img, 0, 0);
//             context.restore();
//         };

//         window.addEventListener('resize', onResize, false);
//         onResize();

//         const onDrawingEvent = (data) => {
//             const w = canvas.width;
//             const h = canvas.height;
//             drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
//         };

//         // Initialize the WebSocket connection
//         // socketRef.current = new WebSocket('ws://127.0.0.1:8000');

//         // socketRef.current.onOpen = e => {
//         //     console.log('open', e)
//         // }

//         // socketRef.current.onMessage = e => {
//         //     console.log(e)
//         // }

//         // socketRef.current.oneError = e => {
//         //     console.log('error', e)
//         // }

//         // Cleanup function
//         return () => {
//             canvas.removeEventListener('mouseleave', onMouseLeaveCanvas);
//             // Close the WebSocket connection when the component unmounts
//             // socketRef.current.close();
//         };

//     }, []);

//     return (
// <>
//         <App />
//         <div>
//             <canvas ref={canvasRef} className="whiteboard" />
//             <div ref={colorsRef} className="colors">
//                 <div className="color black" />
//                 <div className="color red" />
//                 <div className="color green" />
//                 <div className="color yellow" />
//                 <div className="color blue" />
//             </div>
//         </div>
//         </>
//     );
// };

// export default Board;
