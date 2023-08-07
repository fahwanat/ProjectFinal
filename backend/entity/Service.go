package entity

import (

	//"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

//	type Staff struct {
//		gorm.Model
//		Name     string
//		Email    string `gorm:"uniqueIndex"`
//		Password string
//		Rooms    []Room `gorm:"foreignKey:StaffID"`
//	}

type ServiceType struct {
	gorm.Model
	Name     string
	Services []Service `gorm:"foreignKey:ServiceTypeID"`
}

type Service struct {
	gorm.Model
	Name   string `valid:"required~Name not blank"`
	Amount int    `valid:"required~กรุณากรอกราคา, range(0|9223372036854775807)~กรุณากรอกราคาเป็นจำนวนเต็มบวก"`

	EmployeeID *uint
	Employee   Employee `valid:"-" gorm:"references:id"`

	//ServiceTypeID ทำหน้าที่เป็น FK
	ServiceTypeID *uint
	ServiceType   ServiceType `valid:"-" gorm:"references:id"`
}
