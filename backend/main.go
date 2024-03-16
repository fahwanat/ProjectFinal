package main

import (
	"os"

	"github.com/fahwanat/ProjectFinal/controller"
	booking "github.com/fahwanat/ProjectFinal/controller/Booking"
	employee "github.com/fahwanat/ProjectFinal/controller/Manage"
	member "github.com/fahwanat/ProjectFinal/controller/Member"
	service "github.com/fahwanat/ProjectFinal/controller/Service"
	"github.com/fahwanat/ProjectFinal/entity"
	"github.com/fahwanat/ProjectFinal/middlewares"
	"github.com/gin-gonic/gin"
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

			router.GET("/employees", employee.ListEmployees)
			router.GET("/employee/:id", employee.GetEmployee)
			router.GET("employees/officer/:id", employee.ListEmplooyeeByUID)
			router.GET("/employees/service_type/:id", employee.ListEmployeeBySID)
			router.POST("/employees", employee.CreateEmployee)
			router.PATCH("/employees", employee.UpdateEmployee)
			router.DELETE("/employees/:id", employee.DeleteEmployee)

			//============Service Routes
			router.GET("/services_types", service.ListServiceTypes)
			router.GET("/service_types/:id", service.GetServiceType)
			router.GET("/services/service_type/:id", service.ListServicesByBID)
			router.GET("/services/:id", service.GetService)
			router.GET("/time_services/service/:id", service.ListTimeServiceByBID)
			router.GET("/time_services/:id", service.GetTimeService)

			// router.GET("/service_types", service.ListServiceTypes)
			// router.GET("/service_types/:id", service.GetServiceType)
			// router.POST("/service_types", service.CreateServiceType)

			//============Booking Routes
			router.GET("/bookings", booking.ListBookings)
			router.GET("/bookings/:id", booking.GetBooking)
			router.GET("/bookings/member/:id", booking.ListBookingsByUID)
			router.POST("/bookings", booking.CreateBooking)
			router.PATCH("/bookings/:id", booking.UpdateBooking)
			router.DELETE("/bookings/:id", booking.DeleteBooking)
			router.DELETE("/bookings/member/:id", booking.DeleteBookingByCID)
			router.GET("/bookingsbydate", booking.ListBookingsBydate)
			router.GET("/bookingstotalgroupbydate", booking.ListBookingsTotalbyCID)
		

		}
	}
	r.POST("/login", controller.Login)
	r.Run()
}
