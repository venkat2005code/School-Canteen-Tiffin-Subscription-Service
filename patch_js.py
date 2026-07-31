import sys
import re

with open('src/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

replacement = """  handleRoute() {
    const path = window.location.pathname;
    const isMultiPage = ['about.html', 'services.html', 'contact.html', 'home2.html', 'parent-dashboard.html', 'admin-dashboard.html'].some(p => path.includes(p));
    
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
    }

    const hash = window.location.hash.replace('#', '');
    const targetMap = {
      'home-1': 'view-home-1',
      'user-dashboard': 'view-user-dashboard',
      'admin-dashboard': 'view-admin-dashboard'
    };

    if (hash && targetMap[hash]) {
      this.switchView(targetMap[hash]);
    } else {
      this.switchView('view-home-1');
    }
  }"""

js = re.sub(r'  handleRoute\(\) \{[\s\S]*?  setupEventListeners\(\) \{', replacement + '\n\n  setupEventListeners() {', js)

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(js)
