import './SavedPage.css'
import { useEffect } from 'react'
import { Project } from '../../Types/types'
import SavedProject from './SavedProject/SavedProject'

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
        {savedProjectEls}
      </section>
    </section>
  )
}

export default SavedPage 