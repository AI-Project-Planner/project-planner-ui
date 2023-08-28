import './App.css';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar'
import Menu from '../Menu/Menu';
import HomePage from '../HomePage/HomePage';
import SavedPage from '../SavedPage/SavedPage';
import logo from '../../images/logo.png';
import { apiCall } from '../../apiCalls';
import { Project } from '../../types';


const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [savedProjects, setSavedProjects] = useState<Project[]>([]);
  const [appError, setAppError] = useState<Error | null>(null)

  const location = useLocation().pathname
  const changeScreenSize = () => window.innerWidth < 1170 ? setSmallScreen(true) : setSmallScreen(false);
  const openOrCloseMenu = () => setMenuOpen(prev => !prev);
  const getAllProjects: () => Promise<Project[]> = apiCall('1', 'projects', {});
  const updateSavedProjects = (projects: Project[]) => setSavedProjects(projects.filter(project => project.attributes.saved === 'true'));

  useEffect(() => {
    changeScreenSize()
    window.addEventListener('resize', changeScreenSize)

    const apiCall = async () => {
      try {
        setAllProjects(await getAllProjects())
      } catch (error) {
        if (error instanceof Error) setAppError(error)
      }
    }

    apiCall()

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
          <main>
            <Routes>
              <Route path='/' element={<HomePage smallScreen={smallScreen} />} />
              <Route path='/saved' element={<SavedPage allProjects={allProjects} savedProjects={savedProjects} updateSavedProjects={updateSavedProjects} />} />
            </Routes>
          </main>
        </>
      }
    </div>
  );
}

export default App;
