import re

with open('src/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Light Mode updates
css = css.replace('--text-muted: #475569;', '--text-muted: #334155;')
css = css.replace('--text-light: #64748B;', '--text-light: #475569;')
css = css.replace('--primary: #E05D38;', '--primary: #D94E28;')
css = css.replace('--secondary: #059669;', '--secondary: #047857;')

# Inject new CSS variables for buttons
root_injection = """
  --info-light: #EFF6FF;
  
  --btn-primary-text: #FFFFFF;
  --btn-secondary-text-hover: #FFFFFF;
"""
css = css.replace('\n  --info-light: #EFF6FF;', root_injection)

dark_injection = """
  --info-light: rgba(59, 130, 246, 0.16);
  
  --btn-primary-text: #0B0F19;
  --btn-secondary-text-hover: #0B0F19;
"""
css = css.replace('\n  --info-light: rgba(59, 130, 246, 0.16);', dark_injection)

# Update Button rules
css = css.replace('color: #FFFFFF;', 'color: var(--btn-primary-text);')
# But wait! 'color: #FFFFFF;' is used in multiple places. Let's do it precisely for buttons.

btn_primary_css = """
.btn-primary {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%);
  color: var(--btn-primary-text);
"""
css = re.sub(
    r'\.btn-primary\s*\{\s*background:[^;]+;\s*color:\s*#FFFFFF;',
    btn_primary_css.strip(),
    css
)

btn_secondary_hover_css = """
.btn-secondary:hover {
  background: var(--secondary);
  color: var(--btn-secondary-text-hover);
"""
css = re.sub(
    r'\.btn-secondary:hover\s*\{\s*background:[^;]+;\s*color:\s*#FFFFFF;',
    btn_secondary_hover_css.strip(),
    css
)

with open('src/style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("CSS contrast patches applied successfully!")
