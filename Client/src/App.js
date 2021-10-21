import React from "react";
import axios from "axios";
import InputArea from "./components/InputArea";
import Card from "./components/Card";
import './App.css';

function App() {
  const [usersArray, setUsersArray] = React.useState([]);

  React.useEffect(() => {
    axios.get("/api/users")
    .then((res) => {
        if(res.data.length > 0 ) {
            setUsersArray([...res.data]);
        } else {
            setUsersArray([]);
        }  
    })
    .catch((err) => console.error(err));
}, []);

  function addUser(user) {
    axios.post("/api/user/add", user)
        .then((res) => setUsersArray([...res.data])) 
        .catch((err) => console.error(err));
  }

  function updateUser(id, name, mobile, email) {
    setUsersArray(usersArray.map(user => user.id === id ? {id, name, mobile, email} : user));
  }

  function resetUser() {
    setUsersArray(usersArray);
  }

  function deleteUser(id) {
    axios.delete("/api/user/delete", { data: { objId: id} })
        .then((res) => {
            if (res.status === 200) {
              setUsersArray(usersArray.filter(user => user._id !== id));
            }
        })
        .catch((err) => console.error(err));
  }

  return (
    <div>
      <h1 className="heading">User Directory</h1>
      <InputArea onSubmit={addUser}/>
      <div className="card-container">
        {usersArray.map(user => {
          return (
            <Card
              key={user._id}
              id={user._id}
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
