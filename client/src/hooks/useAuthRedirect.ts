import { useNavigate } from "react-router"

export function useAuthRedirect() {
    const navigate = useNavigate()

    return {
        redirectIfLogined: (e: React.MouseEvent) => {
            if (localStorage.getItem('token')) {
                e.preventDefault()
                navigate('/dashboard/main')
            }
            return
        }
    }

}
