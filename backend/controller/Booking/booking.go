package controller

import (
	"crypto/md5"
	"fmt"
	"net/http"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/fahwanat/ProjectFinal/entity"
	"github.com/gin-gonic/gin"
)

func CreateBooking(c *gin.Context) {
	var booking entity.Booking
	var member entity.Member
	var service entity.Service
	var employee entity.Employee
	var time_booking entity.TimeBooking
	// var appointment [] interface{};

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร booking
	if err := c.ShouldBindJSON(&booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//9: ค้นหาด้วย id ของ TimeBooking
	if tx := entity.DB().Where("id = ?", booking.TimeBookingID).First(&time_booking); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "TimeBooking not found"})
		return
	}

	// 9: ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", booking.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	// 10: ค้นหา service ด้วย id
	if tx := entity.DB().Where("id = ?", booking.ServiceID).First(&service); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "service not found"})
		return
	}

	// 11: ค้นหา member ด้วย id
	if tx := entity.DB().Where("id = ?", booking.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}	

	//start := time.Date(booking.Start.Year(), booking.Start.Month(), booking.Start.Day(), 0, 0, 0, 0, time.UTC)
	//stop := time.Date(booking.Stop.Year(), booking.Stop.Month(), booking.Stop.Day(), 0, 0, 0, 0, time.UTC)
	//for grouping
	hashBk_No := fmt.Sprintf("%x", md5.Sum([]byte(fmt.Sprintf("%v_%v", service.ID, employee.ID))))

	// Loop over each day in the date range
	//for d := start; d.Before(stop.AddDate(0, 0, 1)); d = d.AddDate(0, 0, 1) {
		// Create a hash string from the room_id and dayeach
	hashTx_No := fmt.Sprintf("%x", md5.Sum([]byte(fmt.Sprintf("%v_%v",service.ID, employee.ID))))
	//Create a booking for each day
	// 12: สร้าง Booking	
	bk := entity.Booking{
		Booking_Number: hashBk_No,
		Tx_No:          hashTx_No,
		Employee:       employee,
		Service: 		service,

		BookingDate:    booking.BookingDate,
		TimeBooking: 	time_booking,

			// Time:     booking.Time,
			//Stop:    stop,
		Member:  		member,
		Total:   		float64(service.Price),	
			//DayEach: d,
	}



// Save the booking to the database
	//13: save
	if err := entity.DB().Create(&bk).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
		}
	
	c.JSON(http.StatusCreated, gin.H{"data": bk})
}

// GET /booking/:id
func GetBooking(c *gin.Context) {
	id := c.Param("id")
	var bookings struct {
		TotalAmount float64
		Num_Of_Day  int
		entity.Booking
	}
	if err := entity.DB().Preload("TimeBooking").Preload("Employee").Preload("Service").Preload("Member").Raw("SELECT *, SUM(total) as total_amount, COUNT(booking_number) as Num_Of_Day FROM bookings WHERE id = ? GROUP BY booking_number", id).Find(&bookings).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bookings})
}

// GET /bookings
func ListBookings(c *gin.Context) {
	var b_total []struct {
		TotalAmount float64
		Num_Of_Day  int
		entity.Booking
	}
	if err := entity.DB().Preload("TimeBooking").Preload("Employee").Preload("Service").Preload("Member").Raw("SELECT *, SUM(total) as total_amount, COUNT(booking_number) as Num_Of_Day FROM bookings GROUP BY booking_number").Find(&b_total).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": b_total})
}

// GET /bookings/user/:id
func ListBookingsByUID(c *gin.Context) {
	id := c.Param("id")
	var bookings []struct {
		TotalAmount float64
		Num_Of_Day  int
		entity.Booking
	}

	if err := entity.DB().Preload("TimeBooking").Preload("Employee").Preload("Service").Preload("Member").Raw("SELECT *, SUM(total) as total_amount, COUNT(booking_number) as Num_Of_Day FROM bookings WHERE member_id = ? GROUP BY booking_number", id).Find(&bookings).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bookings})
}

// GET /bookingbydate
func ListBookingsBydate(c *gin.Context) {
	now := time.Now()
	today := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, time.UTC)
	//formattedDate := today.Format("2006-01-02")
	var bookings []struct {
		TotalAmount float64
		Num_Of_Day  int
		entity.Booking
	}
	if err := entity.DB().Preload("TimeBooking").Preload("Employee").Preload("Service").Preload("Member").Raw("SELECT *, SUM(total) as total_amount, COUNT(booking_number) as Num_Of_Day FROM bookings WHERE start = ? GROUP BY booking_number", today).Find(&bookings).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bookings})
}

// GET /bookingtotalgroupbydate
func ListBookingsTotalbyCID(c *gin.Context) {
	var b_total []struct {
		CustomerID  uint64
		TotalAmount float64
	}
	if err := entity.DB().Raw("SELECT *, member_id, SUM(total) as total_amount FROM bookings GROUP BY member_id").Scan(&b_total).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": b_total})
}

// DELETE /bookings/:id
func DeleteBooking(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM bookings WHERE booking_number = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "booking not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// DELETE /bookings/customer/:id
func DeleteBookingByCID(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM bookings WHERE member_id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "booking not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /bookings
func UpdateBooking(c *gin.Context) {
	var booking entity.Booking
	var member entity.Member
	var service entity.Service
	var time_booking entity.TimeBooking
	//var branch entity.Branch

	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&booking); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "newbooking not found"})
		return
	}

	// จำเป็นต้องลบเพราะว่าให้ Hash เมื่อถูกแก้ไขค่า Hash อาจจะเปลียนได้
	if tx := entity.DB().Exec("DELETE FROM bookings WHERE booking_number = ?", booking.Booking_Number); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "booking not found"})
		return
	}

	if err := c.ShouldBindJSON(&booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 10: ค้นหา room ด้วย id
	if tx := entity.DB().Where("id = ?", booking.ServiceID).First(&service); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "service not found"})
		return
	}

	// 11: ค้นหา customer ด้วย id
	if tx := entity.DB().Where("id = ?", booking.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}

	//start := time.Date(booking.Start.Year(), booking.Start.Month(), booking.Start.Day(), 0, 0, 0, 0, time.UTC)
	//stop := time.Date(booking.Stop.Year(), booking.Stop.Month(), booking.Stop.Day(), 0, 0, 0, 0, time.UTC)
	//for grouping
	hashBk_No := fmt.Sprintf("%x", md5.Sum([]byte(fmt.Sprintf("%v_%v_%v_%v", service.ID))))

	/// Loop over each day in the date range
	//for d := start; d.Before(stop.AddDate(0, 0, 1)); d = d.AddDate(0, 0, 1) {
		// Create a hash string from the room_id and dayeach
	hashTx_No := fmt.Sprintf("%x", md5.Sum([]byte(fmt.Sprintf("%v_%v", service.ID))))
		// Create a booking for each day
		// 12: สร้าง Booking
		bk := entity.Booking{
			Booking_Number: hashBk_No,
			Tx_No:          hashTx_No,
			//Branch:         branch,
			Service: service,

			BookingDate: booking.BookingDate,
			TimeBooking: time_booking,

			// Time:     booking.Time,
			//Stop:    stop,
			Member:  member,
			Total:   float64(service.Price),
			//DayEach: d,
		}

		// Save the booking to the database
		//13: save
		if err := entity.DB().Create(&bk).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	
	c.JSON(http.StatusCreated, gin.H{"data": booking})
}

