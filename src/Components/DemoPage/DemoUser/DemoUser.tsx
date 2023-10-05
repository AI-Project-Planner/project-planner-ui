type DemoUserProps = {
  user: string,
  userID: string,
  logIn: (userID: string) => void
}

const DemoUser = ({ user, userID, logIn }: DemoUserProps) => {
  return <img aria-label='button' tabIndex={0} onClick={() => logIn(userID)} className='user-button' src={user} />
}

export default DemoUser