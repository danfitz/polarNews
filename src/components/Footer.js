import React from "react";

function Footer(props) {
    return (
        <footer className="footerComponent">
            <h3>Data provided by:</h3>
            <ul className="attributions">
                {props.attributions.map(attr => {
                    return (
                        <li><a href={attr.href}>{attr.name}</a></li>
                    );
                })}
            </ul>
        </footer>
    )
}

export default Footer;