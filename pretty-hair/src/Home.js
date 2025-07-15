import React from "react";

function Home(){
    
    return(
        <div className="HomeContainer">
            <h2>Business Hours</h2>
                <div className="opening">
                    <div className="days">
                        <p>Monday - Saturday</p>
                    </div>

                    <div className="times">
                        <p>10:00AM - 6:30PM</p>
                    </div>
                    
                </div>

            <div className="opening">
                <div className="days">
                    <p>Sunday</p>
                </div>

                <div className="closed">
                    <p>Closed</p>
                </div>
            </div>
        </div>
    )
}

export default Home;