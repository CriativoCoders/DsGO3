import { useState, useEffect } from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

export function Galeria() {
    const [fotos, setFotos] = useState([]);

    // Carrega fotos do localStorage
    useEffect(() => {
        const fotosSalvas = localStorage.getItem('fotosTiradas');
        if (fotosSalvas) {
            setFotos(JSON.parse(fotosSalvas));
        }
    }, []);

    // Função para deletar foto
    const deletarFoto = (id) => {
        const novasFotos = fotos.filter(foto => foto.id !== id);
        setFotos(novasFotos);
        localStorage.setItem('fotosTiradas', JSON.stringify(novasFotos));
    };

    // Função para deletar todas as fotos
    const deletarTodasFotos = () => {
        setFotos([]);
        localStorage.removeItem('fotosTiradas');
    };

    if (fotos.length === 0) {
        return (
            <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    height: '60vh',
                    textAlign: 'center',
                    padding: 3
                }}
            >
                <PhotoCameraIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h5" color="text.secondary" gutterBottom>
                    Galeria Vazia
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Tire algumas fotos usando a câmera para vê-las aqui!
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 3 }}>
            {/* Header da Galeria */}
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 3,
                flexWrap: 'wrap',
                gap: 2
            }}>
                <Typography variant="h4" component="h1">
                    Minha Galeria
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h6" color="primary">
                        {fotos.length} {fotos.length === 1 ? 'foto' : 'fotos'}
                    </Typography>
                    
                    <Button 
                        variant="outlined" 
                        color="error"
                        startIcon={<DeleteSweepIcon />}
                        onClick={deletarTodasFotos}
                        size="small"
                    >
                        Limpar Tudo
                    </Button>
                </Box>
            </Box>

            {/* Grid de Fotos */}
            <ImageList 
                sx={{ 
                    width: '100%', 
                    height: 'auto',
                    margin: 0
                }} 
                cols={3} 
                gap={8}
            >
                {fotos.map((foto) => (
                    <ImageListItem 
                        key={foto.id}
                        sx={{
                            borderRadius: 2,
                            overflow: 'hidden',
                            boxShadow: 3,
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'scale(1.02)',
                            }
                        }}
                    >
                        <img
                            srcSet={`${foto.src}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            src={`${foto.src}?w=248&fit=crop&auto=format`}
                            alt={`Foto ${foto.id}`}
                            loading="lazy"
                            style={{
                                width: '100%',
                                height: 200,
                                objectFit: 'cover'
                            }}
                        />
                        <ImageListItemBar
                            title={`Foto ${fotos.indexOf(foto) + 1}`}
                            subtitle={foto.data}
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'white' }}
                                    onClick={() => deletarFoto(foto.id)}
                                    size="small"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            }
                            sx={{
                                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
                            }}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>
    );
}