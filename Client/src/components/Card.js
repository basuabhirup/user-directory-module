import React from "react";
import "./Card.css";

function Card(props) {
  return (
    <div className="card">
      <div className="card-top">
        <h2 name="user-name" className="user-name">{props.name}</h2>
      </div>
      <div className="card-bottom">
        <p name="mobile" className="info">{props.mobile}</p>
        <p name="email" className="info" contentEditable={true}>{props.email}</p>
      </div>
    </div>
  );
}

export default Card;
