import os
import glob
import re

# 1. Content for the new pages
faq_content = """    <div class="view-section active-view" id="view-faq">
      <section class="hero-wrapper" style="background: linear-gradient(135deg, var(--primary-light) 0%, #FFF3E0 100%);">
        <div class="container text-center" style="padding: 4rem 1rem;">
          <span class="section-tag"><i class="fa-solid fa-circle-question"></i> Help Center</span>
          <h1 class="hero-title">Frequently Asked Questions</h1>
          <p class="hero-description" style="max-width: 700px; margin: 0 auto;">
            Everything you need to know about our tiffin subscriptions, allergen safety, and billing policies.
          </p>
        </div>
      </section>
      <section class="features-section">
        <div class="container">
          <div class="features-grid" style="grid-template-columns: 1fr; max-width: 800px; margin: 0 auto;">
            
            <div class="feature-card" style="text-align: left;">
              <h3><i class="fa-solid fa-seedling" style="color: var(--primary); margin-right: 10px;"></i> How are food allergies handled?</h3>
              <p>We operate 100% nut-free kitchens. For gluten, dairy, and egg allergies, we have dedicated isolated prep zones and color-coded sealed tiffin boxes to guarantee cross-contamination safety.</p>
            </div>
            
            <div class="feature-card" style="text-align: left;">
              <h3><i class="fa-solid fa-calendar-xmark" style="color: var(--secondary); margin-right: 10px;"></i> Can I pause the subscription if my child is sick?</h3>
              <p>Yes. You can pause delivery for the next day via the Parent Portal up until 8:00 PM the night before. Your wallet will be instantly refunded with credits.</p>
            </div>

            <div class="feature-card" style="text-align: left;">
              <h3><i class="fa-solid fa-id-card" style="color: var(--accent); margin-right: 10px;"></i> What happens if my child loses their RFID canteen card?</h3>
              <p>You can instantly freeze the card via the Parent Dashboard. A replacement card can be requested and will be issued by the school administration the next morning for a small $2 fee.</p>
            </div>
            
          </div>
        </div>
      </section>
    </div>"""

nutrition_content = """    <div class="view-section active-view" id="view-nutrition">
      <section class="hero-wrapper" style="background: linear-gradient(135deg, var(--secondary-light) 0%, #E8F5E9 100%);">
        <div class="container text-center" style="padding: 4rem 1rem;">
          <span class="section-tag"><i class="fa-solid fa-leaf"></i> Sourcing & Quality</span>
          <h1 class="hero-title">Nutrition Guidelines</h1>
          <p class="hero-description" style="max-width: 700px; margin: 0 auto;">
            Our "No Junk" policy ensures that every calorie serves your child's growth. We source local, organic ingredients and partner with leading pediatric dietitians.
          </p>
        </div>
      </section>
      <section class="features-section">
        <div class="container">
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon-wrapper"><i class="fa-solid fa-carrot"></i></div>
              <h3>Farm-to-School</h3>
              <p>We source our vegetables directly from local organic farms within a 50-mile radius to ensure maximum nutrient retention.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon-wrapper" style="background: var(--secondary-light); color: var(--secondary);"><i class="fa-solid fa-ban"></i></div>
              <h3>Zero Artificial Additives</h3>
              <p>No artificial colors, preservatives, or high-fructose corn syrup. We sweeten with natural honey, dates, and fresh fruit.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon-wrapper" style="background: var(--accent-light); color: var(--accent);"><i class="fa-solid fa-stethoscope"></i></div>
              <h3>Dietitian Approved</h3>
              <p>Every meal plan is audited to meet or exceed USDA and international pediatric nutrition guidelines for macronutrient balance.</p>
            </div>
          </div>
        </div>
      </section>
    </div>"""


# 2. Extract base layout from about.html
with open('about.html', 'r', encoding='utf-8') as f:
    about_html = f.read()

main_start = about_html.find('<main id="app-view-container">')
main_end = about_html.find('</main>', main_start) + len('</main>')

header = about_html[:main_start]
footer = about_html[main_end:]

# 3. Create faq.html and nutrition.html
with open('faq.html', 'w', encoding='utf-8') as f:
    f.write(header + '<main id="app-view-container">\n' + faq_content + '\n  </main>' + footer)

with open('nutrition.html', 'w', encoding='utf-8') as f:
    f.write(header + '<main id="app-view-container">\n' + nutrition_content + '\n  </main>' + footer)

print("Created faq.html and nutrition.html")

# 4. Inject links into all HTML files
html_files = glob.glob("*.html")

header_links = """
          <li class="nav-item">
            <a href="./faq.html" class="nav-link" >FAQ</a>
          </li>
          <li class="nav-item">
            <a href="./nutrition.html" class="nav-link" >Nutrition</a>
          </li>"""

footer_links = """
            <li><a href="./faq.html" class="view-trigger" ><i
                  class="fa-solid fa-angle-right"></i> FAQ & Support</a></li>
            <li><a href="./nutrition.html" class="view-trigger" ><i
                  class="fa-solid fa-angle-right"></i> Nutrition & Sourcing</a></li>"""

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if already patched
    if 'faq.html' in content:
        continue
        
    # Inject into Header (before Contact)
    content = content.replace(
        '<li class="nav-item">\n            <a href="./contact.html" class="nav-link" >Contact</a>\n          </li>',
        header_links + '\n          <li class="nav-item">\n            <a href="./contact.html" class="nav-link" >Contact</a>\n          </li>'
    )
    
    # Inject into Footer (before Contact)
    content = content.replace(
        '<li><a href="./contact.html" class="view-trigger" ><i\n                  class="fa-solid fa-angle-right"></i> Contact & Help</a></li>',
        footer_links + '\n            <li><a href="./contact.html" class="view-trigger" ><i\n                  class="fa-solid fa-angle-right"></i> Contact & Help</a></li>'
    )
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Updated {file}")
