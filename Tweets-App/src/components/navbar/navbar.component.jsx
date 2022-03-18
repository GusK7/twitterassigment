import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="ui two item menu">
      <Link to="/tweets">New Tweets</Link>
    </div>
  );
};

export default Navbar;