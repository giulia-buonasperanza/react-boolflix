import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MainLayout() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="container flex-grow-1 my-4">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default MainLayout;