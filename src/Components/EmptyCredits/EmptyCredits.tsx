import React from 'react';
import sticker from '../../images/feed-your-ideas.png';
import './EmptyCredits.css'
import { Link } from 'react-router-dom';
import arrow from '../../images/arrow_forward_FILL0_wght400_GRAD0_opsz24.png'

const EmptyCredits = () => {
  return (
    <div className='credits-page'>
      <h1 className='homepage-title'>Oh No!</h1>
      <p>We've run out of credits for the OpenAI API</p>
      <p>Visit our all projects page to see all of the previously generated projects!</p>
      <Link to='/history' className='credits-btn'>Go to All Projects <img src={arrow} alt='arrow button'/></Link>
      <img src={sticker} className='sticker' alt='book that says feed your ideas'/>
    </div>
  )
}

export default EmptyCredits

