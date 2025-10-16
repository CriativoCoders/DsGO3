import logo from '../assets/logo.jpg';
import { useNavigate } from 'react-router-dom';

export function Inicial() {
    const navigate =useNavigate();

  return (
    <main className="inicial">
      <img src={logo} className="logo" alt="Logo DS GO"  />
     
      <button onClick={() => navigate('/dsgo')} className='entrar'>
        Entrar
      </button>
    </main>
  );
}
