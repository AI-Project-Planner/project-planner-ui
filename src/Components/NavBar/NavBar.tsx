import { NavLink } from 'react-router-dom';
import menu from '../../images/menu.png';
import './NavBar.css';

interface NavBarProps {
  smallScreen: boolean;
  openOrCloseMenu: () => void;
}

const NavBar = ({ smallScreen, openOrCloseMenu }: NavBarProps) => {
  return (
    <nav className='navBar'>
      {smallScreen ? (
        <button className='clear-bg-btn' onClick={openOrCloseMenu}>
          <img src={menu} alt='menu button' />
        </button>
      ) : (
        <>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/form'>New Project</NavLink>
          <NavLink to='/saved'>Favorite Projects</NavLink>
          <NavLink to='/history'>All Projects</NavLink>
        </>
      )}
    </nav>
  );
};

export default NavBar;
