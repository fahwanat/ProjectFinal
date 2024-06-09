package entity

import (
	"gorm.io/gorm"
)

type Gender struct {
	gorm.Model
	G_Name string
	Member []Member `gorm:"foreignKey:GenderID"`
}
type Prefix struct {
	gorm.Model
	Prefix_Name string
	Member      []Member `gorm:"foreignKey:PrefixID"`
}

type Member struct {
	gorm.Model
	FirstName string `valid:"required~FirstName not blank"`
	LastName  string `valid:"required~LastName not blank"`
	Nickname  string `valid:"required~Nickname not blank"`
	Age       int    `valid:"required~กรุณาระบุอายุ, range(0|150)~อายุไม่สามารถติดลบได้"`
	Password  string `valid:"minstringlength(8)~Password must be more than or equal to 8 characters,matches([A-Z])~Password must contain at least 1 character A-Z.,required~Password not blank"`
	Phone     string `valid:"matches(^(0)([0-9]{9})$)~Phonenumber is not valid,required~Tel not blank"`
	Line      string

	SigninID *uint  `valid:"-"`
	Signin   Signin `gorm:"references:ID" valid:"-"`

	PrefixID *uint  `valid:"required~Please select Prefix"`
	Prefix   Prefix `valid:"-" gorm:"references:id"`

	GenderID *uint  `valid:"required~Please select Gender"`
	Gender   Gender `valid:"-" gorm:"references:id"`

	Booking []Booking `gorm:"foreignKey:MemberID"`
}
