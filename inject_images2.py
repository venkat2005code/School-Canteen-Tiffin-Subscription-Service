import os
import bs4
import shutil

img_map = {
    '77c324c0-88d7-4df0-affb-5e89a6b50b0c.jpg': 'delivery-van.jpg',
    '3751dbf3-3ef3-44b7-b2d4-9c6998c349aa.jpg': 'bento-farm.jpg',
    'b3e6e3f0-8289-4102-8360-b81c5d782bbb.jpg': 'smart-canteen.jpg',
    '5b48274f-3fc5-4f10-b5dd-c0fc29c3df18.jpg': 'pediatric-dietitian.jpg',
    '2591d8ab-1cb6-4c1c-9842-443ebf6a028b.jpg': 'central-kitchen.jpg',
    'c405b625-135c-48ec-8172-eb9003da090a.jpg': 'event-catering.jpg',
}

os.makedirs('src/assets', exist_ok=True)
for src, dst in img_map.items():
    if os.path.exists(src):
        shutil.move(src, f'src/assets/{dst}')

def patch_html(file, func):
    with open(file, 'r', encoding='utf-8') as f:
        soup = bs4.BeautifulSoup(f.read(), 'html.parser')
    modified = func(soup)
    if modified:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(str(soup))

def patch_contact(soup):
    hq_title = soup.find(string=lambda t: t and 'Central Kitchen' in t)
    if hq_title:
        container = hq_title.parent.parent
        if not container.find('img', alt="Central Kitchen"):
            img = soup.new_tag('img', src="./src/assets/central-kitchen.jpg", alt="Central Kitchen", style="width: 100%; height: 350px; object-fit: cover; border-radius: var(--radius-lg); margin-bottom: 2rem; border: 1px solid var(--border-color);")
            hq_title.parent.insert_after(img)
            return True
    return False

def patch_about(soup):
    dietitian = soup.find(string=lambda t: t and 'Lead Pediatric Dietitian' in t)
    if dietitian:
        card = dietitian.parent.parent
        icon_div = card.find('div')
        if icon_div and 'fa-user-doctor' in str(icon_div):
            img = soup.new_tag('img', src="./src/assets/pediatric-dietitian.jpg", alt="Sarah, Pediatric Dietitian", style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; margin: 0 auto 1rem auto; display: block;")
            icon_div.replace_with(img)
            name_h4 = card.find('h4')
            if name_h4: name_h4.string = "Sarah Jenkins"
            return True
    return False

def patch_nutrition(soup):
    farm_title = soup.find(string=lambda t: t and 'Farm-to-School' in t)
    if farm_title:
        container = farm_title.parent.parent
        if not container.find('img', alt="Farm to School Bento"):
            img = soup.new_tag('img', src="./src/assets/bento-farm.jpg", alt="Farm to School Bento", style="width: 100%; height: 350px; object-fit: cover; border-radius: var(--radius-lg); margin-bottom: 2rem; border: 1px solid var(--border-color);")
            farm_title.parent.insert_after(img)
            return True
    return False

def patch_services(soup):
    mod = False
    canteen = soup.find(string=lambda t: t and 'School Canteen Management' in t)
    if canteen:
        container = canteen.parent.parent
        if not container.find('img', alt="Smart Canteen Kiosk"):
            img = soup.new_tag('img', src="./src/assets/smart-canteen.jpg", alt="Smart Canteen Kiosk", style="width: 100%; height: 350px; object-fit: cover; border-radius: var(--radius-lg); margin-bottom: 2rem; border: 1px solid var(--border-color);")
            canteen.parent.insert_after(img)
            mod = True
            
    events = soup.find(string=lambda t: t and 'Event Catering' in t)
    if events:
        container = events.parent.parent
        if not container.find('img', alt="Event Catering"):
            img = soup.new_tag('img', src="./src/assets/event-catering.jpg", alt="Event Catering", style="width: 100%; height: 350px; object-fit: cover; border-radius: var(--radius-lg); margin-bottom: 2rem; border: 1px solid var(--border-color);")
            events.parent.insert_after(img)
            mod = True
    return mod

def patch_home2(soup):
    logistics = soup.find(string=lambda t: t and 'Coverage Area' in t)
    if logistics:
        container = logistics.parent.parent
        if not container.find('img', alt="Delivery Van"):
            img = soup.new_tag('img', src="./src/assets/delivery-van.jpg", alt="Delivery Van", style="width: 100%; height: 350px; object-fit: cover; border-radius: var(--radius-lg); margin-bottom: 2rem; border: 1px solid var(--border-color);")
            logistics.parent.insert_after(img)
            return True
    return False

patch_html('contact.html', patch_contact)
patch_html('about.html', patch_about)
patch_html('nutrition.html', patch_nutrition)
patch_html('services.html', patch_services)
patch_html('home2.html', patch_home2)
print("Injection complete!")
