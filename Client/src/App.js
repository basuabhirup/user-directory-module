import React from "react";
import Card from "./components/Card";
import './App.css';
import users from "./users";

function App() {
  return (
    <div>
      <h1 className="heading">User Directory</h1>

      <div className="card-container">
        {users.map((user) => {
          return (
            <Card
              key={user.id}
              id={user.id}
              name={user.name}
              img={user.imgURL}
              mobile={user.mobile}
              email={user.email}
            />
          );
        })}
      </div>

      
    </div>
  );
}

export default App;
