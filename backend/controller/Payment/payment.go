package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/fahwanat/ProjectFinal/entity"
	"github.com/gin-gonic/gin"
)

// POST /payment
func CreatePayment(c *gin.Context) {
	var payment entity.Payment
	var member entity.Member
	var paymentmethod entity.PaymentMethod
	var method entity.Method

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 9 จะถูก bind เข้าตัวแปร payment
	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 10: ค้นหา paymentmethod ด้วย id
	// if tx := entity.DB().Where("id = ?", payment.PaymentMethodID).First(&paymentmethod); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "paymentmethod not found"})
	// 	return
	// }

	// 11: ค้นหา method ด้วย id
	if tx := entity.DB().Where("id = ?", payment.MethodID).First(&method); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "method not found"})
		return
	}

	// 13: ค้นหา member ด้วย id
	if tx := entity.DB().Where("id = ?", payment.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}

	// 14: สร้าง Payment
	pm := entity.Payment{
		Member:        member,
		PaymentMethod: paymentmethod,
		Method:        method,
		Price:         payment.Price,
		// Total:         payment.Total,
		Time:    payment.Time,
		Picture: payment.Picture,
	}

	//15: save
	if err := entity.DB().Create(&pm).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": pm})
}

// GET /payment/:id
func GetPayment(c *gin.Context) {
	var payment entity.Payment
	id := c.Param("id")
	if tx := entity.DB().Preload("PaymentMethod").Preload("Method").Preload("Member").Where("id = ?", id).First(&payment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "payment not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payment})
}

// GET /payments
func ListPayments(c *gin.Context) {
	var payments []entity.Payment
	if err := entity.DB().Preload("PaymentMethod").Preload("Method").Preload("Member").Raw("SELECT * FROM payments").Find(&payments).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": payments})
}

// GET /payment/customer/:id
func ListPaymentByUID(c *gin.Context) {
	var payments []entity.Payment
	id := c.Param("id")
	if err := entity.DB().Preload("PaymentMethod").Preload("Method").Preload("Member").Raw("SELECT * FROM payments WHERE member_id = ?", id).Find(&payments).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": payments})
}

// PATCH /payments
func UpdatePayment(c *gin.Context) {
	var payment entity.Payment
	var member entity.Member
	var paymentmethod entity.PaymentMethod
	var method entity.Method

	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// if tx := entity.DB().Where("id = ?", payment.PaymentMethodID).First(&paymentmethod); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "paymentmethod not found"})
	// 	return
	// }

	if tx := entity.DB().Where("id = ?", payment.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", payment.MethodID).First(&method); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "method not found"})
		return
	}

	patchpayment := entity.Payment{
		Time:          payment.Time, // ข้อมูลที่รับเข้ามาจาก frontend
		PaymentMethod: paymentmethod,
		Method:        method,
		Member:        member,
		Price:         payment.Price,
		// Total:         payment.Total,
		Picture: payment.Picture,
	}

	if err := entity.DB().Where("id = ?", payment.ID).Updates(&patchpayment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": payment})
}

// GET /paymentmethods
func ListPaymentMethods(c *gin.Context) {
	var paymentmethods []entity.PaymentMethod
	if err := entity.DB().Raw("SELECT * FROM payment_methods").Find(&paymentmethods).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": paymentmethods})
}

// GET /methods
func ListMethods(c *gin.Context) {
	var methods []entity.Method
	if err := entity.DB().Raw("SELECT * FROM methods").Find(&methods).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": methods})
}

// GET /method/:id
func GetMethod(c *gin.Context) {
	var methods entity.Method
	id := c.Param("id")
	if err := entity.DB().Preload("PaymentMethod").Raw("SELECT * FROM methods WHERE id = ?", id).Find(&methods).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": methods})
}

// GET /pricebooking/member/:id
func PriceBookingCID(c *gin.Context) {
	id := c.Param("id")
	var b_total struct {
		TotalAmount int
		entity.Booking
	}
	if err := entity.DB().Raw("SELECT SUM(total) as total_amount FROM bookings WHERE member_id = ? GROUP BY member_id", id).Scan(&b_total).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": b_total})
}

// GET /priceservice/customer/:id
func PriceServiceCID(c *gin.Context) {
	id := c.Param("id")
	var s_total struct {
		TotalAmount int
		entity.Service
	}
	if err := entity.DB().Raw("SELECT SUM(total) as total_amount FROM services WHERE member_id = ? GROUP BY member_id", id).Scan(&s_total).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": s_total})
}
