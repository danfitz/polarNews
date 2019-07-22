import React from "react";
import fullEarth from "../static/fullEarth.png"; // import image of earth

function Header(props) {
    return (
        <header className="headerComponent wrapper">
            <div className="earthContainer">
                <img className="earth" src={fullEarth} alt="earth" />
            </div>
            <h1>{props.title}</h1>
            <h2>
                Discover how <span className="positive">positive</span>, <span className="negative">negative</span>, or <span className="neutral">neutral</span> top news headlines are around the world using AI
            </h2>
        </header>
    )
}

export default Header;