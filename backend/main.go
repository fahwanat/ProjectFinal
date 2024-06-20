package main

import (
	"os"

	"github.com/fahwanat/ProjectFinal/controller"
	booking "github.com/fahwanat/ProjectFinal/controller/Booking"
	chk_payment "github.com/fahwanat/ProjectFinal/controller/CheckPayment"
	employee "github.com/fahwanat/ProjectFinal/controller/Manage"
	member "github.com/fahwanat/ProjectFinal/controller/Member"
	payment "github.com/fahwanat/ProjectFinal/controller/Payment"
	reviewht "github.com/fahwanat/ProjectFinal/controller/Review"
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
			// router.GET("/Service_Type", employee.ListServiceTypes)
			// router.GET("/Service_Type/:id", employee.GetServiceType)

			router.GET("/employees", employee.ListEmployees)
			router.GET("/employee/:id", employee.GetEmployee)
			router.GET("employees/officer/:id", employee.ListEmplooyeeByUID)
			router.GET("/employees/service_type/:id", employee.ListEmployeeBySID)
			router.POST("/employees", employee.CreateEmployee)
			router.PATCH("/employees", employee.UpdateEmployee)
			router.DELETE("/employees/:id", employee.DeleteEmployee)

			//============Service Routes
			router.GET("/services", service.ListServices)
			router.GET("/services_types", service.ListServiceTypes)
			router.GET("/service_types/:id", service.GetServiceType)
			router.GET("/services/service_type/:id", service.ListServicesByBID)
			router.GET("/services/:id", service.GetService)
			router.GET("/time_services/service/:id", service.ListTimeServiceByBID)
			router.GET("/time_services/:id", service.GetTimeService)
			router.POST("/services", service.CreateService)
			router.PATCH("/services/:id", service.UpdateService)
			router.DELETE("/services/:id", service.DeleteService)
			router.POST("/service/service_types", service.CreateServiceType)

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
			r.GET("/bookings/timeservice", booking.GETBookedTimeServices)
			r.GET("/bookings/timeservices", booking.ListBookedTimeServices)
			router.DELETE("/Bookings/:id", booking.DeleteBookings)

			// ======================================= PAYMENT
			router.GET("/payments", payment.ListPayments)
			router.GET("/payment/:id", payment.GetPayment)
			router.GET("/payment/member/:id", payment.ListPaymentByUID)
			router.POST("/payment", payment.CreatePayment)
			router.PATCH("/payments", payment.UpdatePayment)

			router.GET("/paymentmethods", payment.ListPaymentMethods)
			router.GET("/methods", payment.ListMethods)
			router.GET("/method/:id", payment.GetMethod)
			router.GET("/pricebooking/member/:id", payment.PriceBookingCID)
			router.GET("/priceservice/member/:id", payment.PriceServiceCID)

			//----------review----------------------
			// Review Routes
			r.GET("/Reviews", reviewht.ListReviews)
			router.GET("/Review/:id", reviewht.GetReview)
			router.POST("/Reviews", reviewht.CreateReview)
			router.PATCH("/Reviews", reviewht.UpdateReview)
			router.DELETE("/Reviews/:id", reviewht.DeleteReview)

			//=================================================== Check Payment Routes
			router.GET("/chk_payments", chk_payment.ListCHK_Payments)
			router.GET("/chk_payment/:id", chk_payment.GetCHK_Payment)
			router.POST("/chk_payments", chk_payment.CreateCHK_Payment)
			router.PATCH("/chk_payments/:id", chk_payment.UpdateCHK_Payment)
			router.DELETE("/chk_payments/:id", chk_payment.DeleteCHK_Payment)
			// ---Status---
			router.GET("/chk_payment/statuses", chk_payment.ListStatuses)
			router.GET("/chk_payment/status/:id", chk_payment.GetStatus)
			router.POST("/chk_payment/statuses", chk_payment.CreateStatus)
			router.PATCH("/chk_payment/statuses", chk_payment.UpdateStatus)
			router.DELETE("/chk_payment/statuses/:id", chk_payment.DeleteStatus)
			//=================================================== Check Payment Routes
		}
	}
	r.POST("/login", controller.Login)
	r.Run()
}
