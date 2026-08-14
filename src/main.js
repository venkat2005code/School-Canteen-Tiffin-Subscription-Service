/* ==========================================================================
   NourishKid - Main Application Logic & View Router
   ========================================================================== */

// --- Data Models & Mock Database ---
const APP_STATE = {
  activeView: 'view-home-1',
  theme: localStorage.getItem('nk_theme') || 'light',
  dir: localStorage.getItem('nk_dir') || 'ltr',
  billingCycle: 'weekly', // 'weekly' or 'monthly'
  selectedChild: 'liam',

  // Parent Wallet & Billing
  walletBalance: 38.50,
  activeSubscription: {
    planName: 'NutriPlus Balanced Plan',
    price: 49.00,
    renewDate: 'August 5, 2026',
    status: 'Active',
    school: 'Saint Jude Academy',
    grade: 'Grade 5 - Sec B'
  },

  // Weekly Meal Selections for Liam
  weeklyMeals: {
    Monday: 'Teriyaki Chicken Rice Bowl',
    Tuesday: 'Organic Veggie & Cheese Pasta',
    Wednesday: 'Grilled Salmon with Quinoa',
    Thursday: 'Turkey & Avocado Wrap',
    Friday: 'Crispy Paneer Tacos with Salsa'
  },

  // Allergen Preferences
  allergies: {
    nutFree: true,
    glutenFree: false,
    dairyFree: false,
    vegetarian: false
  },

  // Admin Dishes Database
  dishes: [
    {
      id: 1,
      name: 'Teriyaki Chicken Rice Bowl',
      category: 'lunch',
      price: 11.50,
      calories: 520,
      protein: '32g',
      carbs: '58g',
      fat: '12g',
      tags: ['nut-free', 'high-protein'],
      description: 'Grilled organic chicken breast in house-made low-sodium teriyaki glaze served over steamed jasmine rice & broccoli florets.',
      image: './src/assets/teriyaki_chicken.jpg',
      available: true
    },
    {
      id: 2,
      name: 'Organic Veggie & Cheese Pasta',
      category: 'lunch',
      price: 10.00,
      calories: 480,
      protein: '18g',
      carbs: '64g',
      fat: '14g',
      tags: ['nut-free'],
      description: 'Whole wheat penne tossed in rich vine-ripened tomato marinara sauce, fresh spinach, and melted mozzarella.',
      image: './src/assets/veggie_pasta.jpg',
      available: true
    },
    {
      id: 3,
      name: 'Avocado Egg Breakfast Bagel',
      category: 'breakfast',
      price: 7.50,
      calories: 390,
      protein: '16g',
      carbs: '42g',
      fat: '16g',
      tags: ['nut-free'],
      description: 'Toasted multigrain bagel topped with mashed hass avocado, cage-free poached egg, and mild cheddar cheese.',
      image: './src/assets/avocado_bagel.png',
      available: true
    },
    {
      id: 4,
      name: 'Superberry Protein Smoothie',
      category: 'drinks',
      price: 5.50,
      calories: 220,
      protein: '12g',
      carbs: '34g',
      fat: '4g',
      tags: ['nut-free', 'gluten-free'],
      description: 'Blend of organic wild blueberries, strawberries, Greek yogurt, chia seeds, and raw honey.',
      image: './src/assets/berry_smoothie.jpg',
      available: true
    },
    {
      id: 5,
      name: 'Crispy Paneer Tacos & Salsa',
      category: 'lunch',
      price: 10.50,
      calories: 510,
      protein: '22g',
      carbs: '52g',
      fat: '18g',
      tags: ['nut-free', 'high-protein'],
      description: 'Soft corn tortillas filled with spiced cottage cheese cubes, sweet corn salsa, shredded lettuce, and cilantro cream.',
      image: './src/assets/paneer_tacos.png',
      available: true
    },
    {
      id: 6,
      name: 'Baked Sweet Potato Fries & Dip',
      category: 'snacks',
      price: 4.50,
      calories: 240,
      protein: '4g',
      carbs: '38g',
      fat: '8g',
      tags: ['nut-free', 'gluten-free'],
      description: 'Oven-roasted sweet potato wedges seasoned with herbs, served with organic Greek yogurt garlic dip.',
      image: './src/assets/sweet_potato_fries.png',
      available: true
    }
  ]
};

// --- DOM Content View Templates ---
const VIEWS = {
  'view-home-1': `
    <section class="hero-wrapper">
      <div class="hero-glow-1"></div>
      <div class="hero-glow-2"></div>
      <div class="container">
        <div class="hero-grid">
          <div class="hero-content">
            <div class="hero-badge">
              <i class="fa-solid fa-certificate"></i>
              <span>ISO 22000 Certified School Catering</span>
            </div>
            <h1 class="hero-title">
              Nutritious School Lunches Delivered Direct to <span class="text-gradient">Classroom Desks</span>
            </h1>
            <p class="hero-description">
              Freshly prepped by certified pediatric nutritionists & top chefs. Flexible weekly tiffin subscriptions, 100% allergen-isolated kitchens & smart RFID canteen payment portal.
            </p>
            <div class="hero-cta-group">
              <button class="btn btn-primary btn-lg" onclick="window.app.openSubscribeModal()">
                <i class="fa-solid fa-calendar-check"></i>
                <span>Explore Weekly Plans</span>
              </button>
              <button class="btn btn-outline btn-lg" onclick="window.location.href='/parent-dashboard.html'">
                <i class="fa-solid fa-user-gear"></i>
                <span>Parent Portal</span>
              </button>
            </div>
            <div class="hero-stats-row">
              <div class="stat-item">
                <h3>14,800+</h3>
                <p>Meals Prepped Daily</p>
              </div>
              <div class="stat-item">
                <h3>45+</h3>
                <p>Partner Schools</p>
              </div>
              <div class="stat-item">
                <h3>99.4%</h3>
                <p>Parent Approval</p>
              </div>
            </div>
          </div>

          <div class="hero-visual-card">
            <div class="card-top-bar">
              <div>
                <h4>Today's Fresh Tiffin Box</h4>
                <span style="font-size: 0.8rem; color: var(--text-muted);">Saint Jude Academy • Grade 5</span>
              </div>
              <span class="status-pill">
                <span class="pulse-dot"></span>
                <span>In Transit to Desk</span>
              </span>
            </div>

            <div class="hero-meal-preview">
              <div class="preview-meal-item">
                <img src="./src/assets/teriyaki_chicken.jpg" alt="Teriyaki Chicken" style="width: 60px; height: 60px; border-radius: 8px; object-fit: cover;">
                <div class="meal-details">
                  <h5>Teriyaki Chicken & Steamed Rice</h5>
                  <div class="meal-meta">
                    <span><i class="fa-solid fa-fire-flame-curved" style="color: var(--primary);"></i> 520 kcal</span>
                    <span><i class="fa-solid fa-shield-halved" style="color: var(--secondary);"></i> Nut-Free</span>
                  </div>
                </div>
              </div>

              <div class="preview-meal-item">
                <img src="./src/assets/berry_smoothie.jpg" alt="Superberry Smoothie" style="width: 60px; height: 60px; border-radius: 8px; object-fit: cover;">
                <div class="meal-details">
                  <h5>Superberry Greek Yogurt Smoothie</h5>
                  <div class="meal-meta">
                    <span><i class="fa-solid fa-fire-flame-curved" style="color: var(--primary);"></i> 220 kcal</span>
                    <span><i class="fa-solid fa-leaf" style="color: var(--secondary);"></i> Organic</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="floating-badge">
              <div class="badge-icon"><i class="fa-solid fa-truck-fast"></i></div>
              <div>
                <strong style="font-size: 0.9rem; display: block;">Desk ETA: 11:45 AM</strong>
                <span style="font-size: 0.78rem; color: var(--text-muted);">Classroom Tiffin Rack #4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust Badges -->
    <section class="features-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag"><i class="fa-solid fa-award"></i> Why Parents & Schools Trust Us</span>
          <h2 class="section-title">Built for Kids' Health & Parents' Peace of Mind</h2>
          <p class="section-subtitle">We bridge nutrition science with culinary craft to deliver hot, wholesome meals students love.</p>
        </div>

        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon-wrapper"><i class="fa-solid fa-apple-whole"></i></div>
            <h3>100% Certified Pediatric Nutrition</h3>
            <p>Every menu is designed by pediatric dietitians to ensure optimal macronutrient balance and zero artificial preservatives.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon-wrapper" style="background: var(--secondary-light); color: var(--secondary);"><i class="fa-solid fa-shield-virus"></i></div>
            <h3>Strict Allergen Isolation</h3>
            <p>Separate kitchen prep zones and color-coded tiffin seals for peanuts, tree nuts, dairy, gluten, and egg allergies.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon-wrapper" style="background: var(--accent-light); color: var(--accent);"><i class="fa-solid fa-id-card-clip"></i></div>
            <h3>Smart RFID Canteen Wallet</h3>
            <p>Students tap their school ID card at the canteen for quick purchases. Parents set daily spending limits & view live history.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon-wrapper" style="background: var(--info-light); color: var(--info);"><i class="fa-solid fa-bell"></i></div>
            <h3>Real-Time Parent Tracking</h3>
            <p>Receive SMS alerts when lunch is packed at our central kitchen and when it is hand-delivered to your child's classroom rack.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Daily Menu Showcase -->
    <section class="menu-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag"><i class="fa-solid fa-utensils"></i> Public Canteen & Tiffin Menu</span>
          <h2 class="section-title">Chef-Crafted Daily School Menu</h2>
          <p class="section-subtitle">Filter by meal type and click any item for full nutritional breakdown and ingredients list.</p>
        </div>

        <div class="menu-filter-bar">
          <button class="filter-btn active" onclick="window.app.filterMenu('all', this)">All Items</button>
          <button class="filter-btn" onclick="window.app.filterMenu('lunch', this)">Hot Lunches</button>
          <button class="filter-btn" onclick="window.app.filterMenu('breakfast', this)">Breakfast & Bagels</button>
          <button class="filter-btn" onclick="window.app.filterMenu('snacks', this)">Healthy Snacks</button>
          <button class="filter-btn" onclick="window.app.filterMenu('drinks', this)">Smoothies & Juices</button>
        </div>

        <div class="dishes-grid" id="dishes-grid-container">
          <!-- Rendered Dynamically -->
        </div>
      </div>
    </section>

    <!-- Interactive Mon-Fri Weekly Meal Builder -->
    <section class="weekly-builder-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag"><i class="fa-solid fa-sliders"></i> Interactive Customizer</span>
          <h2 class="section-title">Build Your Child's Weekly Meal Schedule</h2>
          <p class="section-subtitle">Select meals for each day from Monday to Friday. Watch calories and weekly price update instantly!</p>
        </div>

        <div class="builder-card">
          <div class="days-row">
            <div class="day-column">
              <h4>Monday</h4>
              <select class="day-meal-select" onchange="window.app.updateWeeklyBuilder('Monday', this.value)">
                <option value="Teriyaki Chicken Rice Bowl">Teriyaki Chicken Rice Bowl</option>
                <option value="Organic Veggie Pasta">Organic Veggie Pasta</option>
                <option value="Avocado Egg Bagel">Avocado Egg Bagel</option>
              </select>
              <div class="day-cal-info">520 kcal • 32g Protein</div>
            </div>

            <div class="day-column">
              <h4>Tuesday</h4>
              <select class="day-meal-select" onchange="window.app.updateWeeklyBuilder('Tuesday', this.value)">
                <option value="Organic Veggie & Cheese Pasta">Organic Veggie & Cheese Pasta</option>
                <option value="Crispy Paneer Tacos">Crispy Paneer Tacos</option>
                <option value="Teriyaki Chicken Rice Bowl">Teriyaki Chicken Rice Bowl</option>
              </select>
              <div class="day-cal-info">480 kcal • 18g Protein</div>
            </div>

            <div class="day-column">
              <h4>Wednesday</h4>
              <select class="day-meal-select" onchange="window.app.updateWeeklyBuilder('Wednesday', this.value)">
                <option value="Grilled Salmon with Quinoa">Grilled Salmon with Quinoa</option>
                <option value="Teriyaki Chicken Rice Bowl">Teriyaki Chicken Rice Bowl</option>
                <option value="Organic Veggie Pasta">Organic Veggie Pasta</option>
              </select>
              <div class="day-cal-info">540 kcal • 36g Protein</div>
            </div>

            <div class="day-column">
              <h4>Thursday</h4>
              <select class="day-meal-select" onchange="window.app.updateWeeklyBuilder('Thursday', this.value)">
                <option value="Turkey & Avocado Wrap">Turkey & Avocado Wrap</option>
                <option value="Crispy Paneer Tacos">Crispy Paneer Tacos</option>
                <option value="Organic Veggie Pasta">Organic Veggie Pasta</option>
              </select>
              <div class="day-cal-info">460 kcal • 24g Protein</div>
            </div>

            <div class="day-column">
              <h4>Friday</h4>
              <select class="day-meal-select" onchange="window.app.updateWeeklyBuilder('Friday', this.value)">
                <option value="Crispy Paneer Tacos & Salsa">Crispy Paneer Tacos & Salsa</option>
                <option value="Teriyaki Chicken Rice Bowl">Teriyaki Chicken Rice Bowl</option>
                <option value="Grilled Salmon with Quinoa">Grilled Salmon with Quinoa</option>
              </select>
              <div class="day-cal-info">510 kcal • 22g Protein</div>
            </div>
          </div>

          <div class="builder-summary-bar">
            <div>
              <span style="font-size: 0.9rem; color: var(--text-muted);">Estimated Weekly Total (5 Lunches):</span>
              <div class="builder-total-price" id="builder-price-display">$49.00 / week</div>
            </div>
            <button class="btn btn-primary" onclick="window.app.openSubscribeModal()">
              <i class="fa-solid fa-cart-shopping"></i>
              <span>Save & Subscribe Meal Plan</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Tiers -->
    <section class="pricing-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag"><i class="fa-solid fa-tags"></i> Transparent Subscriptions</span>
          <h2 class="section-title">Flexible Subscription Plans for Every Family</h2>
          <p class="section-subtitle">No long-term lock-in. Pause, skip weeks, or change plans anytime via Parent Portal.</p>
        </div>

        <div class="billing-toggle-wrapper">
          <span style="font-weight: 700; font-size: 0.95rem;">Weekly Billing</span>
          <button class="btn btn-outline btn-sm" id="cycle-toggle-btn" onclick="window.app.toggleBillingCycle()" style="border-radius: var(--radius-full);">
            <i class="fa-solid fa-repeat"></i> <span id="cycle-toggle-text">Switch to Monthly (Save 15%)</span>
          </button>
        </div>

        <div class="pricing-grid">
          <!-- Tier 1 -->
          <div class="pricing-card">
            <h3 class="tier-title">Junior Snack & Lunch</h3>
            <p class="tier-desc">Ideal for primary grade kids (Grades K-3) with lighter portion requirements.</p>
            <div class="tier-price" id="price-tier-1">$29 <span>/ week</span></div>
            <div class="feature-list">
              <div class="feature-item"><i class="fa-solid fa-circle-check"></i> 5 Daily Mini Meals (Mon-Fri)</div>
              <div class="feature-item"><i class="fa-solid fa-circle-check"></i> 1 Fresh Fruit or Snack Cup</div>
              <div class="feature-item"><i class="fa-solid fa-circle-check"></i> Standard Allergen Protection</div>
              <div class="feature-item"><i class="fa-solid fa-circle-check"></i> Daily Classroom Desk Delivery</div>
            </div>
            <button class="btn btn-outline btn-block" onclick="window.app.openSubscribeModal('Junior Lite')">Select Junior Plan</button>
          </div>

          <!-- Tier 2 Popular -->
          <div class="pricing-card popular">
            <div class="popular-badge">Most Popular</div>
            <h3 class="tier-title">NutriPlus Balanced</h3>
            <p class="tier-desc">Complete balanced hot lunch + organic beverage for growing students (Grades 4-12).</p>
            <div class="tier-price" id="price-tier-2">$49 <span>/ week</span></div>
            <div class="feature-list">
              <div class="feature-item"><i class="fa-solid fa-circle-check"></i> 5 Full Hot Lunches (Mon-Fri)</div>
              <div class="feature-item"><i class="fa-solid fa-circle-check"></i> 5 Daily Smoothies / Fresh Juices</div>
              <div class="feature-item"><i class="fa-solid fa-circle-check"></i> Custom Weekly Meal Selection</div>
              <div class="feature-item"><i class="fa-solid fa-circle-check"></i> RFID Canteen $10 Bonus Credit</div>
              <div class="feature-item"><i class="fa-solid fa-circle-check"></i> Real-time SMS Delivery Tracking</div>
            </div>
            <button class="btn btn-primary btn-block" onclick="window.app.openSubscribeModal('NutriPlus Balanced')">Select NutriPlus Plan</button>
          </div>

          <!-- Tier 3 -->
          <div class="pricing-card">
            <h3 class="tier-title">Chef Special Organic</h3>
            <p class="tier-desc">Gourmet chef menu with 100% organic farm ingredients & customized dietitian care.</p>
            <div class="tier-price" id="price-tier-3">$69 <span>/ week</span></div>
            <div class="feature-list">
              <div class="feature-item"><i class="fa-solid fa-circle-check"></i> 5 Premium Chef Lunches & Snacks</div>
              <div class="feature-item"><i class="fa-solid fa-circle-check"></i> 100% Farm-Direct Organic</div>
              <div class="feature-item"><i class="fa-solid fa-circle-check"></i> Dedicated Dietitian Consultation</div>
              <div class="feature-item"><i class="fa-solid fa-circle-check"></i> Priority Allergen Line Guarantee</div>
              <div class="feature-item"><i class="fa-solid fa-circle-check"></i> RFID Canteen $25 Bonus Credit</div>
            </div>
            <button class="btn btn-outline btn-block" onclick="window.app.openSubscribeModal('Chef Special Organic')">Select Chef Plan</button>
          </div>
        </div>
      </div>
    </section>
  `,

  'view-home-2': `
    <!-- Hero: Farm-to-School Delivery Focus -->
    <section class="hero-wrapper" style="background: var(--bg-surface);">
      <div class="hero-glow-1"></div>
      <div class="hero-glow-2"></div>
      <div class="container">
        <div class="hero-grid">
          <div class="hero-content">
            <div class="hero-badge">
              <i class="fa-solid fa-truck-fast"></i>
              <span>Farm-to-School Cold Chain Logistics</span>
            </div>
            <h1 class="hero-title">
              Centralized Kitchens &amp; Direct School <span class="text-gradient">Tiffin Supply Network</span>
            </h1>
            <p class="hero-description">
              Empowering 48+ schools with complete turnkey food service — thermal insulated delivery pods, GPS-tracked vans, RFID canteen management, and real-time parent notifications.
            </p>
            <div class="hero-cta-group">
              <button class="btn btn-secondary btn-lg" onclick="document.getElementById('h2-partner-section') && document.getElementById('h2-partner-section').scrollIntoView({behavior:'smooth'})">
                <i class="fa-solid fa-school"></i>
                <span>Partner Your School</span>
              </button>
              <button class="btn btn-outline btn-lg" onclick="window.app.openSubscribeModal()">
                <i class="fa-solid fa-user-plus"></i>
                <span>Parent Registration</span>
              </button>
            </div>
            <div class="hero-stats-row">
              <div class="stat-item">
                <h3>4:30 AM</h3>
                <p>Farm Harvest Start</p>
              </div>
              <div class="stat-item">
                <h3>68°F+</h3>
                <p>Tiffin Temp Guarantee</p>
              </div>
              <div class="stat-item">
                <h3>11:30 AM</h3>
                <p>Desk Delivery Target</p>
              </div>
            </div>
          </div>

          <div class="hero-visual-card" style="background: var(--bg-primary);">
            <h4 style="margin-bottom: 1.25rem; font-size: 1.1rem;">
              <i class="fa-solid fa-fire" style="color: var(--primary);"></i>&nbsp;Daily Thermal Kitchen Pipeline
            </h4>
            <div style="display: flex; flex-direction: column; gap: 0.85rem;">
              <div class="preview-meal-item">
                <div class="badge-icon"><i class="fa-solid fa-wheat-awn"></i></div>
                <div>
                  <strong style="display:block; font-size:0.9rem; margin-bottom:2px;">04:30 AM — Organic Farm Ingestion</strong>
                  <p style="font-size:0.78rem; color:var(--text-muted);">Fresh vegetables &amp; hormone-free proteins received. Temperature-logged batch entry.</p>
                </div>
              </div>
              <div class="preview-meal-item">
                <div class="badge-icon" style="background:var(--secondary-light);color:var(--secondary);"><i class="fa-solid fa-fire-flame-curved"></i></div>
                <div>
                  <strong style="display:block; font-size:0.9rem; margin-bottom:2px;">06:00 AM — HACCP Batch Cooking</strong>
                  <p style="font-size:0.78rem; color:var(--text-muted);">Allergen-isolated cooking lines. Steam cooked at 165°F. Zero cross-contamination.</p>
                </div>
              </div>
              <div class="preview-meal-item">
                <div class="badge-icon" style="background:var(--accent-light);color:var(--accent);"><i class="fa-solid fa-box-archive"></i></div>
                <div>
                  <strong style="display:block; font-size:0.9rem; margin-bottom:2px;">08:30 AM — Quality Seal &amp; Labeling</strong>
                  <p style="font-size:0.78rem; color:var(--text-muted);">Tamper-evident thermo-lock pods with QR nutrition label and allergen color code.</p>
                </div>
              </div>
              <div class="preview-meal-item">
                <div class="badge-icon" style="background:var(--info-light);color:var(--info);"><i class="fa-solid fa-van-shuttle"></i></div>
                <div>
                  <strong style="display:block; font-size:0.9rem; margin-bottom:2px;">10:30 AM — GPS Refrigerated Dispatch</strong>
                  <p style="font-size:0.78rem; color:var(--text-muted);">Dispatched to 48 partner schools with live GPS &amp; temperature monitoring.</p>
                </div>
              </div>
              <div class="preview-meal-item">
                <div class="badge-icon" style="background:var(--primary-light);color:var(--primary);"><i class="fa-solid fa-hand-holding-heart"></i></div>
                <div>
                  <strong style="display:block; font-size:0.9rem; margin-bottom:2px;">11:30 AM — Classroom Desk Hand-Off</strong>
                  <p style="font-size:0.78rem; color:var(--text-muted);">Staff delivers to student desk racks. Instant SMS confirmation sent to parents.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Certification Trust Strip -->
    <section style="padding: 2rem 0; background: linear-gradient(135deg, var(--primary) 0%, #C84A27 100%);">
      <div class="container">
        <div style="display:flex; align-items:center; justify-content:center; gap:2.5rem; flex-wrap:wrap; color:#fff;">
          <div style="display:flex; align-items:center; gap:0.75rem; font-weight:700;">
            <i class="fa-solid fa-certificate" style="font-size:1.5rem;"></i>
            <div><div style="font-size:0.95rem;">ISO 22000:2018</div><div style="font-size:0.72rem;opacity:0.85;">Food Safety Management</div></div>
          </div>
          <div style="display:flex; align-items:center; gap:0.75rem; font-weight:700;">
            <i class="fa-solid fa-shield-halved" style="font-size:1.5rem;"></i>
            <div><div style="font-size:0.95rem;">HACCP Certified</div><div style="font-size:0.72rem;opacity:0.85;">Hazard Analysis Protocol</div></div>
          </div>
          <div style="display:flex; align-items:center; gap:0.75rem; font-weight:700;">
            <i class="fa-solid fa-leaf" style="font-size:1.5rem;"></i>
            <div><div style="font-size:0.95rem;">USDA Organic</div><div style="font-size:0.72rem;opacity:0.85;">Certified Farm Ingredients</div></div>
          </div>
          <div style="display:flex; align-items:center; gap:0.75rem; font-weight:700;">
            <i class="fa-solid fa-heart-pulse" style="font-size:1.5rem;"></i>
            <div><div style="font-size:0.95rem;">Pediatric Dietitian</div><div style="font-size:0.72rem;opacity:0.85;">Approved Nutrition Plans</div></div>
          </div>
          <div style="display:flex; align-items:center; gap:0.75rem; font-weight:700;">
            <i class="fa-solid fa-thermometer-half" style="font-size:1.5rem;"></i>
            <div><div style="font-size:0.95rem;">Cold Chain Assured</div><div style="font-size:0.72rem;opacity:0.85;">Farm-to-Desk Temp Control</div></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Weekly Meal Calendar -->
    <section class="menu-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag"><i class="fa-solid fa-calendar-week"></i> School Meal Calendar</span>
          <h2 class="section-title">This Week's Rotating School Menu</h2>
          <p class="section-subtitle">Our nutritionists rotate fresh seasonal menus every week. Parents customize individual meal choices from the Parent Portal before Friday.</p>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(175px,1fr)); gap:1.25rem; margin-bottom:1.5rem;">
          <div class="feature-card" style="text-align:center; padding:1.5rem 1rem;">
            <div style="font-size:2.2rem; margin-bottom:0.6rem; color:var(--primary);"><i class="fa-solid fa-drumstick-bite"></i></div>
            <div style="font-size:0.72rem; font-weight:800; color:var(--primary); text-transform:uppercase; letter-spacing:1px; margin-bottom:0.6rem;">Monday</div>
            <div style="font-size:0.9rem; font-weight:700; margin-bottom:0.3rem;">Teriyaki Chicken Rice</div>
            <div style="font-size:0.77rem; color:var(--text-muted); margin-bottom:0.2rem;">+ Cucumber Salad</div>
            <div style="font-size:0.77rem; color:var(--secondary); font-weight:600; margin-bottom:0.75rem;"><i class="fa-solid fa-mug-saucer"></i> Berry Smoothie</div>
            <span style="display:inline-block; padding:0.2rem 0.7rem; background:var(--primary-light); color:var(--primary); border-radius:var(--radius-full); font-size:0.72rem; font-weight:700;">520 kcal</span>
          </div>
          <div class="feature-card" style="text-align:center; padding:1.5rem 1rem;">
            <div style="font-size:2.2rem; margin-bottom:0.6rem; color:var(--primary);"><i class="fa-solid fa-bowl-food"></i></div>
            <div style="font-size:0.72rem; font-weight:800; color:var(--primary); text-transform:uppercase; letter-spacing:1px; margin-bottom:0.6rem;">Tuesday</div>
            <div style="font-size:0.9rem; font-weight:700; margin-bottom:0.3rem;">Organic Veggie Pasta</div>
            <div style="font-size:0.77rem; color:var(--text-muted); margin-bottom:0.2rem;">+ Garlic Breadstick</div>
            <div style="font-size:0.77rem; color:var(--secondary); font-weight:600; margin-bottom:0.75rem;"><i class="fa-solid fa-mug-saucer"></i> Orange Juice</div>
            <span style="display:inline-block; padding:0.2rem 0.7rem; background:var(--primary-light); color:var(--primary); border-radius:var(--radius-full); font-size:0.72rem; font-weight:700;">480 kcal</span>
          </div>
          <div class="feature-card" style="text-align:center; padding:1.5rem 1rem; border-color:var(--secondary); box-shadow:0 0 0 2px var(--secondary-light);">
            <div style="font-size:2.2rem; margin-bottom:0.6rem; color:var(--secondary);"><i class="fa-solid fa-fish"></i></div>
            <div style="font-size:0.72rem; font-weight:800; color:var(--secondary); text-transform:uppercase; letter-spacing:1px; margin-bottom:0.6rem;">Wednesday ✦ Chef's Pick</div>
            <div style="font-size:0.9rem; font-weight:700; margin-bottom:0.3rem;">Grilled Salmon Quinoa</div>
            <div style="font-size:0.77rem; color:var(--text-muted); margin-bottom:0.2rem;">+ Steamed Broccoli</div>
            <div style="font-size:0.77rem; color:var(--secondary); font-weight:600; margin-bottom:0.75rem;"><i class="fa-solid fa-mug-saucer"></i> Mango Lassi</div>
            <span style="display:inline-block; padding:0.2rem 0.7rem; background:var(--secondary-light); color:var(--secondary); border-radius:var(--radius-full); font-size:0.72rem; font-weight:700;">540 kcal</span>
          </div>
          <div class="feature-card" style="text-align:center; padding:1.5rem 1rem;">
            <div style="font-size:2.2rem; margin-bottom:0.6rem; color:var(--primary);"><i class="fa-solid fa-utensils"></i></div>
            <div style="font-size:0.72rem; font-weight:800; color:var(--primary); text-transform:uppercase; letter-spacing:1px; margin-bottom:0.6rem;">Thursday</div>
            <div style="font-size:0.9rem; font-weight:700; margin-bottom:0.3rem;">Turkey Avocado Wrap</div>
            <div style="font-size:0.77rem; color:var(--text-muted); margin-bottom:0.2rem;">+ Sweet Potato Fries</div>
            <div style="font-size:0.77rem; color:var(--secondary); font-weight:600; margin-bottom:0.75rem;"><i class="fa-solid fa-mug-saucer"></i> Green Detox Juice</div>
            <span style="display:inline-block; padding:0.2rem 0.7rem; background:var(--primary-light); color:var(--primary); border-radius:var(--radius-full); font-size:0.72rem; font-weight:700;">460 kcal</span>
          </div>
          <div class="feature-card" style="text-align:center; padding:1.5rem 1rem;">
            <div style="font-size:2.2rem; margin-bottom:0.6rem; color:var(--primary);"><i class="fa-solid fa-utensils"></i></div>
            <div style="font-size:0.72rem; font-weight:800; color:var(--primary); text-transform:uppercase; letter-spacing:1px; margin-bottom:0.6rem;">Friday</div>
            <div style="font-size:0.9rem; font-weight:700; margin-bottom:0.3rem;">Paneer Tacos &amp; Salsa</div>
            <div style="font-size:0.77rem; color:var(--text-muted); margin-bottom:0.2rem;">+ Corn on the Cob</div>
            <div style="font-size:0.77rem; color:var(--secondary); font-weight:600; margin-bottom:0.75rem;"><i class="fa-solid fa-mug-saucer"></i> Protein Shake</div>
            <span style="display:inline-block; padding:0.2rem 0.7rem; background:var(--primary-light); color:var(--primary); border-radius:var(--radius-full); font-size:0.72rem; font-weight:700;">510 kcal</span>
          </div>
        </div>
        <p style="text-align:center; font-size:0.88rem; color:var(--text-muted);">
          <i class="fa-solid fa-circle-info" style="color:var(--info);"></i>&nbsp;
          Menu rotates every Monday. Subscribers receive next week's menu every Friday via parent app notification.
        </p>
      </div>
    </section>

    <!-- School Network Stats -->
    <section class="features-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag"><i class="fa-solid fa-network-wired"></i> Partner Network</span>
          <h2 class="section-title">Serving Top Educational Institutions</h2>
          <p class="section-subtitle">48+ accredited schools and colleges trust NourishKid for daily student lunches, canteen operations, and parent-facing digital tools.</p>
        </div>

        <div class="admin-metrics-grid" style="margin-bottom:3rem;">
          <div class="metric-card">
            <div class="metric-icon orange"><i class="fa-solid fa-school"></i></div>
            <div><strong style="font-size:1.6rem;display:block;">48+</strong><span style="font-size:0.82rem;color:var(--text-muted);">Partner Schools</span></div>
          </div>
          <div class="metric-card">
            <div class="metric-icon green"><i class="fa-solid fa-users"></i></div>
            <div><strong style="font-size:1.6rem;display:block;">14,800</strong><span style="font-size:0.82rem;color:var(--text-muted);">Students Served Daily</span></div>
          </div>
          <div class="metric-card">
            <div class="metric-icon blue"><i class="fa-solid fa-city"></i></div>
            <div><strong style="font-size:1.6rem;display:block;">6 Cities</strong><span style="font-size:0.82rem;color:var(--text-muted);">Delivery Coverage</span></div>
          </div>
          <div class="metric-card">
            <div class="metric-icon amber"><i class="fa-solid fa-star"></i></div>
            <div><strong style="font-size:1.6rem;display:block;">4.9 / 5</strong><span style="font-size:0.82rem;color:var(--text-muted);">School Admin Rating</span></div>
          </div>
        </div>

        <div class="features-grid">
          <div class="feature-card" style="display:flex; align-items:center; gap:1.25rem; flex-direction:row;">
            <i class="fa-solid fa-building-columns" style="font-size:2.2rem;color:var(--primary);flex-shrink:0;"></i>
            <div>
              <h4 style="margin-bottom:0.2rem;">Saint Jude Academy</h4>
              <p style="font-size:0.83rem;color:var(--text-muted);margin-bottom:0.5rem;">Grades K–12 • 1,200 Subscribers</p>
              <span class="status-pill"><span class="pulse-dot"></span> Active Partner</span>
            </div>
          </div>
          <div class="feature-card" style="display:flex; align-items:center; gap:1.25rem; flex-direction:row;">
            <i class="fa-solid fa-school" style="font-size:2.2rem;color:var(--secondary);flex-shrink:0;"></i>
            <div>
              <h4 style="margin-bottom:0.2rem;">Oakridge International</h4>
              <p style="font-size:0.83rem;color:var(--text-muted);margin-bottom:0.5rem;">Grades 1–12 • 2,400 Subscribers</p>
              <span class="status-pill"><span class="pulse-dot"></span> Active Partner</span>
            </div>
          </div>
          <div class="feature-card" style="display:flex; align-items:center; gap:1.25rem; flex-direction:row;">
            <i class="fa-solid fa-graduation-cap" style="font-size:2.2rem;color:var(--accent);flex-shrink:0;"></i>
            <div>
              <h4 style="margin-bottom:0.2rem;">Greenwood High School</h4>
              <p style="font-size:0.83rem;color:var(--text-muted);margin-bottom:0.5rem;">Grades 9–12 • 1,850 Subscribers</p>
              <span class="status-pill"><span class="pulse-dot"></span> Active Partner</span>
            </div>
          </div>
          <div class="feature-card" style="display:flex; align-items:center; gap:1.25rem; flex-direction:row;">
            <i class="fa-solid fa-book-open-reader" style="font-size:2.2rem;color:var(--info);flex-shrink:0;"></i>
            <div>
              <h4 style="margin-bottom:0.2rem;">Cambridge Prep School</h4>
              <p style="font-size:0.83rem;color:var(--text-muted);margin-bottom:0.5rem;">Grades 3–10 • 950 Subscribers</p>
              <span class="status-pill"><span class="pulse-dot"></span> Active Partner</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- School Partnership CTA -->
    <section class="pricing-section" id="h2-partner-section" style="background:var(--bg-surface);border-top:1px solid var(--border);">
      <div class="container">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:4rem; align-items:start;">
          <div>
            <span class="section-tag"><i class="fa-solid fa-handshake"></i> School Partnerships</span>
            <h2 class="section-title" style="margin-top:1rem;">Ready to Transform Your School's Canteen?</h2>
            <p style="color:var(--text-muted); margin-bottom:2rem; line-height:1.7;">
              We handle everything — from daily meal planning and delivery to RFID cashless canteen hardware installation, parent-facing app setup, and full on-site staff training.
            </p>
            <div style="display:flex; flex-direction:column; gap:1.25rem;">
              <div style="display:flex; align-items:flex-start; gap:1rem;">
                <div style="width:42px;height:42px;border-radius:50%;background:var(--secondary-light);color:var(--secondary);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1rem;flex-shrink:0;">1</div>
                <div><strong style="display:block;margin-bottom:0.25rem;">Submit Partnership Inquiry</strong><span style="font-size:0.88rem;color:var(--text-muted);">Our team responds within 1 business day with a custom proposal.</span></div>
              </div>
              <div style="display:flex; align-items:flex-start; gap:1rem;">
                <div style="width:42px;height:42px;border-radius:50%;background:var(--secondary-light);color:var(--secondary);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1rem;flex-shrink:0;">2</div>
                <div><strong style="display:block;margin-bottom:0.25rem;">Kitchen Capacity Assessment</strong><span style="font-size:0.88rem;color:var(--text-muted);">Our food safety engineer visits your school facility for assessment.</span></div>
              </div>
              <div style="display:flex; align-items:flex-start; gap:1rem;">
                <div style="width:42px;height:42px;border-radius:50%;background:var(--secondary-light);color:var(--secondary);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1rem;flex-shrink:0;">3</div>
                <div><strong style="display:block;margin-bottom:0.25rem;">Go Live in 30 Days</strong><span style="font-size:0.88rem;color:var(--text-muted);">Full parent onboarding, app setup, RFID hardware install &amp; first tiffin delivery.</span></div>
              </div>
            </div>
          </div>
          <div class="builder-card">
            <h3 style="margin-bottom:1.25rem;font-size:1.25rem;"><i class="fa-solid fa-school" style="color:var(--secondary);"></i> School Partnership Inquiry</h3>
            <form onsubmit="event.preventDefault(); window.app && window.app.showToast('Partnership inquiry submitted! Our team will contact you within 24 hours.'); this.reset();">
              <div class="form-group">
                <label>School / College Name</label>
                <input type="text" class="form-input" placeholder="e.g. Sunrise International Academy" required>
              </div>
              <div class="form-group">
                <label>Administrator Name &amp; Role</label>
                <input type="text" class="form-input" placeholder="e.g. Dr. Priya Rajan – Principal" required>
              </div>
              <div class="form-group">
                <label>Student Enrollment</label>
                <select class="form-select">
                  <option>Under 500 students</option>
                  <option>500 – 1,000 students</option>
                  <option>1,000 – 2,500 students</option>
                  <option>Over 2,500 students</option>
                </select>
              </div>
              <div class="form-group">
                <label>Contact Email</label>
                <input type="email" class="form-input" placeholder="admin@school.edu" required>
              </div>
              <button type="submit" class="btn btn-secondary btn-block" style="margin-top:0.5rem;">
                <i class="fa-solid fa-paper-plane"></i>&nbsp;Submit Partnership Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,

  'view-about': `
    <!-- About Hero Section -->
    <section class="hero-wrapper" style="position: relative; overflow: hidden; padding-bottom: 4rem;">
      <!-- Decorative background glow -->
      <div style="position:absolute; top:-10%; right:-10%; width:400px; height:400px; background:radial-gradient(circle, var(--primary-light) 0%, transparent 70%); opacity:0.6; filter:blur(40px); z-index:0;"></div>
      
      <div class="container" style="position:relative; z-index:1;">
        <div class="hero-grid" style="align-items: center; gap: 4rem;">
          <div class="hero-content">
            <div style="display:inline-flex; align-items:center; gap:0.5rem; padding:0.4rem 1rem; background:var(--primary-light); color:var(--primary); border-radius:var(--radius-full); font-size:0.85rem; font-weight:700; margin-bottom:1.5rem; box-shadow: 0 4px 12px rgba(133, 194, 64, 0.15);">
              <i class="fa-solid fa-leaf"></i> NourishKid Origins
            </div>
            <h1 class="hero-title" style="font-size: 3.2rem; line-height: 1.15; margin-bottom: 1.5rem;">
              Redefining <span class="highlight">School Lunch</span> for the Next Generation.
            </h1>
            <p class="hero-subtitle" style="font-size: 1.1rem; line-height: 1.7; margin-bottom: 2rem;">
              Founded by pediatric nutritionists and concerned parents, our mission is to replace junk-filled canteens with wholesome, chef-made meals that kids actually love to eat.
            </p>
            <div style="display: flex; gap: 2rem; border-top: 1px solid var(--border-color); padding-top: 2rem;">
              <div>
                <h4 style="font-size: 2rem; color: var(--primary); margin-bottom: 0.2rem;">2021</h4>
                <p style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Year Founded</p>
              </div>
              <div>
                <h4 style="font-size: 2rem; color: var(--secondary); margin-bottom: 0.2rem;">2M+</h4>
                <p style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Meals Delivered</p>
              </div>
              <div>
                <h4 style="font-size: 2rem; color: var(--accent); margin-bottom: 0.2rem;">100%</h4>
                <p style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Organic Sourced</p>
              </div>
            </div>
          </div>
          
          <div class="hero-visual" style="position: relative;">
            <div style="border-radius: 24px; overflow: hidden; box-shadow: var(--shadow-xl); border: 8px solid var(--card-bg); transform: rotate(2deg); transition: transform 0.4s ease;" onmouseover="this.style.transform='rotate(0deg)'" onmouseout="this.style.transform='rotate(2deg)'">
              <img src="./src/assets/hero_classroom.jpg" alt="Happy students in classroom" style="width: 100%; height: auto; display: block;">
            </div>
            
            <div class="floating-badge" style="position:absolute; bottom: -20px; left: -20px; background:var(--card-bg); padding:1rem; border-radius:16px; box-shadow:var(--shadow-lg); display:flex; align-items:center; gap:1rem; animation: float 6s ease-in-out infinite;">
              <div style="width:48px; height:48px; border-radius:50%; background:var(--secondary-light); color:var(--secondary); display:flex; align-items:center; justify-content:center; font-size:1.5rem;">
                <i class="fa-solid fa-award"></i>
              </div>
              <div>
                <div style="font-weight:700; font-size:0.9rem; color:var(--text-color);">Award Winning</div>
                <div style="font-size:0.75rem; color:var(--text-muted);">Best Kids Nutrition 2024</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Values -->
    <section class="features-section" style="background: var(--bg-secondary);">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag"><i class="fa-solid fa-star"></i> Core Values</span>
          <h2 class="section-title">What Drives Us Every Day</h2>
          <p class="section-subtitle">We believe that every child deserves access to nutritious, delicious food that fuels their learning and growth.</p>
        </div>
        
        <div class="features-grid">
          <div class="feature-card" style="transition: all 0.3s ease;">
            <div class="feature-icon-wrapper" style="background: var(--primary-light); color: var(--primary);"><i class="fa-solid fa-seedling"></i></div>
            <h3 style="margin-bottom: 0.75rem; font-size: 1.25rem;">Farm-Direct Sourcing</h3>
            <p style="color: var(--text-muted); line-height: 1.6; font-size: 0.95rem;">We work exclusively with certified organic farms within a 50-mile radius. Zero frozen preservatives or processed additives.</p>
          </div>
          
          <div class="feature-card" style="transition: all 0.3s ease;">
            <div class="feature-icon-wrapper" style="background: var(--secondary-light); color: var(--secondary);"><i class="fa-solid fa-microscope"></i></div>
            <h3 style="margin-bottom: 0.75rem; font-size: 1.25rem;">Clinical Dietitian Formulation</h3>
            <p style="color: var(--text-muted); line-height: 1.6; font-size: 0.95rem;">Every recipe is lab-tested for glycemic load and micro-nutrient distribution suitable for growing children.</p>
          </div>
          
          <div class="feature-card" style="transition: all 0.3s ease;">
            <div class="feature-icon-wrapper" style="background: var(--accent-light); color: var(--accent);"><i class="fa-solid fa-earth-americas"></i></div>
            <h3 style="margin-bottom: 0.75rem; font-size: 1.25rem;">Sustainable Practices</h3>
            <p style="color: var(--text-muted); line-height: 1.6; font-size: 0.95rem;">From our 100% compostable tiffin packaging to zero-waste kitchen policies, we protect the planet they will inherit.</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- The Team -->
    <section class="menu-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag"><i class="fa-solid fa-users"></i> Meet The Experts</span>
          <h2 class="section-title">The Brains Behind the Brain Food</h2>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin-top: 3rem;">
          <!-- Team Member 1 -->
          <div class="feature-card" style="padding: 2rem; text-align: center; display: flex; flex-direction: column; align-items: center;">
            <img src="./src/assets/nutritionist.jpg" alt="Sarah Jensen" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; margin-bottom: 1.5rem; border: 4px solid white; box-shadow: var(--shadow-md);">
            <h4 style="font-size: 1.25rem; margin-bottom: 0.25rem;">Sarah Jensen, RD</h4>
            <p style="color: var(--primary); font-weight: 600; font-size: 0.9rem; margin-bottom: 1rem;">Chief Pediatric Nutritionist</p>
            <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5;">Former Head of Pediatric Dietetics at Children's Hospital, ensuring every meal meets strict developmental guidelines.</p>
          </div>
          
          <!-- Team Member 2 -->
          <div class="feature-card" style="padding: 2rem; text-align: center; display: flex; flex-direction: column; align-items: center;">
            <img src="./src/assets/chef.jpg" alt="Chef David Miller" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; margin-bottom: 1.5rem; border: 4px solid white; box-shadow: var(--shadow-md);">
            <h4 style="font-size: 1.25rem; margin-bottom: 0.25rem;">Chef David Miller</h4>
            <p style="color: var(--secondary); font-weight: 600; font-size: 0.9rem; margin-bottom: 1rem;">Executive Culinary Director</p>
            <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5;">Michelin-trained chef who left fine dining to solve the hardest culinary challenge: making healthy food kids crave.</p>
          </div>
          
          <!-- Team Member 3 -->
          <div class="feature-card" style="padding: 2rem; text-align: center; display: flex; flex-direction: column; align-items: center;">
            <img src="./src/assets/founder.png" alt="Sarah Jenkins" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; margin-bottom: 1.5rem; border: 4px solid white; box-shadow: var(--shadow-md);">
            <h4 style="font-size: 1.25rem; margin-bottom: 0.25rem;">Sarah Jenkins</h4>
            <p style="color: var(--accent); font-weight: 600; font-size: 0.9rem; margin-bottom: 1rem;">Founder & CEO</p>
            <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5;">Mother of three who started NourishKid after seeing the heavily processed options in her children's school cafeteria.</p>
          </div>
        </div>
      </div>
    </section>
  `,

  'view-services': `
    <section class="features-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag"><i class="fa-solid fa-concierge-bell"></i> Our Comprehensive Services</span>
          <h2 class="section-title">End-to-End School Food Solutions</h2>
          <p class="section-subtitle">From daily home-to-desk tiffin delivery to complete digital school canteen turn-key setups.</p>
        </div>

        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon-wrapper"><i class="fa-solid fa-box"></i></div>
            <h3>Daily Tiffin Subscription</h3>
            <p>Hot lunch boxes delivered directly to student classrooms every day before noon.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon-wrapper" style="background: var(--accent-light); color: var(--accent);"><i class="fa-solid fa-credit-card"></i></div>
            <h3>Smart RFID Canteen POS</h3>
            <p>Cashless digital wallet for school canteens. Fast tap payment to eliminate long student lines.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon-wrapper" style="background: var(--secondary-light); color: var(--secondary);"><i class="fa-solid fa-user-doctor"></i></div>
            <h3>Custom Allergy Catering</h3>
            <p>Personalized meal plans for diabetic, celiac, nut-allergic, or religious diet restrictions.</p>
          </div>
        </div>
      </div>
    </section>
  `,

  'view-contact': `
    <section class="hero-wrapper">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag"><i class="fa-solid fa-envelope"></i> Get In Touch</span>
          <h2 class="section-title">We’re Here to Help Parents & School Administrators</h2>
          <p class="section-subtitle">Have a question about our tiffin subscriptions, school partnerships, or allergen safety?</p>
        </div>

        <div class="builder-card" style="max-width: 780px; margin: 0 auto;">
          <form id="contact-form" onsubmit="window.app.handleContactSubmit(event)">
            <div class="form-grid">
              <div class="form-group">
                <label for="contact-name">Your Full Name</label>
                <input type="text" id="contact-name" class="form-input" placeholder="Sarah Jenkins" required>
              </div>
              <div class="form-group">
                <label for="contact-email">Email Address</label>
                <input type="email" id="contact-email" class="form-input" placeholder="sarah@example.com" required>
              </div>
            </div>
            <div class="form-group">
              <label for="contact-subject">Inquiry Type</label>
              <select id="contact-subject" class="form-select">
                <option value="parent">Parent Subscription Question</option>
                <option value="school">School Partnership / Canteen Setup</option>
                <option value="allergy">Special Allergy Customization</option>
              </select>
            </div>
            <div class="form-group">
              <label for="contact-message">Message</label>
              <textarea id="contact-message" class="form-textarea" rows="4" placeholder="How can we help you?" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  `,

  'view-user-dashboard': `
    <div class="container">
      <div class="dashboard-layout">
        <!-- Sidebar -->
        <aside class="dashboard-sidebar">
          <div class="student-selector-card">
            <div class="student-avatar">LD</div>
            <div>
              <strong style="display: block; font-size: 0.95rem;">Liam Davis</strong>
              <span style="font-size: 0.78rem; color: var(--text-muted);">Saint Jude Academy • Grade 5</span>
            </div>
          </div>

          <nav class="dash-nav-list">
            <button class="dash-nav-btn active" onclick="window.app.switchDashTab('tab-overview', this)">
              <i class="fa-solid fa-house"></i> <span>Daily Overview</span>
            </button>
            <button class="dash-nav-btn" onclick="window.app.switchDashTab('tab-meals', this)">
              <i class="fa-solid fa-calendar-days"></i> <span>Weekly Meal Schedule</span>
            </button>
            <button class="dash-nav-btn" onclick="window.app.switchDashTab('tab-allergies', this)">
              <i class="fa-solid fa-shield-virus"></i> <span>Allergies & Diets</span>
            </button>
            <button class="dash-nav-btn" onclick="window.app.switchDashTab('tab-billing', this)">
              <i class="fa-solid fa-receipt"></i> <span>Subscription & Billing</span>
            </button>
            <button class="dash-nav-btn" onclick="window.app.switchDashTab('tab-wallet', this)">
              <i class="fa-solid fa-wallet"></i> <span>RFID Canteen Wallet</span>
            </button>
          </nav>
        </aside>

        <!-- Main Dashboard Content -->
        <main class="dashboard-main">
          <!-- Tab 1: Overview -->
          <div id="tab-overview" class="dash-tab-panel active-panel">
            <div class="dashboard-header-card">
              <div>
                <h2>Today's Lunch Tracker</h2>
                <p style="color: var(--text-muted); font-size: 0.9rem;">Thursday • August 6, 2026</p>
              </div>
              <span class="status-pill">
                <span class="pulse-dot"></span>
                <span>Active Subscription</span>
              </span>
            </div>

            <!-- Delivery Progress -->
            <div class="delivery-timeline">
              <div class="step-item completed">
                <div class="step-icon"><i class="fa-solid fa-check"></i></div>
                <strong style="font-size: 0.85rem;">Central Prep</strong>
                <span style="font-size: 0.75rem; color: var(--text-muted);">06:30 AM</span>
              </div>
              <div class="step-item completed">
                <div class="step-icon"><i class="fa-solid fa-check"></i></div>
                <strong style="font-size: 0.85rem;">Quality Seal</strong>
                <span style="font-size: 0.75rem; color: var(--text-muted);">08:15 AM</span>
              </div>
              <div class="step-item current">
                <div class="step-icon"><i class="fa-solid fa-truck-fast"></i></div>
                <strong style="font-size: 0.85rem;">In Transit</strong>
                <span style="font-size: 0.75rem; color: var(--text-muted);">ETA 11:45 AM</span>
              </div>
              <div class="step-item">
                <div class="step-icon"><i class="fa-solid fa-box-open"></i></div>
                <strong style="font-size: 0.85rem;">Desk Hand-off</strong>
                <span style="font-size: 0.75rem; color: var(--text-muted);">Pending</span>
              </div>
            </div>

            <!-- Today's Menu Preview Card -->
            <div class="builder-card">
              <h3 style="margin-bottom: 1rem;"><i class="fa-solid fa-utensils" style="color: var(--primary);"></i> Scheduled Lunch for Today</h3>
              <div class="preview-meal-item" style="background: var(--bg-muted);">
                
                <div class="meal-details">
                  <h4>Teriyaki Chicken Rice Bowl & Superberry Smoothie</h4>
                  <p style="font-size: 0.85rem; color: var(--text-muted);">520 kcal • Nut-Free Verified • Stainless Pod #14</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab 2: Weekly Schedule -->
          <div id="tab-meals" class="dash-tab-panel">
            <div class="dashboard-header-card">
              <h2>Select Next Week's Lunches</h2>
              <button class="btn btn-primary btn-sm" onclick="window.app.saveParentWeeklySchedule()">Save Choices</button>
            </div>
            <div class="builder-card">
              <div class="days-row" style="grid-template-columns: 1fr;">
                <div class="form-group">
                  <label>Monday Lunch</label>
                  <select class="form-select" id="dash-select-mon">
                    <option value="Teriyaki Chicken Rice Bowl">Teriyaki Chicken Rice Bowl</option>
                    <option value="Organic Veggie Pasta">Organic Veggie Pasta</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Tuesday Lunch</label>
                  <select class="form-select" id="dash-select-tue">
                    <option value="Organic Veggie & Cheese Pasta">Organic Veggie & Cheese Pasta</option>
                    <option value="Crispy Paneer Tacos">Crispy Paneer Tacos</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Wednesday Lunch</label>
                  <select class="form-select" id="dash-select-wed">
                    <option value="Grilled Salmon with Quinoa">Grilled Salmon with Quinoa</option>
                    <option value="Teriyaki Chicken Rice Bowl">Teriyaki Chicken Rice Bowl</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab 3: Allergies -->
          <div id="tab-allergies" class="dash-tab-panel">
            <div class="dashboard-header-card">
              <h2>Child Dietary & Allergy Configurator</h2>
              <button class="btn btn-primary btn-sm" onclick="window.app.saveAllergies()">Update Allergy Seal</button>
            </div>
            <div class="builder-card">
              <div class="checkbox-group" style="flex-direction: column; gap: 1rem;">
                <label class="checkbox-label" style="font-size: 1rem;">
                  <input type="checkbox" id="allergy-nut" checked>
                  <strong>Strict Nut-Free Kitchen Seal (Peanuts & Tree Nuts)</strong>
                </label>
                <label class="checkbox-label" style="font-size: 1rem;">
                  <input type="checkbox" id="allergy-gluten">
                  <strong>Gluten-Free Meal Substitutions</strong>
                </label>
                <label class="checkbox-label" style="font-size: 1rem;">
                  <input type="checkbox" id="allergy-dairy">
                  <strong>Dairy-Free / Plant Milk Only</strong>
                </label>
              </div>
            </div>
          </div>

          <!-- Tab 4: Billing -->
          <div id="tab-billing" class="dash-tab-panel">
            <div class="dashboard-header-card">
              <h2>Subscription & Billing History</h2>
              <span class="status-pill">Auto-Renew ON</span>
            </div>
            <div class="builder-card">
              <div class="modal-summary">
                <div class="summary-item"><span>Current Plan:</span> <strong>NutriPlus Balanced ($49.00 / week)</strong></div>
                <div class="summary-item"><span>Next Billing Date:</span> <span>August 10, 2026</span></div>
                <div class="summary-item"><span>Payment Method:</span> <span>Visa ending in •••• 4242</span></div>
              </div>
              <button class="btn btn-outline" onclick="window.app.showToast('Invoice PDF downloaded to device.')">
                <i class="fa-solid fa-file-pdf"></i> Download August Statement (PDF)
              </button>
            </div>
          </div>

          <!-- Tab 5: Wallet -->
          <div id="tab-wallet" class="dash-tab-panel">
            <div class="dashboard-header-card">
              <div>
                <h2>Canteen RFID Wallet</h2>
                <p style="font-size: 0.88rem; color: var(--text-muted);">Student ID Card Tag #RFID-99481</p>
              </div>
              <div style="font-size: 1.8rem; font-weight: 800; color: var(--secondary);" id="wallet-balance-text">$38.50</div>
            </div>
            <div class="builder-card">
              <h4>Top Up Canteen Balance</h4>
              <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1.25rem;">Funds are used for extra fruit cups, smoothies, or after-school canteen snacks.</p>
              <div style="display: flex; gap: 1rem;">
                <button class="btn btn-outline" onclick="window.app.topupWallet(10)">+$10.00</button>
                <button class="btn btn-outline" onclick="window.app.topupWallet(25)">+$25.00</button>
                <button class="btn btn-primary" onclick="window.app.topupWallet(50)">+$50.00</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  `,

  'view-admin-dashboard': `
    <div class="container" style="padding: 2.5rem 0 5rem;">
      <div class="dashboard-header-card" style="margin-bottom: 2rem;">
        <div>
          <h2>Central Kitchen & Canteen Admin Operations</h2>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Dispatch Control • Menu Manager • Revenue Analytics</p>
        </div>
        <button class="btn btn-primary" onclick="window.app.openAddDishModal()">
          <i class="fa-solid fa-plus"></i> Add New Menu Item
        </button>
      </div>

      <!-- KPI Metrics -->
      <div class="admin-metrics-grid" style="margin-bottom: 2.5rem;">
        <div class="metric-card">
          <div class="metric-icon orange"><i class="fa-solid fa-utensils"></i></div>
          <div>
            <strong style="font-size: 1.5rem; display: block;">1,420</strong>
            <span style="font-size: 0.82rem; color: var(--text-muted);">Meals Prepped Today</span>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon green"><i class="fa-solid fa-users"></i></div>
          <div>
            <strong style="font-size: 1.5rem; display: block;">1,280</strong>
            <span style="font-size: 0.82rem; color: var(--text-muted);">Active Subscribers</span>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon amber"><i class="fa-solid fa-dollar-sign"></i></div>
          <div>
            <strong style="font-size: 1.5rem; display: block;">$6,890</strong>
            <span style="font-size: 0.82rem; color: var(--text-muted);">Daily Recurring Revenue</span>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon blue"><i class="fa-solid fa-school"></i></div>
          <div>
            <strong style="font-size: 1.5rem; display: block;">48</strong>
            <span style="font-size: 0.82rem; color: var(--text-muted);">Active Partner Schools</span>
          </div>
        </div>
      </div>

      <!-- Today's Kitchen Production Queue -->
      <div class="builder-card" style="margin-bottom: 2.5rem;">
        <h3 style="margin-bottom: 1.25rem;"><i class="fa-solid fa-fire" style="color: var(--primary);"></i> Today's Kitchen Dispatch Queue</h3>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Dish Name</th>
                <th>Category</th>
                <th>Portions Needed</th>
                <th>Kitchen Line</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Teriyaki Chicken Rice Bowl</strong></td>
                <td>Hot Lunch</td>
                <td>640 Portions</td>
                <td>Line #1 (Main)</td>
                <td><span class="status-pill">Ready for Transit</span></td>
              </tr>
              <tr>
                <td><strong>Organic Veggie & Cheese Pasta</strong></td>
                <td>Vegetarian</td>
                <td>480 Portions</td>
                <td>Line #2 (Veggie)</td>
                <td><span class="status-pill" style="background: var(--accent-light); color: var(--accent);">Packing</span></td>
              </tr>
              <tr>
                <td><strong>Superberry Greek Yogurt Smoothie</strong></td>
                <td>Beverage</td>
                <td>820 Bottles</td>
                <td>Line #4 (Cold)</td>
                <td><span class="status-pill">Dispatched</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Admin Canteen Menu Manager -->
      <div class="builder-card">
        <h3 style="margin-bottom: 1.25rem;"><i class="fa-solid fa-list-check" style="color: var(--secondary);"></i> Active Canteen Menu Items</h3>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Calories</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="admin-dishes-table-body">
              <!-- Rendered Dynamically -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
};

// --- Application Core Class ---
class App {
  constructor() {
    this.state = APP_STATE;
    this.init();
  }

  init() {
    this.applyTheme(this.state.theme);
    this.applyDir(this.state.dir);
    this.setupEventListeners();
    this.handleRoute();
  }

  // RTL/LTR Toggle Logic
  // MUST display ONLY the active mode text ('LTR' when in LTR mode, 'RTL' when in RTL mode)
  toggleDir() {
    const nextDir = this.state.dir === 'ltr' ? 'rtl' : 'ltr';
    this.applyDir(nextDir);
    this.showToast(`Layout switched to ${nextDir.toUpperCase()} mode.`);
  }

  applyDir(dir) {
    this.state.dir = dir;
    localStorage.setItem('nk_dir', dir);
    document.documentElement.setAttribute('dir', dir);

    // Update Button Display Text
    document.querySelectorAll('.rtl-status-text').forEach(el => {
      el.textContent = dir.toUpperCase();
    });
  }

  // Dark/Light Theme Switch
  toggleTheme() {
    const nextTheme = this.state.theme === 'light' ? 'dark' : 'light';
    this.applyTheme(nextTheme);
    this.showToast(`Switched to ${nextTheme} theme.`);
  }

  applyTheme(theme) {
    this.state.theme = theme;
    localStorage.setItem('nk_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }

  // Navigation & View Routing
  switchView(viewId) {
    if (!VIEWS[viewId]) return;
    this.state.activeView = viewId;

    const container = document.getElementById('app-view-container');
    if (!container) return;

    // Render View Content
    container.innerHTML = `<div class="view-section active-view">${VIEWS[viewId]}</div>`;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update Nav Active Links
    document.querySelectorAll('.nav-link, .dropdown-item').forEach(el => {
      if (el.getAttribute('data-target') === viewId) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

    // Re-render specific dynamic components per view
    if (viewId === 'view-home-1') {
      this.renderDishesGrid(this.state.dishes);
    } else if (viewId === 'view-admin-dashboard') {
      this.renderAdminDishesTable();
    }
  }

  handleRoute() {
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
  }

  setupEventListeners() {
    // Hash change event listener
    window.addEventListener('hashchange', () => this.handleRoute());

    // Navigation Click Handlers
    document.querySelectorAll('[data-target]').forEach(el => {
      el.addEventListener('click', (e) => {
        const targetView = el.getAttribute('data-target');
        if (targetView) {
          this.switchView(targetView);
        }
      });
    });

    // RTL Toggle Click Handler
    const rtlBtn = document.getElementById('rtl-toggle');
    if (rtlBtn) {
      rtlBtn.addEventListener('click', () => this.toggleDir());
    }

    // Theme Toggle Click Handler
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    // Subscribe Modal Triggers
    const openModalBtn = document.getElementById('open-subscribe-modal-btn');
    if (openModalBtn) {
      openModalBtn.addEventListener('click', () => this.openSubscribeModal());
    }

    const closeModalBtn = document.getElementById('modal-close-btn');
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => this.closeModal('subscribe-modal'));
    }

    const dishModalCloseBtn = document.getElementById('dish-modal-close-btn');
    if (dishModalCloseBtn) {
      dishModalCloseBtn.addEventListener('click', () => this.closeModal('dish-modal'));
    }

    // Modal Subscribe Form Submit
    const subForm = document.getElementById('subscribe-form');
    if (subForm) {
      subForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const student = document.getElementById('modal-student-name').value;
        const tier = document.getElementById('modal-plan-tier').value;
        this.closeModal('subscribe-modal');
        this.showToast(`Subscription activated for ${student} (${tier})!`);
        this.switchView('view-user-dashboard');
      });
    }

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    if (mobileBtn && navMenu) {
      mobileBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
      });
    }
  }

  // Render Dishes in Home 1 Showcase
  renderDishesGrid(dishes) {
    const container = document.getElementById('dishes-grid-container');
    if (!container) return;

    container.innerHTML = dishes.map(dish => `
      <div class="dish-card">
        <div class="dish-image-wrapper">
          ${dish.image ? `<img src="${dish.image}" alt="${dish.name}">` : ''}
          <span class="dish-category-badge">${dish.category.toUpperCase()}</span>
        </div>
        <div class="dish-body">
          <h3 class="dish-title">${dish.name}</h3>
          <p class="dish-desc">${dish.description}</p>
          <div class="dish-tags">
            ${dish.tags.map(t => `<span class="tag-pill ${t}">${t.toUpperCase()}</span>`).join('')}
            <span class="tag-pill">${dish.calories} kcal</span>
          </div>
          <div class="dish-footer">
            <span class="dish-price">$${dish.price.toFixed(2)}</span>
            <button class="btn btn-outline btn-sm" onclick="window.app.openDishModal(${dish.id})">
              <i class="fa-solid fa-circle-info"></i> Details
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  filterMenu(category, btnEl) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');

    if (category === 'all') {
      this.renderDishesGrid(this.state.dishes);
    } else {
      const filtered = this.state.dishes.filter(d => d.category === category);
      this.renderDishesGrid(filtered);
    }
  }

  openDishModal(dishId) {
    const dish = this.state.dishes.find(d => d.id === dishId);
    if (!dish) return;

    const modalContent = document.getElementById('dish-modal-content');
    if (modalContent) {
      modalContent.innerHTML = `
        <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
          
          <div style="flex: 1;">
            <h3 style="margin-bottom: 0.5rem;">${dish.name}</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem;">${dish.description}</p>
            <div class="modal-summary">
              <div class="summary-item"><span>Calories:</span> <strong>${dish.calories} kcal</strong></div>
              <div class="summary-item"><span>Protein:</span> <span>${dish.protein}</span></div>
              <div class="summary-item"><span>Carbohydrates:</span> <span>${dish.carbs}</span></div>
              <div class="summary-item"><span>Healthy Fat:</span> <span>${dish.fat}</span></div>
            </div>
          </div>
        </div>
      `;
    }
    this.openModal('dish-modal');
  }

  // Interactive Weekly Builder
  updateWeeklyBuilder(day, mealName) {
    this.state.weeklyMeals[day] = mealName;
    this.showToast(`Updated ${day}'s meal to ${mealName}`);
  }

  toggleBillingCycle() {
    this.state.billingCycle = this.state.billingCycle === 'weekly' ? 'monthly' : 'weekly';
    const textEl = document.getElementById('cycle-toggle-text');
    const isMonthly = this.state.billingCycle === 'monthly';

    if (textEl) {
      textEl.textContent = isMonthly ? 'Switch to Weekly' : 'Switch to Monthly (Save 15%)';
    }

    document.getElementById('price-tier-1').innerHTML = isMonthly ? '$98 <span>/ month</span>' : '$29 <span>/ week</span>';
    document.getElementById('price-tier-2').innerHTML = isMonthly ? '$166 <span>/ month</span>' : '$49 <span>/ week</span>';
    document.getElementById('price-tier-3').innerHTML = isMonthly ? '$234 <span>/ month</span>' : '$69 <span>/ week</span>';
  }

  // User Dashboard Actions
  switchDashTab(tabId, btnEl) {
    document.querySelectorAll('.dash-nav-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');

    document.querySelectorAll('.dash-tab-panel').forEach(p => p.classList.remove('active-panel'));
    const targetPanel = document.getElementById(tabId);
    if (targetPanel) targetPanel.classList.add('active-panel');
  }

  topupWallet(amount) {
    this.state.walletBalance += amount;
    const el = document.getElementById('wallet-balance-text');
    if (el) el.textContent = `$${this.state.walletBalance.toFixed(2)}`;
    this.showToast(`Added +$${amount}.00 to Student Canteen RFID Wallet!`);
  }

  saveParentWeeklySchedule() {
    this.showToast('Saved next week’s meal schedule for Liam!');
  }

  saveAllergies() {
    this.showToast('Updated Allergy & Diet Profile!');
  }

  // Admin Dashboard Actions
  renderAdminDishesTable() {
    const tbody = document.getElementById('admin-dishes-table-body');
    if (!tbody) return;

    tbody.innerHTML = this.state.dishes.map(dish => `
      <tr>
        <td><strong>${dish.name}</strong></td>
        <td>${dish.category.toUpperCase()}</td>
        <td>$${dish.price.toFixed(2)}</td>
        <td>${dish.calories} kcal</td>
        <td>
          <button class="btn btn-outline btn-sm" onclick="window.app.deleteDish(${dish.id})">
            <i class="fa-solid fa-trash" style="color: var(--primary);"></i> Delete
          </button>
        </td>
      </tr>
    `).join('');
  }

  deleteDish(dishId) {
    this.state.dishes = this.state.dishes.filter(d => d.id !== dishId);
    this.renderAdminDishesTable();
    this.showToast('Deleted dish item from menu database.');
  }

  openAddDishModal() {
    const name = prompt('Enter Dish Name:');
    if (!name) return;
    const price = parseFloat(prompt('Enter Price ($):', '9.50')) || 9.50;

    const newDish = {
      id: Date.now(),
      name: name,
      category: 'lunch',
      price: price,
      calories: 450,
      protein: '20g',
      carbs: '50g',
      fat: '10g',
      tags: ['nut-free'],
      description: 'Fresh chef cooked canteen special portion.',
      available: true
    };

    this.state.dishes.push(newDish);
    this.renderAdminDishesTable();
    this.showToast(`Added new item "${name}" to canteen menu!`);
  }

  handleContactSubmit(e) {
    e.preventDefault();
    this.showToast('Message sent! Our school catering coordinator will reply within 24 hours.');
    e.target.reset();
  }

  // Modal Helpers
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  }

  openSubscribeModal(tierName = 'NutriPlus Balanced') {
    const selectEl = document.getElementById('modal-plan-tier');
    if (selectEl && tierName) {
      Array.from(selectEl.options).forEach(opt => {
        if (opt.value.includes(tierName)) opt.selected = true;
      });
    }
    this.openModal('subscribe-modal');
  }

  // Toast Notification Manager
  showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--secondary);"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
}

// Initialize Application Globals
const initApp = () => {
  if (!window.app) {
    window.app = new App();
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}


