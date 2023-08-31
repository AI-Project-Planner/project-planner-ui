import './SavedPage.css'
import { useEffect } from 'react'
import { Project } from '../../Types/types'
import SavedProject from './SavedProject/SavedProject'
import { Link } from 'react-router-dom'

interface SavedPageProps {
  allProjects: Project[]
  savedProjects: Project[]
  updateSavedProjects: (projects: Project[]) => void
}

const SavedPage = ({allProjects, savedProjects, updateSavedProjects}: SavedPageProps) => {
  useEffect(() => {
    if (allProjects) {
      updateSavedProjects(allProjects)
    }
  }, [allProjects])

  const savedProjectEls = savedProjects.map(project => <SavedProject key={project.id} project={project} />)
  
  return (
    <section className='saved-page'>
      <h1 className='saved-page-title'>Saved Projects</h1>
      <section className='saved-projects-container'>
        {savedProjects.length
          ? savedProjectEls
          : <section className='empty-saved'>
            <p style={{fontWeight: 'bold', textAlign: 'center'}}>No saved projects yet! Generate a project and save it to view it here!</p>
            <Link to='/form'>Generate a new plan</Link>
            </section>
          }
      </section>
    </section>
  )
}

export default SavedPage 