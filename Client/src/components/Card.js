import React, {useState} from "react";
import "./Card.css";
import EditIcon from '@mui/icons-material/Edit';
import UpdateIcon from '@mui/icons-material/Update';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';

function Card(props) {
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: props.name,
    mobile: props.mobile,
    email: props.email
  })

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

      setUpdatedUser({
          ...updatedUser,
          [name]: value
      })
  }

  return (
    <div>
    <div className="card" style={{display: isBeingEdited ?  "none" : "inline-block"}}>
      <div className="card-top">
        <h2 name="user-name" className="user-name">{props.name}</h2>
      </div>
      <div className="card-bottom">
        <p name="mobile" className="info">{props.mobile}</p>
        <p name="email" className="info">{props.email}</p>
      </div>
      <div className="button-container">
        <button 
          onClick={() => props.deleteUser(props.id)} 
          title="Delete User"
        >
          <DeleteIcon />
        </button>  
        <button 
          onClick={() => setIsBeingEdited(true)} 
          title="Edit User"
        >
          <EditIcon/>
        </button>
      </div>
    </div>
    <form 
      className="card" 
      onSubmit={(e) => {
        e.preventDefault();
        props.updateUser(props.id, updatedUser.name, updatedUser.mobile, updatedUser.email);
        setIsBeingEdited(false);
        setUpdatedUser({
          name: updatedUser.name,
          mobile: updatedUser.mobile,
          email: updatedUser.email
        })
      }}  
      style={{display: isBeingEdited ? "inline-block" : "none"}}
    >
      <div className="card-top">
        <input name="name" onChange={handleChange} value={updatedUser.name} />
      </div>
      <div className="card-bottom">
        <input name="mobile" className="info" onChange={handleChange} value={updatedUser.mobile} />
        <input name="email" className="info" onChange={handleChange} value={updatedUser.email} />
      </div>
      <div className="button-container">
        <button 
          type="reset"
          onClick={() => {
            setIsBeingEdited(false);
            setUpdatedUser({
              name: props.name,
              mobile: props.mobile,
              email: props.email
            })
          }}
          title="Cancel Editing"
        >
          <CancelIcon/>
        </button>  
        <button 
          type="submit"
          title="Update User"
        >
          <UpdateIcon/>
        </button>
      </div>
    </form>
    </div>
  );
}

export default Card;
