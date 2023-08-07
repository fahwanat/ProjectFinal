package main

import (
	"os"

	"github.com/fahwanat/ProjectFinal/controller"
	member "github.com/fahwanat/ProjectFinal/controller/Member"
	employee "github.com/fahwanat/ProjectFinal/controller/Manage"
	service "github.com/fahwanat/ProjectFinal/controller/Service"

	"github.com/gin-gonic/gin"
	"github.com/fahwanat/ProjectFinal/entity"
	"github.com/fahwanat/ProjectFinal/middlewares"
)


func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, PATCH, DELETE")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}

func main() {

	// Delete database file before BUILD and RUN
	os.Remove("./salon.db")
	
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())

	/////////////////////////////////////////////////////////////

	//r.POST("/admin_Login", controller.Admin_Login)

	//r.POST("/Student_Login", controller.Student_Login)

	api := r.Group("")
	{
		router := api.Use(middlewares.Authorizes())
		{
			//==================================================Member Routes
			router.GET("/members", member.ListMembers)
			router.GET("/member/:id", member.GetMemberByID)
			r.POST("/members", member.CreateMember)
			router.PATCH("/membersupdate/:id", member.UpdateMember)
			router.DELETE("/delete_members/:id", member.DeleteMembers)
			//Gender
			r.GET("/members/genders", member.ListGender)
			router.GET("/members/genders/:id", member.GetGender)
			router.POST("/members/genders", member.CreateGender)
			router.PATCH("/members/genders", member.UpdateGender)
			router.DELETE("/members/genders/:id", member.DeleteGender)
			//Prefixe
			r.GET("/prefixes", member.ListPrefix)
			router.GET("/member/prefixes/:id", member.GetPrefix)
			router.POST("/members/prefixes", member.CreatePrefix)
			router.PATCH("/members/prefixes", member.UpdatePrefix)
			router.DELETE("/members/prefixes/:id", member.DeletePrefix)

			// Officer Routes
			router.GET("/Officers", employee.ListOfficers)
			router.GET("/Officer/:id", employee.GetOfficer)

			router.GET("/Departments", employee.ListDepartments)
			router.GET("/Department/:id", employee.GetDepartment)

			router.GET("/Positions", employee.ListPositions)
			router.GET("/Position/:id", employee.GetPosition)

			router.GET("/Employees", employee.ListEmployees)
			router.GET("/Employee/:id", employee.GetEmployee)
			router.GET("Employees/officer/:id", employee.ListEmplooyeeByUID)
			router.POST("/Employees", employee.CreateEmployee)
			router.PATCH("/Employees", employee.UpdateEmployee)
			router.DELETE("/Employees/:id", employee.DeleteEmployee)

			//==================================================Service Routes
			router.GET("/services", service.ListServices)
			router.GET("/service/:id", service.GetService)
			router.POST("/services", service.CreateService)
			router.PUT("/services", service.UpdateService)
			router.DELETE("/services/:id", service.DeleteService)

			router.GET("/service_types", service.ListServiceTypes)
			router.GET("/service_types/:id", service.GetServiceType)
			router.POST("/service_types", service.CreateServiceType)
			
}
	}
	r.POST("/login", controller.Login)
	r.Run()
}