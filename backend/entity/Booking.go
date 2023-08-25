package entity

import (
	"time"

	//"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

// type Branch struct {
// 	gorm.Model
// 	//B_name string
// 	// ส่งไป
// 	Bookings []Booking `gorm:"foreignKey:BranchID"`
// }

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

	Time    time.Time `valid:"วันที่และเวลาไม่ถูกต้อง"`
	//Stop    time.Time `valid:"required~กรุณาเลือกวันที่สิ้นสุดการพัก, IsAfterStartOneDay~เวลาสิ้นสุดการพักต้องอยู่หลังวันเข้าพักอย่างน้อย 1 วัน"`
	Total   float64
	//DayEach time.Time
	//รับเข้ามา
	MemberID *uint  `valid:"required~กรุณาเข้าสู่ระบบ"`
	Member   Member `valid:"-" gorm:"references:id"`

	//CheckInOut []CheckInOut `gorm:"foreignKey:BookingID"`
}

// func init() {
// 	govalidator.CustomTypeTagMap.Set("IsAfterAndPresent", func(i interface{}, context interface{}) bool {
// 		t := i.(time.Time)
// 		return t.After(time.Now().AddDate(0, 0, -1)) // today ->
// 	})

// 	govalidator.CustomTypeTagMap.Set("IsAfterStartOneDay", func(i interface{}, context interface{}) bool {
// 		t := i.(time.Time)
// 		b := context.(Booking)
// 		return t.After(b.Start) //Start ->
// 	})
// }
