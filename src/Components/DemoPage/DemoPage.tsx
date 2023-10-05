import React from 'react'
import projectPlanner from '../../images/project-planner.png';
import './DemoPage.css';
import user1 from '../../images/person1.png'
import user2 from '../../images/person2.png'
import user3 from '../../images/person3.png'

const DemoPage = () => {
  return (
      <section className='demo-page'>
        <section className='demo-title'>
            <h1 className='welcome-title'>Welcome to the</h1>
            <img src={projectPlanner} className='demo-img' alt='project planner text' />
        </section> 
        <h2>Choose an account to demo</h2>
        <section className='demo-users'>
            <button className='user-button'><img src={user1} /></button>
            <button className='user-button'><img src={user2} /></button>
            <button className='user-button'><img src={user3} /></button>
        </section>
      </section>
  )
}

export default DemoPage