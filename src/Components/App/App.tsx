import './App.css';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar'
import Menu from '../Menu/Menu';
import Home from '../HomePage/HomePage';
import logo from '../../images/logo.png';
import Results from '../Results/Results';
import { PostData } from '../../Types/ResultsTypes';
import { constants } from 'buffer';
import { PostInfo } from '../../apiCalls';
import FormPage from '../FormPage/FormPage';
import { FormData } from '../../Types/FormPageTypes';

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);
  const [currentResult, setCurrentResult] = useState<null | PostData>(null);
  const [userFormData, setUserFormData] = useState<null | PostInfo>(null)
  const location = useLocation().pathname
  const changeScreenSize = () => window.innerWidth < 1170 ? setSmallScreen(true) : setSmallScreen(false);
  const openOrCloseMenu = () => setMenuOpen(prev => !prev);

  const updateCurrentResult = (result: PostData) => {
    setCurrentResult(result)
  }

  const updateFormData = (formData: FormData) => {
    setUserFormData(formData)
  }

  useEffect(() => {
    changeScreenSize()
    window.addEventListener('resize', changeScreenSize)
    return () => window.removeEventListener('resize', changeScreenSize)
  }, []);

  useEffect(() => {
    const ombreBackLocaion = location === '/' || location === '/form'
    ombreBackLocaion && !menuOpen && smallScreen
      ? document.querySelector('body')?.classList.add('ombre')
      : document.querySelector('body')?.classList.remove('ombre')
  }, [smallScreen, menuOpen, location])

  

  return (
    <div className='app'>
      {menuOpen ? <Menu openOrCloseMenu={openOrCloseMenu} /> :
        <>
          <header className='app-header'>
            <Link className='app-logo' to='/'><img src={logo} alt='project planner ai generator logo and home page button'/></Link>
            <NavBar smallScreen={smallScreen} openOrCloseMenu={openOrCloseMenu} />
          </header>
          <main className={location === '/form' ? 'form-height' : ''}>
            <Routes>
              <Route path='/' element={<Home smallScreen={smallScreen} />} />
              <Route path='/results' element={<Results currentResult={currentResult} updateCurrentResult={updateCurrentResult} formData={userFormData}/>} />
              <Route path='form' element={<FormPage updateCurrentResult={ updateCurrentResult} updateFormData={updateFormData}/>} />
            </Routes>
          </main>
        </>
      }
    </div>
  );
}

export default App;
