//Dependencies
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

//Modules
import Navbar from "../Navbar/Navbar"
import Form from "../Form/Form"
import Card from "../Card/Card"

//CSS
import './Home.css'

const Home=()=>
{
    const [modalOpen,setModal]=useState(false)
    const [isEditMode,setEditMode]=useState(false)

    const [contacts,setContact]=useState([])
    const [availbaleContacts,setAvailableContact]=useState([])
    const [singleContact,setSingleContact]=useState({userid:'',contactname:'',contactemail:'',contactphonenumber:'',address:'',designation:'',reporting_manager:''})
    const [formData, setFormData] = useState({
        userid:'',
        contactname: '',
        contactemail: '',
        contactphonenumber: '',
        address: '',
        designation: '',
        reporting_manager: '',
      })

    const navigate=useNavigate()

    const fetchContacts=async(userId)=>
    {
        const {data} = await axios.get(`http://localhost:8080/getcontacts/${userId}`);
        setContact(data.contact_list)
        setAvailableContact(data.contact_list)
    }

    const deleteContacts = async (id) => {
        try {
            const status=confirm("Do you want to delete this contact?")
            if(status)
            {
                const { data } = await axios.delete(`http://localhost:8080/deletecontact/${id}`);
                alert("Contact successfully deleted!"); 
                fetchContacts(sessionStorage.getItem('userId'));
            }
        } catch (error) {
            console.error("Error deleting contact:", error);
            alert("Failed to delete contact. Please try again later.");
        }
    };

    useEffect(()=>{
        if(!sessionStorage.getItem('userId'))
        {
            navigate('/')
            return;
        }
        setFormData((prev)=>({...prev,userid:sessionStorage.getItem('userId')}))
        fetchContacts(sessionStorage.getItem('userId'))
    },[])

    const addContacts = async (event) => {
        try {
            const { data } = await axios.post("http://localhost:8080/addcontact", formData);
            alert("Contact successfully added!"); 
            fetchContacts(sessionStorage.getItem('userId'));
        } catch (error) {
            console.error("Error adding contact:", error);
            alert("Failed to add contact. Please try again later.");
        }
    };

    const setupdateContacts=(...data)=>
    {
       setSingleContact((prev)=>{
        return(
            {
                ...prev,
                id:data[0],
                userid:`${sessionStorage.getItem('userId')}`,
                contactname:data[1],
                contactemail:data[2],
                contactphonenumber:data[3],
                address:data[4],
                designation:data[5],
                reporting_manager:data[6]
            }
        )
       })
       setEditMode(true)
       setModal(true)
    }

    const updateContacts = async (event) => {
        try {
            event.preventDefault();
            const { data } = await axios.put("http://localhost:8080/updatecontact", singleContact);
            alert("Contact successfully updated!"); 
            setEditMode(false);
            setModal(false);
            fetchContacts(sessionStorage.getItem('userId'));
        } catch (error) {
            console.error("Error updating contact:", error);
            alert("Failed to update contact. Please try again later.");
        }
    };

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
            {modalOpen ? (
              isEditMode ? (
                <>
                <Form setModal={setModal} modalOpen={modalOpen} isEditMode={isEditMode} formData={singleContact}  setFormData={setSingleContact} updateContacts={updateContacts} />
                </>
            ):(
                <>
                <Form setModal={setModal} modalOpen={modalOpen} formData={formData}  setFormData={setFormData} addContacts={addContacts} />
                </>
            )
            ):(
              <>
              </>
            )}

            <div className="Home" >
                <Navbar/>
                <div className="search-container">
                    <input type="search" className="search-input" placeholder="Search contacts..." onChange={searchContacts} />
                    <i className="fas fa-search search-icon search-btn" onClick={searchContacts}></i>
                 </div>
                <div className="Home-card-deck">
                    {contacts.length>0?(<>
                        {contacts.map((data)=>{
                        return(
                        <Card key={data.id} id={data.id} contactname={data.contactname} contactemail={data.contactemail} contactphonenumber={data.contactphonenumber} address={data.address} designation={data.designation} reporting_manager={data.reporting_manager} deleteContacts={deleteContacts} setupdateContacts={setupdateContacts} setModal={setModal} setEditMode={setEditMode} />
                        )
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
                </div>)}
                </div>
                <div className="Addbtn" onClick={()=>{setModal(true),setEditMode(false)}}>
                    +
                </div>
            </div>
        </>
    )
}
export default Home