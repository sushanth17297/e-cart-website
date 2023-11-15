import React from "react";
import "../styles/navbar.css";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";



const Navbar = () => {
  const lengthItems = useSelector((state) => state.cartDetail.value);
  const cartlength = lengthItems?.length;
  const cartCountStyle = {
    background: cartlength==0 ? "red" : "gray",
    // Add other styles if needed
  };
  console.log(`lengthItems`, lengthItems);
  return (
    <div className="navbar">
      <div className="nav_box">
        <span className="my_shop">
          <Link to={`/`} style={{ textDecoration: "none" }}>
          <span>
            <LocalMallIcon style={{ fontSize: "inherit" }} />E-Cart
          </span>
          </Link>

          <Link to={`/addProduct`} style={{ textDecoration: "none" }}>
            <span className="mx-5 text-white" style={{ fontSize: "15px" }}>
              Add Product
            </span>
          </Link>
        </span>
        <span className="searchSpan" style={{ background: "rgb(218,220,232)" }}>
        <input
          id="search"
              className="search"
              type="text"
              placeholder="Search in E-Cart.in"
            ></input>
          <button><SearchIcon/></button>
        </span>
        <div className="cart">
          <Link to={`/Cart`} style={{ textDecoration: "none" }}>
            <ShoppingCartIcon style={{ fontSize: '2rem' }}/>
            <span style={cartCountStyle}>{lengthItems?.length}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
