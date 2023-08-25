import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';
import NavBar from '../NavBar/NavBar'
import Menu from '../Menu/Menu';
import Home from '../Home/Home';
import logo from '../../assets/logo.png'


const App = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const openOrCloseMenu = () => setMenuOpen(prev => !prev)
  return (
    <div className='app'>
      <header className='app-header'>
        <Link to='/'><img src={logo} alt='project planner ai generator logo and home page button'/></Link>
        <NavBar/>
      </header>
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
