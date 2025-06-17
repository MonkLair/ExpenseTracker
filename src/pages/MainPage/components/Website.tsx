import { Link } from 'react-router'
import '../../../styles/App.css'
import imgUrl from 'D:\\my-app\\src\\assets\\logo.png'

export default function Website() {
  return (
    <div className='main-page'>
        <img src={imgUrl} alt="" className="main-page-img" />
        <div className="main-page-information">
            <p className="main-page-title">Expense <br /> Manager</p>
            <div className="main-page-auth">
                <Link to={'/login'} className="main-page-login links">Login</Link> <span>|</span> <Link to={'/register'} className="main-page-register links">Register</Link>
            </div>
        </div>
    </div>
  )
}
