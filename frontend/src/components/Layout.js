import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => (
  <div>
    <header>
      <nav>
        <Link to="/">Home</Link> | <Link to="/onboarding">Onboarding</Link>
      </nav>
    </header>
    <main>{children}</main>
    <footer>
      <p>Palace of Goods © 2024</p>
    </footer>
  </div>
);

export default Layout;
