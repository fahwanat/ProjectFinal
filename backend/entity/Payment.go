package entity

import (
	"time"

	"gorm.io/gorm"
)

type Method struct {
	gorm.Model
	Name            string
	Destination     string
	PaymentMethodID int
	PaymentMethod   PaymentMethod `gorm:"references:ID"`
	Payment         []Payment     `gorm:"foreignKey:MethodID"`
}

type PaymentMethod struct {
	gorm.Model
	Name    string
	Method  []Method  `gorm:"foreignKey:PaymentMethodID"`
	Payment []Payment `gorm:"foreignKey:PaymentMethodID"`
}

type Payment struct {
	gorm.Model
	MemberID int    `valid:"required~Please Login"`
	Member   Member `valid:"-" gorm:"references:id"`

	PaymentMethodID int
	PaymentMethod   PaymentMethod `gorm:"references:ID"`

	MethodID int    `valid:"required~กรุณาเลือกช่องทางชำระเงิน"`
	Method   Method `gorm:"references:ID"`

	Price   int `valid:"required~Price not found"`
	Time    time.Time
	Picture string
}
