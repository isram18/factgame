class FactOrMythGame {
    constructor() {
        this.currentRound = 1;
        this.totalRounds = 10;
        this.score = 0;
        this.highScore = this.getHighScore();
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.gameActive = false;
        
        this.initializeElements();
        this.loadQuestions();
        this.updateDisplay();
    }

    initializeElements() {
        this.elements = {
            currentScore: document.getElementById('currentScore'),
            highScore: document.getElementById('highScore'),
            roundNumber: document.getElementById('roundNumber'),
            questionText: document.getElementById('questionText'),
            factBtn: document.getElementById('factBtn'),
            mythBtn: document.getElementById('mythBtn'),
            feedback: document.getElementById('feedback'),
            gameOver: document.getElementById('gameOver'),
            finalScore: document.getElementById('finalScore'),
            scoreMessage: document.getElementById('scoreMessage'),
            restartBtn: document.getElementById('restartBtn'),
            loading: document.getElementById('loading')
        };

        this.elements.factBtn.addEventListener('click', () => this.answerQuestion(true));
        this.elements.mythBtn.addEventListener('click', () => this.answerQuestion(false));
        this.elements.restartBtn.addEventListener('click', () => this.restartGame());
    }

    loadQuestions() {
        this.questions = [
            { text: "Only women can get breast cancer.", answer: false, explanation: "Men get it too , but it is rare ( about 1% of male cancer cases))." },
            { text: "Breast cancer is the most common cancer in women worldwide.", answer: true, explanation: "Breast cancer is indeed the most frequently diagnosed cancer among women globally, affecting millions each year." },
            { text: "Young women can get breast cancer too", answer: true, explanation: "One of the causes are chronic stress, lack of sleep and obesity , which can all happen to a young lady." },
            { text: "Breast cancer only affects older women.", answer: false, explanation: "While risk increases with age, breast cancer can occur in younger women too. Early detection is crucial for all age groups." },
            { text: "Using deodorant or shaving the underarms doesnt cause it .", answer: false, explanation: "No proven link exists between antiperspirants, shaving or aluminum and breast cancer." },
            { text: "The main cause of delayed diagnosis of bcancer in algeria is the fear of society.", answer: true, explanation: "Cultural barriers and modesty made women feel like its a shame to check or even talk about breast cancer , which made it represent 30% of cancer cases among women of the country." },
            { text: "Having no family history of breast cancer means that theres no risk of having it .", answer: false, explanation: "Most cases are caused by lifestyle and age , only about 5-10% are hereditary and about 85% have no family history." },
            { text: "Breast cancer is always painful.", answer: false, explanation: "Early-stage breast cancer is often painless. Pain is not a reliable indicator of breast cancer presence or absence." },
            { text: "Breastfeeding reduces the risk of breast cancer.", answer: true, explanation: "Breastfeeding for 12 months or longer can reduce breast cancer risk, especially for hormone-receptor-negative breast cancers." },
            { text: "All breast lumps are cancerous.", answer: false, explanation: "Most breast lumps are benign (non-cancerous). However, any new lump should be evaluated by a healthcare provider." },
            { text: "Exercise can help reduce breast cancer risk.", answer: true, explanation: "Regular physical activity can reduce breast cancer risk by 10-20%, especially in postmenopausal women." },
            { text: "Breast cancer is contagious.", answer: false, explanation: "Breast cancer is not contagious and cannot be spread from person to person through contact." },
            { text: "Early detection improves survival rates significantly.", answer: true, explanation: "When breast cancer is detected early (localized stage), the 5-year survival rate is over 99%." },
            { text: "Only women with large breasts get breast cancer.", answer: false, explanation: "Breast size does not affect cancer risk. Women of all breast sizes can develop breast cancer." },
            { text: "Breastfeeding can be a cause.", answer: false, explanation: "It lowers estrogen (that stimulates the growth of cancer cells) and helps remove damaged cells since the breast sheds tissue cells during lactation." },
            { text: "Wearing a bra especially a tight one can cause it.", answer: false, explanation: "There is no scientific evidence linking bras,tight clothing or underwear to breast cancer." },
            { text: "Menopause increases breast cancer risk.", answer: true, explanation: "The risk of breast cancer increases with age, and most breast cancers occur in women over 50 (postmenopausal)." },
            { text: "Stress causes breast cancer.", answer: false, explanation: "While stress affects overall health, there's no direct evidence that stress alone causes breast cancer." },
            { text: "Breast cancer is the most common cancer among women in the world.", answer: true, explanation: "Early detection saves about 90% of cases , and thats why we should spread awareness and encourage more women to early-check." }
        ];

        // Shuffle questions and select 10 random ones
        this.shuffleArray(this.questions);
        this.questions = this.questions.slice(0, this.totalRounds);
        this.hideLoading();
        this.startGame();
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    startGame() {
        this.gameActive = true;
        this.currentRound = 1;
        this.score = 0;
        this.currentQuestionIndex = 0;
        this.updateDisplay();
        this.showQuestion();
        this.elements.gameOver.style.display = 'none';
    }

    showQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        this.elements.questionText.textContent = question.text;
        this.elements.feedback.textContent = '';
        this.elements.feedback.className = 'feedback';
        this.enableButtons();
    }

    answerQuestion(userAnswer) {
        if (!this.gameActive) return;

        const question = this.questions[this.currentQuestionIndex];
        const isCorrect = userAnswer === question.answer;
        
        this.disableButtons();
        
        if (isCorrect) {
            this.score += 10;
            this.showFeedback('correct', '✅ Correct!', question.explanation);
        } else {
            this.showFeedback('incorrect', '❌ Incorrect!', question.explanation);
        }

        this.updateDisplay();
        
        setTimeout(() => {
            this.nextRound();
        }, 3000);
    }

    showFeedback(type, message, explanation) {
        this.elements.feedback.className = `feedback ${type}`;
        this.elements.feedback.innerHTML = `
            <div>
                <div style="font-size: 1.3rem; margin-bottom: 10px;">${message}</div>
                <div style="font-size: 0.9rem; font-weight: normal;">${explanation}</div>
            </div>
        `;
    }

    nextRound() {
        this.currentRound++;
        this.currentQuestionIndex++;
        
        if (this.currentRound > this.totalRounds) {
            this.endGame();
        } else {
            this.updateDisplay();
            this.showQuestion();
        }
    }

    endGame() {
        this.gameActive = false;
        this.updateHighScore();
        this.showGameOver();
    }

    showGameOver() {
        this.elements.finalScore.textContent = this.score;
        
        let message = '';
        if (this.score >= 90) {
            message = '🏆 Excellent! You have excellent knowledge about breast cancer awareness!';
        } else if (this.score >= 70) {
            message = '🎉 Great job! You understand many important breast cancer facts!';
        } else if (this.score >= 50) {
            message = '👍 Good effort! Keep learning about breast health and early detection!';
        } else {
            message = '📚 Keep learning! Knowledge about breast cancer can save lives!';
        }
        
        this.elements.scoreMessage.textContent = message;
        this.elements.gameOver.style.display = 'block';
    }

    updateDisplay() {
        this.elements.currentScore.textContent = this.score;
        this.elements.highScore.textContent = this.highScore;
        this.elements.roundNumber.textContent = `Round ${this.currentRound}`;
    }

    enableButtons() {
        this.elements.factBtn.disabled = false;
        this.elements.mythBtn.disabled = false;
    }

    disableButtons() {
        this.elements.factBtn.disabled = true;
        this.elements.mythBtn.disabled = true;
    }

    getHighScore() {
        return parseInt(localStorage.getItem('factOrMythHighScore')) || 0;
    }

    updateHighScore() {
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('factOrMythHighScore', this.highScore.toString());
        }
    }

    hideLoading() {
        this.elements.loading.style.display = 'none';
    }

    restartGame() {
        this.loadQuestions();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new FactOrMythGame();
});
