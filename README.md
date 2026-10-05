# 📱 Educação Financeira na Prática

Aplicativo gamificado (estilo Duolingo) para aprendizado de finanças pessoais.

---

## ✨ Funcionalidades

- **Trilha de Aprendizado**: Diferentes níveis abordando desde conceitos básicos até investimentos.
- **Caderno Teórico**: Materiais de estudo curtos e objetivos antes de cada desafio.
- **Sistema de Vidas ❤️**: Você tem 5 vidas para tentar acertar as questões do quiz. Errar uma questão consome 1 vida. Vidas perdidas podem ser recuperadas acessando o Caderno!
- **Feedback Imediato**: Respostas certas e erradas possuem alertas, efeitos sonoros (SFX) e explicações para fixação.
- **Gamificação**: Streaks (sequências de acertos rendem pontos bônus), tela de resultados com confetes e acompanhamento de precisão.

---

## 📁 Estrutura do Projeto

```text
Financas/
├── index.html                 # Ponto de entrada padrão da aplicação
├── trilha.html                # Tela principal de navegação dos níveis
├── caderno.html               # Caderno de teoria do nível
│
├── css/
│   └── style.css              # Animações, variáveis de cores e estilo geral
│
└── js/
    ├── data.js                # Base de dados (níveis, tópicos teóricos e perguntas do quiz)
    ├── state.js               # Estado global da aplicação, pontuação, vidas e persistência
    ├── audio.js               # Gerenciamento de efeitos sonoros (SFX)
    ├── ui-trilha.js           # Lógica e renderização da interface da Trilha
    ├── ui-caderno.js          # Lógica e renderização do Caderno (inclui recuperação de vidas)
    ├── quiz.js                # Mecânica do jogo (validação de resposta, pontuação, streak, verificação de vidas)
    ├── ui.js                  # Funções de renderização antigas (legado)
    └── app.js                 # Inicialização da aplicação
```

---

## 🚀 Como Executar

Abra o arquivo `index.html` ou `trilha.html` no seu navegador favorito para começar!
