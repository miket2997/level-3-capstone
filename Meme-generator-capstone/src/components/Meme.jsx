import React from "react";
import axios from "axios";

export default function Meme(){
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    });

    const [allMemes, setAllMemes] = React.useState([]);

    React.useEffect(() => {
        axios
        .get("https://api.imgflip.com/get_memes")
        .then(res => setAllMemes(res.data.data.memes))
    }, [])

    function getMemeImage(){
        const randomMeme = Math.floor(Math.random() * allMemes.length);
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: allMemes[randomMeme].url
        }))
    }

    function handleChange(event){
        const {name, value} = event.target;
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        <div className="main">
            <h1>Meme Generator</h1>
            <form className="form">
                <input 
                    type="text"
                    name="topText"
                    value={meme.topText}
                    className="text--fields"
                    placeholder="Top Text"
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    name="bottomText"
                    value={meme.bottomText}
                    className="text--fields"
                    placeholder="Bottom Text"
                    onChange={handleChange}
                />
                <button className="btn" onClick={getMemeImage}>Generate New Meme</button>
            </form>
            <div className="meme">
                <img src={meme.randomImage} alt="" />
            </div>
        </div>
    )
}