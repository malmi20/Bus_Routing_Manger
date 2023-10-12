import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { NavDropdown } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { database } from "../util/FirebaseConfig";
import { AppContext } from "../../context/AuthContext";
import logo from "../../assets/school-bus-1759.svg"

const Navbar = ({ hamActive, setHamActive }) => {
  const { handleSignOut, isAuthenticated } = useContext(AppContext);

  const location = useLocation();
  const { pathname } = location;
  const handleClick = () => {
    setHamActive(!hamActive);
  };

  const handleSignOutFunc = async () => {
    await signOut(database);
    handleSignOut();
  };

  return (
    <nav className={`${styles.navbarWrapper} center shadow-sm`}>
      <button
        className={`${styles.hamburger} ${hamActive && styles.active}`}
        onClick={handleClick}
      >
        <span className={styles.hamburgerLines}></span>
      </button>
      <Link to={"/"} className={`${styles.navLeft}`}>
        <img src={logo} alt="logo" width={100} height={100} className={styles.brand} />
      </Link>
      <div className={`${styles.navRight} center`}>
        <div className="d-flex align-items-center">
          {isAuthenticated && (
          <div className={styles.navLinksWrapper}>
            <div className={styles.navLinksWrapper}>
              <Link to={"/routeManager"} className={`${styles.nav} center ${pathname === '/routeManager' && 'active'}`}>
                Route Manager
              </Link>
              <Link to={"/ticketingManger"} className={`${styles.nav} center ${pathname === '/ticketingManger' && 'active'}`}>
                Ticketing Manager
              </Link>
            </div>
            <div className={styles.verticalLine} />
          </div>
        )}
          <NavDropdown title="Profile" hidden={!isAuthenticated}>
            <NavDropdown.Item>
              <Link to={"/profile"} className={styles.login}>
                User profile
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <div onClick={handleSignOutFunc} className={styles.login}>
                Sign Out
              </div>
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
