package controller

import (
	"fmt"

	"github.com/asaskevich/govalidator"
	"github.com/fahwanat/ProjectFinal/entity"
	"golang.org/x/crypto/bcrypt"

	"github.com/gin-gonic/gin"

	"net/http"
)

//Officer...................................................................
// POST /Officers

func CreateOfficer(c *gin.Context) {

	var officer entity.Officer

	if err := c.ShouldBindJSON(&officer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&officer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": officer})
}

// GET /officer/:id
func GetOfficer(c *gin.Context) {

	var officer entity.Officer

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM officers WHERE id = ?", id).Scan(&officer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": officer})
}

// GET /officers
func ListOfficers(c *gin.Context) {

	var officer []entity.Officer

	if err := entity.DB().Raw("SELECT * FROM officers").Scan(&officer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": officer})
}

//Department...................................................................
// POST /Departments

func CreateDepartment(c *gin.Context) {

	var department entity.Department

	if err := c.ShouldBindJSON(&department); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&department).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": department})
}

// GET /department/:id
func GetDepartment(c *gin.Context) {

	var department entity.Department

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM departments WHERE id = ?", id).Scan(&department).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": department})
}

// GET /departments
func ListDepartments(c *gin.Context) {

	var department []entity.Department

	if err := entity.DB().Raw("SELECT * FROM departments").Scan(&department).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": department})
}

//Position...................................................................
// POST /Positions

func CreatePosition(c *gin.Context) {

	var position entity.Position

	if err := c.ShouldBindJSON(&position); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&position).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": position})
}

// GET /Position/:id
func GetPosition(c *gin.Context) {

	var position entity.Position

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM positions WHERE id = ?", id).Scan(&position).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": position})
}

// GET /Positions
func ListPositions(c *gin.Context) {

	var position []entity.Position

	if err := entity.DB().Raw("SELECT * FROM positions").Scan(&position).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": position})
}

// Employee...................................................................
// POST /Employees
func SetupPasswordHash(pwd string) string {
	var password, _ = bcrypt.GenerateFromPassword([]byte(pwd), 14)
	return string(password)
}

func CreateEmployee(c *gin.Context) {

	var officer entity.Officer
	var department entity.Department
	var position entity.Position
	var employee entity.Employee

	if err := c.ShouldBindJSON(&employee); err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	println(employee.OfficerID)
	// 9. ค้นหา Officer ด้วย id //tx.RowsAffected ตรวจสอบแถว
	if tx := entity.DB().Where("id = ?", employee.OfficerID).First(&officer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "OFFicer not found"})
		return
	}

	println(officer.ID)
	// 10. ค้นหา department ด้วย id
	if tx := entity.DB().Where("id = ?", employee.DepartmentID).First(&department); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Department not found"})
		return
	}

	// 11. ค้นหา position ด้วย id
	if tx := entity.DB().Where("id = ?", employee.PositionID).First(&position); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Position not found"})
		return
	}

	var userrole entity.UserRole
	if err := entity.DB().Model(&entity.UserRole{}).Where("role_name = ?", "Employee").First(&userrole).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Employees role not found"})
		return
	}

	createuserlogin := entity.Signin{
		Username: employee.Tusername,
		Password: SetupPasswordHash(employee.Password),
		UserRole: userrole,
	}

	// 13. สร้าง Employee
	ey := entity.Employee{
		Officer:      officer,               // โยงความสัมพันธ์กับ Entity Officer
		Department:   department,            // โยงความสัมพันธ์กับ Entity Department
		Position:     position,              // โยงความสัมพันธ์กับ Entity Position
		PersonalID:   employee.PersonalID,   // ตั้งค่าฟิลด์ PersonalID
		Employeename: employee.Employeename, // ตั้งค่าฟิลด์ Name
		Email:        employee.Email,
		Tusername:    employee.Tusername,                   // ตั้งค่าฟิลด์ Email
		Password:     SetupPasswordHash(employee.Password), // ตั้งค่าฟิลด์ Password
		Salary:       employee.Salary,                      // ตั้งค่าฟิลด์ Salary
		Phonenumber:  employee.Phonenumber,                 // ตั้งค่าฟิลด์ Tel
		Gender:       employee.Gender,                      // ตั้งค่าฟิลด์ Gender
		Signin:       createuserlogin,
	}

	if err := entity.DB().Create(&ey).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ey})
}

func ListEmplooyeeByUID(c *gin.Context) {
	var employee []entity.Employee
	id := c.Param("id")
	if err := entity.DB().Preload("Officer").Preload("Department").Preload("Position").Raw("SELECT * FROM employees WHERE officer_id = ?", id).Find(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": employee})
}

// GET /Employee/:id
func GetEmployee(c *gin.Context) {

	var employee entity.Employee
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM employees WHERE id = ?", id).Scan(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": employee})
}

// GET /Employees
func ListEmployees(c *gin.Context) {

	var employee []entity.Employee

	if err := entity.DB().Preload("Officer").Preload("Department").Preload("Position").Raw("SELECT * FROM employees").Find(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": employee})
}

// DELETE /Employees/:id
func DeleteEmployee(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM employees WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Employees
func UpdateEmployee(c *gin.Context) {

	var employee entity.Employee
	var department entity.Department
	var position entity.Position

	if err := c.ShouldBindJSON(&employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", employee.DepartmentID).First(&department); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Department not found"})
		return
	}

	// 11. ค้นหา position ด้วย id
	if tx := entity.DB().Where("id = ?", employee.PositionID).First(&position); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Position not found"})
		return
	}

	updateEm := entity.Employee{
		Department:   department,          // โยงความสัมพันธ์กับ Entity Department
		Position:     position,            // โยงความสัมพันธ์กับ Entity Position
		PersonalID:   employee.PersonalID, // ตั้งค่าฟิลด์ PersonalID
		Employeename: employee.Employeename,
		Email:        employee.Email,
		Tusername:    employee.Tusername,
		Password:     SetupPasswordHash(employee.Password),
		Salary:       employee.Salary,      // ตั้งค่าฟิลด์ Salary
		Phonenumber:  employee.Phonenumber, // ตั้งค่าฟิลด์ Tel
		Gender:       employee.Gender,      // ตั้งค่าฟิลด์ Gender

	}

	if tx := entity.DB().Where("id = ?", employee.ID).Updates(&updateEm); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": " not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": employee})
}
