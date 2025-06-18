import { useLayoutEffect, useState } from 'react';
import './App.css'

import rough from 'roughjs';

const App = () => {
    const [drawing, setDrawing] = useState(false);
    
    // Might need to move this outside

    useLayoutEffect( () => {
        const canvas = document.getElementById('canvas');
        if (canvas instanceof HTMLCanvasElement) {
            const ctx = canvas.getContext('2d');

            // Clear the canvas
            ctx?.clearRect(0,0,canvas.width, canvas.height);

            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;

            const roughCanvas = rough.canvas(canvas);
            roughCanvas.rectangle(10,10,150,150);
        }
    }, [])


    const handleMouseDown = () => {
        setDrawing(true);
    };
    
    const handleMouseUp = () => {
        setDrawing(false);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (!drawing) {
            return;
        }

        const {clientX, clientY} = event;
        console.log(clientX, clientY);
    };

    return (
        <canvas 
            id="canvas" 
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        ></canvas>
    )
}

export default App;