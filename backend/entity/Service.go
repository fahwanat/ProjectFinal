package entity

import (
	// "time"
	//"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

// ประเภทบริการ เช่น ทำผม ทำเล็บ ทำสปาหน้า
type ServiceType struct {
	gorm.Model
	Name string `valid:"required~Name not blank"`
	// Time  time.Time
	// Price int `valid:"required~กรุณากรอกราคา, range(0|9223372036854775807)~กรุณากรอกราคาเป็นจำนวนเต็มบวก"`

	// MemberID int    `valid:"required~Please Login"`
	// Member   Member `valid:"-" gorm:"references:id"`

	Employee []Employee `gorm:"foreignKey:ServiceTypeID"`

	Service []Service `gorm:"foreignKey:ServiceTypeID"`
	Booking []Booking `gorm:"foreignKey:ServiceTypeID"`
	// BookingHair			[]BookingHair	`gorm:"foreignKey:ServiceTypeID"`
	// BookingNial			[]BookingNial	`gorm:"foreignKey:ServiceTypeID"`
	// BookingFaceSpa		[]BookingFaceSpa	`gorm:"foreignKey:ServiceTypeID"`
}

// บริการต่างๆ เช่น ตัดผม สระ/ไดร์ ย้อมสีผม ดัดผม ยืดผม ทาสีเจล เพ้นต์เล็บ ต่อเล็บ สปาหน้า
type Service struct {
	gorm.Model
	Service_Name string
	Price        int

	ServiceTypeID int
	ServiceType   ServiceType `gorm:"references:ID"`

	TimeService []TimeService `gorm:"foreignKey:ServiceID"`
	// BookingHair			[]BookingHair	`gorm:"foreignKey:ServiceID"`
	// BookingNial			[]BookingNial	`gorm:"foreignKey:ServiceID"`
	// BookingFaceSpa		[]BookingFaceSpa	`gorm:"foreignKey:ServiceID"`
}

// เวลาที่สามารถเข้าใช้บริกาาต่างๆได้
type TimeService struct {
	gorm.Model
	Start_End string

	ServiceID int
	Service   Service `gorm:"references:ID"`

	// BookingHair			[]BookingHair	`gorm:"foreignKey:TimeServiceID"`
	// BookingNial			[]BookingNial	`gorm:"foreignKey:TimeServiceID"`
	// BookingFaceSpa		[]BookingFaceSpa	`gorm:"foreignKey:TimeServiceID"`
}
