// Dependencies
import { useLocation, useNavigate } from "react-router-dom";

// CSS
import './Navbar.css';

//Images
import contactLogo from "../assets/contactLogo.webp"

const Navbar = () => {
    const navigate = useNavigate();
    const loc = useLocation();

    const Logout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    return (
        <div className="Navbar">
            <div className="Navbar-Logo-div">
                <img
                    src={contactLogo}
                    alt="Company Logo"
                    className="Navbar-Logo"
                />
                <h2 className="Navbar-Logo-title">Contact Book</h2>
            </div>
            <div className="Navbar-items">
                {loc.pathname === "/archive" ? (
                    <button onClick={() => { navigate('/home'); }}>Contacts</button>
                ) : (
                    <button onClick={() => { navigate('/archive'); }}>Archive</button>
                )}
                <button onClick={Logout}>Logout</button>
            </div>
        </div>
    );
};

export default Navbar;