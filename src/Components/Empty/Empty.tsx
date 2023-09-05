import { Link } from 'react-router-dom';
import sadCoder from '../../images/coding.png';
import './Empty.css';

const Empty = () => {
  return (
    <section className='empty-page'>
      <h1>Oops! There's nothing to see here!</h1>
      <img src={sadCoder} alt='person looking at a computer screen with a confused face' />
      <Link to='/'>Take Me Back!</Link>
    </section>
  );
};

export default Empty;
