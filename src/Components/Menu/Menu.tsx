import { Link } from "react-router-dom";
import close from '../../images/close.png';
import "./Menu.css"

interface MenuProps {
  openOrCloseMenu: () => void
}

const Menu = ({ openOrCloseMenu }: MenuProps) => {
  return (
    <nav className='menu-nav'>
      <button onClick={openOrCloseMenu}><img src={close} alt='menu button' /></button>
      <Link className='menu-link' to='/'>Home</Link>
      <Link className='menu-link' to='/form'>New Project</Link>
      <Link className='menu-link' to='/saved'>Saved Projects</Link>
    </nav>
  )
}

export default Menu