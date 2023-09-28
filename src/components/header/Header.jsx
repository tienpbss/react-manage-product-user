import { Link } from "react-router-dom";

function Header() {
    return (
        <>
            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                <h5 className="my-0 mr-md-auto font-weight-normal">
                    Vue Mini Project
                </h5>
                <nav className="my-2 my-md-0 mr-md-3">
                    <Link className="p-2 text-dark" to="/product">
                        Product management
                    </Link>
                    <Link className="p-2 text-dark" to="/user">
                        User management
                    </Link>
                </nav>
                <Link className="btn btn-outline-primary" to="cart">
                    Administrator
                </Link>
            </div>
        </>
    );
}

export default Header;
