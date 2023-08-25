import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Menu from '../Menu/Menu'
import Home from '../Home/Home'

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const openOrCloseMenu = () => setMenuOpen(prev => !prev)
  return (
    <div className='app'>
      {menuOpen ? <Menu openOrCloseMenu={openOrCloseMenu} /> :
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </main>
      }
    </div>
  );
}

export default App;
