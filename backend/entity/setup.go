package entity

import (

	//"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	//////////////////////////////////////////////
	database, err := gorm.Open(sqlite.Open("salon.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	//////////////////////////////////////////////
	database.AutoMigrate(

		//จัดการข้อมูลพนักงาน
		&UserRole{},
		&Signin{},
		&Officer{},
		&Department{},
		&Position{},
		&Employee{},

		//Service
		&Service{},
		//&ServiceType{},
		
		//ระบบสมัครสมาขิก(ข้อมูลลูกค้า)
		&Gender{},
		&Prefix{},
		&Member{},

		// ระบบจองห้องพัก
		&Booking{},


	)
	//////////////////////////////////////////////
	db = database

	SetupIntoDatabase(db) 
}

	