import { useState, useEffect, useRef } from "react";

export function Camera(){
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [fotoAtual, setFotoAtual] = useState(null);

    // useEffect para iniciar a camera quando o componente for montado
    useEffect(() =>{
        iniciarCamera();
        
        // Cleanup: para a câmera quando o componente desmontar
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    },[]);

    const iniciarCamera = async () => {
        try{
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    facingMode: 'environment' // Usa a câmera traseira se disponível
                } 
            });
            if(videoRef.current){
                videoRef.current.srcObject = stream;
            }
        }
        catch(error){
            console.error("Erro ao iniciar a camera:", error);
            alert("Não foi possível acessar a câmera. Verifique as permissões.");
        }
    };

    // função para tirar a foto
    const tirarFoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        
        if (!video || !canvas) {
            console.error("Elementos de vídeo ou canvas não encontrados");
            return;
        }

        const ctx = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Espelha a imagem para ficar mais natural (como um espelho)
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imagem = canvas.toDataURL("image/png");
        setFotoAtual(imagem);
        
        // SALVAR NO LOCALSTORAGE PARA A GALERIA
        const fotosExistentes = JSON.parse(localStorage.getItem('fotosTiradas') || '[]');
        const novaFoto = {
            id: Date.now(),
            src: imagem,
            data: new Date().toLocaleString('pt-BR')
        };
        const novasFotos = [...fotosExistentes, novaFoto];
        localStorage.setItem('fotosTiradas', JSON.stringify(novasFotos));
        
        console.log('Foto salva! Total de fotos:', novasFotos.length);
    }

    const reiniciarCamera = () => {
        setFotoAtual(null);
        iniciarCamera();
    }

    const baixarFoto = () => {
        if (!fotoAtual) return;
        
        const link = document.createElement('a');
        link.download = `foto-${Date.now()}.png`;
        link.href = fotoAtual;
        link.click();
    }

    return (
        <div className="camera-container">
            <section className="camera-box">
                <h2>📷 Captura da Câmera</h2>
                <div className="preview">
                    {!fotoAtual ? (
                        <video 
                            ref={videoRef} 
                            autoPlay 
                            playsInline 
                            aria-label="Fluxo da câmera"
                            style={{ transform: 'scaleX(-1)' }} // Espelho em tempo real
                        />
                    ) : (
                        <img src={fotoAtual} alt="Foto capturada" />
                    )}
                </div>
                
                <div className="camera-controls">
                    {!fotoAtual ? (
                        <button onClick={tirarFoto} className="btn-tirar-foto">
                            📸 Tirar Foto
                        </button>
                    ) : (
                        <div className="botoes-pos-foto">
                            <button onClick={reiniciarCamera} className="btn-nova-foto">
                                🔄 Nova Foto
                            </button>
                            <button onClick={baixarFoto} className="btn-baixar">
                                💾 Baixar Foto
                            </button>
                        </div>
                    )}
                </div>
                
                <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
            </section>

            {/* Mini preview da galeria */}
            <div className="mini-galeria-preview">
                <h3>📁 Fotos na Galeria: 
                    <span id="contador-fotos">
                        {JSON.parse(localStorage.getItem('fotosTiradas') || '[]').length}
                    </span>
                </h3>
                <p>As fotos são salvas automaticamente na galeria!</p>
            </div>
        </div>
    )
}