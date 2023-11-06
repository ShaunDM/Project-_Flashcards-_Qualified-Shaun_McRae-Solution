import React from "react";
import {Link} from "react-router-dom";

function NotFound() {
  const notFound = "Not Found";
  return (
    <div className="NotFound">
      <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active">{notFound}</li>
            </ol>
        </nav>
      <h1>{notFound}</h1>
    </div>
  );
}

export default NotFound;
