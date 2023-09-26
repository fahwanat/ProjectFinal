package entity

import (

	"time"
	//"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

//	type Staff struct {
	// 	gorm.Model
	// 	Name     string
	// 	Email    string `gorm:"uniqueIndex"`
	// 	Password string
	// 	Rooms    []Room `gorm:"foreignKey:StaffID"`
	// }


// type ServiceType struct {
// 	gorm.Model
// 	Name     string
// 	Services []Service `gorm:"foreignKey:ServiceTypeID"`
// }

// type Hair struct {
// 	gorm.Model
// 	Name     string
// 	Price    int
// 	Services []Service `gorm:"foreignKey:ServiceTypeID"`
// }

// type Nail struct {
// 	gorm.Model
// 	Name     string
// 	Price    int
// 	Services []Service `gorm:"foreignKey:ServiceTypeID"`
// }

// type Facial struct {
// 	gorm.Model
// 	Name     string
// 	Price    int
// 	Services []Service `gorm:"foreignKey:ServiceTypeID"`
// }

type Service struct {
	gorm.Model
	Name   string `valid:"required~Name not blank"`
	Time        time.Time
	Price int    `valid:"required~กรุณากรอกราคา, range(0|9223372036854775807)~กรุณากรอกราคาเป็นจำนวนเต็มบวก"`


	MemberID      int           `valid:"required~Please Login"`
	Member        Member      `valid:"-" gorm:"references:id"`

	EmployeeID *uint
	Employee   Employee `valid:"-" gorm:"references:id"`

	Bookings  []Booking   `gorm:"foreignKey:ServiceID"`
	
	
	//HairID ทำหน้าที่เป็น FK
	// HairID *uint
	// Hair   Hair `valid:"-" gorm:"references:id"`

	//NailID ทำหน้าที่เป็น FK
	// NailID *uint
	// Nail   Nail `valid:"-" gorm:"references:id"`

	//FacialID ทำหน้าที่เป็น FK
	// FacialID *uint
	// Facial   Facial `valid:"-" gorm:"references:id"`
	
	//ServiceTypeID ทำหน้าที่เป็น FK
// 	ServiceTypeID *uint
// 	ServiceType   ServiceType `valid:"-" gorm:"references:id"`
}
