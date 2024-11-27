import React, {useState } from 'react';

//CSS
import './Card.css';


const Card = ({
  id,
  contactname,
  contactemail,
  contactphonenumber,
  address,
  designation,
  reporting_manager,
  setupdateContacts,
  deleteContacts
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleCardFlip = () => { 
    setIsFlipped(!isFlipped);
  };


  return (
    <div className={`Card-container ${isFlipped ? 'is-flipped' : ''}`}>
      <div className="Card-flipper" >
        <div className="Card front" onClick={handleCardFlip}>
          <span className="Card-icon" >
            ⓘ
          </span>
          <div className="Card-inner">
            <div className="Card-avatar">{contactname.charAt(0).toUpperCase()}</div>
            <div className="Card-content">
              <h2>{contactname}</h2>
              <p>{designation}</p>
            </div>
          </div>
        </div>

        <div className="Card back">
          <span className="Card-icon"  onClick={handleCardFlip} >
            ⓧ
          </span>
          <div className="Card-outer">
            <div className="Card-outer-content">
              <div>
                <b>Name:</b> <span>{contactname}</span>
              </div>
              <div>
                <b>Email:</b> <span>{contactemail}</span>
              </div>
              <div>
                <b>Phone:</b> <span>{contactphonenumber}</span>
              </div>
              <div>
                <b>Address:</b> <span>{address}</span>
              </div>
              <div>
                <b>Designation:</b> <span>{designation}</span>
              </div>
              <div>
                <b>Reports to:</b> <span>{reporting_manager}</span>
              </div>
              <div className='Card-outer-btns'>
                <button onClick={()=>{setupdateContacts(id,contactname,contactemail,contactphonenumber,address,designation,reporting_manager)}} >Update</button>
                <button onClick={()=>{deleteContacts(id)}} >Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

