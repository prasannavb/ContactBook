# Contact List Application

Welcome to the **Contact List Application**, a user-friendly platform that allows you to manage and organize your contacts effortlessly. This application offers features like user authentication, adding and managing contacts, viewing archived (recently deleted) contacts, and searching through contacts with various filters.

---

## **Table of Contents**
1. [Features](#features)  
2. [Demo](#demo)  
3. [Tech Stack](#tech-stack)  
4. [Folder Structure](#folder-structure)  
5. [Database Schema](#database-schema)  
6. [API Routes](#api-routes)  


## **Demo**
The demo of the website is hosted locally using Docker. Clone the repository and follow the installation steps to see it in action.


## **Features**
### **User Authentication:**
- **Login:** Existing users can securely log in to their accounts.  
- **Signup:** New users can register by providing the required details.  

### **Contact Management:**
- Add, edit, and delete contacts with details such as name, phone number, email, address, designation, and more.  
- View a list of all saved contacts in a user-friendly format.  

### **Search and Filters:**
- Search for contacts using various criteria, such as **name**, **phone number**, or **designation**.  
- Use filters to narrow down contact searches based on specific fields.  

### **Archive Management:**
- View recently deleted contacts in an **archive**.
- Users can restore the contacts back from **archive**
- Users can permanantely delete the contacts in **archive** 

### **Design and Usability:**
- A clean, responsive user interface designed for simplicity and efficiency.  

### **Dockerized Hosting:**
- The application is fully containerized using Docker for easy deployment and scalability.


## **Tech Stack**
### **Frontend:**
- **React (Vite):** For a fast and modern frontend experience.
- **CSS:** Responsive styling for an intuitive user interface.

### **Backend:**
- **Go (Gin):** For a fast and robust backend API.
- **GORM:** ORM for database interaction.

### **Database:**
- **PostgreSQL:** A reliable relational database for storing contacts and user information.

## **Folder Structure**
```
project-root/
├── Frontend/              # Frontend React application
│   ├── src/              # React source code
│   ├── public/           # Static assets
│   └── package.json      # Client-side dependencies
├── Backend/              # Backend Go application
│   ├── controllers/      # API route handlers
│   ├── models/           # Database models (GORM)
│   ├── database/         # Database connection configuration
│   │   └── connection.go # Database connection setup
│   ├── main.go           # Application entry point
│   └── go.mod            # Backend dependencies
├── docker-compose.yml    # Docker configuration
├── .env                  # Environment variables
└── README.md             # Documentation
```


### Database Schema


## User
```go
type User struct {
	ID        uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey" json:"id"`
	Name      string    `json:"name"`
	Email     string    `gorm:"unique" json:"email"`
	Password  string    `json:"password"`
}
```
## Contacts
```go
type Contact struct {
    ID                  uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey" json:"id"`
    UserID              uuid.UUID `gorm:"type:uuid;not null;index" json:"userid"`
    ContactName         string    `json:"contactname"`
    ContactEmail        string    `gorm:"unique" json:"contactemail"`
    ContactPhoneNumber  string    `gorm:"unique" json:"contactphonenumber"`
    Address             string    `json:"address"`
    Designation         string    `json:"designation"`
    ReportingManager    string    `json:"reporting_manager"`
}

```
## Archive Contacts
```go
type ArchiveContact struct {
    ID                  uuid.UUID `json:"id"`
    UserID              uuid.UUID `json:"userid"`
    ContactName         string    `json:"contactname"`
    ContactEmail        string    `json:"contactemail"`
    ContactPhoneNumber  string    `json:"contactphonenumber"`
    Address             string    `json:"address"`
    Designation         string    `json:"designation"`
    ReportingManager    string    `json:"reporting_manager"`
}
```
## API Routes

## Authentication
<ul>
	<li><code>POST /login</code>:Login to existing account</li>
	<li><code>POST /signup</code>:Register as  a new user</li>
</ul>

## Contacts
<ul>
	<li><code>POST /addcontact</code>Add a new contact</li>
	<li><code>GET /getcontacts/:userId</code>Fetch all exisiting contacts of that user</li>
	<li><code>PUT /updatecontact</code> Update contact details</li>
	<li><code>DELETE /deletecontact/:id</code> Delete a contact</li>
	<li><code>GET /archivecontacts/:userId</code> Fetch all contacts from archive</li>
	<li><code>POST /restorecontact</code> Restore the contacts from archive</li>
	<li><code>DELETE /deletearchivecontact/:id</code> Permanantely delete a contact from archive</li>
</ul>
<h3>Copyright ©2024 All rights reserved |Designed by Prasanna V B</h3>

