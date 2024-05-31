package main

import (
	"flag"
	"fmt"
	"image"
	"image/jpeg"
	"image/png"
	"os"
	"path/filepath"
	"strings"
)

func decodeImage(imagePath string) (imgDecoded image.Image, err error) {
	img, _, err := image.Decode(imagePath)
	if err != nil {
		return nil, err
	}
	return img, nil
}

func encodeImage(imgDecoded image.Image, format string) (imgEncoded image.Image, err error) {

	switch format {

	case "webp":
		err := jpeg.Encode(newImageFile, imgDecoded, nil)

		fmt.Println("Error encoding image:", err)
		if err != nil {
			return nil, err
		}

		return jpeg.Encode(file, img, options), nil

	case "jpeg":

		options := &jpeg.Options{Quality: 90}

		fmt.Println("Error encoding image:", err)
		if err != nil {
			return nil, err
		}

		return png.Encode(file, img, options), nil

	default:
		fmt.Println("Unsupported image format:", format)
	}
	return nil, "", nil
}

func convertImages(format string, paths ...string) {

	for _, path := range paths {

		// Check if the file exists
		file, err := os.Open(path)
		if err != nil {
			fmt.Println("Error opening file:", err)
			continue
		}
		defer file.Close()

		// In the path, replace the old extension with the new one
		newPath := strings.TrimSuffix(path, filepath.Ext(path)) + "." + format

		// Create a new file with the new extension
		newImageFile, err := os.Create(newPath)

		// Decode the image
		imgDecoded, err := decodeImage(newImageFile)

		// Encode the image
		imgEncoded, err := encodeImage(imgDecoded, format)
	}
}

func findImages(repoPath string) (imageFiles []string, imgNum int) {

	var counter int = 0

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
	return imageFiles, counter
}

func main() {

	// Parse the command line arguments
	findFlag := flag.Bool("find-images", false, "Find all the undesirable image files in the repository and count them")
	pathFlag := flag.String("path", "", "Path to the image file. Required for the conversion of a single image file.")
	convertFlag := flag.Bool("convert", false, "Convert the image(s) file to the desired format")
	flag.Parse()

	fmt.Println("Find images flag:", *findFlag)
	fmt.Println("Path flag:", *pathFlag)
	fmt.Println("Convert flag:", *convertFlag)

	// Find all the image files in the repository
	if *findFlag {
		imageFiles, imgNum := findImages("path/to/repo") // Path to the repository
	}

	// Convert the image file(s) to the desired format
	if *convertFlag {
		convertImages("webp", imageFiles)
	}
}
