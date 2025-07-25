import React from "react";
import {Link} from "react-router-dom";
import "../styles/App.css"

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
                <Link className="App-link" to="/clientbook">Client Book</Link>
                <Link className="App-link" to="/addclient">Add a Client</Link>
                <Link className="App-link" to="/addservice">Add a Service</Link>
            </div>
        </div>
    )
} 

export default Logo