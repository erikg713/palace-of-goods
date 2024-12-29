import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
    </Routes>
  </Router>
);

export default App;

import React from 'react';
import Onboarding from './Onboarding';

function App() {
    return (
        <div>
            <Onboarding />
        </div>
    );
}

export default App;
