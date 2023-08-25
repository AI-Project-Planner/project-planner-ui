import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar'
import Menu from '../Menu/Menu';
import Home from '../Home/Home';
import logo from '../../images/logo.png';


const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);
  const changeScreenSize = () => window.innerWidth < 1170 ? setSmallScreen(true) : setSmallScreen(false);
  const openOrCloseMenu = () => setMenuOpen(prev => !prev);
  
  useEffect(() => {
    changeScreenSize()
    window.addEventListener('resize', changeScreenSize)
    return () => window.removeEventListener('resize', changeScreenSize)
  }, []);
  
  return (
    <div className='app'>
      {menuOpen ? <Menu openOrCloseMenu={openOrCloseMenu} /> :
        <main>
          <header className='app-header'>
            <Link className='app-logo' to='/'><img src={logo} alt='project planner ai generator logo and home page button'/></Link>
            <NavBar smallScreen={smallScreen} openOrCloseMenu={openOrCloseMenu} />
          </header>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </main>
      }
    </div>
  );
}

export default App;
