const contentDiv = document.getElementById('app-content');

function renderCadernoList() {
    let html = `
        <div class="mb-6 fade-in">
            <h2 class="title-xl mb-2">Caderno</h2>
            <p class="text-gray font-medium">Revise a teoria antes dos desafios.</p>
        </div>
        <div class="theory-list fade-in">
    `;
    levels.forEach(lvl => {
        html += `
            <a href="caderno.html?level=${lvl.id}" class="theory-card btn-press">
                <div class="theory-icon">${lvl.emoji}</div>
                <div class="theory-text">
                    <div class="theory-title">${lvl.title}</div>
                    <div class="theory-desc">${lvl.description}</div>
                </div>
                <div class="theory-arrow">&rang;</div>
            </a>
        `;
    });
    html += `</div>`;
    contentDiv.innerHTML = html;
}

function renderTheoryDetail(levelId) {
    const lvl = levels.find(l => l.id === parseInt(levelId));
    if (!lvl) return renderCadernoList();
    
    let html = `
        <div class="flex items-center mb-6 fade-in">
            <a href="caderno.html" class="back-btn">&larr;</a>
            <h2 class="title-large">Nível ${lvl.id}</h2>
        </div>
        
        <div class="fade-in flex flex-col" style="height: 100%;">
            <div class="mb-4">
                <h3 class="title-xl text-blue">${lvl.title}</h3>
                <p class="text-gray mt-2 font-medium">${lvl.description}</p>
            </div>
            
            <div class="theory-items-container">
    `;
    
    lvl.theory.forEach((item, index) => {
        html += `
            <div class="theory-item">
                <h4>
                    <span class="theory-number">${index+1}</span>
                    ${item.t}
                </h4>
                <p>${item.d}</p>
            </div>
        `;
    });

    html += `
            </div>
            ${lives < 5 ? `
            <button onclick="recoverLives(${lvl.id})" class="btn btn-blue-light btn-press flex justify-center items-center gap-2 mb-4" style="background-color: #fca5a5; color: #7f1d1d; border-color: #f87171; box-shadow: 0 5px 0 #ef4444;">
                ❤️ Recuperar Vidas
            </button>` : ''}
            <a href="trilha.html" class="btn btn-green btn-press flex justify-center items-center gap-2">
                🎮 Ir para a Trilha
            </a>
        </div>
    `;
    contentDiv.innerHTML = html;
}

window.recoverLives = function(levelId) {
    lives = 5;
    localStorage.setItem('ef_lives', lives);
    alert('Vidas recuperadas! Agora você pode voltar aos desafios.');
    renderTheoryDetail(levelId);
}

// Inicializa
const urlParams = new URLSearchParams(window.location.search);
const levelParam = urlParams.get('level');
if (levelParam) {
    renderTheoryDetail(levelParam);
} else {
    renderCadernoList();
}
