import bs4

def inject_image(file_name, target_text, img_src):
    with open(file_name, 'r', encoding='utf-8') as f:
        html = f.read()
    
    soup = bs4.BeautifulSoup(html, 'html.parser')
    
    # Find the element containing the target text
    target_elem = soup.find(string=lambda t: t and target_text in t)
    
    if target_elem:
        # Find the parent section or container
        parent_container = target_elem.find_parent('div', class_='container')
        if not parent_container:
            parent_container = target_elem.find_parent('section')
            
        if parent_container:
            # Check if this container already has an image to avoid duplicates
            if not parent_container.find('img'):
                img_tag = soup.new_tag('img', src=img_src, style="width: 100%; max-width: 600px; border-radius: var(--radius-lg); margin: 2rem auto; display: block; box-shadow: var(--shadow-md);")
                # Insert after the title or description
                desc = parent_container.find('p', class_='section-description')
                if desc:
                    desc.insert_after(img_tag)
                else:
                    title = parent_container.find(['h2', 'h1'])
                    if title:
                        title.insert_after(img_tag)
                    else:
                        parent_container.insert(0, img_tag)
                        
                with open(file_name, 'w', encoding='utf-8') as f:
                    f.write(str(soup))
                print(f"Injected {img_src} into {file_name} under '{target_text}'")
            else:
                print(f"Image already exists in section '{target_text}' of {file_name}")
        else:
            print(f"Could not find container for '{target_text}' in {file_name}")
    else:
        print(f"Could not find text '{target_text}' in {file_name}")

inject_image('about.html', 'Our Mission', './src/assets/chef.jpg')
inject_image('about.html', 'Our Journey', './src/assets/nutritionist.jpg')
inject_image('services.html', 'Smart Canteen Hardware', './src/assets/smart-canteen.jpg')
inject_image('home2.html', 'Certified Safe', './src/assets/veggie_pasta.jpg')
inject_image('contact.html', 'Direct Support Channels', './src/assets/hero_classroom.jpg')
