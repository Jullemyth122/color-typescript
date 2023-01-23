import React, { useRef, useEffect } from 'react';

interface Props {
  imageSrc: string;
}

interface ColorInfo {
    r: number;
    g: number;
    b: number;
    a: number;
}

const ImageCanvas: React.FC<Props> = ({ imageSrc }) => {
    
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                canvas.width = 500;
                canvas.height = 500;
                // Draw an image on the canvas
                const img = new Image();
                img.src = './img/1.png';
                img.onload = () => {
                    ctx.drawImage(img, 0, 0, 500, 500);
                }

                // Add an event listener to detect the mouse movement
                canvas.addEventListener('mousemove', (event) => {
                    const rect = canvas.getBoundingClientRect();
                    const x = event.clientX - rect.left;
                    const y = event.clientY - rect.top;

                    // Use the getImageData() method to get the color of the pixel under the cursor
                    const imageData = ctx.getImageData(x, y, 1, 1);
                    const colorInfo: ColorInfo = {
                        r: imageData.data[0],
                        g: imageData.data[1],
                        b: imageData.data[2],
                        a: imageData.data[3],
                    };

                    // Log the color information to the console
                    console.log(colorInfo);
                });
            }
        }
    }, [canvasRef]);


    return(
        <>
            <canvas ref={canvasRef} />
        </>
    );
};

export default ImageCanvas;