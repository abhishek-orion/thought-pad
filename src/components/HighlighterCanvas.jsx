import React, { useRef, useEffect, useState } from 'react';

function HighlighterCanvas (props)  {

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
    context.scale(2,2)
    context.lineCap = "round"
    context.strokeStyle = props.color
    context.lineWidth = '5'   //highlighter size of 5px
    context.globalAlpha = 0.5;
    contextRef.current = context;
  }, [])

  useEffect(()=> {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.strokeStyle = props.color;
    contextRef.current = context;
  }, [props.color])

  const startDrawing = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.clearRect(0,0, window.innerWidth * 2,window.innerHeight * 2);
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
      <div style={{position: 'relative', opacity: '0.5', zIndex: 10}}>
    <canvas
    id='highlighterCanvas'
    onMouseDown={startDrawing}
    onMouseUp={finishDrawing}
    onMouseMove={draw}
    ref={canvasRef}
  />
  </div>
  )

}
export default HighlighterCanvas;