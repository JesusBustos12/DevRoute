import re

file_path = r"c:\IDEs - Lenguajes de Programacion\IDEs\Cursor - Gravity\(Curso de Vide Coding)\10 - Chat Bot del mundo de la programacion\Chat Bot del mundo de la programacion\src\data\courses.ts"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Categories mapping
categories_map = {
    'Frontend': ['HTML', 'CSS', 'JS', 'JavaScript', 'React', 'Bootstrap', 'SASS', 'Angular', 'Astro', 'Tailwind', 'Maquetación', 'Responsive', 'jQuery', 'SEO'],
    'Backend': ['Node', 'PHP', 'Python', 'Laravel', 'Symfony', 'Backend', 'APIs', 'NodeJS', 'Express'],
    'IA & Agentes': ['IA', 'Inteligencia Artificial', 'OpenAI', 'DeepSeek', 'Gemini', 'Agentes', 'n8n', 'Antigravity', 'ChatGPT'],
    'Bases de Datos': ['SQL', 'Bases de Datos', 'Database', 'MongoDB', 'Mongo', 'MySQL']
}

def get_categories(title, desc):
    cats = []
    text = (title + " " + desc).lower()
    for cat, keywords in categories_map.items():
        for kw in keywords:
            if kw.lower() in text:
                cats.append(cat)
                break
    # Defaults
    if not cats:
        if 'programar' in text or 'lógica' in text:
            cats.append('Backend')
        else:
            cats.append('Frontend') # fallback
    return cats

lines = content.split('\n')
new_lines = []
for line in lines:
    if '{ title: "' in line and 'image:' in line:
        # Extract title and desc
        title_match = re.search(r'title:\s*"([^"]+)"', line)
        desc_match = re.search(r'desc:\s*"([^"]+)"', line)
        
        if title_match and desc_match:
            title = title_match.group(1)
            desc = desc_match.group(1)
            cats = get_categories(title, desc)
            cat_str = ", ".join([f'"{c}"' for c in cats])
            
            # Replace the end of the object
            if line.rstrip().endswith('},'):
                line = line.replace(' },', f', categories: [{cat_str}] }},')
            elif line.rstrip().endswith('}'):
                 line = line.replace(' }', f', categories: [{cat_str}] }}')
    new_lines.append(line)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(new_lines))

print("Updated courses.ts with categories.")
