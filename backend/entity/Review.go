package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

// สร้างตารางชื่อ Review เป็นตารางหลัก
type Review struct {
	gorm.Model

	Comment     string `valid:"matches([a-zA-Z0-9ก-๙]$)~Comment no special characters,stringlength(0|200)~Comment length must be between 0 - 200,required~Comment not blank"`
	Star        int
	Reviewdate  time.Time
	Reviewimage string `valid:"image_valid~Invalid Image"`

	// MemberID ทำหน้าที่เป็น FK
	MemberID *uint  `valid:"-"`
	Member   Member `gorm:"references:ID" valid:"-"`
}

func init() {
	govalidator.TagMap["image_valid"] = govalidator.Validator(func(str string) bool {
		return govalidator.Matches(str, "^(data:image(.+);base64,.+)$")
	})
}
