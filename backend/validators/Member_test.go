package entity

import (
	"testing"

	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
	. "github.com/onsi/gomega"
	. "github.com/fahwanat/ProjectFinal/entity"
)

// ตรวจสอบค่าpassword < 8 หลักแล้วต้องเจอ Error
func TestMemberEmailNotValid(t *testing.T) {
	g := gomega.NewGomegaWithT(t)
	test := uint(1)

	member := Member{
		FirstName:  "วนัสนันท์",
		LastName: 	"จันทร์มล",
		Nickname: 	"ฟ้า",	
		Age: 		22,
		Email:    	"",
		Password: 	"W12345678",
		PrefixID: 	&test,
		GenderID: 	&test,
		Phone:      "0803299545",
		
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(member)
	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(gomega.BeTrue())
	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(gomega.BeNil())
	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Email is not valid"))
}

func TestMemberValidateNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)
	test := uint(1)

	t.Run("check age is not negative number", func(t *testing.T) {
		member:= Member{
			FirstName: "วนัสนันท์",
			LastName: 	"จันทร์มล",
			Nickname: 	"ฟ้า",
			Age: 		-22,
			Password: 	"W12345678",
			Phone: 		"0803299545",
			Email: 		"Wanatsanan@gmail.com",
			PrefixID: 	&test,
			GenderID: 	&test,
		
		}

	ok, err := govalidator.ValidateStruct(member)
		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("อายุไม่สามารถติดลบได้"))
	})


	t.Run("check prefix is not nil", func(t *testing.T) {
		member:= Member{
			FirstName: "วนัสนันท์",
			LastName: 	"จันทร์มล",
			Nickname: 	"ฟ้า",
			Age: 		22,
			Password: 	"W12345678",
			Phone: 		"0803299545",
			Email: 		"Wanatsanan@gmail.com",
			PrefixID: 	nil,
			GenderID: 	&test,
		}

	ok, err := govalidator.ValidateStruct(member)
		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Please select Prefix"))
	})

	t.Run("check gender is not nil", func(t *testing.T) {
		member:= Member{
			FirstName: "วนัสนันท์",
			LastName: 	"จันทร์มล",
			Nickname: 	"ฟ้า",
			Age: 		22,
			Password: 	"W12345678",
			Phone: 		"0803299545",
			Email: 		"Wanatsanan@gmail.com",
			PrefixID: 	&test,
			GenderID: 	nil,
		}

	ok, err := govalidator.ValidateStruct(member)
		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Please select Gender"))
	})

}

func TestMemberPassword(t *testing.T) {
	g := gomega.NewGomegaWithT(t)
	test := uint(1)
	//ทำการตรวจสอบ Password ต้องมากกว่า 6 หรือเท่ากับ 6 ตัว
	fixtures := []string{
		"abcde", //คำนำหน้าผิด แต่อักษรตัวที่สองเป็นพิมพ์เล็ก ซึ่งผิด
		"Esf", //คำนำหน้าถูก แต่อักษรตัวที่สองเป็นพิมพ์เล็ก ซึ่งผิด
	}
	for _, fixture := range fixtures{
		
		member:= Member{
			FirstName: "วนัสนันท์",
			LastName: 	"จันทร์มล",
			Nickname: 	"ฟ้า",
			Age: 		22,
			Password: 	fixture,
			Phone: 		"0803299545",
			Email: 		"Wanatsanan@gmail.com",
			PrefixID: 	&test,
			GenderID: 	&test,
		}
		

		ok, err := govalidator.ValidateStruct(member)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Password must be more than or equal to 8 characters")) 
	}

	t.Run("Check Password", func(t *testing.T) {

		fixtures := []string{
			"bdfdf453", //คำนำหน้าผิด แต่อักษรตัวที่สองเป็นพิมพ์เล็ก ซึ่งผิด
			"5532323sf", //คำนำหน้าถูก แต่อักษรตัวที่สองเป็นพิมพ์เล็ก ซึ่งผิด
		}
		//Address ห้ามว่าง
		for _, fixture := range fixtures{
			member := Member{
			FirstName: "วนัสนันท์",
			LastName: 	"จันทร์มล",
			Nickname: 	"ฟ้า",
			Age: 		22,
			Password: 	fixture,
			Phone: 		"0803299545",
			Email: 		"Wanatsanan@gmail.com",
			PrefixID: 	&test,
			GenderID: 	&test,
			}

		ok, err := govalidator.ValidateStruct(member)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Password must contain at least 1 character A-Z."))
	}
})
}


func TestMemberCheckTel(t *testing.T) {
	g := gomega.NewGomegaWithT(t)
	test := uint(1)
	//ทำการตรวจสอบ Phonenumber ต้องมีตัวเลข 0-9 เท่ากับ 10 ตัว ไม่มีตัวอักษร และ ขึ้นต้นด้วยเลข 0
	fixtures := []string{
		"190545200", // ผิดเพราะเลขไม่ครบ 10 และตัวนำหน้าไม่ใช่ 0
		"09548125", // ผิดเพราะเลขไม่ครบ 10
		"b288525", //ผิดเพราะมีตัวอักษร เลขไม่ครบ 10
		"b28g525b", //ผิดเพราะมีตัวอักษร เลขไม่ครบ 10
	}
	for _, fixture := range fixtures{
		member := Member{
			FirstName: "วนัสนันท์",
			LastName: 	"จันทร์มล",
			Nickname: 	"ฟ้า",
			Age: 		22,
			Password: 	"W12345678",
			Phone: 		fixture,
			Email: 		"Wanatsanan@gmail.com",
			PrefixID: 	&test,
			GenderID: 	&test,
			}

		ok, err := govalidator.ValidateStruct(member)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Phonenumber is not valid"))
	}
}


