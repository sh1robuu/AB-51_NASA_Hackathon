# 🎨 Figma Integration - Quick Reference

## What We Just Created

Your Earth Saver project is now ready for Figma design integration! Here's what was set up:

### 📁 New Folders
```
assets/
├── css/figma/
│   └── homepage-design.css     # 👈 Paste your Figma CSS here
└── images/figma/
    ├── backgrounds/            # Background images from Figma
    ├── buttons/               # Button sprites
    ├── icons/                 # Icons (32x32 recommended)
    ├── sprites/              # Game-related sprites
    └── ui-elements/          # UI components
```

### 🛠️ New Scripts
- `config/figma-quick-setup.py` - Setup script (already run)
- `config/figma-helper.py` - Asset management utilities
- `setup-figma.bat` - Windows quick setup batch file

### 📋 New Documentation
- `assets/figma-integration-guide.md` - Detailed integration guide

## 🚀 Quick Commands

### Check Integration Status
```bash
python config/figma-helper.py status
```

### Validate Assets (after importing from Figma)
```bash
python config/figma-helper.py validate
```

### Organize Assets (move files to proper subfolders)
```bash
python config/figma-helper.py organize
```

### Start Development Server
```bash
python config/server.py
```

## 🎯 Your Next Steps

1. **Design in Figma**: Create your homepage design
2. **Export Assets**: 
   - Export images as PNG (2x resolution) to `assets/images/figma/`
   - Save icons to the `icons/` subfolder
   - Save backgrounds to the `backgrounds/` subfolder
3. **Export CSS**: 
   - Use Figma Dev Mode or plugins to get CSS
   - Copy CSS rules into `assets/css/figma/homepage-design.css`
4. **Link CSS**: Add this line to your `src/homepage.html`:
   ```html
   <link rel="stylesheet" href="../assets/css/figma/homepage-design.css">
   ```
5. **Test**: Run `python config/server.py` and check your design

## 💡 Pro Tips

- **Maintain Pixel Art Style**: The template preserves your pixel art aesthetic
- **Use 2x Assets**: Export at 2x resolution for crisp display
- **Validate Often**: Use `python config/figma-helper.py validate` to check assets
- **Organize Assets**: Use `python config/figma-helper.py organize` after exports

## 🆘 Quick Troubleshooting

**Images not loading?**
- Check file paths in CSS match your exported files
- Run `python config/figma-helper.py validate` to find missing assets

**CSS not applying?**
- Make sure you linked the CSS file in your HTML
- Check browser dev tools console for errors

**Want to start over?**
- Delete `assets/css/figma/` and `assets/images/figma/` folders
- Run `python config/figma-quick-setup.py` again

---

**🎮 Ready to enhance your Earth Saver game with awesome Figma designs! 🌍**