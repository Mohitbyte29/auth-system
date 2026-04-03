import { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { handleError } from '../utils.js';

const Home = () => {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    },[])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        setTimeout(() => {
            navigate('/');
        }, 1000)
    }

    const fetchProducts = async() => {
      try{
        const url = "http://localhost:4000/products";
        const token = localStorage.getItem('token');
        if (!token) {
          handleError();
          return;
        }
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response)
      }
      catch(err){
        handleError(err)
      }
    }
    useEffect(() => {
      fetchProducts()
    }, [])
  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {
          products.map((item, index) => (
            <ul key={index}>
              <span>{item.name}: {item.price}</span>
            </ul>
          ))
        }
      </div>
    </div>
  )
}

export default Home
