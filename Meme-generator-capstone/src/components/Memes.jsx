import React from "react";

export default function Memes(props){
    const {
        topText,
        bottomText,
        randomImage,
        id
    } = props;

    return (
        <div className="meme--container">
            <img src= {randomImage} />
            <h1>{topText}</h1>
            <h1>{bottomText}</h1>
            <div className="buttons">
                <button onClick={() => props.edit(id)}>Edit</button>
                <button onClick={() => props.delete(id)}>Delete</button>
            </div>
        </div>
    )
}