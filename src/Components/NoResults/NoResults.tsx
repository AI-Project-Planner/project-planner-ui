import { Link} from 'react-router-dom'
import './NoResults.css'

const NoResults = () => {
  return (
    <section className="no-results-container">
      <h2>Just like the void of space, there's nothing to see here!</h2>
      <Link to='/form'>To Form</Link>
    </section>
  )
}

export default NoResults