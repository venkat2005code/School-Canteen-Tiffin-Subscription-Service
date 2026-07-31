import os
import bs4
import glob
import re

html_files = glob.glob('*.html')
used_images = {}
missing_images = []
repeated_images = []

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        html = f.read()
    
    soup = bs4.BeautifulSoup(html, 'html.parser')
    
    # Check <img> tags
    for img in soup.find_all('img'):
        src = img.get('src')
        if not src:
            continue
        
        # Keep track of usage
        if src not in used_images:
            used_images[src] = []
        used_images[src].append((file, 'img'))
        
    # Check inline styles for background-image: url(...)
    # Simple regex to find url(...)
    urls = re.findall(r'url\([\'"]?([^\'"\)]+)[\'"]?\)', html)
    for url in urls:
        if url not in used_images:
            used_images[url] = []
        used_images[url].append((file, 'bg'))

print(f"Total unique images referenced: {len(used_images)}")

for src, usage in used_images.items():
    # check if exists
    # handle relative paths like ./src/assets/...
    path_to_check = src
    if src.startswith('./'):
        path_to_check = src[2:]
    
    exists = os.path.exists(path_to_check)
    status = "EXISTS" if exists else "MISSING"
    
    if not exists:
        missing_images.append(src)
        
    if len(usage) > 1:
        # It's used multiple times. Are they on different pages or same page placeholder?
        repeated_images.append((src, usage))
        
    print(f"{status}: {src} - Used {len(usage)} times")

print("\n--- Summary ---")
print(f"Missing images: {len(missing_images)}")
for m in missing_images:
    print(" -", m)

print(f"Repeated images: {len(repeated_images)}")
for r, uses in repeated_images:
    print(" -", r, "in", [u[0] for u in uses])
