import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Form from './Components/Form/Form';
import Results from './Components/Results/Results';


// HomePage will be displayed, when generate new plan is selected, the form will appear, when the form is completed, there will be loading, then the results will appear, 

// should I make a fake 

// should results be a new locatation? ex. "/results"

const App = () => {
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
    <main>
      <h1>Project Planner</h1>
      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/new'>New Project</NavLink>
        <NavLink to='/saved'>Saved Projects</NavLink>
      </nav>
      <Routes>
        <Route path='/new' element={<Form />} ></Route>
        <Route path='/results' element={<Results obj={obj}/>} />
      </Routes>
    </main>
  );
}

export default App;
