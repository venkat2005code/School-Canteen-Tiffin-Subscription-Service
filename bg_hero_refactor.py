import os
import bs4

files_to_update = [
    "about.html",
    "services.html",
    "contact.html",
    "faq.html",
    "home2.html",
    "nutrition.html"
]

for filename in files_to_update:
    if not os.path.exists(filename):
        continue
        
    with open(filename, 'r', encoding='utf-8') as f:
        html = f.read()
        
    soup = bs4.BeautifulSoup(html, 'html.parser')
    
    hero_section = soup.select_one('.hero-wrapper')
    if not hero_section:
        continue
        
    # Find the injected div by looking for the image
    img = hero_section.select_one('img[src^="./src/assets/hero_"]')
    if not img:
        continue
        
    img_src = img['src']
    img_div = img.find_parent('div')
    if img_div:
        img_div.decompose() # Remove the injected div
        
    # Apply background image and dark overlay
    bg_style = f"position: relative; background: linear-gradient(rgba(11, 15, 25, 0.8), rgba(11, 15, 25, 0.85)), url('{img_src}') center/cover no-repeat; padding: 6rem 0;"
    hero_section['style'] = bg_style
    
    # Update text colors to white for readability
    hero_title = hero_section.select_one('.hero-title')
    if hero_title:
        # Keep existing style if any, append color white
        existing_style = hero_title.get('style', '')
        hero_title['style'] = existing_style + ('; ' if existing_style and not existing_style.endswith(';') else '') + 'color: #ffffff !important;'
        
    hero_desc = hero_section.select_one('.hero-description')
    if hero_desc:
        existing_style = hero_desc.get('style', '')
        hero_desc['style'] = existing_style + ('; ' if existing_style and not existing_style.endswith(';') else '') + 'color: #e2e8f0 !important;'
        
    section_tag = hero_section.select_one('.section-tag')
    if section_tag:
        existing_style = section_tag.get('style', '')
        section_tag['style'] = existing_style + ('; ' if existing_style and not existing_style.endswith(';') else '') + 'background: rgba(255,255,255,0.95); color: var(--primary); border: none;'
        
    # Update the container padding to ensure it's vertically centered
    container = hero_section.select_one('.container')
    if container:
        existing_style = container.get('style', '')
        # Remove padding from container since we added it to hero-wrapper
        import re
        new_style = re.sub(r'padding:[^;]+;', '', existing_style)
        container['style'] = new_style + ('; ' if new_style and not new_style.endswith(';') else '') + 'position: relative; z-index: 1;'
        
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(str(soup))
        
    print(f"Updated {filename} to use background image.")
