import React, { useState } from 'react';

//CSS
import './Form.css';

const Form = (props) => {
 
  const { setModal, formData,setFormData,addContacts,isEditMode,updateContacts } = props;

  const formDataChange=(e)=>
  {
    const {name,value}=e.target
    setFormData({...formData,[name]:value.trim()})
    
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-slide-in">
        {isEditMode?(<>
            <h2>Update Contact</h2>
            </>):(<>
            <h2>Add New Contact</h2>
            </>)}
        <form onSubmit={isEditMode?(updateContacts):(addContacts)} >
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="contactname"
              value={formData.contactname}
              placeholder="Enter name"
              required
              onChange={formDataChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="contactemail"
              value={formData.contactemail}
              placeholder="Enter email"
              required
              onChange={formDataChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="contactphonenumber"
              value={formData.contactphonenumber}
              placeholder="Enter phone number"
              pattern="\d{10}" 
              required
              onChange={formDataChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              placeholder="Enter address"
              required
              onChange={formDataChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="designation">Designation:</label>
            <input
              type="text"
              id="designation"
              name="designation"
              value={formData.designation}
              placeholder="Enter designation"
              required
              onChange={formDataChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="reportingManager">Reports To:</label>
            <input
              type="text"
              id="reportingManager"
              name="reporting_manager"
              value={formData.reporting_manager}
              placeholder="Enter reporting manager"
              required
              onChange={formDataChange}
            />
          </div>
          <div className="button-group">
            {isEditMode?(
                <button type="submit" className="primary-btn" >Update Contact</button>
            ):(
                <button type="submit" className="primary-btn" >Add Contact</button>
            )}
            <button
              type="button"
              className="secondary-btn"
              onClick={() => setModal(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
