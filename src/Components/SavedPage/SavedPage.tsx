import './SavedPage.css'
import { useEffect } from 'react'
import { Project } from '../../types'
import SavedProject from './SavedProject/SavedProject'

interface SavedPageProps {
  allProjects: Project[]
  savedProjects: Project[]
  updateSavedProjects: (projects: Project[]) => void
}

const SavedPage = ({allProjects, savedProjects, updateSavedProjects}: SavedPageProps) => {
  useEffect(() => {
    if (allProjects) {
      updateSavedProjects([...allProjects, {
        id: "2",
        type: "project",
        attributes: {
          name: "Makeup 360",
          steps: "Project Setup: Create Git repository and define project structure\nBackend Setup: Develop Express.js application, set up API routes\nDatabase Design: Design and implement database schema",
          description: "A beauty guru planning app.",
          features: "User registration and login\nCreate, assign, update, and track tasks\nReal-time collaboration and updates\nPriority-based task categorization",
          interactions: "User logs in to TaskMaster Pro account.\nDashboard displays tasks by priority: High, Medium, Low.\nUser adds a task, assigns it, and sets a due date.\nTask appears under the respective priority category.\nAssigned user starts task, status updates in real-time.\nUpon completion, task is marked as done and updates for all.",
          colors: "#E6BEAE\n#EEE4E1\n#DAA46E\n#716A63\n#F99770\n#6C3018",
          timeline: "weeks",
          saved: "true",
          user_id: "1"
        }
      }])
      console.log(savedProjects)
    }
  }, [allProjects])

  const savedProjectEls = savedProjects.map(project => <SavedProject key={project.id} project={project} />)
  return (
    <section className='saved-page'>
      <h1 className='saved-page-title'>Saved Projects</h1>
      <section className='saved-projects-container'>
        {savedProjectEls}
      </section>
    </section>
  )
}

export default SavedPage 