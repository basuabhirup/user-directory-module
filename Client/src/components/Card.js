import React, {useState} from "react";
import "./Card.css";
import EditIcon from '@mui/icons-material/Edit';
import UpdateIcon from '@mui/icons-material/Update';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';

function Card(props) {
  const [isBeingEdited, setIsBeingEdited] = useState(false);

  return (
    <div className="card">
      <div className="card-top">
        <h2 name="user-name" className="user-name" contentEditable={isBeingEdited ? true: false} style={{backgroundColor: isBeingEdited ? "#cff" : "transparent"}}>{props.name}</h2>
      </div>
      <div className="card-bottom">
        <p name="mobile" className="info" contentEditable={isBeingEdited ? true: false} style={{backgroundColor: isBeingEdited ? "#cff" : "transparent"}}>{props.mobile}</p>
        <p name="email" className="info" contentEditable={isBeingEdited ? true: false} style={{backgroundColor: isBeingEdited ? "#cff" : "transparent"}}>{props.email}</p>
      </div>
      <div className="button-container">
        <button 
          onClick={() => props.deleteUser(props.id)} 
          title="Delete User"
          style={{display: isBeingEdited ? "none" : "inline"}}
        >
          <DeleteIcon />
        </button>  
        <button 
          onClick={() => setIsBeingEdited(true)} 
          title="Edit User"
          style={{
            display: isBeingEdited ? "none" : "inline",
            }}
        >
          <EditIcon/>
        </button>
        <button 
          onClick={() => {
            props.resetUser();
            setIsBeingEdited(false)}} 
          title="Cancel Editing"
          style={{display: isBeingEdited ? "inline" : "none"}}
        >
          <CancelIcon/>
        </button>  
        <button 
          onClick={() => {
              props.updateUser(props.id, props.name, props.mobile, props.email);
              setIsBeingEdited(false);
            }} 
          title="Update User"
          style={{display: isBeingEdited ? "inline" : "none"}}
        >
          <UpdateIcon/>
        </button>
      </div>
    </div>
  );
}

export default Card;
