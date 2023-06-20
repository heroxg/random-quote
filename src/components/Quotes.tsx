import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Quotes.css';

const options = {
  method: 'GET',
  url: 'https://quotes15.p.rapidapi.com/quotes/random/',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
    'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
  }
};

const Quotes = () => {
    const [quotes, setQuotes] = useState("Success is a journey, not a destination");
    const [data, setData] = useState("");
    const [author, setAuthor] = useState("");
    const [showAuthor, setShowAuthor] = useState(""); 
    const [errormsg, setErrorMsg] = useState(false);
  


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
        } catch(error) {
            // console.log(error)
            setErrorMsg(true);
        }
    }
    fetchQuotes();
    },[quotes, author])

  return (
    <div className='main-wrapper'>
        
        {errormsg && 
        <p className='error'>You've exhuasted the quotes you can view for now. Please, try again after some time</p>
        }
        <div className='quote-contents'>
          <div className='quote-wrapper'>
              <h3>{quotes}</h3>
          </div>
          <div className='qoute-info'>
            {author && <p id="author">Originator: {author}</p>}
            {/* <p>{loading ? "Loading" : ""}</p> */}
            <button onClick={handleClick} disabled={errormsg ? true : false}>Get Quotes</button>
            </div>
          </div>
        </div>
  )
}

export default Quotes
