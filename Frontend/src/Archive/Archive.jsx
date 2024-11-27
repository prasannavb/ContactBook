//Dependencies
import { useEffect, useState } from "react"
import axios from "axios"

//Modules
import Navbar from "../Navbar/Navbar"

//CSS
import './Archive.css'

const Archive=()=>
{
  const [contacts,setContact]=useState([])
  const [availbaleContacts,setAvailableContacts]=useState([])
  const [isFlipped, setIsFlipped] = useState(false);
  const handleCardFlip = () => { 
  setIsFlipped(!isFlipped);
  };

  const fetchArchiveContacts=async(userId)=>
  {
    const {data} = await axios.get(`http://localhost:8080/archivecontacts/${userId}`);
    setContact(data.contact_list)
    setAvailableContacts(data.contact_list)
  }

  useEffect(()=>{
    if(!sessionStorage.getItem('userId'))
    {
      navigate('/')
      return;
    }
    fetchArchiveContacts(sessionStorage.getItem('userId'))
  },[])

  const searchContacts=(e)=>
  {
    const {name,value}=e.target
    console.log(value)
    if(value==="")
    {
        setContact(availbaleContacts)
    }
    else
    {
      const filteredContacts = availbaleContacts.filter((contact) => 
      contact.contactname.toLowerCase().includes(value.toLowerCase()) ||
      contact.designation.toLowerCase().includes(value.toLowerCase()) ||
      contact.reporting_manager.toLowerCase().includes(value.toLowerCase()) ||
      contact.contactphonenumber.toLowerCase().includes(value.toLowerCase()) 
      );        
      setContact(filteredContacts)
      }
    }

    return(
        <>
            <div className="Archive" >
                <Navbar/>
                <div className="search-container">
                    <input type="search" className="search-input" placeholder="Search contacts..." onChange={searchContacts} />
                    <i className="fas fa-search search-icon search-btn" onClick={searchContacts}></i>
                 </div>
                <div className="Archive-card-deck">
                    {contacts.length>0?(<>
                        {contacts.map((data)=>{
                        return(
                            <div className={`Card-container ${isFlipped ? 'is-flipped' : ''}`}>
                            <div className="Card-flipper" >
                              <div className="Card front" onClick={handleCardFlip}>
                                <span className="Card-icon" >
                                  ⓘ
                                </span>
                                <div className="Card-inner">
                                  <div className="Card-avatar">{data.contactname.charAt(0).toUpperCase()}</div>
                                  <div className="Card-content">
                                    <h2>{data.contactname}</h2>
                                    <p>{data.designation}</p>
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
                                      <b>Name:</b> <span>{data.contactname}</span>
                                    </div>
                                    <div>
                                      <b>Email:</b> <span>{data.contactemail}</span>
                                    </div>
                                    <div>
                                      <b>Phone:</b> <span>{data.contactphonenumber}</span>
                                    </div>
                                    <div>
                                      <b>Address:</b> <span>{data.address}</span>
                                    </div>
                                    <div>
                                      <b>Designation:</b> <span>{data.designation}</span>
                                    </div>
                                    <div>
                                      <b>Reports to:</b> <span>{data.reporting_manager}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>                        )
                    })}
                    </>):( 
              <div className="no-contact-container">
                <img
                    src="https://cdni.iconscout.com/illustration/premium/thumb/contact-us-illustration-download-in-svg-png-gif-file-formats--call-logo-laptop-helping-customer-service-pack-network-communication-illustrations-2912020.png"
                    alt="No contacts available"
                    className="no-contact-image"
                />
                 <h2 className="no-contact-text">No contacts available</h2>
                 <p className="no-contact-description">
                    Add new contacts to see them here!
             </p>
             </div> )}
              </div>
            </div>
        </>
    )
}
export default Archive