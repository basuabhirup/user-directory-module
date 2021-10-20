import React, {useState} from 'react';
import "./InputArea.css";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';

function InputArea(props) {
  const [user, setUser] = useState({
      name: "",
      mobile: "",
      email: ""
  })

  const [isClicked, setIsClicked] = useState(false);

  function updateUser(e) {
      const name = e.target.name;
      const value = e.target.value;

      setUser({
          ...user,
          [name]: value
      })
  }

  return (
    <div>
      <form className="add-user" onSubmit={ (e) => {          
          props.onSubmit(user);
          e.preventDefault();
          setIsClicked(false);
          setUser({ name: "", mobile: "", email: "" });
        } 
      }>
        <input name="name" type="text" onClick={() => setIsClicked(true)} onChange={updateUser} placeholder={isClicked ? "Name" : "Add a new user..."}  value={user.name}/>
        {isClicked && <input name="mobile" type="number" onChange={updateUser} placeholder="Mobile Number" value={user.mobile}/>}
        {isClicked && <input name="email" type="email" onChange={updateUser} placeholder="E-mail ID" value={user.email}/>}
        <Zoom in={isClicked}>
          <Fab type="submit" title="Add User">
            <AddIcon />
          </Fab>
        </Zoom>
        
      </form>
    </div>
  )
}

export default InputArea;
