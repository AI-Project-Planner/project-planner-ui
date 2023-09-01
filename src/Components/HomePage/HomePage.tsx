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
       {!smallScreen && <img src={projectPlanner} className='title-img' alt='project planner text' />}
      </section>
      <section className='popup'>
        {smallScreen && <h1 className='homepage-title'> Welcome to Project Planner</h1>}
        <div className='project-info-container'>
          {!smallScreen && <p className='project-info'>
            An application designed to streamline the project planning process for developers by leveraging advanced AI technology to craft comprehensive project plans and generate innovative ideas!
          </p>}
        </div>
        <section className='popup-buttons-container'>
          <Link to='/tutorial' className='popup-button' >View Tutorial</Link>
          <Link className='popup-button' to='/form'>Generate New Project Plan</Link>
        </section>
      </section>
    </section>
  )
}

export default HomePage