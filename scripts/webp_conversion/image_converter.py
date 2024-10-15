import os
import sys
import re
import argparse
from pathlib import Path
import subprocess
from PIL import Image

IGNORE_LIST_FILE = 'scripts/webp_conversion/image_ignore_list.txt'
IMAGE_EXTENSIONS = ('.png', '.jpg', '.jpeg')
TEXT_EXTENSIONS = ('.md', '.html', '.txt', '.toml', '.yaml')
EXCLUDE_DIRS = {'.git', 'picture_archive', '.github'}

def generate_ignore_list():
    ignore_list = set()
    if os.path.exists(IGNORE_LIST_FILE):
        with open(IGNORE_LIST_FILE, 'r', encoding='utf-8') as f:
            ignore_list = set(line.strip() for line in f if line.strip() and not line.startswith('#'))
    return ignore_list

def update_ignore_list():
    image_files = []
    image_references = set()
    # Pattern to match local image references excluding URLs
    reference_pattern = re.compile(r'(?<!http[s]?://)([^\s"\'<>]+\.(png|jpg|jpeg))', re.IGNORECASE)

    for root, dirs, files in os.walk('../../'):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for file in files:
            file_path = os.path.join(root, file)
            if file.lower().endswith(IMAGE_EXTENSIONS):
                image_files.append(file_path)
            elif file.lower().endswith(TEXT_EXTENSIONS):
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    matches = reference_pattern.findall(content)
                    for match in matches:
                        image_references.add(match)

    # Write to ignore list file
    with open(IGNORE_LIST_FILE, 'w', encoding='utf-8') as f:
        f.write("# Image Ignore List\n")
        f.write("# Remove any lines for images/references you want to convert in future runs.\n\n")
        f.write("# Image Files:\n")
        for image in sorted(image_files):
            f.write(f"{image}\n")
        f.write("\n# Image References:\n")
        for ref in sorted(image_references):
            f.write(f"{ref}\n")

    print(f"Ignore list updated at {IGNORE_LIST_FILE}. Please review and edit as needed.")

def convert_images():
    ignore_list = generate_ignore_list()
    archive_dir = Path(__file__).parent / 'picture_archive'
    archive_dir.mkdir(exist_ok=True)

    # Collect images to convert
    images_to_convert = []
    for root, dirs, files in os.walk('../../'):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for file in files:
            file_path = os.path.join(root, file)
            if file.lower().endswith(IMAGE_EXTENSIONS) and file_path not in ignore_list:
                images_to_convert.append(file_path)

    # Convert images using cwebp
    for image_path in images_to_convert:
        try:
            extension = image_path.lower().split('.')[-1]
            webp_path = f"{os.path.splitext(image_path)[0]}.webp"
            if extension == 'png':
                cmd = ['cwebp', '-lossless', '-q', '100', image_path, '-o', webp_path]
            else:
                cmd = ['cwebp', '-q', '95', image_path, '-o', webp_path]

            subprocess.run(cmd, check=True)
            # Move original image to archive
            archive_destination = archive_dir / os.path.relpath(image_path, "../../")
            archive_destination.parent.mkdir(parents=True, exist_ok=True)
            os.rename(image_path, archive_destination)
            print(f"Converted and archived: {image_path}")
        except subprocess.CalledProcessError as e:
            print(f"Error converting {image_path}: {e}")
        except Exception as e:
            print(f"Unexpected error with {image_path}: {e}")

    # Update references in text files
    reference_pattern = re.compile(r'([^\s"\'<>]+\.(png|jpg|jpeg))', re.IGNORECASE)
    for root, dirs, files in os.walk('../../'):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for file in files:
            if file.lower().endswith(TEXT_EXTENSIONS):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                original_content = content

                # Check each reference to ensure it's not part of an external URL
                content = reference_pattern.sub(
                    lambda m: m.group(0).rsplit('.', 1)[0] + '.webp' 
                    if 'http://' not in m.group(0) and 'https://' not in m.group(0) and m.group(0) not in ignore_list 
                    else m.group(0),
                    content
                )

                if content != original_content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Updated references in: {file_path}")

def check_image_size(cutoff):
    ignore_list = generate_ignore_list()
    all_image_extensions = IMAGE_EXTENSIONS + ('.webp',)


    for root, dirs, files in os.walk('../../'):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for file in files:
            file_path = os.path.join(root, file)
            if file.lower().endswith(all_image_extensions) and file_path not in ignore_list:
                try:
                    with Image.open(file_path) as img:
                        width, height = img.size
                        longer_side = max(width, height)
                        if longer_side > cutoff:
                            print(f"Warning: {file_path} has a longer side of {longer_side}px, which exceeds the cutoff of {cutoff}px.")
                except Exception as e:
                    print(f"Error processing image {file_path}: {e}")

def main():
    parser = argparse.ArgumentParser(description='Convert images to WebP and manage ignore list.')
    subparsers = parser.add_subparsers(dest='command', help='Commands')

    # Subparser for update_ignore command
    parser_ignore = subparsers.add_parser('update_ignore', help='Update the image ignore list')

    # Subparser for convert command
    parser_convert = subparsers.add_parser('convert', help='Convert images and update references')

    # Subparser for check_size command
    parser_size = subparsers.add_parser('check_size', help='Check image dimensions and warn if longer side exceeds cutoff')
    parser_size.add_argument('cutoff', type=int, help='Cutoff value for the longer side in pixels')

    args = parser.parse_args()

    if args.command == 'update_ignore':
        update_ignore_list()
    elif args.command == 'convert':
        # Check if cwebp is installed
        if not shutil.which('cwebp'):
            print("Error: 'cwebp' command not found. Please install WebP tools.")
            sys.exit(1)
        convert_images()
    elif args.command == 'check_size':
        check_image_size(args.cutoff)
    else:
        parser.print_help()

if __name__ == "__main__":
    import shutil
    main()
