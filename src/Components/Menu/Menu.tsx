import { Link } from "react-router-dom";
import close from '../../images/close.png';
import "./Menu.css"

interface MenuProps {
  openOrCloseMenu: () => void
}

const Menu = ({ openOrCloseMenu }: MenuProps) => {
  return (
    <nav className='menu-nav'>
      <button className='clear-bg-btn' onClick={openOrCloseMenu}><img src={close} alt='menu button' /></button>
      <Link className='menu-link' to='/'><button className='clear-bg-btn' onClick={openOrCloseMenu}>Home</button></Link>
      <Link className='menu-link' to='/form'><button className='clear-bg-btn' onClick={openOrCloseMenu}>New Project</button></Link>
      <Link className='menu-link' to='/saved'><button className='clear-bg-btn' onClick={openOrCloseMenu}>Saved Projects</button></Link>
    </nav>
  )
}

export default Menu