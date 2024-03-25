package entity

import (
	"crypto/md5"
	"fmt"
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// เข้ารหัส
func SetupPasswordHash(pwd string) string {
	var password, _ = bcrypt.GenerateFromPassword([]byte(pwd), 14)
	return string(password)
}

func SetupIntoDatabase(db *gorm.DB) {
	//ระบบจัดการข้อมูลพนักงาน

	//ตำแหน่ง
	Officerrole := UserRole{
		RoleName: "Officer",
	}
	db.Model(&UserRole{}).Create(&Officerrole)

	Technicianrole := UserRole{
		RoleName: "Technician",
	}
	db.Model(&UserRole{}).Create(&Technicianrole)

	Memberrole := UserRole{
		RoleName: "Member",
	}
	db.Model(&UserRole{}).Create(&Memberrole)

	//Officer login
	loginOfficer1 := Signin{
		Username: "OFNatcha",
		Password: SetupPasswordHash("Natcha01"),
		UserRole: Officerrole,
	}
	db.Model(&Signin{}).Create(&loginOfficer1)

	loginOfficer2 := Signin{
		Username: "OFPhariphat",
		Password: SetupPasswordHash("Phariphat02"),
		UserRole: Officerrole,
	}
	db.Model(&Signin{}).Create(&loginOfficer2)

	//Technician login
	loginTechnician1 := Signin{
		Username: "TManikan",
		Password: SetupPasswordHash("Manikan01"),
		UserRole: Technicianrole,
	}
	db.Model(&Signin{}).Create(&loginTechnician1)

	loginTechnician2 := Signin{
		Username: "TNapaporn",
		Password: SetupPasswordHash("Napaporn02"),
		UserRole: Technicianrole,
	}
	db.Model(&Signin{}).Create(&loginTechnician2)

	loginTechnician3 := Signin{
		Username: "TSomphorn",
		Password: SetupPasswordHash("Somphorn03"),
		UserRole: Technicianrole,
	}
	db.Model(&Signin{}).Create(&loginTechnician3)

	loginTechnician4 := Signin{
		Username: "TApinya",
		Password: SetupPasswordHash("Apinya04"),
		UserRole: Technicianrole,
	}
	db.Model(&Signin{}).Create(&loginTechnician4)

	loginTechnician5 := Signin{
		Username: "TNatthika",
		Password: SetupPasswordHash("Natthika05"),
		UserRole: Technicianrole,
	}
	db.Model(&Signin{}).Create(&loginTechnician5)

	loginTechnician6 := Signin{
		Username: "TPraani",
		Password: SetupPasswordHash("Praani06"),
		UserRole: Technicianrole,
	}
	db.Model(&Signin{}).Create(&loginTechnician6)

	loginTechnician7 := Signin{
		Username: "TJittima",
		Password: SetupPasswordHash("Jittima07"),
		UserRole: Technicianrole,
	}
	db.Model(&Signin{}).Create(&loginTechnician7)

	// Set Data Officer
	db.Model(&Officer{}).Create(&Officer{
		Officername: "Natcha Sukjai",
		Tel:         "0981522594",
		Department:  "Counter",
		Signin:      loginOfficer1,
	})
	db.Model(&Officer{}).Create(&Officer{

		Officername: "Phariphat Srisuk",
		Tel:         "0981521111",
		Department:  "Counter",
		Signin:      loginOfficer2,
	})

	//Set Data Department
	db.Model(&Department{}).Create(&Department{
		Name: "Technician",
	})
	db.Model(&Department{}).Create(&Department{
		Name: "Counter",
	})

	//Set Data Position
	db.Model(&Position{}).Create(&Position{
		Name: "Hairdresser",
	})
	db.Model(&Position{}).Create(&Position{
		Name: "Nail Artist",
	})
	db.Model(&Position{}).Create(&Position{
		Name: "Facial Therapist",
	})

	//Set Data officer

	var OFNatcha Officer
	var OFPhariphat Officer
	db.Raw("SELECT * FROM officers WHERE officername = ?", "Natcha Sukjai").Scan(&OFNatcha)
	db.Raw("SELECT * FROM officers WHERE  officername = ?", "Phariphat Srisuk").Scan(&OFPhariphat)

	var Technician Department
	var Counter Department
	db.Raw("SELECT * FROM departments WHERE name = ?", "Technician").Scan(&Technician)
	db.Raw("SELECT * FROM departments WHERE name = ?", "Counter").Scan(&Counter)

	var Hair Position
	var Nail Position
	var Facial Position
	db.Raw("SELECT * FROM positions WHERE name = ?", "Hairdresser").Scan(&Hair)
	db.Raw("SELECT * FROM positions WHERE name = ?", "Nail Artist").Scan(&Nail)
	db.Raw("SELECT * FROM positions WHERE name = ?", "Facial Therapist").Scan(&Facial)

	// Service
	// ServiceType Data
	serviceTpyeA := ServiceType{
		Name: "ทำผม",
	}
	db.Model(&ServiceType{}).Create(&serviceTpyeA)

	serviceTpyeB := ServiceType{
		Name: "ทำเล็บ",
	}
	db.Model(&ServiceType{}).Create(&serviceTpyeB)

	serviceTpyeC := ServiceType{
		Name: "ทำสปาหน้า",
	}
	db.Model(&ServiceType{}).Create(&serviceTpyeC)

	var ServiceTypeHair ServiceType
	var ServiceTypeNail ServiceType
	var ServiceTypeSpaFace ServiceType
	db.Raw("SELECT * FROM service_types WHERE name = ?", "ทำผม").Scan(&ServiceTypeHair)
	db.Raw("SELECT * FROM service_types WHERE name = ?", "ทำเล็บ").Scan(&ServiceTypeNail)
	db.Raw("SELECT * FROM service_types WHERE name = ?", "ทำสปาหน้า").Scan(&ServiceTypeSpaFace)

	//Set Data Technician
	db.Model(&Employee{}).Create(&Employee{
		PersonalID:   "1430099536148",
		Employeename: "Manikan Raksa",
		Email:        "Manikan@gmail.com",
		Tusername:    "TManikan",
		Password:     SetupPasswordHash("Manikan01"),
		Position:     Hair,
		Department:   Technician,
		Salary:       17000,
		Phonenumber:  "0905962001",
		Gender:       "Female",
		Officer:      OFNatcha,
		Signin:       loginTechnician1,
		ServiceType:  serviceTpyeA,
	})

	db.Model(&Employee{}).Create(&Employee{
		PersonalID:   "1403614830995",
		Employeename: "Napaporn Onsinit",
		Email:        "Napaporn@gmail.com",
		Tusername:    "TNapaporn",
		Password:     SetupPasswordHash("Napaporn02"),
		Position:     Hair,
		Department:   Technician,
		Salary:       17000,
		Phonenumber:  "0945200105",
		Gender:       "Female",
		Officer:      OFNatcha,
		Signin:       loginTechnician2,
		ServiceType:  serviceTpyeA,
	})

	db.Model(&Employee{}).Create(&Employee{
		PersonalID:   "1460099353148",
		Employeename: "Somphorn Akkaraweerachon",
		Email:        "Somphorn@gmail.com",
		Tusername:    "TSomphorn",
		Password:     SetupPasswordHash("Somphorn03"),
		Position:     Hair,
		Department:   Technician,
		Salary:       17000,
		Phonenumber:  "0952000541",
		Gender:       "Female",
		Officer:      OFNatcha,
		Signin:       loginTechnician3,
		ServiceType:  serviceTpyeA,
	})

	db.Model(&Employee{}).Create(&Employee{
		PersonalID:   "1460099353148",
		Employeename: "Somphorn Akkaraweerachon",
		Email:        "Somphorn@gmail.com",
		Tusername:    "TSomphorn",
		Password:     SetupPasswordHash("Somphorn03"),
		Position:     Hair,
		Department:   Technician,
		Salary:       17000,
		Phonenumber:  "0952000541",
		Gender:       "Female",
		Officer:      OFNatcha,
		Signin:       loginTechnician3,
		ServiceType:  serviceTpyeA,
	})

	db.Model(&Employee{}).Create(&Employee{
		PersonalID:   "1495361300948",
		Employeename: "Apinya Somraksa",
		Email:        "Apinya@gmail.com",
		Tusername:    "TApinya",
		Password:     SetupPasswordHash("Apinya04"),
		Position:     Nail,
		Department:   Technician,
		Salary:       15000,
		Phonenumber:  "0920010545",
		Gender:       "Female",
		Officer:      OFNatcha,
		Signin:       loginTechnician4,
		ServiceType:  serviceTpyeB,
	})

	db.Model(&Employee{}).Create(&Employee{
		PersonalID:   "1340099536148",
		Employeename: "Natthika Suksai",
		Email:        "Natthika@gmail.com",
		Tusername:    "TNatthika",
		Password:     SetupPasswordHash("Natthika05"),
		Position:     Nail,
		Department:   Technician,
		Salary:       15000,
		Phonenumber:  "0910545200",
		Gender:       "Female",
		Officer:      OFPhariphat,
		Signin:       loginTechnician5,
		ServiceType:  serviceTpyeB,
	})

	db.Model(&Employee{}).Create(&Employee{
		PersonalID:   "1484300995361",
		Employeename: "Praani Silapasawat",
		Email:        "Praani@gmail.com",
		Tusername:    "TPraani",
		Password:     SetupPasswordHash("Praani06"),
		Position:     Facial,
		Department:   Technician,
		Salary:       18000,
		Phonenumber:  "0905452561",
		Gender:       "Female",
		Officer:      OFPhariphat,
		Signin:       loginTechnician6,
		ServiceType:  serviceTpyeC,
	})

	db.Model(&Employee{}).Create(&Employee{
		PersonalID:   "1361430099548",
		Employeename: "Jittima Akkaraweerachon",
		Email:        "Jittima@gmail.com",
		Tusername:    "TJittima",
		Password:     SetupPasswordHash("Jittima07"),
		Position:     Facial,
		Department:   Technician,
		Salary:       18000,
		Phonenumber:  "0972456001",
		Gender:       "Female",
		Officer:      OFPhariphat,
		Signin:       loginTechnician7,
		ServiceType:  serviceTpyeC,
	})
	var Manikan Employee
	var Napaporn Employee
	var Somphorn Employee
	var Apinya Employee
	var Natthika Employee
	var Praani Employee
	var Jittima Employee
	db.Raw("SELECT * FROM employees WHERE id  = ?", "1").Scan(&Manikan)
	db.Raw("SELECT * FROM employees WHERE id  = ?", "2").Scan(&Napaporn)
	db.Raw("SELECT * FROM employees WHERE id  = ?", "3").Scan(&Somphorn)
	db.Raw("SELECT * FROM employees WHERE id  = ?", "4").Scan(&Apinya)
	db.Raw("SELECT * FROM employees WHERE id  = ?", "5").Scan(&Natthika)
	db.Raw("SELECT * FROM employees WHERE id  = ?", "6").Scan(&Praani)
	db.Raw("SELECT * FROM employees WHERE id  = ?", "7").Scan(&Jittima)

	// db.Model(&Service{}).Create(&ServiceHair1)
	db.Model(&Service{}).Create(&Service{
		Service_Name: "สระผม/ไดร์ผม",
		ServiceType:  serviceTpyeA,
		Price:        100,
	})
	db.Model(&Service{}).Create(&Service{
		Service_Name: "ตัดผม/ซอยผม",
		ServiceType:  serviceTpyeA,
		Price:        150,
	})
	db.Model(&Service{}).Create(&Service{
		Service_Name: "ย้อมสีผม",
		ServiceType:  serviceTpyeA,
		Price:        300,
	})

	db.Model(&Service{}).Create(&Service{

		Service_Name: "ยืดผม",
		ServiceType:  serviceTpyeA,
		Price:        400,
	})
	//ServiceHair5
	db.Model(&Service{}).Create(&Service{
		Service_Name: "ดัดผม",
		ServiceType:  serviceTpyeA,
		Price:        600,
	})

	//ServiceNail1
	db.Model(&Service{}).Create(&Service{
		Service_Name: "ทาสีเจล",
		ServiceType:  serviceTpyeB,
		Price:        199,
	})
	//ServiceNail2
	db.Model(&Service{}).Create(&Service{
		Service_Name: "เพ้นต์เล็บ",
		ServiceType:  serviceTpyeB,
		Price:        399,
	})
	//ServiceNail3
	db.Model(&Service{}).Create(&Service{
		Service_Name: "ต่อเล็บ",
		ServiceType:  serviceTpyeB,
		Price:        499,
	})

	//ServiceFaceSpa1
	db.Model(&Service{}).Create(&Service{
		Service_Name: "สปาหน้า คอร์ส 799",
		ServiceType:  serviceTpyeC,
		Price:        799,
	})
	//ServiceFace2
	db.Model(&Service{}).Create(&Service{
		Service_Name: "สปาหน้า คอร์ส 999",
		ServiceType:  serviceTpyeC,
		Price:        999,
	})

	var ServiceHair Service
	var ServiceHair2 Service
	var ServiceHair3 Service
	var ServiceHair4 Service
	var ServiceHair5 Service
	db.Raw("SELECT * FROM services WHERE id = ?", "1").Scan(&ServiceHair)
	db.Raw("SELECT * FROM services WHERE id = ?", "2").Scan(&ServiceHair2)
	db.Raw("SELECT * FROM services WHERE id = ?", "3").Scan(&ServiceHair3)
	db.Raw("SELECT * FROM services WHERE id = ?", "4").Scan(&ServiceHair4)
	db.Raw("SELECT * FROM services WHERE id = ?", "5").Scan(&ServiceHair5)
	var ServiceNial Service
	var ServiceNial2 Service
	var ServiceNial3 Service
	db.Raw("SELECT * FROM services WHERE id = ?", "6").Scan(&ServiceNial)
	db.Raw("SELECT * FROM services WHERE id = ?", "7").Scan(&ServiceNial2)
	db.Raw("SELECT * FROM services WHERE id = ?", "8").Scan(&ServiceNial3)
	var ServiceFace1 Service
	var ServiceFace2 Service
	db.Raw("SELECT * FROM services WHERE id = ?", "9").Scan(&ServiceFace1)
	db.Raw("SELECT * FROM services WHERE id = ?", "10").Scan(&ServiceFace2)

	//TimeHair สระ/ไดร์
	TimeService_HairWash := []TimeService{
		//1-18
		{Start_End: "(สระผม/ไดร์ผม)09:00-10:00 น.", ServiceID: 1},
		{Start_End: "(สระผม/ไดร์ผม)10:00-11:00 น.", ServiceID: 1},
		{Start_End: "(สระผม/ไดร์ผม)11:00-12:00 น.", ServiceID: 1},
		{Start_End: "(สระผม/ไดร์ผม)12:00-13:00 น.", ServiceID: 1},
		{Start_End: "(สระผม/ไดร์ผม)13:00-14:00 น.", ServiceID: 1},
		{Start_End: "(สระผม/ไดร์ผม)14:00-15:00 น.", ServiceID: 1},
		{Start_End: "(สระผม/ไดร์ผม)15:00-16:00 น.", ServiceID: 1},
		{Start_End: "(สระผม/ไดร์ผม)16:00-17:00 น.", ServiceID: 1},
		{Start_End: "(สระผม/ไดร์ผม)17:00-18:00 น.", ServiceID: 1},
		{Start_End: "(สระผม/ไดร์ผม)18:00-19:00 น.", ServiceID: 1},
	}
	db.Model(&TimeService{}).Create(&TimeService_HairWash)
	//TimeHair ตัด/ซอย
	TimeService_HairCut := []TimeService{
		//1-18
		{Start_End: "(ตัดผม/ซอยผม)09:00-10:00 น.", ServiceID: 2},
		{Start_End: "(ตัดผม/ซอยผม)10:00-11:00 น.", ServiceID: 2},
		{Start_End: "(ตัดผม/ซอยผม)11:00-12:00 น.", ServiceID: 2},
		{Start_End: "(ตัดผม/ซอยผม)12:00-13:00 น.", ServiceID: 2},
		{Start_End: "(ตัดผม/ซอยผม)13:00-14:00 น.", ServiceID: 2},
		{Start_End: "(ตัดผม/ซอยผม)14:00-15:00 น.", ServiceID: 2},
		{Start_End: "(ตัดผม/ซอยผม)15:00-16:00 น.", ServiceID: 2},
		{Start_End: "(ตัดผม/ซอยผม)16:00-17:00 น.", ServiceID: 2},
		{Start_End: "(ตัดผม/ซอยผม)17:00-18:00 น.", ServiceID: 2},
		{Start_End: "(ตัดผม/ซอยผม)18:00-19:00 น.", ServiceID: 2},
	}
	db.Model(&TimeService{}).Create(&TimeService_HairCut)
	//TimeHair ย้อมสีผม
	TimeService_HairDye := []TimeService{
		//1-18
		{Start_End: "(ย้อมสีผม)09:00-11:00 น.", ServiceID: 3},
		{Start_End: "(ย้อมสีผม)11:00-13:00 น.", ServiceID: 3},
		{Start_End: "(ย้อมสีผม)13:00-15:00 น.", ServiceID: 3},
		{Start_End: "(ย้อมสีผม)15:00-17:00 น.", ServiceID: 3},
		{Start_End: "(ย้อมสีผม)17:00-19:00 น.", ServiceID: 3},
	}
	db.Model(&TimeService{}).Create(&TimeService_HairDye)
	//TimeHair ดัดผม
	TimeService_HairCuling := []TimeService{
		//1-18
		{Start_End: "(ดัดผม)09:00-11:00 น.", ServiceID: 5},
		{Start_End: "(ดัดผม)11:00-13:00 น.", ServiceID: 5},
		{Start_End: "(ดัดผม)13:00-15:00 น.", ServiceID: 5},
		{Start_End: "(ดัดผม)15:00-17:00 น.", ServiceID: 5},
		{Start_End: "(ดัดผม)17:00-19:00 น.", ServiceID: 5},
	}
	db.Model(&TimeService{}).Create(&TimeService_HairCuling)
	//TimeHair ยืดผม
	TimeService_HairStraighten := []TimeService{
		//1-18
		{Start_End: "(ยืดผม)09:00-12:00 น.", ServiceID: 4},
		{Start_End: "(ยืดผม)12:00-15:00 น.", ServiceID: 4},
		{Start_End: "(ยืดผม)15:00-18:00 น.", ServiceID: 4},
	}
	db.Model(&TimeService{}).Create(&TimeService_HairStraighten)
	//TimeNial ทาสีเจล
	TimeService_NailGel := []TimeService{
		//1-18
		{Start_End: "(ทาสีเจล)09:00-10:00 น.", ServiceID: 6},
		{Start_End: "(ทาสีเจล)10:00-11:00 น.", ServiceID: 6},
		{Start_End: "(ทาสีเจล)11:00-12:00 น.", ServiceID: 6},
		{Start_End: "(ทาสีเจล)12:00-13:00 น.", ServiceID: 6},
		{Start_End: "(ทาสีเจล)13:00-14:00 น.", ServiceID: 6},
		{Start_End: "(ทาสีเจล)14:00-15:00 น.", ServiceID: 6},
		{Start_End: "(ทาสีเจล)15:00-16:00 น.", ServiceID: 6},
		{Start_End: "(ทาสีเจล)16:00-17:00 น.", ServiceID: 6},
		{Start_End: "(ทาสีเจล)17:00-18:00 น.", ServiceID: 6},
		{Start_End: "(ทาสีเจล)18:00-19:00 น.", ServiceID: 6},
	}
	db.Model(&TimeService{}).Create(&TimeService_NailGel)
	//TimeNial เพ้นต์เล็บ
	TimeService_NailPiant := []TimeService{
		//1-18
		{Start_End: "(เพ้นต์เล็บ)09:00-10:00 น.", ServiceID: 7},
		{Start_End: "(เพ้นต์เล็บ)10:00-11:00 น.", ServiceID: 7},
		{Start_End: "(เพ้นต์เล็บ)11:00-12:00 น.", ServiceID: 7},
		{Start_End: "(เพ้นต์เล็บ)12:00-13:00 น.", ServiceID: 7},
		{Start_End: "(เพ้นต์เล็บ)13:00-14:00 น.", ServiceID: 7},
		{Start_End: "(เพ้นต์เล็บ)14:00-15:00 น.", ServiceID: 7},
		{Start_End: "(เพ้นต์เล็บ)15:00-16:00 น.", ServiceID: 7},
		{Start_End: "(เพ้นต์เล็บ)16:00-17:00 น.", ServiceID: 7},
		{Start_End: "(เพ้นต์เล็บ)17:00-18:00 น.", ServiceID: 7},
		{Start_End: "(เพ้นต์เล็บ)18:00-19:00 น.", ServiceID: 7},
	}
	db.Model(&TimeService{}).Create(&TimeService_NailPiant)
	//TimeNial เพ้นต์เล็บ
	TimeService_NailExtension := []TimeService{
		//1-18
		{Start_End: "(ต่อเล็บ)09:00-10:00 น.", ServiceID: 8},
		{Start_End: "(ต่อเล็บ)10:00-11:00 น.", ServiceID: 8},
		{Start_End: "(ต่อเล็บ)11:00-12:00 น.", ServiceID: 8},
		{Start_End: "(ต่อเล็บ)12:00-13:00 น.", ServiceID: 8},
		{Start_End: "(ต่อเล็บ)13:00-14:00 น.", ServiceID: 8},
		{Start_End: "(ต่อเล็บ)14:00-15:00 น.", ServiceID: 8},
		{Start_End: "(ต่อเล็บ)15:00-16:00 น.", ServiceID: 8},
		{Start_End: "(ต่อเล็บ)16:00-17:00 น.", ServiceID: 8},
		{Start_End: "(ต่อเล็บ)17:00-18:00 น.", ServiceID: 8},
		{Start_End: "(ต่อเล็บ)18:00-19:00 น.", ServiceID: 8},
	}
	db.Model(&TimeService{}).Create(&TimeService_NailExtension)
	//TimeFaceSpa สปาหน้า 799
	TimeService_FaceSpa799 := []TimeService{
		//1-18
		{Start_End: "(สปาหน้า คอร์ส 799)09:00-11:00 น.", ServiceID: 9},
		{Start_End: "(สปาหน้า คอร์ส 799))11:00-13:00 น.", ServiceID: 9},
		{Start_End: "(สปาหน้า คอร์ส 799))13:00-15:00 น.", ServiceID: 9},
		{Start_End: "(สปาหน้า คอร์ส 799))15:00-17:00 น.", ServiceID: 9},
		{Start_End: "(สปาหน้า คอร์ส 799))17:00-19:00 น.", ServiceID: 9},
	}
	db.Model(&TimeService{}).Create(&TimeService_FaceSpa799)
	//TimeFaceSpa สปาหน้า 99
	TimeService_FaceSpa999 := []TimeService{
		//1-18
		{Start_End: "(สปาหน้า คอร์ส 999))09:00-11:00 น.", ServiceID: 10},
		{Start_End: "(สปาหน้า คอร์ส 999)11:00-13:00 น.", ServiceID: 10},
		{Start_End: "(สปาหน้า คอร์ส 999)13:00-15:00 น.", ServiceID: 10},
		{Start_End: "(สปาหน้า คอร์ส 999)15:00-17:00 น.", ServiceID: 10},
		{Start_End: "(สปาหน้า คอร์ส 999)17:00-19:00 น.", ServiceID: 10},
	}
	db.Model(&TimeService{}).Create(&TimeService_FaceSpa999)

	var TimeServiceHair1 TimeService
	var TimeServiceHair2 TimeService
	var TimeServiceHair3 TimeService
	var TimeServiceHair4 TimeService
	var TimeServiceHair5 TimeService
	var TimeServiceHair6 TimeService
	var TimeServiceHair7 TimeService
	var TimeServiceHair8 TimeService
	var TimeServiceHair9 TimeService
	var TimeServiceHair10 TimeService
	var TimeServiceHair11 TimeService
	var TimeServiceHair12 TimeService
	var TimeServiceHair13 TimeService
	var TimeServiceHair14 TimeService
	var TimeServiceHair15 TimeService
	var TimeServiceHair16 TimeService
	var TimeServiceHair17 TimeService
	var TimeServiceHair18 TimeService
	var TimeServiceHair19 TimeService
	var TimeServiceHair20 TimeService
	var TimeServiceHair21 TimeService
	var TimeServiceHair22 TimeService
	var TimeServiceHair23 TimeService
	var TimeServiceHair24 TimeService
	var TimeServiceHair25 TimeService
	var TimeServiceHair26 TimeService
	var TimeServiceHair27 TimeService
	var TimeServiceHair28 TimeService
	var TimeServiceHair29 TimeService
	var TimeServiceHair30 TimeService
	var TimeServiceHair31 TimeService
	var TimeServiceHair32 TimeService
	var TimeServiceHair33 TimeService
	db.Raw("SELECT * FROM time_services WHERE id = ?", "1").Scan(&TimeServiceHair1)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "2").Scan(&TimeServiceHair2)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "3").Scan(&TimeServiceHair3)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "4").Scan(&TimeServiceHair4)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "5").Scan(&TimeServiceHair5)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "6").Scan(&TimeServiceHair6)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "7").Scan(&TimeServiceHair7)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "8").Scan(&TimeServiceHair8)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "9").Scan(&TimeServiceHair9)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "10").Scan(&TimeServiceHair10)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "11").Scan(&TimeServiceHair11)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "12").Scan(&TimeServiceHair12)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "13").Scan(&TimeServiceHair13)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "14").Scan(&TimeServiceHair14)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "15").Scan(&TimeServiceHair15)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "16").Scan(&TimeServiceHair16)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "17").Scan(&TimeServiceHair17)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "18").Scan(&TimeServiceHair18)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "19").Scan(&TimeServiceHair19)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "20").Scan(&TimeServiceHair20)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "21").Scan(&TimeServiceHair21)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "22").Scan(&TimeServiceHair22)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "23").Scan(&TimeServiceHair23)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "24").Scan(&TimeServiceHair24)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "25").Scan(&TimeServiceHair25)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "26").Scan(&TimeServiceHair26)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "27").Scan(&TimeServiceHair27)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "28").Scan(&TimeServiceHair28)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "29").Scan(&TimeServiceHair29)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "30").Scan(&TimeServiceHair30)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "31").Scan(&TimeServiceHair31)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "32").Scan(&TimeServiceHair32)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "33").Scan(&TimeServiceHair33)
	var TimeServiceNial1 TimeService
	var TimeServiceNial2 TimeService
	var TimeServiceNial3 TimeService
	var TimeServiceNial4 TimeService
	var TimeServiceNial5 TimeService
	var TimeServiceNial6 TimeService
	var TimeServiceNial7 TimeService
	var TimeServiceNial8 TimeService
	var TimeServiceNial9 TimeService
	var TimeServiceNial10 TimeService
	var TimeServiceNial11 TimeService
	var TimeServiceNial12 TimeService
	var TimeServiceNial13 TimeService
	var TimeServiceNial14 TimeService
	var TimeServiceNial15 TimeService
	var TimeServiceNial16 TimeService
	var TimeServiceNial17 TimeService
	var TimeServiceNial18 TimeService
	var TimeServiceNial19 TimeService
	var TimeServiceNial20 TimeService
	var TimeServiceNial21 TimeService
	var TimeServiceNial22 TimeService
	var TimeServiceNial23 TimeService
	var TimeServiceNial24 TimeService
	var TimeServiceNial25 TimeService
	var TimeServiceNial26 TimeService
	var TimeServiceNial27 TimeService
	var TimeServiceNial28 TimeService
	var TimeServiceNial29 TimeService
	var TimeServiceNial30 TimeService
	db.Raw("SELECT * FROM time_services WHERE id = ?", "34").Scan(&TimeServiceNial1)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "35").Scan(&TimeServiceNial2)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "36").Scan(&TimeServiceNial3)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "37").Scan(&TimeServiceNial4)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "38").Scan(&TimeServiceNial5)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "39").Scan(&TimeServiceNial6)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "40").Scan(&TimeServiceNial7)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "41").Scan(&TimeServiceNial8)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "42").Scan(&TimeServiceNial9)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "43").Scan(&TimeServiceNial10)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "44").Scan(&TimeServiceNial11)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "45").Scan(&TimeServiceNial12)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "46").Scan(&TimeServiceNial13)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "47").Scan(&TimeServiceNial14)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "48").Scan(&TimeServiceNial15)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "49").Scan(&TimeServiceNial16)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "50").Scan(&TimeServiceNial17)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "51").Scan(&TimeServiceNial18)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "52").Scan(&TimeServiceNial19)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "53").Scan(&TimeServiceNial20)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "54").Scan(&TimeServiceNial21)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "55").Scan(&TimeServiceNial22)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "56").Scan(&TimeServiceNial23)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "57").Scan(&TimeServiceNial24)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "58").Scan(&TimeServiceNial25)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "59").Scan(&TimeServiceNial26)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "60").Scan(&TimeServiceNial27)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "61").Scan(&TimeServiceNial28)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "62").Scan(&TimeServiceNial29)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "63").Scan(&TimeServiceNial30)
	var TimeServiceFaceSpa1 TimeService
	var TimeServiceFaceSpa2 TimeService
	var TimeServiceFaceSpa3 TimeService
	var TimeServiceFaceSpa4 TimeService
	var TimeServiceFaceSpa5 TimeService
	var TimeServiceFaceSpa6 TimeService
	var TimeServiceFaceSpa7 TimeService
	var TimeServiceFaceSpa8 TimeService
	var TimeServiceFaceSpa9 TimeService
	var TimeServiceFaceSpa10 TimeService
	db.Raw("SELECT * FROM time_services WHERE id = ?", "64").Scan(&TimeServiceFaceSpa1)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "65").Scan(&TimeServiceFaceSpa2)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "66").Scan(&TimeServiceFaceSpa3)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "67").Scan(&TimeServiceFaceSpa4)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "68").Scan(&TimeServiceFaceSpa5)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "69").Scan(&TimeServiceFaceSpa6)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "70").Scan(&TimeServiceFaceSpa7)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "71").Scan(&TimeServiceFaceSpa8)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "72").Scan(&TimeServiceFaceSpa9)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "73").Scan(&TimeServiceFaceSpa10)

	//Member login
	loginMember1 := Signin{
		Username: "Wanatsanan@gmail.com",
		Password: SetupPasswordHash("W12345678"),
		UserRole: Memberrole,
	}
	db.Model(&Signin{}).Create(&loginMember1)
	loginMember2 := Signin{
		Username: "busaracam@gmail.com",
		Password: SetupPasswordHash("B12345678"),
		UserRole: Memberrole,
	}
	db.Model(&Signin{}).Create(&loginMember2)

	//ระบบสมัครสมาชิก
	GenderMale := Gender{
		G_Name: "ชาย",
	}
	db.Model(&Gender{}).Create(&GenderMale)

	GenderFemale := Gender{
		G_Name: "หญิง",
	}
	db.Model(&Gender{}).Create(&GenderFemale)

	GenderOther := Gender{
		G_Name: "อื่นๆ",
	}
	db.Model(&Gender{}).Create(&GenderOther)

	Prefix1 := Prefix{
		Prefix_Name: "นาย",
	}
	db.Model(&Prefix{}).Create(&Prefix1)

	Prefix2 := Prefix{
		Prefix_Name: "นาง",
	}
	db.Model(&Prefix{}).Create(&Prefix2)

	Prefix3 := Prefix{
		Prefix_Name: "นางสาว",
	}
	db.Model(&Prefix{}).Create(&Prefix3)

	//Member

	var Member1 Member
	var Member2 Member
	db.Raw("SELECT * FROM members WHERE id = ?", "1").Scan(&Member1)
	db.Raw("SELECT * FROM members WHERE id = ?", "2").Scan(&Member2)

	password1, _ := bcrypt.GenerateFromPassword([]byte("W12345678"), 14)
	Member1 = Member{
		FirstName: "วนัสนันท์",
		LastName:  "จันทร์มล",
		Nickname:  "ฟ้า",
		Age:       22,
		Email:     "Wanatsanan@gmail.com",
		Password:  string(password1),
		Phone:     "0803299545",
		Gender:    GenderFemale,
		Prefix:    Prefix3,
		Signin:    loginMember1,
	}
	db.Model(&Member{}).Create(&Member1)

	password2, _ := bcrypt.GenerateFromPassword([]byte("B12345678"), 14)
	Member2 = Member{
		FirstName: "บุษราคัม",
		LastName:  "สีเกาะ",
		Nickname:  "บุษ",
		Age:       22,
		Email:     "busaracam@gmail.com",
		Password:  string(password2),
		Phone:     "0954423679",
		Gender:    GenderFemale,
		Prefix:    Prefix3,
		Signin:    loginMember2,
	}
	db.Model(&Member{}).Create(&Member2)

	// ============================================================================ Booking
	//ใส่ไว้ก่อนนะเราต้องใช้เชื่อมกับตาราง checkin-out by joon => patch 21/1/2566 by earth
	start := time.Date(2023, 2, 7, 0, 0, 0, 0, time.UTC)
	stop := time.Date(2023, 2, 8, 0, 0, 0, 0, time.UTC)
	//for grouping
	hashBk_No1 := fmt.Sprintf("%x", md5.Sum([]byte(fmt.Sprintf("%v_%v_%v_%v_%v", stop.Unix(), start.Unix(), ServiceTypeHair.ID, ServiceHair, TimeServiceHair1))))
	// hashBk_No2 := fmt.Sprintf("%x", md5.Sum([]byte(fmt.Sprintf("%v_%v_%v_%v", stop.Unix(), start.Unix(), ServiceNial1.ID))))

	now := time.Now()
	today := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, time.UTC)

	// ===============Booking================ //
	db.Model(&Booking{}).Create(&Booking{
		Booking_Number: hashBk_No1,
		Tx_No:          hashBk_No1,
		// Employee:       Apinya,
		BookingDate: today,

		Member:      Member1,
		ServiceType: ServiceTypeHair,
		Service:     ServiceHair,
		TimeService: TimeServiceHair1,
		Employee:    Manikan,

		Total: float64(ServiceHair.Price),
	})

	var booking1 Booking
	// var newbooking2 Booking
	db.Raw("SELECT * FROM bookings WHERE id = ?", "1").Scan(&booking1)
	// db.Raw("SELECT * FROM bookings WHERE id = ?", "2").Scan(&booking2)

	// ===============Booking================ //
	// 	db.Model(&BookingHair{}).Create(&BookingHair{
	// 		Booking_Number: hashBk_No1,
	// 		Tx_No:          hashBk_No1,
	// 		// Employee:       Apinya,
	// 		BookingDate:    today,

	// 		Member:      Member1,
	// 		ServiceType: ServiceTypeHair,
	// 		Service:     ServiceHair,
	// 		TimeService: TimeServiceHair1,
	// 		Employee:  	 Manikan,

	// 		Total: float64(ServiceHair.Price),
	// 	})

	// 	var bookinghair1 Booking
	// 	// var newbooking2 Booking
	// 	db.Raw("SELECT * FROM booking_hairs WHERE id = ?", "1").Scan(&bookinghair1)
	// 	// db.Raw("SELECT * FROM bookings WHERE id = ?", "2").Scan(&booking2)

	// 	// ===============BookingNial================ //
	// 	db.Model(&BookingNial{}).Create(&BookingNial{
	// 		Booking_Number: hashBk_No1,
	// 		Tx_No:          hashBk_No1,
	// 		// Employee:       Apinya,
	// 		BookingDate:    today,

	// 		Member:      Member2,
	// 		ServiceType: ServiceTypeNail,
	// 		Service:     ServiceNial2,
	// 		TimeService: TimeServiceNial1,
	// 		Employee:   Apinya,

	// 		Total: float64(ServiceHair.Price),
	// 	})

	// 	var bookingnail1 BookingNial
	// 	// var newbooking2 Booking
	// 	db.Raw("SELECT * FROM booking_nials WHERE id = ?", "1").Scan(&bookingnail1)
	// 	// db.Raw("SELECT * FROM bookings WHERE id = ?", "2").Scan(&booking2)

	// 	db.Model(&BookingFaceSpa{}).Create(&BookingFaceSpa{
	// 		Booking_Number: hashBk_No1,
	// 		Tx_No:          hashBk_No1,
	// 		// Employee:       Apinya,
	// 		BookingDate:    today,

	// 		Member:      Member2,
	// 		ServiceType: ServiceTypeSpaFace,
	// 		Service:     ServiceFace1,
	// 		TimeService: TimeServiceFaceSpa1,
	// 		Employee: Jittima,

	// 		Total: float64(ServiceHair.Price),
	// 	})

	// 	var bookingfacespa1 BookingFaceSpa
	// 	// var newbooking2 Booking
	// 	db.Raw("SELECT * FROM booking_face_spas WHERE id = ?", "1").Scan(&bookingfacespa1)
	// 	// db.Raw("SELECT * FROM bookings WHERE id = ?", "2").Scan(&booking2)

	// ===============     PAYMENT     ===============

	// ===============     วิธี     ===============
	// db.Model(&Method{}).Create(&Method{
	// 	Name:            "THB",
	// 	Destination:     "Employee",
	// 	PaymentMethodID: 1,
	// })
	// db.Model(&Method{}).Create(&Method{
	// 	Name:            "USD",
	// 	Destination:     "Employee",
	// 	PaymentMethodID: 1,
	// })
	// db.Model(&Method{}).Create(&Method{
	// 	Name:            "EUR",
	// 	Destination:     "Employee",
	// 	PaymentMethodID: 1,
	// })
	// db.Model(&Method{}).Create(&Method{
	// 	Name:            "Ethereum",
	// 	Destination:     "Asd54f98sadf84sa9d8f49sad4f",
	// 	PaymentMethodID: 2,
	// })
	// db.Model(&Method{}).Create(&Method{
	// 	Name:            "Tether",
	// 	Destination:     "A4s59df4a9s8df489as4f89dsa4",
	// 	PaymentMethodID: 2,
	// })
	// db.Model(&Method{}).Create(&Method{
	// 	Name:            "DogECoin",
	// 	Destination:     "Gfds98g79ds8fgsdf5gs4d65564",
	// 	PaymentMethodID: 2,
	// })
	// db.Model(&Method{}).Create(&Method{
	// 	Name:            "BitCoin",
	// 	Destination:     "S6a5d4sdfsf9asd48f9asd6f24a",
	// 	PaymentMethodID: 2,
	// })
	// ===============     ธนาคาร     ===============
	db.Model(&Method{}).Create(&Method{
		Name:            "PromptPay",
		Destination:     "080-329-9545",
		PaymentMethodID: 2,
	})
	db.Model(&Method{}).Create(&Method{
		Name:            "SCB",
		Destination:     "165-253-6729",
		PaymentMethodID: 2,
	})
	db.Model(&Method{}).Create(&Method{
		Name:            "Krungthai",
		Destination:     "678-512-6355",
		PaymentMethodID: 2,
	})
	db.Model(&Method{}).Create(&Method{
		Name:            "Kasikorn",
		Destination:     "851-956-9877",
		PaymentMethodID: 2,
	})

	var dodgrcoin Method
	db.Raw("SELECT * FROM methods WHERE name = ?", "DogECoin").Scan(&dodgrcoin)

	// ===============     ช่องทางการชำระเงิน     ===============
	db.Model(&PaymentMethod{}).Create(&PaymentMethod{
		Name: "Cash",
	})
	// db.Model(&PaymentMethod{}).Create(&PaymentMethod{
	// 	Name: "Crypto",
	// })
	db.Model(&PaymentMethod{}).Create(&PaymentMethod{
		Name: "Transfer",
	})
	var Transfer PaymentMethod
	db.Raw("SELECT * FROM payment_methods WHERE name = ?", "Transfer").Scan(&Transfer)

	// ===============     ตารางหลัก     ===============
	db.Model(&Payment{}).Create(&Payment{
		Member:        Member1,
		PaymentMethod: Transfer,
		Method:        dodgrcoin,
		Price:         150,
		Time:          time.Now(),
	})
	var payment1 Payment
	db.Raw("SELECT * FROM payments WHERE id = ?", "1").Scan(&payment1) // dump test by earth
}
