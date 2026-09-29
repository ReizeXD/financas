// --- MECÂNICA DO QUIZ ---
function startQuiz(levelId) {
    currentTab = 'quiz';
    updateNavUI();
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
    currentTab = 'quiz';
    updateNavUI();
    
    const q = quizState.questions[quizState.currentIndex];
    const progress = ((quizState.currentIndex) / quizState.questions.length) * 100;
    
    let html = `
        <div class="flex flex-col h-full fade-in relative">
            <!-- Header Progresso -->
            <div class="flex items-center space-x-4 mb-8 pt-2">
                <button onclick="navigate('trilha')" class="text-gray-400 hover:text-gray-700 text-3xl font-bold leading-none">&times;</button>
                <div class="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                    <div class="bg-green-500 h-full rounded-full transition-all duration-500 ease-out" style="width: ${progress}%"></div>
                </div>
            </div>
            
            <h3 class="text-2xl font-black text-gray-800 mb-8 leading-snug">${q.p}</h3>
            
            <div class="space-y-3 mt-auto mb-4">
    `;

    q.alt.forEach((alt, idx) => {
        html += `
            <button onclick="checkAnswer(${idx})" class="w-full text-left p-5 rounded-2xl border-2 border-gray-200 hover:bg-blue-50 hover:border-blue-400 font-bold text-gray-700 transition shadow-sm btn-press flex items-center">
                <span class="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center mr-4 text-gray-500 font-bold">${idx+1}</span>
                ${alt}
            </button>
        `;
    });

    html += `</div></div>`;
    contentDiv.innerHTML = html;
}

function checkAnswer(selectedIndex) {
    currentTab = 'feedback';
    const q = quizState.questions[quizState.currentIndex];
    const isCorrect = selectedIndex === q.resp;
    
    if(isCorrect) {
        quizState.correct++;
        quizState.streak++;
        score += 100 + (quizState.streak >= 3 ? 50 : 0);
        localStorage.setItem('ef_score', score);
    } else {
        quizState.streak = 0;
        quizState.mistakes.push(q.exp);
    }

    let html = `
        <div class="flex flex-col h-full justify-between pb-4 fade-in">
            <div class="flex-1">
                <h3 class="text-2xl font-black text-gray-800 mb-8 pt-10">${q.p}</h3>
                <div class="space-y-3">
                    ${q.alt.map((alt, idx) => `
                        <div class="w-full text-left p-5 rounded-2xl border-2 font-bold transition flex items-center
                            ${idx === q.resp ? 'bg-green-50 border-green-500 text-green-700 shadow-[0_3px_0_rgb(34,197,94)]' : 
                              (idx === selectedIndex ? 'bg-red-50 border-red-400 text-red-600' : 'border-gray-200 text-gray-400 opacity-50')}">
                            <span class="w-8 h-8 rounded-lg flex items-center justify-center mr-4 
                                ${idx === q.resp ? 'bg-green-200 text-green-800' : (idx === selectedIndex ? 'bg-red-200 text-red-800' : 'bg-gray-100')}">
                                ${idx === q.resp ? '✓' : (idx === selectedIndex ? '✗' : idx+1)}
                            </span>
                            ${alt}
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Box de Feedback fixo na parte inferior -->
            <div class="w-full bg-${isCorrect ? 'green' : 'red'}-100 rounded-3xl p-6 mt-8 slide-up">
                <div class="flex justify-between items-center mb-2">
                    <h2 class="text-2xl font-black text-${isCorrect ? 'green' : 'red'}-700 flex items-center">
                        ${isCorrect ? 'Exato!' : 'Quase lá!'}
                    </h2>
                    ${isCorrect ? `<span class="text-3xl filter drop-shadow-md">🎉</span>` : `<span class="text-3xl filter drop-shadow-md">💡</span>`}
                </div>
                
                ${quizState.streak >= 3 && isCorrect ? `<p class="text-orange-600 font-black mb-2 text-sm uppercase tracking-wide flex items-center gap-1"><span class="text-lg">🔥</span> Sequência! +50 pontos</p>` : ''}
                
                <div class="bg-white p-4 rounded-2xl text-gray-700 text-sm mt-3 shadow-sm font-medium leading-relaxed border border-${isCorrect ? 'green' : 'red'}-200">
                    ${q.exp}
                </div>

                <button onclick="nextQuestion()" class="w-full mt-5 py-4 bg-${isCorrect ? 'green' : 'red'}-500 text-white font-black text-lg rounded-2xl hover:bg-${isCorrect ? 'green' : 'red'}-600 transition shadow-[0_5px_0_var(--tw-shadow-color)] ${isCorrect ? 'shadow-green-700' : 'shadow-red-700'} btn-press">
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
    currentTab = 'result';
    const total = quizState.questions.length;
    const accuracy = Math.round((quizState.correct / total) * 100);
    
    let html = `
        <div class="flex flex-col h-full justify-center text-center fade-in pt-8">
            <span class="text-7xl mb-4 filter drop-shadow-lg">🏆</span>
            <h2 class="text-3xl font-black text-gray-800 mb-2">Nível Concluído!</h2>
            
            <div class="flex gap-4 my-8 justify-center">
                <div class="bg-white p-5 rounded-3xl w-36 border border-gray-200 shadow-sm">
                    <p class="text-gray-400 font-bold text-xs uppercase tracking-wider">Acertos</p>
                    <p class="text-4xl font-black text-green-500 mt-2">${quizState.correct}<span class="text-xl text-gray-300">/${total}</span></p>
                </div>
                <div class="bg-white p-5 rounded-3xl w-36 border border-gray-200 shadow-sm">
                    <p class="text-gray-400 font-bold text-xs uppercase tracking-wider">Precisão</p>
                    <p class="text-4xl font-black text-blue-500 mt-2">${accuracy}<span class="text-xl text-gray-300">%</span></p>
                </div>
            </div>

            ${quizState.mistakes.length > 0 ? `
                <div class="bg-orange-50 p-5 rounded-3xl mb-8 border border-orange-100 text-left">
                    <h4 class="font-black text-orange-800 mb-3 text-sm uppercase tracking-wide">Para revisar depois:</h4>
                    <ul class="text-sm text-orange-700 space-y-2 font-medium">
                        ${Array.from(new Set(quizState.mistakes)).slice(0, 2).map(m => `<li class="flex gap-2"><span>⚠️</span> <span>${m}</span></li>`).join('')}
                    </ul>
                </div>
            ` : `
                <div class="bg-green-50 p-5 rounded-3xl mb-8 border border-green-100">
                    <h4 class="font-black text-green-800 text-lg">Perfeito! 🌟</h4>
                    <p class="text-green-700 text-sm font-medium mt-1">Você dominou todos os conceitos.</p>
                </div>
            `}

            <button onclick="navigate('trilha')" class="w-full mt-auto py-4 bg-blue-500 text-white font-black text-lg rounded-2xl hover:bg-blue-600 transition shadow-[0_5px_0_rgb(37,99,235)] btn-press">
                Voltar para a Trilha
            </button>
        </div>
    `;
    contentDiv.innerHTML = html;
}
