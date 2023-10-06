import React, { useRef, useEffect } from 'react';
import { firestore } from '../firebase';
import { addDoc, collection } from '@firebase/firestore';
import './styles/board.css';

const Board = () => {
  const canvasRef = useRef(null);
  const colorsRef = useRef(null);
  const ref = collection(firestore, "messages"); // Firestore collection reference for messages

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const colors = colorsRef.current.querySelectorAll('.color');
    let current = { color: 'black' };
    let dataURL = '';
    let drawing = false;

    const onColorUpdate = (e) => {
      current.color = e.target.className.split(' ')[1];
    };

    const drawLine = (x0, y0, x1, y1, color, send) => {
      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.strokeStyle = color;
      context.lineWidth = 2;
      context.stroke();
      context.closePath();
      context.save();
    };

    const onMouseDown = (e) => {
      drawing = true;
      const [clientX, clientY] = e.touches ? [e.touches[0].clientX, e.touches[0].clientY] : [e.clientX, e.clientY];
      current.x = clientX;
      current.y = clientY;
    };

    const onMouseMove = (e) => {
      if (drawing) {
        const [clientX, clientY] = e.touches ? [e.touches[0].clientX, e.touches[0].clientY] : [e.clientX, e.clientY];
        drawLine(current.x, current.y, clientX, clientY, current.color, true);
        current.x = clientX;
        current.y = clientY;
      }
    };

    const onMouseUp = (e) => {
      if (e.touches) {
        drawLine(current.x, current.y, e.touches[0].clientX, e.touches[0].clientY, current.color, true);
      } else {
        drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true);
      }
      drawing = false;
    };

    const onMouseLeaveCanvas = () => {
      drawing = false;
    };

    const throttle = (callBack, delay) => {
      let previousCall = new Date().getTime();
      return function () {
        const time = new Date().getTime();
        if (time - previousCall >= delay) {
          previousCall = time;
          callBack.apply(null, arguments);
        }
      };
    };

    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);
    canvas.addEventListener('mouseleave', onMouseLeaveCanvas, false);
    canvas.addEventListener('touchstart', onMouseDown, false);
    canvas.addEventListener('touchend', onMouseUp, false);
    canvas.addEventListener('touchcancel', onMouseUp, false);
    canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);

    colors.forEach((color) => {
      color.addEventListener('click', onColorUpdate, false);
    });

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      let img = document.createElement('img');
      img.src = dataURL;
      context.drawImage(img, 0, 0);
      context.restore();
    };

    window.addEventListener('resize', onResize, false);
    onResize();

    const onDrawingEvent = (data) => {
      const w = canvas.width;
      const h = canvas.height;
      drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    };

    // const externalData = {
    //     x0: 0.1,
    //     y0: 0.2,
    //     x1: 0.3,
    //     y1: 0.4,
    //     color: 'red',
    //   };
    //   onDrawingEvent(externalData);

    // Cleanup function
    return () => {
      canvas.removeEventListener('mouseleave', onMouseLeaveCanvas);
    };
  }, []);

  const handleSave = async () => {
    const data = {
      message: "New Message", // You can customize this message
    };

    try {
      await addDoc(ref, data);
      console.log("Data saved to Firestore:", data);
    } catch (e) {
      console.error("Error adding document:", e);
    }
  };

  return (
    <>
      <div className="button-container">
        <button onClick={handleSave}>Save Page</button>
      </div>
      <div>
        <canvas ref={canvasRef} className="whiteboard" />
        <div ref={colorsRef} className="colors">
          <div className="color black" />
          <div className="color red" />
          <div className="color green" />
          <div className="color yellow" />
          <div className="color blue" />
        </div>
      </div>
    </>
  );
};

export default Board;
