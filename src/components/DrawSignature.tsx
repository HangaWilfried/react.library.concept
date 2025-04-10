import React, { useRef, useState } from 'react';

interface DrawSignatureProps {
    onSave: (imageData: Blob) => void;
}

const DrawSignature: React.FC<DrawSignatureProps> = ({ onSave }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        context.beginPath();
        context.moveTo(
            event.nativeEvent.offsetX,
            event.nativeEvent.offsetY
        );
        setIsDrawing(true);
    };

    const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        context.lineTo(
            event.nativeEvent.offsetX,
            event.nativeEvent.offsetY
        );
        context.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const saveSignature = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.toBlob((blob) => {
            if (blob) onSave(blob);
        }, 'image/png');
    };

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={500}
                height={300}
                style={{
                    border: '1px solid #000',
                    cursor: 'crosshair',
                }}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            />
            <div style={{ marginTop: '10px' }}>
                <button onClick={clearCanvas}>Clear</button>
                <button onClick={saveSignature}>Save</button>
            </div>
        </div>
    );
};
export default DrawSignature;