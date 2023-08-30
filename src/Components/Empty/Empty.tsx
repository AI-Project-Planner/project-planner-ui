import { Link } from "react-router-dom"

const Empty = () => {
  return (
    <section>
      <h1>Oops! There's nothing to see here!</h1>
      <Link to='/'>Take Me Back!</Link>
    </section>
  )
}

export default Empty 