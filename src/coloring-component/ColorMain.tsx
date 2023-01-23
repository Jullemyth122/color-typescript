import React, { useContext, useEffect, useRef, useState } from 'react'
import { CreateColorContext, UseColor } from '../contexts/ColorContext';
import './color.scss'
import { ColorState } from './types3'

interface ColorInfo {
    r: number;
    g: number;
    b: number;
    a: number;
}

const ColorMain = () => {

    const { handleAddCollection,colorList } = UseColor();

    const [colorCollection,setColorCollection] = useState<ColorState>({
        items: [],
        selectedItem:null
    })

    const zoomRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isDisabled,setDisabled] = useState(true);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [imgCreated, setImgCreated] = useState<boolean>(false);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas && imgCreated) {
            const ctx = canvas.getContext('2d');

            if (ctx) {
                // Draw an image on the canvas
                const img = new Image();
                img.src = imgSrc as string;
                img.onload = () => {
                    img.width = 500
                    img.height = 500
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0,500,500);
                }
                if (isDisabled == false) {
                    canvas.addEventListener('click', handleMouseClick);
                    canvas.addEventListener('mousemove', handleMouseMove);
                }
                else {
                    canvas.removeEventListener('click',handleMouseClick);
                    canvas.removeEventListener('mousemove', handleMouseMove);
                }
                canvas.addEventListener("mouseleave",() => {
                    if (zoomRef.current) {
                        zoomRef.current.style.display = `none`;
                    }
                })
            }
        }
        return () => {
            canvasRef.current?.removeEventListener('click', handleMouseClick);
            canvasRef.current?.removeEventListener('mousemove', handleMouseMove);

        };
    }, [canvasRef,isDisabled, imgSrc, imgCreated,setColorCollection]);

    const handlingMouseCursor = (event:{
        clientX:number,
        clientY:number
    },
        canvas: HTMLCanvasElement | null,
        zoomRef: any,
        setColorCollection: any,
        func: string
    ) => {
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
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
                const {r,g,b,a} = colorInfo;
                if (func == "move") {
                    zoomRef.current.style.display = `flex`;
                    zoomRef.current.style.background = `rgb(${r},${g},${b})`;
                    zoomRef.current.style.top = `${y+25}px`;
                    zoomRef.current.style.left = `${x+25}px`;
                }
                else if (func == "click") {
                    setColorCollection((prevState: { items: any; }) => ({
                        ...prevState,
                        items:[...prevState.items,{
                            id:Date.now(),
                            colorhex:'',
                            colorHSL:'',
                            colorRGB:[r,g,b],
                            colorRGBA:[r,g,b,a],
                        }]
                    }))
                }
            }
        }
    }

    const handleMouseMove = (event: { clientX:number; clientY:number; }) => { 
        const canvas = canvasRef.current;
        if (zoomRef.current) {
           handlingMouseCursor(event,canvas,zoomRef,setColorCollection,"move");
        }
    }

    const handleMouseClick = (event: { clientX: number; clientY: number; }) => {
        const canvas = canvasRef.current;
        if (canvas) {
            // console.
            handlingMouseCursor(event,canvas,zoomRef,setColorCollection,"click");
        }
    };

    useEffect(() => {
        if(buttonRef.current){
            if(isDisabled){
                buttonRef.current.style.background = '#738a36';
            } 
            else {
                buttonRef.current.style.background = '#c0ee43';
            }
        }
    },[buttonRef,isDisabled])

    // File Managing
    const handleUploadButtonClick = () => {
        fileInputRef.current?.click();
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event: ProgressEvent<FileReader>) => {
                const imgSrc = URL.createObjectURL(file);
                setImgSrc(imgSrc);
                setImgCreated(true);
            };
            reader.readAsDataURL(file);
        }
    }
    
    
    function handleCollectionAdd(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        handleAddCollection(e,colorCollection)
        setColorCollection({items:[],selectedItem:null})
    }

    return (
        <div className='main-color'>
            <div className="color-section-creation">
                <div className="left-side">
                    <div className="creating-colors">
                        <div className="top-side">
                            <h4>
                                COLOR LIST
                            </h4>
                            <div className="list-colors">
                                {colorCollection.items.map((item,idx) => (
                                    <div key={idx} className="t" style={{background:`rgb(${item.colorRGB[0]},${item.colorRGB[1]},${item.colorRGB[2]})`}}>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lower-side">
                            <div className="addcollection">
                                <button ref={buttonRef} disabled={isDisabled} onClick={e => handleCollectionAdd(e)}> Add Collection </button>
                            </div>
                            <div className="collecting">
                                <button onClick={e => setDisabled(!isDisabled)}> 
                                    { isDisabled ? "Collect" : "Stop Collect"} Color 
                                </button>
                                <button onClick={handleUploadButtonClick}>Upload Image</button>
                                <input type="file" ref={fileInputRef} style={{display: 'none'}} onChange={handleFileChange} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-side">
                    <div className="imgDetector">
                        <div className="zoom" ref={zoomRef}></div>
                        <canvas ref={canvasRef} />
                    </div>
                </div>
            </div>
            <div className="color-selection-all-list">
                {colorList.map((elem,i) => {
                    return (
                        <div className="colorPosts" key={i}>
                            <div className="list-colors">
                                {elem.items.map((elem_,i_) => {
                                    return (
                                        <div className="t"
                                        style={{background:
                                            `rgb(${elem_.colorRGB[0]},${elem_.colorRGB[1]},${elem_.colorRGB[2]})`}}
                                        ></div>
                                    )
                                })}
                            </div>
                            <div className="post-footer">
                                <p>
                                    ID Collection: #{i}{Date.now()}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ColorMain