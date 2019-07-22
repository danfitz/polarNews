import React from "react";

function Footer(props) {
    return (
        <footer className="footerComponent">
            <h3>Data kindly provided by:</h3>
            <ul className="attributions">
                {props.attributions.map(attr => {
                    return (
                        <li><a href={attr.href}>{attr.name}</a></li>
                    );
                })}
            </ul>
            <p>Created by {props.author}</p>
            <p><a href={props.githubUrl} target="_blank">View GitHub Repo</a></p>
        </footer>
    )
}

export default Footer;