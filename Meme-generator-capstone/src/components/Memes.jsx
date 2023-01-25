import React from "react";

export default function Memes(props){
    const {topText, bottomText, randomImage, id} = props;

    return (
        <div className="meme--container">
            <img src= {randomImage} className="image--list" />
            <h1 className="top--text--list">{topText}</h1>
            <h1 className="bottom--text--list">{bottomText}</h1>
            <div className="buttons">
                <button className="edit--button" onClick={() => props.edit(id)}>Edit</button>
                <button className="delete--button" onClick={() => props.delete(id)}>Delete</button>
            </div>
        </div>
    )
}