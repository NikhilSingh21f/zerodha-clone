import React from 'react';
import {Link} from "react-router-dom";

function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg bg-white border-bottom fixed-top"  style={{ padding: "12px 0" }}>
            <div class="container">
                <Link class="navbar-brand" to="/">
                    <img src="media/logo.svg" alt="logo" style={{width:"25%"}}/>
                </Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav ms-auto">
                        <Link class="nav-link mx-2" aria-current="page" to="/Signup">Signup</Link>
                        <Link className="nav-link mx-2" to="/About">About</Link>
                        <Link class="nav-link mx-2" to="/Product">Product</Link>
                        <Link class="nav-link mx-2" to="/pricing">Pricing</Link>
                        <Link class="nav-link mx-2" to="/Support">Support</Link>
                        <Link className="nav-link mx-2" href="#"><i className="fa-solid fa-bars fs-4"></i></Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;