package controller

import (
	"github.com/asaskevich/govalidator"

	"github.com/fahwanat/ProjectFinal/entity"
	// "golang.org/x/crypto/bcrypt"

	"github.com/gin-gonic/gin"

	"net/http"
)

func CreateService(c *gin.Context) {

	var service entity.Service
	var servicetype entity.ServiceType

	if err := c.ShouldBindJSON(&service); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(service); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//  ค้นหา servicetype ด้วย id
	if tx := entity.DB().Where("id = ?", service.ServiceTypeID).First(&servicetype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "servicetype not found"})
		return
	}

	// สร้าง service
	sv := entity.Service{
		ServiceType:  servicetype,
		Service_Name: service.Service_Name,
		Price:        service.Price,
	}

	if err := entity.DB().Create(&sv).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": sv})
}

// GET /services
func ListServices(c *gin.Context) {

	var service []entity.Service

	if err := entity.DB().Raw("SELECT * FROM services").Scan(&service).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": service})
}

// GET /service_types
func ListServiceTypes(c *gin.Context) {
	var service_types []entity.ServiceType
	if err := entity.DB().Raw("SELECT * FROM service_types").Find(&service_types).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": service_types})
}

// GET /service/:id
func GetServiceType(c *gin.Context) {
	var service_type entity.ServiceType
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM service_types WHERE id = ?", id).Scan(&service_type).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": service_type})
}

// GET /service/booking/:id
func ListServicesByBID(c *gin.Context) {
	var services []entity.Service
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM services WHERE service_type_id = ?", id).Find(&services).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": services})
}

// GET /service/:id
func GetService(c *gin.Context) {
	var services entity.Service
	id := c.Param("id")
	if err := entity.DB().Preload("ServiceType").Raw("SELECT * FROM services WHERE id = ?", id).Find(&services).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": services})
}

// GET /time_service/booking/:id
func ListTimeServiceByBID(c *gin.Context) {
	var time_services []entity.TimeService
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM time_services WHERE service_id = ?", id).Find(&time_services).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": time_services})
}

func GetTimeService(c *gin.Context) {
	var time_services entity.TimeService
	id := c.Param("id")
	if err := entity.DB().Preload("Service").Raw("SELECT * FROM time_services WHERE id = ?", id).Find(&time_services).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": time_services})
}

// PATCH /services
func UpdateService(c *gin.Context) {
	var service entity.Service

	if err := c.ShouldBindJSON(&service); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	UpdateService := entity.Service{
		Service_Name: service.Service_Name,
		Price:        service.Price,
	}

	if err := entity.DB().Where("id = ?", service.ID).Updates(&UpdateService).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": service})

}

// DELETE /services/:id
func DeleteService(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM services WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "service not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}
