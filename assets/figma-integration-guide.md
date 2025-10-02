# Figma to Earth Saver Integration Guide

## Quick Start Checklist

### 1. Export Assets from Figma
- [ ] Images: Export as PNG (2x) to `assets/images/figma/`
- [ ] Icons: Export as SVG to `assets/images/figma/icons/`
- [ ] Backgrounds: Export as PNG to `assets/images/figma/backgrounds/`
- [ ] UI Elements: Export as PNG to `assets/images/figma/ui-elements/`

### 2. Export CSS from Figma
- [ ] Use Figma Dev Mode (Inspect Panel)
- [ ] Or use plugins: Anima, Figma to CSS, etc.
- [ ] Copy CSS rules to `assets/css/figma/homepage-design.css`

### 3. Integration Steps
- [ ] Paste Figma CSS into the template file
- [ ] Replace colors with our pixel art variables
- [ ] Add pixel art borders and shadows
- [ ] Remove border-radius (keep sharp edges)
- [ ] Update image paths to figma folder

## File Structure Created

```
assets/
├── css/figma/
│   └── homepage-design.css     # Your Figma CSS goes here
└── images/figma/
    ├── backgrounds/            # Background images
    ├── buttons/               # Button sprites
    ├── icons/                 # Icon assets
    ├── sprites/              # Game sprites
    └── ui-elements/          # UI components
```

## Integration Methods

### Method 1: Replace Homepage (Full Figma Design)
```html
<!-- In src/homepage.html -->
<link rel="stylesheet" href="../assets/css/pixel-styles.css">
<link rel="stylesheet" href="../assets/css/figma/homepage-design.css">
```

### Method 2: Hybrid Approach (Recommended)
Keep pixel art framework + add Figma enhancements

### Method 3: A/B Testing
Create alternative homepage version:
```bash
cp src/homepage.html src/homepage-figma.html
```

## Color Conversion Guide

Replace Figma colors with our pixel variables:

| Figma Color | Pixel Variable |
|-------------|----------------|
| `#0066FF` | `var(--pixel-earth-blue)` |
| `#00AA00` | `var(--pixel-earth-green)` |
| `#FF2222` | `var(--pixel-critical-red)` |
| `#FFAA00` | `var(--pixel-warning-yellow)` |
| `#FFFFFF` | `var(--pixel-white)` |
| `#000000` | `var(--pixel-black)` |

## Layout Adaptation Rules

1. **Maintain Structure**: Keep Figma layout hierarchy
2. **Add Pixel Borders**: `border: 4px solid var(--pixel-black)`
3. **Chunky Shadows**: `box-shadow: 6px 6px 0 var(--pixel-black)`
4. **No Rounded Corners**: `border-radius: 0`
5. **Pixelate Images**: `image-rendering: pixelated`

## Testing Your Integration

1. **Start Server**: `python config/server.py`
2. **Navigate**: Go to homepage after login
3. **Debug**: Check browser console for asset loading
4. **Responsive**: Test on mobile/tablet views

## Pro Tips

- Export Figma assets at 2x resolution for crisp display
- Use PNG for complex graphics, SVG for simple icons
- Maintain our pixel art aesthetic while adding your design flair
- Test on different screen sizes to ensure responsive design

## Troubleshooting

**Images not loading?**
- Check file paths in CSS
- Ensure assets are in correct folders
- Verify image file extensions match CSS

**CSS not applying?**
- Check CSS file is linked in HTML
- Verify CSS syntax is valid
- Use browser dev tools to debug

**Layout broken on mobile?**
- Add responsive rules to Figma CSS
- Test with browser dev tools device emulation

---

**Ready to integrate your Figma design? Follow the checklist above!**
