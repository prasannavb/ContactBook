// Dependencies
import { useLocation, useNavigate } from "react-router-dom";

// CSS
import './Navbar.css';

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
                    src="https://cdn3d.iconscout.com/3d/premium/thumb/book-reading-schedule-3d-icon-download-in-png-blend-fbx-gltf-file-formats--study-learning-studying-school-and-education-pack-stationary-icons-7864745.png?f=webp"
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