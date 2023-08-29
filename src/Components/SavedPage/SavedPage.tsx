import './SavedPage.css'
import { useEffect } from 'react'
import { Project } from '../../types'
import { apiCall } from '../../apiCalls'
import SavedProject from './SavedProject/SavedProject'

interface SavedPageProps {
  allProjects: Project[]
  savedProjects: Project[]
  updateSavedProjects: (projects: Project[]) => void
  requestAllProjects: () => void
  setAppError: React.Dispatch<React.SetStateAction<Error | null>>
}

const SavedPage = ({allProjects, savedProjects, updateSavedProjects, requestAllProjects, setAppError}: SavedPageProps) => {
  useEffect(() => {
    if (allProjects) {
      updateSavedProjects(allProjects)
    }
  }, [allProjects])

  const handleSave = async (project: Project) => {
    const newProject = project 
    newProject.attributes.saved = !newProject.attributes.saved
    const patchSaved = apiCall(project.attributes.user_id, `projects/${project.id}`, {
      method: 'PATCH', 
      body: JSON.stringify(newProject),
      headers: {
        "Content-Type": "application/json"
      }
    })
    try {
      try {
        patchSaved()
        requestAllProjects()
      } catch (error) {
        if (error instanceof Error) setAppError(error)
      }
    } catch (error) {
      
    }
  }
  const saveButtons = allProjects.map(project => <button onClick={() => handleSave(project)} key={project.id}>{project.attributes.saved ? 'unsave' : 'save'} {project.attributes.name} {project.id}</button>)

  const savedProjectEls = savedProjects.map(project => <SavedProject key={project.id} project={project} />)
  return (
    <section className='saved-page'>
      <h1 className='saved-page-title'>Saved Projects</h1>
      <section className='saved-projects-container'>
        {savedProjectEls}
      </section>
      {saveButtons}
    </section>
  )
}

export default SavedPage 