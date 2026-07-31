import sys
import re

with open('src/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

replacement = """  handleRoute() {
    const path = window.location.pathname;
    const isMultiPage = ['about.html', 'services.html', 'contact.html', 'home2.html', 'parent-dashboard.html', 'admin-dashboard.html', 'faq.html', 'nutrition.html'].some(p => path.includes(p));
    
    if (isMultiPage) {
       // On a dedicated page, just set the active link and return
       document.querySelectorAll('.nav-link, .dropdown-item').forEach(el => {
         const href = el.getAttribute('href') || '';
         if (href.includes(path.split('/').pop())) {
           el.classList.add('active');
         } else {
           el.classList.remove('active');
         }
       });
       return;
    }"""

# We just need to replace the `const isMultiPage = ...` line, but it's easier to regex the whole block or just the array string.
js = js.replace("['about.html', 'services.html', 'contact.html', 'home2.html', 'parent-dashboard.html', 'admin-dashboard.html']", "['about.html', 'services.html', 'contact.html', 'home2.html', 'parent-dashboard.html', 'admin-dashboard.html', 'faq.html', 'nutrition.html']")

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(js)
