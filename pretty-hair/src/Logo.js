import React from "react";
import {Link} from "react-router-dom";

function Logo(){

    return(
        <div className="Head">
            <Link
                className="Logo"
                to="/"
                >
                <h1>Pretty Hair</h1>
            </Link>

            <div className="NavLinks">
                <Link className="App-link" to="/services">Services</Link>
                <Link className="App-link" to="/about">About</Link>
            </div>
        </div>
    )
} 

export default Logo