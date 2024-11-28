package database

import (
    "log"
    "os"
    "backend/models"
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
    "github.com/joho/godotenv"  
)

var DB *gorm.DB

func ConnectDatabase() {
    // Load environment variables
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    // Retrieve environment variables
    dbHost := os.Getenv("DB_HOST")
    dbUser := os.Getenv("DB_USER")
    dbPassword := os.Getenv("DB_PASSWORD")
    dbName := os.Getenv("DB_NAME")
    dbPort := os.Getenv("DB_PORT")

    var dbError error

    // Build the connection link (dsn)
    dsn := "host=" + dbHost + " user=" + dbUser + " password=" + dbPassword + " dbname=" + dbName + " port=" + dbPort + " sslmode=disable"

    // Open the database connection
    DB, dbError = gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if dbError != nil {
        log.Println("Failed to connect to database:", dbError)
        DB = nil
        return
    }

    // Migrating the models
    err = DB.AutoMigrate(&models.User{}, &models.Contact{}, &models.ArchiveContact{})
    if err != nil {
        log.Println("Failed to migrate database:", err)
        DB = nil
    }
}
