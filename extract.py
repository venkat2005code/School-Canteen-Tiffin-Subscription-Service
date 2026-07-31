import os
import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace links
html = html.replace('href="#home-1"', 'href="./index.html"')
html = html.replace('href="#home-2"', 'href="./home2.html"')
html = html.replace('href="#about"', 'href="./about.html"')
html = html.replace('href="#services"', 'href="./services.html"')
html = html.replace('href="#contact"', 'href="./contact.html"')

html = html.replace('data-target="view-home-1"', '')
html = html.replace('data-target="view-home-2"', '')
html = html.replace('data-target="view-about"', '')
html = html.replace('data-target="view-services"', '')
html = html.replace('data-target="view-contact"', '')

# We can split the main container
main_start = html.find('<main id="app-view-container">')
main_end = html.find('</main>', main_start) + len('</main>')

header = html[:main_start]
footer = html[main_end:]
main_content = html[main_start:main_end]

# Regex to find each section exactly
sections = {
    'view-home-1': re.search(r'(<div class="view-section active-view" id="view-home-1">.*?</section>\s*</div>)', main_content, re.DOTALL),
    'view-home-2': re.search(r'(<div class="view-section" id="view-home-2">.*?</section>\s*</div>)', main_content, re.DOTALL),
    'view-about': re.search(r'(<div class="view-section" id="view-about">.*?</section>\s*</div>)', main_content, re.DOTALL),
    'view-services': re.search(r'(<div class="view-section" id="view-services">.*?</section>\s*</div>)', main_content, re.DOTALL),
    'view-contact': re.search(r'(<div class="view-section" id="view-contact">.*?</section>\s*</div>)', main_content, re.DOTALL),
}

files_to_create = {
    'index.html': 'view-home-1',
    'home2.html': 'view-home-2',
    'about.html': 'view-about',
    'services.html': 'view-services',
    'contact.html': 'view-contact'
}

for file_name, sec_id in files_to_create.items():
    sec_match = sections[sec_id]
    if sec_match:
        sec_html = sec_match.group(1)
        # Ensure it has 'active-view' class if it's gonna be the main view
        sec_html = sec_html.replace('class="view-section"', 'class="view-section active-view"')
        
        full_content = header + '<main id="app-view-container">\n    ' + sec_html + '\n  </main>' + footer
        
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write(full_content)
        print(f"Created {file_name}")
    else:
        print(f"Could not find section {sec_id}")
