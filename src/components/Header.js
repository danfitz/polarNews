import React from "react";
import fullEarth from "../static/fullEarth.png";

function Header(props) {
    return (
        <header className="headerComponent wrapper">
            <div className="earthContainer">
                <img className="earth" src={fullEarth} alt="earth" />
            </div>
            <h1>{props.title}</h1>
            <h2>
                Live feed of news headlines around the world <br />
                measured by <span id="positiveText">positivity</span> or <span id="negativeText">negativity</span>
            </h2>
        </header>
    )
}

export default Header;