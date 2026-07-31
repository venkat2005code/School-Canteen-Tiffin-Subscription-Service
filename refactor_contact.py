import re

replacements = {
    'contact.html': [
        (
            r'<div class="features-grid">\s*<div class="feature-card text-center">.*?<i class="fa-solid fa-phone".*?</div>\s*<div class="feature-card text-center">.*?<i class="fa-solid fa-envelope-open".*?</div>\s*<div class="feature-card text-center">.*?<i class="fa-solid fa-comments".*?</div>\s*</div>',
            """<div class="split-layout">
            <div class="split-image-container" style="flex-direction: column;">
              <h3 style="margin-bottom: 1.5rem;">Contact Information</h3>
              <div style="text-align: left;">
                <p style="margin-bottom: 1rem;"><i class="fa-solid fa-phone" style="color: var(--primary); font-size: 1.5rem; width: 30px; margin-right: 15px;"></i> <strong>Phone:</strong> +1 (800) 555-NOURISH</p>
                <p style="margin-bottom: 1rem;"><i class="fa-solid fa-envelope-open" style="color: var(--secondary); font-size: 1.5rem; width: 30px; margin-right: 15px;"></i> <strong>Email:</strong> support@nourishkid.com</p>
                <p><i class="fa-solid fa-comments" style="color: var(--accent); font-size: 1.5rem; width: 30px; margin-right: 15px;"></i> <strong>Live Chat:</strong> Available in Parent Portal</p>
              </div>
            </div>
            <div class="split-image-container" style="background: var(--bg-primary); padding: 0; overflow: hidden; position: relative;">
               <!-- Map Placeholder Image -->
               <div style="width: 100%; height: 300px; display: flex; align-items: center; justify-content: center; background: #E0E0E0;">
                 <i class="fa-solid fa-map-location-dot" style="font-size: 4rem; color: #9E9E9E;"></i>
               </div>
            </div>
          </div>""",
            re.DOTALL
        )
    ]
}

for file_name, patterns in replacements.items():
    with open(file_name, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for pattern, replacement, flags in patterns:
        content = re.sub(pattern, replacement, content, flags=flags)
    
    with open(file_name, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Refactored layouts in {file_name}")
