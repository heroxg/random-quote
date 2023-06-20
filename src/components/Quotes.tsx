import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Quotes.css'

const Quotes = () => {
    const [quotes, setQuotes] = useState("Success is a journey, not a destination");
    const [data, setData] = useState("");
    const [author, setAuthor] = useState("");
    const [showAuthor, setShowAuthor] = useState("");

    const options = {
        method: 'GET',
        url: 'https://quotes15.p.rapidapi.com/quotes/random/',
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
          'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
        }
      };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setQuotes(data);
        setAuthor(showAuthor);
    }


    useEffect(() => {
      const fetchQuotes = async () => {
        try {
            const response = await axios.request(options);
            setData(response.data.content);
            setShowAuthor(response.data.originator.name);
        }catch (error) {
            console.log(error)
        }
    }
    fetchQuotes();
    },[quotes, author])

  return (
    <div className='main-wrapper'>
        <div className='quote-wrapper'>
            <h3>{quotes}</h3>
        </div>
         {author && <p id="author">Originator: {author}</p>}
        <button onClick={handleClick}>Get Quotes</button>
    </div>
  )
}

export default Quotes
