import './App.css';
import { Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import Menu from '../Menu/Menu';
import HomePage from '../HomePage/HomePage';
import SavedPage from '../SavedPage/SavedPage';
import logo from '../../images/logo.png';
import { Project } from '../../Types/types';
import Results from '../Results/Results';
import { apiCall } from '../../apiCalls';
import FormPage from '../FormPage/FormPage';
import { FormData } from '../../Types/FormPageTypes';
import SingleProject from '../SingleProject/SingleProject';
import Empty from '../Empty/Empty';
import NoResults from '../NoResults/NoResults';
import Tutorial from '../Tutorial/Tutorial';
import ProjectsAll from '../ProjectsAll/ProjectsAll';
import React from 'react';
import DemoPage from '../DemoPage/DemoPage';

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [savedProjects, setSavedProjects] = useState<Project[]>([]);
  const [appError, setAppError] = useState<Error | null>(null);
  const [requestNeeded, setRequestNeeded] = useState(false);
  const [currentResult, setCurrentResult] = useState<null | Project>(null);
  const [userFormData, setUserFormData] = useState<null | FormData>(null);
  const [user, setUser] = useState<string>('');
  const navigate = useNavigate()

  const location = useLocation().pathname;
  const changeScreenSize = () => (window.innerWidth < 1300 ? setSmallScreen(true) : setSmallScreen(false));
  const openOrCloseMenu = () => setMenuOpen((prev) => !prev);
  const getAllProjects: () => Promise<Project[]> = apiCall(1, 'projects', {});
  const updateSavedProjects = (projects: Project[]) => setSavedProjects(projects.filter((project) => project.attributes.saved));
  const requestAllProjects = () => setRequestNeeded((prev) => !prev);

  const logIn = (userID: string) => {
    setUser(userID);
  }

  const logOut = () => {
    setUser('');
    navigate('/');
  }

  const updateAllProjects = (projects: Project[]) => {
    setAllProjects(projects);
  };

  const apiRequestProjects = async () => {
    try {
      setAllProjects(await getAllProjects());
    } catch (error) {
      if (error instanceof Error) setAppError(error);
    }
  };

  const updateCurrentResult = (result: Project) => {
    setCurrentResult(result);
  };

  const updateFormData = (formData: FormData) => {
    setUserFormData(formData);
  };

  useEffect(() => {
    apiRequestProjects();
    
    return () => setAppError(null);
  }, [requestNeeded]);

  useEffect(() => {
    if (allProjects) {
      updateSavedProjects(allProjects);
    }
  }, [allProjects]);

  useEffect(() => {
    changeScreenSize();
    window.addEventListener('resize', changeScreenSize);

    return () => window.removeEventListener('resize', changeScreenSize);
  }, []);

  useEffect(() => {
    const ombreBackLocaion = location === '/' || location === '/form' || location === '/tutorial';
    ombreBackLocaion && !menuOpen && smallScreen ? document.querySelector('body')?.classList.add('ombre') : document.querySelector('body')?.classList.remove('ombre');
  }, [smallScreen, menuOpen, location]);

  return (
    <div className='app'>
      {menuOpen ? (
        <Menu logOut={logOut} openOrCloseMenu={openOrCloseMenu} />
      ) : (
        <>
          <header className='app-header'>
            <Link className='app-logo' to='/'>
              <img src={logo} alt='project planner ai generator logo and home page button' />
            </Link>
              {user && <NavBar logOut={logOut} smallScreen={smallScreen} openOrCloseMenu={openOrCloseMenu} />}
          </header>
          <main className={location === '/form' ? 'form-height' : ''}>
            {appError && <p className='app-error'>An error occured, please try again later!</p>}
            <Routes>
              <Route path='/' element={user ? <HomePage smallScreen={smallScreen} /> : <DemoPage logIn={logIn} />} />
              <Route path='/tutorial' element={<Tutorial smallScreen={smallScreen} />} />
              <Route path='/history' element={user ? <ProjectsAll updateAllProjects={updateAllProjects} getAllProjects={getAllProjects} allProjects={allProjects} /> : <DemoPage logIn={logIn} />} />
              <Route path='/history/:projectID' element={user ? <SingleProject getAllProjects={getAllProjects} allProjects={allProjects} requestAllProjects={requestAllProjects} setAppError={setAppError} /> : <DemoPage logIn={logIn} />} />
              <Route path='/form' element={user ? <FormPage setAppError={setAppError} updateCurrentResult={updateCurrentResult} updateFormData={updateFormData} /> : <DemoPage logIn={logIn} />} />
              <Route path='/results' element={currentResult ? <Results currentResult={currentResult} updateCurrentResult={updateCurrentResult} formData={userFormData} requestAllProjects={requestAllProjects} setAppError={setAppError} /> : <NoResults />} />
              <Route path='/saved' element={user ? <SavedPage getAllProjects={getAllProjects} updateAllProjects={updateAllProjects} allProjects={allProjects} savedProjects={savedProjects} updateSavedProjects={updateSavedProjects} /> : <DemoPage logIn={logIn} />} />
              <Route path='/saved/:projectID' element={user ? <SingleProject getAllProjects={getAllProjects} allProjects={allProjects} requestAllProjects={requestAllProjects} setAppError={setAppError} /> : <DemoPage logIn={logIn} />} />
              {['*', '/form/*', '/results/*'].map((path) => (
                <Route key={path} path={path} element={<Empty />} />
              ))}
            </Routes>
          </main>
        </>
      )}
    </div>
  );
};

export default App;
