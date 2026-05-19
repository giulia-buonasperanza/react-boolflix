import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import styles from "./Header.module.css";


function Header() {
    const { resetHome } = useContext(GlobalContext);

    return (
        <header className={styles.header}>
            <div className={styles.logoArea}>
                <NavLink to="/" onClick={resetHome}>
                    BOOLFLIX
                </NavLink>
            </div>

            <nav className={styles.nav}>
                <Filters />
                <SearchBar />
                <div>
                    <img src="/image/profileImg.png" alt="Profile" className={styles.profileImg} />
                </div>
            </nav>
        </header>
    );
}

export default Header;
