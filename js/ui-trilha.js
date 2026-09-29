const contentDiv = document.getElementById('app-content');
const modal = document.getElementById('level-modal');
const scoreDisplay = document.getElementById('score-display');

function updateScore() {
    if (scoreDisplay) scoreDisplay.innerText = `🔥 ${score}`;
}

function renderTrilha() {
    updateScore();
    let html = `
        <div class="mb-8 fade-in">
            <h2 class="title-xl">Trilha</h2>
        </div>
        <div class="levels-container fade-in">
    `;
    
    levels.forEach((lvl, index) => {
        const isLeft = index % 2 === 0;
        
        html += `
            <div class="level-row ${isLeft ? 'left' : 'right'}">
                ${index < levels.length - 1 ? `
                    <svg class="level-connector ${isLeft ? 'left' : 'right'}" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M 20 0 C 20 50, 80 50, 80 100" stroke="#E5E7EB" stroke-width="15" fill="transparent" stroke-linecap="round"/>
                    </svg>
                ` : ''}
                
                <div class="level-btn-wrapper">
                    <button onclick="openModal(${lvl.id})" class="level-btn">
                        ${lvl.emoji}
                    </button>
                    <div class="level-tooltip">
                        Nível ${lvl.id}
                    </div>
                </div>
            </div>
        `;
    });
    html += `</div>`;
    contentDiv.innerHTML = html;
}

function openModal(levelId) {
    const lvl = levels.find(l => l.id === levelId);
    document.getElementById('modal-title').innerText = `Nível ${lvl.id}`;
    document.getElementById('modal-desc').innerText = lvl.title;
    
    document.getElementById('btn-play').onclick = () => { closeModal(); startQuiz(levelId); };
    document.getElementById('btn-study').href = `caderno.html?level=${levelId}`;
    
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}

// Inicializa a trilha
renderTrilha();
