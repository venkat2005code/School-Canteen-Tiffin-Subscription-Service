import re

def insert_image(filename, pattern, image_src):
    with open(filename, 'r', encoding='utf-8') as f:
        html = f.read()
    
    replacement = rf'\1\n<img src="{image_src}" style="width: 100%; max-width: 600px; border-radius: var(--radius-lg); margin: 2rem auto; display: block; box-shadow: var(--shadow-md);">'
    html = re.sub(pattern, replacement, html)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Injected {image_src} into {filename}")

insert_image('about.html', r'(<h2 class="section-title">Our Journey</h2>)', './src/assets/nutritionist.jpg')
insert_image('services.html', r'(<h2 class="section-title">Smart Canteen Hardware</h2>)', './src/assets/smart-canteen.jpg')
