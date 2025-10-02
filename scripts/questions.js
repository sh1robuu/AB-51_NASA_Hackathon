// Environmental Questions Database for Earth Saver Game

const questions = [
    {
        question: "What is the main cause of global warming?",
        answers: [
            "Greenhouse gas emissions from human activities",
            "Natural solar radiation changes",
            "Volcanic eruptions",
            "Ocean currents shifting"
        ],
        correct: 0,
        explanation: "Human activities, particularly burning fossil fuels, release greenhouse gases like CO2 that trap heat in the atmosphere, causing global temperatures to rise.",
        difficulty: "easy",
        category: "climate"
    },
    {
        question: "Which of these actions has the biggest impact on reducing your carbon footprint?",
        answers: [
            "Using reusable shopping bags",
            "Taking shorter showers",
            "Reducing meat consumption",
            "Switching to LED light bulbs"
        ],
        correct: 2,
        explanation: "Animal agriculture is responsible for about 14.5% of global greenhouse gas emissions. Reducing meat consumption, especially beef, significantly lowers your carbon footprint.",
        difficulty: "medium",
        category: "lifestyle"
    },
    {
        question: "What percentage of the world's electricity comes from renewable sources?",
        answers: [
            "About 10%",
            "About 30%",
            "About 50%",
            "About 70%"
        ],
        correct: 1,
        explanation: "As of 2023, approximately 30% of global electricity comes from renewable sources like solar, wind, hydro, and geothermal energy. This number is steadily increasing!",
        difficulty: "medium",
        category: "energy"
    },
    {
        question: "How long does it take for a plastic bottle to decompose in nature?",
        answers: [
            "10-20 years",
            "50-100 years",
            "200-300 years",
            "450-500 years"
        ],
        correct: 3,
        explanation: "Plastic bottles can take 450-500 years to fully decompose, which is why recycling and using reusable bottles is so important for our environment.",
        difficulty: "easy",
        category: "waste"
    },
    {
        question: "Which renewable energy source has grown the fastest in recent years?",
        answers: [
            "Hydroelectric power",
            "Wind power",
            "Solar power",
            "Geothermal power"
        ],
        correct: 2,
        explanation: "Solar power has experienced the fastest growth, with costs dropping dramatically and efficiency improving. Solar capacity has increased by over 20% annually in recent years.",
        difficulty: "medium",
        category: "energy"
    },
    {
        question: "What is the leading cause of deforestation worldwide?",
        answers: [
            "Urban development",
            "Logging for paper",
            "Agriculture and livestock",
            "Natural disasters"
        ],
        correct: 2,
        explanation: "Agriculture and livestock farming account for about 80% of deforestation globally, as forests are cleared to create farmland and grazing areas.",
        difficulty: "medium",
        category: "forests"
    },
    {
        question: "How much of the Earth's water is fresh water available for human use?",
        answers: [
            "About 30%",
            "About 10%",
            "About 3%",
            "Less than 1%"
        ],
        correct: 3,
        explanation: "Less than 1% of Earth's water is fresh water accessible to humans. Most water is in oceans (97%) and ice caps (2%), making water conservation crucial.",
        difficulty: "hard",
        category: "water"
    },
    {
        question: "Which transportation method produces the least CO2 emissions per passenger?",
        answers: [
            "Electric car (1 person)",
            "Bus (half full)",
            "Train",
            "Bicycle"
        ],
        correct: 3,
        explanation: "Bicycles produce zero direct emissions and have the lowest carbon footprint when considering manufacturing. They're the most environmentally friendly transportation option!",
        difficulty: "easy",
        category: "transport"
    },
    {
        question: "What happens to global sea levels if all ice sheets melted?",
        answers: [
            "Rise by 2-3 meters",
            "Rise by 10-15 meters",
            "Rise by 50-70 meters",
            "Stay the same"
        ],
        correct: 2,
        explanation: "If all ice sheets melted, sea levels would rise by approximately 70 meters (230 feet), flooding most coastal cities and dramatically changing Earth's geography.",
        difficulty: "hard",
        category: "climate"
    },
    {
        question: "Which everyday action saves the most water?",
        answers: [
            "Turning off tap while brushing teeth",
            "Taking shorter showers",
            "Fixing a leaky toilet",
            "Only running full dishwasher loads"
        ],
        correct: 2,
        explanation: "A leaky toilet can waste up to 200 gallons per day! Fixing leaks is often the single most effective way to reduce water waste in homes.",
        difficulty: "medium",
        category: "water"
    },
    {
        question: "What percentage of global greenhouse gas emissions come from buildings?",
        answers: [
            "About 15%",
            "About 25%",
            "About 40%",
            "About 55%"
        ],
        correct: 2,
        explanation: "Buildings account for about 40% of global greenhouse gas emissions through energy use for heating, cooling, lighting, and construction materials.",
        difficulty: "hard",
        category: "energy"
    },
    {
        question: "Which of these materials can be recycled indefinitely without quality loss?",
        answers: [
            "Paper",
            "Plastic",
            "Glass",
            "None of these"
        ],
        correct: 2,
        explanation: "Glass can be recycled indefinitely without losing quality or purity. It's 100% recyclable and can be melted down and reformed countless times.",
        difficulty: "medium",
        category: "waste"
    }
];

// Utility functions for question management
const questionUtils = {
    // Get random questions for a game session
    getRandomQuestions: function(count = 10) {
        const shuffled = [...questions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    },
    
    // Get questions by difficulty
    getQuestionsByDifficulty: function(difficulty) {
        return questions.filter(q => q.difficulty === difficulty);
    },
    
    // Get questions by category
    getQuestionsByCategory: function(category) {
        return questions.filter(q => q.category === category);
    },
    
    // Get total number of questions
    getTotalQuestions: function() {
        return questions.length;
    }
};

// Export for use in main game script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { questions, questionUtils };
}