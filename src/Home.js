import React, { useState, useEffect } from 'react';
import './Home.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function Home() {
  const [cart, setCart] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [hoveredProductId, setHoveredProductId] = useState(null); // State to track hovered product
  const navigate = useNavigate();

  // Product data with secondary images
  const varadhaFarmsProducts = [
    { id: 1, name: 'Organic Apples', rate: 3, quantity: '1 kg', image: 'apple.jpeg', hoverImage: 'apple-hover.jpg' },
    { id: 2, name: 'Fresh Carrots', rate: 2, quantity: '500 g', image: 'carrot.jpeg', hoverImage: 'carrot-hover.jpg' },
    { id: 3, name: 'Natural Almonds', rate: 10, quantity: '250 g', image: 'almonds.jpeg', hoverImage: 'almonds-hover.jpg' },
    { id: 4, name: 'Farm-Fresh Milk', rate: 5, quantity: '1 L', image: 'milk.jpeg', hoverImage: 'milk-hover.jpg' },
    { id: 5, name: 'Organic Spinach', rate: 2, quantity: '250 g', image: 'spinach.jpeg', hoverImage: 'spinach-hover.jpg' },
  ];

  const vamshiFarmsProducts = [
    { id: 6, name: 'Free-Range Eggs', rate: 4, quantity: '12 pcs', image: 'eggs.jpeg', hoverImage: 'eggs-hover.jpg' },
    { id: 7, name: 'Pure Honey', rate: 8, quantity: '500 ml', image: 'honey.jpeg', hoverImage: 'honey-hover.jpg' },
    { id: 8, name: 'Organic Tomatoes', rate: 3, quantity: '1 kg', image: 'tomatos.jpeg', hoverImage: 'tomatos-hover.jpg' },
    { id: 9, name: 'Raw Walnuts', rate: 9, quantity: '250 g', image: 'walnut.jpeg', hoverImage: 'walnut-hover.jpg' },
    { id: 10, name: 'Whole Wheat Bread', rate: 4, quantity: '1 loaf', image: 'wheat bread.jpeg', hoverImage: 'wheat-bread-hover.jpg' },
  ];

  const keshavFarmsProducts = [
    { id: 11, name: 'eggs', rate: 15, quantity: '12 pcs', image: 'eggs.jpeg', hoverImage: 'eggs-hover.jpg' },
    { id: 12, name: 'Fresh Carrots', rate: 2, quantity: '500 g', image: 'carrot.jpeg', hoverImage: 'carrot-hover.jpg' },
    { id: 13, name: 'Natural Almonds', rate: 10, quantity: '250 g', image: 'almonds.jpeg', hoverImage: 'almonds-hover.jpg' },
    { id: 14, name: 'Farm-Fresh Milk', rate: 5, quantity: '1 L', image: 'milk.jpeg', hoverImage: 'milk-hover.jpg' },
    { id: 15, name: 'Organic Spinach', rate: 2, quantity: '250 g', image: 'spinach.jpeg', hoverImage: 'spinach-hover.jpg' },
  ];

  const addToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    const productWithQuantity = { ...product, selectedQuantity: quantity };
    const updatedCart = [...cart, productWithQuantity];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    navigate('/cart');
  };

  const handleBuyNow = (product) => {
    const quantity = quantities[product.id] || 1;
    const productWithQuantity = { ...product, selectedQuantity: quantity };
    localStorage.setItem('cart', JSON.stringify([productWithQuantity]));
    navigate('/payment');
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handleQuantityChange = (productId, delta) => {
    setQuantities((prevQuantities) => {
      const newQuantity = Math.max((prevQuantities[productId] || 1) + delta, 1);
      return { ...prevQuantities, [productId]: newQuantity };
    });
  };

  const renderFarmProducts = (products) => {
    return (
      <div className="products">
        {products.map((product) => (
          <div
            key={product.id}
            className="product"
            onMouseEnter={() => setHoveredProductId(product.id)}
            onMouseLeave={() => setHoveredProductId(null)}
          >
            <img
              src={hoveredProductId === product.id ? product.hoverImage : product.image}
              alt={product.name}
            />
            <h3>{product.name}</h3>
            <p>Rate: ${product.rate}</p>
            <p>Quantity: {product.quantity}</p>
            <div className="quantity-controls">
              <button onClick={() => handleQuantityChange(product.id, -1)}>-</button>
              <span>{quantities[product.id] || 1}</span>
              <button onClick={() => handleQuantityChange(product.id, 1)}>+</button>
            </div>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
            <button onClick={() => handleBuyNow(product)}>Buy It Now</button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>Welcome to ECOGROCER</h1>
      <p>Fresh, Organic Food Delivered Directly From Farms to Your Doorstep</p>

      {!selectedFarm ? (
        <div className="farm-container">
          <div className="farm-box" onClick={() => setSelectedFarm('Varadha')}>
            <img src="varadhi.jpeg" alt="Varadha Farms Logo" className="farm-logo" />
            <h3>Varadha Farms</h3>
            <p>Providing the freshest organic produce directly from our farm to your table.</p>
            <button className="go-to-farm">Go To Farm</button>
          </div>
          <div className="farm-box" onClick={() => setSelectedFarm('Vamshi')}>
            <img src="vamshi.jpeg" alt="Vamshi Farms Logo" className="farm-logo" />
            <h3>Vamshi Farms</h3>
            <p>Experience the goodness of nature with our range of organic products.</p>
            <button className="go-to-farm">Go To Farm</button>
          </div>
          <div className="farm-box" onClick={() => setSelectedFarm('Keshav')}>
            <img src="keshav.jpeg" alt="Keshav Farms Logo" className="farm-logo" />
            <h3>Keshav Farms</h3>
            <p>Fresh, local, and organic - we bring the farm to your doorstep.</p>
            <button className="go-to-farm">Go To Farm</button>
          </div>
        </div>
      ) : (
        <div className="farm">
          <button onClick={() => setSelectedFarm(null)}>Back to Farms</button>
          {selectedFarm === 'Varadha' && (
            <>
              <h2>Varadha Farms</h2>
              <img src="varadhiinside.webp" alt="Varadha Farms Logo" className="farm-logo" />
              {renderFarmProducts(varadhaFarmsProducts)}
            </>
          )}
          {selectedFarm === 'Vamshi' && (
            <>
              <h2>Vamshi Farms</h2>
              <img src="vamshiinside.jpeg" alt="Vamshi Farms Logo" className="farm-logo" />
              {renderFarmProducts(vamshiFarmsProducts)}
            </>
          )}
          {selectedFarm === 'Keshav' && (
            <>
              <h2>Keshav Farms</h2>
              <img src="keshavinside.jpg" alt="Keshav Farms Logo" className="farm-logo" />
              {renderFarmProducts(keshavFarmsProducts)}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
