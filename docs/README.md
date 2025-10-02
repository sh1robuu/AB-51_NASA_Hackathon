# 🌍 Earth Saver - Pixel Art Environmental Quiz Game

A retro pixel art web-based quiz game where players answer environmental questions to save our planet! Complete with user accounts, achievements, leaderboards, and beautiful 8-bit style graphics. Test your knowledge about climate change, conservation, and sustainability while watching Earth's health respond to your answers!

## 🎮 Game Features

### 🎨 **Pixel Art Style**
- **Retro 8-bit Graphics**: Beautiful pixel art Earth with animated continents
- **Nostalgic Design**: Classic arcade-style interface with chunky borders and shadows
- **Pixel Animations**: Smooth 8-bit style animations and transitions

### 🔐 **User System**
- **User Registration & Login**: Secure account creation with local storage
- **Persistent Progress**: Your stats and achievements are saved between sessions
- **User Profiles**: Track your environmental knowledge growth
- **Achievement System**: Unlock badges for various milestones

### 🎯 **Game Mechanics**
- **Interactive Earth Visual**: Watch Earth's health change based on your performance
- **Educational Questions**: 12+ environmental questions covering climate, energy, waste, and conservation
- **Scoring System**: Earn points with streak bonuses for consecutive correct answers
- **Earth Health Meter**: Visual representation of planetary health
- **Leaderboards**: Compete with other eco-warriors for the top score

### 🌟 **Additional Features**
- **Homepage Dashboard**: View your stats, recent games, and achievements
- **Landing Page**: Beautiful introduction with game features
- **Navigation System**: Seamless movement between pages
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Accessibility**: Keyboard navigation and screen reader support

## 🚀 How to Play

1. **Visit the Game**: Open `index.html` in your web browser
2. **Create Account**: Sign up with a username, email, and password
3. **Explore Dashboard**: View your stats and achievements on the homepage
4. **Start Playing**: Click "Start New Game" to begin saving Earth
5. **Answer Questions**: Click on your chosen answer or use number keys (1-4)
6. **Learn**: Read the educational explanations after each answer
7. **Save Earth**: Maintain Earth's health by answering correctly
8. **Track Progress**: See your scores saved to your profile and compete on leaderboards

## 🎯 Scoring

- **Correct Answer**: 100 points
- **Streak Bonus**: 
  - 3+ streak: +25 points
  - 5+ streak: +50 points
- **Earth Health**: 
  - Correct answers: +2% health
  - Wrong answers: -10% health

## 🌟 Game Outcomes

- **Earth Saved (80%+ health)**: Congratulations, eco-warrior!
- **Earth Recovering (50-80% health)**: Good effort, keep learning!
- **Earth Needs Help (<50% health)**: Try again to save our planet!

## 🛠 Technical Details

### Files Structure
```
earth-saver-game/
├── index.html              # Entry point with splash screen
├── landing.html            # Landing page for new visitors
├── homepage.html           # User dashboard after login
├── game.html               # Main quiz game interface
├── pixel-styles.css        # Pixel art CSS framework
├── game-styles.css         # Game-specific pixel art styles
├── auth.js                 # Authentication & user management
├── script.js               # Game logic and mechanics
├── questions.js            # Environmental questions database
├── README.md               # Project documentation
├── .vscode/
│   └── tasks.json          # VS Code tasks for development
└── .github/
    └── copilot-instructions.md
```

### Technologies Used
- **HTML5**: Semantic structure and accessibility
- **CSS3**: Pixel art styling with animations and responsive design
- **Vanilla JavaScript**: ES6+ features for game logic and user management
- **Local Storage**: Persistent user data and progress tracking
- **CSS Grid & Flexbox**: Responsive layout system
- **Pixel Art Design**: 8-bit style graphics and animations

### Browser Support
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## 🎨 Design Features

- **Pixel Art Theme**: Retro 8-bit style graphics throughout the application
- **Space Background**: Pixelated starry background with grid patterns
- **Earth Visualization**: Pixel art Earth with animated continents and health states
- **Chunky UI Elements**: Thick borders, bold shadows, and blocky buttons
- **Pixel Animations**: Step-based animations that maintain the retro feel
- **Color Coding**: Bright pixel colors - green (healthy), yellow (warning), red (critical)
- **Typography**: Monospace fonts that complement the pixel aesthetic

## ♿ Accessibility

- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- High contrast mode support
- Reduced motion support for users with vestibular disorders
- Screen reader compatible

## 📱 Responsive Design

The game adapts to different screen sizes:
- **Desktop**: Full layout with side-by-side elements
- **Tablet**: Stacked layout with adjusted sizing
- **Mobile**: Single-column layout optimized for touch

## 🔧 Development

### Running Locally
1. Clone or download the project files
2. Open `index.html` in a web browser
3. No build process or dependencies required!

### Customization
- **Add Questions**: Edit `questions.js` to add more questions
- **Modify Styling**: Update `styles.css` for visual changes
- **Game Logic**: Adjust scoring and mechanics in `script.js`

### Question Format
```javascript
{
    question: "Your question text here?",
    answers: ["Option A", "Option B", "Option C", "Option D"],
    correct: 0, // Index of correct answer (0-3)
    explanation: "Educational explanation about the topic",
    difficulty: "easy|medium|hard",
    category: "climate|energy|waste|transport|etc"
}
```

## 🌱 Educational Impact

This game aims to:
- Increase environmental awareness
- Teach practical conservation tips
- Inspire eco-friendly lifestyle changes
- Make learning about climate change engaging
- Promote environmental stewardship

## 🤝 Contributing

Ideas for improvements:
- [ ] Add more question categories
- [ ] Implement difficulty levels
- [ ] Add sound effects
- [ ] Create leaderboard system
- [ ] Add social sharing features
- [ ] Implement progress tracking
- [ ] Add multilingual support

## 📄 License

This project is open source and available under the MIT License.

## 🌍 About

Created to promote environmental awareness and education through interactive gaming. Every correct answer helps save our digital Earth - let's work together to save the real one too!

---

**Ready to save the Earth? Open `index.html` and start playing! 🚀🌍**