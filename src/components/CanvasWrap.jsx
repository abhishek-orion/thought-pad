import React, { useRef, useEffect, useState } from 'react';

function CanvasWrap (props)  {
    const  canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(props.isDrawing);



  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d")
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.scale(2,2)
    context.lineCap = "round"
    context.strokeStyle = "black"
    context.lineWidth = 1
    contextRef.current = context;
  }, [])

  useEffect(()=> {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.lineWidth = props.size
    context.strokeStyle = props.color
    contextRef.current = context;
  }, [props.size, props.color])

  const startDrawing = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const finishDrawing = () => {
   contextRef.current.closePath()
   setIsDrawing(false)
  }  

  const draw = ({nativeEvent}) => {
    if(!isDrawing){
      return
    }
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke();
  }

  return (
      <div style={{position: 'fixed'}}>
    <canvas
    id='mainCanvas'
    onMouseDown={startDrawing}
    onMouseUp={finishDrawing}
    onMouseMove={draw}
    ref={canvasRef}
  />
  </div>
  )

}
export default CanvasWrap;