#!/usr/bin/env python3
"""
Figma Asset Helper
Simple utilities for managing Figma assets
"""

import os
import re
from pathlib import Path

def validate_assets():
    """Check if all CSS referenced assets exist"""
    
    css_file = Path('assets/css/figma/homepage-design.css')
    if not css_file.exists():
        print("❌ Figma CSS file not found")
        print("   Run setup first: python config/figma-quick-setup.py")
        return False
    
    print("🔍 Validating Figma asset references...")
    
    with open(css_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all url() references
    urls = re.findall(r'url\([\'"]?([^\'"\\)]+)[\'"]?\)', content)
    
    if not urls:
        print("   ℹ️  No asset references found in CSS")
        return True
    
    missing_assets = []
    
    for url in urls:
        # Handle relative paths from CSS file location
        if url.startswith('../'):
            asset_path = Path('assets/css/figma') / url
            asset_path = asset_path.resolve()
        else:
            asset_path = Path(url)
        
        if asset_path.exists():
            print(f"   ✅ {url}")
        else:
            print(f"   ❌ {url} (missing)")
            missing_assets.append(url)
    
    if missing_assets:
        print(f"\n⚠️  Found {len(missing_assets)} missing assets")
        print("   Export these from Figma to complete integration")
        return False
    else:
        print("\n✅ All assets found!")
        return True

def organize_assets():
    """Move assets from root figma folder to subfolders"""
    
    figma_folder = Path('assets/images/figma')
    if not figma_folder.exists():
        print("❌ Figma folder not found")
        print("   Run setup first: python config/figma-quick-setup.py")
        return
    
    # Asset patterns for organization
    patterns = {
        'icon': 'icons/',
        'button': 'buttons/', 
        'bg': 'backgrounds/',
        'background': 'backgrounds/',
        'sprite': 'sprites/',
        'card': 'ui-elements/',
        'ui': 'ui-elements/'
    }
    
    # Find files in root figma folder
    files_to_organize = list(figma_folder.glob('*.png')) + list(figma_folder.glob('*.svg'))
    
    if not files_to_organize:
        print("ℹ️  No files to organize in assets/images/figma/")
        return
    
    print("📁 Organizing Figma assets...")
    
    organized_count = 0
    
    for file_path in files_to_organize:
        filename = file_path.name.lower()
        
        moved = False
        for pattern, subfolder in patterns.items():
            if pattern in filename:
                dest_path = figma_folder / subfolder / file_path.name
                file_path.rename(dest_path)
                print(f"   Moved {file_path.name} → {subfolder}")
                organized_count += 1
                moved = True
                break
        
        if not moved:
            # Move to ui-elements as default
            dest_path = figma_folder / 'ui-elements' / file_path.name
            file_path.rename(dest_path)
            print(f"   Moved {file_path.name} → ui-elements/ (default)")
            organized_count += 1
    
    print(f"\n✅ Organized {organized_count} files")

def show_status():
    """Show current Figma integration status"""
    
    print("📊 Figma Integration Status")
    print("=" * 40)
    
    # Check if setup was run
    css_file = Path('assets/css/figma/homepage-design.css')
    guide_file = Path('assets/figma-integration-guide.md')
    
    if not css_file.exists():
        print("❌ Setup not complete")
        print("   Run: python config/figma-quick-setup.py")
        return
    
    print("✅ Setup complete")
    
    # Check for assets
    figma_folder = Path('assets/images/figma')
    asset_count = 0
    
    for subfolder in ['backgrounds', 'buttons', 'icons', 'sprites', 'ui-elements']:
        folder_path = figma_folder / subfolder
        if folder_path.exists():
            files = [f for f in folder_path.iterdir() if f.is_file() and f.name != '.gitkeep']
            asset_count += len(files)
            if files:
                print(f"📁 {subfolder}: {len(files)} files")
    
    if asset_count == 0:
        print("📁 Assets: No assets uploaded yet")
    else:
        print(f"📁 Total assets: {asset_count} files")
    
    # Check CSS customization
    with open(css_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'Replace with your Figma colors' in content:
        print("🎨 CSS: Using template (not customized)")
    else:
        print("🎨 CSS: Customized with Figma styles")
    
    # Asset validation
    print("\n🔍 Asset Validation:")
    validate_assets()

def main():
    """Main function with command line interface"""
    
    import sys
    
    if len(sys.argv) > 1:
        command = sys.argv[1].lower()
        
        if command == "validate":
            validate_assets()
        elif command == "organize":
            organize_assets()
        elif command == "status":
            show_status()
        else:
            print("Unknown command. Available commands:")
            print("  validate  - Check if all CSS assets exist")
            print("  organize  - Move assets to proper subfolders")
            print("  status    - Show integration status")
    else:
        print("🎨 Figma Asset Helper")
        print("=" * 30)
        print("Commands:")
        print("  python config/figma-helper.py validate")
        print("  python config/figma-helper.py organize") 
        print("  python config/figma-helper.py status")

if __name__ == "__main__":
    main()