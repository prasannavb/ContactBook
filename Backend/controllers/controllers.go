package controllers

import (
	"backend/database"
	"backend/models"
	"log"
	"net/http"
	"strings"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

func SignUp(c *gin.Context){
	var users models.User
	if err:=c.ShouldBindJSON(&users); err!=nil{
		c.JSON(http.StatusBadRequest,gin.H{"error":err.Error()})
		return
	}
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(users.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error hashing password"})
		return
	}
	users.Password = string(hashedPassword)
	result := database.DB.Create(&users)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message":"User account already exist"})
        return
    }
	c.JSON(http.StatusAccepted,gin.H{"message":"Successfully created account"})
}

func Login(c *gin.Context){
	var userInput struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	var user models.User
	if err:=c.ShouldBindJSON(&userInput);err!=nil{
		c.JSON(http.StatusBadRequest,gin.H{"error":err.Error()})
		return
	}

	result := database.DB.Where("email = ?", userInput.Email).First(&user)
	if result.Error!=nil{
		c.JSON(http.StatusUnauthorized,gin.H{"message":"User doesnt exist"})
		return
	}
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(userInput.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid password"})
		return
	}
	c.JSON(http.StatusOK,gin.H{"id":user.ID})
}

func AddContact(c *gin.Context) {
    var contacts models.Contact
    if err := c.ShouldBindJSON(&contacts); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    result := database.DB.Create(&contacts)

    if result.Error != nil {
        if strings.Contains(result.Error.Error(), "duplicate key value") {
            c.JSON(http.StatusConflict, gin.H{"error": "Contact already exists"})
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add contact"})
        }
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Successfully created"})
}

func GetContacts(c *gin.Context){
	userId:=c.Param("userId")
	if userId==""{
        c.JSON(http.StatusBadRequest, gin.H{"error": "User ID is required"})
		return
	}

	var contacts []models.Contact

    result := database.DB.Where("user_id = ?", userId).Find(&contacts)

	if result.Error != nil {

        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch contacts"})
        return
    }

	c.JSON(http.StatusOK,gin.H{"contact_list":contacts})
}

func DeleteContact(c *gin.Context) {
	ID := c.Param("id") 

	contactID, err := uuid.Parse(ID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid contact ID format"})
		return
	}

	var contact models.Contact
	if err := database.DB.First(&contact, contactID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Contact not found"})
		return
	}

	var archive models.ArchiveContact
	archive.ID = contact.ID 
	archive.UserID = contact.UserID 
	archive.ContactName = contact.ContactName 
	archive.ContactEmail = contact.ContactEmail 
	archive.ContactPhoneNumber = contact.ContactPhoneNumber 
	archive.Address = contact.Address 
	archive.Designation = contact.Designation 
	archive.ReportingManager = contact.ReportingManager 

	if err := database.DB.Create(&archive).Error; err != nil {
		log.Println("Error archiving contact:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to archive contact"})
		return
	}

	result := database.DB.Delete(&contact)
	if result.Error != nil {
		log.Println("Error deleting contact:", result.Error)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete contact"})
		return
	}

	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Contact not found or already deleted"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Successfully deleted contact", "id": contact.ID})
}

func UpdateContact(c *gin.Context) {

	var contact models.Contact
	if err := c.ShouldBindJSON(&contact); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error":err.Error()})
		return
	}
	if err := database.DB.First(&models.Contact{}, contact.ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Contact not found"})
		return
	}
	if err := database.DB.Model(&models.Contact{}).Where("id = ?", contact.ID).Updates(contact).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update contact"})
        return
    }
    c.JSON(http.StatusOK, gin.H{"message": "Successfully updated contact", "contact": contact})


}

func ArchiveContact(c *gin.Context){

	userId:=c.Param("userId")

	if userId==""{
        c.JSON(http.StatusBadRequest, gin.H{"error": "User ID is required"})
		return
	}
	var archive []models.ArchiveContact

    result := database.DB.Where("user_id = ?", userId).Find(&archive)

	if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch contacts"})
        return
    }

	c.JSON(http.StatusOK,gin.H{"contact_list":archive})
}

func RestoreContact(c *gin.Context){

	var archivedContact models.ArchiveContact
	if err:=c.ShouldBindJSON(&archivedContact); err!=nil{
		c.JSON(http.StatusBadRequest, gin.H{"error":err.Error()})
		return
	}
	   if err := database.DB.First(&archivedContact,archivedContact.ID).Error; err != nil {
		   c.JSON(http.StatusNotFound, gin.H{"error": "Archived contact not found"})
		   return
	   }

		newContact := models.Contact{
			UserID:            archivedContact.UserID,
			ContactName:       archivedContact.ContactName,
			ContactEmail:      archivedContact.ContactEmail,
			ContactPhoneNumber: archivedContact.ContactPhoneNumber,
			Address:           archivedContact.Address,
			Designation:       archivedContact.Designation,
			ReportingManager:  archivedContact.ReportingManager,
		}
	
		if err := database.DB.Create(&newContact).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to restore contact"})
			return
		}

		if err := database.DB.Delete(&archivedContact).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete archived contact"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message":"Contact restored successfully"})

    }
	func DeleteArchiveContacts(c *gin.Context) {
		id := c.Param("id")
		var archivecontact models.ArchiveContact
	
		result := database.DB.Where("id = ?", id).Delete(&archivecontact)
		
		if result.Error != nil {
			log.Println("Error deleting contact:", result.Error)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete contact"})
			return
		}
	
		if result.RowsAffected == 0 {
			c.JSON(http.StatusNotFound, gin.H{"error": "Contact not found or already deleted"})
			return
		}
	
		c.JSON(http.StatusOK, gin.H{"message": "Successfully deleted contact", "id": archivecontact.ID})
	}
	