package controller

import (
	"net/http"

	"github.com/fahwanat/ProjectFinal/entity"
	"github.com/gin-gonic/gin"
)

// POST /service/servicetype
func CreateServiceType(c *gin.Context) {
	var servicetype entity.ServiceType
	if err := c.ShouldBindJSON(&servicetype); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&servicetype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": servicetype})
}

// GET /chk_payment/status/:id
func GetStatus(c *gin.Context) {
	var servicetype entity.ServiceType
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&servicetype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "check payment status not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": servicetype})
}

// GET /service/servicetype
func ListStatuses(c *gin.Context) {
	var servicetype []entity.CHK_PaymentStatus
	if err := entity.DB().Raw("SELECT * FROM chk_payment_statuses").Scan(&servicetype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": servicetype})
}

// DELETE /service/servicetype/:id
func DeleteStatus(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM service_types WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "servicetype not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /service/servicetype
func UpdateStatus(c *gin.Context) {
	var servicetype entity.ServiceType
	if err := c.ShouldBindJSON(&servicetype); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", servicetype.ID).First(&servicetype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "servicetype not found"})
		return
	}

	if err := entity.DB().Save(&servicetype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": servicetype})
}
