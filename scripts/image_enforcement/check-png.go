package main

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

func find_images(repoPath string) {
	counter := 0

	// An array to store the image file paths
	var imageFiles []string

	err := filepath.Walk(repoPath, func(path string, info os.FileInfo, err error) error {

		if !info.IsDir() {
			ext := strings.ToLower(filepath.Ext(path))

			if ext == ".png" || ext == ".jpeg" || ext == ".jpg" {
				imageFiles = append(imageFiles, path)
				counter++
			}
		}
		return nil
	})

	if err != nil {
		fmt.Println("Error:", err)
	}

	fmt.Println("Image files:")
	for _, imageFile := range imageFiles {
		fmt.Println(imageFile)
	}
	fmt.Printf("Total image files found: %d\n", counter)

}

func convert_image(imagePath string, format string) {

	if _, err := os.Stat(imagePath); os.IsNotExist(err) {
		fmt.Println("Error: The image file does not exist.")
		return
	}

	// finish the implementation
}

func main() {
	find_images("../../.") // Path to the repository root directory
	convert_image('../../themes/academic/images/tn.png', "webp")
}
