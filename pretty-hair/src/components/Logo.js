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
                <h2>Pretty Hair</h2>
            </Link>

            <div className="NavLinks">
                <Link className="App-link" to="/phonetest">Search Client</Link>
                <Link className="App-link" to="/clientbook">Client Book</Link>
                <Link className="App-link" to="/addclient">Add Client</Link>
                <Link className="App-link" to="/addservice">Add Service</Link>
            </div>
        </div>
    )
} 

export default Logo