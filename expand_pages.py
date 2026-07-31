import os

# New content blocks for each page

page_injections = {
    'index.html': """
      <!-- Testimonials -->
      <section class="features-section" style="background: var(--bg-card);">
        <div class="container">
          <div class="section-header text-center">
            <span class="section-tag"><i class="fa-solid fa-comments"></i> Parent Feedback</span>
            <h2 class="section-title">What Our Community Says</h2>
          </div>
          <div class="features-grid">
            <div class="feature-card">
              <p>"The Tiffin service has been a lifesaver. My son actually looks forward to lunch, and I love the organic ingredients!"</p>
              <h4 style="margin-top: 15px;">- Sarah M., Parent</h4>
            </div>
            <div class="feature-card">
              <p>"The allergy isolation protocols gave us the peace of mind we needed to finally subscribe to a school lunch program."</p>
              <h4 style="margin-top: 15px;">- James T., Parent</h4>
            </div>
            <div class="feature-card">
              <p>"Easy to use portal, healthy food, and no more morning rush packing lunches. Highly recommend to all parents."</p>
              <h4 style="margin-top: 15px;">- Emily R., Parent</h4>
            </div>
          </div>
        </div>
      </section>

      <!-- App Download Banner -->
      <section class="hero-wrapper" style="background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%); color: white; padding: 4rem 1rem;">
        <div class="container text-center">
          <h2 class="hero-title" style="color: white; font-size: 2.5rem;">Manage Meals on the Go</h2>
          <p class="hero-description" style="color: rgba(255,255,255,0.9); max-width: 600px; margin: 0 auto 2rem auto;">
            Download the NourishKid Parent Portal app to pause subscriptions, top up RFID wallets, and track nutrition directly from your phone.
          </p>
          <div>
            <button class="btn btn-outline" style="color: white; border-color: white; margin: 0 10px;"><i class="fa-brands fa-apple"></i> App Store</button>
            <button class="btn btn-outline" style="color: white; border-color: white; margin: 0 10px;"><i class="fa-brands fa-google-play"></i> Google Play</button>
          </div>
        </div>
      </section>
""",

    'home2.html': """
      <!-- Coverage Area -->
      <section class="features-section" style="background: var(--bg-card);">
        <div class="container text-center">
          <div class="section-header">
            <h2 class="section-title">Our Delivery Coverage</h2>
            <p class="section-subtitle">We currently serve over 45 schools across the metropolitan district with our fleet of 20+ cold-chain vans.</p>
          </div>
          <div style="background: var(--bg-primary); padding: 3rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
            <i class="fa-solid fa-map-location-dot" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
            <h3>Expanding Daily</h3>
            <p>From Sector 1 to Sector 12, our logistics network ensures no school is left out.</p>
          </div>
        </div>
      </section>

      <!-- Safety Certifications -->
      <section class="features-section">
        <div class="container">
          <div class="section-header text-center">
            <h2 class="section-title">Certified Safe</h2>
          </div>
          <div class="features-grid">
            <div class="feature-card text-center">
              <i class="fa-solid fa-certificate" style="font-size: 2rem; color: var(--secondary); margin-bottom: 1rem;"></i>
              <h3>ISO 22000</h3>
              <p>Certified Food Safety Management</p>
            </div>
            <div class="feature-card text-center">
              <i class="fa-solid fa-clipboard-check" style="font-size: 2rem; color: var(--accent); margin-bottom: 1rem;"></i>
              <h3>HACCP</h3>
              <p>Hazard Analysis and Critical Control Points</p>
            </div>
            <div class="feature-card text-center">
              <i class="fa-solid fa-star" style="font-size: 2rem; color: var(--primary); margin-bottom: 1rem;"></i>
              <h3>A-Grade</h3>
              <p>Local Health Department Rating</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Success Metrics -->
      <section class="features-section" style="background: var(--bg-card);">
        <div class="container text-center">
          <h2 class="section-title">Logistics Impact</h2>
          <div class="hero-stats-row" style="margin-top: 2rem; background: var(--bg-primary); padding: 2rem; border-radius: var(--radius-lg);">
            <div class="stat-item">
              <h3 style="color: var(--primary);">99.8%</h3>
              <p>On-Time Desk Delivery</p>
            </div>
            <div class="stat-item">
              <h3 style="color: var(--secondary);">-40%</h3>
              <p>Reduction in Food Waste</p>
            </div>
            <div class="stat-item">
              <h3 style="color: var(--accent);">0</h3>
              <p>Cold-Chain Breaks</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Partner CTA -->
      <section class="hero-wrapper" style="background: var(--primary-light); padding: 4rem 1rem;">
        <div class="container text-center">
          <h2 class="hero-title" style="font-size: 2rem;">Bring NourishKid to Your School</h2>
          <p class="hero-description" style="max-width: 600px; margin: 0 auto 2rem auto;">
            School administrators, upgrade your canteen operations with zero upfront capital expenditure.
          </p>
          <button class="btn btn-primary">Schedule a Logistics Demo</button>
        </div>
      </section>
""",

    'about.html': """
      <!-- Core Values -->
      <section class="features-section">
        <div class="container">
          <div class="section-header text-center">
            <h2 class="section-title">Our Core Values</h2>
          </div>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon-wrapper"><i class="fa-solid fa-heart-pulse"></i></div>
              <h3>Child First</h3>
              <p>Every decision we make prioritizes the health and development of the students we serve.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon-wrapper" style="background: var(--secondary-light); color: var(--secondary);"><i class="fa-solid fa-eye"></i></div>
              <h3>Total Transparency</h3>
              <p>From ingredient sourcing to kitchen hygiene, parents have full visibility into what their kids eat.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon-wrapper" style="background: var(--accent-light); color: var(--accent);"><i class="fa-solid fa-leaf"></i></div>
              <h3>Sustainability</h3>
              <p>Eco-friendly packaging and optimized route planning to minimize our carbon footprint.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Meet the Team -->
      <section class="features-section" style="background: var(--bg-card);">
        <div class="container text-center">
          <h2 class="section-title">Leadership & Culinary Team</h2>
          <div class="features-grid" style="margin-top: 2rem;">
            <div class="feature-card text-center" style="background: var(--bg-primary);">
              <div style="width: 80px; height: 80px; background: var(--border-color); border-radius: 50%; margin: 0 auto 1rem auto; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-user-doctor" style="font-size: 2rem;"></i></div>
              <h4>Dr. Helen Cho</h4>
              <p style="font-size: 0.9rem; color: var(--text-muted);">Lead Pediatric Dietitian</p>
            </div>
            <div class="feature-card text-center" style="background: var(--bg-primary);">
              <div style="width: 80px; height: 80px; background: var(--border-color); border-radius: 50%; margin: 0 auto 1rem auto; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-utensils" style="font-size: 2rem;"></i></div>
              <h4>Chef Marcus Chen</h4>
              <p style="font-size: 0.9rem; color: var(--text-muted);">Executive Culinary Director</p>
            </div>
            <div class="feature-card text-center" style="background: var(--bg-primary);">
              <div style="width: 80px; height: 80px; background: var(--border-color); border-radius: 50%; margin: 0 auto 1rem auto; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-truck-fast" style="font-size: 2rem;"></i></div>
              <h4>Sarah Jenkins</h4>
              <p style="font-size: 0.9rem; color: var(--text-muted);">Head of Operations</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Our Journey -->
      <section class="features-section">
        <div class="container">
          <div class="section-header text-center">
            <h2 class="section-title">Our Journey</h2>
            <p class="section-subtitle">How we grew from a small community kitchen to a city-wide network.</p>
          </div>
          <div style="max-width: 600px; margin: 0 auto; border-left: 3px solid var(--primary); padding-left: 2rem;">
            <div style="margin-bottom: 2rem;">
              <h4 style="color: var(--primary);">2020</h4>
              <p>Founded by pediatric dietitians noticing a gap in healthy school lunches.</p>
            </div>
            <div style="margin-bottom: 2rem;">
              <h4 style="color: var(--secondary);">2022</h4>
              <p>Launched the RFID Cashless Canteen pilot program in 5 schools.</p>
            </div>
            <div>
              <h4 style="color: var(--accent);">2025</h4>
              <p>Expanded central kitchen to serve over 14,000 daily meals with automated logistics.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Careers CTA -->
      <section class="hero-wrapper" style="background: var(--bg-card); padding: 4rem 1rem; border-top: 1px solid var(--border-color);">
        <div class="container text-center">
          <h2 class="hero-title" style="font-size: 2rem;">Join Our Mission</h2>
          <p class="hero-description" style="max-width: 600px; margin: 0 auto 2rem auto;">
            We're always looking for passionate chefs, dietitians, and drivers to help feed the future.
          </p>
          <button class="btn btn-primary">View Open Positions</button>
        </div>
      </section>
""",

    'services.html': """
      <!-- Smart Canteen Hardware -->
      <section class="features-section" style="background: var(--bg-card);">
        <div class="container">
          <div class="section-header text-center">
            <h2 class="section-title">Smart Canteen Hardware</h2>
          </div>
          <div class="features-grid">
            <div class="feature-card text-center">
              <i class="fa-solid fa-tablet-screen-button" style="font-size: 2.5rem; color: var(--primary); margin-bottom: 1rem;"></i>
              <h3>POS Kiosks</h3>
              <p>Durable, touch-screen ordering kiosks for middle and high school cafeterias.</p>
            </div>
            <div class="feature-card text-center">
              <i class="fa-solid fa-id-badge" style="font-size: 2.5rem; color: var(--secondary); margin-bottom: 1rem;"></i>
              <h3>RFID Scanners</h3>
              <p>Lightning-fast card readers to keep the lunch line moving smoothly.</p>
            </div>
            <div class="feature-card text-center">
              <i class="fa-solid fa-server" style="font-size: 2.5rem; color: var(--accent); margin-bottom: 1rem;"></i>
              <h3>Cloud Sync</h3>
              <p>Instant synchronization with the Parent Portal for real-time balance updates.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Nutrition Education -->
      <section class="features-section">
        <div class="container text-center">
          <h2 class="section-title">Nutrition Education Programs</h2>
          <p class="section-subtitle" style="margin-bottom: 2rem;">We don't just feed students; we teach them about healthy choices.</p>
          <div style="background: var(--bg-primary); padding: 2rem; border-radius: var(--radius-lg); text-align: left; max-width: 800px; margin: 0 auto; border: 1px solid var(--border-color);">
            <ul style="list-style-type: none; padding: 0;">
              <li style="margin-bottom: 1rem;"><i class="fa-solid fa-check" style="color: var(--primary); margin-right: 10px;"></i> Monthly interactive nutrition seminars for primary students.</li>
              <li style="margin-bottom: 1rem;"><i class="fa-solid fa-check" style="color: var(--primary); margin-right: 10px;"></i> "Chef for a Day" workshops to teach basic culinary skills.</li>
              <li><i class="fa-solid fa-check" style="color: var(--primary); margin-right: 10px;"></i> Free informative pamphlets for parents on packing healthy snacks.</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Event Catering -->
      <section class="features-section" style="background: var(--bg-card);">
        <div class="container text-center">
          <h2 class="section-title">School Event Catering</h2>
          <p style="max-width: 600px; margin: 0 auto 2rem auto;">From sports days to graduation ceremonies, our kitchen is equipped to handle large-scale custom catering with the same nutritional standards.</p>
          <div class="features-grid">
            <div class="feature-card">
              <h4>Sports Day Hydration & Snack Packs</h4>
            </div>
            <div class="feature-card">
              <h4>Staff Meeting Luncheons</h4>
            </div>
            <div class="feature-card">
              <h4>Parent-Teacher Conference Buffets</h4>
            </div>
          </div>
        </div>
      </section>

      <!-- Request Proposal -->
      <section class="hero-wrapper" style="background: linear-gradient(135deg, var(--secondary-light) 0%, #E8F5E9 100%); padding: 4rem 1rem;">
        <div class="container text-center">
          <h2 class="hero-title" style="font-size: 2rem;">Request a Proposal</h2>
          <p class="hero-description" style="max-width: 600px; margin: 0 auto 2rem auto;">
            Let us design a custom food service program tailored to your school's unique needs and demographics.
          </p>
          <button class="btn btn-primary">Contact Sales Team</button>
        </div>
      </section>
""",

    'contact.html': """
      <!-- Support Channels -->
      <section class="features-section">
        <div class="container">
          <div class="section-header text-center">
            <h2 class="section-title">Direct Support Channels</h2>
          </div>
          <div class="features-grid">
            <div class="feature-card text-center">
              <i class="fa-solid fa-phone" style="font-size: 2rem; color: var(--primary); margin-bottom: 1rem;"></i>
              <h3>Call Us</h3>
              <p>+1 (800) 555-NOURISH<br><small>Mon-Fri: 6AM - 6PM</small></p>
            </div>
            <div class="feature-card text-center">
              <i class="fa-solid fa-envelope-open" style="font-size: 2rem; color: var(--secondary); margin-bottom: 1rem;"></i>
              <h3>Email</h3>
              <p>support@nourishkid.com<br><small>24 hr response time</small></p>
            </div>
            <div class="feature-card text-center">
              <i class="fa-solid fa-comments" style="font-size: 2rem; color: var(--accent); margin-bottom: 1rem;"></i>
              <h3>Live Chat</h3>
              <p>Available in Parent Portal<br><small>Mon-Fri: 8AM - 4PM</small></p>
            </div>
          </div>
        </div>
      </section>

      <!-- Office Locations -->
      <section class="features-section" style="background: var(--bg-card);">
        <div class="container text-center">
          <h2 class="section-title">Central Kitchen & HQ</h2>
          <p class="section-subtitle">Tours available by appointment for school administrators.</p>
          <div style="background: var(--bg-primary); padding: 3rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); max-width: 600px; margin: 0 auto;">
            <address style="font-style: normal; font-size: 1.1rem; line-height: 1.6;">
              <strong>NourishKid Operations HQ</strong><br>
              452 Culinary Way<br>
              Fresh Park, Sector 4<br>
              Metro District, 10029
            </address>
          </div>
        </div>
      </section>

      <!-- Social Media Hub -->
      <section class="features-section">
        <div class="container text-center">
          <h2 class="section-title">Join Our Community</h2>
          <p style="margin-bottom: 2rem;">Follow us for daily menu sneak peeks and nutrition tips!</p>
          <div>
            <a href="#" class="btn btn-outline" style="margin: 0 10px;"><i class="fa-brands fa-instagram"></i> Instagram</a>
            <a href="#" class="btn btn-outline" style="margin: 0 10px;"><i class="fa-brands fa-facebook"></i> Facebook</a>
            <a href="#" class="btn btn-outline" style="margin: 0 10px;"><i class="fa-brands fa-twitter"></i> Twitter</a>
          </div>
        </div>
      </section>

      <!-- Feedback Box -->
      <section class="hero-wrapper" style="background: var(--bg-card); padding: 4rem 1rem; border-top: 1px solid var(--border-color);">
        <div class="container text-center">
          <h2 class="hero-title" style="font-size: 2rem;">Anonymous Suggestion Box</h2>
          <p class="hero-description" style="max-width: 600px; margin: 0 auto 2rem auto;">
            Have an idea for a new menu item or feedback on our service? Let our chefs know!
          </p>
          <button class="btn btn-outline">Submit Feedback</button>
        </div>
      </section>
""",

    'faq.html': """
      <!-- Billing & Subscriptions FAQ -->
      <section class="features-section" style="background: var(--bg-card);">
        <div class="container">
          <div class="section-header text-center">
            <h2 class="section-title">Billing & Subscriptions</h2>
          </div>
          <div style="max-width: 800px; margin: 0 auto;">
            <div class="feature-card" style="margin-bottom: 1rem; text-align: left;">
              <h4>How do I change my subscription tier?</h4>
              <p>You can upgrade or downgrade your plan directly from the Parent Dashboard under "Manage Subscription". Changes take effect the following Monday.</p>
            </div>
            <div class="feature-card" style="text-align: left;">
              <h4>Are there fees for topping up the RFID wallet?</h4>
              <p>No, adding funds via bank transfer or credit card to the student's RFID wallet incurs zero processing fees on your end.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Dietary & Allergens FAQ -->
      <section class="features-section">
        <div class="container">
          <div class="section-header text-center">
            <h2 class="section-title">Dietary & Allergens</h2>
          </div>
          <div style="max-width: 800px; margin: 0 auto;">
            <div class="feature-card" style="margin-bottom: 1rem; text-align: left;">
              <h4>What if my child has a severe, uncommon allergy?</h4>
              <p>Please contact our support team directly. We handle top 8 allergens as standard, but can accommodate specific medical dietary needs upon consultation.</p>
            </div>
            <div class="feature-card" style="text-align: left;">
              <h4>Is the meat halal/kosher?</h4>
              <p>We offer dedicated halal and vegetarian menus. Please ensure you select the appropriate restriction in the student profile.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Delivery Protocols FAQ -->
      <section class="features-section" style="background: var(--bg-card);">
        <div class="container">
          <div class="section-header text-center">
            <h2 class="section-title">Delivery & Logistics</h2>
          </div>
          <div style="max-width: 800px; margin: 0 auto;">
            <div class="feature-card" style="margin-bottom: 1rem; text-align: left;">
              <h4>How do I know my child received their meal?</h4>
              <p>We send automated push notifications and SMS alerts the moment the delivery van drops the tiffins at the designated classroom rack.</p>
            </div>
            <div class="feature-card" style="text-align: left;">
              <h4>What happens on snow days/school closures?</h4>
              <p>If the school announces an official closure, all meals for that day are automatically cancelled and credited back to your account.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Support CTA -->
      <section class="hero-wrapper" style="background: var(--primary-light); padding: 4rem 1rem;">
        <div class="container text-center">
          <h2 class="hero-title" style="font-size: 2rem;">Still Need Help?</h2>
          <p class="hero-description" style="max-width: 600px; margin: 0 auto 2rem auto;">
            Our support team is standing by to assist you with any specific inquiries.
          </p>
          <button class="btn btn-primary">Open Support Ticket</button>
        </div>
      </section>
""",

    'nutrition.html': """
      <!-- The No Junk Policy -->
      <section class="features-section" style="background: var(--bg-card);">
        <div class="container">
          <div class="section-header text-center">
            <h2 class="section-title">Our "No Junk" Policy</h2>
          </div>
          <div class="features-grid">
            <div class="feature-card text-center" style="border-top: 3px solid #E53935;">
              <h3 style="color: #E53935;">Strictly Banned</h3>
              <ul style="list-style-type: none; padding: 0; margin-top: 1rem;">
                <li>High Fructose Corn Syrup</li>
                <li>Artificial Food Dyes (Red 40, etc.)</li>
                <li>Trans Fats & Hydrogenated Oils</li>
                <li>Synthetic Preservatives</li>
              </ul>
            </div>
            <div class="feature-card text-center" style="border-top: 3px solid var(--primary);">
              <h3 style="color: var(--primary);">Always Included</h3>
              <ul style="list-style-type: none; padding: 0; margin-top: 1rem;">
                <li>Whole Grains</li>
                <li>Lean Proteins (Plant & Animal)</li>
                <li>Fresh Seasonal Fruits</li>
                <li>Cold-Pressed Oils</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Age-Specific Macros -->
      <section class="features-section">
        <div class="container text-center">
          <h2 class="section-title">Age-Specific Macronutrients</h2>
          <p class="section-subtitle">Caloric and macro needs change rapidly as children grow. Our plans scale accordingly.</p>
          <div class="features-grid" style="margin-top: 2rem;">
            <div class="feature-card">
              <h4>Junior Plan (K - Grade 3)</h4>
              <p>Smaller portions, higher emphasis on complex carbs for sustained energy, and softer textures.</p>
            </div>
            <div class="feature-card">
              <h4>Middle Grade (Grades 4-8)</h4>
              <p>Increased protein ratios to support growth spurts and active physical education schedules.</p>
            </div>
            <div class="feature-card">
              <h4>Senior Plan (Grades 9-12)</h4>
              <p>Adult-sized portions with balanced macros to fuel high academic performance and athletics.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Ingredient Spotlight -->
      <section class="features-section" style="background: var(--bg-card);">
        <div class="container text-center">
          <h2 class="section-title">Seasonal Ingredient Spotlight</h2>
          <div style="background: var(--bg-primary); padding: 2rem; border-radius: var(--radius-lg); max-width: 600px; margin: 2rem auto 0 auto; display: flex; align-items: center; text-align: left; gap: 2rem;">
            <i class="fa-solid fa-seedling" style="font-size: 4rem; color: var(--secondary);"></i>
            <div>
              <h3 style="margin: 0 0 0.5rem 0;">Quinoa</h3>
              <p style="margin: 0;">This month, we're featuring organic quinoa in our wraps and salads. It's a complete protein containing all nine essential amino acids, perfect for growing bodies.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Reports CTA -->
      <section class="hero-wrapper" style="background: linear-gradient(135deg, var(--accent-light) 0%, #FFF3E0 100%); padding: 4rem 1rem;">
        <div class="container text-center">
          <h2 class="hero-title" style="font-size: 2rem;">Transparency Reports</h2>
          <p class="hero-description" style="max-width: 600px; margin: 0 auto 2rem auto;">
            We publish a monthly PDF detailing our local farm partners, nutritional audits, and kitchen hygiene scores.
          </p>
          <button class="btn btn-outline" style="background: white;">Download Latest Report (PDF)</button>
        </div>
      </section>
"""
}

# Apply injections
for file_name, new_content in page_injections.items():
    with open(file_name, 'r', encoding='utf-8') as f:
        html = f.read()

    # Find the closing tag of the view-section wrapper inside main
    # Wait, in the standalone files, the structure is:
    # <main id="app-view-container">
    #   <div class="view-section active-view" id="...">
    #     ... existing sections ...
    #   </div>
    # </main>
    # So we should inject right before the `    </div>\n  </main>` closing tags.
    
    # Let's find the closing main tag
    main_end = html.rfind('</div>\n  </main>')
    if main_end == -1:
        # Fallback if whitespace differs
        main_end = html.rfind('</div>\n</main>')
    if main_end == -1:
        main_end = html.rfind('</div>\r\n  </main>')
        
    if main_end != -1:
        html = html[:main_end] + new_content + html[main_end:]
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"Expanded {file_name}")
    else:
        print(f"Could not find injection point for {file_name}")
