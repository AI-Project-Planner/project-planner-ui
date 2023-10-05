import { Link } from 'react-router-dom';
import close from '../../images/close.png';
import './Menu.css';

interface MenuProps {
  openOrCloseMenu: () => void;
  logOut: () => void;
}

const Menu = ({ openOrCloseMenu, logOut }: MenuProps) => {
  return (
    <nav className='menu-nav'>
      <button className='clear-bg-btn menu-close-btn' onClick={openOrCloseMenu}>
        <img src={close} alt='menu button' />
      </button>
      <Link className='menu-link' to='/'>
        <button className='clear-bg-btn' onClick={openOrCloseMenu}>
          Home
        </button>
      </Link>
      <Link className='menu-link' to='/form'>
        <button className='clear-bg-btn' onClick={openOrCloseMenu}>
          New Project
        </button>
      </Link>
      <Link className='menu-link' to='/saved'>
        <button className='clear-bg-btn' onClick={openOrCloseMenu}>
          Favorite Projects
        </button>
      </Link>
      <Link className='menu-link' to='/history'>
        <button className='clear-bg-btn' onClick={openOrCloseMenu}>
          All Projects
        </button>
      </Link>
      <button onClick={logOut} className='logout-btn menu-logout'>LOG OUT</button>
    </nav>
  );
};

export default Menu;
