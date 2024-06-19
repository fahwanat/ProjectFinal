package entity

import (
	// "time"

	// "github.com/asaskevich/govalidator"
	"time"

	"gorm.io/gorm"
)

type Booking struct {
	gorm.Model
	Booking_Number string
	Tx_No          string    `gorm:"uniqueIndex"`
	BookingDate    time.Time `valid:"วันที่ไม่ถูกต้อง"`

	// //รับเข้ามา
	// EmployeeID *uint  `valid:"required~กรุณาเลือกช่าง"`
	// Employee   Employee `valid:"-" gorm:"references:id"`

	//รับเข้ามา
	MemberID *uint  `valid:"required~กรุณาเข้าสู่ระบบ"`
	Member   Member `valid:"-" gorm:"references:id"`

	//รับเข้ามา
	ServiceID *uint   `valid:"required~กรุณาเลือกบริการ"`
	Service   Service `valid:"-" gorm:"references:id"`

	ServiceTypeID *uint       `valid:"required~กรุณาเลือกประเภทบริการ"`
	ServiceType   ServiceType `valid:"-" gorm:"references:id"`

	TimeServiceID *uint       `valid:"required~กรุณาเลือกช่วงเวลาเข้าใช้บริการ"`
	TimeService   TimeService `valid:"-" gorm:"references:id"`

	EmployeeID *uint    
	Employee   Employee `valid:"-" gorm:"references:id"`

	Total float64
}
