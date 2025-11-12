import { useState, useEffect, useRef } from "react";

export function Camera({ onFotoTirada }){
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [foto, setFoto] = useState(null);

    // useEffect para iniciar a camera quando o componente for montado
    useEffect(() =>{
        iniciarCamera();
    },[]);

    const iniciarCamera = async () => {
        try{
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if(videoRef.current){
                videoRef.current.srcObject = stream;
            }
        }
        catch(error){
            console.error("error ao iniciar a camera:", error);
        }
    };

    // função para tirar a foto
    const tirarFoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imagem = canvas.toDataURL("image/png");
        setFoto(imagem);
        
        // Chamar onFotoTirada SE ela foi passada como prop
        if (onFotoTirada) {
            onFotoTirada(imagem);
        }
    }

    const reiniciarCamera = () => {
        setFoto(null);
        iniciarCamera();
    }

    return(        <section className="camera-box">
            <h2>Captura da camera</h2>
            <div className="preview">
                {!foto ?(
                    <video ref={videoRef} autoPlay playsInline aria-label="Fluxo de camera" />
                ):
                (
                    <img src={foto} alt="Foto capturada" />
                )}
            </div>
            <div>
                {!foto ? (
                    <button onClick={tirarFoto}>Tirar Foto</button>
                ) : (
                    <button onClick={reiniciarCamera}>Nova Foto</button>
                )}
            </div>
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        </section>


    )
} 