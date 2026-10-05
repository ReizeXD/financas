// --- ESTADO DA APLICAÇÃO ---
let currentTab = 'trilha';
let activeLevel = null;
let score = parseInt(localStorage.getItem('ef_score')) || 0;
let unlockedLevel = parseInt(localStorage.getItem('ef_unlockedLevel')) || 1;
let lives = localStorage.getItem('ef_lives') !== null ? parseInt(localStorage.getItem('ef_lives')) : 5;

let quizState = { questions: [], currentIndex: 0, correct: 0, streak: 0, mistakes: [] };
