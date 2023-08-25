import { Link, NavLink } from "react-router-dom"

const NavBar = () => {
  return (
    <nav className='navBar'>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/form'>New Project</NavLink>
      <NavLink to='/saved'>Saved Projects</NavLink>
    </nav>
  )
}

export default NavBar