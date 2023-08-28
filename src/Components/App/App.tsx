import './App.css';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar'
import Menu from '../Menu/Menu';
import Home from '../HomePage/HomePage';
import logo from '../../images/logo.png';
import Results from '../Results/Results';
import Form from '../Form/Form';


const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);
  const location = useLocation().pathname
  const changeScreenSize = () => window.innerWidth < 1170 ? setSmallScreen(true) : setSmallScreen(false);
  const openOrCloseMenu = () => setMenuOpen(prev => !prev);
  
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

  const mock = JSON.stringify({
    "id": "1",
    "type": "project",
    "attributes": {
      "name": "TaskMaster Pro",
      "steps": "Project Setup: Create Git repository and define project structure\nBackend Setup: Develop Express.js application, set up API routes\nDatabase Design: Design and implement database schema",
      "description": "TaskMaster Pro is an all-inclusive task management application designed to optimize team collaboration and productivity.",
      "features": "User registration and login\nCreate, assign, update, and track tasks\nReal-time collaboration and updates\nPriority-based task categorization",
      "interactions": "User logs in to TaskMaster Pro account.\nDashboard displays tasks by priority: High, Medium, Low.\nUser adds a task, assigns it, and sets a due date.\nTask appears under the respective priority category.\nAssigned user starts task, status updates in real-time.\nUpon completion, task is marked as done and updates for all.",
      "colors": "#3498DB\n#27AE60\n#F39C12\n#F0F3F4\n#333333\n#E74C3C",
      "saved": false,
      "timeline": "days",
      "user_id": "<USER_ID>"
    }
  })

  const obj:any = JSON.parse(mock)
  
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
              <Route path='/' element={<Home smallScreen={smallScreen} />} />
              <Route path='/new' element={<Form />} ></Route>
              <Route path='/results' element={<Results obj={obj}/>} />
            </Routes>
          </main>
        </>
      }
    </div>
  );
}

export default App;
