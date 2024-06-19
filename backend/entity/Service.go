package entity

import (
	// "time"
	//"github.com/asaskevich/govalidator"

	"gorm.io/gorm"
)

// ประเภทบริการ เช่น ทำผม ทำเล็บ ทำสปาหน้า
type ServiceType struct {
	gorm.Model
	Name string
	Employee []Employee `gorm:"foreignKey:ServiceTypeID"`

	Service []Service `gorm:"foreignKey:ServiceTypeID"`
	Booking []Booking `gorm:"foreignKey:ServiceTypeID"`
}

// บริการต่างๆ เช่น ตัดผม สระ/ไดร์ ย้อมสีผม ดัดผม ยืดผม ทาสีเจล เพ้นต์เล็บ ต่อเล็บ สปาหน้า
type Service struct {
	gorm.Model
	Service_Name string
	Price        int

	ServiceTypeID int
	ServiceType   ServiceType `gorm:"references:ID"`

	TimeService []TimeService `gorm:"foreignKey:ServiceID"`

}

// เวลาที่สามารถเข้าใช้บริกาาต่างๆได้
type TimeService struct {
	gorm.Model
	Start_End string

	ServiceID int
	Service   Service `gorm:"references:ID"`

}

