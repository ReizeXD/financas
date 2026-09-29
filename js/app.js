// --- INICIALIZAÇÃO E NAVEGAÇÃO ---
function navigate(tab) {
    currentTab = tab;
    updateNavUI();
    if (tab === 'trilha') renderTrilha();
    if (tab === 'caderno') renderCadernoList();
}

// Inicialização da aplicação
navigate('trilha');
