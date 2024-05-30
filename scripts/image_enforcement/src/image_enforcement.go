package image_enforcement

import (
	"flag"
)

func main() {

	// Parse the command line arguments
	findFlag := flag.Bool("find-images", false, "Find all the image files in the repository")

	// Find all the image files in the repository
	if *findFlag {
		find_images("../../.") // Path to the repository root directory
	}
}
