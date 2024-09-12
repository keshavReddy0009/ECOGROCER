import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Cart from './Cart';
import Payment from './payment';
import Login from './Login';
import Signup from './Signup';
import SearchResults from './SearchResults';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home products={products} />} />  {/* Pass products to Home component */}
            <Route path="/about" element={<About />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search" element={<SearchResults />} /> {/* Add route for search results */}
        {/* Add other routes here */}
            <Route path="/login" element={<Login />} />
            <Route path="/payment" element={<Payment />} /> 
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
