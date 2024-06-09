package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/fahwanat/ProjectFinal/entity"
	"github.com/gin-gonic/gin"
)

func CreateReview(c *gin.Context) {

	var review entity.Review
	var member entity.Member

	if err := c.ShouldBindJSON(&review); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(review); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", review.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
		return
	}

	// 12: สร้าง Review
	rv := entity.Review{
		Member:      member, // โยงความสัมพันธ์กับ Entity member
		Comment:     review.Comment,
		Star:        review.Star,
		Reviewdate:  review.Reviewdate,
		Reviewimage: review.Reviewimage,
	}

	if err := entity.DB().Create(&rv).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rv})
}

// GET /Review/:id
func GetReview(c *gin.Context) {

	var review []entity.Review

	id := c.Param("id")

	if err := entity.DB().Preload("Member").Raw("SELECT * FROM reviews WHERE member_id = ?", id).Find(&review).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": review})
}

// GET /reviews
func ListReviews(c *gin.Context) {

	var review []entity.Review

	if err := entity.DB().Preload("Member").Raw("SELECT * FROM reviews").Find(&review).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": review})
}

// DELETE /reviews/:id
func DeleteReview(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM reviews WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "review not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /reviews
func UpdateReview(c *gin.Context) {
	var review entity.Review

	if err := c.ShouldBindJSON(&review); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	UpdateReview := entity.Review{
		Comment:     review.Comment,
		Star:        review.Star,
		Reviewimage: review.Reviewimage,
	}

	if err := entity.DB().Where("id = ?", review.ID).Updates(&UpdateReview).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": review})

}
