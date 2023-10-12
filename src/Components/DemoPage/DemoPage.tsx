import React from 'react'
import projectPlanner from '../../images/project-planner.png';
import './DemoPage.css';
import user1 from '../../images/person1.png'
import user2 from '../../images/person2.png'
import user3 from '../../images/person3.png'
import DemoUser from './DemoUser/DemoUser';
import Login from '../Login/Login';

type DemoPageProps = {
  logIn: (userID: string) => void
  setAppError: React.Dispatch<React.SetStateAction<Error | null>>
}

const DemoPage = ({ logIn, setAppError }: DemoPageProps) => {
  const userBtns = [{ img: user1, id: '1' }, { img: user2, id: '2' }, { img: user3, id: '3' }].map(user => <DemoUser key={user.id} user={user.img} userID={user.id} logIn={logIn} />)
  return (
    <section className='demo-page'>
      <section className='demo-title demo-text'>
          <h1 className='welcome-title'>Welcome to the</h1>
          <img src={projectPlanner} className='demo-img' alt='project planner text' />
      </section> 
      <h2 className='demo-text'>Choose an account to demo</h2>
      <section className='demo-users'>
        {userBtns}
      </section>
      <section className='divider'>
        <div className='divider-line'></div>
        <p style={{margin: '2%'}}>OR</p>
        <div className='divider-line'></div>
      </section>
      <div className='login-container'>
        <Login setAppError={setAppError} />
      </div>
    </section>
  )
}

export default DemoPage