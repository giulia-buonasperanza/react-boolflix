import { NavLink } from "react-router";
import useTheme from "../hooks/useTheme";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";


function Header() {
    const { resetHome } = useContext(GlobalContext);

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
                <div className="container">
                    <NavLink className="navbar-brand fw-semibold" to="/">MyApp</NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#mainNav"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="mainNav">
                        <ul className="navbar-nav ms-auto align-items-center">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/" onClick={resetHome}>
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">About</NavLink>
                            </li>
                            <li className="nav-item">
                                <Filters/>
                            </li>
                            <li className="nav-item ms-2">
                                <SearchBar />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
