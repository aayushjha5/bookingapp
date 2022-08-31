import { useNavigate } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext';
import { useContext } from "react";
import "./navbar.css"


const Navbar = () => {

  const navigate = useNavigate();
  const logoButtonAction = () => {
    navigate("/");
}

const {  user } = useContext(AuthContext);

  return (
    <div className="navbar">
        <div className="navContainer">
            <span className="logo" onClick={logoButtonAction}>SARAY!</span>
            {/* login and register buttons */}
            { user ? user.username : <div className="navItems">
                <button className="navButtonProperty">List your property</button>
                <button className="navButton">Register</button>
                <button className="navButton">Sign in</button>
            </div>}
        </div>
    </div>
  )
}

export default Navbar