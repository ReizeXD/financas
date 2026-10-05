// --- MECÂNICA DO QUIZ ---

function startQuiz(levelId) {
    const nav = document.getElementById('bottom-nav');
    if (nav) nav.style.display = 'none';
    const headerRow = document.querySelector('.header-row');
    if (headerRow) headerRow.style.display = 'none';

    activeLevel = levels.find(l => l.id === levelId);
    quizState = {
        questions: [...activeLevel.questions].sort(() => Math.random() - 0.5),
        currentIndex: 0,
        correct: 0,
        streak: 0,
        mistakes: []
    };
    renderQuizQuestion();
}

function renderQuizQuestion() {
    const q = quizState.questions[quizState.currentIndex];
    const progress = ((quizState.currentIndex) / quizState.questions.length) * 100;
    
    let html = `
        <div class="fade-in" style="display:flex; flex-direction:column; height:100%;">
            <!-- Header Progresso -->
            <div class="quiz-header mb-8">
                <a href="trilha.html" class="close-btn" style="text-decoration:none;">&times;</a>
                <div class="quiz-progress-bar">
                    <div class="quiz-progress-fill" style="width: ${progress}%"></div>
                </div>
            </div>
            
            <div class="quiz-question-card mb-8">
                <h3 class="quiz-question-text">${q.p}</h3>
            </div>
            
            <div class="quiz-options">
    `;

    q.alt.forEach((alt, idx) => {
        html += `
            <button onclick="checkAnswer(${idx})" class="quiz-option btn-press flex items-center">
                <span class="theory-number" style="margin-right:16px;">${idx+1}</span>
                ${alt}
            </button>
        `;
    });

    html += `</div></div>`;
    contentDiv.innerHTML = html;
}

function checkAnswer(selectedIndex) {
    const q = quizState.questions[quizState.currentIndex];
    const isCorrect = selectedIndex === q.resp;
    
    if(isCorrect) {
        if (typeof AudioSFX !== 'undefined') AudioSFX.playSuccess();
        quizState.correct++;
        quizState.streak++;
        score += 100 + (quizState.streak >= 3 ? 50 : 0);
        localStorage.setItem('ef_score', score);
    } else {
        if (typeof AudioSFX !== 'undefined') AudioSFX.playError();
        quizState.streak = 0;
        quizState.mistakes.push(q.exp);
    }

    let html = `
        <div class="fade-in" style="display:flex; flex-direction:column; height:100%; justify-content:space-between;">
            <div>
                <div class="quiz-question-card mb-6">
                    <h3 class="quiz-question-text">${q.p}</h3>
                </div>
                <div class="quiz-options">
                    ${q.alt.map((alt, idx) => {
                        let stateClass = '';
                        let icon = idx + 1;
                        if (idx === q.resp) {
                            stateClass = 'correct';
                            icon = '✓';
                        } else if (idx === selectedIndex) {
                            stateClass = 'wrong';
                            icon = '✗';
                        } else {
                            stateClass = 'opacity-50';
                        }
                        
                        return `
                        <div class="quiz-option ${stateClass} flex items-center">
                            <span class="theory-number" style="margin-right:16px; background:transparent; border:1px solid currentColor;">${icon}</span>
                            ${alt}
                        </div>`;
                    }).join('')}
                </div>
            </div>

            <!-- Box de Feedback -->
            <div class="mt-8 p-6" style="border-radius:24px; background-color:${isCorrect ? '#dcfce7' : '#fee2e2'};">
                <div class="flex justify-between items-center mb-2">
                    <h2 class="title-large" style="color:${isCorrect ? '#16a34a' : '#dc2626'};">
                        ${isCorrect ? 'Exato!' : 'Quase lá!'}
                    </h2>
                    <span style="font-size:32px;">${isCorrect ? '🎉' : '💡'}</span>
                </div>
                
                ${quizState.streak >= 3 && isCorrect ? `<p class="mb-2 text-orange" style="font-weight:bold;">🔥 Sequência! +50 pontos</p>` : ''}
                
                <div style="background:white; padding:16px; border-radius:16px; margin-top:12px; font-weight:500; color:#4b5563;">
                    ${q.exp}
                </div>

                <button onclick="nextQuestion()" class="btn ${isCorrect ? 'btn-green' : 'btn-green'} btn-press mt-4" style="background-color:${isCorrect ? '#22c55e' : '#ef4444'}; box-shadow: 0 5px 0 ${isCorrect ? '#16a34a' : '#b91c1c'};">
                    Continuar
                </button>
            </div>
        </div>
    `;
    contentDiv.innerHTML = html;
}

function nextQuestion() {
    quizState.currentIndex++;
    if (quizState.currentIndex < quizState.questions.length) {
        renderQuizQuestion();
    } else {
        renderQuizResult();
    }
}

function renderQuizResult() {
    const total = quizState.questions.length;
    const accuracy = Math.round((quizState.correct / total) * 100);
    
    if (typeof AudioSFX !== 'undefined') AudioSFX.playVictory();
    if (accuracy >= 70 && typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            zIndex: 9999
        });
    }

    let html = `
        <div class="fade-in text-center flex flex-col justify-center" style="height:100%;">
            <div style="font-size:80px; margin-bottom:16px;">🏆</div>
            <h2 class="title-xl mb-2">Nível Concluído!</h2>
            
            <div class="flex justify-center gap-4 my-8">
                <div style="background:white; padding:20px; border-radius:24px; width:140px; border:1px solid #e5e7eb;">
                    <p class="text-gray-light" style="font-weight:bold; font-size:12px;">ACERTOS</p>
                    <p style="font-size:36px; font-weight:900; color:#22c55e;">${quizState.correct}<span style="font-size:20px; color:#d1d5db;">/${total}</span></p>
                </div>
                <div style="background:white; padding:20px; border-radius:24px; width:140px; border:1px solid #e5e7eb;">
                    <p class="text-gray-light" style="font-weight:bold; font-size:12px;">PRECISÃO</p>
                    <p style="font-size:36px; font-weight:900; color:#3b82f6;">${accuracy}<span style="font-size:20px; color:#d1d5db;">%</span></p>
                </div>
            </div>

            ${quizState.mistakes.length > 0 ? `
                <div style="background:#fff7ed; padding:20px; border-radius:24px; margin-bottom:32px; border:1px solid #ffedd5; text-align:left;">
                    <h4 style="font-weight:900; color:#9a3412; margin-bottom:12px;">Para revisar:</h4>
                    <ul style="color:#c2410c; font-weight:500; font-size:14px;">
                        ${Array.from(new Set(quizState.mistakes)).slice(0, 2).map(m => `<li style="margin-bottom:8px;">⚠️ ${m}</li>`).join('')}
                    </ul>
                </div>
            ` : `
                <div style="background:#f0fdf4; padding:20px; border-radius:24px; margin-bottom:32px; border:1px solid #dcfce7;">
                    <h4 style="font-weight:900; color:#166534; font-size:20px;">Perfeito! 🌟</h4>
                    <p style="color:#15803d; font-weight:500; margin-top:4px;">Você dominou tudo.</p>
                </div>
            `}

            <a href="trilha.html" class="btn btn-blue-light btn-press mt-auto" style="background-color:#3b82f6; color:white; box-shadow: 0 5px 0 #2563eb;">
                Voltar para a Trilha
            </a>
        </div>
    `;
    contentDiv.innerHTML = html;
}
