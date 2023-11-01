import React from "react";
import {Link} from "react-router-dom";

function NotFound() {
  return (
    <div className="NotFound">
      <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active">Not Found</li>
            </ol>
        </nav>
      <h1>Not Found</h1>
    </div>
  );
}

export default NotFound;
