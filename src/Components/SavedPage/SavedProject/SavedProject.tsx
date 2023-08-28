import { Project } from "../../../types"
import { Link } from "react-router-dom"
import './SavedProject.css'

const SavedProject = ({ project }: { project: Project }) => {
  const projectPaletteEls = project.attributes.colors.split("\n").map(color => {
    return (<div className='mini-palette-color' style={{backgroundColor: `${color}`}}></div>)
  })

  const wordsInDescription = project.attributes.description.split(' ')

  return (
    <Link to={`/saved/${project.id}`}>
      <section className='saved-project'>
        <section className='saved-project-details'>
          <h2 className='saved-project-title'>{project.attributes.name}</h2>
          <p className='saved-project-desciption'>{wordsInDescription.length > 5 ? `${wordsInDescription.slice(0, 5 - wordsInDescription.length).join(' ')}...` : project.attributes.description }</p>
        </section>
        <section className='saved-mini-palette'>
          {projectPaletteEls}
        </section>
      </section>
    </Link>
  )
}

export default SavedProject