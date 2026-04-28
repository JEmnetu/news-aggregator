import Button from "react-bootstrap/Button"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const HomePage = () => {

    const { logout } = useAuth()
    let navigate = useNavigate()
    
    const handleLogout = () => {
        logout()
        navigate('/login')
    }
    return <>
        <div>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
        <h1>Home Page</h1>
    </>
}



export default HomePage