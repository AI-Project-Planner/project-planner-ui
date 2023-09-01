import { Link } from 'react-router-dom'
import light from '../../images/lightbulb.png'
import './HomePage.css';
import homepageLogo from '../../images/drawing.png';
import projectPlanner from '../../images/project-planner.png';

const HomePage = ({ smallScreen }: { smallScreen: boolean }) => {
  return (
    <section className='home'>
      <section className='light-section'>
        <img className='light' src={homepageLogo} alt='notepad with lightbulb logo for app'/>
        {!smallScreen && <h1 className='homepage-title'>Welcome to the</h1>}
        <img src={projectPlanner} className='title-img' alt='project planner text' />
      </section>
      <section className='popup'>
        {smallScreen && <h1 className='homepage-title'>Welcome to Project Planner</h1>}
        <section className='popup-buttons-container'>
          <button className='popup-button' >View Tutorial</button>
          <Link className='popup-button' to='/form'>Generate New Project Plan</Link>
        </section>
      </section>
    </section>
  )
}

export default HomePage