import { Link } from "react-router-dom"

interface MenuProps {
  openOrCloseMenu: () => void
}
const Menu = ({ openOrCloseMenu }: MenuProps) => {
  return (
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/form'>New Project</Link>
      <Link to='/saved'>Saved Projects</Link>
    </nav>
  )
}

export default Menu