import { NavLink } from "react-router-dom"
import menu from '../../images/menu.png'

interface NavBarProps {
  smallScreen: boolean, 
  openOrCloseMenu: () => void
}

const NavBar = ({ smallScreen, openOrCloseMenu }: NavBarProps) => {
  
  return (
    <nav className='navBar'>
      {smallScreen ? <button onClick={openOrCloseMenu}><img src={menu} alt='menu button' /></button> :
        <>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/form'>New Project</NavLink>
          <NavLink to='/saved'>Saved Projects</NavLink>
        </>
    }
    </nav>
  )
}

export default NavBar