package database

import (
	"gorm.io/driver/postgres"
    "gorm.io/gorm"
	"log"
	"backend/models"
)

var DB *gorm.DB

func ConnectDatabase(){

	var err error
	dsn := "host=localhost user=postgres password=postgres dbname=contactApp port=5432 sslmode=disable"
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Println("Failed to connect to database:", err)
		DB = nil 
		return
	}

	err = DB.AutoMigrate(&models.User{},&models.Contact{},&models.ArchiveContact{})
	if err != nil {
		log.Println("Failed to migrate database:", err)
		DB = nil
	}
}
