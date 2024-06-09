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

// func (s *Service) UnmarshalJSON(data []byte) error {
// 	// สร้าง struct ชั่วคราวเพื่อรับข้อมูล JSON
// 	var aux struct {
// 		Service_Name  string          `json:"Service_Name"`
// 		Price         int             `json:"Price"`
// 		ServiceTypeID json.RawMessage `json:"ServiceTypeID"`
// 	}

// 	if err := json.Unmarshal(data, &aux); err != nil {
// 		return err
// 	}

// 	s.Service_Name = aux.Service_Name
// 	s.Price = aux.Price

// 	// แปลง ServiceTypeID จาก string หรือ number เป็น uint
// 	var id uint64
// 	if err := json.Unmarshal(aux.ServiceTypeID, &id); err != nil {
// 		var idStr string
// 		if err := json.Unmarshal(aux.ServiceTypeID, &idStr); err != nil {
// 			return err
// 		}
// 		if id, err = strconv.ParseUint(idStr, 10, 32); err != nil {
// 			return err
// 		}
// 	}

// 	// idUint := uint(id)
// 	// s.ServiceTypeID = &idUint

// 	return nil
// }

// func main() {
// 	jsonString := `{"Service_Name": "Test Service", "Price": 100, "ServiceTypeID": "123"}`

// 	var service Service
// 	if err := json.Unmarshal([]byte(jsonString), &service); err != nil {
// 		fmt.Println("Error unmarshaling JSON:", err)
// 		return
// 	}

// 	fmt.Printf("Service: %+v\n", service)
// 	// fmt.Printf("ServiceTypeID as uint: %d\n", *service.ServiceTypeID)
// }
