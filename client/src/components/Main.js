import React, { useState, useEffect, useRef } from "react";
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';



function Main() {
    const [predictAccuracy, setAccuracy] = useState([])
    const imageRef = useRef()

    useEffect(() => {
        predict()
    }, [])

    const predict = async () => {
        const img = imageRef.current
        const model = await mobilenet.load();
        const predictions = await model.classify(img);
        
        setAccuracy(predictions)
    }

    const predictionsMap = predictAccuracy.map((item) => {
        return `${item.className} ${item.probability}`
    })

    return (
        <header className="bg-white h-100">
            <img 
                src="/public/dog.jpg"
                ref={imageRef}
                width="224" 
                height="224"
            ></img>
            {predictionsMap}
        </header>
    );
}

  
export default Main;