import React from "react";
import Card from "./components/Card";
import InputArea from "./components/InputArea";
import './App.css';
import users from "./users";

function App() {
  const [usersArray, setUsersArray] = React.useState(users);

  function addUser(user) {
    setUsersArray([...usersArray, user]);
  }

  function updateUser(id, name, mobile, email) {
    setUsersArray(usersArray.map(user => user.id === id ? {id, name, mobile, email} : user));
  }

  function resetUser() {
    setUsersArray(prevArray => prevArray);
  }

  function deleteUser(id) {
    setUsersArray(usersArray.filter(user => user.id !== id));
  }

  return (
    <div>
      <h1 className="heading">User Directory</h1>
      <InputArea onSubmit={addUser}/>
      <div className="card-container">
        {usersArray.map((user, index) => {
          return (
            <Card
              key={index}
              id={user.id}
              updateUser={updateUser}
              resetUser={resetUser}
              deleteUser={deleteUser}
              name={user.name}
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
