import React from "react";
import axios from "axios";
import Memes from "./Memes";
import { v4 as uuidv4 } from 'uuid';

export default function Meme(){
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    });

    const [allMemes, setAllMemes] = React.useState([]);

    const [memesList, setMemesList] = React.useState([]);

    const [editMeme, setEditMeme] = React.useState(false);

    React.useEffect(() => {
        axios
        .get("https://api.imgflip.com/get_memes")
        .then(res => setAllMemes(res.data.data.memes))
        .catch(err => console.log(err))
    }, [])

    function getMemeImage(){
        const randomMeme = Math.floor(Math.random() * allMemes.length);
        const url = allMemes[randomMeme].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }

    function handleSubmit(event){
        event.preventDefault()
        //console.log("submit")
        if(editMeme === false){
            const newMeme = {...meme};
            newMeme.id = uuidv4();
            setMemesList(prevList => (
                [...prevList, newMeme]
            ))
            }else if(editMeme === true){
                setEditMeme(false)
                setMemesList(prevMeme => {
                    return prevMeme.map(item => {
                        return item.id === meme.id ? {...meme} : {...item}
                    })
                })
            }

        setMeme({
            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/1bij.jpg"
        })
    }

    function handleChange(event){
        const {name, value} = event.target;
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }


    const mappedMemes = memesList.map((meme, index) => {
        return (
            <Memes 
                key={index}
                {...meme}
                delete = {deleteMeme}
                edit = {edit}
                list = {memesList}
            />
        )
    })

    function deleteMeme(id){
        setMemesList(prevList => prevList.filter((meme) => meme.id !== id))
    }

    function edit(id){
        setEditMeme(true)
        setMeme(memesList.find(meme => meme.id === id))
    }


    return (
        <div className="main">
            <h1 className="title">Meme Generator</h1>
            <form className="form" onSubmit={handleSubmit}>
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
                <button className="get--meme--btn" onClick={getMemeImage} type="button">Generate New Meme</button>
                <button className="form--button">Submit</button>
            </form>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image"/>
                <h1 className="meme--text top">{meme.topText}</h1>
                <h1 className="meme--text bottom">{meme.bottomText}</h1>
            </div>
            <div className="list">
                {mappedMemes}
            </div>
        </div>
    )
}