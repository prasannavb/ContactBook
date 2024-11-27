package models

import (
	"github.com/google/uuid"
)

type User struct {
	ID        uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey" json:"id"`
	Name      string    `json:"name"`
	Email     string    `gorm:"unique" json:"email"`
	Password  string    `json:"password"`
}

type Contact struct {
	ID                uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey" json:"id"`
	UserID            uuid.UUID `gorm:"type:uuid;not null;index" json:"userid"` 
	ContactName       string    `json:"contactname"`
	ContactEmail      string    `gorm:"unique" json:"contactemail"`
	ContactPhoneNumber string   `gorm:"unique" json:"contactphonenumber"` 
	Address           string    `json:"address"`            
	Designation       string    `json:"designation"`            
	ReportingManager   string    `json:"reporting_manager"`            
}

type ArchiveContact struct {
	ID                uuid.UUID `json:"id"`
	UserID            uuid.UUID `json:"userid"` 
	ContactName       string    `json:"contactname"`
	ContactEmail      string    `json:"contactemail"`
	ContactPhoneNumber string   `json:"contactphonenumber"` 
	Address           string    `json:"address"`  
	Designation       string    `json:"designation"`            
	ReportingManager   string    `json:"reporting_manager"`            
}
