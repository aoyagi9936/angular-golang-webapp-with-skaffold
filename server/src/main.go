package main

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/aoyagi9936/angular-golang-webapp-with-skaffold/api/openapi/go"
	"github.com/gin-gonic/gin"
)

func main() {
	// Disable Console Color
	// gin.DisableConsoleColor()
	r := NewRouter()

	// Listen and Server in 0.0.0.0:8080
	r.Run(":8080")
}

// Items is the list of the generated item.
type Items []openapi.Item

var items = Items{
	{
		1,
		"test1",
		"",
	},

	{
		2,
		"test2",
		"",
	},

	{
		3,
		"test3",
		"",
	},
}

// CreateItems - Create a item
func CreateItems(c *gin.Context) {
	var json openapi.Item
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	fmt.Printf("id: %d, name: %s, tag: %s", json.Id, json.Name, json.Tag)
	c.JSON(http.StatusOK, gin.H{})
}

// ListItems - List all items
func ListItems(c *gin.Context) {
	c.JSON(http.StatusOK, items)
}

// ShowItemById - Info for a specific item
func ShowItemById(c *gin.Context) {
	for _, v := range items {
		if id, _ := strconv.ParseInt(c.Param("id"), 10, 64); v.Id == id {
			c.JSON(http.StatusOK, v)
			return
		}
	}
	c.JSON(http.StatusOK, openapi.Error{
		Code:    1,
		Message: "Not Found.",
	})
}

// Route is the information for every URI.
type Route struct {
	// Name is the name of this Route.
	Name string
	// Method is the string for the HTTP method. ex) GET, POST etc..
	Method string
	// Pattern is the pattern of the URI.
	Pattern string
	// HandlerFunc is the handler function of this route.
	HandlerFunc gin.HandlerFunc
}

// Routes is the list of the generated Route.
type Routes []Route

func NewRouter() *gin.Engine {
	router := gin.Default()
	for _, route := range routes {
		switch route.Method {
		case http.MethodGet:
			router.GET(route.Pattern, route.HandlerFunc)
		case http.MethodPost:
			router.POST(route.Pattern, route.HandlerFunc)
		case http.MethodPut:
			router.PUT(route.Pattern, route.HandlerFunc)
		case http.MethodDelete:
			router.DELETE(route.Pattern, route.HandlerFunc)
		}
	}

	return router
}

// PingPong is the test handler.
func PingPong(c *gin.Context) {
	c.String(http.StatusOK, "pong")
}

var routes = Routes{
	{
		"PingPong",
		http.MethodGet,
		"/ping",
		PingPong,
	},

	{
		"CreateItems",
		http.MethodPost,
		"/api/v1/items",
		CreateItems,
	},

	{
		"ListItems",
		http.MethodGet,
		"/api/v1/items",
		ListItems,
	},

	{
		"ShowItemById",
		http.MethodGet,
		"/api/v1/items/:itemId",
		ShowItemById,
	},
}
