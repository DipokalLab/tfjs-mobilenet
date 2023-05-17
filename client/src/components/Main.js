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
        return <PredictAccuracyItem name={item.className} probability={item.probability}></PredictAccuracyItem>
    })

    return (
        <header className="bg-white h-100">
            <FileUpload image={imageRef} predict={predict}></FileUpload>
            <img 
                src="/public/dog.jpg"
                ref={imageRef}
                width="224" 
            ></img>
            {predictionsMap}
        </header>
    );
}

function PredictAccuracyItem({ name, probability }) {
    return (
        <div class="bg-light p-2 mb-1" role="alert">
            {name} <span class="material-symbols-outlined">chevron_right</span> {probability.toFixed(4)}% 일치율
        </div>
    )
}

function FileUpload({ image, predict }) {
    const [file, setFile] = useState()

    const handleFileChange = (e) => {
        if (!e.target.files) {
            return 0
        }

        const uploadFile = e.target.files[0]

        setFile(uploadFile)
        changeFile(uploadFile)
    }

    const changeFile = (uploadFile) => {
        const fileUrl = fileToUrl(uploadFile)
        image.current.src = fileUrl
        sendToPredict()
    }

    const fileToUrl = (targetFile) => {
        const url = URL.createObjectURL(targetFile)
        return url
    }

    const sendToPredict = () => {
        predict()
        dds.toast({
            content: '파일 업로드 성공'
        })
    }

    return (
        <div class="mb-3">
            <label for="formFile" class="form-label">예측할 파일 업로드</label>
            <input class="form-control" type="file" id="formFile" onChange={handleFileChange} />
        </div>
    )
}

  
export default Main;