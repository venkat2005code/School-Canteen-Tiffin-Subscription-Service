import re
import os

replacements = {
    'index.html': [
        (
            r'<div class="features-grid">.*?<div class="feature-card">.*?Sarah M., Parent</h4>\s*</div>.*?</div>\s*</div>\s*</section>',
            """<div class="container">
          <div class="alternating-row">
            <div class="split-image-container"><i class="fa-solid fa-quote-left"></i></div>
            <div>
              <p style="font-size: 1.2rem; font-style: italic;">"The Tiffin service has been a lifesaver. My son actually looks forward to lunch, and I love the organic ingredients!"</p>
              <h4 style="margin-top: 15px; color: var(--primary);">- Sarah M., Parent</h4>
            </div>
          </div>
          <div class="alternating-row">
            <div class="split-image-container" style="background: var(--secondary-light);"><i class="fa-solid fa-shield-halved"></i></div>
            <div>
              <p style="font-size: 1.2rem; font-style: italic;">"The allergy isolation protocols gave us the peace of mind we needed to finally subscribe to a school lunch program."</p>
              <h4 style="margin-top: 15px; color: var(--secondary);">- James T., Parent</h4>
            </div>
          </div>
        </div>
      </section>""",
            re.DOTALL
        )
    ],
    'home2.html': [
        (
            r'<div class="features-grid">\s*<div class="feature-card text-center">.*?A-Grade</h3>\s*<p>Local Health Department Rating</p>\s*</div>\s*</div>\s*</div>\s*</section>',
            """<div class="stats-bar">
            <div class="stat-box">
              <i class="fa-solid fa-certificate" style="font-size: 2rem; margin-bottom: 1rem;"></i>
              <h3 style="color: white;">ISO 22000</h3>
              <p>Certified Food Safety Management</p>
            </div>
            <div class="stat-box">
              <i class="fa-solid fa-clipboard-check" style="font-size: 2rem; margin-bottom: 1rem;"></i>
              <h3 style="color: white;">HACCP</h3>
              <p>Hazard Analysis and Critical Control Points</p>
            </div>
            <div class="stat-box">
              <i class="fa-solid fa-star" style="font-size: 2rem; margin-bottom: 1rem;"></i>
              <h3 style="color: white;">A-Grade</h3>
              <p>Local Health Department Rating</p>
            </div>
          </div>
        </div>
      </section>""",
            re.DOTALL
        )
    ],
    'about.html': [
        (
            r'<div style="max-width: 600px; margin: 0 auto; border-left: 3px solid var\(--primary\); padding-left: 2rem;">.*?</div>\s*</div>\s*</div>\s*</section>',
            """<div class="timeline-container">
            <div class="timeline-item">
              <h4 style="color: var(--primary); margin-bottom: 0.5rem;">2020</h4>
              <p>Founded by pediatric dietitians noticing a gap in healthy school lunches.</p>
            </div>
            <div class="timeline-item">
              <h4 style="color: var(--secondary); margin-bottom: 0.5rem;">2022</h4>
              <p>Launched the RFID Cashless Canteen pilot program in 5 schools.</p>
            </div>
            <div class="timeline-item">
              <h4 style="color: var(--accent); margin-bottom: 0.5rem;">2025</h4>
              <p>Expanded central kitchen to serve over 14,000 daily meals with automated logistics.</p>
            </div>
          </div>
        </div>
      </section>""",
            re.DOTALL
        )
    ],
    'services.html': [
        (
            r'<div style="background: var\(--bg-primary\); padding: 2rem; border-radius: var\(--radius-lg\); text-align: left; max-width: 800px; margin: 0 auto; border: 1px solid var\(--border-color\);">.*?</div>\s*</div>\s*</section>',
            """<div class="icon-list-container">
            <div class="icon-list-item">
              <div class="icon-list-icon"><i class="fa-solid fa-apple-whole"></i></div>
              <div>
                <h4 style="margin-bottom: 0.5rem;">Interactive Seminars</h4>
                <p>Monthly interactive nutrition seminars for primary students to learn about macros.</p>
              </div>
            </div>
            <div class="icon-list-item">
              <div class="icon-list-icon" style="background: var(--secondary-light); color: var(--secondary);"><i class="fa-solid fa-hat-chef"></i></div>
              <div>
                <h4 style="margin-bottom: 0.5rem;">Chef for a Day</h4>
                <p>Workshops to teach basic culinary skills and food safety to older students.</p>
              </div>
            </div>
          </div>
        </div>
      </section>""",
            re.DOTALL
        )
    ],
    'faq.html': [
        (
            r'<div style="max-width: 800px; margin: 0 auto;">\s*<div class="feature-card".*?</div>\s*<div class="feature-card".*?</div>\s*</div>\s*</div>\s*</section>',
            """<div style="max-width: 800px; margin: 0 auto;">
            <details class="accordion-item">
              <summary class="accordion-summary">How do I change my subscription tier?</summary>
              <div class="accordion-content">You can upgrade or downgrade your plan directly from the Parent Dashboard under "Manage Subscription". Changes take effect the following Monday.</div>
            </details>
            <details class="accordion-item">
              <summary class="accordion-summary">Are there fees for topping up the RFID wallet?</summary>
              <div class="accordion-content">No, adding funds via bank transfer or credit card to the student's RFID wallet incurs zero processing fees on your end.</div>
            </details>
          </div>
        </div>
      </section>""",
            re.DOTALL
        )
    ],
    'nutrition.html': [
        (
            r'<div class="features-grid">\s*<div class="feature-card text-center".*?</div>\s*<div class="feature-card text-center".*?</div>\s*</div>\s*</div>\s*</section>',
            """<div class="split-layout">
            <div class="split-image-container" style="background: #FFEBEE; border-color: #EF9A9A; flex-direction: column;">
              <h3 style="color: #E53935; margin-bottom: 1rem;"><i class="fa-solid fa-ban"></i> Strictly Banned</h3>
              <ul style="list-style-type: none; padding: 0; text-align: center;">
                <li style="margin-bottom: 0.5rem;">High Fructose Corn Syrup</li>
                <li style="margin-bottom: 0.5rem;">Artificial Food Dyes (Red 40)</li>
                <li style="margin-bottom: 0.5rem;">Trans Fats & Oils</li>
                <li>Synthetic Preservatives</li>
              </ul>
            </div>
            <div class="split-image-container" style="background: #E8F5E9; border-color: #A5D6A7; flex-direction: column;">
              <h3 style="color: var(--primary); margin-bottom: 1rem;"><i class="fa-solid fa-check"></i> Always Included</h3>
              <ul style="list-style-type: none; padding: 0; text-align: center;">
                <li style="margin-bottom: 0.5rem;">Whole Grains</li>
                <li style="margin-bottom: 0.5rem;">Lean Proteins</li>
                <li style="margin-bottom: 0.5rem;">Fresh Seasonal Fruits</li>
                <li>Cold-Pressed Oils</li>
              </ul>
            </div>
          </div>
        </div>
      </section>""",
            re.DOTALL
        )
    ]
}

# faq.html has multiple features-grids we want to replace with accordions.
# The regex above will only replace the first one easily, let's just do a blanket replace for faq.html for specific text blocks

# Execute replacements
for file_name, patterns in replacements.items():
    if not os.path.exists(file_name):
        continue
    with open(file_name, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    for pattern, replacement, flags in patterns:
        content = re.sub(pattern, replacement, content, flags=flags)
    
    if original_content != content:
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Refactored layouts in {file_name}")
    else:
        print(f"No match found for {file_name}")

# Now specifically fix faq.html other sections (Dietary, Delivery) since they match a similar pattern but have different text
faq_fixes = [
    ("Dietary & Allergens", "What if my child has a severe, uncommon allergy?", "Please contact our support team directly. We handle top 8 allergens as standard, but can accommodate specific medical dietary needs upon consultation.", "Is the meat halal/kosher?", "We offer dedicated halal and vegetarian menus. Please ensure you select the appropriate restriction in the student profile."),
    ("Delivery & Logistics", "How do I know my child received their meal?", "We send automated push notifications and SMS alerts the moment the delivery van drops the tiffins at the designated classroom rack.", "What happens on snow days/school closures?", "If the school announces an official closure, all meals for that day are automatically cancelled and credited back to your account.")
]

if os.path.exists('faq.html'):
    with open('faq.html', 'r', encoding='utf-8') as f:
        content = f.read()
    for title, q1, a1, q2, a2 in faq_fixes:
        pattern = r'<div style="max-width: 800px; margin: 0 auto;">\s*<div class="feature-card".*?' + re.escape(q1) + r'.*?</div>\s*<div class="feature-card".*?' + re.escape(q2) + r'.*?</div>\s*</div>'
        replacement = f"""<div style="max-width: 800px; margin: 0 auto;">
            <details class="accordion-item">
              <summary class="accordion-summary">{q1}</summary>
              <div class="accordion-content">{a1}</div>
            </details>
            <details class="accordion-item">
              <summary class="accordion-summary">{q2}</summary>
              <div class="accordion-content">{a2}</div>
            </details>
          </div>"""
        content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    with open('faq.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed FAQ accordions")
