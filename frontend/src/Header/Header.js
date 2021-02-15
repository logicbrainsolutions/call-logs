import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const HeaderView = () => {
  return (

    <div className="container loggedOutView">
      <Link to="/" className="nav-link home">
        Home
          </Link>



    </div>


  );
};

class Header extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <nav className="header">
        <div className="container">
          {
            <HeaderView />}
        </div>
      </nav>
    );
  }
}


export default Header;