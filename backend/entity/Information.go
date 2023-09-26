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
	})

	var Manikan Employee
	var Napaporn Employee
	var Somphorn Employee
	var Apinya Employee
	var Natthika Employee
	var Praani Employee
	var Jittima Employee
	db.Raw("SELECT * FROM employees WHERE employeename  = ?", "Manikan Raksa").Scan(&Manikan)
	db.Raw("SELECT * FROM employees WHERE employeename  = ?", "Napaporn Onsinit").Scan(&Napaporn)
	db.Raw("SELECT * FROM employees WHERE employeename  = ?", "Somphorn Akkaraweerachon").Scan(&Somphorn)
	db.Raw("SELECT * FROM employees WHERE employeename  = ?", "Apinya Somraksa").Scan(&Apinya)
	db.Raw("SELECT * FROM employees WHERE employeename  = ?", "Natthika Suksai").Scan(&Natthika)
	db.Raw("SELECT * FROM employees WHERE employeename  = ?", "Praani Silapasawat").Scan(&Praani)
	db.Raw("SELECT * FROM employees WHERE employeename  = ?", "Jittima Akkaraweerachon").Scan(&Jittima)

	//Service
	//ServiceType Data
	// Hairs := ServiceType{
	// 	Name: "ผม",
	// }
	// db.Model(&ServiceType{}).Create(&Hairs)

	// Nails := ServiceType{
	// 	Name: "เล็บ",
	// }
	// db.Model(&ServiceType{}).Create(&Nails)

	// Face := ServiceType{
	// 	Name: "ใบหน้า",
	// }
	// db.Model(&ServiceType{}).Create(&Face)

	//Service Data
	//ServiceHair1
	db.Model(&Service{}).Create(&Service{
		Employee: Manikan,
		Name:     "สระผม/ไดร์ผม",
		//ServiceType: Hairs,
		Price: 100,
	})
	//ServiceHair2
	db.Model(&Service{}).Create(&Service{
		Employee: Manikan,
		Name:     "ตัดผม/ซอยผม",
		//ServiceType: Hairs,
		Price: 150,
	})
	//ServiceHair3
	db.Model(&Service{}).Create(&Service{
		Employee: Napaporn,
		Name:     "ยืดผม",
		//ServiceType: Hairs,
		Price: 400,
	})
	//ServiceHair4
	db.Model(&Service{}).Create(&Service{
		Employee: Manikan,
		Name:     "ย้อมผม",
		//ServiceType: Hairs,
		Price: 300,
	})
	//ServiceHair5
	db.Model(&Service{}).Create(&Service{
		Employee: Somphorn,
		Name:     "ดัดผม",
		//ServiceType: Hairs,
		Price: 600,
	})
	//ServiceNail1
	db.Model(&Service{}).Create(&Service{
		Employee: Apinya,
		Name:     "ทาสีเจล",
		//ServiceType: Nails,
		Price: 199,
	})
	//ServiceNail2
	db.Model(&Service{}).Create(&Service{
		Employee: Apinya,
		Name:     "เพ้นต์เล็บ",
		//ServiceType: Nails,
		Price: 399,
	})
	//ServiceNail3
	db.Model(&Service{}).Create(&Service{
		Employee: Natthika,
		Name:     "ต่อเล็บ",
		//ServiceType: Nails,
		Price: 499,
	})
	//ServiceFace1
	db.Model(&Service{}).Create(&Service{
		Employee: Praani,
		Name:     "สปาหน้า",
		//ServiceType: Face,
		Price: 799,
	})
	//ServiceFace2
	db.Model(&Service{}).Create(&Service{
		Employee: Jittima,
		Name:     "สปาหน้า",
		//ServiceType: Face,
		Price: 999,
	})

	var ServiceHair1 Service
	var ServiceHair2 Service
	var ServiceHair3 Service
	var ServiceHair4 Service
	var ServiceHair5 Service
	db.Raw("SELECT * FROM services WHERE id = ?", "1").Scan(&ServiceHair1)
	db.Raw("SELECT * FROM services WHERE id = ?", "2").Scan(&ServiceHair2)
	db.Raw("SELECT * FROM services WHERE id = ?", "3").Scan(&ServiceHair3)
	db.Raw("SELECT * FROM services WHERE id = ?", "4").Scan(&ServiceHair4)
	db.Raw("SELECT * FROM services WHERE id = ?", "5").Scan(&ServiceHair5)
	var ServiceNial1 Service
	var ServiceNial2 Service
	var ServiceNial3 Service
	db.Raw("SELECT * FROM services WHERE id = ?", "6").Scan(&ServiceNial1)
	db.Raw("SELECT * FROM services WHERE id = ?", "7").Scan(&ServiceNial2)
	db.Raw("SELECT * FROM services WHERE id = ?", "8").Scan(&ServiceNial3)
	var ServiceFace1 Service
	var ServiceFace2 Service
	db.Raw("SELECT * FROM services WHERE id = ?", "9").Scan(&ServiceFace1)
	db.Raw("SELECT * FROM services WHERE id = ?", "10").Scan(&ServiceFace2)

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
	password1, _ := bcrypt.GenerateFromPassword([]byte("W12345678"), 14)
	Member1 := Member{
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
	Member2 := Member{
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
	//---------------------------------Branch data-----------------------
	// b4001 := Branch{
	// 	B_name: "Bangkok",
	// }
	// db.Model(&Branch{}).Create(&b4001)

	// b4002 := Branch{
	// 	B_name: "Pattaya",
	// }
	// db.Model(&Branch{}).Create(&b4002)

	// b4003 := Branch{
	// 	B_name: "Chiang Mai",
	// }
	// db.Model(&Branch{}).Create(&b4003)

	// b4004 := Branch{
	// 	B_name: "Phuket Town",
	// }
	// db.Model(&Branch{}).Create(&b4004)
	// ============================================================================ Booking
	//ใส่ไว้ก่อนนะเราต้องใช้เชื่อมกับตาราง checkin-out by joon => patch 21/1/2566 by earth
	start := time.Date(2023, 2, 7, 0, 0, 0, 0, time.UTC)
	stop := time.Date(2023, 2, 8, 0, 0, 0, 0, time.UTC)
	//for grouping
	hashBk_No1 := fmt.Sprintf("%x", md5.Sum([]byte(fmt.Sprintf("%v_%v_%v_%v", stop.Unix(), start.Unix(), ServiceHair1.ID))))
	// hashBk_No2 := fmt.Sprintf("%x", md5.Sum([]byte(fmt.Sprintf("%v_%v_%v_%v", stop.Unix(), start.Unix(), ServiceNial1.ID))))

	now := time.Now()
	today := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, time.UTC)

	//TimeBooking
	//Time 10.00-11.00
	TimeBooking1 := TimeBooking{
		Start_End: "10:00 - 11:00 น.",
	}
	db.Model(&TimeBooking{}).Create(&TimeBooking1)

	TimeBooking2 := TimeBooking{
		Start_End: "11:00 - 12:00 น.",
	}
	db.Model(&TimeBooking{}).Create(&TimeBooking2)
	
	TimeBooking3 := TimeBooking{
		Start_End: "12:00 - 13:00 น.",
	}
	db.Model(&TimeBooking{}).Create(&TimeBooking3)

	TimeBooking4 := TimeBooking{
		Start_End: "13:00 - 14:00 น.",
	}
	db.Model(&TimeBooking{}).Create(&TimeBooking4)

	TimeBooking5 := TimeBooking{
		Start_End: "14:00 - 15:00 น.",
	}
	db.Model(&TimeBooking{}).Create(&TimeBooking5)

	TimeBooking6 := TimeBooking{
		Start_End: "15:00 - 16:00 น.",
	}
	db.Model(&TimeBooking{}).Create(&TimeBooking6)

	TimeBooking7 := TimeBooking{
		Start_End: "16:00 - 17:00 น.",
	}
	db.Model(&TimeBooking{}).Create(&TimeBooking7)

	TimeBooking8 := TimeBooking{
		Start_End: "17:00 - 18:00 น.",
	}
	db.Model(&TimeBooking{}).Create(&TimeBooking8)


	// db.Model(&TimeBooking{}).Create(&TimeBooking{
	// 	Start_End: "10:00 - 11:00 AM",
	// })
	// //Time 11.00-12.00
	// db.Model(&TimeBooking{}).Create(&TimeBooking{
	// 	Start_End: "11:00 - 12:00 AM",
	// })
	// //Time 12.00-13.00
	// db.Model(&TimeBooking{}).Create(&TimeBooking{
	// 	Start_End: "12:00 - 13:00 PM",
	// })
	// //Time 13.00-14.00
	// db.Model(&TimeBooking{}).Create(&TimeBooking{
	// 	Start_End: "13:00 - 14:00 PM",
	// })
	// //Time 14.00-15.00
	// db.Model(&TimeBooking{}).Create(&TimeBooking{
	// 	Start_End: "14:00 - 15:00 PM",
	// })
	// //Time 15.00-16.00
	// db.Model(&TimeBooking{}).Create(&TimeBooking{
	// 	Start_End: "15:00 - 16:00 PM",
	// })
	// //Time 16.00-17.00
	// db.Model(&TimeBooking{}).Create(&TimeBooking{
	// 	Start_End: "16:00 - 17:00 PM",
	// })
	// //Time 17.00-18.00
	// db.Model(&TimeBooking{}).Create(&TimeBooking{
	// 	Start_End: "17:00 - 18:00 PM",
	// })

	// var TimeBooking1 TimeBooking
	// var TimeBooking2 TimeBooking
	// var TimeBooking3 TimeBooking
	// var TimeBooking4 TimeBooking
	// var TimeBooking5 TimeBooking
	// var TimeBooking6 TimeBooking
	// var TimeBooking7 TimeBooking
	// var TimeBooking8 TimeBooking
	// db.Raw("SELECT * FROM timebookings WHERE id = ?", "1").Scan(&TimeBooking1)
	// db.Raw("SELECT * FROM timebookings WHERE id = ?", "2").Scan(&TimeBooking2)
	// db.Raw("SELECT * FROM timebookings WHERE id = ?", "3").Scan(&TimeBooking3)
	// db.Raw("SELECT * FROM timebookings WHERE id = ?", "4").Scan(&TimeBooking4)
	// db.Raw("SELECT * FROM timebookings WHERE id = ?", "5").Scan(&TimeBooking5)
	// db.Raw("SELECT * FROM timebookings WHERE id = ?", "6").Scan(&TimeBooking6)
	// db.Raw("SELECT * FROM timebookings WHERE id = ?", "7").Scan(&TimeBooking7)
	// db.Raw("SELECT * FROM timebookings WHERE id = ?", "8").Scan(&TimeBooking8)

	
	db.Model(&Booking{}).Create(&Booking{
		Booking_Number: hashBk_No1,
		Tx_No:          hashBk_No1,
		Employee:         Apinya,
		Service: ServiceNial1,

		BookingDate: today,
		TimeBooking: TimeBooking1,

		// Time:   today,
		//Stop:    today.AddDate(0, 0, 1),
		//DayEach: time.Date(2023, 2, 11, 0, 0, 0, 0, time.UTC),
		Member:  Member1,
		Total:   float64(ServiceNial1.Price),
	})
	
	var booking1 Booking
	// var newbooking2 Booking
	db.Raw("SELECT * FROM newbookings WHERE id = ?", "1").Scan(&booking1)
	// db.Raw("SELECT * FROM bookings WHERE id = ?", "2").Scan(&booking2)


}




