import os
import bs4
import shutil

img_map = {
    '915134ab-9983-493e-b8e5-3740a2f9a3c4.jpg': 'zero-artificial.jpg',
    'bed3a2ac-b323-42a1-89bb-7bfba7898080.jpg': 'dietitian-approved.jpg'
}

for src, dst in img_map.items():
    if os.path.exists(src):
        shutil.move(src, f'src/assets/{dst}')

def patch_nutrition(soup):
    mod = False
    
    zero = soup.find(string=lambda t: t and 'Zero Artificial Additives' in t)
    if zero:
        container = zero.parent.parent
        if not container.find('img', alt="Zero Artificial Additives"):
            img = soup.new_tag('img', src="./src/assets/zero-artificial.jpg", alt="Zero Artificial Additives", style="width: 100%; height: 350px; object-fit: cover; border-radius: var(--radius-lg); margin-bottom: 2rem; border: 1px solid var(--border-color);")
            zero.parent.insert_after(img)
            mod = True

    dietitian = soup.find(string=lambda t: t and 'Dietitian Approved' in t)
    if dietitian:
        container = dietitian.parent.parent
        if not container.find('img', alt="Dietitian Approved"):
            img = soup.new_tag('img', src="./src/assets/dietitian-approved.jpg", alt="Dietitian Approved", style="width: 100%; height: 350px; object-fit: cover; border-radius: var(--radius-lg); margin-bottom: 2rem; border: 1px solid var(--border-color);")
            dietitian.parent.insert_after(img)
            mod = True
            
    return mod

with open('nutrition.html', 'r', encoding='utf-8') as f:
    soup = bs4.BeautifulSoup(f.read(), 'html.parser')

if patch_nutrition(soup):
    with open('nutrition.html', 'w', encoding='utf-8') as f:
        f.write(str(soup))
    print("Injection into nutrition.html complete!")
else:
    print("No changes made.")
