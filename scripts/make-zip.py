import zipfile
import os
import sys
import shutil

project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dist_dir = os.path.join(project_root, "dist")
public_dir = os.path.join(project_root, "public")
zip_path = os.path.join(project_root, "hostinger_deploy.zip")

if not os.path.exists(dist_dir):
    print(f"Error: {dist_dir} does not exist. Run build first.")
    sys.exit(1)

# Copy static helper files from public/ to dist/ if present
static_files = [".htaccess", "robots.txt", "sitemap.xml", "sitemap_index.xml", "google42ed6d1b25378462.html"]
for f in static_files:
    src_f = os.path.join(public_dir, f)
    if os.path.exists(src_f):
        shutil.copy2(src_f, os.path.join(dist_dir, f))

if os.path.exists(zip_path):
    os.remove(zip_path)

print(f"Zipping {dist_dir} into {zip_path} with Linux forward slashes...")

with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(dist_dir):
        for file in files:
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, dist_dir)
            # Ensure Linux POSIX paths with / for web hosting compatibility
            zip_entry_path = rel_path.replace('\\', '/')
            zipf.write(full_path, zip_entry_path)

print("Zip creation successful!")
