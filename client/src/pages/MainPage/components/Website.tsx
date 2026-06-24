import { Link } from 'react-router'
import '../../../styles/App.css'
import imgUrl from 'D:\\my-app\\client\\src\\assets\\logo.png'
import { useAuthRedirect } from '../../../hooks/useAuthRedirect'


export default function Website() {
    const {redirectIfLogined} = useAuthRedirect()

    return (
        <div className='main-page'>
            <img src={imgUrl} alt="" className="main-page-img" />
            <div className="main-page-information">
                <p className="main-page-title">Expense <br /> Manager</p>
                <div className="main-page-auth">
                    <Link
                        onClick={redirectIfLogined}
                        to={'/login'}
                        className="main-page-login links"
                    >Login</Link>

                    <span>|</span>

                    <Link
                        onClick={redirectIfLogined}
                        to={'/register'}
                        className="main-page-register links"
                    >Register</Link>
                </div>
            </div>
        </div>
    )
}
