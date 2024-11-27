import { useState } from "react"
import axios from "axios"; 
const Sample=()=>
{
  const [formData,setFormData]=useState({
    email:'',password:''
  })

  const [userId,setUserId]=useState("1da95d72-c440-45b8-923e-bb222b342357")
  const [contacts,setContact]=useState([])
  const formDetails=(e)=>
  {
    const {name,value}=e.target
    setFormData({...formData,[name]:value})
    console.log(formData)
  }

  const signUp=async()=>
  {
    const data=await axios.post("http://localhost:8080/signup",formData)
    console.log(data)
  }

  const [contactForm,setContactForm]=useState(
    {
      userid:'1da95d72-c440-45b8-923e-bb222b342357',contactname:'',contactemail:'',contactphonenumber:'',address:'',designation:'',reporting_manager:''
    }
  )

  const Login=async()=>
  {
    const {data}=await axios.post("http://localhost:8080/login",formData)
    console.log(data)
      setContactForm((prev)=>{
        return(
          {
            ...prev,
            userid:data.id
          }
        )
      })

      setUserId(data.id)
  }
  


  const AddContact=async()=>
  {
      const data=await axios.post("http://localhost:8080/addcontact",contactForm)
      console.log(data)
  }
const getContact=async()=>
{
  const {data} = await axios.get(`http://localhost:8080/getcontacts/${userId}`);
  console.log(data);
  setContact(data.contact_list)

  
}

  const contactFormDetails=(e)=>
  {  const {name,value}=e.target
  setContactForm({...contactForm,[name]:value})
  console.log(contactForm)
  }

  const DeleteContact=async(id)=> 
  {
    console.log(id)
    const data = await axios.delete(`http://localhost:8080/deletecontact/${id}`);
        console.log(data)
  }

  const [singleContact,setSingleContact]=useState(
    {
      userid:'',contactname:'',contactemail:'',contactphonenumber:'',address:'',designation:'',reporting_manager:''

    }
  )

  const updateFormDetails=(e)=>
  {
    const {name,value}=e.target
    setSingleContact({...singleContact,[name]:value})
    console.log(singleContact)
  }

  const UpdateContact=async()=>
  {
    console.log(singleContact)
    const data=await axios.put("http://localhost:8080/updatecontact",singleContact)
    console.log(data)
  }

  return(
    <>
      <h2>Hello world</h2>
      <input type="text" name="name" onChange={formDetails} />
      <input type="email" name="email" onChange={formDetails} />
      <input type="password" name="password" onChange={formDetails} />
      <button onClick={signUp}>Submit</button>
      <br/>
      <input type="email" name="email"       onChange={formDetails}  />
      <input type="password" name="password" onChange={formDetails}  />
      <button onClick={Login}>Login</button> <br/>

      <input type="text" name="contactname"  placeholder="name"   onChange={contactFormDetails} />
      <input type="email" name="contactemail"   placeholder="email" onChange={contactFormDetails} />
      <input type="number" name="contactphonenumber" placeholder="number" onChange={contactFormDetails} />
      <input type="text" name="address" placeholder="address" onChange={contactFormDetails} />
      <input type="text" name="designation" placeholder="designation" onChange={contactFormDetails} />
      <input type="text" name="reporting_manager" placeholder="reportingmanager" onChange={contactFormDetails} />
      <button onClick={AddContact}>Add</button><br/>

      <button onClick={getContact}>get contacts</button><br/>

      <input type="text" name="contactname"  placeholder="name"  value={singleContact.contactname} onChange={updateFormDetails} />
      <input type="email" name="contactemail"   placeholder="email" value={singleContact.contactemail} onChange={updateFormDetails} />
      <input type="number" name="contactphonenumber" placeholder="number" value={singleContact.contactphonenumber} onChange={updateFormDetails} />
      <input type="text" name="address" placeholder="address" value={singleContact.address} onChange={updateFormDetails} />
      <input type="text" name="designation" placeholder="designation" value={singleContact.designation} onChange={updateFormDetails} />
      <input type="text" name="reporting_manager" placeholder="reportingmanager" value={singleContact.reporting_manager} onChange={updateFormDetails} />
      <button onClick={UpdateContact}>updated</button>

      <h2>Contact Info</h2>
      {contacts.map((data)=>{
        return(
          <>
            <p>{data.contactphonenumber}</p>
            <button onClick={()=>{DeleteContact(data.id)}}>Delete</button>
            <button onClick={()=>{setSingleContact(data)}}>Update</button>
          </>
        )
      })}
    </>
  )
}

export default Sample