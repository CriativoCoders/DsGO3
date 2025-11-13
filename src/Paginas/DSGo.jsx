import { Outlet } from 'react-router-dom';
import { Menu } from '../Components/Menu';

export function DSGo(){
    return(
        <main className="corpo">
            <Outlet/>
            <Menu/>            
        </main>

    )
}