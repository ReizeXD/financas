// --- COMPONENTES VISUAIS E TELAS (UI) ---
const contentDiv = document.getElementById('app-content');
const modal = document.getElementById('level-modal');

function updateNavUI() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        const icon = btn.querySelector('.nav-icon');
        if (btn.dataset.tab === currentTab) {
            btn.classList.remove('text-gray-400');
            btn.classList.add('text-blue-500');
            icon.classList.remove('grayscale', 'opacity-50');
        } else {
            btn.classList.remove('text-blue-500');
            btn.classList.add('text-gray-400');
            icon.classList.add('grayscale', 'opacity-50');
        }
    });
    
    const nav = document.getElementById('bottom-nav');
    if (currentTab === 'quiz' || currentTab === 'feedback' || currentTab === 'result' || currentTab === 'theory-detail') {
        nav.classList.add('translate-y-full'); // Esconde animando para baixo
        setTimeout(() => nav.classList.add('hidden'), 300);
        contentDiv.classList.remove('pb-24');
    } else {
        nav.classList.remove('hidden');
        setTimeout(() => nav.classList.remove('translate-y-full'), 10); // Mostra animando para cima
        contentDiv.classList.add('pb-24');
    }
}

function renderTrilha() {
    let html = `
        <div class="flex justify-between items-center mb-8 fade-in px-2 pt-2">
            <h2 class="text-3xl font-black text-gray-800">Trilha</h2>
            <div class="flex items-center text-orange-600 font-black bg-white shadow-sm border border-orange-100 px-4 py-2 rounded-2xl text-lg">
                🔥 ${score}
            </div>
        </div>
        <div class="space-y-10 fade-in flex flex-col items-center pt-4">
    `;
    
    levels.forEach((lvl, index) => {
        const isLeft = index % 2 === 0;
        
        html += `
            <div class="w-full flex ${isLeft ? 'justify-start pl-8' : 'justify-end pr-8'} relative">
                <!-- Linha conectora -->
                ${index < levels.length - 1 ? `
                    <svg class="absolute z-0 w-32 h-24 ${isLeft ? 'left-[4rem] top-[3rem]' : 'right-[4rem] top-[3rem] transform -scale-x-100'}" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M 20 0 C 20 50, 80 50, 80 100" stroke="#E5E7EB" stroke-width="15" fill="transparent" stroke-linecap="round"/>
                    </svg>
                ` : ''}
                
                <!-- Botão de Nível -->
                <div class="relative z-10 flex flex-col items-center">
                    <button onclick="openModal(${lvl.id})" class="w-[5.5rem] h-[5.5rem] rounded-full bg-blue-500 border-b-[8px] border-blue-700 text-5xl shadow-xl hover:bg-blue-400 active:border-b-0 active:translate-y-2 transition-all flex items-center justify-center">
                        ${lvl.emoji}
                    </button>
                    <!-- Tooltip flutuante -->
                    <div class="absolute -bottom-8 bg-white shadow-sm border border-gray-100 font-bold text-gray-700 text-xs px-3 py-1 rounded-xl whitespace-nowrap">
                        Nível ${lvl.id}
                    </div>
                </div>
            </div>
        `;
    });
    html += `</div>`;
    contentDiv.innerHTML = html;
}

function renderCadernoList() {
    let html = `
        <div class="mb-6 fade-in px-2 pt-2">
            <h2 class="text-3xl font-black text-gray-800 mb-2">Caderno</h2>
            <p class="text-base text-gray-500 font-medium">Revise a teoria antes dos desafios.</p>
        </div>
        <div class="space-y-4 fade-in">
    `;
    levels.forEach(lvl => {
        html += `
            <button onclick="renderTheoryDetail(${lvl.id})" class="w-full bg-white border-2 border-gray-100 p-5 rounded-3xl flex items-center shadow-sm hover:border-blue-400 transition-colors text-left btn-press">
                <div class="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl mr-4 border border-gray-100">
                    ${lvl.emoji}
                </div>
                <div class="flex-1">
                    <h3 class="font-bold text-gray-900 text-lg">${lvl.title}</h3>
                    <p class="text-sm text-gray-500 line-clamp-1 mt-1 font-medium">${lvl.description}</p>
                </div>
                <div class="text-gray-300 font-bold text-xl">&rang;</div>
            </button>
        `;
    });
    html += `</div>`;
    contentDiv.innerHTML = html;
}

function renderTheoryDetail(levelId) {
    currentTab = 'theory-detail';
    updateNavUI();
    const lvl = levels.find(l => l.id === levelId);
    
    let html = `
        <div class="flex items-center mb-6 fade-in pt-2">
            <button onclick="navigate('caderno')" class="text-gray-400 hover:text-gray-700 font-bold text-2xl mr-4">&larr;</button>
            <h2 class="text-2xl font-black text-gray-800">Nível ${lvl.id}</h2>
        </div>
        
        <div class="fade-in space-y-6 flex flex-col h-full">
            <div>
                <h3 class="text-3xl font-black text-blue-600">${lvl.title}</h3>
                <p class="text-gray-500 mt-2 font-medium">${lvl.description}</p>
            </div>
            
            <div class="space-y-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex-1 overflow-y-auto">
    `;
    
    lvl.theory.forEach((item, index) => {
        html += `
            <div class="${index !== 0 ? 'pt-5 border-t border-gray-100' : ''}">
                <h4 class="font-bold text-gray-900 mb-2 text-lg flex items-center">
                    <span class="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center mr-2">${index+1}</span>
                    ${item.t}
                </h4>
                <p class="text-gray-600 leading-relaxed text-sm font-medium">${item.d}</p>
            </div>
        `;
    });

    html += `
            </div>
            <button onclick="startQuiz(${lvl.id})" class="w-full py-4 mt-4 bg-green-500 text-white font-black text-lg rounded-2xl hover:bg-green-600 transition shadow-[0_5px_0_rgb(22,163,74)] btn-press flex justify-center items-center gap-2">
                🎮 Praticar Agora
            </button>
        </div>
    `;
    contentDiv.innerHTML = html;
}

function openModal(levelId) {
    const lvl = levels.find(l => l.id === levelId);
    document.getElementById('modal-title').innerText = `Nível ${lvl.id}`;
    document.getElementById('modal-desc').innerText = lvl.title;
    
    document.getElementById('btn-play').onclick = () => { closeModal(); startQuiz(levelId); };
    document.getElementById('btn-study').onclick = () => { closeModal(); renderTheoryDetail(levelId); };
    
    modal.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
}
