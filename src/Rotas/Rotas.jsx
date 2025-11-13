
import { Routes, Route } from "react-router-dom";
import { Inicial } from "../Paginas/Inicial";
import { DSGo } from "../Paginas/DSGo";
import { Missao} from "../Paginas/Missao";
import { Camera } from "../Components/Camera";
// import { Galeria } from "../Componentes/Galeria";
import { Inventario } from "../Paginas/Inventario";
import { Galeria } from "../Components/Galeria";
export function Rotas() {
    return (
        <Routes>
            <Route path="/" element={<Inicial />} />
            <Route path="/dsgo" element={<DSGo />} >  
                <Route index element ={<DSGo/>}/>
                <Route path="missao" element={<Missao />} /> 
                <Route path="camera" element={<Camera />} />
                {/* <Route path="galeria" element={<Galeria />} /> */}
                <Route path="inventario" element={<Inventario />} />
                <Route path="galeria" element={<Galeria />} />            
            </Route>   
        </Routes>
    );
}   