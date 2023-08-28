import { Link } from 'react-router-dom'
import light from '../../images/lightbulb.png'
import './HomePage.css'

const HomePage = ({ smallScreen }: { smallScreen: boolean }) => {
  return (
    <section className='home'>
      <section className='light-section'>
        <img className='light' src={light} alt='lightbulb with leaves inside'/>
        {!smallScreen && <h1>Welcome to Project Planner</h1>}
      </section>
      <section className='popup'>
        {smallScreen && <h1>Welcome to Project Planner</h1>}
        <section className='popup-buttons-container'>
          <button className='popup-button' >View Tutorial</button>
          <Link className='popup-button' to='/form'>Generate New Project Plan</Link>
        </section>
      </section>
    </section>
  )
}

export default HomePage