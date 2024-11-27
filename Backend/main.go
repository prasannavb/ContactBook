package main

import (
	"github.com/gin-gonic/gin"
	"backend/database"
	"backend/controllers"
	"github.com/gin-contrib/cors"
)


func main(){

	router:=gin.Default()

	router.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:5173"}, // Your frontend's origin
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
        AllowCredentials: true, // Allow cookies if needed
    }))

	//Database connection
	database.ConnectDatabase()

	if database.DB == nil {
		panic("Database connection is not initialized")
	}

	//Handling the routes
	router.POST("/signup",controllers.SignUp)
	router.POST("/login",controllers.Login)
	router.POST("/addcontact",controllers.AddContact)
	router.GET("/getcontacts/:userId",controllers.GetContacts)
	router.DELETE("/deletecontact/:id", controllers.DeleteContact)
	router.PUT("/updatecontact", controllers.UpdateContact)
	router.GET("/archivecontacts/:userId",controllers.ArchiveContact)

	router.Run(":8080")

} 