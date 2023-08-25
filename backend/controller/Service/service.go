package controller

import (
	"github.com/asaskevich/govalidator"

	"github.com/fahwanat/ProjectFinal/entity"
	"golang.org/x/crypto/bcrypt"

	"github.com/gin-gonic/gin"

	"net/http"
)

//ServiceType...................................................................
// POST /ServiceTypes

// func CreateServiceType(c *gin.Context) {

// 	var servicetype entity.ServiceType

// 	if err := c.ShouldBindJSON(&servicetype); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if err := entity.DB().Create(&servicetype).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": servicetype})

// }

// // GET /servicetype/:id
// func GetServiceType(c *gin.Context) {

// 	var servicetype entity.ServiceType

// 	id := c.Param("id")

// 	if err := entity.DB().Raw("SELECT * FROM service_types WHERE id = ?", id).Scan(&servicetype).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": servicetype})
// }

// // GET /servicetypes
// func ListServiceTypes(c *gin.Context) {

// 	var servicetypes []entity.ServiceType

// 	if err := entity.DB().Raw("SELECT * FROM service_types").Scan(&servicetypes).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": servicetypes})
// }

// // DELETE /serviceTypes/:id
// func DeleteServiceType(c *gin.Context) {

// 	id := c.Param("id")

// 	if tx := entity.DB().Exec("DELETE FROM service_types WHERE id = ?", id); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "servicetype not found"})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": id})
// }

// // PATCH /serviceTypes
// func UpdateServiceType(c *gin.Context) {

// 	var servicetype entity.ServiceType

// 	if err := c.ShouldBindJSON(&servicetype); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if tx := entity.DB().Where("id = ?", servicetype.ID).First(&servicetype); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "servicetype not found"})
// 		return
// 	}

// 	if err := entity.DB().Save(&servicetype).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": servicetype})
// }

// Service...................................................................
// POST /Services
func SetupPasswordHash(pwd string) string {
	var password, _ = bcrypt.GenerateFromPassword([]byte(pwd), 14)
	return string(password)
}

func CreateService(c *gin.Context) {

	var employee entity.Employee
	//var servicetype entity.ServiceType
	var service entity.Service

	if err := c.ShouldBindJSON(&service); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(service); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9.  ค้นหา Employee ด้วย id
	if tx := entity.DB().Where("id = ?", service.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	// 10. ค้นหา ServiceType ด้วย id
	// if tx := entity.DB().Where("id = ?", service.ServiceTypeID).First(&servicetype); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "servicetype not found"})
	// 	return
	// }

	// 13. สร้าง Service
	ser := entity.Service{
		Employee:    employee,
		Name:        service.Name,
		Time:		service.Time,
		//ServiceType: servicetype,
		Price:      service.Price,
	}

	if err := entity.DB().Create(&ser).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ser})
}

// GET /Service/:id
func GetService(c *gin.Context) {

	var service entity.Service

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM services WHERE id = ?", id).Scan(&service).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": service})
}

// GET /Services
func ListServices(c *gin.Context) {

	var services []entity.Service

	if err := entity.DB().Preload("Employee").Raw("SELECT * FROM services").Find(&services).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": services})
}

// DELETE /Services/:id
func DeleteService(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM services WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "service not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PUT Service
func UpdateService(c *gin.Context) {
	var service entity.Service
	var se entity.Service

	if err := c.ShouldBindJSON(&service); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา Service ด้วย ID
	if tx := entity.DB().Where("id = ?", service.ID).First(&se); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Service not found"})
		return
	}

	//var servicetype entity.ServiceType

	// ค้นหา servicetype ด้วย id
	// if tx := entity.DB().Where("id = ?", service.ServiceTypeID).First(&servicetype); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "ServiceType not found"})
	// 	return
	// }

	//se.ServiceType = servicetype
	se.Price = service.Price

	if err := entity.DB().Save(&se).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": se})
}
