import { Link } from 'react-router-dom';
import emptySpace from '../../images/woman.png';
import './NoResults.css';
import React from 'react';

const NoResults = () => {
  return (
    <section className='no-results-container'>
      <img src={emptySpace} alt='person meditating in space'></img>
      <h2>Just like the void of space, there's nothing to see here!</h2>
      <Link to='/form'>To Form</Link>
    </section>
  );
};

export default NoResults;
