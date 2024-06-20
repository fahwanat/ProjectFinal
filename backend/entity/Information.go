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
		Name: "สระ/ไดร์",
	})
	db.Model(&Position{}).Create(&Position{
		Name: "ตัด/ซอย",
	})
	db.Model(&Position{}).Create(&Position{
		Name: "ย้อมสีผม",
	})
	db.Model(&Position{}).Create(&Position{
		Name: "ดัดผม",
	})
	db.Model(&Position{}).Create(&Position{
		Name: "ยืดผม",
	})

	db.Model(&Position{}).Create(&Position{
		Name: "ทาสีเจล",
	})
	db.Model(&Position{}).Create(&Position{
		Name: "เพ้นต์เล็บ",
	})
	db.Model(&Position{}).Create(&Position{
		Name: "ต่อเล็บ",
	})
	db.Model(&Position{}).Create(&Position{
		Name: "โปรแกรมนวดหน้า",
	})
	db.Model(&Position{}).Create(&Position{
		Name: "โปรแกรมสปาหน้า",
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

	var Hair1 Position
	var Hair2 Position
	var Hair3 Position
	var Hair4 Position
	var Hair5 Position
	var Nail1 Position
	var Nail2 Position
	var Nail3 Position
	var Facial1 Position
	var Facial2 Position
	db.Raw("SELECT * FROM positions WHERE id  = ?", "1").Scan(&Hair1)
	db.Raw("SELECT * FROM positions WHERE id  = ?", "2").Scan(&Hair2)
	db.Raw("SELECT * FROM positions WHERE id  = ?", "3").Scan(&Hair3)
	db.Raw("SELECT * FROM positions WHERE id  = ?", "4").Scan(&Hair4)
	db.Raw("SELECT * FROM positions WHERE id  = ?", "5").Scan(&Hair5)
	db.Raw("SELECT * FROM positions WHERE id  = ?", "6").Scan(&Nail1)
	db.Raw("SELECT * FROM positions WHERE id  = ?", "7").Scan(&Nail2)
	db.Raw("SELECT * FROM positions WHERE id  = ?", "8").Scan(&Nail3)
	db.Raw("SELECT * FROM positions WHERE id  = ?", "9").Scan(&Facial1)
	db.Raw("SELECT * FROM positions WHERE id  = ?", "10").Scan(&Facial2)

	// ServiceType Data
	serviceTpyeA1 := ServiceType{
		Name: "ทำผม(สระ/ไดร์)",
	}
	db.Model(&ServiceType{}).Create(&serviceTpyeA1)
	serviceTpyeA2 := ServiceType{
		Name: "ทำผม(ตัด/ซอย)",
	}
	db.Model(&ServiceType{}).Create(&serviceTpyeA2)
	serviceTpyeA3 := ServiceType{
		Name: "ทำผม(ย้อมสีผม)",
	}
	db.Model(&ServiceType{}).Create(&serviceTpyeA3)
	serviceTpyeA4 := ServiceType{
		Name: "ทำผม(ดัดผม)",
	}
	db.Model(&ServiceType{}).Create(&serviceTpyeA4)
	serviceTpyeA5 := ServiceType{
		Name: "ทำผม(ยืดผม)",
	}
	db.Model(&ServiceType{}).Create(&serviceTpyeA5)

	serviceTpyeB1 := ServiceType{
		Name: "ทำเล็บ(ทาสีเจล)",
	}
	db.Model(&ServiceType{}).Create(&serviceTpyeB1)
	serviceTpyeB2 := ServiceType{
		Name: "ทำเล็บ(เพ้นต์เล็บ)",
	}
	db.Model(&ServiceType{}).Create(&serviceTpyeB2)
	serviceTpyeB3 := ServiceType{
		Name: "ทำเล็บ(ต่อเล็บ)",
	}
	db.Model(&ServiceType{}).Create(&serviceTpyeB3)

	serviceTpyeC1 := ServiceType{
		Name: "ทำหน้า(โปรแกรมนวดหน้า)",
	}
	db.Model(&ServiceType{}).Create(&serviceTpyeC1)
	serviceTpyeC2 := ServiceType{
		Name: "ทำหน้า(โปรแกรมนวดหน้า)",
	}
	db.Model(&ServiceType{}).Create(&serviceTpyeC2)

	var ServiceTypeHair ServiceType
	var ServiceTypeNail ServiceType
	var ServiceTypeSpaFace ServiceType
	db.Raw("SELECT * FROM service_types WHERE name = ?", "ทำผม").Scan(&ServiceTypeHair)
	db.Raw("SELECT * FROM service_types WHERE name = ?", "ทำเล็บ").Scan(&ServiceTypeNail)
	db.Raw("SELECT * FROM service_types WHERE name = ?", "ทำสปาหน้า").Scan(&ServiceTypeSpaFace)

	//Set Data Technician
	//1
	db.Model(&Employee{}).Create(&Employee{
		PersonalID:   "1430099536148",
		Employeename: "มานิกัน รักษา",
		Email:        "Manikan@gmail.com",
		Tusername:    "TManikan",
		Password:     SetupPasswordHash("Manikan01"),
		Position:     Hair1,
		Department:   Technician,
		Salary:       17000,
		Phonenumber:  "0905962001",
		Gender:       "Female",
		Officer:      OFNatcha,
		Signin:       loginTechnician1,
		ServiceType:  serviceTpyeA1,
	})
	//2
	db.Model(&Employee{}).Create(&Employee{
		PersonalID:   "1403614830995",
		Employeename: "นภาพร อรสิริ",
		Email:        "Napaporn@gmail.com",
		Tusername:    "TNapaporn",
		Password:     SetupPasswordHash("Napaporn02"),
		Position:     Hair2,
		Department:   Technician,
		Salary:       17000,
		Phonenumber:  "0945200105",
		Gender:       "Female",
		Officer:      OFNatcha,
		Signin:       loginTechnician2,
		ServiceType:  serviceTpyeA2,
	})
	//3
	db.Model(&Employee{}).Create(&Employee{
		PersonalID:   "1460099353148",
		Employeename: "สมพร อัครวีรชน",
		Email:        "Somphorn@gmail.com",
		Tusername:    "TSomphorn",
		Password:     SetupPasswordHash("Somphorn03"),
		Position:     Hair3,
		Department:   Technician,
		Salary:       17000,
		Phonenumber:  "0952000541",
		Gender:       "Female",
		Officer:      OFNatcha,
		Signin:       loginTechnician3,
		ServiceType:  serviceTpyeA3,
	})
	//4
	db.Model(&Employee{}).Create(&Employee{
		PersonalID:   "1470600118775",
		Employeename: "นิสา มานะยิ่ง",
		Email:        "Nisa@gmail.com",
		Tusername:    "TNisa",
		Password:     SetupPasswordHash("Nisama04"),
		Position:     Hair4,
		Department:   Technician,
		Salary:       17000,
		Phonenumber:  "0967741235",
		Gender:       "Female",
		Officer:      OFNatcha,
		Signin:       loginTechnician3,
		ServiceType:  serviceTpyeA4,
	})
	//5
	db.Model(&Employee{}).Create(&Employee{
		PersonalID:   "1460332005112",
		Employeename: "เจนจิรา พัฒนสุข",
		Email:        "Janjira@gmail.com",
		Tusername:    "TJanjira",
		Password:     SetupPasswordHash("Tanjira05"),
		Position:     Hair5,
		Department:   Technician,
		Salary:       17000,
		Phonenumber:  "0913005587",
		Gender:       "Female",
		Officer:      OFNatcha,
		Signin:       loginTechnician3,
		ServiceType:  serviceTpyeA5,
	})
	//6
	db.Model(&Employee{}).Create(&Employee{
		PersonalID:   "1495361300948",
		Employeename: "อภิณญา สมรักษา",
		Email:        "Apinya@gmail.com",
		Tusername:    "TApinya",
		Password:     SetupPasswordHash("Apinya06"),
		Position:     Nail1,
		Department:   Technician,
		Salary:       15000,
		Phonenumber:  "0920010545",
		Gender:       "Female",
		Officer:      OFNatcha,
		Signin:       loginTechnician4,
		ServiceType:  serviceTpyeB1,
	})
	//7
	db.Model(&Employee{}).Create(&Employee{
		PersonalID:   "1340099536148",
		Employeename: "ณัฐฑิกา สุขใส",
		Email:        "Natthika@gmail.com",
		Tusername:    "TNatthika",
		Password:     SetupPasswordHash("Natthika07"),
		Position:     Nail2,
		Department:   Technician,
		Salary:       15000,
		Phonenumber:  "0910545200",
		Gender:       "Female",
		Officer:      OFPhariphat,
		Signin:       loginTechnician5,
		ServiceType:  serviceTpyeB2,
	})
	//8
	db.Model(&Employee{}).Create(&Employee{
		PersonalID:   "13670400116587",
		Employeename: "โอบขวัญ เศรษสิริ",
		Email:        "Obkwhan@gmail.com",
		Tusername:    "TObkwhan",
		Password:     SetupPasswordHash("Obkwhan08"),
		Position:     Nail3,
		Department:   Technician,
		Salary:       15000,
		Phonenumber:  "096732489",
		Gender:       "Female",
		Officer:      OFPhariphat,
		Signin:       loginTechnician5,
		ServiceType:  serviceTpyeB3,
	})
	//9
	db.Model(&Employee{}).Create(&Employee{
		PersonalID:   "1484300995361",
		Employeename: "ปราญานี ศิรพัสวัตน์",
		Email:        "Prayani@gmail.com",
		Tusername:    "TPrayani",
		Password:     SetupPasswordHash("Prayani09"),
		Position:     Facial1,
		Department:   Technician,
		Salary:       18000,
		Phonenumber:  "0905452561",
		Gender:       "Female",
		Officer:      OFPhariphat,
		Signin:       loginTechnician6,
		ServiceType:  serviceTpyeC1,
	})
	//10
	db.Model(&Employee{}).Create(&Employee{
		PersonalID:   "1361430099548",
		Employeename: "จิตติมา ศรีสวัสดิ์",
		Email:        "Jittima@gmail.com",
		Tusername:    "TJittima",
		Password:     SetupPasswordHash("Jittima10"),
		Position:     Facial2,
		Department:   Technician,
		Salary:       18000,
		Phonenumber:  "0972456001",
		Gender:       "Female",
		Officer:      OFPhariphat,
		Signin:       loginTechnician7,
		ServiceType:  serviceTpyeC2,
	})
	var Manikan Employee
	var Napaporn Employee
	var Somphorn Employee
	var Nisa Employee
	var Janjira Employee
	var Apinya Employee
	var Natthika Employee
	var Obkwhan Employee
	var Prayani Employee
	var Jittima Employee
	db.Raw("SELECT * FROM employees WHERE id  = ?", "1").Scan(&Manikan)
	db.Raw("SELECT * FROM employees WHERE id  = ?", "2").Scan(&Napaporn)
	db.Raw("SELECT * FROM employees WHERE id  = ?", "3").Scan(&Somphorn)
	db.Raw("SELECT * FROM employees WHERE id  = ?", "4").Scan(&Nisa)
	db.Raw("SELECT * FROM employees WHERE id  = ?", "5").Scan(&Janjira)
	db.Raw("SELECT * FROM employees WHERE id  = ?", "6").Scan(&Apinya)
	db.Raw("SELECT * FROM employees WHERE id  = ?", "7").Scan(&Natthika)
	db.Raw("SELECT * FROM employees WHERE id  = ?", "8").Scan(&Obkwhan)
	db.Raw("SELECT * FROM employees WHERE id  = ?", "9").Scan(&Prayani)
	db.Raw("SELECT * FROM employees WHERE id  = ?", "10").Scan(&Jittima)

	// db.Model(&Service{}).Create(&ServiceHair1)
	db.Model(&Service{}).Create(&Service{
		Service_Name: "สระ/ไดร์",
		ServiceType:  serviceTpyeA1,
		Price:        100,
	})
	db.Model(&Service{}).Create(&Service{
		Service_Name: "ตัดผม/ซอยผม",
		ServiceType:  serviceTpyeA2,
		Price:        150,
	})
	db.Model(&Service{}).Create(&Service{
		Service_Name: "ย้อมสีผม",
		ServiceType:  serviceTpyeA3,
		Price:        300,
	})
	//ServiceHair5
	db.Model(&Service{}).Create(&Service{
		Service_Name: "ดัดผม",
		ServiceType:  serviceTpyeA4,
		Price:        600,
	})
	db.Model(&Service{}).Create(&Service{

		Service_Name: "ยืดผม",
		ServiceType:  serviceTpyeA5,
		Price:        400,
	})

	//ServiceNail1
	db.Model(&Service{}).Create(&Service{
		Service_Name: "ทาสีเจล",
		ServiceType:  serviceTpyeB1,
		Price:        199,
	})
	//ServiceNail2
	db.Model(&Service{}).Create(&Service{
		Service_Name: "เพ้นต์เล็บ",
		ServiceType:  serviceTpyeB2,
		Price:        399,
	})
	//ServiceNail3
	db.Model(&Service{}).Create(&Service{
		Service_Name: "ต่อเล็บ",
		ServiceType:  serviceTpyeB3,
		Price:        499,
	})

	//ServiceFaceSpa1
	db.Model(&Service{}).Create(&Service{
		Service_Name: "โปรแกรมนวดหน้า",
		ServiceType:  serviceTpyeC1,
		Price:        799,
	})
	//ServiceFace2
	db.Model(&Service{}).Create(&Service{
		Service_Name: "โปรแกรมสปาหน้า",
		ServiceType:  serviceTpyeC2,
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
		//1-20
		{Start_End: "09:00-09:30 น.", ServiceID: 1},
		{Start_End: "09:30-10:00 น.", ServiceID: 1},
		{Start_End: "10:00-10:30 น.", ServiceID: 1},
		{Start_End: "10:30-11:00 น.", ServiceID: 1},
		{Start_End: "11:00-11:30 น.", ServiceID: 1},
		{Start_End: "11:30-12:00 น.", ServiceID: 1},
		{Start_End: "12:00-12:30 น.", ServiceID: 1},
		{Start_End: "12:30-13:00 น.", ServiceID: 1},
		{Start_End: "13:00-13:30 น.", ServiceID: 1},
		{Start_End: "13:30-14:00 น.", ServiceID: 1},
		{Start_End: "14:00-14:30 น.", ServiceID: 1},
		{Start_End: "14:30-15:00 น.", ServiceID: 1},
		{Start_End: "15:00-15:30 น.", ServiceID: 1},
		{Start_End: "15:30-16:00 น.", ServiceID: 1},
		{Start_End: "16:00-16:30 น.", ServiceID: 1},
		{Start_End: "16:30-17:00 น.", ServiceID: 1},
		{Start_End: "17:00-17:30 น.", ServiceID: 1},
		{Start_End: "17:30-18:00 น.", ServiceID: 1},
		{Start_End: "18:00-18:30 น.", ServiceID: 1},
		{Start_End: "18:30-19:00 น.", ServiceID: 1},
	}
	db.Model(&TimeService{}).Create(&TimeService_HairWash)
	//TimeHair ตัด/ซอย
	TimeService_HairCut := []TimeService{
		//1-20
		{Start_End: "09:00-10:00 น.", ServiceID: 2},
		{Start_End: "10:00-11:00 น.", ServiceID: 2},
		{Start_End: "11:00-12:00 น.", ServiceID: 2},
		{Start_End: "12:00-13:00 น.", ServiceID: 2},
		{Start_End: "13:00-14:00 น.", ServiceID: 2},
		{Start_End: "14:00-15:00 น.", ServiceID: 2},
		{Start_End: "15:00-16:00 น.", ServiceID: 2},
		{Start_End: "16:00-17:00 น.", ServiceID: 2},
		{Start_End: "17:00-18:00 น.", ServiceID: 2},
		{Start_End: "18:00-19:00 น.", ServiceID: 2},
	}
	db.Model(&TimeService{}).Create(&TimeService_HairCut)
	//TimeHair ย้อมสีผม
	TimeService_HairDye := []TimeService{
		//1-18
		{Start_End: "09:00-12:00 น.", ServiceID: 3},
		{Start_End: "12:00-15:00 น.", ServiceID: 3},
		{Start_End: "15:00-18:00 น.", ServiceID: 3},
	}
	db.Model(&TimeService{}).Create(&TimeService_HairDye)
	//TimeHair ดัดผม
	TimeService_HairCuling := []TimeService{
		//1-18
		{Start_End: "09:00-12:00 น.", ServiceID: 5},
		{Start_End: "12:00-15:00 น.", ServiceID: 5},
		{Start_End: "15:00-18:00 น.", ServiceID: 5},
	}
	db.Model(&TimeService{}).Create(&TimeService_HairCuling)
	//TimeHair ยืดผม
	TimeService_HairStraighten := []TimeService{
		//1-18
		{Start_End: "09:00-14:00 น.", ServiceID: 4},
		{Start_End: "14:00-19:00 น.", ServiceID: 4},
	}
	db.Model(&TimeService{}).Create(&TimeService_HairStraighten)
	//TimeNial ทาสีเจล
	TimeService_NailGel := []TimeService{
		//1-18
		{Start_End: "09:00-10:00 น.", ServiceID: 6},
		{Start_End: "10:00-11:00 น.", ServiceID: 6},
		{Start_End: "11:00-12:00 น.", ServiceID: 6},
		{Start_End: "12:00-13:00 น.", ServiceID: 6},
		{Start_End: "13:00-14:00 น.", ServiceID: 6},
		{Start_End: "14:00-15:00 น.", ServiceID: 6},
		{Start_End: "15:00-16:00 น.", ServiceID: 6},
		{Start_End: "16:00-17:00 น.", ServiceID: 6},
		{Start_End: "17:00-18:00 น.", ServiceID: 6},
		{Start_End: "18:00-19:00 น.", ServiceID: 6},
	}
	db.Model(&TimeService{}).Create(&TimeService_NailGel)
	//TimeNial เพ้นต์เล็บ
	TimeService_NailPiant := []TimeService{
		//1-18
		{Start_End: "09:00-10:00 น.", ServiceID: 7},
		{Start_End: "10:00-11:00 น.", ServiceID: 7},
		{Start_End: "11:00-12:00 น.", ServiceID: 7},
		{Start_End: "12:00-13:00 น.", ServiceID: 7},
		{Start_End: "13:00-14:00 น.", ServiceID: 7},
		{Start_End: "14:00-15:00 น.", ServiceID: 7},
		{Start_End: "15:00-16:00 น.", ServiceID: 7},
		{Start_End: "16:00-17:00 น.", ServiceID: 7},
		{Start_End: "17:00-18:00 น.", ServiceID: 7},
		{Start_End: "18:00-19:00 น.", ServiceID: 7},
	}
	db.Model(&TimeService{}).Create(&TimeService_NailPiant)
	//TimeNial เพ้นต์เล็บ
	TimeService_NailExtension := []TimeService{
		//1-18
		{Start_End: "09:00-10:00 น.", ServiceID: 8},
		{Start_End: "10:00-11:00 น.", ServiceID: 8},
		{Start_End: "11:00-12:00 น.", ServiceID: 8},
		{Start_End: "12:00-13:00 น.", ServiceID: 8},
		{Start_End: "13:00-14:00 น.", ServiceID: 8},
		{Start_End: "14:00-15:00 น.", ServiceID: 8},
		{Start_End: "15:00-16:00 น.", ServiceID: 8},
		{Start_End: "16:00-17:00 น.", ServiceID: 8},
		{Start_End: "17:00-18:00 น.", ServiceID: 8},
		{Start_End: "18:00-19:00 น.", ServiceID: 8},
	}
	db.Model(&TimeService{}).Create(&TimeService_NailExtension)
	//TimeFaceSpa สปาหน้า 799
	TimeService_FaceSpa799 := []TimeService{
		//1-18
		{Start_End: "09:00-11:00 น.", ServiceID: 9},
		{Start_End: "11:00-13:00 น.", ServiceID: 9},
		{Start_End: "13:00-15:00 น.", ServiceID: 9},
		{Start_End: "15:00-17:00 น.", ServiceID: 9},
		{Start_End: "17:00-19:00 น.", ServiceID: 9},
	}
	db.Model(&TimeService{}).Create(&TimeService_FaceSpa799)
	//TimeFaceSpa สปาหน้า 99
	TimeService_FaceSpa999 := []TimeService{
		//1-18
		{Start_End: "09:00-11:00 น.", ServiceID: 10},
		{Start_End: "11:00-13:00 น.", ServiceID: 10},
		{Start_End: "13:00-15:00 น.", ServiceID: 10},
		{Start_End: "15:00-17:00 น.", ServiceID: 10},
		{Start_End: "17:00-19:00 น.", ServiceID: 10},
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
	var TimeServiceHair34 TimeService
	var TimeServiceHair35 TimeService
	var TimeServiceHair36 TimeService
	var TimeServiceHair37 TimeService
	var TimeServiceHair38 TimeService
	var TimeServiceHair39 TimeService
	var TimeServiceHair40 TimeService
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
	db.Raw("SELECT * FROM time_services WHERE id = ?", "34").Scan(&TimeServiceHair34)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "35").Scan(&TimeServiceHair35)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "36").Scan(&TimeServiceHair36)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "37").Scan(&TimeServiceHair37)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "38").Scan(&TimeServiceHair38)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "39").Scan(&TimeServiceHair39)
	db.Raw("SELECT * FROM time_services WHERE id = ?", "40").Scan(&TimeServiceHair40)
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
		Username: "0803299545",
		Password: SetupPasswordHash("W12345678"),
		UserRole: Memberrole,
	}
	db.Model(&Signin{}).Create(&loginMember1)
	loginMember2 := Signin{
		Username: "0954423679",
		Password: SetupPasswordHash("B12345678"),
		UserRole: Memberrole,
	}

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
		Line:      "F123456",
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
		Line:      "B123456",
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
	// var booking2 BookingNoTech
	db.Raw("SELECT * FROM bookings WHERE id = ?", "1").Scan(&booking1)
	// db.Raw("SELECT * FROM booking_no_teches WHERE id = ?", "1").Scan(&booking2)

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

	var PromptPay Method
	db.Raw("SELECT * FROM methods WHERE name = ?", "PromptPay").Scan(&PromptPay)

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
		Method:        PromptPay,
		Price:         150,
		Time:          time.Now(),
	})
	var payment1 Payment
	db.Raw("SELECT * FROM payments WHERE id = ?", "1").Scan(&payment1) // dump test by earth

	//******************ระบบ review********************

	timedaterv1 := time.Date(2023, 10, 15, 0, 0, 0, 0, time.Local)
	timeyearrv2 := time.Date(2023, 5, 15, 0, 0, 0, 0, time.Local)

	db.Model(&Review{}).Create(&Review{
		Member:     Member1,
		Comment:    "ประทับใจทุกอย่าง",
		Star:       5,
		Reviewdate: timeyearrv2,
	})

	db.Model(&Review{}).Create(&Review{
		Member:     Member2,
		Comment:    "บริการดี ประทับใจมาก",
		Star:       5,
		Reviewdate: timedaterv1,
	})

	// ============================================================================ Check Payment
	// ------------------------- Status ------------------
	s1001 := CHK_PaymentStatus{
		Type: "ยังไม่ได้รับการชำระเงิน",
	}
	db.Model(&CHK_PaymentStatus{}).Create(&s1001)

	s1002 := CHK_PaymentStatus{
		Type: "ได้รับการชำระเงินเรียบร้อยแล้ว",
	}
	db.Model(&CHK_PaymentStatus{}).Create(&s1002)
	// ------------------------ CHK_Payment --------------------
	db.Model(&CHK_Payment{}).Create(&CHK_Payment{
		Payment:           payment1,
		CHK_PaymentStatus: s1001,
		Date_time:         time.Now(),
		Amount:            1760,
		Description:       "เงินสด",
		Employee:          Napaporn,
	})

	var chk_payment1 CHK_Payment
	db.Raw("SELECT * FROM chk_payments WHERE id = ?", "1").Scan(&chk_payment1)
	// ============================================================================ Check Payment
}
