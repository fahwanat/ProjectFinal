package controller

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/fahwanat/ProjectFinal/entity"
)

func CreateTimeBooking(c *gin.Context) {
	var time_booking entity.TimeBooking
	if err := c.ShouldBindJSON(&time_booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&time_booking).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": time_booking})
}

// GET /gender/:id
func GetTimeBooking(c *gin.Context) {
	var time_booking entity.TimeBooking
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM time_bookings WHERE id = ?", id).Scan(&time_booking).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": time_booking})
}

// GET /genders
func ListTimeBooking(c *gin.Context) {
	var time_bookings []entity.TimeBooking

	if err := entity.DB().Raw("SELECT * FROM time_bookings").Scan(&time_bookings).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": time_bookings})
}

// DELETE /genders/:id
func DeleteTimeBooking(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM time_bookings WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "time_booking not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /genders
func UpdateTimeBooking(c *gin.Context) {
	var time_booking entity.TimeBooking
	if err := c.ShouldBindJSON(&time_booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", time_booking.ID).First(&time_booking); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "time_booking not found"})
		return
	}

	if err := entity.DB().Save(&time_booking).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": time_booking})
}

