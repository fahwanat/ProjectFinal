package entity

import (
	// "time"

	//"github.com/asaskevich/govalidator"
	"time"

	"gorm.io/gorm"
)

type TimeBooking struct{
	gorm.Model
	Start_End string
	Booking   	[]Booking  `gorm:"foreignKey:TimeBookingID"`
}

type Booking struct {
	gorm.Model
	Booking_Number string
	Tx_No          string `gorm:"uniqueIndex"`
	//รับเข้ามา
	EmployeeID *uint  `valid:"required~กรุณาเลือกช่าง"`
	Employee   Employee `valid:"-" gorm:"references:id"`
	//รับเข้ามา
	ServiceID *uint   `valid:"required~กรุณาเลือกบริการ"`
	Service   Service `valid:"-" gorm:"references:id"`

	BookingDate	time.Time `valid:"วันที่ไม่ถูกต้อง"`

	TimeBookingID	*uint `valid:"required~กรุณาเลือกช่วงเวลาเข้าใช้บริการ"`
	TimeBooking		TimeBooking `valid:"-" gorm:"references:id"`
	
	Total   float64

	//รับเข้ามา
	MemberID *uint  `valid:"required~กรุณาเข้าสู่ระบบ"`
	Member   Member `valid:"-" gorm:"references:id"`

}
