import os
import bs4
import glob

unused_images = [
    "chef.jpg",
    "hero_classroom.jpg",
    "nutritionist.jpg",
    "smart-canteen.jpg",
    "veggie_pasta.jpg"
]

for file in glob.glob("*.html"):
    with open(file, 'r', encoding='utf-8') as f:
        html = f.read()
    
    soup = bs4.BeautifulSoup(html, 'html.parser')
    print(f"\n--- {file} ---")
    
    # We look for all distinct sections (e.g., <section>)
    sections = soup.find_all('section')
    for i, sec in enumerate(sections):
        # check if this section contains an image
        imgs = sec.find_all('img')
        bg = sec.get('style', '')
        has_bg = 'background: url' in bg or 'background-image: url' in bg or 'linear-gradient' in bg
        
        # Get section title or id for context
        title = sec.find(['h2', 'h1'])
        title_text = title.text.strip() if title else sec.get('id', f'section-{i}')
        
        if not imgs and not has_bg:
            print(f"Missing visual in section: {title_text}")
