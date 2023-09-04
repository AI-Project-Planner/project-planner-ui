import React, { useEffect } from 'react';
import { Project } from '../../Types/types';
import SavedProject from '../SavedPage/SavedProject/SavedProject';

interface ProjectsAllProps {
  allProjects: Project[],
  getAllProjects: () => Promise<Project[]>
  updateAllProjects: (projects: Project[]) => void
}

const ProjectsAll: React.FC<ProjectsAllProps> = ({updateAllProjects, getAllProjects, allProjects}) => {

  useEffect(() => {
    getAllProjects().then(data => {
      updateAllProjects(data)
    })
  }, [])
  
  const allProjectEls = allProjects.map(project => <SavedProject key={project.id} project={project} />)

  return (
    <section className='history-page'>
      <h1 className='saved-page-title'>Generated Projects History</h1>
      <section className='saved-projects-container'>
        {allProjects.length > 0 ? allProjectEls : <p>Error Loading Project History</p>}
      </section>
    </section>
  )
}

export default ProjectsAll