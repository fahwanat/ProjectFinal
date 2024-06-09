package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/fahwanat/ProjectFinal/entity"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// POST

func SetupPasswordHash(pwd string) string {
	var password, _ = bcrypt.GenerateFromPassword([]byte(pwd), 14)
	return string(password)
}

func CreateMember(c *gin.Context) {
	//var payload CreateRegisterPayload
	var prefix entity.Prefix
	var gender entity.Gender
	var member entity.Member

	if err := c.ShouldBindJSON(&member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error not access": err.Error()})
		return
	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//9: ค้นหาด้วย id ของ Prefix
	if tx := entity.DB().Where("id = ?", member.PrefixID).First(&prefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Prefix not found"})
		return
	}
	//10: ค้นหาด้วย id ของ Gender
	if tx := entity.DB().Where("id = ?", member.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Gender not found"})
	}

	var userrole entity.UserRole
	if err := entity.DB().Model(&entity.UserRole{}).Where("role_name = ?", "Member").First(&userrole).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Members role not found"})
		return
	}

	createuserlogin := entity.Signin{
		Username: member.Phone,
		Password: SetupPasswordHash(member.Password),
		UserRole: userrole,
	}

	password, _ := bcrypt.GenerateFromPassword([]byte(member.Password), 14)

	//12:สร้าง entity member
	mem := entity.Member{
		Gender:    gender,
		Prefix:    prefix,
		FirstName: member.FirstName,
		LastName:  member.LastName,
		Nickname:  member.Nickname,
		Age:       member.Age,
		Line:      member.Line,
		Password:  string(password),
		Phone:     member.Phone,
		Signin:    createuserlogin,
	}

	//13:บันทึก
	if err := entity.DB().Create(&mem).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": mem})

}

// / GET Member/:id
func GetMemberByID(c *gin.Context) {
	var member entity.Member
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM members WHERE id=?", id).Scan(&member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": member})
}

// GET All/Members
func ListMembers(c *gin.Context) {
	var members []entity.Member
	if err := entity.DB().Preload("Prefix").Preload("Gender").Raw("SELECT * FROM members").Find(&members).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": members})
}

// DELETE /members/:id
func DeleteMembers(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM members WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Members
func UpdateMember(c *gin.Context) {
	var member entity.Member
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}

	if err := c.ShouldBindJSON(&member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// // แทรกการ validate ไว้ช่วงนี้ของ controller
	// if _, err := govalidator.ValidateStruct(customer); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	if err := entity.DB().Save(&member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": member})
}
