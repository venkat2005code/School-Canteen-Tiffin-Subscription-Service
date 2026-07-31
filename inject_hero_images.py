import os
import glob
import shutil
import re

brain_dir = r"C:\Users\HP\.gemini\antigravity-ide\brain\d57654a0-b0a0-4f38-85cf-22b221e9b3b4"
assets_dir = r"c:\slot4\School Canteen & Tiffin Subscription Service\src\assets"

os.makedirs(assets_dir, exist_ok=True)

image_mapping = {
    "hero_about": "hero_about.png",
    "hero_services": "hero_services.png",
    "hero_contact": "hero_contact.png",
    "hero_faq": "hero_faq.png",
    "hero_home2": "hero_home2.png",
    "hero_nutrition": "hero_nutrition.png",
    "teriyaki_chicken": "teriyaki_chicken.png",
    "berry_smoothie": "berry_smoothie.png",
}

# Copy files
for prefix, new_name in image_mapping.items():
    matches = glob.glob(os.path.join(brain_dir, f"{prefix}_*.png"))
    if matches:
        latest = max(matches, key=os.path.getmtime)
        shutil.copy2(latest, os.path.join(assets_dir, new_name))
        print(f"Copied {os.path.basename(latest)} to {new_name}")

# Now inject into HTML files
def inject_hero_image(filepath, img_filename):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Check if already injected
    if f'src="./src/assets/{img_filename}"' in html:
        print(f"Image already injected in {filepath}")
        return

    # We want to inject inside `<div class="container text-center" style="...">`
    # Let's find the closing tag of that container. 
    # A robust way is to find `</section>` and inject right before the `</div>` that precedes it.
    # The structure is usually:
    # <section class="hero-wrapper" ...>
    #  <div class="container text-center" ...>
    #    ...
    #  </div>
    # </section>

    image_html = f"""
      <div style="margin-top: 3rem; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-lg);">
        <img src="./src/assets/{img_filename}" alt="Hero Image" style="width: 100%; height: auto; max-height: 500px; object-fit: cover; display: block;">
      </div>
    """

    # We will use regex to find </section> that is part of hero-wrapper.
    # Actually, replacing the first occurrence of `</div>\n</section>` is safer.
    
    match = re.search(r'(</section>)', html)
    if match:
        idx = match.start()
        # Find the last </div> before </section>
        idx_div = html.rfind('</div>', 0, idx)
        if idx_div != -1:
            html = html[:idx_div] + image_html + html[idx_div:]
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(html)
            print(f"Injected hero into {filepath}")

inject_hero_image("about.html", "hero_about.png")
inject_hero_image("services.html", "hero_services.png")
inject_hero_image("contact.html", "hero_contact.png")
inject_hero_image("faq.html", "hero_faq.png")
inject_hero_image("home2.html", "hero_home2.png")
inject_hero_image("nutrition.html", "hero_nutrition.png")

# Update index.html
with open("index.html", "r", encoding="utf-8") as f:
    idx_html = f.read()

idx_html = idx_html.replace('teriyaki_chicken.jpg', 'teriyaki_chicken.png')
idx_html = idx_html.replace('berry_smoothie.jpg', 'berry_smoothie.png')

with open("index.html", "w", encoding="utf-8") as f:
    f.write(idx_html)
print("Updated index.html")
